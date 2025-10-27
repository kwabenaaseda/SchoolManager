// StudentProfile.jsx
import React, { useState } from 'react';
import style from './student_profile.module.css';
import DashboardSection from '../Dashboard/DashboardSection'; // Reusing the section wrapper!
import { useParams, useNavigate } from 'react-router-dom';
// Mock Student Data


// Tabs for the main content area
const tabs = ['Academic Overview', 'Health & Wellness', 'Financial Status', 'Behavior Log'];

const StudentProfile = () => {
    const { studentId } = useParams(); 
    const navigate = useNavigate();
    // State to manage which tab is currently selected
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const studentData = {
        id: studentId, // Use the ID from the URL
        name: `Dynamic Student: ${studentId}`, // Show the ID in the name
        // ... (rest of the studentData structure remains the same)
        grade: "Grade 10",
        class: "10A",
        email: `dynamic.${studentId.toLowerCase()}@edusolutions.com`,
        phone: "+1 (555) XXX-XXXX",
        status: "Active",
        guardian: {
            name: "Guardian",
            relationship: "Parent",
            contact: "+1 (555) 987-6543",
        },
        academic: {
            gpa: 3.85,
            attendance: "98%",
            courses: [
                { name: "Distributed Systems Fundamentals", grade: "A+" },
                { name: "Psychology & Social Behavior", grade: "A" },
            ]
        },
    };
    const handleBack = () => {
        // Button to go back to the list view
        navigate('/admin/students'); 
    };
    // Helper function to render content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Academic Overview':
                return (
                    <div className={style.tabContentGrid}>
                        <DashboardSection title="Performance Metrics">
                            <div className={style.metrics}>
                                <div className={style.metricItem}>
                                    <span className={style.metricLabel}>Current GPA:</span>
                                    <span className={style.metricValue}>{studentData.academic.gpa}</span>
                                </div>
                                <div className={style.metricItem}>
                                    <span className={style.metricLabel}>Attendance Rate:</span>
                                    <span className={style.metricValue} style={{color: 'var(--secondary-color)'}}>{studentData.academic.attendance}</span>
                                </div>
                            </div>
                        </DashboardSection>
                        <DashboardSection title="Current Courses">
                            <ul className={style.courseList}>
                                {studentData.academic.courses.map((course, index) => (
                                    <li key={index} className={style.courseItem}>
                                        <span>{course.name}</span>
                                        <span className={style.courseGrade}>{course.grade}</span>
                                    </li>
                                ))}
                            </ul>
                        </DashboardSection>
                    </div>
                );
            case 'Health & Wellness':
                return <p className={style.placeholder}>Health records and emergency contacts would be managed here.</p>;
            case 'Financial Status':
                return <p className={style.placeholder}>View outstanding fees and payment history.</p>;
            case 'Behavior Log':
                return <p className={style.placeholder}>Review and document behavioral incidents and positive notes.</p>;
            default:
                return <p>Select a tab to view details.</p>;
        }
    };

    return (
        <div className={style.profileContainer}>
            
            {/* 1. Header Area (Name and Quick Actions) */}
            <div className={style.profileHeader}>
                <h1>Student Profile: {studentData.name}</h1>
                <div className={style.quickActions}>
                    <button onClick={handleBack} className={style.headerButton} style={{backgroundColor: '#4a5568'}}>
                        ⬅️ Back to List
                    </button>
                    <button className={style.headerButton}>Edit Profile ✏️</button>
                    <button className={style.headerButton} style={{backgroundColor: '#e53e3e'}}>Contact Guardian 📞</button>
                </div>
            </div>

            {/* 2. Main Layout: Two Columns (Left Card, Right Tabs) */}
            <div className={style.mainProfileLayout}>
                
                {/* Left Column: Student Bio Card */}
                <div className={style.leftColumn}>
                    <div className={`${style.bioCard} ${style.card}`}>
                        <div className={style.profilePic} />
                        <h2 className={style.profileName}>{studentData.name}</h2>
                        <p className={style.profileId}>ID: {studentData.id}</p>
                        <hr className={style.divider}/>
                        
                        <div className={style.contactInfo}>
                            <p>📧 {studentData.email}</p>
                            <p>📞 {studentData.phone}</p>
                            <p>📍 {studentData.grade} | Class {studentData.class}</p>
                        </div>

                        <DashboardSection title="Guardian Contact" className={style.guardianSection}>
                            <p className={style.guardianName}>{studentData.guardian.name}</p>
                            <p className={style.guardianRelation}>{studentData.guardian.relationship}</p>
                            <p className={style.guardianContact}>Call: {studentData.guardian.contact}</p>
                        </DashboardSection>
                    </div>
                </div>

                {/* Right Column: Tabbed Content Area */}
                <div className={style.rightColumn}>
                    <div className={style.tabBar}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`${style.tabButton} ${activeTab === tab ? style.activeTab : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    <div className={style.tabContent}>
                        {renderTabContent()}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentProfile;