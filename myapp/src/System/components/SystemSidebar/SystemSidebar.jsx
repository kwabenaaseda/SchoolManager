// components/SystemSidebar/SystemSidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SystemSidebar.css';

const SystemSidebar = ({ collapsed, currentPath, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items with role-based permissions
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/system/dashboard',
      roles: ['SuperAdmin-SystemUser', 'PlatformFinance-SystemUser', 'PlatformEngineer-SystemUser', 'Pending-SystemUser']
    },
    {
      id: 'tenants',
      label: 'Tenant Management',
      icon: '🏫',
      path: '/system/tenants',
      roles: ['SuperAdmin-SystemUser', 'PlatformFinance-SystemUser'],
      subItems: [
        { label: 'All Tenants', path: '/system/tenants/list' },
        { label: 'Applications', path: '/system/tenants/applications' },
        { label: 'Active Schools', path: '/system/tenants/active' },
        { label: 'Suspended', path: '/system/tenants/suspended' }
      ]
    },
    {
      id: 'users',
      label: 'User Administration',
      icon: '👥',
      path: '/system/users',
      roles: ['SuperAdmin-SystemUser'],
      subItems: [
        { label: 'All Users', path: '/system/users/list' },
        { label: 'Create User', path: '/system/users/create' },
        { label: 'Role Management', path: '/system/users/roles' },
        { label: 'Pending Activation', path: '/system/users/pending' }
      ]
    },
    {
      id: 'monitoring',
      label: 'System Monitoring',
      icon: '📡',
      path: '/system/monitoring',
      roles: ['SuperAdmin-SystemUser', 'PlatformEngineer-SystemUser'],
      subItems: [
        { label: 'Health Status', path: '/system/monitoring/health' },
        { label: 'Performance', path: '/system/monitoring/performance' },
        { label: 'System Logs', path: '/system/monitoring/logs' },
        { label: 'API Metrics', path: '/system/monitoring/api' }
      ]
    },
    {
      id: 'audit',
      label: 'Audit & Security',
      icon: '🔒',
      path: '/system/audit',
      roles: ['SuperAdmin-SystemUser', 'PlatformEngineer-SystemUser'],
      subItems: [
        { label: 'Activity Logs', path: '/system/audit/activity' },
        { label: 'Security Events', path: '/system/audit/security' },
        { label: 'Compliance Reports', path: '/system/audit/compliance' },
        { label: 'User Sessions', path: '/system/audit/sessions' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: '🔔',
      path: '/system/notifications',
      roles: ['SuperAdmin-SystemUser', 'PlatformFinance-SystemUser', 'PlatformEngineer-SystemUser'],
      badge: 5
    },
    {
      id: 'finance',
      label: 'Financial Oversight',
      icon: '💰',
      path: '/system/finance',
      roles: ['SuperAdmin-SystemUser', 'PlatformFinance-SystemUser'],
      subItems: [
        { label: 'Revenue Overview', path: '/system/finance/overview' },
        { label: 'Subscription Plans', path: '/system/finance/subscriptions' },
        { label: 'Billing History', path: '/system/finance/billing' },
        { label: 'Financial Reports', path: '/system/finance/reports' }
      ]
    },
    {
      id: 'faq',
      label: 'FAQ Management',
      icon: '❓',
      path: '/system/faq',
      roles: ['SuperAdmin-SystemUser', 'PlatformEngineer-SystemUser']
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure',
      icon: '⚙️',
      path: '/system/infrastructure',
      roles: ['SuperAdmin-SystemUser', 'PlatformEngineer-SystemUser'],
      subItems: [
        { label: 'Database', path: '/system/infrastructure/database' },
        { label: 'API Management', path: '/system/infrastructure/api' },
        { label: 'Cache Systems', path: '/system/infrastructure/cache' },
        { label: 'Maintenance', path: '/system/infrastructure/maintenance' }
      ]
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: '⚡',
      path: '/system/settings',
      roles: ['SuperAdmin-SystemUser'],
      subItems: [
        { label: 'General', path: '/system/settings/general' },
        { label: 'Security', path: '/system/settings/security' },
        { label: 'API Keys', path: '/system/settings/api-keys' },
        { label: 'Backup & Restore', path: '/system/settings/backup' }
      ]
    }
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole) || item.roles.includes('SuperAdmin-SystemUser')
  );

  const isItemActive = (itemPath) => {
    return currentPath.startsWith(itemPath);
  };

  const hasActiveSubItem = (subItems) => {
    return subItems?.some(subItem => currentPath === subItem.path);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const NavItem = ({ item, level = 0 }) => {
    const [isExpanded, setIsExpanded] = React.useState(
      hasActiveSubItem(item.subItems) || isItemActive(item.path)
    );
    
    const isActive = isItemActive(item.path) || hasActiveSubItem(item.subItems);
    const hasChildren = item.subItems && item.subItems.length > 0;

    const handleClick = () => {
      if (hasChildren) {
        setIsExpanded(!isExpanded);
      } else {
        handleNavigation(item.path);
      }
    };

    return (
      <div className={`nav-item-wrapper level-${level}`}>
        <div 
          className={`nav-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
          onClick={handleClick}
        >
          <div className="nav-item-content">
            <span className="nav-icon">{item.icon}</span>
            
            {!collapsed && (
              <>
                <span className="nav-label">{item.label}</span>
                
                {/* Badge for notifications */}
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
                
                {/* Expand arrow for items with children */}
                {hasChildren && (
                  <span className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>
                    ▼
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sub-items */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="sub-items">
            {item.subItems.map((subItem, index) => (
              <div 
                key={index}
                className={`sub-item ${currentPath === subItem.path ? 'active' : ''}`}
                onClick={() => handleNavigation(subItem.path)}
              >
                <span className="sub-item-dot"></span>
                <span className="sub-item-label">{subItem.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`system-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
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

      {/* Navigation Section */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-header">
            {!collapsed && <span className="section-label">MAIN NAVIGATION</span>}
            {collapsed && <div className="section-divider"></div>}
          </div>
          
          <div className="nav-items">
            {filteredNavItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        {!collapsed && (
          <div className="nav-section">
            <div className="nav-section-header">
              <span className="section-label">QUICK ACTIONS</span>
            </div>
            
            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => handleNavigation('/system/tenants/applications')}
              >
                <span className="action-icon">📋</span>
                <span className="action-label">Review Applications</span>
              </button>
              
              <button 
                className="quick-action-btn"
                onClick={() => handleNavigation('/system/monitoring/health')}
              >
                <span className="action-icon">🩺</span>
                <span className="action-label">System Health</span>
              </button>
              
              <button 
                className="quick-action-btn"
                onClick={() => handleNavigation('/system/audit/activity')}
              >
                <span className="action-icon">📝</span>
                <span className="action-label">View Logs</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="system-info">
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value active">Operational</span>
            </div>
            <div className="info-item">
              <span className="info-label">Version</span>
              <span className="info-value">v2.1.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Update</span>
              <span className="info-value">2h ago</span>
            </div>
          </div>
        )}
        
        <div className="sidebar-collapse-indicator">
          <div className="collapse-tooltip">
            {collapsed ? 'Expand' : 'Collapse'}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SystemSidebar;