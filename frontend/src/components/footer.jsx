import { useState } from 'react';
import "../styles/footer.css";
import ContactModal from './ContactModal';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [showModal, setShowModal] = useState(false);

    return (
        <footer className="footer">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left: Logo & Description - التمركز في الموبايل والبدء من اليسار في الشاشات الكبيرة */}
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
                        <h3 className="footer-logo">MY PORTFOLIO</h3>
                        <p className="footer-description">
                            Computer Scientist specialized in Software Engineering, Networking, and Cybersecurity.
                        </p>
                    </div>

                    {/* Right: Social Icons - التمركز في الموبايل والبدء من اليمين في الشاشات الكبيرة */}
                    <div className="col-lg-6">
                        <div className="footer-social d-flex justify-content-center justify-content-lg-end gap-3">
                            <a href="https://github.com/yaghmourassen" target="_blank" rel="noreferrer">
                                <i className="bi bi-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/yaghmourassen-maoui-648729296/" target="_blank" rel="noreferrer">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            
                            {/* زر الإيميل الموحد */}
                            <button className="email-btn" onClick={() => setShowModal(true)}>
                                <i className="bi bi-envelope-fill"></i>
                            </button>

                            <a href="https://www.facebook.com/alvaro.morata.igo/" target="_blank" rel="noreferrer">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="footer-divider" />

                <p className="copyright text-center">
                    © {currentYear} <strong>Maoui Yaghmourassen</strong>. All Rights Reserved.
                </p>
            </div>

            <ContactModal show={showModal} handleClose={() => setShowModal(false)} />
        </footer>
    );
}

export default Footer;