// Annoucement_manager.jsx
import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import style from './announcement_manager.module.css';

// Mock Data for existing announcements (aligned with user interests)
const mockAnnouncements = [
    { id: 1, title: 'Distributed Systems Study Group', body: 'Calling all CS students! Study group starts next week to tackle complex system design topics.', author: 'Dr. Vance (Engineering)', audience: 'Students', date: '2025-10-25' },
    { id: 2, title: 'Flu Shot Clinic Next Friday', body: 'The Health and Wellness office is hosting a free flu shot clinic for all staff and students.', author: 'Health Office', audience: 'All', date: '2025-10-23' },
    { id: 3, title: 'Parent-Teacher Interview Sign-ups', body: 'Sign-ups for the November interview session are now open. Prioritize communication.', author: 'Admin', audience: 'Parents/Staff', date: '2025-10-20' },
];

const Annoucement_manager = () => {
    // Menu state logic
    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    
    // State for the new announcement form (Simple mock state for now)
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        body: '',
        audience: 'All',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🔑 In a real system, this would trigger an API call 
        // to a **Distributed Queue** service (like Kafka or RabbitMQ) 
        // to reliably send the message to all audience groups.
        
        console.log("New Announcement Submitted:", newAnnouncement);
        alert(`Announcement "${newAnnouncement.title}" submitted for distribution to ${newAnnouncement.audience}.`);
        
        // Reset form for next message
        setNewAnnouncement({ title: '', body: '', audience: 'All' });
    };

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    <div className={style.managerContainer}>
                        <h1 className={style.pageTitle}>📣 Announcements and Communication Hub</h1>

                        {/* --- 1. Announcement Creation Card --- */}
                        <div className={style.creationCard}>
                            <h2>Create New Announcement</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={style.formGroup}>
                                    <label htmlFor="title">Title (Subject):</label>
                                    <input 
                                        type="text" 
                                        id="title"
                                        name="title"
                                        value={newAnnouncement.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={style.formGroup}>
                                    <label htmlFor="body">Message:</label>
                                    <textarea 
                                        id="body"
                                        name="body"
                                        rows="4"
                                        value={newAnnouncement.body}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                
                                <div className={style.formGroup}>
                                    <label htmlFor="audience">Target Audience:</label>
                                    <select 
                                        id="audience"
                                        name="audience"
                                        value={newAnnouncement.audience}
                                        onChange={handleInputChange}
                                    >
                                        <option value="All">All Users</option>
                                        <option value="Students">Students Only</option>
                                        <option value="Staff">Staff Only</option>
                                        <option value="Parents">Parents Only</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className={style.submitButton}>
                                    Publish Announcement 🚀
                                </button>
                            </form>
                        </div>
                        
                        {/* --- 2. Existing Announcements List --- */}
                        <div className={style.listContainer}>
                            <h2>Recent Activity Log</h2>
                            {mockAnnouncements.map(announcement => (
                                <div key={announcement.id} className={style.announcementItem}>
                                    <div className={style.announcementContent}>
                                        <h3>{announcement.title} ({announcement.audience})</h3>
                                        <p>{announcement.body}</p>
                                        <div className={style.metaData}>
                                            Posted by: {announcement.author} on {announcement.date}
                                        </div>
                                    </div>
                                    <div className={style.actionButtons}>
                                        <button className={style.editButton}>Edit</button>
                                        <button className={style.deleteButton}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Annoucement_manager;