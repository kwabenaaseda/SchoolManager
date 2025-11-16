// Components/Footer/Footer.jsx
import React from 'react'
import style from './Footer.module.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.footerSection}>
          <h3>Vitalearn</h3>
          <p>Engineering success in education through distributed systems architecture.</p>
        </div>
        <div className={style.footerSection}>
          <h4>Product</h4>
          <NavLink to="/docs">Documentation</NavLink>
          <NavLink to="/about">Features</NavLink>
          <NavLink to="/auth">Pricing</NavLink>
        </div>
        <div className={style.footerSection}>
          <h4>Company</h4>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
      <div className={style.footerBottom}>
        <p>&copy; 2024 Vitalearn. Built for educational excellence.</p>
      </div>
    </footer>
  )
}

export default Footer