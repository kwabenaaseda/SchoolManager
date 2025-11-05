// Announcement.js (Single Source of Truth)
import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    header: { type: String, required: true },
    content: { type: String, required: true },
    
    // Who is the message for?
    target_role: {
      type: String,
      enum: ["All", "Student", "Staff", "Admin"],
      default: "All",
    },
    
    // Optional: Target a specific class, if target_role is 'Student'
    target_class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

    from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", AnnouncementSchema);