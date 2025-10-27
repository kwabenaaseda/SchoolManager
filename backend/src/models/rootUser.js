import mongoose from "mongoose";

const RootUser = new mongoose.Schema(
  {
    associated_user_id: {
      type: ObjectId,
      required: true,
    },
    associated_finance_id: {
      type: ObjectId,
      required: true,
    },
    associated_task_id: {
      type: ObjectId,
      required: true,
    },
    associated_announcement_id: {
      type: ObjectId,
      required: true,
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
