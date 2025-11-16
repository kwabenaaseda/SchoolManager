// utils/environment.js
// Environment detection utilities
export const Environment = {
  // Check if we're in development mode
  isDevelopment: () => process.env.NODE_ENV === 'development',
  
  // Check if we're in production mode
  isProduction: () => process.env.NODE_ENV === 'production',
  
  // Get current environment name
  getCurrent: () => process.env.NODE_ENV || 'development',
  
  // Get API base URL
  getApiBaseUrl: () => {
    return process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000/api/v1'
      : 'https://schoolmanager-rv9m.onrender.com/api/v1';
  },
  
  // Log environment info (useful for debugging)
  logInfo: () => {
    console.log(`🚀 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 API Base: ${Environment.getApiBaseUrl()}`);
    console.log(`🔧 Development: ${Environment.isDevelopment()}`);
    console.log(`🏭 Production: ${Environment.isProduction()}`);
  }
};

// Auto-log environment info on import
if (Environment.isDevelopment()) {
  Environment.logInfo();
}