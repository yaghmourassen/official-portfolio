import "../styles/about.css";
import profile from "../assets/images/profile.jpg";

function About() {
    return (
        <section id="about" className="about">
            <div className="about-container">

                <div className="about-image">
                   <img src={profile} alt="Profile" />
                </div>

                <div className="about-content">
                    <span className="section-subtitle">About Me</span>

                    <h2 className="section-title">
                        Computer Scientist
                    </h2>

                    <p className="about-text">
                        I am a versatile Computer Scientist with 2+ years of experience building modern web and mobile applications. I work with core languages like Java, C++, JavaScript, PHP, Python, and Dart, utilizing frameworks such as React, Express.js, Spring, and Flutter.
                    </p>

                    <p className="about-text">
                        Beyond coding, I bring a strong background in network administration, IT infrastructure, and hardware/software troubleshooting. My technical interests also span Cybersecurity, Networking, IoT, and Embedded Systems.
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