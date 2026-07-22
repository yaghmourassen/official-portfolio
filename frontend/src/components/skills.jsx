import React, { useRef } from "react";
import "../styles/skills.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    FaPython
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

function Skills() {
    const skillCategories = [
        {
            categoryTitle: "Programming Languages",
            skills: [
                { icon: <FaJava />, title: "Java", description: "Object-oriented programming and backend systems." },
                { icon: <FaPython />, title: "Python", description: "Automation, scripting and AI projects." },
                { icon: <FaJs />, title: "JavaScript", description: "Dynamic web development." },
                { icon: <FaHtml5 />, title: "HTML5", description: "Semantic web structure." },
                { icon: <FaCss3Alt />, title: "CSS3", description: "Responsive and modern designs." }
            ]
        },
        {
            categoryTitle: "Frameworks",
            skills: [
                { icon: <SiSpringboot />, title: "Spring Boot", description: "Enterprise Java backend development." },
                { icon: <FaLaravel />, title: "Laravel", description: "Powerful PHP web applications." },
                { icon: <SiFlutter />, title: "Flutter", description: "Cross-platform mobile application development." },
                { icon: <SiExpress />, title: "Express.js", description: "Developing RESTful APIs and backend services." }
            ]
        },
        {
            categoryTitle: "Libraries",
            skills: [
                { icon: <FaReact />, title: "React", description: "Building modern and interactive user interfaces." },
                { icon: <SiTailwindcss />, title: "Tailwind CSS", description: "Utility-first CSS framework." }
            ]
        },
        {
            categoryTitle: "DevOps",
            skills: [
                { icon: <FaDocker />, title: "Docker", description: "Containerization and deployment." },
                { icon: <FaGitAlt />, title: "Git", description: "Version control and collaboration." },
                { icon: <FaGithub />, title: "GitHub", description: "Code hosting and project management." },
                { icon: <FaNodeJs />, title: "Node.js", description: "Server-side JavaScript environment." }
            ]
        },
        {
            categoryTitle: "Networking",
            skills: [
                { icon: <SiMysql />, title: "MySQL", description: "Relational database management." },
                { icon: <SiMongodb />, title: "MongoDB", description: "NoSQL database solutions." },
                { icon: <SiFirebase />, title: "Firebase", description: "Authentication and cloud services." }
            ]
        },
        {
            categoryTitle: "Securities",
            skills: [
                { icon: <FaGithub />, title: "Auth & Sec", description: "Secure access control and version tokens." },
                { icon: <FaDocker />, title: "Container Security", description: "Isolated environments and safe deployment." }
            ]
        }
    ];

    const rowRefs = useRef([]);

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
                                            <div className="skill-card" key={index}>
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