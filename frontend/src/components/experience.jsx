// frontend/src/components/experience.jsx
import React, { useState, useEffect } from 'react';
import "../styles/experience.css";
// استيراد دالة الجلب من السيرفيس الصحيح
import { getAllExperiences } from '../services/experience'; 

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getAllExperiences();
                // التأكد من ترتيب البيانات إذا كانت قادمة في مصفوفة مرتبة
                setExperiences(data);
            } catch (err) {
                console.error("Failed to load experiences on homepage:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

   if (loading) {
    return <div className="loading-text">Loading experiences...</div>;
}

    return (
        <section id="experience" className="experience">
            <div className="experience-container">
                <span className="section-subtitle">
                    Experience
                </span>

                <h2 className="section-title">
                    Work Experience
                </h2>

                <div className="timeline">
                    {experiences.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>No experience records found.</p>
                    ) : (
                        experiences.map((item) => (
                            <div className="timeline-item" key={item.id}>
                                <div className="timeline-dot"></div>

                                <div className="timeline-content">
                                    <span className="timeline-date">
                                        {/* نستخدم هنا حقل duration القادم من قاعدة البيانات */}
                                        {item.duration} 
                                    </span>

                                    <h3>{item.title}</h3>
                                    <h4>{item.company}</h4>
                                    <p>{item.description}</p>
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