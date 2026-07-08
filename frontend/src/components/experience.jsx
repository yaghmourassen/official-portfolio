import "../styles/experience.css";

function Experience() {

    const experiences = [
        {
            period: "2025",
            title: "Software Engineer",
            company: "Freelance",
            description:
                "Developed modern web applications using React, Spring Boot, Express.js and Laravel. Built REST APIs and responsive user interfaces."
        },

        {
            period: "2025",
            title: "Interpreter",
            company: "National Service",
            description:
                "Worked as an Interpreter during the national service while improving communication and teamwork skills."
        },

        {
            period: "2023",
            title: "Internship",
            company: "BADR Bank",
            description:
                "Completed an internship focused on administration and communication while gaining professional experience."
        }
    ];

    return (

        <section
            id="experience"
            className="experience"
        >

            <div className="experience-container">

                <span className="section-subtitle">
                    Experience
                </span>

                <h2 className="section-title">
                    Work Experience
                </h2>

                <div className="timeline">

                    {experiences.map((item, index) => (

                        <div
                            className="timeline-item"
                            key={index}
                        >

                            <div className="timeline-dot"></div>

                            <div className="timeline-content">

                                <span className="timeline-date">
                                    {item.period}
                                </span>

                                <h3>{item.title}</h3>

                                <h4>{item.company}</h4>

                                <p>{item.description}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default Experience;