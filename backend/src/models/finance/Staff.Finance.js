import mongoose from "mongoose";

const Staff_Finance = new mongoose.Schema(
  {
    rootUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Tenant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    allowedUsers: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        expires_at: { type: Date, required: true }, // The time the access window closes
        authorized_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For auditing
      },
    ],
    associated_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    Salary_Allocation: {
      Current_PAY: {
        Currency: {
          type: String,
          default: "GHC",
        },
        figure: {
          type: mongoose.Schema.Types.Number,
        },
      },
      PaySlip: [
        {
          Amount_Paid: {
            Currency: {
              type: mongoose.Schema.Types.String,
              default: "GHC",
            },
            figure: {
              type: mongoose.Schema.Types.Number,
            },
          },
          Amount_Remaining: {
            Currency: {
              type: mongoose.Schema.Types.String,
              default: "GHC",
            },
            figure: {
              type: mongoose.Schema.Types.Number,
            },
          },
          Paid_By: {
            user_id: {
              type: mongoose.Schema.Types.ObjectId,
            },
            user_Name: {
              type: String,
            },
            user_Contact: {
              type: String,
            },
          },
          timeStamp: { type: Date, default: Date.now },
        },
      ],
    },
    Bonuses: [
      {
        Current_allocation: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Amount_Paid: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Amount_Remaining: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Paid_By: {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
          },
          user_Name: {
            type: String,
          },
          user_Contact: {
            type: String,
          },
        },
        timeStamp: `${new Date().getDay()} -  ${new Date().getMonth()} -   ${new Date().getFullYear()} /${new Date().getHours()} -    ${new Date().getMinutes()} -  ${new Date().getSeconds()} -  ${new Date().getMilliseconds()} -  `,
      },
    ],
    other_allocations: [
      {
        Current_allocation: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Amount_Paid: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Amount_Remaining: {
          Currency: {
            type: String,
            default: "GHC",
          },
          figure: {
            type: mongoose.Schema.Types.Number,
          },
        },
        Paid_By: {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
          },
          user_Name: {
            type: String,
          },
          user_Contact: {
            type: String,
          },
        },
        timeStamp: `${new Date().getDay()} -  ${new Date().getMonth()} -   ${new Date().getFullYear()} /${new Date().getHours()} -    ${new Date().getMinutes()} -  ${new Date().getSeconds()} -  ${new Date().getMilliseconds()} -  `,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Staff_Finance", Staff_Finance);
