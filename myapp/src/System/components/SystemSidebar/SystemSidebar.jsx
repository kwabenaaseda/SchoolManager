// components/SystemSidebar/SystemSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SystemSidebar.css';

const SystemSidebar = ({ collapsed, currentPath, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/system/dashboard' },
    { id: 'tenants', label: 'Tenant Management', icon: '🏫', path: '/system/tenants' },
    { id: 'users', label: 'User Administration', icon: '👥', path: '/system/users' },
    { id: 'monitoring', label: 'System Monitoring', icon: '📡', path: '/system/monitoring' },
    { id: 'audit', label: 'Audit & Security', icon: '🔒', path: '/system/audit' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', path: '/system/notifications' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isItemActive = (itemPath) => {
    return currentPath.startsWith(itemPath);
  };

  return (
    <aside className={`system-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {!collapsed && (
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-logo">⚙️</div>
            <div className="brand-text">
              <h3>System Control</h3>
              <span className="brand-subtitle">Administration Panel</span>
            </div>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-items">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${isItemActive(item.path) ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default SystemSidebar;