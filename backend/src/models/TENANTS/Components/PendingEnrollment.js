// PendingEnrollment.js (Temporary Storage for Admissions)
import mongoose from "mongoose";

const PendingEnrollmentSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    
    // The Parent/Guardian who submitted the form
    submitter_contact: {
      email: { type: String, required: true },
      phone: { type: String },
      // The OTP is verified against this contact before submission
    },
    
    // 1. The Secure Trust Link (The initial key)
    unique_verification_key: { type: String, required: true, unique: true }, // From your QR code/Link
    
    // 2. The Student's Raw Data
    raw_student_data: {
      type: mongoose.Schema.Types.Mixed, // Stores the complete form submission (demographics, etc.)
      required: true,
    },
    
    // 3. The Workflow Status
    payment_status: {
      type: String,
      enum: ["Pending", "Paid_Unverified", "Refunded"],
      default: "Pending",
    },
    admin_approval_status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    
    // 4. Audit
    admission_fee_id: { type: mongoose.Schema.Types.ObjectId, ref: "StudentFinanceRecord" }, // Link to payment log
    approved_by_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Which admin approved it
    
    // TTL Index (Time To Live):
    // This is a feature of MongoDB that automatically deletes the document after a certain time
    // (e.g., 90 days), so old, failed applications don't live forever.
    createdAt: { type: Date, default: Date.now, expires: '90d' }, 
  },
  { timestamps: true }
);

export default mongoose.model("PendingEnrollment", PendingEnrollmentSchema);