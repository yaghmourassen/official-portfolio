import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllProjectsRequest, createProjectRequest, deleteProjectRequest } from '../services/projects';

// ==========================================
// 1. MAPPING STATIQUE
// ==========================================
const STATIC_ICONS = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  reactjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  expressjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  js: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  ts: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  tailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  vuejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  springboot: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
};

const cleanIconKey = (name) => {
  if (!name) return '';
  let str = (typeof name === 'object' ? name.name || name.iconName || '' : name).toString().toLowerCase().trim();
  
  if (str === 'node.js' || str === 'node') return 'nodejs';
  if (str === 'react.js') return 'react';
  if (str === 'express.js') return 'express';
  if (str === 'vue.js') return 'vuejs';
  if (str === 'next.js') return 'nextjs';

  return str.replace(/[^a-z0-9]/g, '');
};

// ==========================================
// 2. COMPOSANT ICONE HYBRIDE
// ==========================================
const HybridIcon = ({ name, size = '14px' }) => {
  const cleanKey = cleanIconKey(name);

  const staticUrl = STATIC_ICONS[cleanKey];
  const dynamicDeviconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanKey}/${cleanKey}-original.svg`;
  const dynamicSimpleIconUrl = `https://cdn.simpleicons.org/${cleanKey}`;

  const [src, setSrc] = useState(staticUrl || dynamicDeviconUrl);
  const [errorStage, setErrorStage] = useState(0);

  useEffect(() => {
    const key = cleanIconKey(name);
    const isStatic = STATIC_ICONS[key];
    setSrc(isStatic || `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key}/${key}-original.svg`);
    setErrorStage(0);
  }, [name]);

  if (!cleanKey) return null;

  if (errorStage >= 2) {
    return (
      <span style={{
        width: size,
        height: size,
        borderRadius: '3px',
        backgroundColor: '#6b7280',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '9px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flexShrink: 0
      }}>
        {cleanKey.substring(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={typeof name === 'string' ? name : 'tech'}
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      onError={() => {
        if (errorStage === 0) {
          setSrc(dynamicSimpleIconUrl);
          setErrorStage(1);
        } else {
          setErrorStage(2);
        }
      }}
    />
  );
};

const parseTechnologies = (techString) => {
  if (!techString) return [];
  if (Array.isArray(techString)) return techString;
  return techString
    .split(/[\s,]+/)
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0);
};

// ==========================================
// 3. COMPOSANT PRINCIPAL ADMIN PROJECTS
// ==========================================
const AdminProjects = () => {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web');
  const [technologies, setTechnologies] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  // 1. Cover Image File
  const [coverFile, setCoverFile] = useState(null);
  
  // 2. Extra Screenshot Files
  const [extraFiles, setExtraFiles] = useState([]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjectsRequest();
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data && data.data) {
        setProjects(data.data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération :", err);
    }
  };

  // Fonction de téléversement vers Cloudinary
  const uploadToCloudinary = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", "my_portfolio_preset"); 

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dlrwrp487/image/upload", 
      formData
    );
    return res.data.secure_url;
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      let coverUrl = '';
      let extraUrls = [];

      // 1. Upload Cover Image vers Cloudinary
      if (coverFile) {
        coverUrl = await uploadToCloudinary(coverFile);
      }

      // 2. Upload Multiple Extra Screenshots vers Cloudinary
      if (extraFiles.length > 0) {
        extraUrls = await Promise.all(
          extraFiles.map(file => uploadToCloudinary(file))
        );
      }

      const techNames = parseTechnologies(technologies);
      const techObjects = techNames.map(name => ({
        name,
        iconName: cleanIconKey(name)
      }));

      const projectData = {
        title,
        subtitle,
        description,
        category,
        github_url: githubUrl,
        live_url: liveUrl,
        image: coverUrl,        // Image de couverture principale
        images: extraUrls,      // Tableau des URLs des images secondaires
        technologies: techObjects
      };

      const res = await createProjectRequest(projectData);

      if (res && (res.project || res.success || res.id || res._id)) {
        setMessage('✓ Projet ajouté avec succès !');
        setTitle('');
        setSubtitle('');
        setDescription('');
        setCategory('Web');
        setTechnologies('');
        setGithubUrl('');
        setLiveUrl('');
        setCoverFile(null);
        setExtraFiles([]);
        fetchProjects();
      } else {
        setMessage('✗ Échec de l\'ajout. Vérifie la console serveur.');
      }
    } catch (error) {
      console.error(error);
      setMessage('✗ Erreur lors de la sauvegarde du projet.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      const res = await deleteProjectRequest(id);
      if (res) {
        fetchProjects();
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h3>Add New Project</h3>
      {message && <p style={{ fontWeight: 'bold', color: message.startsWith('✓') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Project Title *" value={title} onChange={e => setTitle(e.target.value)} required style={{ flex: 1, padding: '10px' }} />
          <input type="text" placeholder="Project Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} style={{ flex: 1, padding: '10px' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1, padding: '10px' }}>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="AI">AI</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Networking">Networking</option>
          </select>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <input
              type="text"
              placeholder="Technologies (ex: react node.js express mongodb tailwind)"
              value={technologies}
              onChange={e => setTechnologies(e.target.value)}
              style={{ padding: '10px', width: '100%' }}
            />
            
            {/* APERÇU EN DIRECT DES BADGES ET ICÔNES */}
            {technologies && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '5px' }}>
                {parseTechnologies(technologies).map((tech, idx) => (
                  <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f0ff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                    <HybridIcon name={tech} size="16px" />
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <textarea placeholder="Project Description *" value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: '10px', height: '100px' }} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="url" placeholder="GitHub Link (https://...)" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} style={{ flex: 1, padding: '10px' }} />
          <input type="url" placeholder="Live Demo Link (https://...)" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} style={{ flex: 1, padding: '10px' }} />
        </div>

        {/* SECTION GESTION DES IMAGES CLOUDINARY */}
        <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* 1. Cover Image */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Project Cover Image (Primary):
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setCoverFile(e.target.files[0])} 
              style={{ padding: '5px', width: '100%' }} 
            />
            {coverFile && <small style={{ color: 'green' }}>Selected Cover: {coverFile.name}</small>}
          </div>

          {/* 2. Extra Screenshots (Multiple) */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Additional Screenshots / Gallery Images (Multiple):
            </label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={(e) => setExtraFiles(Array.from(e.target.files))} 
              style={{ padding: '5px', width: '100%' }} 
            />
            {extraFiles.length > 0 && (
              <small style={{ color: 'blue' }}>
                {extraFiles.length} additional image(s) selected
              </small>
            )}
          </div>

        </div>

        <button type="submit" disabled={loading} style={{ padding: '12px', cursor: 'pointer', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px' }}>
          {loading ? 'Processing & Uploading Images...' : 'Add Project'}
        </button>
      </form>

      <hr />

      <h3>Current Projects</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Title</th>
            <th>Category</th>
            <th>Technologies / Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No projects found.</td>
            </tr>
          ) : (
            projects.map(project => {
              const projId = project.id || project._id;
              
              let techList = [];
              if (Array.isArray(project.technologies)) {
                techList = project.technologies;
              } else if (typeof project.technologies === 'string') {
                try {
                  techList = JSON.parse(project.technologies);
                } catch (e) {
                  techList = parseTechnologies(project.technologies);
                }
              }

              return (
                <tr key={projId}>
                  <td><strong>{project.title}</strong><br /><small style={{ color: '#777' }}>{project.subtitle}</small></td>
                  <td><span style={{ background: '#e0e0e0', padding: '3px 8px', borderRadius: '10px', fontSize: '12px' }}>{project.category}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {techList.map((tech, i) => {
                        const techName = typeof tech === 'object' && tech !== null 
                          ? (tech.name || tech.iconName || '') 
                          : String(tech);

                        return (
                          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0f0f0', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>
                            <HybridIcon name={techName} size="14px" />
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(projId)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjects;