import React, { useEffect, useState } from "react";
import { getAllEducation } from "../services/education";
import "../styles/education.css";

function Education() {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await getAllEducation();
                setEducationData(data.sort((a, b) => b.id - a.id));
            } catch (error) {
                console.error("Error fetching academic records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    // إغلاق الـ Modal عند الضغط على زر Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <section id="education" className="education">
            <div className="education-container">
                <div className="section-header">
                    <span className="section-subtitle">Education</span>
                    <h2 className="section-title">Academic Background</h2>
                </div>

                <div className="timeline">
                    {educationData.map((item) => (
                        <div className="timeline-item" key={item.id}>
                            <div className="timeline-dot"></div>
                            <div className="education-card">
                                <div className="card-header">
                                    <span className="education-year">{item.years}</span>
                                    <h3 className="degree-title">{item.degree}</h3>
                                </div>
                                <h4 className="field-study">{item.fieldOfStudy}</h4>
                                <p className="school-name">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "6px", verticalAlign: "middle"}}>
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                    </svg>
                                    {item.school}
                                </p>
                                
                                {item.certificateUrl && (
                                    <div className="cert-preview-wrapper" onClick={() => setSelectedImage(item.certificateUrl)}>
                                        <img src={item.certificateUrl} alt="Certificate" className="cert-thumbnail" />
                                        <div className="overlay">
                                            <span>🔍 View Full Certificate</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal لعرض الصورة بحجمها الكامل */}
            {selectedImage && (
                <div className="cert-modal" onClick={() => setSelectedImage(null)}>
                    <button className="modal-close-btn" onClick={() => setSelectedImage(null)}>&times;</button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Full Certificate" />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Education;