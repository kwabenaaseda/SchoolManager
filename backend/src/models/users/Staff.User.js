// Staff.js (Optimized for performance)
import mongoose from "mongoose";

const StaffModel = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User login
    school_id: { type: String, required: true }, // Renamed from original to be explicit
    
    // Flattened Demographics
    firstname: { type: String, required: true }, //
    lastname: { type: String, required: true }, //
    date_of_birth: { type: Date, required: true }, //
    gender: { type: String, required: true }, //
    picture_url: { type: String }, //

    // Job Details remain nested for logical grouping
    job_details: {
      job_role: { type: String, required: true }, //
      start_date: { type: Date, required: true }, //
    },
    
    // Contact Info remains nested and required
    contact_info: {
      phone: { type: String, required: true }, //
      email: { type: String, required: true }, //
      address: { type: String, required: true }, //
    },
    
    // Payroll Info remains nested
    payroll_info: {
      payroll_num: { type: String }, //
      snnit_number: { type: String }, //
      national_id: {
        id_type: { type: String }, //
        id_number: { type: String }, //
      },
    },
    emergency_contact: {
      name: { type: String }, //
      relationship: { type: String }, //
      phone: { type: String }, //
    },
  },
  { timestamps: true }
);

const STAFF = mongoose.model("STAFF_MODEL", StaffModel);
export { STAFF };