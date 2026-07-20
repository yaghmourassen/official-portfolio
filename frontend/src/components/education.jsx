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
                // ترتيب البيانات من الأحدث للأقدم
                setEducationData(data.sort((a, b) => b.id - a.id));
            } catch (error) {
                console.error("Error fetching academic records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <section id="education" className="education">
            <div className="education-container">
                <span className="section-subtitle">Education</span>
                <h2 className="section-title">Academic Background</h2>

                <div className="timeline">
                    {educationData.map((item) => (
                        <div className="timeline-item" key={item.id}>
                            <div className="timeline-dot"></div>
                            <div className="education-card">
                                <span className="education-year">{item.years}</span>
                                <h3>{item.degree}</h3>
                                <h4>{item.fieldOfStudy}</h4>
                                <p>{item.school}</p>
                                
                                {item.certificateUrl && (
                                    <div className="cert-preview-wrapper" onClick={() => setSelectedImage(item.certificateUrl)}>
                                        <img src={item.certificateUrl} alt="Certificate" className="cert-thumbnail" />
                                        <div className="overlay">View Full Certificate</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="cert-modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Certificate" />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Education;