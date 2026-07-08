import "../styles/hero.css";

function Hero() {
    return (
        <section className="hero">

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

                            I build modern, scalable and secure web
                            applications with clean architecture and
                            high performance.
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

                        <img
                            src="/developer.png"
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