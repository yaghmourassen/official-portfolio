import "../styles/education.css";

function Education() {

    const education = [
        {
            year: "2021 - 2023",
            degree: "Master's Degree",
            field: "Communication & Public Relations",
            school: "Djilali Bounaama University"
        },
        {
            year: "2018 - 2021",
            degree: "Bachelor's Degree",
            field: "Computer Science & Communication",
            school: "Djilali Bounaama University"
        },
        {
            year: "2017",
            degree: "Baccalaureate",
            field: "Literature & Philosophy",
            school: "Abi Dhar El Ghifari High School"
        }
    ];

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

                    {education.map((item, index) => (

                        <div className="education-card" key={index}>

                            <span className="education-year">
                                {item.year}
                            </span>

                            <h3>
                                {item.degree}
                            </h3>

                            <h4>
                                {item.field}
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