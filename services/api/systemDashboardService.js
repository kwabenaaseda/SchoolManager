// services/api/systemDashboardService.js
import { buildApiUrl, API_CONFIG } from './config';

export const systemDashboardService = {
  // Get dashboard overview data
  async getOverview() {
    const token = localStorage.getItem('system_access_token');
    if (!token) throw new Error('No authentication token found');

    try {
      // In a real implementation, you'd have a dashboard endpoint
      // For now, we'll simulate data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      return {
        tenants: { total: 12, active: 10, pending: 2 },
        users: { total: 45, active: 42 },
        performance: { uptime: '99.9%', responseTime: '120ms' },
        recentActivities: [
          { id: 1, action: 'New tenant registered', timestamp: new Date(), user: 'System Admin' },
          { id: 2, action: 'System health check', timestamp: new Date(), user: 'Monitoring System' },
          { id: 3, action: 'User login', timestamp: new Date(), user: 'admin@springfield.edu' }
        ]
      };
    } catch (error) {
      console.error('Dashboard data fetch failed:', error);
      throw error;
    }
  },

  // Get tenant list
  async getTenants() {
    const token = localStorage.getItem('system_access_token');
    const response = await fetch(buildApiUrl('/system/tenants'), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tenants');
    }
    return await response.json();
  },

  // Get system users list
  async getSystemUsers() {
    const token = localStorage.getItem('system_access_token');
    const response = await fetch(buildApiUrl(API_CONFIG.system.users), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch system users');
    }
    return await response.json();
  }
};