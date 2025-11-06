import jwt from "jsonwebtoken";

const ACCESS_AUTH_EXPIRES = "10m";
const REFRESH_AUTH_EXPIRES = "7d";
const AUTHENTICATION_EXPIRES = "5m";

export const AccessSign = ({ id, role, tenant }) => {
  const payload = {
    sub: id,
    role: role,
    ref: tenant,
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

export const AuthenticationAccessSign = ({ id, role, tenant }) => {
  const payload = {
    sub: id,
    role: role,
    ref: tenant,
    tar:'Linking'
  };
  const options = {
    expiresIn: AUTHENTICATION_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload,process.env.JWT_SECRET_KEY,options)
};
