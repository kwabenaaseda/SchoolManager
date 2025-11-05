import { VerifyAccessSign } from "../utils/auth.js";
import {User} from '../models/users/User.js';
import {Tenant} from '../models/Tenant.js'
const FireWall = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No Token",
    });
  }
  try {
    const decoded = VerifyAccessSign(token);
    const Tenant_user = await Tenant.findOne({_id:decoded.ref})
    const user = await User.findOne({ _id: decoded.sub }) 
    if (!Tenant_user) {
      res.status(401).json({
        success: false,
        message: "Access Denied. Contact your Administrator",
      });
    }
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Access Denied. User Not Found!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    
  }
};
export default FireWall;
