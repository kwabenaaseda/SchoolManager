// SystemHealth.js (For tracking errors, latency, and resource usage)
import mongoose from "mongoose";

const SystemHealthSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }, // Can be null for global errors
    component: {
      type: String,
      enum: ["API", "DATABASE", "FINANCE_SERVICE", "AUTH_SERVICE"],
      required: true,
    },
    log_level: {
      type: String,
      enum: ["INFO", "WARN", "ERROR", "CRITICAL"],
      default: "INFO",
    },
    message: { type: String, required: true },
    details: {
      type: mongoose.Schema.Types.Mixed, // Stack traces, error objects, latency figures
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("SystemHealth", SystemHealthSchema);