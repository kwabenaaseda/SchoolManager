import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx'
import HomePage from './Pages/HomePage.jsx';
import About from './Pages/About.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import Documentation from './Pages/Documentation.jsx';
import Auth from './Pages/Auth.jsx';
import Footer from './Components/Footer/Footer.jsx';

/**
 * The main container component for Vitalearn web landing pages.
 * Minimalistic, performance-focused layout.
 */
const Web_main = () => {
  return (
   
      <div className="app-container">
        <Header />
        
        <main className="main-content">
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
        </main>

        <Footer />
      </div>
   
  )
}

export default Web_main