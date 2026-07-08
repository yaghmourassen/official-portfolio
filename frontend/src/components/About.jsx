import "../styles/about.css";
import profile from "../assets/images/profile.jpg";

function About() {
    return (
        <section id="about" className="about">
            <div className="about-container">

                <div className="about-image">
                   / <img src={profile} alt="Profile" />
                </div>

                <div className="about-content">
                    <span className="section-subtitle">About Me</span>

                    <h2 className="section-title">
                        Software Engineer & Full Stack Developer
                    </h2>

                    <p className="about-text">
                        I'm a passionate Software Engineer specialized in building
                        modern, scalable and secure web applications.
                        I enjoy creating responsive user interfaces, developing
                        powerful backend systems and designing efficient databases.
                    </p>

                    <p className="about-text">
                        My interests also include Cybersecurity, Networking,
                        IoT and Embedded Systems. I continuously improve my
                        skills by learning new technologies and working on
                        real-world projects.
                    </p>

                    <div className="about-info">

                        <div className="info-card">
                            <h3>2+</h3>
                            <p>Years Experience</p>
                        </div>

                        <div className="info-card">
                            <h3>10+</h3>
                            <p>Projects</p>
                        </div>

                        <div className="info-card">
                            <h3>15+</h3>
                            <p>Technologies</p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default About;