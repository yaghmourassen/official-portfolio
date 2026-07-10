import React, { useState, useEffect } from 'react';
// استيراد دالة جلب المشاريع من الخدمة
import { getProjects } from '../services/projects';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // جلب البيانات من الباكند فور تحميل المكون
    useEffect(() => {
        const fetchDynamicProjects = async () => {
            try {
                const data = await getProjects();
                // التأكد من هيكلة البيانات القادمة وحفظها في الـ State
                if (Array.isArray(data)) {
                    setProjects(data);
                } else if (data && data.data) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error("Error fetching projects for Home page:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDynamicProjects();
    }, []);

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">My Projects</h2>
            
            {loading ? (
                <p className="loading-text">Loading projects from database...</p>
            ) : projects.length === 0 ? (
                <p className="no-projects">No projects found. Add some from the admin dashboard!</p>
            ) : (
                /* كروت المشاريع */
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                
                                <div className="project-links">
                                    {project.githubLink && (
                                        <a 
                                            href={project.githubLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="project-link github-link"
                                        >
                                            📦 GitHub
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a 
                                            href={project.liveLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="project-link live-link"
                                        >
                                            🌐 Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;