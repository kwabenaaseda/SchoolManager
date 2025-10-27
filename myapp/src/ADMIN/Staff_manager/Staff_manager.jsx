// Staff_manager.jsx (Updated with Nested Routing Logic)
import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'; // NEW IMPORTS
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import StaffProfile from "./StaffProfile"; // Import the new profile component
import style from './staff_manager.module.css';

// Mock Data for the Admin Staff List View
const mockStaff = [
    { id: 'STA-201', name: 'Dr. Eleanor Vance', role: 'Head of Engineering', dept: 'Administration', status: 'Active' },
    { id: 'STA-202', name: 'Mr. David Lee', role: 'Teacher', dept: 'Mathematics', status: 'Active' },
    { id: 'STA-203', name: 'Ms. Sarah Connor', role: 'Counselor', dept: 'Student Health', status: 'On Leave' },
    { id: 'STA-204', name: 'Mr. James R. T.', role: 'Teacher', dept: 'Psychology', status: 'Inactive' },
];

// --- Sub-Component for the List View (Extracted) ---
const StaffListView = ({ staff }) => {
    const navigate = useNavigate();
  
    const handleManageAccount = (staffId) => {
        // 🔑 The linking action: Navigates to /staff/STA-201
        navigate(`/staff/${staffId}`); 
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return style.statusActive;
            case 'Inactive': return style.statusInactive;
            case 'On Leave': return style.statusOnLeave;
            default: return '';
        }
    };
    
    return (
        <div className={style.managerContainer}>
            <div className={style.managerHeader}>
                <h1 className={style.pageTitle}>Staff Management (List View)</h1>
                <button className={style.addButton}>+ Hire New Staff</button>
            </div>
            
            <table className={style.staffTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staffMember) => (
                        <tr key={staffMember.id}>
                            <td>{staffMember.id}</td>
                            <td>{staffMember.name}</td>
                            <td>{staffMember.role}</td>
                            <td>{staffMember.dept}</td>
                            <td>
                                <span className={`${style.statusTag} ${getStatusClass(staffMember.status)}`}>
                                    {staffMember.status}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className={style.manageButton}
                                    onClick={() => handleManageAccount(staffMember.id)}
                                >
                                    Manage Account
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
// --- End Sub-Component ---

const Staff_manager = () => {
    // Menu state logic (assuming you copied the toggle logic)
    const [isMenuOpen, setIsMenuOpen] = React.useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    {/* 🔑 NESTED ROUTES: The component that swaps the view */}
                    <Routes>
                        {/* Route 1: List View (path: /staff) */}
                        <Route index element={<StaffListView staff={mockStaff} />} /> 
                        
                        {/* Route 2: Detailed Profile (path: /staff/:staffId) */}
                        <Route path=":staffId" element={<StaffProfile />} /> 
                    </Routes>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Staff_manager;