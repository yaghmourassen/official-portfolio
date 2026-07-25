import React, { useState, useEffect, useCallback } from 'react';
import { getProjects } from '../services/projects';
import '../styles/Projects.css';

// ==========================================
// 1. MAPPING STATIQUE & HELPER CLEANING
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

// Helper safety parser for JSON/Arrays from database
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

// ==========================================
// 3. COMPOSANT PRINCIPAL PROJECTS
// ==========================================
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
        
        if (Array.isArray(data)) {
          loadedProjects = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          loadedProjects = data.data;
        }

        const formattedProjects = loadedProjects.map((project) => {
          // 1. Safe parsing for technologies
          const rawTechs = safeParseArray(project.technologies);

          // 2. Direct extraction of cover image (matching AdminProjects payload: 'image')
          let coverImage = '';
          if (typeof project.image === 'string' && project.image.trim() !== '') {
            coverImage = project.image.trim();
          } else if (project.image && project.image.secure_url) {
            coverImage = project.image.secure_url;
          } else if (typeof project.image_url === 'string') {
            coverImage = project.image_url;
          }

          // 3. Extraction of additional gallery screenshots ('images')
          const rawExtraImages = safeParseArray(project.images);
          
          let fullGallery = [];
          if (coverImage) {
            fullGallery.push(coverImage);
          }

          rawExtraImages.forEach((imgItem) => {
            const urlStr = typeof imgItem === 'string' ? imgItem : imgItem?.secure_url || imgItem?.url;
            if (urlStr && typeof urlStr === 'string' && !fullGallery.includes(urlStr)) {
              fullGallery.push(urlStr);
            }
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

  // Modal body scroll lock and keyboard ESC support
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeProjectModal();
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

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

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
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">Projects & Achievements</h2>
          <p className="section-subtitle">
            A selection of software solutions crafted with precision and impact.
          </p>
          
          {/* Category Filters */}
          <div className="filter-wrapper" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="projects-loading">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="no-projects-box">
            <p className="no-projects">No projects found in this category at the moment.</p>
          </div>
        ) : (
          /* Bento Grid */
          <div className="bento-grid">
            {filteredProjects.map((project, index) => {
              const isFeatured = index === 0;
              // Reads directly the Cloudinary string URL
              const mainImgSrc = project.coverImage;

              return (
                <article 
                  key={project.id || project._id || index} 
                  className={`bento-card ${isFeatured ? 'featured' : ''}`}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="bento-media">
                    {mainImgSrc ? (
                      <img 
                        src={mainImgSrc} 
                        alt={project.title} 
                        className="bento-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bento-placeholder">
                        <span>{project.title}</span>
                      </div>
                    )}
                    <div className="bento-overlay">
                      <span className="action-hint">Explore Case Study →</span>
                    </div>
                    <span className="category-tag">{project.category}</span>
                  </div>

                  <div className="bento-content">
                    <div className="bento-header-info">
                      <h3 className="bento-title">{project.title}</h3>
                      {project.subtitle && (
                        <p className="bento-subtitle">{project.subtitle}</p>
                      )}
                    </div>

                    <p className="bento-description">
                      {project.description?.length > 110 
                        ? `${project.description.substring(0, 110)}...` 
                        : project.description}
                    </p>

                    <div className="tech-chips">
                      {project.technologies?.slice(0, 4).map((tech, idx) => {
                        const label = renderTechLabel(tech);
                        return (
                          <span key={idx} className="tech-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <HybridIcon name={label} size="14px" />
                            {label}
                          </span>
                        );
                      })}
                      {project.technologies?.length > 4 && (
                        <span className="tech-chip more">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL SECTION */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={closeProjectModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close-btn" onClick={closeProjectModal} aria-label="Close">
              ✕
            </button>

            <div className="modal-body">
              <div className="modal-gallery">
                <div className="main-image-frame">
                  {selectedProject.gallery?.length > 0 ? (
                    <img 
                      src={selectedProject.gallery[activeImageIndex]} 
                      alt={`${selectedProject.title} preview`} 
                      className="main-gallery-img"
                    />
                  ) : (
                    <div className="bento-placeholder">No visual available</div>
                  )}
                </div>

                {selectedProject.gallery?.length > 1 && (
                  <div className="gallery-thumbnails">
                    {selectedProject.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-details">
                <span className="category-tag">{selectedProject.category}</span>
                <h2>{selectedProject.title}</h2>
                {selectedProject.subtitle && <p className="modal-subtitle">{selectedProject.subtitle}</p>}

                <div className="modal-description">
                  <h4>About Project</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-tech-stack">
                  <h4>Technologies Used</h4>
                  <div className="tech-chips">
                    {selectedProject.technologies?.map((tech, idx) => {
                      const label = renderTechLabel(tech);
                      return (
                        <span key={idx} className="tech-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <HybridIcon name={label} size="16px" />
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="modal-actions">
                  {selectedProject.github_url && (
                    <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-github">
                      View Code
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-live">
                      Live Preview ↗
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