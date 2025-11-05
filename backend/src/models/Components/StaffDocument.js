// StaffDocument.js
import mongoose from "mongoose";

const StaffDocumentSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // Link to the staff member this document belongs to (if personal)
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: "STAFF_MODEL" }, 
    
    file_name: { type: String, required: true },
    file_url: { type: String, required: true }, // Path to the file storage (S3, etc.)
    file_category: { type: String, required: true }, // e.g., "Contract", "Policy", "Certificate"
    
    // Audience/Access Control
    is_public_to_all_staff: { type: Boolean, default: false }, // If the document is for all staff (e.g., policy manual)
    
    uploaded_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("StaffDocument", StaffDocumentSchema);