import mongoose from "mongoose";
import SystemUser from "../../models/SYSTEM/SystemUser.js";
import {
  controllerWrapper,
  sendSuccessResponse,
  Logger,
} from "../../utils/Logging.js";
import RootUser from "../../models/SYSTEM/RootUser.js";
import { AccessSign, RefreshAccessSign } from "../../utils/auth.js";
import bcryptjs from "bcryptjs"; // Needed for login password check
import { publishCacheInvalidation } from "../../utils/redisClient.js"; // Needed for updates

/**
 * ===============================================================
 * USER CREATION (ATOMIC & SECURE REGISTRATION)
 * Now includes a check for a secret PLATFORM_REGISTRATION_CODE.
 * ===============================================================
 */
const _Create_New_User = async (req, res) => {
  Logger.debug(
    _Create_New_User.name,
    "Attempting new System user registration.",
    req.body
  );

  const { firstName, surname, email, password, registrationCode } = req.body;

  // --- 0. CRITICAL SECURITY CHECK (The Registration Code) ---
  const requiredCode = process.env.PLATFORM_REGISTRATION_CODE;

  if (!requiredCode || registrationCode !== requiredCode) {
    Logger.error(_Create_New_User.name, "Unauthorized registration attempt.", {
      providedCode: registrationCode,
      ip: req.ip,
    });
    // Use a generic error message to avoid giving hints about the required code format
    throw {
      statusCode: 401,
      message: "Registration denied. Invalid system access code.",
      name: "UnauthorizedRegistrationError",
    };
  }

  // --- 1. Define & Run Validation Rules (for brevity, keeping simple check here) ---
  const validationRules = [
    {
      value: firstName,
      isValid: firstName && firstName.length >= 3,
      instruction: "First name is required.",
    },
    {
      value: email,
      isValid: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      instruction: "Valid email is required.",
    },
    {
      value: password,
      isValid: password && password.length >= 8,
      instruction: "Password needs 8+ characters.",
    },
  ];

  const failedValidations = validationRules.filter((rule) => !rule.isValid);
  if (failedValidations.length > 0) {
    throw {
      statusCode: 400,
      message: `Input validation failed.`,
      name: "ValidationError",
    };
  }

  // --- 2. MongoDB Transaction for Atomicity ---
  const session = await SystemUser.startSession();

  try {
    session.startTransaction();

    // A. Create the SystemUser (platform_role starts as 'Pending')
    const newSystemUser = await SystemUser.create(
      [
        {
          first_name: firstName,
          surname: surname,
          email: email,
          password: password,
          platform_role: "Pending-SystemUser",
          isActive: true, // User is inactive until a SuperAdmin approves them.
        },
      ],
      { session }
    );
    const userId = newSystemUser[0]._id;

    // B. Create the RootUser (The core identity link)
    const newRootUser = await RootUser.create(
      [{ associated_user_id: userId }],
      { session }
    );
    const rootUserId = newRootUser[0]._id;

    // C. Update the SystemUser with the RootUser ID
    await SystemUser.findByIdAndUpdate(
      userId,
      { associated_rootuser_id: rootUserId },
      { session, new: true }
    );

    // D. Commit the Transaction: ALL or NOTHING
    await session.commitTransaction();

    Logger.info(
      _Create_New_User.name,
      `System User created and linked successfully: ${email}`
    );
    const user = await SystemUser.findOne({ email: email });
    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid credentials.",
        name: "AuthenticationError",
      };
    }
    const accessToken = AccessSign({
      id: user._id,
      role: user.platform_role,
      tenant: null,
    });
    const refreshToken = RefreshAccessSign({
      id: user.id,
      role: user.platform_role,
    });

    // --- Post-Transaction Success ---
    return sendSuccessResponse(res, {
      successMessage: "System account created successfully.",
      data: {
        userId,
        email,
        platformRole: "Pending-SystemUser",
        accessToken:accessToken,
        refreshToken:refreshToken,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    Logger.error(
      _Create_New_User.name,
      "Transaction aborted during user creation.",
      { error: error.message }
    );
    throw error;
  } finally {
    session.endSession();
  }
};
export const Create_New_User = controllerWrapper(_Create_New_User);

/**
 * ===============================================================
 * USER LOGIN
 * ===============================================================
 */
const _Login = async (req, res) => {
  Logger.debug(_Login.name, "Attempting System User login.", {
    email: req.body.email,
  });

  const { email, password } = req.body;

  // 1. Find User by Email
  const user = await SystemUser.findOne({ email });

  if (!user) {
    // Use a generic message to prevent user enumeration
    throw {
      statusCode: 401,
      message: "Invalid credentials.",
      name: "AuthenticationError",
    };
  }

  // 2. Check Password
  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw {
      statusCode: 401,
      message: "Invalid credentials.",
      name: "AuthenticationError",
    };
  }

  // 3. Check Account Status (Crucial for security)
  if (!user.isActive) {
    Logger.warn(_Login.name, `Inactive user attempted login: ${user.email}`);
    throw {
      statusCode: 403,
      message: "Account is inactive. Please contact your administrator.",
      name: "AccountInactiveError",
    };
  }

  // 4. Token Generation (tenant is null for platform users)
  const accessToken = AccessSign({
    id: user._id,
    role: user.platform_role,
    tenant: null,
  });
  const refreshToken = RefreshAccessSign({
    id: user._id,
    role: user.platform_role,
  });

  // 5. Update last_login in RootUser (Fire-and-Forget)
  RootUser.findByIdAndUpdate(user.associated_rootuser_id, {
    last_login: Date.now(),
  }).catch((e) =>
    Logger.error(_Login.name, "Failed to update RootUser last_login.", e)
  );

  // 6. Send Response
  return sendSuccessResponse(res, {
    successMessage: `Welcome back, ${user.first_name}!`,
    data: {
      userId: user._id,
      email: user.email,
      platformRole: user.platform_role,
      accessToken,
      refreshToken,
    },
  });
};
export const Login = controllerWrapper(_Login);

/**
 * ===============================================================
 * GET USER PROFILE (Requires Authentication)
 * ===============================================================
 */
const _Get_User_Profile = async (req, res) => {
  // req.user.id is populated by the authentication middleware
  Logger.debug(
    _Get_User_Profile.name,
    `Fetching profile for user ID: ${req.params.userId}`
  );

  const userId = req.params.userId;

  const user = await SystemUser.findById(userId).select("-password"); // Exclude password hash

  if (!user) {
    throw {
      statusCode: 404,
      message: `User with ID ${userId} not found.`,
      name: "NotFoundError",
    };
  }

  return sendSuccessResponse(res, {
    successMessage: "User profile fetched successfully.",
    data: user,
  });
};
export const Get_User_Profile = controllerWrapper(_Get_User_Profile);

/**
 * ===============================================================
 * UPDATE USER PROFILE (Requires Authentication)
 * ===============================================================
 */
const _Update_User = async (req, res) => {
  Logger.info(
    _Update_User.name,
    `Update request for user ID: ${req.params.id}`
  );

  const { id } = req.params;
  const updates = req.body;

  // SECURITY GUARDRAILS: Do not allow unauthorized roles to change critical security fields
  delete updates.platform_role;
  delete updates.isActive;
  delete updates.associated_rootuser_id;

  // NOTE: Password changes should be handled by a separate controller that requires the old password.
  delete updates.password;

  const updatedUser = await SystemUser.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw {
      statusCode: 404,
      message: `User with ID ${id} not found.`,
      name: "NotFoundError",
    };
  }

  // DISTRIBUTED SYSTEMS STEP (Cache Invalidation) - Fire-and-Forget
  publishCacheInvalidation(id);

  return sendSuccessResponse(res, {
    successMessage: "User profile updated successfully.",
    data: updatedUser,
  });
};
export const Update_User = controllerWrapper(_Update_User);

/**
 * ===============================================================
 * DELETE/INACTIVATE USER (Soft Delete for Auditing)
 * ===============================================================
 */
const _Delete_User = async (req, res) => {
  Logger.warn(
    _Delete_User.name,
    `Inactivation request for user ID: ${req.params.id}`
  );

  const { id } = req.params;

  // Perform a soft delete by setting isActive to false (essential for auditing)
  const inactivationResult = await SystemUser.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!inactivationResult) {
    throw {
      statusCode: 404,
      message: `User with ID ${id} not found.`,
      name: "NotFoundError",
    };
  }

  // DISTRIBUTED SYSTEMS STEP (Cache Invalidation) - Fire-and-Forget
  publishCacheInvalidation(id);

  // Inactivate the RootUser record as well (Fire-and-Forget)
  RootUser.findByIdAndUpdate(inactivationResult.associated_rootuser_id, {
    is_active: false,
  }).catch((e) =>
    Logger.error(_Delete_User.name, "Failed to inactivate RootUser record.", e)
  );

  return sendSuccessResponse(res, {
    successMessage: `User account ${id} has been successfully inactivated (soft-deleted).`,
    data: { userId: id, isActive: false },
  });
};
export const Delete_User = controllerWrapper(_Delete_User);

/**
 * ===============================================================
 * REFRESH TOKEN (Requires Refresh Token Middleware)
 * ===============================================================
 */
const _Refresh_Token = async (req, res) => {
  Logger.debug(_Refresh_Token.name, "Token refresh request initiated.");

  // We assume an auth middleware has verified the refresh token and set req.user.id

  const userId = req.user._id;
  const user = await SystemUser.findById(userId).select("platform_role");

  if (!user) {
    throw {
      statusCode: 403,
      message: "Account inactive or invalid session. Please log in again.:"+userId,
      name: "TokenForbiddenError",
    };
  }

  // Generate a brand new access token (short-lived)
  const newAccessToken = AccessSign({
    id: userId,
    role: user.platform_role,
    tenant: null, // Still null for platform users
  });

  return sendSuccessResponse(res, {
    successMessage: "New access token generated.",
    data: {
      accessToken: newAccessToken,
      userId: userId,
      platformRole: user.platform_role,
    },
  });
};
export const Refresh_Token = controllerWrapper(_Refresh_Token);

/**
 * ===============================================================
 * LIST ALL SYSTEM USERS (PLATFORM-WIDE) (New function)
 * Only accessible by platform roles (SuperAdmin, PlatformEngineer).
 * ===============================================================
 */
const _List_System_Users = async (req, res) => {
  // 1. Logging the start of the action
  Logger.debug(
    _List_System_Users.name,
    "Attempting to retrieve all System Users."
  );

  // For a distributed system, this action is highly privileged.
  // We assume an Authentication/Authorization Middleware has already verified
  // the user's role (e.g., SuperAdmin) and that they are allowed to perform
  // a 'read' action on the 'SystemUser' resource.

  // 2. Database Query
  const users = await SystemUser.find()
    // Select specific fields for security and bandwidth efficiency.
    // We explicitly exclude 'password' and the internal Mongoose version key '__v'.
    .select(
      "_id first_name surname email platform_role isActive createdAt updatedAt"
    )
    .lean(); // Use .lean() for faster read operations (plain JavaScript objects)

  // 3. Return the result
  return sendSuccessResponse(res, {
    successMessage: `Successfully retrieved ${users.length} System Users.`,
    data: users,
  });
};

export const List_System_Users = controllerWrapper(_List_System_Users);
