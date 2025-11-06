import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Systemrouter from "./routes/System/system.routes.js";
import tenantrouter from "./routes/Tenants/tenants.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from "./config/swagger.config.js";
dotenv.config({
  quiet: false,
});
const allowedOrigins =
  process.env.DEV_ENV === "developement"
    ? [
        "http://localhost:5000",
        "http://127.0.0.1:5000",
        "http://127.0.0.2:5500",
        "http://localhost:5173",
      ]
    : [];

const swaggerSpec = swaggerJSDoc(swaggerOptions)    


const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/system", Systemrouter);
app.use("/api/v1/tenant", tenantrouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default app;
