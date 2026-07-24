import React, { useState, useEffect, useRef } from "react";
import "../styles/skills.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSkills } from "../services/skills";

/**
 * Dynamic Icon Component
 * Resolves icons asynchronously across Devicon, Simple Icons, and Iconify.
 */
const DynamicIcon = ({ name, title }) => {
    const [iconUrl, setIconUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const searchQuery = (name || title || "").toLowerCase().trim();

        if (!searchQuery) {
            setLoading(false);
            return;
        }

        const resolveIcon = async () => {
            const cleanSlug = searchQuery.replace(/[^a-z0-9]/g, "");

            // 1. Check Devicon first (Best for languages like Java, C++, Python, MySQL)
            const deviconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanSlug}/${cleanSlug}-original.svg`;
            try {
                const devRes = await fetch(deviconUrl, { method: "HEAD" });
                if (devRes.ok && isMounted) {
                    setIconUrl(deviconUrl);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                // Continue to next provider on failure
            }

            // 2. Query Iconify Search API (Covers 150k+ icons: Cisco, JWT, Firewalls, IDS, etc.)
            try {
                const searchRes = await fetch(
                    `https://api.iconify.design/search?query=${encodeURIComponent(searchQuery)}&limit=1`
                );
                const searchData = await searchRes.json();

                if (searchData.icons && searchData.icons.length > 0 && isMounted) {
                    const [prefix, iconName] = searchData.icons[0].split(":");
                    setIconUrl(`https://api.iconify.design/${prefix}/${iconName}.svg`);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Icon search failed for:", searchQuery, err);
            }

            if (isMounted) setLoading(false);
        };

        resolveIcon();

        return () => {
            isMounted = false;
        };
    }, [name, title]);

    if (loading) return <div className="icon-skeleton"></div>;

    if (!iconUrl) {
        // Fallback badge if no icon matches the input
        const fallbackChar = (title || name || "?").charAt(0).toUpperCase();
        return <div className="dynamic-badge">{fallbackChar}</div>;
    }

    return (
        <img 
            src={iconUrl} 
            alt={title || name} 
            style={{ width: "36px", height: "36px", objectFit: "contain" }} 
        />
    );
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
                                                    <DynamicIcon name={skill.iconName} title={skill.title} />
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