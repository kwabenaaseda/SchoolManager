// utils/HealthService.js
import SystemHealth from "../models/SYSTEM/SystemHealth.js";
import { Logger } from "./Logging.js";

/**
 * ===============================================================
 * HEALTH SERVICE
 * Centralized function to log critical system health events to the database.
 * ===============================================================
 * @param {object} eventData - The data for the system event.
 * @param {string} eventData.eventType - The type of event (e.g., "DB_CONNECT", "SERVER_START").
 * @param {string} eventData.component - The component involved (e.g., "DATABASE_MONGO", "API").
 * @param {string} eventData.status - The event status ("SUCCESS", "FAILURE", "WARNING").
 * @param {string} eventData.message - A detailed message about the event.
 * @param {number} [eventData.durationMs] - Optional: How long the operation took.
 * @param {object} [eventData.details] - Optional: Stack trace or error object.
 */
export const LogSystemEvent = async ({
  eventType,
  component,
  status,
  message,
  durationMs,
  details,
  tenantId = null,
}) => {
  try {
    const eventEntry = {
      event_type: eventType,
      component: component,
      status: status,
      message: message,
      duration_ms: durationMs,
      details: details,
      tenant_id: tenantId,
    };

    // Use create and await to ensure the event is logged immediately, 
    // as system health events are often high-priority.
    await SystemHealth.create(eventEntry); 
    Logger.info('HealthService', `Logged system event: ${eventType} - ${status}`);

  } catch (error) {
    // CRITICAL: If the health log itself fails, we must log it to the console, 
    // but we do not crash the application.
    Logger.error('HealthService', `FATAL: Failed to log system health event.`, error);
  }
};