// components/SystemHeader/SystemHeader.jsx
import React from 'react';
import './SystemHeader.css';

const SystemHeader = ({ 
  user, 
  systemHealth, 
  notifications, 
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
        <div className="notification-bell">
          <span className="bell-icon">🔔</span>
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </div>
        
        <div className="user-menu">
          <div className="user-avatar">
            {user?.first_name?.[0]}{user?.surname?.[0]}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.first_name} {user?.surname}</span>
            <span className="user-role">{user?.platform_role}</span>
          </div>
          <div className="dropdown-arrow">▼</div>
          
          <div className="user-dropdown">
            <button className="dropdown-item">Profile Settings</button>
            <button className="dropdown-item">Security</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SystemHeader;