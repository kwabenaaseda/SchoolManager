// TenantConfiguration.js (School-specific settings)
import mongoose from "mongoose";

const TenantConfigurationSchema = new mongoose.Schema(
  {
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      unique: true, // One config document per school
    },
    
    // Appearance and Branding
    branding: {
      logo_url: { type: String },
      primary_color: { type: String },
    },
    
    // Communication & Integration (For your AI/Email goals)
    communication: {
      smtp_settings: {
        server: { type: String }, // e.g., for sending parent emails
      },
      ai_api_key: { type: String }, // The school's key for the report card AI service
      sms_gateway: { type: String },
    },
    
    // Operational Hours/Dates
    academic_settings: {
      school_hours: { type: String },
      start_date: { type: Date },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TenantConfiguration", TenantConfigurationSchema);