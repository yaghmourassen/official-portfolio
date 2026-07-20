import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import "../styles/floating-socials.css";

function FloatingSocials() {
    const phoneNumber = "213668920307"; // الرقم بصيغة دولية (بدون +)

    return (
        <div className="floating-socials">
            <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="social-icon whatsapp">
                <FaWhatsapp />
            </a>
            <a href={`https://t.me/${phoneNumber}`} target="_blank" rel="noreferrer" className="social-icon telegram">
                <FaTelegram />
            </a>
        </div>
    );
}

export default FloatingSocials;