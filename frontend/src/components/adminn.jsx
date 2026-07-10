import React from 'react';

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="navbar-title">
        <h2>Welcome Back, Admin</h2>
      </div>
      <div className="navbar-actions">
        <a href="/" target="_blank" rel="noreferrer" className="view-site-btn">
          View Website 🌐
        </a>
      </div>
    </div>
  );
};

export default AdminNavbar;