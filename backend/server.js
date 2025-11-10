import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import { Logger } from "./src/utils/Logging.js"; // New: Import our consistent logger

const port = process.env.PORT || 5100;

/**
 * The main function to initiate the application.
 * This is an async function so we can WAIT for critical services (like MongoDB)
 * to be ready before declaring the server "Live."
 */
async function startServer() {
  try {
    // 1. Log the attempt to connect to the database
    Logger.info("ServerInit", "Attempting to connect to the primary MongoDB database...");
    
    // 2. WAIT for the database connection to complete successfully.
    await connectDb(); 

    // 3. Start the Express application, now that the database connection is ready.
    app.listen(port, () => {
      // 4. Use the Logger utility for consistent, structured output.
      Logger.info("ServerInit", `Server Live on http://localhost:${port}. System is Go! ✅`);
    });
  } catch (error) {
    // 5. CRITICAL FAILURE: If we cannot connect to the database, we must stop!
    Logger.error("ServerInit", "CRITICAL FAILURE: Failed to initialize application dependencies. Shutting down.", error);
    process.exit(1); // Exit the process with an error code (1 means failure)
  }
}

// Execute the server start function.
startServer();