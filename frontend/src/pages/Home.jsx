import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/skills";
import Projects from "../components/Projects";
import Experience from "../components/experience";
import Education from "../components/education";
import Contact from "../components/contact";
import Footer from "../components/footer";
import FloatingSocials from "../components/FloatingSocials";

// Styles
import "../styles/navbar.css";
import "../styles/hero.css";
import "../styles/about.css";
import "../styles/skills.css";
import "../styles/projects.css";
import "../styles/experience.css";
import "../styles/education.css";
import "../styles/contact.css";
import "../styles/footer.css";
import "../styles/home.css";
import "../styles/floating-socials.css"; // تأكد من استيراد ملف تنسيق الأيقونات العائمة

function Home() {
    return (
        <div className="home-container">
            {/* Navigation */}
            <Navbar />

            {/* Hero */}
            <Hero />

            {/* Main Content */}
            <main className="main-content">
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Social Icons */}
            <FloatingSocials />
        </div>
    );
}

export default Home;