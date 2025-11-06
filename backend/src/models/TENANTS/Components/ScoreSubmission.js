// ScoreSubmission.js (The Raw Data Input)
import mongoose from "mongoose";

const ScoreSubmissionSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // The Context: What score is this?
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    assessment_type: { 
      type: String, 
      enum: ["Class Score", "Mid-Term Exam", "Final Exam", "Assignment"],
      required: true 
    },
    
    // Access: Who submitted it?
    submitted_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // The Data: An array of student scores
    student_scores: [
      {
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: "STUDENT_MODEL", required: true },
        raw_score: { type: Number, required: true }, // e.g., 85/100
        max_score: { type: Number, required: true, default: 100 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ScoreSubmission", ScoreSubmissionSchema);