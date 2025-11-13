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
import User from "../../models/TENANTS/users/User.js";
import Root_User from "../../models/TENANTS/rootUser.js";
import TenantConfig from "../../models/TENANTS/TenantConfig.js"; // For configuration setup
import GradingSystem from "../../models/TENANTS/Components/GradingSystem.js"; // For default rules
import MainFinance from "../../models/TENANTS/finance/Main.Finance.js"; // For core finance
import Announcement from "../../models/TENANTS/Announcement/Announcement.js"; // For initial announcement
import GeneralContent from "../../models/TENANTS/Components/GeneralContent.js"; // For initial content
import Permission from "../../models/TENANTS/Permission.js"; // For initial Admin role permissions
import STAFF from "../../models/TENANTS/users/Staff.User.js";

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
    ownerPhone,
    ownerFirstName,
    ownerSurname,
    ownerEmail,
    ownerPassword,
    ownerGender,
    ownerDOB,
    subscriptionPlan,
  } = req.body;

  Logger.info(_Create_New_Tenant.name, `Initiating new tenant creation `);

  // --- 1. Basic Validation ---
  if (!ownerEmail || !ownerPassword || !ownerPhone) {
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
    const existingTenant = await Tenant.findOne({ name: tenantName }).session(
      session
    );
    if (existingTenant) {
      throw {
        statusCode: 409,
        message: `School-Name '${tenantName}' is already taken.`,
        name: "ConflictError",
      };
    }
    const existingUser = await User.findOne({ email: ownerEmail }).session(
      session
    );
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
          subscriptionPlan: subscriptionPlan,
          // ownerId will be updated later with the User's ID
        },
      ],
      { session: session }
    );
    const tenantId = newTenant[0]._id; // Get the newly created ID

    // 4b. Create the User (The Owner/Admin's Login)
    const newUser = await User.create(
      [
        {
          username: ownerSurname + " " + ownerFirstName,
          email: ownerEmail,
          password: ownerPassword, // The pre-save hook in User.js will hash this
          role: "OWNER", // Grant the top-level role
          tenantId: tenantId,
        },
      ],
      { session: session }
    );
    const UserId = newUser[0]._id;

    // 4c. Create the RootUser Link (The Bridge)
    // This links the new User to the concept of a Tenant Owner
    const rootUsers = await Root_User.create(
      [
        {
          associated_user_id: UserId,

          // RootUser does not need tenantId as it's a global link, but it's often a good audit field.
        },
      ],
      { session: session }
    );
    const RootUserId = rootUsers[0]._id;

    // 4d. Update Tenant with OwnerId
    newTenant[0].ownerId = RootUserId;
    await newTenant[0].save({ session: session });

    // 4e. Create the Staff data for the Owner. Owners are thier first Staff members
    const StaffUSer = await STAFF.create([
      {
        user_id: UserId,
        school_id: tenantId,
        firstname: ownerFirstName,
        lastname: ownerSurname,
        date_of_birth: ownerDOB,
        gender: ownerGender,
        contact_info: {
          phone: ownerPhone,
          email: ownerEmail,
        },
        job_details: {
          job_role: "OWNER",
        },
      },
    ]);
    const StaffId = StaffUSer[0]._id;
    newUser[0].staffId = StaffId;
    await newUser[0].save({ session: session });

    // --- 5. INITIALIZATION STEPS (Setting up the new school's environment) ---

    // 5a. Create Default Tenant Configuration
    await TenantConfig.create([{ tenant_id: tenantId }], { session: session }); // Uses defaults in the model

    // 5b. Create Default Grading System
    await GradingSystem.create(
      [
        {
          tenant_id: tenantId,
          name: "Default K-12 System",
          weighting: { class_score_percent: 40, exam_score_percent: 60 },
          grade_conversion: [
            { grade: "A", min_score: 90, max_score: 100 },
            { grade: "B", min_score: 80, max_score: 89 },
            { grade: "C", min_score: 70, max_score: 79 },
            { grade: "D", min_score: 50, max_score: 69 },
            { grade: "E", min_score: 41, max_score: 50 },
            { grade: "F", min_score: 0, max_score: 40 },
          ],
        },
      ],
      { session: session }
    );

    // 5c. Create Initial Role Permissions (e.g., a core Admin role)
    await Permission.create(
      [
        {
          role: "Tenant Admin",
          permissions: [
            { resource: "All", action: "create", scope: "tenant" },
            { resource: "All", action: "read", scope: "tenant" },
            { resource: "All", action: "update", scope: "tenant" },
            { resource: "All", action: "delete", scope: "tenant" },
          ],
        },
      ],
      { session: session }
    );

    // 5d. Create Initial Finance Document
    await MainFinance.create([{ Tenant: tenantId }], { session: session }); // Uses model defaults

    // 5e. Create Initial Content/Announcement (Optional, but friendly!)
    await Announcement.create(
      [
        {
          tenant_id: tenantId,
          header: "Welcome to your new School Platform!",
          content:
            "This is your first default announcement. The system is ready to go!",
          from_user_id: UserId,
          target_role: "All",
        },
      ],
      { session: session }
    );

    // --- 6. Commit Transaction ---
    await session.commitTransaction(); // 🎉 Everything succeeded! Save all changes!
    Logger.info(
      _Create_New_Tenant.name,
      `Tenant ${tenantName} and RootUser ${UserId} successfully created and committed.`
    );

    // --- 7. Send Success Response ---
    return sendSuccessResponse(res, {
      statusCode: 201,
      successMessage: `Tenant '${tenantName}' created successfully.`,
      data: {
        tenantId: tenantId,
        ownerId: UserId,
        ownerEmail: ownerEmail,
      },
    });
  } catch (error) {
    // --- 8. Abort Transaction on Error ---
    await session.abortTransaction(); // ❌ Something failed! Undo all changes!
    Logger.error(
      _Create_New_Tenant.name,
      `Tenant creation failed for ${tenantName}. Transaction aborted.`,
      error
    );

    // Use the error handler utility to respond
    sendErrorResponse(res, error, _Create_New_Tenant.name);
  } finally {
    // --- 9. End Session ---
    session.endSession(); // Clean up the connection
  }
};

export const Create_New_Tenant = controllerWrapper(_Create_New_Tenant);

/**
 * ===============================================================
 * GET TENANT DETAIS
 * This function orchestrates the multi-step, transactional process
 * of ascertaining the exact details of a tenant from the System User perspective.
 * ===============================================================
 */
const _Tenant_Details = async (req, res) => {
  Logger.info(_Tenant_Details.name,"Attempting Fetching Details for Tenant :"+req.params.tenantId)
  const {tenantId} = req.params
};
export const Tenant_Details = controllerWrapper(_Tenant_Details);
