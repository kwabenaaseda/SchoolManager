import React, { useState } from 'react'
import style from './Header.module.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileClickCount, setMobileClickCount] = useState(0);

  const handleAuthClick = (e) => {
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Ctrl/Cmd + Click for developer access (desktop)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      navigate('/auth?access=developer');
      return;
    }
    
    // Regular auth navigation
    navigate('/auth');
  };

  const handleMobileAuthClick = (e) => {
    e.preventDefault();
    
    // Increment tap counter for mobile
    const newCount = mobileClickCount + 1;
    setMobileClickCount(newCount);

    if (newCount >= 3) {
      // Triple tap detected - show developer access
      setMobileClickCount(0);
      navigate('/auth?access=developer');
      setIsMobileMenuOpen(false);
    } else {
      // Regular auth access
      navigate('/auth');
      setIsMobileMenuOpen(false);
    }

    // Reset counter after 2 seconds
    setTimeout(() => setMobileClickCount(0), 2000);
  };

  const handleLogoClick = (e) => {
    const newCount = mobileClickCount + 1;
    setMobileClickCount(newCount);
    
    // Triple click logo for system access hint (desktop)
    if (newCount >= 3) {
      alert('💡 Developer Tip: Hold Ctrl/Cmd while clicking "Register/Login" for system access\n📱 Mobile: Triple-tap the auth button');
      setMobileClickCount(0);
    }
    
    // Reset counter after 2 seconds
    setTimeout(() => setMobileClickCount(0), 2000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={style.header}>
      <div className={style.logo_container}>
        <h1 className={style.logoText} onClick={handleLogoClick} style={{cursor: 'pointer'}}>
          Vitalearn
        </h1>
      </div> 

      {/* Desktop Navigation */}
      <ul className={`${style.Nav} ${style.desktopNav}`}>
        <NavLink to='/' onClick={closeMobileMenu}><li>Home</li></NavLink>
        <NavLink to='/about' onClick={closeMobileMenu}><li>About</li></NavLink>
        <NavLink to='/docs' onClick={closeMobileMenu}><li>Documentation</li></NavLink>
        <NavLink to='/contact' onClick={closeMobileMenu}><li>Contact</li></NavLink>
        <button 
          onClick={handleAuthClick}
          className={style.Auth}
          title="Click for regular access | Ctrl/Cmd+Click for developer access"
        >
          Register/Login
        </button>
      </ul>

      {/* Mobile Menu Button */}
      <button 
        className={style.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={style.hamburger}></span>
        <span className={style.hamburger}></span>
        <span className={style.hamburger}></span>
      </button>

      {/* Mobile Navigation */}
      <div className={`${style.mobileNav} ${isMobileMenuOpen ? style.mobileNavOpen : ''}`}>
        <div className={style.mobileNavOverlay} onClick={closeMobileMenu}></div>
        <div className={style.mobileNavContent}>
          <div className={style.mobileNavHeader}>
            <h3>Menu</h3>
            <button 
              className={style.mobileNavClose}
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <nav className={style.mobileNavLinks}>
            <NavLink to='/' onClick={closeMobileMenu} className={style.mobileNavLink}>
              <span>🏠</span> Home
            </NavLink>
            <NavLink to='/about' onClick={closeMobileMenu} className={style.mobileNavLink}>
              <span>ℹ️</span> About
            </NavLink>
            <NavLink to='/docs' onClick={closeMobileMenu} className={style.mobileNavLink}>
              <span>📚</span> Documentation
            </NavLink>
            <NavLink to='/contact' onClick={closeMobileMenu} className={style.mobileNavLink}>
              <span>📞</span> Contact
            </NavLink>
            
            <div className={style.mobileAuthSection}>
              <button 
                onClick={handleMobileAuthClick}
                className={style.mobileAuthButton}
                title="Tap once for regular access | Triple-tap for developer access"
              >
                <span>🔐</span> Register/Login
                {mobileClickCount > 0 && (
                  <span className={style.tapCounter}>
                    Taps: {mobileClickCount}/3
                  </span>
                )}
              </button>
              
              <div className={style.mobileAuthHint}>
                <small>💡 Triple-tap for developer access</small>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header