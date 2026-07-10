import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;