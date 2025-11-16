import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [systemAccessClicks, setSystemAccessClicks] = useState(0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // System access detection
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        navigate('/auth?redirect=system')
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  const handleAuthClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      navigate('/auth?redirect=system')
      return
    }
    navigate('/auth')
  }

  const handleMobileAuthClick = () => {
    const newCount = systemAccessClicks + 1
    setSystemAccessClicks(newCount)

    if (newCount >= 3) {
      navigate('/auth?redirect=system')
      setSystemAccessClicks(0)
    } else {
      navigate('/auth')
    }

    setTimeout(() => setSystemAccessClicks(0), 2000)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/docs', label: 'Docs', icon: '📚' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ]

  return (
    <>
      <header className={`${style.header} ${isScrolled ? style.scrolled : ''}`}>
        <div className={style.container}>
          {/* Logo */}
          <div className={style.logo}>
            <NavLink to="/" className={style.logoLink}>
              <span className={style.logoIcon}>🎓</span>
              <span className={style.logoText}>Vitalearn</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className={style.desktopNav}>
            <ul className={style.navList}>
              {navItems.map((item) => (
                <li key={item.path} className={style.navItem}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `${style.navLink} ${isActive ? style.active : ''}`
                    }
                  >
                    <span className={style.navIcon}>{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className={style.authSection}>
            <button
              onClick={handleAuthClick}
              className={style.authButton}
              title="Click to access • Ctrl/Cmd+K for developer access"
            >
              <span className={style.authIcon}>🔐</span>
              <span className={style.authText}>Access</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${style.menuButton} ${isMenuOpen ? style.menuOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`${style.mobileOverlay} ${isMenuOpen ? style.overlayOpen : ''}`}>
        <nav className={style.mobileNav}>
          <div className={style.mobileHeader}>
            <span className={style.mobileTitle}>Menu</span>
            <button
              className={style.closeButton}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <span>×</span>
            </button>
          </div>

          <ul className={style.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.path} className={style.mobileNavItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `${style.mobileNavLink} ${isActive ? style.mobileActive : ''}`
                  }
                  onClick={toggleMenu}
                >
                  <span className={style.mobileNavIcon}>{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={style.mobileAuth}>
            <button
              onClick={handleMobileAuthClick}
              className={style.mobileAuthButton}
            >
              <span className={style.mobileAuthIcon}>🔐</span>
              <span className={style.mobileAuthText}>
                {systemAccessClicks > 0 ? `${systemAccessClicks}/3 taps` : 'Access Platform'}
              </span>
            </button>
            {systemAccessClicks > 0 && (
              <div className={style.accessHint}>
                Triple-tap for developer access
              </div>
            )}
          </div>

          <div className={style.mobileFooter}>
            <div className={style.keyboardShortcut}>
              <kbd>Ctrl</kbd> + <kbd>K</kbd> for developer access
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className={style.backdrop} onClick={toggleMenu} />
      )}
    </>
  )
}

export default Header