import "../styles/skills.css";

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

    const skills = [
        {
            icon: <FaReact />,
            title: "React",
            description: "Building modern and interactive user interfaces."
        },
        {
            icon: <SiExpress />,
            title: "Express.js",
            description: "Developing RESTful APIs and backend services."
        },
        {
            icon: <FaNodeJs />,
            title: "Node.js",
            description: "Server-side JavaScript development."
        },
        {
            icon: <SiSpringboot />,
            title: "Spring Boot",
            description: "Enterprise Java backend development."
        },
        {
            icon: <FaLaravel />,
            title: "Laravel",
            description: "Powerful PHP web applications."
        },
        {
            icon: <FaJava />,
            title: "Java",
            description: "Object-oriented programming and backend systems."
        },
        {
            icon: <FaPython />,
            title: "Python",
            description: "Automation, scripting and AI projects."
        },
        {
            icon: <SiFlutter />,
            title: "Flutter",
            description: "Cross-platform mobile application development."
        },
        {
            icon: <SiFirebase />,
            title: "Firebase",
            description: "Authentication, Firestore and cloud services."
        },
        {
            icon: <SiMysql />,
            title: "MySQL",
            description: "Relational database management."
        },
        {
            icon: <SiMongodb />,
            title: "MongoDB",
            description: "NoSQL database solutions."
        },
        {
            icon: <FaDocker />,
            title: "Docker",
            description: "Containerization and deployment."
        },
        {
            icon: <FaGitAlt />,
            title: "Git",
            description: "Version control and collaboration."
        },
        {
            icon: <FaGithub />,
            title: "GitHub",
            description: "Code hosting and project management."
        },
        {
            icon: <FaHtml5 />,
            title: "HTML5",
            description: "Semantic web structure."
        },
        {
            icon: <FaCss3Alt />,
            title: "CSS3",
            description: "Responsive and modern designs."
        },
        {
            icon: <FaJs />,
            title: "JavaScript",
            description: "Dynamic web development."
        },
        {
            icon: <SiTailwindcss />,
            title: "Tailwind CSS",
            description: "Utility-first CSS framework."
        }
    ];

    return (
        <section id="skills" className="skills">

            <div className="skills-container">

                <span className="section-subtitle">
                    My Skills
                </span>

                <h2 className="section-title">
                    Technologies I Work With
                </h2>

                <div className="skills-grid">

                    {skills.map((skill, index) => (

                        <div className="skill-card" key={index}>

                            <div className="skill-icon">
                                {skill.icon}
                            </div>

                            <h3>{skill.title}</h3>

                            <p>{skill.description}</p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Skills;