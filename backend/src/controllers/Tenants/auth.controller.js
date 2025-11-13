import {
  controllerWrapper,
  Logger,
  sendSuccessResponse,
} from "../../utils/Logging.js";
import User from "../../models/TENANTS/users/User.js";
import bcrypt from "bcryptjs";
import { AccessSign, RefreshAccessSign } from "../../utils/auth.js";

const _Login = async (req, res) => {
  Logger.debug(_Login.name, "Attempting Tenant User Login", {
    email: req.body.email,
  });

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw {
      statusCode: 401,
      message: "Invalid credentials.",
      name: "AuthenticationError",
    };
  }
  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw {
      statusCode: 401,
      message: "Invalid credentials.",
      name: "AuthenticationError",
    };
  }

  if (!user.isActive) {
    Logger.warn(_Login.name, `Inactive user attempted login : ${user.email}`);
    throw {
      statusCode: 403,
      message: "Account is inactive. Please contact your Adminstrator",
      name: "AccountInactiveError",
    };
  }

  const accessToken = AccessSign({
    id: user._id,
    role: user.role,
    tenant: user.tenantId,
  });
  const refreshToken = RefreshAccessSign({ id: user._id });

  await User.findByIdAndUpdate(user._id, { last_login: Date.now() }).catch(
    (e) => {
      Logger.error(_Login.name, "Failed to update User last_login ", e);
    }
  );

  return sendSuccessResponse(res, {
    successMessage: `Welcome back, ${user.username}`,
    data: {
      userId: user._id,
      email: user.email,
      platformRole: user.role,
      accessToken,
      refreshToken,
    },
  });
};
export const Login = controllerWrapper(_Login);
