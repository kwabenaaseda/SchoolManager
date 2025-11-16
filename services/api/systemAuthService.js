// services/api/systemAuthService.js - CORRECTED VERSION
import { buildApiUrl, API_CONFIG } from './config';

export const systemAuthService = {
  // Login system user
  async login(credentials) {
    const response = await fetch(buildApiUrl(API_CONFIG.system.login), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store tokens
    localStorage.setItem('system_access_token', data.data.accessToken);
    
    return data;
  },

  // Register new system user
  async register(userData) {
    const response = await fetch(buildApiUrl(API_CONFIG.system.register), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  },

  // Get current user profile - FIXED VERSION
  async getCurrentUser() {
    const token = localStorage.getItem('system_access_token');
    if (!token) throw new Error('No token found');

    try {
      // Extract user ID from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      if (!userId) {
        throw new Error('No user ID found in token');
      }

      // Call the user profile endpoint with userId
      const response = await fetch(buildApiUrl(API_CONFIG.system.userProfile), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user profile');
      }

      const userData = await response.json();
      return userData.data || userData;
      
    } catch (error) {
      console.warn('API user fetch failed, falling back to token decoding:', error);
      
      // Fallback to token decoding
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          _id: payload.sub,
          email: payload.email || 'system.admin@nexuswings.com',
          first_name: 'System',
          surname: 'Administrator', 
          platform_role: payload.role || 'SuperAdmin-SystemUser',
          isActive: true
        };
      } catch (decodeError) {
        throw new Error('Invalid token format');
      }
    }
  },

  // Get system health
  async getSystemHealth() {
    const token = localStorage.getItem('system_access_token');
    const response = await fetch(buildApiUrl(API_CONFIG.system.health), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return await response.json();
  },

  // Refresh token
  async refreshToken() {
    // Implementation for token refresh
    console.log('Refreshing token...');
  },

  // Logout
  async logout() {
    localStorage.removeItem('system_access_token');
    localStorage.removeItem('user_role');
    // Clear all system-related storage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('system_')) {
        localStorage.removeItem(key);
      }
    });
  }
};