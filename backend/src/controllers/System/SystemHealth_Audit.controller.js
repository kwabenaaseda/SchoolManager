import mongoose from "mongoose";
import { controllerWrapper, sendSuccessResponse, Logger } from "../../utils/Logging.js";

/**
 * =================================================================
 * INTERNAL HEALTH CHECKS (Includes necessary simulations for services
 * that don't have actual endpoints in this mock environment, like Redis/AI)
 * =================================================================
 */

// 1. Check Database Health (Mongoose/MongoDB)
const checkDatabaseHealth = async () => {
  try {
    const startTime = process.hrtime.bigint();
    
    // Mongoose connection state (1 is connected)
    const dbState = mongoose.connection.readyState; 
    
    // Simulate latency for a minimal database operation
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 40) + 10)); 
    
    const endTime = process.hrtime.bigint();
    const latencyMs = Number(endTime - startTime) / 1000000;

    const status = dbState === 1 ? "healthy" : "unhealthy";
    
    return {
      status: status,
      latency: parseFloat(latencyMs.toFixed(2)),
      detail: dbState === 1 ? "Connected via Mongoose." : `Disconnected (State: ${dbState})`,
    };

  } catch (error) {
    // If the database check critically fails (e.g., initial connection error)
    Logger.error(checkDatabaseHealth.name, "Database check failed.", error);
    return {
      status: "critical",
      latency: 0,
      detail: `Database connection error: ${error.message}`,
    };
  }
};

// 2. Check External AI Service (SIMULATED: Replace with your actual Gemini API PING check later)
const checkAiServiceHealth = async () => {
    try {
        // Simulate an external API call delay (50-150ms)
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 100) + 50)); 

        return {
            status: "healthy",
            version: "v2.5-flash-preview-09-2025",
            detail: "AI Model inference endpoint is operational.",
            latency: 120.5, // Mock latency
        };
    } catch (error) {
         Logger.error(checkAiServiceHealth.name, "AI Service check failed.", error);
        return {
            status: "unhealthy",
            version: "N/A",
            detail: "External AI service failed to respond.",
            latency: 0,
        };
    }
};


/**
 * ===============================================================
 * CORE CONTROLLER FUNCTION: GET SYSTEM HEALTH
 * Orchestrates all individual health checks and aggregates the results.
 * ===============================================================
 */
const _Get_System_Health = async (req, res) => {
    Logger.info(_Get_System_Health.name, "Executing full system health check.");

    // Run all checks concurrently for maximum speed
    const [database, aiService] = await Promise.all([
        checkDatabaseHealth(),
        checkAiServiceHealth(),
    ]);

    // Aggregate all service results
    const services = {
        database,
        aiService,
    };

    // Determine the overall system status based on the worst-performing service
    const overallStatus = 
        Object.values(services).some(s => s.status === "critical") ? "critical" :
        Object.values(services).some(s => s.status === "unhealthy") ? "degraded" :
        "healthy";

    Logger.debug(_Get_System_Health.name, `Overall System Status: ${overallStatus}`);

    return sendSuccessResponse(res, {
        successMessage: "System health check completed.",
        data: {
            status: overallStatus,
            services: services,
        }
    });
};

// EXPORT: The ready function wrapped in the controllerWrapper
export const Get_System_Health = controllerWrapper(_Get_System_Health);