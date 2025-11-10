// /src/middleware/Firewall.js

import { VerifyAccessSign } from "../utils/auth.js";
import User from "../models/TENANTS/users/User.js"; // The Tenant User model
import Tenant from "../models/TENANTS/Tenant.js"; // The Tenant (School) model
import SystemUser from "../models/SYSTEM/SystemUser.js"; // The Platform User model
import { sendErrorResponse, Logger } from "../utils/Logging.js";
import { getCache, setCache } from "../config/redis.js";

/**
 * ===============================================================
 * FIREWALL MIDDLEWARE (Authentication and Authorization Gate)
 * Function: FireWall
 * Output: If successful, attaches { req.user, req.tenant, req.isSystemUser, req.isTenant, req.tenantId }
 * ===============================================================
 */
const FireWall = async (req, res, next) => {
  let token;

  // 1. Check for Token Presence (The Gate is Closed until a Key is shown)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    Logger.warn('FireWall', "Access attempt failed: No token provided.");
    return sendErrorResponse(res, {
      statusCode: 401,
      message: "Access Denied. Authentication token is missing.",
      name: "MissingTokenError",
    }, 'FireWall');
  }

  // 2. Verify Token & Perform User Lookup (All logic moves into the try block)
  try {
    const decoded = VerifyAccessSign(token); // e.g., { sub: userId, role: role, ref: tenantId }
    
    // Check for essential payload properties
    if (!decoded.sub || !decoded.role) {
      throw new Error("JWT payload is incomplete.");
    }

    const [role, role_prefix] = decoded.role.split("-");

    // 🔑 THE CRITICAL FORK: Is there a 'ref' (tenantId) in the token?
    if (decoded.ref) {
      // 🚀 PATH 1: TENANT USER (School Admin, Teacher, Student)
      
      const functionName = 'FireWall.TenantPath';

      // A. FAIL-FAST SUFFIX CHECK
      if (role_prefix !== "TenantUser") {
        Logger.error(functionName, "Invalid role suffix for Tenant user path.", { role: decoded.role });
        return sendErrorResponse(res, {
          statusCode: 401,
          message: "Access Denied. Invalid User Role Structure.",
          name: "InvalidRoleSuffixError",
        }, 'FireWall');
      }

      const userId = decoded.sub.toString();
      const cacheKey = `user:active:${userId}`;
      let user = null;
      let isUserActive = false;
      let Tenant_user = null;

      // Check Cache first
      const cachedUser = await getCache(cacheKey);
      
      if (cachedUser) {
        user = cachedUser;
        isUserActive = cachedUser.isActive;
        Tenant_user = await Tenant.findOne({ _id: decoded.ref }); // Still need to verify tenant status in DB
        Logger.info(functionName, `🟢 Cache HIT for user ${userId}.`);

      } else {
        // Cache Miss: Perform DB lookups
        user = await User.findOne({ _id: decoded.sub });
        Tenant_user = await Tenant.findOne({ _id: decoded.ref });
        
        Logger.info(functionName, `🟡 Cache MISS for user ${userId}. Performing DB lookups.`);

        // B. Error Check: Tenant Status (Must be checked first)
        if (!Tenant_user) {
          return sendErrorResponse(res, {
            statusCode: 401,
            message: "Access Denied. Tenant not found or inactive. Contact your Administrator.",
            name: "TenantNotFoundError",
          }, 'FireWall');
        }

        // C. Error Check: User Status
        if (!user) {
          return sendErrorResponse(res, {
            statusCode: 401,
            message: "Access Denied. User Not Found in the Tenant system.",
            name: "TenantUserNotFoundError",
          }, 'FireWall');
        }

        // D. Cache the user for 60 seconds (Time To Live - TTL)
        if (user) {
          await setCache(cacheKey, user, 60); 
          isUserActive = user.isActive;
        }
      }

      // E. Error Check: Active Status (Applies to both cached and fresh user data)
      if (!isUserActive) {
        return sendErrorResponse(res, {
          statusCode: 401,
          message: "Access Denied. Your account has been deactivated.",
          name: "UserDeactivatedError",
        }, 'FireWall');
      }

      // F. Success: Attach info and proceed
      req.user = user;
      req.tenant = Tenant_user;
      req.tenantId = decoded.ref;
      req.isTenant = true;
      req.isSystemUser = false;
      
      return next(); // Tenant user is verified and allowed through.
      
    } else {
      // 👑 PATH 2: SYSTEM USER (The Platform SuperUser)
      
      const functionName = 'FireWall.SystemPath';

      // A. FAIL-FAST SUFFIX CHECK
      if (role_prefix !== "SystemUser") {
        Logger.error(functionName, "Invalid role suffix for System user path.", { role: decoded.role });
        return sendErrorResponse(res, {
          statusCode: 401,
          message: "System Access Restricted. Invalid Role Structure.",
          name: "InvalidSystemRoleSuffixError",
          adjustment: { _forcelogUserOut: true },
        }, 'FireWall');
      }

      // B. DB Lookup (The core Atomicity Check)
      const systemUser = await SystemUser.findOne({ _id: decoded.sub });

      // C. Error Check: System User Status
      if (!systemUser || !systemUser.isActive) {
        Logger.warn(functionName, "System User lookup failed or user is inactive.", { userId: decoded.sub });
        return sendErrorResponse(res, {
          statusCode: 401,
          message: "System Access Restricted. Account Not Found or Inactive.",
          name: "SystemUserAuthError",
          adjustment: { _forcelogUserOut: true },
        }, 'FireWall');
      }

      // D. Success: Attach system user info
      req.user = systemUser;
      req.isSystemUser = true;
      req.isTenant = false;

      return next(); // System user is verified and allowed through.
    }
    
  } catch (error) {
    // This catches expired tokens, JWT decoding failures, or system/DB errors not explicitly caught above.
    Logger.error('FireWall', "JWT verification or database access failed.", error);
    
    // Check for specific JWT errors (like TokenExpiredError, JsonWebTokenError)
    const isJwtError = error.name && (error.name.includes("Token") || error.name.includes("JWT"));
    const userMessage = isJwtError 
        ? "Your session has expired. Please log in again." 
        : "Authentication failed due to an invalid token structure.";

    return sendErrorResponse(res, {
      statusCode: 401,
      message: userMessage,
      name: error.name || "TokenVerificationError",
      adjustment: { _forcelogUserOut: true },
    }, 'FireWall');
  }
};

export default FireWall;