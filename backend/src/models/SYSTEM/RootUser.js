// RootUser.js (Refactored - Primary purpose is linkage)
import mongoose from "mongoose";

const RootUserSchema = new mongoose.Schema(
  {
    associated_user_id: {
      type: mongoose.Schema.Types.ObjectId, // Your personal login ID (from User model)
      ref: "User",
      required: true,
      unique: true, // Only one RootUser document per associated user
    },
    /* // The link to the main audit log
    associated_audit_log_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "AuditLog",
    }, */
    is_active: { type: Boolean, default: true },
    last_login: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("ROOTUSER", RootUserSchema);