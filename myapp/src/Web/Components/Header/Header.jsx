import React, { useState } from 'react'
import style from './Header.module.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleAuthClick = (e) => {
    // Check for modifier keys (Ctrl, Alt, Cmd) for developer access
    if (e.ctrlKey || e.altKey || e.metaKey) {
      e.preventDefault();
      navigate('/auth?access=developer');
      return;
    }
    
    // Regular auth navigation
    navigate('/auth');
  };

  const handleLogoClick = (e) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Triple click logo for system access hint
    if (newCount >= 3) {
      alert('💡 Developer Tip: Hold Ctrl/Cmd while clicking "Register/Login" for system access');
      setClickCount(0);
    }
    
    // Reset counter after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <header className={style.header}>
        <div className={style.logo_container}>
             <h1 className={style.logoText} onClick={handleLogoClick} style={{cursor: 'pointer'}}>
               Vitalearn
             </h1>
        </div> 
        <ul className={style.Nav}>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/about'><li>About</li></NavLink>
            <NavLink to='/docs'><li>Documentation</li></NavLink>
            <NavLink to='/contact'><li>Contact</li></NavLink>
            <button 
              onClick={handleAuthClick}
              className={style.Auth}
              title="Hold Ctrl/Cmd for system access"
            >
              Register/Login
            </button>
        </ul>
    </header>
  )
}

export default Header