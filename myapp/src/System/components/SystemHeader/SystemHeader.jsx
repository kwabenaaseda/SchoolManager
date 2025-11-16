// components/SystemHeader/SystemHeader.jsx
import React from 'react';
import './SystemHeader.css';

const SystemHeader = ({ 
  user, 
  systemHealth, 
  onLogout, 
  onRefreshHealth, 
  sidebarCollapsed, 
  onToggleSidebar 
}) => {
  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#10b981';
      case 'degraded': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <header className="system-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
        >
          {sidebarCollapsed ? '☰' : '✕'}
        </button>
        
        <div className="system-brand">
          <span className="brand-icon">⚙️</span>
          <h1>Vitalearn System Control</h1>
        </div>
      </div>

      <div className="header-center">
        <div className="health-status">
          <div 
            className="status-indicator"
            style={{ backgroundColor: getHealthStatusColor(systemHealth.status) }}
          ></div>
          <span className="status-text">
            System: {systemHealth.status?.toUpperCase() || 'LOADING'}
          </span>
          <button 
            className="refresh-btn"
            onClick={onRefreshHealth}
            title="Refresh System Health"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="user-menu">
          <div className="user-avatar">
            {user?.first_name?.[0]}{user?.surname?.[0]}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.first_name} {user?.surname}</span>
            <span className="user-role">{user?.platform_role}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default SystemHeader;