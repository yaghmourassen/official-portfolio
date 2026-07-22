import React, { useState, useEffect, useRef } from "react";
import "../styles/skills.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSkills } from "../services/skills";

function Skills() {
    const [skillCategories, setSkillCategories] = useState([]);
    const rowRefs = useRef([]);

    useEffect(() => {
        fetchAndGroupSkills();
    }, []);

    const fetchAndGroupSkills = async () => {
        try {
            const response = await getSkills();
            const data = response.data || response;

            // Group skills dynamically by categoryTitle
            const grouped = data.reduce((acc, skill) => {
                const category = skill.categoryTitle || "Other";
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(skill);
                return acc;
            }, {});

            const categoriesArray = Object.keys(grouped).map((categoryTitle) => ({
                categoryTitle,
                skills: grouped[categoryTitle]
            }));

            setSkillCategories(categoriesArray);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }
    };

    const scrollRow = (index, direction) => {
        const row = rowRefs.current[index];
        if (row) {
            const scrollAmount = 300;
            row.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="skills" className="skills">
            <div className="skills-container">
                <span className="section-subtitle">My Skills</span>
                <h2 className="section-title">Technologies I Work With</h2>

                <div className="skills-categories-wrapper">
                    {skillCategories.map((group, groupIdx) => (
                        <div className="skill-category-group" key={groupIdx}>
                            <h3 className="category-title">{group.categoryTitle}</h3>

                            <div className="marquee-container">
                                <button 
                                    className="scroll-btn left" 
                                    onClick={() => scrollRow(groupIdx, "left")}
                                    aria-label="Scroll left"
                                >
                                    <FaChevronLeft />
                                </button>

                                <div className="marquee-wrapper">
                                    <div 
                                        className="skills-row" 
                                        ref={(el) => (rowRefs.current[groupIdx] = el)}
                                    >
                                        {group.skills.map((skill, index) => (
                                            <div className="skill-card" key={skill.id || index}>
                                                <div className="skill-icon">
                                                    {/* Fully dynamic CDN icon loader */}
                                                    <img 
                                                        src={`https://cdn.simpleicons.org/${skill.iconName}`} 
                                                        alt={skill.title} 
                                                        style={{ width: "36px", height: "36px" }}
                                                        onError={(e) => {
                                                            // Fallback if icon slug isn't found
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <h3>{skill.title}</h3>
                                                <p>{skill.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    className="scroll-btn right" 
                                    onClick={() => scrollRow(groupIdx, "right")}
                                    aria-label="Scroll right"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;