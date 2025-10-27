import mongoose from "mongoose";

const StaffModel = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
    },
    school_id: {
      type: String,
      required: true,
    },
    demographics: {
      type: Object,
      required: true,
      username: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
      },
      date_of_birth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      picture_url: {
        type: String,
      },
    },
    job_details: {
      type: Object,
      required: true,
      job_role: {
        type: String,
        required: true,
      },
      start_date: {
        type: Date,
        required: true,
      },
    },
    payroll_info: {
      type: Object,
      payroll_num: {
        type: String,
      },
      snnit_number: {
        type: String,
      },
      national_id: {
        type: Object,
        id_type: {
          type: String,
        },
        id_number: {
          type: String,
        },
      },
    },
    contact_info: {
      type: Object,
      required: true,
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },
    emergency_contact: {
      type: Object,
      name: {
        type: String,
      },
      relationship: {
        type: String,
      },
      phone: { type: String },
    },
    assigned_tasks: [
      {
        type: Object,
        task_id: ObjectId,
        task_header: {
          type: String,
        },
        task_status: {
          type: String,
          enum: ["pending", "in-progress", "done"],
          default: "pending",
        },
      },
    ],
    reference_documents: [
      {
        type: Object,
        file_name: {
          type: String,
          required: true,
          unique: true,
        },
        file_url: {
          type: String,
          required: true,
          unique: true,
        },
        file_original_name: {
          type: String,
          required: true,
        },
        file_size: {
          type: Number,
          required: true,
          unique: true,
        },
        file_category: {
          type: String,
          required: true,
        },
      },
    ],
    announcements: [
      {
        type: Object,
        header: {
          type: String,
          required: true,
        },
        from: {
          type: Object,
          source_id: ObjectId,
        },
        message_id: {
          type: ObjectId,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const STAFF = mongoose.model("STAFF_MODEL", StaffModel);

export { STAFF };
