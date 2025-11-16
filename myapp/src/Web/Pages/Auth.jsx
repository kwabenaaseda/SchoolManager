import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import style from "../Components/Style/Page.module.css";
import { systemAuthService } from "../../../../services/api/systemAuthService";
import { tenantAuthService } from "../../../../services/api/tenantAuthService";
import { buildApiUrl, API_CONFIG } from "../../../../services/api/config";


// ----------------------------------------------------
// A. ENHANCED DATA DEFINITION WITH ALL ACCESS TYPES
// ----------------------------------------------------

const SchoolRegistrationContent = [
  {
    operationType: "SCHOOL_SIGNUP",
    Contentdata: {
      title: "Register New School",
      subtitle: "Become a Root User",
      description: "Create your institution's tenant instance with full administrative privileges and system-wide access.",
      buttonName: "Start School Registration",
      icon: "🏫",
      features: [
        "Full tenant configuration",
        "Root user privileges", 
        "Custom domain setup",
        "Multi-year subscription"
      ]
    },
    formFields: [
      { value: "tenantName", placeholder: "Institution Name", type: "text", required: true },
      { value: "ownerFirstName", placeholder: "First Name", type: "text", required: true },
      { value: "ownerSurname", placeholder: "Surname", type: "text", required: true },
      { value: "ownerEmail", placeholder: "Administrator Email", type: "email", required: true },
      { value: "ownerPassword", placeholder: "Secure Password", type: "password", required: true },
      { value: "ownerPhone", placeholder: "Phone Number", type: "text", required: true },
      { value: "ownerGender", placeholder: "Gender", type: "select", options: ["male", "female"], required: true },
      { value: "ownerDOB", placeholder: "Date of Birth", type: "date", required: true },
      { value: "subscriptionPlan", placeholder: "Subscription Plan", type: "select", options: ["basic", "standard", "premium", "enterprise"], required: true },
    ],
  },
];

const TenantLoginContent = [
  {
    operationType: "TENANT_LOGIN",
    Contentdata: {
      title: "School Portal Access",
      subtitle: "Existing User Login",
      description: "Access your school's dedicated portal using your institution credentials and user account.",
      buttonName: "Access School Portal",
      icon: "🎓",
      features: [
        "Staff & student portals",
        "Real-time grade access",
        "Financial dashboard",
        "AI report generation"
      ]
    },
    formFields: [
      { value: "email", placeholder: "User Email", type: "email", required: true },
      { value: "password", placeholder: "Password", type: "password", required: true },
    ],
  },
];

const SystemDeveloperContent = [
  {
    operationType: "SYSTEM_LOGIN",
    Contentdata: {
      title: "System Developer Access",
      subtitle: "Infrastructure & Engineering",
      description: "Privileged access to system infrastructure, database management, and engineering tools.",
      buttonName: "System Login",
      icon: "⚙️",
      features: [
        "Database administration",
        "System monitoring",
        "API management",
        "Tenant oversight"
      ],
      accessLevel: "system"
    },
    formFields: [
      { value: "email", placeholder: "System Admin Email", type: "email", required: true },
      { value: "password", placeholder: "System Password", type: "password", required: true },
    ],
  },
];

// NEW: System User Registration
const SystemRegistrationContent = [
  {
    operationType: "SYSTEM_SIGNUP",
    Contentdata: {
      title: "Register System User",
      subtitle: "Platform Administrator Registration",
      description: "Create a new system administrator account with platform-wide access and management privileges.",
      buttonName: "Register System Account",
      icon: "👑",
      features: [
        "Platform-wide access",
        "Tenant management",
        "System monitoring", 
        "User administration",
        "Audit and security"
      ],
      accessLevel: "system",
      requiresRegistrationCode: true
    },
    formFields: [
      { value: "firstName", placeholder: "First Name", type: "text", required: true },
      { value: "surname", placeholder: "Surname", type: "text", required: true },
      { value: "email", placeholder: "System Email", type: "email", required: true },
      { value: "password", placeholder: "Secure Password", type: "password", required: true },
      { value: "registrationCode", placeholder: "Registration Code", type: "password", required: true },
    ],
  },
];

// ----------------------------------------------------
// B. ENHANCED FORM COMPONENTS WITH REAL API CALLS
// ----------------------------------------------------

const AuthForm = ({ operation, onBack }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getContent = () => {
    switch(operation) {
      case 'SCHOOL_SIGNUP': return SchoolRegistrationContent[0];
      case 'TENANT_LOGIN': return TenantLoginContent[0];
      case 'SYSTEM_LOGIN': return SystemDeveloperContent[0];
      case 'SYSTEM_SIGNUP': return SystemRegistrationContent[0];
      default: return SchoolRegistrationContent[0];
    }
  };

  const content = getContent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (operation === 'SCHOOL_SIGNUP') {
        // Create new tenant (school registration)
        const response = await fetch(buildApiUrl(API_CONFIG.system.tenant), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'School registration failed');
        }

        result = await response.json();
        console.log('School registration successful:', result);
        
        alert('School registered successfully! You can now login with your credentials.');
        onBack();
        
      } else if (operation === 'TENANT_LOGIN') {
        // Tenant user login
        result = await tenantAuthService.login(formData);
        console.log('Tenant login successful:', result);
        
        if (result.data?.accessToken) {
          localStorage.setItem('tenant_access_token', result.data.accessToken);
          localStorage.setItem('user_role', result.data.role);
          localStorage.setItem('tenant_id', result.data.tenantId);
          navigate('/admin/dashboard');
        }
        
      } else if (operation === 'SYSTEM_LOGIN') {
        // System user login
        result = await systemAuthService.login(formData);
        console.log('System login successful:', result);
        
        if (result.data?.accessToken) {
          localStorage.setItem('system_access_token', result.data.accessToken);
          localStorage.setItem('user_role', result.data.platformRole);
          navigate('/system/dashboard');
        }
        
      } else if (operation === 'SYSTEM_SIGNUP') {
        // System user registration
        result = await systemAuthService.register(formData);
        console.log('System user registration successful:', result);
        
        if (result.data?.accessToken) {
          localStorage.setItem('system_access_token', result.data.accessToken);
          localStorage.setItem('user_role', result.data.platformRole);
          navigate('/system/dashboard');
        }
      }
    } catch (error) {
      console.error(`${operation} failed:`, error);
      setError(error.message || `Failed to ${operation.includes('SIGNUP') ? 'register' : 'login'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isSystemOperation = operation.includes('SYSTEM');
  const isRegistration = operation.includes('SIGNUP');

  return (
    <div className={style.authFlowContainer}>
      <div className={style.authHeader}>
        <button onClick={onBack} className={style.backButton}>
          ← Back to Options
        </button>
        <div className={`${style.authIcon} ${isSystemOperation ? style.systemIcon : ''}`}>
          {content.Contentdata.icon}
        </div>
        <h2>{content.Contentdata.title}</h2>
        <p>{content.Contentdata.subtitle}</p>
        
        {isSystemOperation && (
          <div className={style.securityBadge}>
            🔒 {isRegistration ? 'Secure Registration' : 'System-Level Access'}
          </div>
        )}
      </div>

      {error && (
        <div className={style.errorMessage}>
          <span className={style.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {isSystemOperation && isRegistration && (
        <div className={style.registrationNotice}>
          <h4>🔐 Secure Registration Required</h4>
          <p>You need a valid registration code provided by the platform administrator to create a system account.</p>
        </div>
      )}

      <div className={style.authFormWrapper}>
        <form onSubmit={handleSubmit} className={style.authForm}>
          {content.formFields.map((field, index) => (
            <div key={index} className={style.formField}>
              <label className={style.inputLabel}>
                {field.placeholder}
                {field.required && <span className={style.required}> *</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  className={style.authInput}
                  onChange={(e) => handleInputChange(field.value, e.target.value)}
                  required={field.required}
                  value={formData[field.value] || ''}
                >
                  <option value="">Select {field.placeholder}</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className={style.authInput}
                  onChange={(e) => handleInputChange(field.value, e.target.value)}
                  required={field.required}
                  value={formData[field.value] || ''}
                  disabled={loading}
                />
              )}
            </div>
          ))}
          
          <button 
            type="submit" 
            className={`${style.authSubmitButton} ${isSystemOperation ? style.systemSubmitButton : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : content.Contentdata.buttonName}
          </button>
        </form>

        <div className={style.authFeatures}>
          <h4>Access Includes:</h4>
          <ul>
            {content.Contentdata.features.map((feature, index) => (
              <li key={index}>
                <span className={style.featureIcon}>✓</span> 
                {feature}
              </li>
            ))}
          </ul>
          
          {isSystemOperation && (
            <div className={style.systemAccessNote}>
              <p>🔍 All activities are audited</p>
              <p>📝 Comprehensive logging enabled</p>
              <p>🚨 Security monitoring active</p>
              {isRegistration && (
                <p>🔑 Registration code verification required</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={style.authFooter}>
        {!isSystemOperation && (
          <button 
            onClick={() => alert('Password reset flow would be initiated here')} 
            className={style.authLink}
          >
            Forgot your credentials?
          </button>
        )}
        <p className={style.authNote}>
          {operation === 'SCHOOL_SIGNUP' 
            ? 'By registering, you agree to our Terms of Service and Privacy Policy'
            : operation === 'SYSTEM_SIGNUP'
            ? 'System registration requires valid registration code and security clearance'
            : isSystemOperation
            ? 'System access requires multi-factor authentication and security clearance'
            : 'Secure login with multi-tenant data isolation'
          }
        </p>
      </div>
    </div>
  );
};

// Enhanced Card Component with System Access
const EnhancedCard = ({ operationType, Contentdata, setFlow }) => {
  const isSystemAccess = operationType.includes('SYSTEM');
  const isRegistration = operationType.includes('SIGNUP');
  
  return (
    <div 
      className={`${style.enhancedCard} ${isSystemAccess ? style.systemCard : ''}`}
      onClick={() => setFlow(operationType)}
    >
      {isSystemAccess && <div className={style.secureRibbon}>
        {isRegistration ? 'SECURE REGISTRATION' : 'SYSTEM ACCESS'}
      </div>}
      
      <div className={`${style.cardIcon} ${isSystemAccess ? style.systemIcon : ''}`}>
        {Contentdata.icon}
      </div>
      
      <div className={style.cardContent}>
        <h3>{Contentdata.title}</h3>
        <p>{Contentdata.description}</p>
        <div className={style.cardFeatures}>
          {Contentdata.features.slice(0, 2).map((feature, index) => (
            <span key={index} className={`${style.featureTag} ${isSystemAccess ? style.systemFeature : ''}`}>
              ✓ {feature}
            </span>
          ))}
          {isSystemAccess && (
            <span className={style.securityFeature}>
              {isRegistration ? '🔑 Code Required' : '🔒 Enhanced Security'}
            </span>
          )}
        </div>
      </div>
      
      <button className={`${style.cardButton} ${isSystemAccess ? style.systemButton : ''}`}>
        {Contentdata.buttonName} →
      </button>
    </div>
  );
};

// Developer Access Trigger Component
const DeveloperAccessTrigger = ({ onActivate }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showTrigger, setShowTrigger] = useState(false);

  const handleSecretClick = (e) => {
    // Check for Ctrl/Cmd key
    if (e.ctrlKey || e.metaKey) {
      onActivate();
      return;
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 3) {
      setShowTrigger(true);
      setClickCount(0);
    }
  };

  return (
    <>
      <div 
        className={style.secretArea}
        onClick={handleSecretClick}
        title="Click multiple times or hold Ctrl/Cmd while clicking to reveal system access"
      />
      
      {showTrigger && (
        <div className={style.developerTrigger}>
          <button 
            onClick={() => {
              onActivate();
              setShowTrigger(false);
            }}
            className={style.developerAccessBtn}
          >
            🚀 System Developer Access
          </button>
          <button 
            onClick={() => setShowTrigger(false)}
            className={style.closeTrigger}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

// ----------------------------------------------------
// C. MAIN AUTH COMPONENT WITH ALL ACCESS TYPES
// ----------------------------------------------------

const Auth = () => {
  const [flow, setFlow] = useState("welcome");
  const [showSystemAccess, setShowSystemAccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if user is already logged in (either system or tenant)
  useEffect(() => {
    const systemToken = localStorage.getItem('system_access_token');
    const tenantToken = localStorage.getItem('tenant_access_token');
    
    if (systemToken) {
      navigate('/system/dashboard');
    } else if (tenantToken) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Check URL parameters for redirect
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect === 'system') {
      setShowSystemAccess(true);
    }
  }, [searchParams]);

  const resetFlow = () => {
    setFlow("welcome");
  };

  const activateSystemAccess = () => {
    setShowSystemAccess(true);
  };

  const handleCardClick = (operationType) => {
    setFlow(operationType);
  };

  const DisplayComponent = () => {
    switch (flow) {
      case "SCHOOL_SIGNUP":
        return <AuthForm operation="SCHOOL_SIGNUP" onBack={resetFlow} />;
      case "TENANT_LOGIN":
        return <AuthForm operation="TENANT_LOGIN" onBack={resetFlow} />;
      case "SYSTEM_LOGIN":
        return <AuthForm operation="SYSTEM_LOGIN" onBack={resetFlow} />;
      case "SYSTEM_SIGNUP":
        return <AuthForm operation="SYSTEM_SIGNUP" onBack={resetFlow} />;
      default:
        return (
          <div className={style.authWelcome}>
            <DeveloperAccessTrigger onActivate={activateSystemAccess} />
            
            <div className={style.welcomeHeader}>
              <h1 className={style.authTitle}>Welcome to Vitalearn</h1>
              <p className={style.authSubtitle}>
                Choose your entry point to access our multi-tenant educational platform
              </p>
            </div>
            
            <div className={style.authOptions}>
              <div className={style.optionsGrid}>
                {SchoolRegistrationContent.map((element) => (
                  <EnhancedCard
                    key={element.operationType}
                    operationType={element.operationType}
                    Contentdata={element.Contentdata}
                    setFlow={setFlow}
                  />
                ))}

                {TenantLoginContent.map((element) => (
                  <EnhancedCard
                    key={element.operationType}
                    operationType={element.operationType}
                    Contentdata={element.Contentdata}
                    setFlow={setFlow}
                  />
                ))}

                {/* System Access - Conditionally Rendered */}
                {showSystemAccess && (
                  <>
                    {SystemRegistrationContent.map((element) => (
                      <EnhancedCard
                        key={element.operationType}
                        operationType={element.operationType}
                        Contentdata={element.Contentdata}
                        setFlow={setFlow}
                      />
                    ))}
                    {SystemDeveloperContent.map((element) => (
                      <EnhancedCard
                        key={element.operationType}
                        operationType={element.operationType}
                        Contentdata={element.Contentdata}
                        setFlow={setFlow}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className={style.welcomeFooter}>
              <p>Need help deciding? <a href="/contact">Contact our team</a></p>
              
              {!showSystemAccess && (
                <p className={style.systemAccessHint}>
                  System administrators: Hold Ctrl/Cmd while clicking or contact engineering for access
                </p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={style.authPage}>
      <div className={style.authContainer}>
        <DisplayComponent />
        
        {/* Quick Access Help */}
        {flow === "welcome" && (
          <div className={style.accessHelp}>
            <h4>Quick Access Guide:</h4>
            <div className={style.accessMethods}>
              <div className={style.accessMethod}>
                <strong>School Owners:</strong> Click "Register New School"
              </div>
              <div className={style.accessMethod}>
                <strong>Teachers/Students:</strong> Click "School Portal Access" 
              </div>
              <div className={style.accessMethod}>
                <strong>System Admins:</strong> 
                <span className={style.developerHint}>
                  Hold Ctrl/Cmd while clicking to reveal system options
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
