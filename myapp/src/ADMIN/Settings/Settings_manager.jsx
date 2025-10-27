// Settings_manager.jsx
import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import style from './settings_manager.module.css';

// Mock data for system departments
const mockDepartments = [
    { id: 'eng', name: 'Engineering & IT Services', status: 'Active', interest: 'Engineering' },
    { id: 'hth', name: 'Health & Wellness Office', status: 'Active', interest: 'Health' },
    { id: 'psy', name: 'Psychology & Counseling', status: 'Active', interest: 'Psychology' },
    { id: 'fin', name: 'Finance & Accounts', status: 'Active', interest: 'Finance' },
];

const Settings_manager = () => {
    // We assume the Menu structure is already connected to the dashboard layout
    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    
    // State for Theme Toggle (Dark Mode is often default in admin consoles)
    const [isDarkMode, setIsDarkMode] = useState(true);
    // State for Department Activation/Deactivation
    const [departments, setDepartments] = useState(mockDepartments);

    const handleThemeToggle = () => {
        setIsDarkMode(prev => !prev);
        
        // 🔑 Kindergarten Explanation: A **Theme Toggle** is like a light switch for the computer.
        // When you flip it, the whole screen changes color! In **Cross Stack Development**, 
        // this action sends a tiny signal to the very top part of the webpage to tell it 
        // to use a different set of colors defined in the main CSS file.
        console.log(`Theme toggled to: ${!isDarkMode ? 'Dark' : 'Light'}`);
    };

    const handleDepartmentToggle = (deptId) => {
        setDepartments(prevDepts => prevDepts.map(dept => {
            if (dept.id === deptId) {
                // Toggling the system status
                const newStatus = dept.status === 'Active' ? 'Deactivated' : 'Active';
                
                // 🔑 Systems Architect Note: Deactivating a department is serious! 
                // It means you are flipping the kill switch for that part of your 
                // **Distributed System**. For example, deactivating 'Finance' 
                // would cause its microservice to stop accepting API calls.
                alert(`🚨 System Override: ${dept.name} is now set to **${newStatus}**! This will affect all users and requires a systems check!`);
                
                return { ...dept, status: newStatus };
            }
            return dept;
        }));
    };
    
    const handleResetAll = () => {
        // The most "crazy" stuff!
        const confirmation = window.confirm("🚨 DANGER! Are you certain you want to trigger a FULL SYSTEM CONFIG RESET? This is a highly sensitive action that is usually irreversible without backups.");
        if (confirmation) {
            // 🔑 Engineering Explanation: A **System Reset** is like erasing your computer's brain 
            // and putting the original factory instructions back. It guarantees security 
            // because any bad configurations are wiped clean, but it's very risky!
            alert("🔥 FULL SYSTEM RESET INITIATED. Reverting all configurations to factory defaults. This requires immediate sign-off from the lead Systems Architect!");
            // Simulate resetting department states
            setDepartments(mockDepartments.map(d => ({ ...d, status: 'Active' })));
            setIsDarkMode(true);
        }
    };

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    <div className={style.managerContainer}>
                        <h1 className={style.pageTitle}>⚙️ System Settings & Configuration</h1>

                        {/* --- 1. General Interface Settings --- */}
                        <div className={style.settingsSection}>
                            <h2>Interface & Preferences</h2>
                            
                            {/* Theme Toggle */}
                            <div className={style.settingItem}>
                                <div>
                                    <p className={style.settingLabel}>Theme Toggle</p>
                                    <p className={style.settingDescription}>Switch between Dark Mode (for low light) and Light Mode (for a bright day).</p>
                                </div>
                                <div className={style.settingControl}>
                                    <label className={style.switch}>
                                        <input 
                                            type="checkbox" 
                                            checked={isDarkMode} 
                                            onChange={handleThemeToggle}
                                        />
                                        <span className={style.slider} />
                                    </label>
                                </div>
                            </div>

                        </div>

                        {/* --- 2. Systems Architecture & Security Controls (The "Crazy Stuff") --- */}
                        <div className={style.settingsSection}>
                            <h2>Systems Control: Department Deactivation ⚠️</h2>
                            <p className={style.settingDescription} style={{marginBottom: '15px'}}>
                                **Systems Architect Control**: Use this to globally enable or disable entire sections of the application, ensuring system isolation when maintenance is required (**Engineering** focus).
                            </p>
                            
                            {departments.map((dept) => (
                                <div key={dept.id} className={style.departmentControl}>
                                    <div>
                                        <p className={style.settingLabel}>{dept.name}</p>
                                        <span className={style.deptStatus} data-status={dept.status}>
                                            Status: {dept.status}
                                        </span>
                                    </div>
                                    <div className={style.settingControl}>
                                        <button 
                                            className={style.deptButton}
                                            data-status={dept.status}
                                            onClick={() => handleDepartmentToggle(dept.id)}
                                        >
                                            {/* Button text changes based on current status */}
                                            {dept.status === 'Active' ? 'Deactivate ❌' : 'Re-Activate ✅'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- 3. Danger Zone (Final Overrides) --- */}
                        <div className={style.settingsSection} style={{border: '2px solid #e53e3e'}}>
                            <h2>DANGER ZONE 💣</h2>
                            <div className={style.settingItem}>
                                <div>
                                    <p className={style.settingLabel}>Full System Configuration Reset</p>
                                    <p className={style.settingDescription}>
                                        Wipes all settings, security policies, and user role mappings. Use only in emergency scenarios.
                                    </p>
                                </div>
                                <div className={style.settingControl}>
                                    <button 
                                        className={style.deptButton} 
                                        onClick={handleResetAll}
                                    >
                                        Initiate Reset
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Settings_manager;