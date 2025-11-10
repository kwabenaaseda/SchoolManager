import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // We store the hashed password, not the raw one
    

    // 🔑 THE CRITICAL MULTI-TENANCY LINK
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      unique:true
    },

    // 🔑 THE ACCESS CONTROL LINKS
    role: { type: String, required: true }, // Simplified for now (Admin, Teacher, Student)
    roleOverrides: { type: [String], default: [] }, // For granular permissions (Phase 7.5)

    // Optional links for query optimization
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },

    // Compliance and Status
    isComplianceChecked: { type: Boolean, default: false }, // For payroll checks (Phase 6)
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
