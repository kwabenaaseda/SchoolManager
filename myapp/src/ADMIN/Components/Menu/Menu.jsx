// Components/Menu/Menu.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./menu.module.css";

// Helper Component for Dropdown Sections
const NavSection = ({ title, icon, path, dropdownLinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Using the border color from index.css for the highlight
    const activeStyle = { 
        backgroundColor: 'var(--border-color)',
        borderRadius: '5px' 
    };

    return (
        <ul className={style.menuSection}>
            <li 
                className={style.menuItem} 
                onClick={() => dropdownLinks && setIsOpen(!isOpen)} 
                style={{ cursor: dropdownLinks ? 'pointer' : 'default' }}
            >
                {/* Main Link */}
                <NavLink 
                    to={path} 
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    className={style.mainLink}
                    onClick={(e) => dropdownLinks && e.preventDefault()}
                    end
                >
                    <p>
                        <span>{icon}</span>{title}
                    </p>
                </NavLink>
                
                {/* Dropdown indicator */}
                {dropdownLinks && (
                    <span className={style.dropDown} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        🔽
                    </span>
                )}
            </li>
            
            {/* Conditional Dropdown Links */}
            {isOpen && dropdownLinks && (
                <div className={style.dropdownContainer}>
                    {dropdownLinks.map((link) => (
                        <NavLink 
                            key={link.path}
                            to={link.path}
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            className={style.subLink}
                            end
                        >
                            <li className={style.subMenuItem}>
                                {link.name}
                            </li>
                        </NavLink>
                    ))}
                </div>
            )}
        </ul>
    );
};

const Menu = ({ isMenuOpen }) => {
    // Menu links structure (kept for functionality)
    const UserManagement = [{ name: "All Students", path: "/admin/students" }, { name: "Enrollment Status", path: "/admin/students/enrollment" }];
    const StaffManagement = [{ name: "All Staff", path: "/admin/staff" }, { name: "Payroll Ledger (Finance)", path: "/admin/staff/payroll" }];
    const SystemTools = [{ name: "System Config", path: "/admin/settings" }, { name: "Data Reports (BI)", path: "/admin/reports" }];

    return (
        <>
        <div className={`sideMenu ${isMenuOpen ? 'menuVisible' : 'menuHidden'}`}>
            <div className={style.logo}>
                <h1>EduAdmin Hub</h1>
            </div>

            <div className={style.menuScrollArea}>
                <h3>OVERVIEW</h3>
                <NavSection title="Dashboard" icon="🏠" path="/admin/" />
                <NavSection title="Courses & Classes" icon="📚" path="/admin/courses" dropdownLinks={[{ name: "Course Catalog", path: "/admin/courses" }]} />
                
                <h3>PEOPLE MANAGEMENT</h3>
                <NavSection title="Students" icon="🧑‍🎓" path="/admin/students" dropdownLinks={UserManagement} />
                <NavSection title="Staff & Teachers" icon="👩‍🏫" path="/admin/staff" dropdownLinks={StaffManagement} />
                <NavSection title="Parents Portal" icon="👨‍👩‍👧" path="/admin/parents" />
                
                <h3>OPERATIONS</h3>
                <NavSection title="Finance" icon="💸" path="/admin/finance" dropdownLinks={[{ name: "Dashboard", path: "/admin/finance" }, { name: "Outstanding Fees", path: "/admin/finance/fees" }]} />
                <NavSection title="Announcements" icon="📢" path="/admin/announcements" />
                
                <h3>SYSTEM TOOLS</h3>
                {SystemTools.map(item => (
                    <NavSection key={item.path} title={item.name} icon={item.icon} path={item.path} />
                ))}

            </div>
        </div>
       </>
    );
};

export default Menu;