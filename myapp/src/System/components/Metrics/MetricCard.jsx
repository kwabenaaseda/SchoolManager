// components/Metrics/MetricCard.jsx
import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, subtitle, trend, icon, color = 'blue' }) => {
  const getTrendColor = (trend) => {
    if (trend.startsWith('+')) return '#10b981'; // Green for positive
    if (trend.startsWith('-')) return '#ef4444'; // Red for negative
    return '#6b7280'; // Gray for neutral
  };

  return (
    <div className={`metric-card metric-${color}`}>
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <div className="metric-trend" style={{ color: getTrendColor(trend) }}>
          {trend}
        </div>
      </div>
      
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <div className="metric-title">{title}</div>
        <div className="metric-subtitle">{subtitle}</div>
      </div>
      
      <div className="metric-background">
        <div className="metric-glow"></div>
      </div>
    </div>
  );
};

export default MetricCard;