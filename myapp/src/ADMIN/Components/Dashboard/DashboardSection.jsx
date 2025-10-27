// DashboardSection.jsx
import React from 'react';

import style from '../../DashBoard/dashboard.module.css';

// This is a wrapper for all major panels (charts, announcements, etc.)
const DashboardSection = ({ title, children }) => {
  return (
    <div className={style.dashboardSection}>
      <h2 className={style.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
};

export default DashboardSection;