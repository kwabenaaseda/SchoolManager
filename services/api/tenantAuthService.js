// services/api/tenantAuthService.js
import { buildApiUrl, API_CONFIG } from './config';

export const tenantAuthService = {
  // Tenant user login
  async login(credentials) {
    const response = await fetch(buildApiUrl(API_CONFIG.tenant.login), {
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

    return await response.json();
  },

  // Tenant user registration (if needed)
  async register(userData) {
    const response = await fetch(buildApiUrl(API_CONFIG.tenant.register), {
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

  // Logout tenant user
  async logout() {
    localStorage.removeItem('tenant_access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('tenant_id');
    // Clear any other tenant-related storage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('tenant_')) {
        localStorage.removeItem(key);
      }
    });
  }
};