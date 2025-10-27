// SummaryCard.jsx
import React from 'react';

import style from '../../DashBoard/dashboard.module.css';

const SummaryCard = ({ title, value, icon, trend, isNegative }) => {
  // Use the CSS module to correctly apply the negative trend color
  const trendClass = isNegative ? style.negative : '';
  
  return (
    <div className={style.summaryCard}>
      <div className={style.cardHeader}>
        <span className={style.cardTitle}>{title}</span>
        <span className={style.cardIcon}>{icon}</span>
      </div>
      <div className={style.cardValue}>{value}</div>
      <div className={`${style.cardTrend} ${trendClass}`}>
        {trend}
      </div>
    </div>
  );
};

export default SummaryCard;