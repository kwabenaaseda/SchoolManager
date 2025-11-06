// /src/middleware/Firewall.js

import { VerifyAccessSign } from "../utils/auth.js";
import User from "../models/TENANTS/users/User.js"; // The Tenant User model
import Tenant from "../models/TENANTS/Tenant.js"; // The Tenant (School) model
import SystemUser from "../models/SYSTEM/SystemUser.js"; // The Platform User model
import { ErrorHandler } from "../utils/Logging.js";
import { getCache, setCache } from "../config/redis.js";

const FireWall = async (req, res, next) => {
  const doc = `
    ------Functional Documentation--------
    Brief: This is the Documentation for the Firewall function. This should aid you in debugging, testing and continuing work after some time. 
    Function Name: Firewall
    Function requested Parameters: Tokens from the Request.headers.authorization
    Function Expected Output: If all checks out it will return the following {req.user,req.tenant,req.isSystemUser,req.isTenant, req.tenantId}
    NB: SystemUser Roles = {role}-SystemUser (e.g. Root-SystemUser)
        Tenant Roles = {role}-TenantUser (e.g. Admin-TenantUser)
    Created-by: NexusWings🔥
    `;
  let token;

  // 1. Check for Token Presence (The Gate is Closed until a Key is shown)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return ErrorHandler(FireWall)({
      documentation: doc,
      error_message:
        "The Token was not found in the headers.authorization of the request.",
      custom_error_message: "Access Denied. No Token",
      _response: res,
      status_code: 401,
    }).UserResponse();
  }

  // 2. Verify Token & Perform User Lookup
  try {
    const decoded = VerifyAccessSign(token); // e.g., { sub: userId, role: role, ref: tenantId }
    const [role, role_prefix] = decoded.role.split("-"); // Make sure 'role' exists

    // 🔑 THE CRITICAL FORK: Is there a 'ref' (tenantId) in the token?
    if (decoded.ref) {
      // 🚀 PATH 1: TENANT USER (School Admin, Teacher, Student)

      // A. FAIL-FAST SUFFIX CHECK (New Security Layer)
      if (!role_prefix == "TenantUser") {
        return ErrorHandler(FireWall)({
          documentation: doc,
          error_message:
            "Token has a tenant reference but the role suffix is incorrect (not -TenantUser).",
          custom_error_message: "Access Denied. Invalid User Role Structure.",
          _response: res,
          status_code: 401,
        }).UserResponse();
      }

      // B. DB Lookup (The core Atomicity Check)
      const Tenant_user = await Tenant.findOne({ _id: decoded.ref });

      // =======================================================
      // 🚀 THE NEW CACHING LOGIC STARTS HERE 🚀
      // =======================================================
      const userId = decoded.sub.toString();
      const cacheKey = `user:active:${userId}`;
      let user = null;
      let isUserActive = null;

      const cachedUser = await getCache(cacheKey);
      if (cachedUser) {
        user = cachedUser;
        isUserActive = cachedUser.isActive;
        console.log(`Firewall: 🟢 Cache HIT for user ${userId}.`);
      } else {
        user = await User.findOne({ _id: decoded.sub }); // Check against the tenant user table
        // C. Error Check: Tenant Status
        if (!Tenant_user) {
          return ErrorHandler(FireWall)({
            documentation: doc,
            error_message:
              "The Tenant ID in the token does not correlate to any active tenant.",
            custom_error_message: "Access Denied. Contact your Administrator",
            _response: res,
            status_code: 401,
          }).UserResponse();
        }

        // D. Error Check: User Status
        if (!user) {
          return ErrorHandler(FireWall)({
            documentation: doc,
            error_message: "The User ID does not exist in the Tenant database.",
            custom_error_message: "Access Denied. User Not Found!",
            _response: res,
            status_code: 401,
          }).UserResponse();
        }
        if (user) {
          await setCache(cacheKey, user, 60);
          isUserActive = user.isActive;
          console.log(
            `Firewall: 🟡 Cache MISS, DB HIT for user ${userId}. Status cached.`
          );
        }

        if ( !isUserActive){
           return ErrorHandler(FireWall)({
          documentation: doc,
          error_message:
            "Token has a tenant reference but the account has been deactivated",
          custom_error_message: "Access Denied. Your account has been deactivated",
          _response: res,
          status_code: 401,
        }).UserResponse();
     
        }

        // E. Success: Attach both tenant and user info
        req.user = user;
        req.tenant = Tenant_user;
        req.tenantId = decoded.ref;
        req.isTenant = true;
        req.isSystemUser = false;

        next(); // Tenant user is verified and allowed through.
      }
    } else {
      // 👑 PATH 2: SYSTEM USER (The Platform SuperUser - YOU)

      // A. FAIL-FAST SUFFIX CHECK (New Security Layer)
      if (!role_prefix == "SystemUser") {
        return ErrorHandler(FireWall)({
          documentation: doc,
          error_message:
            "Token is missing a tenant reference but the role suffix is incorrect (not -SystemUser).",
          custom_error_message:
            "System Access Restricted. Invalid Role Structure.",
          _response: res,
          status_code: 401,
          adjustment: {
            _forcelogUserOut: true,
          },
        }).UserResponse();
      }

      // B. DB Lookup (The core Atomicity Check)
      const systemUser = await SystemUser.findOne({ _id: decoded.sub });

      // C. Error Check: System User Status
      if (!systemUser || !systemUser.isActive) {
        return ErrorHandler(FireWall)({
          documentation: doc,
          error_message: "System User does not exist or is inactive.",
          custom_error_message: "System Access Restricted. Account Not Found.",
          _response: res,
          status_code: 401,
          adjustment: {
            _forcelogUserOut: true,
          },
        }).UserResponse();
      }

      // D. Success: Attach system user info
      req.user = systemUser;
      req.isSystemUser = true;
      req.isTenant = false;

      next(); // System user is verified and allowed through.
    }
  } catch (error) {
    // This catches expired tokens, JWT decoding failures, or database connection errors.
    return ErrorHandler(FireWall)({
      documentation: doc,
      error_message: error.message,
      custom_error_message: "Token is invalid or expired. Please log in again.",
      _response: res,
      status_code: 401,
      adjustment: {
        _forcelogUserOut: true,
      },
    }).UserResponse();
  }
};

export default FireWall;
