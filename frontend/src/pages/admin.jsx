import React, { useState, useEffect } from 'react';
// استيراد طلبات المشاريع من ملف الخدمة المخصص الذي أنشأناه
import { getAllProjectsRequest, createProjectRequest, deleteProjectRequest } from '../services/projects';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [message, setMessage] = useState('');

  // 1. جلب المشاريع عند تحميل الصفحة
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getAllProjectsRequest();
    // تأكد من هيكل الرد، إذا كان الباكند يرجع مصفوفة مباشرة أو كائن يحتوي على داتا
    if (Array.isArray(data)) {
      setProjects(data);
    } else if (data && data.data) {
      setProjects(data.data);
    }
  };

  // 2. معالجة إضافة مشروع جديد
  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage('');

    const newProject = { title, description, githubLink, liveLink };
    const res = await createProjectRequest(newProject);

    if (res && (res.project || res.success)) {
      setMessage('✓ Project added successfully!');
      // تفريغ الحقول بعد النجاح
      setTitle('');
      setDescription('');
      setGithubLink('');
      setLiveLink('');
      // تحديث الجدول فوراً
      fetchProjects();
    } else {
      setMessage('✗ Failed to add project.');
    }
  };

  // 3. معالجة حذف مشروع
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const res = await deleteProjectRequest(id);
      if (res) {
        fetchProjects(); // إعادة جلب البيانات لتحديث الجدول
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Didou! Manage your portfolio projects here.</p>
      
      <hr />

      {/* نموذج إضافة مشروع جديد */}
      <h3>Add New Project</h3>
      {message && <p style={{ fontWeight: 'bold', color: 'blue' }}>{message}</p>}
      <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
        <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="GitHub Link" value={githubLink} onChange={e => setGithubLink(e.target.value)} />
        <input type="text" placeholder="Live Demo Link" value={liveLink} onChange={e => setLiveLink(e.target.value)} />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#28a745', color: '#fff', border: 'none' }}>Add Project</button>
      </form>

      <hr />

      {/* جدول عرض المشاريع الحالية */}
      <h3>Current Projects</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No projects found. Add your first project above!</td>
            </tr>
          ) : (
            projects.map(project => (
              <tr key={project.id}>
                <td><strong>{project.title}</strong></td>
                <td>{project.description}</td>
                <td>
                  <button onClick={() => handleDelete(project.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;