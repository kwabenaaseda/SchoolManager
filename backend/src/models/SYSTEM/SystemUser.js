// models/users/SystemUser.js (New Model)
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const SystemUserSchema = new mongoose.Schema(
  {
    // NO tenantId here!
    first_name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Role for platform control (e.g., SuperAdmin, PlatformFinance, Engineer)
    platform_role: { 
      type: String, 
      required: true,
      enum: ["SuperAdmin", "PlatformFinance", "PlatformEngineer","Pending"], 
    },
    associated_rootuser_id: {
          type: mongoose.Schema.Types.ObjectId, // Your personal login ID (from User model)
          ref: "User",
          required: false,
          unique: true, // Only one RootUser document per associated user
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