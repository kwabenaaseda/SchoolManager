// services/api/config.js
// Centralized configuration for API endpoints
export const API_CONFIG = {
  // Base URLs for different environments
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api/v1'
    : 'https://schoolmanager-rv9m.onrender.com/api/v1',
  
  // System API endpoints
  system: {
    tenant: '/system/tenant',
    login: '/system/system-auth/login',
    register: '/system/system-user/create',
    health: '/system/system-health',
    users: '/system/system-users',
    userProfile: '/system/system-user/profile/me'
  },
  
  // Tenant API endpoints  
  tenant: {
    login: '/tenant/auth/login',
    register: '/tenant/auth/register'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};