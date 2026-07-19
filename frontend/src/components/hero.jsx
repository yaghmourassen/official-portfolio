import "../styles/hero.css";
import techImg from '../assets/images/tech.jpg';
import myCv from '../assets/images/cv.pdf?url';
import { TypeAnimation } from 'react-type-animation';

function Hero() {
    const downloadViaWindow = (e) => {
        e.preventDefault();
        window.location.href = myCv;
    };

    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="row align-items-center justify-content-between min-vh-100 py-5">
                    
                    {/* Left Side */}
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="hero-content">
                            <span className="hero-badge mb-3 d-inline-block">Welcome to my Portfolio</span>
                            <h1 className="hero-title mb-3">
                                Hi, I'm <span className="text-primary">Maoui Yaghmourassen</span>
                            </h1>
                            <h2 className="mb-4 text-white">Computer Scientist</h2>

                            <h3 className="hero-subtitle mb-4" style={{ color: '#38bdf8' }}>
                                <TypeAnimation
                                    sequence={['Software Engineering', 2000, 'Networking', 2000, 'Cybersecurity', 2000]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </h3>

                            <div className="hero-buttons d-flex gap-3">
                                <a href="#projects" className="btn btn-primary btn-lg px-4">View Projects</a>
                                <button onClick={downloadViaWindow} className="btn btn-outline-light btn-lg px-4">
                                    Download CV
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-lg-5 text-center">
                        <div className="image-wrapper">
                            <img src={techImg} alt="Maoui Yaghmourassen" className="hero-image img-fluid" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;