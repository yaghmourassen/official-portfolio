import React, { useState } from "react";
import AdminProjects from "../components/AdminProjects";
import AdminExperience from "../components/adminexperience";
import AdminEducation from "../components/admineducation";
import AdminSkills from "../components/AdminSkills";

const Admin = ({ onLogout }) => {
  // Tabs: 'projects', 'experience', 'education', ou 'skills'
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* ─── HEADER & LOGOUT ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Welcome! Manage your portfolio sections here.</p>
        </div>
        
        {onLogout && (
          <button 
            onClick={onLogout} 
            style={{ 
              backgroundColor: '#dc3545', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 18px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        )}
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* ─── TAB NAVIGATION BUTTONS ─── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('projects')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'projects' ? '#007bff' : '#e0e0e0',
            color: activeTab === 'projects' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Manage Projects
        </button>
        <button 
          onClick={() => setActiveTab('experience')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'experience' ? '#007bff' : '#e0e0e0',
            color: activeTab === 'experience' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Manage Experience
        </button>
        <button 
          onClick={() => setActiveTab('education')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'education' ? '#007bff' : '#e0e0e0',
            color: activeTab === 'education' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Manage Education
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'skills' ? '#007bff' : '#e0e0e0',
            color: activeTab === 'skills' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Manage Skills
        </button>
      </div>

      {/* ─── TAB CONTENTS ─── */}
      {activeTab === 'projects' && (
        <div style={{ marginTop: '10px' }}>
          <AdminProjects />
        </div>
      )}

      {activeTab === 'experience' && (
        <div style={{ marginTop: '10px' }}>
          <AdminExperience />
        </div>
      )}

      {activeTab === 'education' && (
        <div style={{ marginTop: '10px' }}>
          <AdminEducation />
        </div>
      )}

      {activeTab === 'skills' && (
        <div style={{ marginTop: '10px' }}>
          <AdminSkills />
        </div>
      )}

    </div>
  );
};

export default Admin;