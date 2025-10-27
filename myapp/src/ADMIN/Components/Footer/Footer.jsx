// Footer.jsx
import React from 'react'
import style from './footer.module.css'
const Footer = () => {
  return (
    <footer className={style.footer}>
        {/* Simplified content to Legal/Support and Icons */}
        <ul>
            <li>Legal</li>
            <li>Support</li>
        </ul>
        <ul>
            <li>📧</li>
            <li>🦜</li>
            <li>🤝</li>
        </ul>
    </footer>
  )
}

export default Footer