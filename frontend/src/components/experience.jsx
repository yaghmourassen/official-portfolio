// frontend/src/components/experience.jsx
import React, { useState, useEffect } from 'react';
import "../styles/experience.css";
import { getAllExperiences } from '../services/experience'; 
import { FaBriefcase, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await getAllExperiences();
                const data = response?.data || response || [];
                setExperiences(data);
            } catch (err) {
                console.error("Failed to load experiences on homepage:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    // Helper to safely render bullet points if description is a string with newlines or an array
    const renderHighlights = (item) => {
        if (Array.isArray(item.highlights) && item.highlights.length > 0) {
            return (
                <ul className="timeline-highlights">
                    {item.highlights.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            );
        }

        if (typeof item.description === 'string' && item.description.includes('\n')) {
            return (
                <ul className="timeline-highlights">
                    {item.description.split('\n').filter(Boolean).map((point, i) => (
                        <li key={i}>{point.replace(/^[-•*]\s*/, '')}</li>
                    ))}
                </ul>
            );
        }

        return <p className="timeline-description">{item.description}</p>;
    };

    // Safe helper to render tech stack tags if available
    const renderTechnologies = (technologies) => {
        let techList = [];
        if (Array.isArray(technologies)) {
            techList = technologies;
        } else if (typeof technologies === 'string' && technologies.trim()) {
            techList = technologies.split(',').map(t => t.trim());
        }

        if (techList.length === 0) return null;

        return (
            <div className="timeline-tech-stack">
                {techList.map((tech, i) => (
                    <span className="tech-badge" key={i}>{tech}</span>
                ))}
            </div>
        );
    };

    return (
        <section id="experience" className="experience">
            <div className="experience-container">
                <div className="section-header">
                    <span className="section-subtitle">Career Journey</span>
                    <h2 className="section-title">Work Experience</h2>
                </div>

                <div className="timeline">
                    {loading ? (
                        /* Skeleton Loading Cards */
                        [1, 2, 3].map((n) => (
                            <div className="timeline-item skeleton-item" key={n}>
                                <div className="timeline-dot skeleton-dot"></div>
                                <div className="timeline-content skeleton-card">
                                    <div className="skeleton-line short"></div>
                                    <div className="skeleton-line title"></div>
                                    <div className="skeleton-line medium"></div>
                                    <div className="skeleton-line long"></div>
                                </div>
                            </div>
                        ))
                    ) : experiences.length === 0 ? (
                        <div className="empty-state">
                            <FaBriefcase className="empty-icon" />
                            <p>No experience records found.</p>
                        </div>
                    ) : (
                        experiences.map((item, index) => (
                            <div className="timeline-item" key={item.id || index}>
                                <div className="timeline-dot">
                                    <FaBriefcase className="dot-icon" />
                                </div>

                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <div className="timeline-title-group">
                                            <h3 className="role-title">{item.title}</h3>
                                            <div className="company-info">
                                                <FaBuilding className="company-icon" />
                                                <span className="company-name">{item.company}</span>
                                                {item.location && <span className="location-tag">• {item.location}</span>}
                                            </div>
                                        </div>

                                        <div className="timeline-date-badge">
                                            <FaCalendarAlt className="date-icon" />
                                            <span>{item.duration}</span>
                                        </div>
                                    </div>

                                    <div className="timeline-body">
                                        {renderHighlights(item)}
                                        {renderTechnologies(item.technologies || item.techStack)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Experience;