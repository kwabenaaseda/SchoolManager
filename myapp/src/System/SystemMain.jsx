// SystemMain.jsx - SIMPLIFIED BUT COMPLETE VERSION
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { systemAuthService } from '../../../services/api/systemAuthService';
import './SystemMain.css';

// Simplified but styled components
const SimpleHeader = ({ user, systemHealth, onLogout, onRefreshHealth }) => {
  const getHealthColor = (status) => {
    switch (status) {
      case 'healthy': return '#10b981';
      case 'degraded': return '#f59e0b';
      case 'critical': return '#ef4444';
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
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
          Vitalearn System Control
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getHealthColor(systemHealth.status)
          }}></div>
          <span>System: {systemHealth.status?.toUpperCase() || 'LOADING'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>
              {user?.first_name} {user?.surname}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
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
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const SimpleSidebar = ({ currentPath }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/system/dashboard' },
    { id: 'tenants', label: 'Tenant Management', icon: '🏫', path: '/system/tenants' },
    { id: 'users', label: 'User Administration', icon: '👥', path: '/system/users' },
    { id: 'monitoring', label: 'System Monitoring', icon: '📡', path: '/system/monitoring' },
    { id: 'audit', label: 'Audit & Security', icon: '🔒', path: '/system/audit' },
  ];

  const isActive = (path) => currentPath.startsWith(path);

  return (
    <aside style={{
      width: '280px',
      background: '#1e293b',
      borderRight: '1px solid #334155',
      padding: '20px 0'
    }}>
      <nav>
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
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

const DashboardOverview = ({ user, systemHealth }) => {
  const metrics = [
    { title: 'Total Tenants', value: '12', subtitle: '10 active', icon: '🏫', color: '#3b82f6' },
    { title: 'System Users', value: '45', subtitle: '42 active', icon: '👥', color: '#10b981' },
    { title: 'Uptime', value: '99.9%', subtitle: 'This month', icon: '📈', color: '#8b5cf6' },
    { title: 'Avg Response', value: '120ms', subtitle: 'API latency', icon: '⚡', color: '#f59e0b' },
  ];

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
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ 
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome back, {user.first_name}!
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '16px' }}>
            System Administrator Dashboard
          </p>
        </div>
      </div>

      {/* Health Status */}
      <div style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: systemHealth.status === 'healthy' ? '#10b981' : '#f59e0b'
        }}></div>
        <span style={{ color: '#f1f5f9' }}>
          System Status: <strong>{systemHealth.status?.toUpperCase() || 'LOADING'}</strong>
        </span>
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
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'all 0.3s ease'
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
            <div>
              <div style={{
                fontSize: '32px',
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
        gridTemplateColumns: '1fr 400px',
        gap: '24px'
      }}>
        {/* Left Column */}
        <div>
          {/* Quick Actions */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{
                background: '#334155',
                border: '1px solid #475569',
                color: '#f1f5f9',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left'
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
                textAlign: 'left'
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
                textAlign: 'left'
              }}>
                View System Logs
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Alerts Panel */}
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
              System Alerts
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              background: '#78350f',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <span>⚠️</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px' }}>
                  System Update Available
                </strong>
                <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>
                  New platform version 2.1.0 is ready for deployment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const [systemHealth, setSystemHealth] = useState({ status: 'loading' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
        
        const health = await systemAuthService.getSystemHealth();
        setSystemHealth(health.data || health);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('system_access_token');
        navigate('/auth?redirect=system');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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
        onRefreshHealth={() => {}}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SimpleSidebar currentPath={location.pathname} />
        
        <main style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/dashboard" element={<DashboardOverview user={user} systemHealth={systemHealth} />} />
            <Route path="/tenants" element={<PlaceholderPage title="Tenant Management" />} />
            <Route path="/users" element={<PlaceholderPage title="User Administration" />} />
            <Route path="/monitoring" element={<PlaceholderPage title="System Monitoring" />} />
            <Route path="/audit" element={<PlaceholderPage title="Audit & Security" />} />
            <Route path="/" element={<DashboardOverview user={user} systemHealth={systemHealth} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SystemMain;