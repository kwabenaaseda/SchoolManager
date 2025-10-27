import jwt from "jsonwebtoken";

const ACCESS_AUTH_EXPIRES = "10m";
const REFRESH_AUTH_EXPIRES = "7d";

export const AccessSign = ({ id, role }) => {
  const payload = {
    sub: id,
    role: role,
  };
  const options = {
    expiresIn: ACCESS_AUTH_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};
export const RefreshAccessSign = ({ id }) => {
  const payload = {
    sub: id,
  };
  const options = {
    expiresIn: REFRESH_AUTH_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};
export const VerifyAccessSign = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
