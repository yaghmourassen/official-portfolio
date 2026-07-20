import "../styles/contact.css";

import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <span className="section-subtitle">Contact</span>
                    <h2 className="section-title">Get In Touch</h2>
                    <p>Have a project in mind or want to collaborate? Feel free to contact me.</p>
                </div>

                <div className="contact-content">
                   <div className="contact-info">
    {/* معلومات الاتصال */}
    <div className="info-item">
        <FaEnvelope /> <span>yaghmourassen.maoui@univ-constantine2.dz</span>
    </div>

    <div className="info-item">
        <FaPhone /> <span>0668 92 03 07</span>
    </div>

    {/* العنوان المضاف */}
    <div className="info-item">
        <FaMapMarkerAlt /> 
        <span>Soladj-Boudjamaa, Sigus, Oum El-Bouaghi</span>
    </div>

    {/* الأيقونات في الوسط */}
    <div className="social-links">
        <a href="https://github.com/yaghmourassen" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/yaghmourassen-maoui-648729296/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
    </div>

    {/* الخريطة في الأسفل */}
    <div className="map-container">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d6.6!3d36.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f1a!2sSigus!5e0!3m2!1sen!2sdz!4v1600000000000" 
            style={{ border: 0, width: "100%", height: "200px", borderRadius: "10px" }} 
            allowFullScreen="" 
            loading="lazy"
            title="Location"
        ></iframe>
    </div>
</div>

                    <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
                        <input type="hidden" name="access_key" value="903f15b5-6bdd-4252-8ad5-9d675905943b" />
                        <input type="text" name="name" placeholder="Full Name" required />
                        <input type="email" name="email" placeholder="Email Address" required />
                        <input type="text" name="subject" placeholder="Subject" required />
                        <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;