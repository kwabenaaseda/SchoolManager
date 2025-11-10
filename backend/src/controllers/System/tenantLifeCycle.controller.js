// /src/controllers/System/SystemTenantManager.controller.js
import mongoose from "mongoose"; // 🔑 CRITICAL: Needed for transactions
import {
  controllerWrapper,
  sendErrorResponse,
  sendSuccessResponse,
  Logger,
} from "../../utils/Logging.js";

// --- Import All Relevant Models for Tenant Setup ---
import Tenant from "../../models/TENANTS/Tenant.js";
import SystemUser from "../../models/SYSTEM/SystemUser.js";
import RootUser from "../../models/SYSTEM/RootUser.js";
import TenantConfig from "../../models/TENANTS/TenantConfig.js"; // For configuration setup
import GradingSystem from "../../models/TENANTS/Components/GradingSystem.js"; // For default rules
import MainFinance from "../../models/TENANTS/finance/Main.Finance.js"; // For core finance
import Announcement from "../../models/TENANTS/Announcement/Announcement.js"; // For initial announcement
import GeneralContent from "../../models/TENANTS/Components/GeneralContent.js"; // For initial content
import Permission from "../../models/TENANTS/Permission.js"; // For initial Admin role permissions

/**
 * ===============================================================
 * TENANT CREATION CORE LOGIC
 * This function orchestrates the multi-step, transactional process
 * of creating a new school (tenant) and its root administrator.
 * ===============================================================
 */
const _Create_New_Tenant = async (req, res) => {
  const {
    tenantName,
   
    ownerFirstName,
    ownerSurname,
    ownerEmail,
    ownerPassword,
  } = req.body;

  Logger.info(_Create_New_Tenant.name, `Initiating new tenant creation `);

  // --- 1. Basic Validation ---
  if ( !ownerEmail || !ownerPassword) {
    // If any critical field is missing, throw an error.
    throw {
      statusCode: 400,
      message: "Missing required fields for tenant and owner creation.",
      name: "ValidationError",
    };
  }

  // --- 2. Start Database Transaction ---
  const session = await mongoose.startSession();
  session.startTransaction(); // Start the "all-or-nothing" mission

  try {
    // --- 3. Pre-flight Checks (Existence Check) ---
    // Ensure the subdomain and email are not already in use across the entire platform
    const existingTenant = await Tenant.findOne({ subdomain: subdomain }).session(session);
    if (existingTenant) {
      throw {
        statusCode: 409,
        message: `Subdomain '${subdomain}' is already taken.`,
        name: "ConflictError",
      };
    }
    const existingUser = await SystemUser.findOne({ email: ownerEmail }).session(session);
    if (existingUser) {
      throw {
        statusCode: 409,
        message: `User email '${ownerEmail}' is already registered in the system.`,
        name: "ConflictError",
      };
    }

    // --- 4. CORE CREATION STEPS ---
    
    // 4a. Create the Tenant (The School)
    const newTenant = await Tenant.create(
      [
        {
          name: tenantName,
          subdomain: subdomain.toLowerCase(),
          // ownerId will be updated later with the SystemUser's ID
        },
      ],
      { session: session }
    );
    const tenantId = newTenant[0]._id; // Get the newly created ID

    // 4b. Create the SystemUser (The Owner/Admin's Login)
    const newSystemUser = await SystemUser.create(
      [
        {
          first_name: ownerFirstName,
          surname: ownerSurname,
          email: ownerEmail,
          password: ownerPassword, // The pre-save hook in SystemUser.js will hash this
          platform_role: "SuperAdmin", // Grant the top-level role
          // The SystemUser model is for platform-level access, not tenant-level
        },
      ],
      { session: session }
    );
    const systemUserId = newSystemUser[0]._id;

    // 4c. Create the RootUser Link (The Bridge)
    // This links the new SystemUser to the concept of a Tenant Owner
    await RootUser.create(
      [
        {
          associated_user_id: systemUserId,
          // RootUser does not need tenantId as it's a global link, but it's often a good audit field.
        },
      ],
      { session: session }
    );

    // 4d. Update Tenant with OwnerId
    newTenant[0].ownerId = systemUserId;
    await newTenant[0].save({ session: session });


    // --- 5. INITIALIZATION STEPS (Setting up the new school's environment) ---

    // 5a. Create Default Tenant Configuration
    await TenantConfig.create([{ tenant_id: tenantId }], { session: session }); // Uses defaults in the model

    // 5b. Create Default Grading System
    await GradingSystem.create([
        { 
            tenant_id: tenantId, 
            name: "Default K-12 System",
            weighting: { class_score_percent: 40, exam_score_percent: 60 },
            grade_conversion: [
                { grade: 'A', min_score: 90, max_score: 100 },
                { grade: 'B', min_score: 80, max_score: 89 },
                { grade: 'C', min_score: 70, max_score: 79 },
                { grade: 'D', min_score: 50, max_score: 69 },
                { grade: 'E', min_score: 41, max_score: 50 },
                { grade: 'F', min_score: 0, max_score: 40 },
            ]
        }
    ], { session: session });

    // 5c. Create Initial Role Permissions (e.g., a core Admin role)
    await Permission.create([
      {
        role: 'Tenant Admin',
        permissions: [
          { resource: 'All', action: 'create', scope: 'tenant' },
          { resource: 'All', action: 'read', scope: 'tenant' },
          { resource: 'All', action: 'update', scope: 'tenant' },
          { resource: 'All', action: 'delete', scope: 'tenant' },
        ]
      }
    ], { session: session });

    // 5d. Create Initial Finance Document
    await MainFinance.create([{ Tenant: tenantId }], { session: session }); // Uses model defaults

    // 5e. Create Initial Content/Announcement (Optional, but friendly!)
    await Announcement.create([
      {
        tenant_id: tenantId,
        header: "Welcome to your new School Platform!",
        content: "This is your first default announcement. The system is ready to go!",
        from_user_id: systemUserId,
        target_role: "All"
      }
    ], { session: session });

    // --- 6. Commit Transaction ---
    await session.commitTransaction(); // 🎉 Everything succeeded! Save all changes!
    Logger.info(_Create_New_Tenant.name, `Tenant ${subdomain} and RootUser ${systemUserId} successfully created and committed.`);
    
    // --- 7. Send Success Response ---
    return sendSuccessResponse(res, {
      statusCode: 201,
      successMessage: `Tenant '${tenantName}' with subdomain '${subdomain}' created successfully.`,
      data: {
        tenantId: tenantId,
        ownerId: systemUserId,
        ownerEmail: ownerEmail,
      },
    });

  } catch (error) {
    // --- 8. Abort Transaction on Error ---
    await session.abortTransaction(); // ❌ Something failed! Undo all changes!
    Logger.error(_Create_New_Tenant.name, `Tenant creation failed for ${subdomain}. Transaction aborted.`, error);
    
    // Use the error handler utility to respond
    sendErrorResponse(res, error, _Create_New_Tenant.name);

  } finally {
    // --- 9. End Session ---
    session.endSession(); // Clean up the connection
  }
};

export const Create_New_Tenant = controllerWrapper(_Create_New_Tenant);