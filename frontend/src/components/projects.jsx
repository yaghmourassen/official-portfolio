import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projects';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = 'http://localhost:5000'; 

    // Fetch data from the backend when the component mounts
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

                // Parse technologies from JSON if they are received as a string
                const formattedProjects = loadedProjects.map(project => ({
                    ...project,
                    technologies: typeof project.technologies === 'string' 
                        ? JSON.parse(project.technologies) 
                        : project.technologies
                }));

                setProjects(formattedProjects);
            } catch (error) {
                console.error("Error fetching projects for the Home page:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDynamicProjects();
    }, []);

    // Updated categories according to your engineering specialties
    const categories = ['All', 'Web', 'Mobile', 'AI', 'Cybersecurity', 'Networking'];

    // Filter projects based on the selected category
    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="projects">
            <div className="projects-container">
                
                {/* Header and Filtering Section */}
                <div className="projects-header">
                    <h2 className="section-title">My Projects</h2>
                    <p className="section-subtitle">Explore my work across various fields of software engineering.</p>
                    
                    {/* Dynamic Filter Buttons Wrapper */}
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
                        <p>Loading projects from database...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <p className="no-projects">No projects found in this category.</p>
                ) : (
                    /* Project Cards Grid */
         <div className="projects-grid">
    {filteredProjects.map((project) => (
        <div key={project.id} className="project-card">
            
            {/* Image and Badge Area */}
            <div className="project-image-wrapper">
                {project.image_url ? (
                    <img 
                        src={`${BACKEND_URL}${project.image_url}`} 
                        alt={project.title} 
                        className="project-img"
                    />
                ) : (
                    <div className="project-img-placeholder">
                        {project.title}
                    </div>
                )}
                <span className="project-badge">{project.category}</span>
            </div>

                                {/* Card Content */}
                                <div className="project-content">
                                    <h3 className="project-card-title">{project.title}</h3>
                                    
                                    {project.subtitle && (
                                        <p className="project-card-subtitle">{project.subtitle}</p>
                                    )}
                                    
                                    <p className="project-card-description">{project.description}</p>
                                    
                                    {/* Technologies List */}
                                    <div className="tech-list">
                                        {project.technologies?.map((tech, idx) => (
                                            <span key={idx}>{tech}</span>
                                        ))}
                                    </div>

                                    {/* Project Link Buttons */}
                                    <div className="project-buttons">
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-github">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                                Source Code
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-live">
                                                🌐 Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Projects;