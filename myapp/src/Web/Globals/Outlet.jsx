import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import ContactUs from '../Pages/ContactUs'
import Auth from '../Pages/Auth'
import About from '../Pages/About'
import Documentation from '../Pages/Documentation'

const Outlet = () => {
  return (
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/auth/*" element={<Auth />} />

            <Route path="*" element={
              <div className="error-page">
                <div className="error-content">
                  <h1>404</h1>
                  <p>Page not found</p>
                  <a href="/" className="back-home">Return Home</a>
                </div>
              </div>
            } />
          </Routes>
  )
}

export default Outlet
