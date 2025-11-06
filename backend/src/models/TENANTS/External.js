// ExternalUser.js (For Parents, Shareholders, Board Members)
import mongoose from "mongoose";

const ExternalUserSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // The role for external users
    external_role: { 
      type: String, 
      enum: ["Parent", "Guardian", "Shareholder", "Board Member"], 
      required: true 
    },
    
    // If they are a Parent, link them to the student(s) they manage
    associated_student_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "STUDENT_MODEL" }],
    
    // Optional: For Shareholders, what data they are allowed to access (e.g., Main.Finance summary)
    shareholder_access_level: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ExternalUser", ExternalUserSchema);