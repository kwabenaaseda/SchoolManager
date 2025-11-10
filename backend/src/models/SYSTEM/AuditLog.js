// models/SYSTEM/AuditLog.js (The System Tracking/Auditing Model)
import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    // 1. WHAT HAPPENED?
    action_type: {
      type: String,
      enum: [
        "CREATE",
        "READ",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "EXPORT",
        "PASSWORD_CHANGE",
      ],
      required: true,
    },
    description: {
      type: String, // e.g., "Added new student: Jane Doe (ID: 1234)"
      required: true,
    },
    
    // 2. WHO DID IT?
    actor: {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      user_role: { type: String }, // For easy querying
    },

    // 3. WHERE DID IT HAPPEN?
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: false, // <-- FIX: Made optional to support platform-level actions
    },
    
    // 4. WHAT WAS AFFECTED?
    target_resource: {
      model_name: { type: String, required: true }, // e.g., "STUDENT_MODEL", "SYSTEM_USER_MODEL"
      document_id: { type: mongoose.Schema.Types.ObjectId }, // The ID of the document affected
    },

    // 5. THE DATA (Optional - for high security)
    changes: {
      type: mongoose.Schema.Types.Mixed, // Stores the 'before' and 'after' data (e.g., { old_name: "Tim", new_name: "Timothy" })
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", AuditLogSchema);