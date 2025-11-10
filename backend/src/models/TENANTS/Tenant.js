// backend/src/models/Tenant.js
import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    // schoolone.yoursystem.com
    ownerId: {
      type: mongoose.Schema.Types.ObjectId, //Point to the Owner in RootUser
      ref: "User",
      required: false,
    }, // The super admin user
    subscriptionPlan: {
      type: String,
      default: "Standard",
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Trial"],
      default: "Trial",
    },
    // Fields for dynamic website content (e.g., branding) can be added here

  },
  { timestamps: true }
);

export default mongoose.model("Tenant", TenantSchema);
