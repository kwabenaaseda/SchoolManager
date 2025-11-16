// pages/Dashboard/DashboardOverview.jsx
import React from 'react';
import './DashboardOverview.css';

const DashboardOverview = ({ user, systemHealth, onRefreshHealth }) => {
  return (
    <div className="dashboard-overview">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.first_name}!</h1>
          <p className="welcome-subtitle">System Administrator Dashboard</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={onRefreshHealth}>
            Refresh Health
          </button>
        </div>
      </div>

      {/* Health Status */}
      <div className="health-banner">
        <div className="health-status">
          <div className={`status-indicator ${systemHealth.status}`}></div>
          <span>System Status: {systemHealth.status?.toUpperCase() || 'LOADING'}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🏫</div>
          <div className="metric-content">
            <div className="metric-value">12</div>
            <div className="metric-title">Total Tenants</div>
            <div className="metric-subtitle">10 active</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-value">45</div>
            <div className="metric-title">System Users</div>
            <div className="metric-subtitle">42 active</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-value">99.9%</div>
            <div className="metric-title">Uptime</div>
            <div className="metric-subtitle">This month</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <div className="metric-value">120ms</div>
            <div className="metric-title">Avg Response</div>
            <div className="metric-subtitle">API latency</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="action-btn">+ New Tenant</button>
            <button className="action-btn">+ System User</button>
            <button className="action-btn">View Logs</button>
          </div>
        </div>
        
        <div className="content-right">
          <div className="alerts-panel">
            <h3>System Alerts</h3>
            <div className="alert-item">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <strong>System Update Available</strong>
                <p>New platform version 2.1.0 is ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;