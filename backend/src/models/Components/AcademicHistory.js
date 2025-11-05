// AcademicHistory.js
import mongoose from "mongoose";

const AcademicHistorySchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: "STUDENT_MODEL", required: true },
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    academic_year: { type: Number, required: true }, // e.g., 2024
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    
    // Historical status for that year/class
    status: {
      type: String,
      enum: ["Enrolled", "Promoted", "Repeated", "Transferred"],
      default: "Enrolled",
    },
    
    // The specific grades for courses taken that year/class
    course_grades: [
      {
        course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "STAFF_MODEL" },
        final_score: { type: Number },
        grade_letter: { type: String },
        report_card_id: { type: mongoose.Schema.Types.ObjectId, ref: "StudentReport" } // Link to the official report document
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("AcademicHistory", AcademicHistorySchema);