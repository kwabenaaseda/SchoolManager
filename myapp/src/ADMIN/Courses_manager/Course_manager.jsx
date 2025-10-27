/* eslint-disable react-refresh/only-export-components */
// Course_manager.jsx
import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'; // NEW IMPORTS
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import style from './course_manager.module.css';

// Mock Data for Courses
const mockCourses = [
    { id: 'DS-501', name: 'Distributed Systems Architecture', dept: 'Engineering', code: 'CS-501', students: 45, status: 'Active' },
    { id: 'PS-305', name: 'Cognitive Psychology Fundamentals', dept: 'Psychology', code: 'PS-305', students: 82, status: 'Active' },
    { id: 'CS-401', name: 'Advanced Data Structures & Algos', dept: 'Engineering', code: 'CS-401', students: 60, status: 'Active' },
    { id: 'HW-200', name: 'Health & Wellness Management', dept: 'Health', code: 'HW-200', students: 120, status: 'Active' },
    { id: 'EC-101', name: 'Intro to Microeconomics', dept: 'Finance', code: 'EC-101', students: 95, status: 'Active' },
];

// --- Sub-Component for the List View ---
const CourseListView = ({ courses }) => {
    const navigate = useNavigate(); // For future navigation to a course profile

    const handleViewDetails = (courseId) => {
        // Future Linking Action: navigate(`/courses/${courseId}`); 
        alert(`You would now navigate to the detailed profile for course: ${courseId}`);
    };
    
    // Helper function to apply the correct department CSS class
    const getDeptClass = (dept) => {
        switch (dept) {
            case 'Engineering': return style.tagEngineering;
            case 'Psychology': return style.tagPsychology;
            case 'Health': return style.tagHealth;
            default: return '';
        }
    };

    return (
        <div className={style.managerContainer}>
            <div className={style.managerHeader}>
                <h1 className={style.pageTitle}>Course Management (Catalog View)</h1>
                <button className={style.addButton}>+ Create New Course</button>
            </div>
            
            <table className={style.courseTable}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>Enrollment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.code}</td>
                            <td>{course.name}</td>
                            <td>
                                <span className={`${style.tag} ${getDeptClass(course.dept)}`}>
                                    {course.dept}
                                </span>
                            </td>
                            <td>{course.students}</td>
                            <td>{course.status}</td>
                            <td>
                                {/* Action to view details/edit course */}
                                <button 
                                    className={style.actionButton}
                                    onClick={() => handleViewDetails(course.id)}
                                >
                                    View Details
                                </button>
                                <button 
                                    className={`${style.actionButton} ${style.deleteButton}`}
                                    // Normally this would open a modal for confirmation
                                    onClick={() => alert(`Confirm deletion of ${course.code}`)}
                                >
                                    Delete
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

const Courses_manager = () => {
    // Menu state logic
    const [isMenuOpen, setIsMenuOpen] = React.useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    {/* Nested Routes Setup */}
                    <Routes>
                        {/* Route 1: List View (path is /courses) */}
                        <Route index element={<CourseListView courses={mockCourses} />} /> 
                        
                        {/* Route 2: Detailed Course Profile (path is /courses/:courseId) - To be built later */}
                        <Route path=":courseId" element={<h1>Course Profile Detail View!</h1>} /> 
                    </Routes>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Courses_manager;