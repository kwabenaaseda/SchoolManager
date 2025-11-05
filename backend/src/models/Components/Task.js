// StaffTask.js
import mongoose from "mongoose";

const StaffTaskSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // The array of staff members assigned to this task (Many-to-Many)
    assigned_staff_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "STAFF_MODEL" }],
    
    task_header: { type: String, required: true },
    description: { type: String },
    due_date: { type: Date },
    task_status: {
      type: String,
      enum: ["pending", "in-progress", "done", "archived"],
      default: "pending",
    },
    created_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("StaffTask", StaffTaskSchema);