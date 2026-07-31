import React, { useState, useEffect, useCallback } from 'react';
import { getProjects } from '../services/projects';
import '../styles/projects.css';

// Tech Icons Mapping
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

const CATEGORY_ICONS = {
  All: '⚡',
  Web: '🌐',
  Mobile: '📱',
  AI: '🤖',
  Cybersecurity: '🛡️',
  Networking: '📡'
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

const safeParseArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val];
    } catch (e) {
      return [val];
    }
  }
  return [];
};

// Tech Icon Component (Icon-Only Mode)
const HybridIcon = ({ name, size = '18px' }) => {
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
      <span className="icon-fallback" style={{ width: size, height: size }}>
        {cleanKey.substring(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={typeof name === 'string' ? name : 'tech'}
      title={typeof name === 'string' ? name : cleanKey}
      style={{ width: size, height: size, objectFit: 'contain' }}
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

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchDynamicProjects = async () => {
      try {
        const data = await getProjects();
        let loadedProjects = [];
        if (Array.isArray(data)) loadedProjects = data;
        else if (data?.data && Array.isArray(data.data)) loadedProjects = data.data;

        const formattedProjects = loadedProjects.map((project) => {
          const rawTechs = safeParseArray(project.technologies);
          let coverImage = '';
          if (typeof project.image === 'string' && project.image.trim() !== '') coverImage = project.image.trim();
          else if (project.image?.secure_url) coverImage = project.image.secure_url;
          else if (typeof project.image_url === 'string') coverImage = project.image_url;

          const rawExtraImages = safeParseArray(project.images);
          let fullGallery = [];
          if (coverImage) fullGallery.push(coverImage);
          rawExtraImages.forEach((imgItem) => {
            const urlStr = typeof imgItem === 'string' ? imgItem : imgItem?.secure_url || imgItem?.url;
            if (urlStr && typeof urlStr === 'string' && !fullGallery.includes(urlStr)) fullGallery.push(urlStr);
          });

          return {
            ...project,
            coverImage: coverImage || (fullGallery.length > 0 ? fullGallery[0] : ''),
            technologies: rawTechs,
            gallery: fullGallery
          };
        });

        if (isMounted) setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDynamicProjects();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const categories = ['All', 'Web', 'Mobile', 'AI', 'Cybersecurity', 'Networking'];
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  const renderTechLabel = useCallback((tech) => {
    if (!tech) return '';
    if (typeof tech === 'string') return tech;
    if (typeof tech === 'object') return tech.name || tech.iconName || tech.label || '';
    return String(tech);
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        
        {/* Header */}
        <div className="projects-header">
          <span className="projects-badge">Portfolio</span>
          <h2 className="section-title">Projects & Achievements</h2>
          <p className="section-subtitle">
            Engineered digital experiences, scalable systems, and technical innovations.
          </p>
          
          {/* Category Filters with Logos */}
          <div className="filter-wrapper" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
              >
                <span className="cat-icon">{CATEGORY_ICONS[cat] || '📁'}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="projects-loading">
            <div className="spinner"></div>
            <p>Loading showcase...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="no-projects-box">
            <p className="no-projects">No projects listed in this category yet.</p>
          </div>
        ) : (
          /* Modern Feature Grid */
          <div className="modern-projects-grid">
            {filteredProjects.map((project, index) => {
              const isFeatured = index === 0;
              const mainImgSrc = project.coverImage;
              const categoryIcon = CATEGORY_ICONS[project.category] || '📁';

              return (
                <article 
                  key={project.id || project._id || index} 
                  className={`modern-card ${isFeatured ? 'featured' : ''}`}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveImageIndex(0);
                  }}
                >
                  <div className="card-media">
                    {mainImgSrc ? (
                      <img src={mainImgSrc} alt={project.title} className="card-img" loading="lazy" />
                    ) : (
                      <div className="card-placeholder">
                        <span>{project.title}</span>
                      </div>
                    )}
                    <div className="card-overlay">
                      <span className="view-case-btn">Case Study ↗</span>
                    </div>
                    
                    {/* Category Tag with Icon */}
                    <span className="category-tag-pill">
                      <span className="cat-mini-icon">{categoryIcon}</span>
                      <span>{project.category}</span>
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="card-text">
                      <h3 className="card-title">{project.title}</h3>
                      {project.subtitle && <p className="card-subtitle">{project.subtitle}</p>}
                      <p className="card-description">
                        {project.description?.length > 100 
                          ? `${project.description.substring(0, 100)}...` 
                          : project.description}
                      </p>
                    </div>

                    {/* Icon-Only Tech Stack */}
                    <div className="icon-tech-stack">
                      {project.technologies?.slice(0, 6).map((tech, idx) => {
                        const label = renderTechLabel(tech);
                        return (
                          <div key={idx} className="tech-icon-only-wrapper" title={label}>
                            <HybridIcon name={label} size="18px" />
                          </div>
                        );
                      })}
                      {project.technologies?.length > 6 && (
                        <span className="tech-more-badge">+{project.technologies.length - 6}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
{/* EXPANDED & HARMONIZED CASE STUDY MODAL */}
{selectedProject && (
  <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
    <div className="modal-container-expanded" onClick={(e) => e.stopPropagation()}>
      
      {/* Pinned Close Button */}
      <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close">
        ✕
      </button>

      <div className="modal-grid">
        {/* Left Column: Image Showcase */}
        <div className="modal-gallery-zone">
          <div className="modal-hero-frame">
            {selectedProject.gallery?.length > 0 ? (
              <img 
                src={selectedProject.gallery[activeImageIndex]} 
                alt={`${selectedProject.title} preview`} 
                className="modal-hero-img"
              />
            ) : (
              <div className="card-placeholder">No Preview Available</div>
            )}
          </div>

          {selectedProject.gallery?.length > 1 && (
            <div className="modal-thumbnails-strip">
              {selectedProject.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`modal-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Text Details */}
        <div className="modal-info-zone">
          <div className="modal-meta-header">
            <span className="category-tag-pill">
              <span>{CATEGORY_ICONS[selectedProject.category] || '📁'}</span>
              <span>{selectedProject.category}</span>
            </span>
            <h2 className="modal-main-title">{selectedProject.title}</h2>
            {selectedProject.subtitle && <p className="modal-sub-title">{selectedProject.subtitle}</p>}
          </div>

          <div className="modal-text-block">
            <h4 className="modal-section-heading">Overview</h4>
            <p className="modal-description-text">{selectedProject.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="modal-text-block">
            <h4 className="modal-section-heading">Technologies Built With</h4>
            <div className="modal-tech-grid">
              {selectedProject.technologies?.map((tech, idx) => {
                const label = renderTechLabel(tech);
                return (
                  <div key={idx} className="modal-tech-badge">
                    <HybridIcon name={label} size="16px" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions-row">
            {selectedProject.github_url && (
              <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="modal-btn modal-btn-secondary">
                <span>Source Code</span> ↗
              </a>
            )}
            {selectedProject.live_url && (
              <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" className="modal-btn modal-btn-primary">
                <span>Live Demo</span> 🚀
              </a>
            )}
          </div>

        </div>
      </div>

    </div>
  </div>
)}
    </section>
  );
}

export default Projects;