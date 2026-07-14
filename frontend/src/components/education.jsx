import React, { useEffect, useState } from "react";
import { getAllEducation } from "../services/education";
import "../styles/education.css";

function Education() {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const data = await getAllEducation();
                setEducationData(data);
            } catch (error) {
                console.error("Error fetching academic records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    if (loading) {
        return (
            <section id="education" className="education">
                <div className="education-container">
                    <span className="section-subtitle">Education</span>
                    <h2 className="section-title">Academic Background</h2>
                    <div style={{ textAlign: "center", color: "#666", marginTop: "2rem" }}>
                        Loading...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="education">
            <div className="education-container">
                <span className="section-subtitle">
                    Education
                </span>

                <h2 className="section-title">
                    Academic Background
                </h2>

                <div className="education-grid">
                    {educationData.map((item) => (
                        <div className="education-card" key={item.id}>
                            <span className="education-year">
                                {item.years}
                            </span>

                            <h3>
                                {item.degree}
                            </h3>

                            <h4>
                                {item.fieldOfStudy}
                            </h4>

                            <p>
                                {item.school}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;