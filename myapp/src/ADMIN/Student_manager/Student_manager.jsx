// Student_manager.jsx
import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'; // NEW IMPORTS
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import StudentProfile from "../Components/Student/StudentProfile"; // The detailed view
import style from './student_manager.module.css';

// Mock Data for the Admin List View
const mockStudents = [
    { id: 'STU-1001', name: 'Aisha K. Davies', grade: '10', class: '10A', attendance: '98%', status: 'Active' },
    { id: 'STU-1002', name: 'Ben C. Lee', grade: '9', class: '9B', attendance: '90%', status: 'Warning' },
    { id: 'STU-1003', name: 'Chloe E. Khan', grade: '12', class: '12A', attendance: '100%', status: 'Active' },
];

// --- Sub-Component for the List View ---
// eslint-disable-next-line react-refresh/only-export-components
const StudentListView = ({ students }) => {
    const navigate = useNavigate(); // Hook for navigation

    const handleViewProfile = (studentId) => {
        // Navigates to /students/STU-1001
        navigate(`/students/${studentId}`); 
    };

    return (
        <div className={style.managerContainer}>
            <div className={style.managerHeader}>
                <h1 className={style.pageTitle}>Student Management (List View)</h1>
                <button className={style.addButton}>+ Add New Student</button>
            </div>
            
            <table className={style.studentTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Grade/Class</th>
                        <th>Attendance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.grade}/{student.class}</td>
                            <td style={{ color: student.status === 'Warning' ? '#f56565' : 'inherit' }}>
                                {student.attendance}
                            </td>
                            <td>{student.status}</td>
                            <td>
                                {/* 🔑 LINKING ACTION: Call the navigate function */}
                                <button 
                                    className={style.viewButton}
                                    onClick={() => handleViewProfile(student.id)}
                                >
                                    View Profile
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

const Student_manager = () => {
    // Menu state logic
    const [isMenuOpen, setIsMenuOpen] = React.useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    {/* 🔑 NESTED ROUTES: This is the view-switching logic */}
                    <Routes>
                        {/* Route 1: List View (path is /students) */}
                        <Route index element={<StudentListView students={mockStudents} />} /> 
                        
                        {/* Route 2: Detailed Profile View (path is /students/:studentId) */}
                        <Route path=":studentId" element={<StudentProfile />} /> 
                    </Routes>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Student_manager;