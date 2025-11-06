import { fileURLToPath } from 'url';
import path from 'path';

// Helper to get directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  // --- A. System Metadata ---
  openapi: '3.0.0', // Mandatory OpenAPI version
  info: {
    title: 'NexusWings Multi-Tenant System API', // Your System Name!
    version: '1.0.0',
    description: 'The core system API for managing tenants, users, and finance across all schools. This is the central brain of the distributed system.',
    contact: {
      name: 'System Architecture Team',
      email: 'mr.mensahgibson@gmail.com',
    },
  },
  // --- B. Server Host ---
  servers: [
    {
      url: '/api/v1', // The base path for all your routes (e.g., /api/v1/tenant/...)
      description: 'Production Server',
    },
    // You can add a local server for testing:
     {
      url: 'http://localhost:5000/api/v1',
       description: 'Development Server',
     },
  ],
  // --- C. Global Security/Tags ---
  components: {
    securitySchemes: {
      // Defines how to authenticate (Bearer Token is the JWT standard)
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const swaggerOptions = {
  swaggerDefinition,
  // Tell swagger-jsdoc where to look for your documentation comments
  // It will search the entire /src/routes folder for files ending in .js
  apis: [path.join(__dirname, '../src/routes/*.js'), './src/routes/**/*.js'], 
};

export default swaggerOptions;