/**
 * =================================================================
 * CENTRALIZED LOGGER UTILITY (Function-based)
 * Handles internal logging for developers. This keeps our system errors
 * separate from the messages we send to the user.
 * =================================================================
 */

// A simple object to hold our logging functions
export const Logger = {
  // Private helper function to structure and log the message
  _log: (level, source, message, data = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      source: source || 'Application',
      message: message,
      details: data,
    };

    // Use the appropriate console method based on the log level
    switch (level.toLowerCase()) {
      case 'info':
        console.info(`[INFO] [${timestamp}] [${logEntry.source}] ${message}`);
        break;
      case 'warn':
        console.warn(`[WARN] [${timestamp}] [${logEntry.source}] ${message}`, logEntry);
        break;
      case 'error':
        // Important: For errors, we log the full structure and stack
        console.error(`[ERROR] [${timestamp}] [${logEntry.source}] ${message}`, logEntry);
        break;
      case 'debug':
        console.error(`[DEBUG] [${timestamp}] [${logEntry.source}] ${message}`, logEntry);
        break;
      default:
        console.log(`[DEBUG] [${timestamp}] [${logEntry.source}] ${message}`, logEntry);
    }
    return logEntry;
  },

  // Public logging methods
  info: (source, message, data) => Logger._log('INFO', source, message, data),
  error: (source, message, data) => Logger._log('ERROR', source, message, data),
  warn: (source, message, data) => Logger._log('WARN', source, message, data),
  debug: (source, message, data) => Logger._log('DEBUG', source, message, data),
  // You can add more like warn, debug here if needed
};


/**
 * =================================================================
 * UNIFIED RESPONSE HANDLER (Functional approach)
 * These functions format the data and send the final HTTP response.
 * =================================================================
 */

// Function to handle successful responses (HTTP 200, 201, etc.)
export const sendSuccessResponse = (res, { statusCode = 200, data = {}, successMessage = "Operation Successful", adjustment = {} }) => {
  // 1. Prepare the response payload for the user
  const responseBody = {
    status: statusCode,
    message: successMessage,
    success: true,
    data: data,
    ...adjustment
  };

  // 2. Log the success internally (using the new Logger)
  Logger.info('ResponseFormatter', successMessage, { statusCode, data });

  // 3. Send the HTTP response
  return res.status(statusCode).json(responseBody);
};


// Function to handle error responses (HTTP 4xx, 5xx)
export const sendErrorResponse = (res, err, source = 'UnknownFunction') => {
  let statusCode = 500;
  let devMessage = 'Internal Server Error Undefined.';
  let userMessage = 'An unexpected server error occurred. Please try again.';
  let adjustment = {};
  let isOperational = false; // Assume all non-standard errors are non-operational

  // --- Step 1: Analyze the Error Object ---

  // Check if the error has our custom properties (like from a previous AppError class,
  // or a simple object we use for expected errors).
  // We'll treat errors with statusCode < 500 as "Operational"
  if (typeof err === 'object' && err !== null && err.statusCode) {
    statusCode = err.statusCode;
    devMessage = `[Custom Error ${err.name || 'API'}]: ${err.message || 'Error occurred'}`;
    userMessage = err.message || 'Request failed.';
    adjustment = err.adjustment || {};
    isOperational = statusCode < 500;
  } else if (err instanceof Error) {
    // This is a standard JavaScript error (e.g., system failure, parsing issue)
    statusCode = 500;
    devMessage = `[System Error]: ${err.message}`;
    userMessage = 'Internal Server Error. Please try again later.';
    isOperational = false;
  } else {
    // Handle non-Error objects or undefined throws
    statusCode = 500;
    devMessage = `[Unknown Error]: ${JSON.stringify(err)}`;
    userMessage = 'Internal Server Error. Please try again later.';
    isOperational = false;
  }


  // --- Step 2: Log the full error for the Developer ---
  // This is what goes to your internal logs/monitoring system
  Logger.error(
    source,
    `Handling Response Error: ${devMessage}`,
    {
      statusCode,
      isOperational,
      stack: err.stack, // If available
      errorData: err, // The full error object
    }
  );


  // --- Step 3: Send the final response to the Client ---
  // We only show the client the safe, non-technical message
  const responseBody = {
    status: statusCode,
    // IMPORTANT: If it's a 500 and not operational, we hide the dev error message
    message: (statusCode >= 500 && !isOperational)
      ? 'A critical error occurred on the server.'
      : userMessage,
    success: false,
    ...adjustment
  };

  return res.status(statusCode).json(responseBody);
};


/**
 * =================================================================
 * UTILITY WRAPPER (Higher-Order Function)
 * This is the wrapper that catches errors in your asynchronous controllers.
 * =================================================================
 */

// This function takes your controller (fn) and returns a new function
// that Express/Koa can execute safely.
export const controllerWrapper = (fn) => (req, res, next) => {
    // When the wrapped function (fn) runs, we promise to catch any errors
    Promise.resolve(fn(req, res, next)).catch(err => {
        // If an error is caught, we immediately pass it to our error handler
        sendErrorResponse(res, err, fn.name);
    });
};

/**
 * =================================================================
 * EXAMPLE OF A CUSTOM ERROR OBJECT (If you prefer objects over classes)
 * You can throw this object and sendErrorResponse will handle it.
 * =================================================================
 */

// In your controller, instead of throwing a class, you throw an object:
/*
  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found in the database.",
      name: "NotFoundError",
      adjustment: {
        type: "user_lookup_error"
      }
    };
  }
*/