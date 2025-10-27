// Components/Header/Header.jsx
import React from 'react'
import Search from '../Search/Search'
import style from './header.module.css'

const Header = ({ toggleMenu }) => { // 🔑 Now accepts toggleMenu prop
  return (
    <header className={style.Header}>
      {/* 🔑 ADDED: Menu Toggle Button to fix navigation */}
      <button className={style.menuToggleButton} onClick={toggleMenu}>
        ☰
      </button>
      <Search placeholder='Search For Students, Courses or Settings'/>
      <div className={style.profile}>👤 Admin</div> 
    </header>
  )
}

export default Header