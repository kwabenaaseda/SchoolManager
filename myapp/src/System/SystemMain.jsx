// SystemMain.jsx - Main System Dashboard Container
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SystemHeader from './components/SystemHeader/SystemHeader';
import SystemSidebar from './components/SystemSidebar/SystemSidebar';
import DashboardOverview from './pages/Dashboard/DashboardOverview';
import TenantManagement from './pages/Tenants/TenantManagement';
import UserAdministration from './pages/Users/UserAdministration';
import SystemMonitoring from './pages/Monitoring/SystemMonitoring';
import AuditLogs from './pages/Audit/AuditLogs';
import NotificationsCenter from './pages/Notifications/NotificationsCenter';
import FAQManagement from './pages/FAQ/FAQManagement';
import SystemSettings from './pages/Settings/SystemSettings';
import { systemAuthService } from '../../../services/api/systemAuthService';
import './SystemMain.css';

const SystemMain = () => {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [systemHealth, setSystemHealth] = useState({ status: 'loading' });
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('system_access_token');
      if (!token) {
        navigate('/auth?redirect=system');
        return;
      }

      try {
        const userData = await systemAuthService.getCurrentUser();
        setUser(userData);
        
        // Load initial system health
        const health = await systemAuthService.getSystemHealth();
        setSystemHealth(health);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('system_access_token');
        navigate('/auth?redirect=system');
      }
    };

    checkAuth();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    await systemAuthService.logout();
    setUser(null);
    navigate('/auth');
  };

  // Refresh system health
  const refreshHealth = async () => {
    try {
      const health = await systemAuthService.getSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="system-loading">
        <div className="loading-spinner"></div>
        <p>Initializing System Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="system-main">
      <SystemHeader 
        user={user}
        systemHealth={systemHealth}
        notifications={notifications}
        onLogout={handleLogout}
        onRefreshHealth={refreshHealth}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="system-content">
        <SystemSidebar 
          collapsed={sidebarCollapsed}
          currentPath={location.pathname}
          userRole={user.platform_role}
        />
        
        <main className={`system-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={
              <DashboardOverview 
                user={user}
                systemHealth={systemHealth}
                onRefreshHealth={refreshHealth}
              />
            } />
            <Route path="/tenants/*" element={<TenantManagement />} />
            <Route path="/users/*" element={<UserAdministration />} />
            <Route path="/monitoring/*" element={<SystemMonitoring />} />
            <Route path="/audit/*" element={<AuditLogs />} />
            <Route path="/notifications" element={<NotificationsCenter />} />
            <Route path="/faq" element={<FAQManagement />} />
            <Route path="/settings" element={<SystemSettings user={user} />} />
            
            {/* Default redirect to dashboard */}
            <Route path="/" element={
              <DashboardOverview 
                user={user}
                systemHealth={systemHealth}
                onRefreshHealth={refreshHealth}
              />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SystemMain;