import mongoose from "mongoose";

const FeatureScope = [
  {
    name: "READ ONLY",
    activated: {
      type: Boolean,
      default: true,
    },
  },
  {
    name: "FINANCE READ",
    activated: {
      type: Boolean,
      default: true,
    },
  },
];

const USER = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    school_id: {
      type: String, //User school initials + format (role - year - number in db)
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "staff", "parent"],
      required: true,
    },
    is_active: {
      type: Boolean,
    },
    associated_doc_id: {
      type: ObjectId,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    base_id: {
      type: ObjectId,
    },
  },
  { timestamps: true }
);

// Password hashing middleware
USER.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
USER.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const USERMODEL = mongoose.model("USER", USER);

export { USERMODEL };
