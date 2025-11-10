import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Systemrouter from "./routes/System/system.routes.js";
import tenantrouter from "./routes/Tenants/tenants.routes.js";
import { Logger } from "./utils/Logging.js"; // Import our consistent logger
import errorMiddleware from "./middleware/errorHandler.js"; // New: Import Central Error Handler

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from "./config/swagger.config.js";

// Load environment variables immediately
dotenv.config({
  quiet: false,
});

// --- CRITICAL CORS CONFIGURATION ---
// In production, this list should ONLY contain the domains where your frontend is hosted.
// NEVER use '*' in production, as it defeats security.
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? [
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "http://localhost:5173",
        // Add specific development ports here. Avoid generic or unknown ports.
      ]
    : [
        // List your production front-end domains here (e.g., 'https://your-app-frontend.com')
      ];

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

// --- CORE MIDDLEWARE ---

// 1. CORS: Defines which other websites can talk to this API
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*", // Use allowed list, fallback to '*' only in dev/if list is empty
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // Allow cookies and authentication headers
  })
);

// 2. Body Parsers: Convert incoming data into usable JavaScript objects
app.use(express.json()); // Parses application/json requests (APIs)
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded requests (Forms)

// 3. Health Check Route (Essential for Load Balancers/Containers)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// --- API ROUTES ---
app.use("/api/v1/system", Systemrouter);
app.use("/api/v1/tenant", tenantrouter);

// 4. API Documentation (Swagger)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// --- CATCH-ALL ROUTE (404 NOT FOUND) ---
app.use((req, res, next) => {
  Logger.warn("AppRouter", `404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: "Resource not found. Check the URL and method (404).",
    status: 404,
  });
});

// --- FINAL ERROR HANDLING MIDDLEWARE (CRITICAL!) ---
// This must be the absolute last piece of middleware.
app.use(errorMiddleware);

export default app;