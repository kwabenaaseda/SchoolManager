import mongoose from "mongoose";

const RootUser = new mongoose.Schema(
  {
    associated_user_id: {
      type: mongoose.Schema.Types.ObjectId, // Point to the owner in the Users
      required: true,
    },
    associated_finance_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    associated_announcement_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    is_active: {
      type: Boolean,
    },
    last_login: {
      type: Date,
    },
  },
  { timestamps: true }
);

const OWNER = mongoose.model("ROOTUSER", RootUser);
export default { OWNER };
