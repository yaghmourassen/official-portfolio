import "../styles/footer.css";
function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="container">

                <div className="row">

                    {/* Left */}

                    <div className="col-lg-6">

                        <h3 className="footer-logo">
                            MY PORTFOLIO
                        </h3>

                        <p className="footer-description">

                            Passionate Full Stack Developer building
                            modern, scalable and secure web applications.

                        </p>

                    </div>

                    {/* Right */}

                    <div className="col-lg-6">

                        <div className="footer-social">

                            <a href="#">
                                <i className="bi bi-github"></i>
                            </a>

                            <a href="#">
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a href="#">
                                <i className="bi bi-envelope-fill"></i>
                            </a>

                            <a href="#">
                                <i className="bi bi-facebook"></i>
                            </a>

                        </div>

                    </div>

                </div>

                <hr />

                <p className="copyright">

                    © {currentYear} Maoui Yaghmourassen.
                    All Rights Reserved.

                </p>

            </div>

        </footer>

    );

}

export default Footer;