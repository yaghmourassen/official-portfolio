import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projects';
import '../styles/Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const BACKEND_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchDynamicProjects = async () => {
            try {
                const data = await getProjects();
                let loadedProjects = [];
                if (Array.isArray(data)) {
                    loadedProjects = data;
                } else if (data && data.data) {
                    loadedProjects = data.data;
                }

                const formattedProjects = loadedProjects.map(project => {
                    // Technologies parsing/extraction
                    let techs = project.technologies;
                    if (typeof techs === 'string') {
                        try { techs = JSON.parse(techs); } catch (e) { techs = [techs]; }
                    }

                    // Multiple images parsing/extraction (or fallback to image_url)
                    let galleryImages = [];
                    if (project.images) {
                        try {
                            galleryImages = typeof project.images === 'string' ? JSON.parse(project.images) : project.images;
                        } catch (e) {
                            galleryImages = [];
                        }
                    }
                    if (!galleryImages.length && project.image_url) {
                        galleryImages = [project.image_url];
                    }

                    return {
                        ...project,
                        technologies: Array.isArray(techs) ? techs : [],
                        gallery: galleryImages
                    };
                });

                setProjects(formattedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDynamicProjects();
    }, []);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeProjectModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const categories = ['All', 'Web', 'Mobile', 'AI', 'Cybersecurity', 'Networking'];

    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

    const openProjectModal = (project) => {
        setSelectedProject(project);
        setActiveImageIndex(0);
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const getFullImgUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
    };

    // Helper function to safely display technology names regardless of data format
    const renderTechLabel = (tech) => {
        if (!tech) return '';
        if (typeof tech === 'string') return tech;
        if (typeof tech === 'object') return tech.name || tech.iconName || tech.label || JSON.stringify(tech);
        return String(tech);
    };

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                
                {/* Section Header */}
                <div className="projects-header">
                    <span className="section-badge">Portfolio</span>
                    <h2 className="section-title">Projects & Achievements</h2>
                    <p className="section-subtitle">
                        A selection of software solutions crafted with precision and impact.
                    </p>
                    
                    {/* Filter Pills */}
                    <div className="filter-wrapper">
                        {categories.map((cat) => (
                            <button
                                key={cat}
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
                    /* Asymmetric Bento Showcase Grid */
                    <div className="bento-grid">
                        {filteredProjects.map((project, index) => {
                            const isFeatured = index === 0;
                            return (
                                <article 
                                    key={project.id || project._id || index} 
                                    className={`bento-card ${isFeatured ? 'featured' : ''}`}
                                    onClick={() => openProjectModal(project)}
                                >
                                    {/* Image with Overlay & Category Tag */}
                                    <div className="bento-media">
                                        {project.image_url ? (
                                            <img 
                                                src={getFullImgUrl(project.image_url)} 
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

                                    {/* Card Content */}
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

                                        {/* Technology Chips */}
                                        <div className="tech-chips">
                                            {project.technologies?.slice(0, 4).map((tech, idx) => (
                                                <span key={idx} className="tech-chip">
                                                    {renderTechLabel(tech)}
                                                </span>
                                            ))}
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

            {/* IMMERSIVE MODAL */}
            {selectedProject && (
                <div className="modal-backdrop" onClick={closeProjectModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="modal-close-btn" onClick={closeProjectModal} aria-label="Close">
                            ✕
                        </button>

                        <div className="modal-body">
                            {/* Left Column: Image Gallery */}
                            <div className="modal-gallery">
                                <div className="main-image-frame">
                                    {selectedProject.gallery?.length > 0 ? (
                                        <img 
                                            src={getFullImgUrl(selectedProject.gallery[activeImageIndex])} 
                                            alt={`${selectedProject.title} preview`} 
                                            className="main-gallery-img"
                                        />
                                    ) : (
                                        <div className="bento-placeholder">No visual available</div>
                                    )}
                                </div>

                                {/* Thumbnail Carousel */}
                                {selectedProject.gallery?.length > 1 && (
                                    <div className="gallery-thumbnails">
                                        {selectedProject.gallery.map((img, idx) => (
                                            <button
                                                key={idx}
                                                className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                                                onClick={() => setActiveImageIndex(idx)}
                                            >
                                                <img src={getFullImgUrl(img)} alt="thumbnail" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Project Overview & Details */}
                            <div className="modal-details">
                                <div className="modal-header">
                                    <span className="category-tag-modal">{selectedProject.category}</span>
                                    <h2 className="modal-title">{selectedProject.title}</h2>
                                    {selectedProject.subtitle && (
                                        <p className="modal-subtitle">{selectedProject.subtitle}</p>
                                    )}
                                </div>

                                <div className="modal-section">
                                    <h4>About the Project</h4>
                                    <p className="modal-description">{selectedProject.description}</p>
                                </div>

                                {/* Tech Stack */}
                                <div className="modal-section">
                                    <h4>Tech Stack</h4>
                                    <div className="tech-chips modal-techs">
                                        {selectedProject.technologies?.map((tech, idx) => (
                                            <span key={idx} className="tech-chip highlight">
                                                {renderTechLabel(tech)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions & Links */}
                                <div className="modal-actions">
                                    {selectedProject.live_url && (
                                        <a 
                                            href={selectedProject.live_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn-primary"
                                        >
                                            🌐 Live Demo
                                        </a>
                                    )}
                                    {selectedProject.github_url && (
                                        <a 
                                            href={selectedProject.github_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn-secondary"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                            Source Code
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