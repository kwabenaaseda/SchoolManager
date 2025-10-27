import mongoose from "mongoose";

const StudentModel = new mongoose.Schema(
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
      enrollment_date: {
        type: Date,
        required: true,
      },
      picture_url: {
        type: String,
      },
    },
    current_class_id: {
      type: ObjectId,
    },
    illness_status: {
      type: String,
    },
    parent_info: [
      {
        type: Object,
        required: true,
        name: {
          type: String,
          required: true,
        },
        contact_number: {
          type: String,
          required: true,
        },
        relationship: { type: String, required: true },
      },
    ],
    emergency_contact: [
      {
        type: Object,
        required: true,
        name: {
          type: String,
          required: true,
        },
        contact_number: {
          type: String,
          required: true,
        },
        relationship: { type: String, required: true },
      },
    ],
    data_points: {
      type: Object,
      courses: [
        {
          type: Object,
          name: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
        },
      ],
      reports: [
        {
          type: Object,
          report_year: {
            type: Date,
            required: true,
          },
          class_position: {
            type: String,
            required: true,
          },
          num_in_class: {
            type: Number,
            required: true,
          },
          teacher: {
            type: String,
            required: true,
          },
          grading: [
            {
              Subject_name: {
                type: String,
                required: true,
              },
              class_score: {
                type: Number,
                required: true,
              },
              exam_score: {
                type: Number,
                required: true,
              },
              grade: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
      bills: [
        {
          type: Object,
          category: {
            type: String,
            required: true,
          },
          year: {
            type: Date,
          },
          sum_total: {
            type: Number,
          },
          body: [
            {
              type: Object,
              required: true,
              item_name,
              price,
              data: {
                type: Object,
                about: {
                  type: String,
                },
                quantity: {
                  type: Number,
                },
              },
            },
          ],
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
          content: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

// Password hashing middleware
StudentModel.pre("save", async function (next) {
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
StudentModel.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const STUDENT = mongoose.model("STUDENT_MODEL", StudentModel);

export { STUDENT };
