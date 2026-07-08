import "../styles/projects.css";

// import ecommerce from "../assets/images/ecommerce.jpg";
// import network from "../assets/images/network.jpg";
// import cybersecurity from "../assets/images/cybersecurity.jpg";

import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function Projects() {

    const projects = [

        {
            title: "E-Commerce Platform",

            // image: ecommerce,

            description:
                "Full Stack E-Commerce application built with Spring Boot and React featuring authentication, payments and real-time chat.",

            technologies: [
                "React",
                "Spring Boot",
                "MongoDB",
                "Docker"
            ],

            github: "#",
            demo: "#"
        },

        {
            title: "Enterprise Network",

            // image: network,

            description:
                "Enterprise network design with VLANs, routing, firewalls and cybersecurity best practices.",

            technologies: [
                "Cisco",
                "Networking",
                "Security"
            ],

            github: "#",
            demo: "#"
        },

        {
            title: "Predictive Maintenance",

            // image: cybersecurity,

            description:
                "IoT and AI project for predictive maintenance and cybersecurity monitoring.",

            technologies: [
                "Python",
                "IoT",
                "Machine Learning"
            ],

            github: "#",
            demo: "#"
        }

    ];

    return (

        <section id="projects" className="projects">

            <div className="projects-container">

                <span className="section-subtitle">
                    Portfolio
                </span>

                <h2 className="section-title">
                    My Recent Projects
                </h2>

                <div className="projects-grid">

                    {projects.map((project, index) => (

                        <div className="project-card" key={index}>

                            {/* سيتم تفعيل الصورة لاحقًا */}
                            {/*
                            <img
                                src={project.image}
                                alt={project.title}
                            />
                            */}

                            <div className="project-content">

                                <h3>{project.title}</h3>

                                <p>{project.description}</p>

                                <div className="tech-list">

                                    {project.technologies.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}

                                </div>

                                <div className="project-buttons">

                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaGithub />
                                        GitHub
                                    </a>

                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaExternalLinkAlt />
                                        Live Demo
                                    </a>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default Projects;