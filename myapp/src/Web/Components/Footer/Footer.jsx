// Components/Footer/Footer.jsx
import React from 'react'
import style from './Footer.module.css'

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
          <a href="/docs">Documentation</a>
          <a href="/about">Features</a>
          <a href="/auth">Pricing</a>
        </div>
        <div className={style.footerSection}>
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className={style.footerBottom}>
        <p>&copy; 2024 Vitalearn. Built for educational excellence.</p>
      </div>
    </footer>
  )
}

export default Footer