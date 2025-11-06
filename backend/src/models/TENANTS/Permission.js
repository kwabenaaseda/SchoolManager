// Permission.js (For scalable Role-Based Access Control)
import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true }, // e.g., 'Admin', 'Teacher', 'Finance_Clerk'
    
    // An array of permissions granted to this role
    permissions: [
      {
        resource: { type: String, required: true }, // e.g., 'StudentReport', 'StaffFinance', 'TenantSettings'
        action: { 
          type: String, 
          enum: ["read", "create", "update", "delete", "publish"], // The CRUD actions
          required: true 
        },
        // Scope allows for future Attribute-Based Access Control (ABAC)
        scope: { 
          type: String, 
          enum: ["own", "all", "tenant"], // e.g., "Teachers can 'update' grades for 'own' students."
          default: "tenant"
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Permission", PermissionSchema);