// StaffProfile.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// We can reuse the staff_manager styles for the wrapper, or create new ones
import style from './staff_manager.module.css'; 

const StaffProfile = () => {
    // 🔑 Use useParams to dynamically get the ID from the URL
    const { staffId } = useParams(); 
    const navigate = useNavigate();

    const handleBack = () => {
        // Go back to the main list view
        navigate('/staff');
    };

    return (
        <div className={style.managerContainer} style={{ padding: '20px', backgroundColor: 'var(--card-bg-color)', borderRadius: '8px' }}>
            <div className={style.managerHeader}>
                <h1 className={style.pageTitle}>Staff Profile: {staffId}</h1>
                <div className={style.quickActions}>
                    <button onClick={handleBack} className={style.manageButton} style={{ backgroundColor: '#4a5568' }}>
                        ⬅️ Back to Staff List
                    </button>
                    <button className={style.manageButton}>Edit Credentials ⚙️</button>
                    <button className={style.manageButton} style={{ backgroundColor: '#e53e3e' }}>Terminate Access ❌</button>
                </div>
            </div>
            
            <p>This is the detailed profile view for Staff ID **{staffId}**.</p>
            <p>This view, managed by your **Distributed Systems** (backend), would fetch specific data based on the URL parameter **{staffId}** for the following sections:</p>
            
            <ul style={{marginTop: '15px', paddingLeft: '20px'}}>
                <li>**Payroll and Compensation** (Highly secured by **Engineering** principles).</li>
                <li>**Leave Requests & Time Off** (Important for **Health** and workload management).</li>
                <li>**Permissions and Access Control** (Crucial for **Systems Architecture**).</li>
                <li>**Professional Development & Reviews**.</li>
            </ul>

        </div>
    );
};

export default StaffProfile;