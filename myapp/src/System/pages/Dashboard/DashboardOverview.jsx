// pages/Dashboard/DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import MetricCard from '../../components/Metrics/MetricCard';
import HealthStatus from '../../components/Metrics/HealthStatus';
import RecentActivity from '../../components/Activity/RecentActivity';
import QuickActions from '../../components/Actions/QuickActions';
import { systemDashboardService } from '../../../../../services/api/systemDashboardService';
import './DashboardOverview.css';

const DashboardOverview = ({ user, systemHealth, onRefreshHealth }) => {
  const [dashboardData, setDashboardData] = useState({
    tenants: { total: 0, active: 0, pending: 0 },
    users: { total: 0, active: 0 },
    performance: { uptime: '99.9%', responseTime: '120ms' },
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await systemDashboardService.getOverview();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner large"></div>
        <p>Loading System Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <h1>System Overview</h1>
        <div className="header-actions">
          <button className="btn-secondary" onClick={loadDashboardData}>
            Refresh Data
          </button>
          <button className="btn-primary" onClick={onRefreshHealth}>
            Check Health
          </button>
        </div>
      </div>

      {/* System Health Banner */}
      <HealthStatus systemHealth={systemHealth} />

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Tenants"
          value={dashboardData.tenants.total}
          subtitle={`${dashboardData.tenants.active} active`}
          trend="+12%"
          icon="🏫"
          color="blue"
        />
        
        <MetricCard
          title="System Users"
          value={dashboardData.users.total}
          subtitle={`${dashboardData.users.active} active`}
          trend="+5%"
          icon="👥"
          color="green"
        />
        
        <MetricCard
          title="Uptime"
          value={dashboardData.performance.uptime}
          subtitle="This month"
          trend="+0.1%"
          icon="📈"
          color="purple"
        />
        
        <MetricCard
          title="Avg Response"
          value={dashboardData.performance.responseTime}
          subtitle="API latency"
          trend="-15ms"
          icon="⚡"
          color="orange"
        />
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <QuickActions userRole={user.platform_role} />
          <RecentActivity activities={dashboardData.recentActivities} />
        </div>
        
        <div className="content-right">
          {/* System Alerts Panel */}
          <div className="alerts-panel">
            <h3>System Alerts</h3>
            <div className="alert-item critical">
              <span className="alert-icon">🚨</span>
              <div className="alert-content">
                <strong>Database latency spike</strong>
                <p>Response time increased by 200% in last 5 minutes</p>
              </div>
              <span className="alert-time">2 min ago</span>
            </div>
            
            <div className="alert-item warning">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <strong>High memory usage</strong>
                <p>System memory at 85% capacity</p>
              </div>
              <span className="alert-time">15 min ago</span>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="performance-chart">
            <h3>System Performance</h3>
            <div className="chart-placeholder">
              <p>Performance metrics chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;