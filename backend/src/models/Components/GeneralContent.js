// GeneralContent.js (For Menus, Timetables, Policies, etc.)
import mongoose from "mongoose";

const GeneralContentSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // What is it?
    title: { type: String, required: true }, // e.g., "New Food Menu Q2"
    content_type: {
      type: String,
      enum: ["Document", "Image", "Text_Memo", "Link"],
      required: true,
    },
    
    // The actual content (file path or text)
    content_path_or_url: { type: String, required: true }, 
    
    // Access Control (Fulfilling your multi-layered vision)
    target_audience: {
      type: String,
      enum: ["All_Users", "Staff", "Student", "Parent", "Public"], // 'Public' means anyone on the website
      required: true,
    },
    
    // For Timetables/Class-specific content
    target_class_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], 
    
    // Audit
    uploaded_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("GeneralContent", GeneralContentSchema);