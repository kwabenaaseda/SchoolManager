// DashboardContent.jsx
import React from 'react';
import style from '../../DashBoard/dashboard.module.css';
import SummaryCard from './SummaryCard';
import DashboardSection from './DashboardSection';

// Placeholder Data
const summaryData = [
    { title: "Total Students", value: "2,560", icon: "🧑‍🎓", trend: "↑ 12% Since Last Month", isNegative: false },
    { title: "Active Staff", value: "125", icon: "👩‍🏫", trend: "↑ 2% Since Last Month", isNegative: false },
    { title: "Monthly Revenue", value: "$45,210", icon: "💰", trend: "↓ 5% Since Last Month", isNegative: true },
    { title: "Open Tickets", value: "34", icon: "🆘", trend: "New: 8 today", isNegative: false },
];

const announcementData = [
    { title: "Term 2 Fee Deadline Approaching", date: "Oct 27, 2025" },
    { title: "Staff Development Workshop on Nov 5", date: "Oct 25, 2025" },
    { title: "New Enrollment Period Details", date: "Oct 20, 2025" },
    { title: "System Maintenance Scheduled", date: "Oct 18, 2025" },
];

const DashboardContent = () => {
  return (
    <div>
      {/* 1. Summary Cards Grid */}
      <div className={style.dashboardGrid}>
        {summaryData.map((data, index) => (
          <SummaryCard 
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
            trend={data.trend}
            isNegative={data.isNegative}
          />
        ))}
      </div>

      {/* 2. Main Layout (Charts/Tables and Announcements Sidebar) */}
      <div className={style.mainLayout}>
        {/* Left Column (2/3 width) - Charts/Reports Area */}
        <div className={style.leftColumn}>
            <DashboardSection title="Enrollment Status (Placeholder)">
                <p>This space is perfectly styled for a rich **data visualization** element. You would install a library like **Recharts** or **Chart.js** here to display live metrics!</p>
                <div style={{ height: '300px', backgroundColor: '#2d3748', borderRadius: '5px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0' }}>
                    <p>Financial Data Visualization Placeholder</p>
                </div>
            </DashboardSection>
            
            <DashboardSection title="Recent Activity Log (Placeholder)" style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>
                    - 10:45 AM: Staff Profile updated by Admin User.<br/>
                    - 09:30 AM: New Fee payment recorded for Student ID 1045.<br/>
                    - 08:00 AM: System backup completed successfully.
                </p>
            </DashboardSection>
        </div>

        {/* Right Column (1/3 width) - Announcements Area */}
        <div className={style.rightColumn}>
          <DashboardSection title="Latest Announcements">
            {announcementData.map((announcement, index) => (
              <div key={index} className={style.announcementItem}>
                <div className={style.announcementTitle}>{announcement.title}</div>
                <div className={style.announcementDate}>{announcement.date}</div>
              </div>
            ))}
            <button style={{ 
                marginTop: '20px', 
                padding: '10px 15px', 
                backgroundColor: 'var(--primary-color)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold'
            }}>
                View All Announcements
            </button>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;