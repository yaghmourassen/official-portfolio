import "../styles/hero.css";
// 1. You correctly imported it here:
import techImg from '../assets/images/tech.jpeg';

function Hero() {
    return (
        <section className="hero" id="hero">

            <div className="container">

                <div className="row align-items-center min-vh-100">

                    {/* Left Side */}
                    <div className="col-lg-6">
                        <span className="hero-badge">
                            👋 Welcome to my Portfolio
                        </span>

                        <h1 className="hero-title">
                            Hi, I'm
                            <span> Maoui Yaghmourassen</span>
                        </h1>

                        <h3 className="hero-subtitle">
                            Full Stack Developer
                        </h3>

                        <p className="hero-text">
                            Passionate Full Stack Developer specialized in
                            Java, Spring Boot, React, Node.js, Express.js,
                            Laravel and Database Design.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn btn-primary btn-lg">
                                View Projects
                            </button>
                            <button className="btn btn-outline-light btn-lg">
                                Download CV
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-lg-6 text-center">
                        {/* 2. FIXED: Changed the string path to use the imported variable */}
                        <img
                            src={techImg}
                            alt="Developer"
                            className="hero-image"
                        />
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;