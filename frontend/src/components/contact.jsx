import "../styles/contact.css";

import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedin
} from "react-icons/fa";

function Contact() {

    return (

        <section id="contact" className="contact">

            <div className="contact-container">

                <div className="contact-header">

                    <span className="section-subtitle">
                        Contact
                    </span>

                    <h2 className="section-title">
                        Get In Touch
                    </h2>

                    <p>
                        Have a project in mind or want to collaborate?
                        Feel free to contact me.
                    </p>

                </div>

                <div className="contact-content">

                    {/* Contact Information */}

                    <div className="contact-info">

                        <div className="info-item">
                            <FaEnvelope />
                            <span>your@email.com</span>
                        </div>

                        <div className="info-item">
                            <FaPhone />
                            <span>+213 XXX XX XX XX</span>
                        </div>

                        <div className="info-item">
                            <FaMapMarkerAlt />
                            <span>Algeria</span>
                        </div>

                        <div className="social-links">

                            <a href="#">
                                <FaGithub />
                            </a>

                            <a href="#">
                                <FaLinkedin />
                            </a>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <form className="contact-form">

                        <input
                            type="text"
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                        />

                        <textarea
                            rows="6"
                            placeholder="Your Message"
                        ></textarea>

                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

            </div>

        </section>

    );

}

export default Contact;