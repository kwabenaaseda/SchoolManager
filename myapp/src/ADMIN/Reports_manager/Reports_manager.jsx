// Reports_manager/Reports_manager.jsx
import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";

const Reports_manager = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1024); 
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
    
  return (
    <div className="body">
      <Menu isMenuOpen={isMenuOpen} />
      <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
        <Header toggleMenu={toggleMenu} />

        <section className="display">
          <h1>📊 System Reports & Business Intelligence</h1>
          <p>
            This is the **Engineering** and BI hub.
          </p>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Reports_manager;