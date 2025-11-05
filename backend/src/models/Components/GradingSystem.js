// GradingSystem.js (The Rule Book for Grading)
import mongoose from "mongoose";

const GradingSystemSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true }, // e.g., "Primary Term 1 System 2025"
    is_active: { type: Boolean, default: true },
    
    // Weighting for final grade calculation
    weighting: {
      class_score_percent: { type: Number, required: true, default: 40 }, // 40%
      exam_score_percent: { type: Number, required: true, default: 60 }, // 60%
    },
    
    // The Conversion Table (e.g., 90-100 = A)
    grade_conversion: [
      {
        grade: { type: String, required: true }, // e.g., 'A', 'B+', 'Fail'
        min_score: { type: Number, required: true }, // 90
        max_score: { type: Number, required: true }, // 100
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("GradingSystem", GradingSystemSchema);