// dbConnect.js - Mock file for connecting to the database
import mongoose from "mongoose";
import { Logger } from "../utils/Logging.js";
import { LogSystemEvent } from "../utils/HealthService.js"; // <-- NEW IMPORT

// A function to connect to your MongoDB
export const connectDB = async () => {
  const startTime = Date.now();
  const dbUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/my_system";

  try {
    Logger.info("Database", `Attempting connection to MongoDB at: ${dbUri}`);
    
    const conn = await mongoose.connect(dbUri);

    const duration = Date.now() - startTime;
    
    // SUCCESS LOGGING: This is the moment of 'revival'
    await LogSystemEvent({
      eventType: "DB_CONNECT",
      component: "DATABASE_MONGO",
      status: "SUCCESS",
      message: `Successfully connected to MongoDB. Database host: ${conn.connection.host}`,
      durationMs: duration,
      details: {
          database: conn.connection.name,
          port: conn.connection.port
      }
    });

    Logger.info("Database", `MongoDB connected successfully in ${duration}ms.`);
    return conn;

  } catch (error) {
    const duration = Date.now() - startTime;
    
    // FAILURE LOGGING: This is a 'death' event
    await LogSystemEvent({
      eventType: "DB_CONNECT",
      component: "DATABASE_MONGO",
      status: "FAILURE",
      message: "Failed to connect to MongoDB. Critical system failure.",
      durationMs: duration,
      details: error.message,
    });
    
    Logger.error("Database", "Failed to connect to MongoDB. Exiting process.", error);
    process.exit(1);
  }
};

// Set up listeners for subsequent disconnects (other 'death' events)
mongoose.connection.on('disconnected', async () => {
    Logger.warn("Database", "MongoDB disconnected!");
    await LogSystemEvent({
        eventType: "DB_DISCONNECT",
        component: "DATABASE_MONGO",
        status: "WARNING",
        message: "MongoDB connection lost unexpectedly. Attempting reconnection.",
    });
});