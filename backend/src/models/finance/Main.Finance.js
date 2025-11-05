// Main.Finance.js (Timestamp Fix and Normalization)
import mongoose from "mongoose";

const Main_Finance = new mongoose.Schema(
  {
    rootUser: { type: mongoose.Schema.Types.ObjectId, required: true }, //
    Tenant: { type: mongoose.Schema.Types.ObjectId, required: true }, //
allowedUsers: [
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expires_at: { type: Date, required: true }, // The time the access window closes
    authorized_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For auditing
  },
], //

    // INCOME
    Income_Record: [
      {
        Source_Of_Payment: {
          is_user: { type: Boolean, default: true },
          user_id: { type: mongoose.Schema.Types.ObjectId },
          Sender_Name: { type: String },
          Sender_Contact: { type: String },
        },
        Payment_Category: { type: String },
        Amount_Received: {
          Currency: { type: String, default: "GHC" },
          figure: { type: Number },
        },
        timeStamp: { type: Date, default: Date.now }, // ***FIXED TIMESTAMP***
        Reciepient_: {
          user_id: { type: mongoose.Schema.Types.ObjectId },
          user_Name: { type: String },
          user_Contact: { type: String },
        },
      },
    ],
    
    // EXPENSE (Same timestamp fix applied)
    Expense_Record: [
      {
        Reciepient_Of_Payment: {
          is_user: { type: Boolean, default: true },
          user_id: { type: mongoose.Schema.Types.ObjectId },
          Reciepient_Name: { type: String },
          Reciepient_Contact: { type: String },
        },
        Payment_Category: { type: String },
        Amount_Paid: {
          Currency: { type: String, default: "GHC" },
          figure: { type: Number },
        },
        timeStamp: { type: Date, default: Date.now }, // ***FIXED TIMESTAMP***
        Representative_: {
          user_id: { type: mongoose.Schema.Types.ObjectId },
          user_Name: { type: String },
          user_Contact: { type: String },
        },
        Authorized_By: {
          user_id: { type: mongoose.Schema.Types.ObjectId },
          user_Name: { type: String },
          user_Contact: { type: String },
          Reason_For_Authorization: { type: String },
        },
      },
    ],

    // Inventory remains structured as a chronological array of stock records
    Inventory: [
      {
        Stock: [
          {
            Item_Name: { type: String, required: true },
            Item_Quantity_Original: { type: Number, required: true },
            Item_Quantity_Current: { type: Number, required: true },
            Item_Cost_Price: {
              Currency: { type: String, default: "GHC" },
              figure: { type: Number },
            },
            Sufficient: { type: Boolean, default: true, required: true },
            Restock: { type: Boolean, default: false },
          },
        ],
        timeStamp: { type: Date, default: Date.now }, // ***FIXED TIMESTAMP***
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Main_Finance", Main_Finance);