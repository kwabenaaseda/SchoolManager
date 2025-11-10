// models/SYSTEM/SystemHealth.js (For tracking the System's Lifecycle and Component Status)
import mongoose from "mongoose";

const SystemHealthSchema = new mongoose.Schema(
  {
    // What kind of event is this?
    event_type: {
      type: String,
      enum: [
        "COMPONENT_STATUS",
        "API_LATENCY",
        "SERVER_START",
        "SERVER_STOP",
        "DB_CONNECT",
        "DB_DISCONNECT",
      ],
      required: true,
    },
    
    // Which piece of the system is affected?
    component: {
      type: String,
      enum: ["API", "DATABASE_MONGO", "CACHE_REDIS", "AUTH_SERVICE", "EXTERNAL_GATEWAY"],
      required: true,
    },

    // Did it work or fail?
    status: {
      type: String,
      enum: ["SUCCESS", "FAILURE", "WARNING"],
      required: true,
    },
    
    // A brief note on what happened
    message: { type: String, required: true },
    
    // How long did it take? (Useful for latency tracking)
    duration_ms: { type: Number, required: false },

    // Technical details like stack traces or error objects
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    
    // We can still optionally link to a tenant if the failure was scoped
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: false }, 
  },
  { timestamps: true }
);

export default mongoose.model("SystemHealth", SystemHealthSchema);