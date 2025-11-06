// models/users/SystemUser.js (New Model)
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const SystemUserSchema = new mongoose.Schema(
  {
    // NO tenantId here!
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Role for platform control (e.g., SuperAdmin, PlatformFinance, Engineer)
    platform_role: { 
      type: String, 
      required: true,
      enum: ["SuperAdmin", "PlatformFinance", "PlatformEngineer"], 
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
SystemUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

SystemUserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};
export default mongoose.model("SystemUser", SystemUserSchema);