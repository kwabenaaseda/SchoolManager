// services/api/systemDashboardService.js
export const systemDashboardService = {
  async getOverview() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      tenants: { total: 12, active: 10, pending: 2 },
      users: { total: 45, active: 42 },
      performance: { uptime: '99.9%', responseTime: '120ms' },
      recentActivities: []
    };
  }
};