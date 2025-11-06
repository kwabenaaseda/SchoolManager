// StudentReport.js (Updated for AI Workflow)
import mongoose from "mongoose";

const StudentReportSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "STUDENT_MODEL", required: true },
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // Workflow and Audit
    term: { type: String, required: true },
    academic_history_id: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicHistory" }, 
    grading_system_id: { type: mongoose.Schema.Types.ObjectId, ref: "GradingSystem" }, // Tracks the system used for calculation
    
    // AI Generation Status (Critical for your design)
    ai_generation_status: {
      type: String,
      enum: ["Pending", "Processing", "Complete", "Error"],
      default: "Pending",
    },
    report_file_url: { type: String }, // Link to the AI-generated PDF in cloud storage
    
    is_published: { type: Boolean, default: false }, // For student/parent viewing
    
    // Audit of the key result
    overall_grade: { type: String },
    
    // Storing the AI-generated summary/commentary
    ai_summary_comment: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("StudentReport", StudentReportSchema);