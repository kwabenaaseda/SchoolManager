// SystemMain.jsx - UPDATED WITH REAL HEALTH METRICS
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { systemAuthService } from '../../../services/api/systemAuthService';
import './SystemMain.css';
import process from 'process';
// Health monitoring service
const healthService = {
  async getSystemHealth() {
    const baseURL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : 'https://schoolmanager-rv9m.onrender.com';
    
    const response = await fetch(`${baseURL}/health`);
    if (!response.ok) throw new Error('Health check failed');
    return await response.json();
  }
};

// Simplified but styled components
const SimpleHeader = ({ user, systemHealth, onLogout, onRefreshHealth }) => {
  const getHealthColor = (status) => {
    switch (status) {
      case 'OK': return '#10b981';
      case 'ERROR': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      background: '#1e293b',
      borderBottom: '1px solid #334155',
      color: 'white',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        <div style={{
          fontSize: '24px',
          background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
          borderRadius: '8px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          ⚙️
        </div>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', whiteSpace: 'nowrap' }}>
          Vitalearn System Control
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px',
          flexShrink: 0
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getHealthColor(systemHealth.status),
            animation: systemHealth.status === 'OK' ? 'pulse 2s infinite' : 'none'
          }}></div>
          <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
            Status: {systemHealth.status || 'LOADING'}
          </span>
          <button 
            onClick={onRefreshHealth}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            🔄
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            color: 'white',
            fontSize: '14px'
          }}>
            {user?.first_name?.[0]}{user?.surname?.[0]}
          </div>
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap' }}>
              {user?.first_name} {user?.surname}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
              {user?.platform_role}
            </div>
          </div>
          <button 
            onClick={onLogout}
            style={{
              background: '#ef4444',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media (max-width: 768px) {
          header {
            padding: 12px 16px;
          }
        }
      `}</style>
    </header>
  );
};

const SimpleSidebar = ({ currentPath, isMobile, onMobileClose }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/system/dashboard' },
    { id: 'tenants', label: 'Tenant Management', icon: '🏫', path: '/system/tenants' },
    { id: 'users', label: 'User Administration', icon: '👥', path: '/system/users' },
    { id: 'monitoring', label: 'System Monitoring', icon: '📡', path: '/system/monitoring' },
    { id: 'audit', label: 'Audit & Security', icon: '🔒', path: '/system/audit' },
  ];

  const isActive = (path) => currentPath.startsWith(path);

  const handleItemClick = (path) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <aside style={{
      width: isMobile ? '100%' : '280px',
      background: '#1e293b',
      borderRight: isMobile ? 'none' : '1px solid #334155',
      padding: isMobile ? '80px 20px 20px 20px' : '20px 0',
      position: isMobile ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      height: isMobile ? '100vh' : 'auto',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      {isMobile && (
        <button 
          onClick={onMobileClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#ef4444',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      )}
      
      <nav>
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              margin: '0 8px 4px 8px',
              borderRadius: '8px',
              cursor: 'pointer',
              background: isActive(item.path) ? 'linear-gradient(135deg, #6366f1, #3b82f6)' : 'transparent',
              color: isActive(item.path) ? 'white' : '#f1f5f9',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '18px', width: '20px' }}>{item.icon}</span>
            <span style={{ 
              fontWeight: isActive(item.path) ? '600' : '500',
              fontSize: '14px'
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

// Progress Bar Component
const ProgressBar = ({ percentage, color = '#3b82f6', label }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      marginBottom: '4px',
      fontSize: '12px',
      color: '#94a3b8'
    }}>
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div style={{
      width: '100%',
      height: '6px',
      background: '#334155',
      borderRadius: '3px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        background: color,
        borderRadius: '3px',
        transition: 'width 0.3s ease'
      }}></div>
    </div>
  </div>
);

const DashboardOverview = ({ user, systemHealth, onRefreshHealth }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshHealth();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Calculate metrics from health data
  const getMetrics = () => {
    if (!systemHealth.system) {
      return [
        { title: 'System Status', value: 'Loading...', subtitle: 'Checking health', icon: '🔄', color: '#6b7280' },
        { title: 'Uptime', value: '--', subtitle: 'Not available', icon: '⏱️', color: '#6b7280' },
        { title: 'Memory Usage', value: '--', subtitle: 'Not available', icon: '💾', color: '#6b7280' },
        { title: 'CPU Cores', value: '--', subtitle: 'Not available', icon: '⚡', color: '#6b7280' },
      ];
    }

    const memoryUsage = parseFloat(systemHealth.system.memory.usagePercent);
    const uptimeHours = Math.floor(systemHealth.uptime.seconds / 3600);
    const uptimeMinutes = Math.floor((systemHealth.uptime.seconds % 3600) / 60);

    return [
      { 
        title: 'System Status', 
        value: systemHealth.status, 
        subtitle: 'Server health', 
        icon: systemHealth.status === 'OK' ? '✅' : '❌', 
        color: systemHealth.status === 'OK' ? '#10b981' : '#ef4444' 
      },
      { 
        title: 'Uptime', 
        value: `${uptimeHours}h ${uptimeMinutes}m`, 
        subtitle: 'Server runtime', 
        icon: '⏱️', 
        color: '#3b82f6' 
      },
      { 
        title: 'Memory Usage', 
        value: systemHealth.system.memory.usagePercent, 
        subtitle: `Used: ${systemHealth.system.memory.used}`, 
        icon: '💾', 
        color: memoryUsage > 80 ? '#ef4444' : memoryUsage > 60 ? '#f59e0b' : '#10b981' 
      },
      { 
        title: 'CPU Cores', 
        value: systemHealth.system.cpus, 
        subtitle: 'Available cores', 
        icon: '⚡', 
        color: '#8b5cf6' 
      },
    ];
  };

  const metrics = getMetrics();

  return (
    <div style={{ 
      padding: '24px',
      background: '#0f172a',
      minHeight: '100%',
      color: 'white'
    }}>
      {/* Welcome Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ 
            margin: '0 0 8px 0',
            fontSize: 'clamp(24px, 4vw, 28px)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome back, {user.first_name}!
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            System Administrator Dashboard
          </p>
        </div>
        
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            background: isRefreshing ? '#64748b' : '#3b82f6',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isRefreshing ? 0.7 : 1
          }}
        >
          {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {metrics.map((metric, index) => (
          <div key={index} style={{
            background: '#1e293b',
            border: `1px solid ${metric.color}30`,
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'all 0.3s ease',
            boxShadow: `0 4px 12px ${metric.color}10`
          }}>
            <div style={{
              fontSize: '32px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${metric.color}20`,
              borderRadius: '12px'
            }}>
              {metric.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: '4px'
              }}>
                {metric.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#94a3b8',
                marginBottom: '4px'
              }}>
                {metric.title}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#64748b'
              }}>
                {metric.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* System Details */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
            📊 System Performance
          </h3>
          
          {systemHealth.system && (
            <div>
              <ProgressBar 
                percentage={parseFloat(systemHealth.system.memory.usagePercent)} 
                color={parseFloat(systemHealth.system.memory.usagePercent) > 80 ? '#ef4444' : '#3b82f6'}
                label={`Memory Usage (${systemHealth.system.memory.used} of ${systemHealth.system.memory.total})`}
              />
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '16px',
                marginTop: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>CPU Cores</div>
                  <div style={{ fontSize: '20px', fontWeight: '600', color: '#f1f5f9' }}>
                    {systemHealth.system.cpus}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Architecture</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>
                    {systemHealth.system.architecture}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Platform</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>
                    {systemHealth.process.platform}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Actions */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              🚀 Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{
                background: '#334155',
                border: '1px solid #475569',
                color: '#f1f5f9',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}>
                + Register New Tenant
              </button>
              <button style={{
                background: '#334155',
                border: '1px solid #475569',
                color: '#f1f5f9',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}>
                + Add System User
              </button>
              <button style={{
                background: '#334155',
                border: '1px solid #475569',
                color: '#f1f5f9',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}>
                📋 View System Logs
              </button>
            </div>
          </div>

          {/* System Info */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              ℹ️ System Information
            </h3>
            {systemHealth.process && (
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
                <div>Node: {systemHealth.process.nodeVersion}</div>
                <div>PID: {systemHealth.process.pid}</div>
                <div>Environment: {systemHealth.environment}</div>
                <div>Last Update: {new Date(systemHealth.timestamp).toLocaleTimeString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Media Queries */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .dashboard-overview {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

// Placeholder pages
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This section is under development</p>
  </div>
);

const SystemMain = () => {
  const [user, setUser] = useState(null);
  const [systemHealth, setSystemHealth] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadHealthData = async () => {
    try {
      const health = await healthService.getSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Health check failed:', error);
      setSystemHealth({ status: 'ERROR', message: 'Health check failed' });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('system_access_token');
      if (!token) {
        navigate('/auth?redirect=system');
        return;
      }

      try {
        setLoading(true);
        const userData = await systemAuthService.getCurrentUser();
        setUser(userData);
        await loadHealthData();
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('system_access_token');
        navigate('/auth?redirect=system');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Refresh health data every 30 seconds
    const interval = setInterval(loadHealthData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = async () => {
    await systemAuthService.logout();
    navigate('/auth');
  };

  if (loading || !user) {
    return (
      <div style={{ 
        background: '#0f172a', 
        color: 'white', 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: '6px solid #334155',
          borderTop: '6px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px' }}>Initializing System Dashboard...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#0f172a'
    }}>
      <SimpleHeader 
        user={user}
        systemHealth={systemHealth}
        onLogout={handleLogout}
        onRefreshHealth={loadHealthData}
        onToggleSidebar={() => setShowMobileSidebar(!showMobileSidebar)}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Mobile Sidebar Overlay */}
        {(showMobileSidebar || !isMobile) && (
          <SimpleSidebar 
            currentPath={location.pathname}
            isMobile={isMobile}
            onMobileClose={() => setShowMobileSidebar(false)}
          />
        )}
        
        {/* Mobile Overlay */}
        {isMobile && showMobileSidebar && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={() => setShowMobileSidebar(false)}
          />
        )}
        
        <main style={{ 
          flex: 1, 
          overflow: 'auto',
          marginLeft: isMobile ? 0 : '280px',
          transition: 'margin-left 0.3s ease'
        }}>
          <Routes>
            <Route path="/dashboard" element={
              <DashboardOverview 
                user={user} 
                systemHealth={systemHealth} 
                onRefreshHealth={loadHealthData}
              />
            } />
            <Route path="/tenants" element={<PlaceholderPage title="🏫 Tenant Management" />} />
            <Route path="/users" element={<PlaceholderPage title="👥 User Administration" />} />
            <Route path="/monitoring" element={<PlaceholderPage title="📡 System Monitoring" />} />
            <Route path="/audit" element={<PlaceholderPage title="🔒 Audit & Security" />} />
            <Route path="/" element={
              <DashboardOverview 
                user={user} 
                systemHealth={systemHealth} 
                onRefreshHealth={loadHealthData}
              />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SystemMain;