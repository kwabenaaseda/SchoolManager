// utils/AuditService.js
import AuditLog from "../models/SYSTEM/AuditLog.js";
import { Logger } from "./Logging.js";

/**
 * ===============================================================
 * AUDIT SERVICE
 * Centralized function to log user actions to the database.
 * ===============================================================
 * @param {object} logData - The data for the audit log entry.
 * @param {string} logData.actionType - The action type (e.g., "CREATE", "LOGIN").
 * @param {string} logData.description - A detailed description of the event.
 * @param {string} logData.actorId - The ID of the user performing the action (req.user._id).
 * @param {string} logData.actorRole - The role of the user performing the action (req.user.platform_role or req.user.role).
 * @param {string} [logData.tenantId] - Optional: The ID of the tenant where the action took place (for tenant users).
 * @param {string} logData.targetModel - The name of the model affected (e.g., "SYSTEM_USER_MODEL").
 * @param {string} [logData.targetId] - Optional: The ID of the document affected (e.g., the ID of the new user).
 * @param {object} [logData.changes] - Optional: The before and after data for updates.
 */
export const LogAuditAction = async ({
  actionType,
  description,
  actorId,
  actorRole,
  tenantId = null, // Default to null for system actions
  targetModel,
  targetId,
  changes,
}) => {
  try {
    const logEntry = {
      action_type: actionType,
      description: description,
      actor: {
        user_id: actorId,
        user_role: actorRole,
      },
      tenant_id: tenantId, // Will be null for system actions
      target_resource: {
        model_name: targetModel,
        document_id: targetId,
      },
      changes: changes,
    };

    // Note: We use .create and do not await, allowing the API response 
    // to be sent back quickly without waiting for the log write to complete.
    await AuditLog.create(logEntry); 
    Logger.info('AuditService', `Successfully logged action: ${actionType} by ${actorId}`);

  } catch (error) {
    // CRITICAL: Log audit failure internally, but do NOT crash the main API request flow.
    Logger.error('AuditService', `Failed to create audit log entry. This is a high-priority system alert.`, error);
  }
};