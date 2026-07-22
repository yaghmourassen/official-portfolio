import React, { useState, useEffect, useRef } from "react";
import "../styles/skills.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSkills } from "../services/skills";

// Import all icons you might use
import {
    FaReact,
    FaNodeJs,
    FaLaravel,
    FaJava,
    FaDocker,
    FaGitAlt,
    FaGithub,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaPython,
    FaShieldAlt,
    FaLock,
    FaCode
} from "react-icons/fa";

import {
    SiSpringboot,
    SiMongodb,
    SiMysql,
    SiFlutter,
    SiFirebase,
    SiTailwindcss,
    SiExpress
} from "react-icons/si";

const ICON_MAP = {
    FaNodeJs: <FaNodeJs />,
    FaReact: <FaReact />,
    FaJs: <FaJs />,
    FaJava: <FaJava />,
    FaPython: <FaPython />,
    FaHtml5: <FaHtml5 />,
    FaCss3Alt: <FaCss3Alt />,
    FaLaravel: <FaLaravel />,
    FaDocker: <FaDocker />,
    FaGitAlt: <FaGitAlt />,
    FaGithub: <FaGithub />,
    SiSpringboot: <SiSpringboot />,
    SiMongodb: <SiMongodb />,
    SiMysql: <SiMysql />,
    SiFlutter: <SiFlutter />,
    SiFirebase: <SiFirebase />,
    SiTailwindcss: <SiTailwindcss />,
    SiExpress: <SiExpress />,
    FaShieldAlt: <FaShieldAlt />,
    FaLock: <FaLock />
};

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

            // Group skills by categoryTitle
            const grouped = data.reduce((acc, skill) => {
                const category = skill.categoryTitle || "Other";
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push({
                    ...skill,
                    icon: ICON_MAP[skill.iconName] || <FaCode /> // Default icon fallback
                });
                return acc;
            }, {});

            // Format into expected array structure
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
                                                <div className="skill-icon">{skill.icon}</div>
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