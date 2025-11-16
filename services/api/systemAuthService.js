// services/api/systemAuthService.js
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
    // Store refresh token in httpOnly cookie (handled by backend)
    
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

  // Get current user profile
  async getCurrentUser() {
    const token = localStorage.getItem('system_access_token');
    if (!token) throw new Error('No token found');

    try {
      // Try to get user profile from API
      const response = await fetch(buildApiUrl(API_CONFIG.system.userProfile), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      // Fallback to token decoding if API fails
      console.warn('API user fetch failed, falling back to token decoding:', error);
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
    // Implementation would go here - typically using the refresh token endpoint
    console.log('Refreshing token...');
  },

  // Logout
  async logout() {
    localStorage.removeItem('system_access_token');
    localStorage.removeItem('user_role');
    // Clear any other system-related storage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('system_')) {
        localStorage.removeItem(key);
      }
    });
  }
};