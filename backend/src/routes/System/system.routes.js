// /src/routes/system.routes.js
import express from "express";
const Systemrouter = express.Router();
import Firewall from "../../middleware/Firewall.js";
import {
  Create_New_User,
  Login,
  Update_User,
  Delete_User,
  Refresh_Token,
  Get_User_Profile,
  List_System_Users,
} from "../../controllers/System/SystemUserManager.controller.js";
import { Get_System_Health } from "../../controllers/System/SystemHealth_Audit.controller.js";
import { Create_New_Tenant } from "../../controllers/System/tenantLifeCycle.controller.js";

// -------------------
// START SWAGGER DOCUMENTATION - SYSTEM ROUTES
// -------------------

/**
 * @swagger
 * tags:
 *   - name: Tenant Lifecycle Management
 *     description: System-level tenant creation, configuration, and management
 *   - name: System User Management
 *     description: Management of system-level users (RootUsers)
 *   - name: System Health & Audit
 *     description: System monitoring and health checks
 */

// ====================================================
// A. TENANT LIFECYCLE MANAGEMENT
// ====================================================

/**
 * @swagger
 * /api/v1/system/tenant:
 *   post:
 *     summary: Create a new tenant (school) and its first RootUser
 *     tags: [Tenant Lifecycle Management]
 *     description: Creates a brand new tenant organization and initial RootUser account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                 -tenantName,
 *                 -ownerPhone,
 *                 -ownerFirstName,
 *                 -ownerSurname,
 *                 -ownerEmail,
 *                 -ownerPassword,
 *                 -ownerGender,
 *                 -ownerDOB
 *                 -subscriptionPlan
 *             properties:
 *               tenantname:
 *                 type: string
 *                 example: "Springfield Elementary School"
 *               ownerFirstName:
 *                 type: string
 *                 example: "Jerry"
 *               ownerSurname:
 *                 type: string
 *                 example: "Springs"
 *               ownerGender:
 *                 type: string
 *                  enum: [male,female]
 *                 example: "male"
 *               ownerDOB:
 *                 type: string
 *                 example: "01/01/1919"
 *               ownerPhone:
 *                 type: string
 *                 example: "+000 123 456 789"
 *               ownerEmail:
 *                 type: string
 *                 format: email
 *                 example: "principal@springfield.edu"
 *               ownerPassword:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123"
 *               subscriptionPlan:
 *                 type: string
 *                 enum: [basic,  standard, premium, enterprise]
 *                 example: "premium"
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Tenant domain already exists
 */
Systemrouter.post("/tenant",Firewall,Create_New_Tenant);

/**
 * @swagger
 * /api/v1/system/tenants:
 *   get:
 *     summary: Get list of all tenants in the system
 *     tags: [Tenant Lifecycle Management]
 *     description: Retrieves comprehensive list of all tenants with status, plan, and owner information
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of tenants per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, suspended, terminated]
 *         description: Filter by tenant status
 *     responses:
 *       200:
 *         description: List of tenants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tenants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       domain:
 *                         type: string
 *                       status:
 *                         type: string
 *                       plan:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
Systemrouter.get("/tenants", (req, res) => {
  res.send({ message: "SYSTEM: List all Tenants" });
});

/**
 * @swagger
 * /api/v1/system/tenant/{tenantId}:
 *   get:
 *     summary: Get detailed status and configuration for a specific tenant
 *     tags: [Tenant Lifecycle Management]
 *     description: Retrieves comprehensive details, configuration, and logs for a specific tenant
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the tenant
 *     responses:
 *       200:
 *         description: Tenant details retrieved successfully
 *       404:
 *         description: Tenant not found
 */
Systemrouter.get("/tenant/:tenantId", (req, res) => {
  res.send({
    message: `SYSTEM: Get detailed status for Tenant ${req.params.tenantId}`,
  });
});

/**
 * @swagger
 * /api/v1/system/tenant/{tenantId}/config:
 *   put:
 *     summary: Update tenant configuration
 *     tags: [Tenant Lifecycle Management]
 *     description: Updates tenant branding, API keys, and other configuration settings
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branding:
 *                 type: object
 *                 properties:
 *                   logo:
 *                     type: string
 *                   primaryColor:
 *                     type: string
 *                   secondaryColor:
 *                     type: string
 *               apiKeys:
 *                 type: object
 *               features:
 *                 type: object
 *     responses:
 *       200:
 *         description: Tenant configuration updated successfully
 *       404:
 *         description: Tenant not found
 */
Systemrouter.put("/tenant/:tenantId/config", (req, res) => {
  res.send({ message: `SYSTEM: Update Tenant configuration` });
});

/**
 * @swagger
 * /api/v1/system/tenant/{tenantId}/status:
 *   put:
 *     summary: Update tenant subscription/operational status
 *     tags: [Tenant Lifecycle Management]
 *     description: Suspend, activate, or terminate a tenant's subscription
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, suspended, terminated]
 *                 example: "suspended"
 *               reason:
 *                 type: string
 *                 example: "Payment overdue"
 *     responses:
 *       200:
 *         description: Tenant status updated successfully
 *       404:
 *         description: Tenant not found
 */
Systemrouter.put("/tenant/:tenantId/status", (req, res) => {
  res.send({
    message: `SYSTEM: Update Tenant subscription/operational status`,
  });
});

/**
 * @swagger
 * /api/v1/system/maintenance-mode:
 *   post:
 *     summary: Place a tenant into maintenance mode
 *     tags: [Tenant Lifecycle Management]
 *     description: Puts a tenant in maintenance mode for major upgrades or maintenance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenantId
 *             properties:
 *               tenantId:
 *                 type: string
 *               estimatedDuration:
 *                 type: number
 *                 description: Estimated maintenance duration in minutes
 *               message:
 *                 type: string
 *                 description: Maintenance message to display to users
 *     responses:
 *       200:
 *         description: Tenant placed in maintenance mode successfully
 *       404:
 *         description: Tenant not found
 */
Systemrouter.post("/maintenance-mode", (req, res) => {
  res.send({ message: "SYSTEM: Place a tenant into maintenance mode" });
});

// ====================================================
// B. SYSTEM USER MANAGEMENT
// ====================================================

/**
 * @swagger
 * /api/v1/system/system-users:
 *   get:
 *     summary: Get list of all system-level users (RootUsers)
 *     tags: [System User Management]
 *     description: Retrieves all system-level users with their roles and access levels
 *     responses:
 *       200:
 *         description: List of system users retrieved successfully
 */
Systemrouter.get("/system-users", Firewall, List_System_Users);
/**
 * @swagger
 * /api/v1/system/system-user/{userid}:
 *   get:
 *     summary: Get list of all system-level users (RootUsers)
 *     tags: [System User Management]
 *     description: Retrieves all system-level users with their roles and access levels
 *     responses:
 *       200:
 *         description: List of system users retrieved successfully
 */
Systemrouter.get("/system-user/:userId", Firewall, Get_User_Profile);

/**
 * @swagger
 * /api/v1/system/system-user/create:
 *   post:
 *     summary: Create a new system-level user
 *     tags: [System User Management]
 *     description: Creates a new system administrator with specified role and permissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - registrationCode
 *               - firstName
 *               - surname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@nexuswings.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               registrationCode:
 *                 type: string
 *                 
 *     responses:
 *       201:
 *         description: System user created successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */
Systemrouter.post("/system-user/create", Create_New_User);

/**
 * @swagger
 * /api/v1/system/system-user/ed/{userId}:
 *   put:
 *     summary: Update system user's role, status, or access
 *     tags: [System User Management]
 *     description: Updates system user details including role, status, and access permissions
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the system user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, suspended]
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: System user updated successfully
 *       404:
 *         description: System user not found
 */
Systemrouter.put("/system-user/ed/:userId", Firewall, Update_User);

/**
 * @swagger
 * /api/v1/system/system-user/del/{userId}:
 *   put:
 *     summary: Delete system user
 *     tags: [System User Management]
 *     description: Deletes System User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the system user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, suspended]
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: System user Deleted successfully
 *       404:
 *         description: System user not found
 */
Systemrouter.put("/system-user/del/:userId", Firewall, Delete_User);

// ====================================================
// C. HEALTH & AUDIT
// ====================================================

/**
 * @swagger
 * /api/v1/system/system-health:
 *   get:
 *     summary: Get health check status of all core services
 *     tags: [System Health & Audit]
 *     description: Retrieves health status of database, AI service, and other core components
 *     responses:
 *       200:
 *         description: Health status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                         latency:
 *                           type: number
 *                     aiService:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                         version:
 *                           type: string
 */
Systemrouter.get("/system-health",Firewall, Get_System_Health);

// ====================================================
// D. AUTHENTICATION
// ====================================================

/**
 * @swagger
 * /api/v1/system/system-auth/login:
 *   post:
 *     summary: Log in the System User (Root Admin)
 *     tags: [System User Management]
 *     description: Authenticates the super-administrator (Root-SystemUser) to gain system-wide access tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: root.admin@nexuswings.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecureRootPassword123
 *     responses:
 *       200:
 *         description: Successful login. Returns short-lived access token and long-lived refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: System User logged in successfully.
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiI...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiI...
 *       401:
 *         description: Invalid Credentials or User Not Found.
 */
Systemrouter.post("/system-auth/login", Login);

/**
 * @swagger
 * /api/v1/system/system-auth/refresh:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [System User Management]
 *     description: Generates a new access token using a valid refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiI...
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access Token refreshed.
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiI...
 *       401:
 *         description: Invalid or expired refresh token
 */
Systemrouter.post("/system-auth/refresh", Firewall, Refresh_Token);

// -------------------
// END SWAGGER DOCUMENTATION - SYSTEM ROUTES
// -------------------

export default Systemrouter;
