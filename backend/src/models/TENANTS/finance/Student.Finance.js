import mongoose from "mongoose";

const Student_Finance = new mongoose.Schema({
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
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expires_at: { type: Date, required: true }, // The time the access window closes
    authorized_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For auditing
  },
],
  associated_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  BILLS: [
    {
      type: Object,
      Year: {
        type: Date,
      },
      Category: {
        type: String,
      },
      Currency: {
        type: String,
        default: "GHC",
      },
      Total_Amount: {
        type: Number,
      },
      issued_By: {
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
      Main_id: {
        type: Number,
      },
      Safe_Duration: {
        type: Date,
      },
    },
  ],

  Records: [
    {
      type: Object,
      Year: {
        type: Date,
      },
      Bill_id: {
        type: Number,
      },
      Payments: [
        {
          type: Object,
          amounts_paid: {
            Currency: {
              type: String,
              default: "GHC",
            },
            Total_Amount: {
              type: Number,
            },
          },
          Category: {
            type: String,
            required: true,
          },
        },
      ],
      is_Exceeded_Duration: {
        type: Boolean,
        default: false,
      },
      Debt: {
        type: Object,
        Total_Debt: {
          Currency: {
            type: String,
            default: "GHC",
          },
          Total: {
            type: Number,
          },
        },
        Debts:[{type:Number}]
      },
    },
  ],
});

export default mongoose.model("Student_Finance", Student_Finance);
