import React, { useEffect, useState } from "react";
import Card from "../Globals/Card.jsx";
import style from "../Components/Style/Page.module.css";
import { useSearchParams } from "react-router-dom";

// ----------------------------------------------------
// A. ENHANCED DATA DEFINITION WITH SYSTEM ACCESS
// ----------------------------------------------------

const SystemRegistrationContent = [
  {
    operationType: "SYSTEM_SIGNUP",
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
      { value: "tenantName", placeholder: "Institution Name", type: "text" },
      { value: "ownerFirstName", placeholder: "First Name", type: "text" },
      { value: "ownerSurname", placeholder: "Surname", type: "text" },
      { value: "ownerEmail", placeholder: "Administrator Email", type: "email" },
      { value: "ownerPassword", placeholder: "Secure Password", type: "password" },
      { value: "subscriptionPlan", placeholder: "Subscription Plan", type: "select", options: ["Standard", "Premium", "Enterprise"] },
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
      { value: "tenantId", placeholder: "School ID / Domain", type: "text" },
      { value: "email", placeholder: "User Email or ID", type: "text" },
      { value: "password", placeholder: "Password", type: "password" },
    ],
  },
];

// NEW: System Developer Access
const SystemDeveloperContent = [
  {
    operationType: "SYSTEM_DEVELOPER",
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
      accessLevel: "system",
      requiresSecurityKey: true
    },
    formFields: [
      { value: "systemEmail", placeholder: "System Admin Email", type: "email" },
      { value: "systemPassword", placeholder: "System Password", type: "password" },
      { value: "securityKey", placeholder: "Security Key / 2FA", type: "password" },
    ],
  },
];

// ----------------------------------------------------
// B. ENHANCED FORM COMPONENTS WITH SYSTEM ACCESS
// ----------------------------------------------------

const AuthForm = ({ operation, onBack }) => {
  const getContent = () => {
    switch(operation) {
      case 'SYSTEM_SIGNUP': return SystemRegistrationContent[0];
      case 'TENANT_LOGIN': return TenantLoginContent[0];
      case 'SYSTEM_DEVELOPER': return SystemDeveloperContent[0];
      default: return SystemRegistrationContent[0];
    }
  };

  const content = getContent();
  const [formData, setFormData] = useState({});
  const [showSecurityNotice, setShowSecurityNotice] = useState(operation === 'SYSTEM_DEVELOPER');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (operation === 'SYSTEM_DEVELOPER') {
      // Enhanced security for system access
      console.log('SYSTEM DEVELOPER ACCESS ATTEMPT:', {
        ...formData,
        timestamp: new Date().toISOString(),
        ip: 'logged',
        userAgent: navigator.userAgent
      });
      alert('System developer authentication would validate security keys and 2FA');
    } else {
      console.log(`${operation} form submitted:`, formData);
      alert(`${operation === 'SYSTEM_SIGNUP' ? 'School registration' : 'Login'} functionality would be implemented here`);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={style.authFlowContainer}>
      <div className={style.authHeader}>
        <button onClick={onBack} className={style.backButton}>
          ← Back to Options
        </button>
        <div className={`${style.authIcon} ${operation === 'SYSTEM_DEVELOPER' ? style.systemIcon : ''}`}>
          {content.Contentdata.icon}
        </div>
        <h2>{content.Contentdata.title}</h2>
        <p>{content.Contentdata.subtitle}</p>
        
        {operation === 'SYSTEM_DEVELOPER' && (
          <div className={style.securityBadge}>
            🔒 System-Level Access
          </div>
        )}
      </div>

      {showSecurityNotice && operation === 'SYSTEM_DEVELOPER' && (
        <div className={style.securityNotice}>
          <h4>⚠️ Security Notice</h4>
          <p>You are accessing the system administration panel. All actions are logged and monitored.</p>
          <button 
            onClick={() => setShowSecurityNotice(false)}
            className={style.acknowledgeButton}
          >
            I Understand
          </button>
        </div>
      )}

      <div className={style.authFormWrapper}>
        <form onSubmit={handleSubmit} className={style.authForm}>
          {content.formFields.map((field, index) => (
            <div key={index} className={style.formField}>
              <label className={style.inputLabel}>
                {field.placeholder}
                {field.value === 'securityKey' && <span className={style.required}> *</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  className={style.authInput}
                  onChange={(e) => handleInputChange(field.value, e.target.value)}
                  required
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
                  required
                />
              )}
            </div>
          ))}
          
          <button type="submit" className={`
            ${style.authSubmitButton} 
            ${operation === 'SYSTEM_DEVELOPER' ? style.systemSubmitButton : ''}
          `}>
            {content.Contentdata.buttonName}
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
          
          {operation === 'SYSTEM_DEVELOPER' && (
            <div className={style.systemAccessNote}>
              <p>🔍 All activities are audited</p>
              <p>📝 Comprehensive logging enabled</p>
              <p>🚨 Security monitoring active</p>
            </div>
          )}
        </div>
      </div>

      <div className={style.authFooter}>
        {operation !== 'SYSTEM_DEVELOPER' && (
          <button 
            onClick={() => alert('Password reset flow would be initiated here')} 
            className={style.authLink}
          >
            Forgot your credentials?
          </button>
        )}
        <p className={style.authNote}>
          {operation === 'SYSTEM_SIGNUP' 
            ? 'By registering, you agree to our Terms of Service and Privacy Policy'
            : operation === 'SYSTEM_DEVELOPER'
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
  const isSystemAccess = operationType === 'SYSTEM_DEVELOPER';
  
  return (
    <div 
      className={`
        ${style.enhancedCard} 
        ${isSystemAccess ? style.systemCard : ''}
      `}
      onClick={() => setFlow(operationType)}
    >
      {isSystemAccess && <div className={style.secureRibbon}>SECURE ACCESS</div>}
      
      <div className={`
        ${style.cardIcon} 
        ${isSystemAccess ? style.systemIcon : ''}
      `}>
        {Contentdata.icon}
      </div>
      
      <div className={style.cardContent}>
        <h3>{Contentdata.title}</h3>
        <p>{Contentdata.description}</p>
        <div className={style.cardFeatures}>
          {Contentdata.features.slice(0, 2).map((feature, index) => (
            <span key={index} className={`
              ${style.featureTag} 
              ${isSystemAccess ? style.systemFeature : ''}
            `}>
              ✓ {feature}
            </span>
          ))}
          {isSystemAccess && (
            <span className={style.securityFeature}>🔒 Enhanced Security</span>
          )}
        </div>
      </div>
      
      <button className={`
        ${style.cardButton} 
        ${isSystemAccess ? style.systemButton : ''}
      `}>
        {Contentdata.buttonName} →
      </button>
    </div>
  );
};

// Developer Access Trigger Component
const DeveloperAccessTrigger = ({ onActivate }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showTrigger, setShowTrigger] = useState(false);

  const handleSecretClick = () => {
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
        title="Click multiple times to reveal system access"
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
// C. MAIN AUTH COMPONENT WITH SYSTEM ACCESS
// ----------------------------------------------------

const Auth = () => {
    const [flow, setFlow] = useState("welcome");
  const [showSystemAccess, setShowSystemAccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Check URL parameters on component mount
  useEffect(() => {
    const accessType = searchParams.get('access');
    if (accessType === 'developer') {
      setShowSystemAccess(true);
    }
  }, [searchParams]);

  const resetFlow = () => {
    setFlow("welcome");
    setSearchParams({}); // Clear URL params
  };

  const activateSystemAccess = () => {
    setShowSystemAccess(true);
    setSearchParams({ access: 'developer' });
  };

  const handleCardClick = (operationType) => {
    setFlow(operationType);
    if (operationType === 'SYSTEM_DEVELOPER') {
      setSearchParams({ access: 'developer' });
    } else {
      setSearchParams({});
    }
  };
  const DisplayComponent = () => {
    switch (flow) {
      case "SYSTEM_SIGNUP":
        return <AuthForm operation="SYSTEM_SIGNUP" onBack={resetFlow} />;
      case "TENANT_LOGIN":
        return <AuthForm operation="TENANT_LOGIN" onBack={resetFlow} />;
      case "SYSTEM_DEVELOPER":
        return <AuthForm operation="SYSTEM_DEVELOPER" onBack={resetFlow} />;
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
                {SystemRegistrationContent.map((element) => (
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

                {/* System Developer Access - Conditionally Rendered */}
                {showSystemAccess && SystemDeveloperContent.map((element) => (
                  <EnhancedCard
                    key={element.operationType}
                    operationType={element.operationType}
                    Contentdata={element.Contentdata}
                    setFlow={setFlow}
                  />
                ))}
              </div>
            </div>

            <div className={style.welcomeFooter}>
              <p>Need help deciding? <a href="/contact">Contact our team</a></p>
              
              {!showSystemAccess && (
                <p className={style.systemAccessHint}>
                  System administrators: Contact engineering for access credentials
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
                <strong>Developers:</strong> 
                <span className={style.developerHint}>
                  Hold Ctrl/Cmd while clicking header button or contact engineering
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