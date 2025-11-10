import { Logger } from "../utils/Logging.js";

/**
 * =================================================================
 * EXPRESS CENTRAL ERROR HANDLING MIDDLEWARE
 * This function catches any error thrown by controllers or other middleware.
 * It's crucial for logging errors and presenting a clean, safe response to the client.
 *
 * @param {Error} err - The error object thrown by the application.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function (not used here as this is the final handler).
 * =================================================================
 */
const errorMiddleware = (err, req, res, next) => {
  // 1. Determine Status Code
  // Start with a generic 500 Internal Server Error, and check if the error object provides a specific status code.
  let statusCode = err.statusCode || 500;
  let userMessage = err.message || "An unknown error occurred on the server.";
  let logCategory = "AppError";

  // 2. Specialized Error Handling (CRITICAL for Mongoose)
  // Check for Mongoose Validation and MongoDB Operation Errors
  if (err.name === 'ValidationError') {
    // A Mongoose validation error (e.g., a required field was missing)
    statusCode = 400; // 400 Bad Request
    userMessage = Object.values(err.errors).map(val => val.message).join(', ');
    logCategory = "MongooseValidationError";
  } else if (err.code === 11000) {
    // CRITICAL: MongoDB Duplicate Key Error (Code 11000)
    // e.g., trying to create a user with an email that already exists.
    statusCode = 409; // 409 Conflict
    logCategory = "DuplicateKeyError";
    // Extract the field name from the error message for a clean user message
    const field = Object.keys(err.keyValue).join(', ');
    userMessage = `A record with this ${field} already exists. Please use a different value.`;
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    // JWT Errors (Authentication problems)
    statusCode = 401; // 401 Unauthorized
    userMessage = 'Authentication token is invalid or has expired. Please log in again.';
    logCategory = "AuthError";
  }

  // 3. Log the Error Internally (Developers need to see the full stack trace)
  Logger.error(
    logCategory,
    `Error in ${req.method} ${req.originalUrl}: ${userMessage}`,
    {
      errorName: err.name,
      errorMessage: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Only show stack in development
      requestBody: req.body,
    }
  );

  // 4. Send the Final Response to the Client
  // Note: We hide the detailed error message in production for security (except for the tailored Mongoose errors).
  const responseMessage = (statusCode === 500 && process.env.NODE_ENV !== 'development')
    ? 'Internal Server Error. The request could not be completed.'
    : userMessage;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: responseMessage,
    // Add developer details in development mode
    ...(process.env.NODE_ENV === 'development' && {
        developerInfo: {
            errorName: err.name,
            code: err.code || 'N/A',
        }
    })
  });
};

export default errorMiddleware;