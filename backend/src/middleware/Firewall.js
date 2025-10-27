import { VerifyAccessSign } from "../utils/auth.js";
import { USERMODEL } from "../models/user.js";

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
    const user = await USERMODEL.findOne({ _id: decoded.sub }) 
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User Not Found!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    
  }
};
export default FireWall;
