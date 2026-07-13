// frontend/src/pages/admin.jsx
import React, { useState, useEffect } from 'react';
import { getAllProjectsRequest, createProjectRequest, deleteProjectRequest } from '../services/projects';
// قم بتحديث هذا السطر ليستدعي الملف الصحيح والجديد مباشرة
import AdminExperience from "../components/adminexperience.jsx";
const Admin = () => {
  // تتبع التبويب الحالي: 'projects' أو 'experience'
  const [activeTab, setActiveTab] = useState('projects');

  const [projects, setProjects] = useState([]);
  
  // الحقول النصية الأساسية والجديدة للمشاريع
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Full-Stack');
  const [technologies, setTechnologies] = useState(''); 
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  
  // حقول الصورة والمعاينة
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getAllProjectsRequest();
    if (Array.isArray(data)) {
      setProjects(data);
    } else if (data && data.data) {
      setProjects(data.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('github_url', githubUrl);
    formData.append('live_url', liveUrl);

    const techArray = technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== "");
    formData.append('technologies', JSON.stringify(techArray));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await createProjectRequest(formData);

    if (res && (res.project || res.success)) {
      setMessage('✓ Project added successfully with its image!');
      setTitle('');
      setSubtitle('');
      setDescription('');
      setCategory('Full-Stack');
      setTechnologies('');
      setGithubUrl('');
      setLiveUrl('');
      setImageFile(null);
      setImagePreview(null);
      
      fetchProjects();
    } else {
      setMessage('✗ Failed to add project. Check your backend console.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const res = await deleteProjectRequest(id);
      if (res) {
        fetchProjects();
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Didou! Manage your portfolio sections here.</p>
      
      {/* ─── TAB NAVIGATION BUTTONS ─── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', marginTop: '15px' }}>
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
      </div>

      <hr />

      {/* ─── PROJECTS TAB CONTENT ─── */}
      {activeTab === 'projects' && (
        <div>
          <h3>Add New Project</h3>
          {message && <p style={{ fontWeight: 'bold', color: message.startsWith('✓') ? 'green' : 'red' }}>{message}</p>}
          
          <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Project Title *" value={title} onChange={e => setTitle(e.target.value)} required style={{ flex: 1, padding: '10px' }} />
              <input type="text" placeholder="Project Subtitle (e.g., Microservices Architecture)" value={subtitle} onChange={e => setSubtitle(e.target.value)} style={{ flex: 1, padding: '10px' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1, padding: '10px' }}>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
              </select>
              <input type="text" placeholder="Technologies (e.g., React, Node.js, SQLite)" value={technologies} onChange={e => setTechnologies(e.target.value)} style={{ flex: 1, padding: '10px' }} />
            </div>

            <textarea placeholder="Project Description *" value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: '10px', height: '100px' }} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="url" placeholder="GitHub Link (https://...)" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} style={{ flex: 1, padding: '10px' }} />
              <input type="url" placeholder="Live Demo Link (https://...)" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} style={{ flex: 1, padding: '10px' }} />
            </div>

            <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Project Screenshot Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666' }}>Image Preview:</p>
                  <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '90px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} style={{ padding: '12px', cursor: 'pointer', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>
              {loading ? 'Publishing...' : 'Add Project'}
            </button>
          </form>

          <hr />

          <h3>Current Projects</h3>
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No projects found. Add your first project above!</td>
                </tr>
              ) : (
                projects.map(project => (
                  <tr key={project.id}>
                    <td><strong>{project.title}</strong><br/><small style={{ color: '#777' }}>{project.subtitle}</small></td>
                    <td><span style={{ background: '#e0e0e0', padding: '3px 8px', borderRadius: '10px', fontSize: '12px' }}>{project.category}</span></td>
                    <td>{project.description}</td>
                    <td>
                      <button onClick={() => handleDelete(project.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

{/* ─── EXPERIENCE TAB CONTENT ─── */}
{activeTab === 'experience' && (
  <div style={{ marginTop: '10px' }}>
    <AdminExperience />
  </div>
)}

    </div>
  );
};

export default Admin;