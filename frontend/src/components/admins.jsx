import React from 'react';

const AdminSidebar = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'projects', label: 'Manage Projects', icon: '💼' },
    { id: 'messages', label: 'Visitor Messages', icon: '📩' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <h3>Admin Panel</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.id} 
            className={`menu-item ${currentTab === item.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(item.id)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="logout-btn">Logout 🚪</button>
      </div>
    </div>
  );
};

export default AdminSidebar;