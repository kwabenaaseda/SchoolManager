// Dashboard_manager/Dashboard_manager.jsx
import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import { Routes, Route } from 'react-router-dom'; 
// Added for completeness
import DashboardContent from "../Components/Dashboard/DashboardContent";

const DashboardView = () => (
    <>
        <h1>🏠 ADMIN DASHBOARD: System Health Overview</h1>
        <p>Welcome, Systems Architect. This is the fully integrated dashboard.</p>
    </>
);

const Dashboard_manager = () => {
  // CRITICAL: Initialize menu state
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1024); 
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
    
  return (
    // CRITICAL: Use the global 'body' class
    <div className="body">
      {/* Menu receives the state */}
      <Menu isMenuOpen={isMenuOpen} />
      {/* Main uses the state for dynamic margin/width */}
      <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
        {/* Header receives the toggler function */}
        <Header toggleMenu={toggleMenu} />

        <section className="display">
          {/* Use nested routes if needed, or just the view */}
          <Routes>
              <Route index element={<DashboardContent />} />
          </Routes>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard_manager;