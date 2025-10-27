import mongoose from "mongoose";

const connectDb = async () => {
  console.log(`Entering: ConnectDb`);
  try {
    console.log("Attempting Connection");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully 🔥🔥");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    /* process.exit(1); */
  }
};

export default connectDb