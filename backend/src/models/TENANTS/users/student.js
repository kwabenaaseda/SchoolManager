// Student.js (Optimized for performance)
import mongoose from "mongoose";

const StudentModel = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User login
    Tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }, // Multi-Tenancy Link
    
    // Flattened Demographics for easy querying
    firstname: { type: String, required: true }, // From original demographics.username.firstname
    lastname: { type: String, required: true }, // From original demographics.username.lastname
    date_of_birth: { type: Date, required: true }, //
    gender: { type: String, required: true }, //
    picture_url: { type: String }, //

    enrollment_date: { type: Date, required: true }, //
    current_class_id: { type: mongoose.Schema.Types.ObjectId }, //
    illness_status: { type: String }, //
    
    // Parent Info & Emergency Contacts remain arrays, as they are part of core identity
    parent_info: [
      {
        name: { type: String, required: true },
        contact_number: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ], //
    emergency_contact: [
      {
        name: { type: String, required: true },
        contact_number: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ], //
  },
  { timestamps: true }
);

const STUDENT = mongoose.model("STUDENT_MODEL", StudentModel);
export { STUDENT };