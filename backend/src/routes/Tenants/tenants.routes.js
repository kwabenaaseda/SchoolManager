// /src/routes/tenant.routes.js
import express from 'express'
import { Login } from '../../controllers/Tenants/auth.controller';
import Firewall from '../../middleware/Firewall.js'
const tenantrouter = express.Router()
// -------------------
// START SWAGGER DOCUMENTATION - TENANT ROUTES
// -------------------

/**
 * @swagger
 * tags:
 *   - name: Tenant Authentication
 *     description: Tenant-level login and token management
 *   - name: User Profile
 *     description: User profile management and personal details
 *   - name: User Management
 *     description: Staff and student user management (Admin/HR Only)
 *   - name: Academic & Grading
 *     description: Academic operations, score submission, and grading systems
 *   - name: Finance & Payroll
 *     description: Financial transactions, billing, and payroll management
 *   - name: Content & Announcements
 *     description: School announcements and content management
 *   - name: Admissions & Enrollment
 *     description: Student admissions and enrollment processes
 */

// ====================================================
// A. AUTHENTICATION & PROFILE
// ====================================================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in tenant user
 *     tags: [Tenant Authentication]
 *     description: Authenticates tenant users (Staff, Student, External) and returns access tokens
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
 *                 example: "teacher@school.edu"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "UserPassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 */
tenantrouter.post('/auth/login',Firewall,Login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Tenant Authentication]
 *     description: Generates new access token using refresh token
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
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 */
tenantrouter.post('/auth/refresh', (req, res) => {
    res.send({ message: `AUTHENTICATION: Refresh access token` });
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get logged-in user's detailed profile
 *     tags: [User Profile]
 *     description: Retrieves comprehensive profile data for Staff, Student, or External users
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/StaffProfile'
 *                 - $ref: '#/components/schemas/StudentProfile'
 *       404:
 *         description: User not found
 */
tenantrouter.get('/profile', (req, res) => {
    res.send({ message: `PROFILE: Fetch logged-in user profile` });
});

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update logged-in user's personal details
 *     tags: [User Profile]
 *     description: Allows users to update their personal information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input data
 */
tenantrouter.put('/profile/update', (req, res) => {
    res.send({ message: `PROFILE: Update personal details` });
});

// ====================================================
// B. USER & ACCESS MANAGEMENT (Admin/HR Only)
// ====================================================

/**
 * @swagger
 * /staff/create:
 *   post:
 *     summary: Create new Staff member
 *     tags: [User Management]
 *     description: Creates a new Staff user and linked User account (Admin/HR Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [teacher, admin, principal, staff]
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *       400:
 *         description: Invalid input data
 */
tenantrouter.post('/staff/create', (req, res) => {
    res.send({ message: `USER_MGMT: Create new Staff member` });
});

/**
 * @swagger
 * /student/create:
 *   post:
 *     summary: Create new Student
 *     tags: [User Management]
 *     description: Creates a new Student user and linked User account (Admin/HR Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - gradeLevel
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gradeLevel:
 *                 type: string
 *               parentEmail:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid input data
 */
tenantrouter.post('/student/create', (req, res) => {
    res.send({ message: `USER_MGMT: Create new Student` });
});

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: List all Staff members
 *     tags: [User Management]
 *     description: Retrieves list of all Staff members in the tenant (Admin/HR Only)
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by role
 *     responses:
 *       200:
 *         description: Staff list retrieved successfully
 */
tenantrouter.get('/staff', (req, res) => {
    res.send({ message: `USER_MGMT: List all staff` });
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: List all Students
 *     tags: [User Management]
 *     description: Retrieves list of all Students in the tenant (Admin/HR Only)
 *     parameters:
 *       - in: query
 *         name: gradeLevel
 *         schema:
 *           type: string
 *         description: Filter by grade level
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, graduated, transferred]
 *         description: Filter by student status
 *     responses:
 *       200:
 *         description: Students list retrieved successfully
 */
tenantrouter.get('/students', (req, res) => {
    res.send({ message: `USER_MGMT: List all students` });
});

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get specific user details
 *     tags: [User Management]
 *     description: Retrieves detailed information for a specific user (Staff or Student)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
tenantrouter.get('/user/:userId', (req, res) => {
    res.send({ message: `USER_MGMT: Get specific user details` });
});

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Update user status or soft-delete/archive
 *     tags: [User Management]
 *     description: Updates user's login status or performs soft deletion (Admin/HR Only)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive, suspended]
 *               archived:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
tenantrouter.put('/user/:userId', (req, res) => {
    res.send({ message: `USER_MGMT: Update user status or soft-delete/archive` });
});

/**
 * @swagger
 * /user/{userId}/role:
 *   put:
 *     summary: Update user role and permissions
 *     tags: [User Management]
 *     description: Updates user's role and granular permission overrides (Admin/HR Only)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User role/permissions updated successfully
 *       404:
 *         description: User not found
 */
tenantrouter.put('/user/:userId/role', (req, res) => {
    res.send({ message: `USER_MGMT: Update user role/permissions` });
});

// ====================================================
// C. ACADEMIC & GRADING
// ====================================================

/**
 * @swagger
 * /scores/submit:
 *   post:
 *     summary: Submit raw scores for a class/course
 *     tags: [Academic & Grading]
 *     description: Allows teachers to submit raw examination scores for their classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - studentScores
 *             properties:
 *               classId:
 *                 type: string
 *               studentScores:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: string
 *                     score:
 *                       type: number
 *                     maxScore:
 *                       type: number
 *     responses:
 *       201:
 *         description: Scores submitted successfully
 *       400:
 *         description: Invalid score data
 */
tenantrouter.post('/scores/submit', (req, res) => {
    res.send({ message: `ACADEMICS: Submit raw class/exam scores` });
});

/**
 * @swagger
 * /grading-systems:
 *   get:
 *     summary: List all grading systems
 *     tags: [Academic & Grading]
 *     description: Retrieves available grading systems for the tenant
 *     responses:
 *       200:
 *         description: Grading systems retrieved successfully
 */
tenantrouter.get('/grading-systems', (req, res) => {
    res.send({ message: `ACADEMICS: List all grading systems` });
});

/**
 * @swagger
 * /grading-systems:
 *   post:
 *     summary: Create new grading system
 *     tags: [Academic & Grading]
 *     description: Creates a custom grading system for the tenant (Admin/Principal Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gradeRanges
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               gradeRanges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     minScore:
 *                       type: number
 *                     maxScore:
 *                       type: number
 *                     grade:
 *                       type: string
 *                     points:
 *                       type: number
 *     responses:
 *       201:
 *         description: Grading system created successfully
 *       400:
 *         description: Invalid grading system data
 */
tenantrouter.post('/grading-systems', (req, res) => {
    res.send({ message: `ACADEMICS: Create new grading system` });
});

/**
 * @swagger
 * /reports/generate/{studentId}:
 *   post:
 *     summary: Trigger AI report generation for student
 *     tags: [Academic & Grading]
 *     description: Initiates AI-powered student report generation
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportType:
 *                 type: string
 *                 enum: [progress, term, annual]
 *               includeComments:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: Report generation initiated
 *       404:
 *         description: Student not found
 */
tenantrouter.post('/reports/generate/:studentId', (req, res) => {
    res.send({ message: `ACADEMICS: Trigger AI report generation` });
});

/**
 * @swagger
 * /reports/{reportId}:
 *   get:
 *     summary: Get specific student report
 *     tags: [Academic & Grading]
 *     description: Retrieves a specific, published student report card file or data
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the report
 *     responses:
 *       200:
 *         description: Report retrieved successfully
 *       404:
 *         description: Report not found
 */
tenantrouter.get('/reports/:reportId', (req, res) => {
    res.send({ message: `ACADEMICS: Get specific student report/file` });
});

// ====================================================
// D. FINANCE & PAYROLL
// ====================================================

/**
 * @swagger
 * /finance/main:
 *   get:
 *     summary: Get school's main financial summary
 *     tags: [Finance & Payroll]
 *     description: Retrieves comprehensive financial overview for the school (Admin/Finance Only)
 *     responses:
 *       200:
 *         description: Financial summary retrieved successfully
 */
tenantrouter.get('/finance/main', (req, res) => {
    res.send({ message: `FINANCE: Get main finance summary` });
});

/**
 * @swagger
 * /finance/income:
 *   post:
 *     summary: Record new income transaction
 *     tags: [Finance & Payroll]
 *     description: Records a new income entry in the school's financial records (Finance Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               source:
 *                 type: string
 *     responses:
 *       201:
 *         description: Income recorded successfully
 *       400:
 *         description: Invalid income data
 */
tenantrouter.post('/finance/income', (req, res) => {
    res.send({ message: `FINANCE: Record a new income transaction` });
});

/**
 * @swagger
 * /finance/expense:
 *   post:
 *     summary: Record new expense transaction
 *     tags: [Finance & Payroll]
 *     description: Records a new expense entry in the school's financial records (Finance Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               recipient:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense recorded successfully
 *       400:
 *         description: Invalid expense data
 */
tenantrouter.post('/finance/expense', (req, res) => {
    res.send({ message: `FINANCE: Record a new expense transaction` });
});

/**
 * @swagger
 * /finance/student/{studentId}:
 *   get:
 *     summary: Get student billing and payment history
 *     tags: [Finance & Payroll]
 *     description: Retrieves comprehensive billing and payment information for a specific student
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student
 *     responses:
 *       200:
 *         description: Student finance data retrieved successfully
 *       404:
 *         description: Student not found
 */
tenantrouter.get('/finance/student/:studentId', (req, res) => {
    res.send({ message: `FINANCE: Get student bills and payments` });
});

/**
 * @swagger
 * /finance/student/{studentId}/payment:
 *   post:
 *     summary: Record student payment
 *     tags: [Finance & Payroll]
 *     description: Records a payment made by or for a student
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - paymentMethod
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, transfer, check]
 *               reference:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment recorded successfully
 *       400:
 *         description: Invalid payment data
 */
tenantrouter.post('/finance/student/:studentId/payment', (req, res) => {
    res.send({ message: `FINANCE: Record a student payment` });
});

/**
 * @swagger
 * /finance/staff/{staffId}/payroll:
 *   get:
 *     summary: Get staff payroll history
 *     tags: [Finance & Payroll]
 *     description: Retrieves payroll information and history for a staff member (HR/Finance Only)
 *     parameters:
 *       - in: path
 *         name: staffId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the staff member
 *     responses:
 *       200:
 *         description: Payroll data retrieved successfully
 *       404:
 *         description: Staff member not found
 */
tenantrouter.get('/finance/staff/:staffId/payroll', (req, res) => {
    res.send({ message: `FINANCE: Get staff payroll history` });
});

// ====================================================
// E. CONTENT & ANNOUNCEMENTS
// ====================================================

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create new announcement
 *     tags: [Content & Announcements]
 *     description: Creates a school-wide or class-specific announcement (Staff Only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *                 enum: [all, staff, students, parents]
 *               classId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, normal, high, urgent]
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       400:
 *         description: Invalid announcement data
 */
tenantrouter.post('/announcements', (req, res) => {
    res.send({ message: `CONTENT: Create new announcement` });
});

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Content & Announcements]
 *     description: Retrieves list of announcements based on user's role and permissions
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of announcements to return
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter by priority level
 *     responses:
 *       200:
 *         description: Announcements retrieved successfully
 */
tenantrouter.get('/announcements', (req, res) => {
    res.send({ message: `CONTENT: Get all announcements` });
});

// ====================================================
// F. ADMISSIONS & ENROLLMENT
// ====================================================

/**
 * @swagger
 * /admissions/apply:
 *   post:
 *     summary: Submit new student application
 *     tags: [Admissions & Enrollment]
 *     description: Submits a new student admission application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - parentEmail
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               parentEmail:
 *                 type: string
 *                 format: email
 *               previousSchool:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid application data
 */
tenantrouter.post('/admissions/apply', (req, res) => {
    res.send({ message: `ADMISSIONS: Submit new student application` });
});

/**
 * @swagger
 * /admissions/applications:
 *   get:
 *     summary: Get all admission applications
 *     tags: [Admissions & Enrollment]
 *     description: Retrieves list of admission applications (Admin/Admissions Only)
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, waitlisted]
 *         description: Filter by application status
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 */
tenantrouter.get('/admissions/applications', (req, res) => {
    res.send({ message: `ADMISSIONS: Get all applications` });
});

/**
 * @swagger
 * /admissions/applications/{applicationId}:
 *   put:
 *     summary: Update application status
 *     tags: [Admissions & Enrollment]
 *     description: Updates the status of an admission application (Admin/Admissions Only)
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the application
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
 *                 enum: [pending, approved, rejected, waitlisted]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       404:
 *         description: Application not found
 */
tenantrouter.put('/admissions/applications/:applicationId', (req, res) => {
    res.send({ message: `ADMISSIONS: Update application status` });
});

// -------------------
// END SWAGGER DOCUMENTATION - TENANT ROUTES
// -------------------

export default tenantrouter;