import '../style/Footer.css';
import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setMessage('กรุณากรอกอีเมลให้ถูกต้อง');
            return;
        }

        setLoading(true);
        try {
            // ตัวอย่างการเชื่อมต่อ API
            // const response = await fetch('/api/subscribe', {
            //     method: 'POST',
            //     body: JSON.stringify({ email }),
            //     headers: { 'Content-Type': 'application/json' }
            // });
            
            // if (response.ok) {
            setMessage('ขอบคุณสำหรับการสมัครรับข่าวสาร!');
            setEmail('');
            // }
        } catch (error) {
            console.error(error);
            setMessage('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="footer">
    <div className="footer-content">
        <div className="footer-section about">
            <h3>About Us</h3>
            <p>We are professional web developers committed to creating high-quality web solutions</p>
            <div className="socials">
                <a href="#"><i className="fab fa-facebook" title="Facebook"></i></a>
                <a href="#"><i className="fab fa-tiktok" title="TikTok"></i></a>
                <a href="#"><i className="fab fa-instagram" title="Instagram"></i></a>
                <a href="#"><i className="fab fa-whatsapp" title="WhatsApp"></i></a>
                <a href="#"><i className="fab fa-github" title="GitHub"></i></a>
            </div>
        </div>

        <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
                <li><Link smooth to="/#">Home</Link></li>
                <li><Link smooth to="/#about">About Us</Link></li>
                <li><Link smooth to="/#services">Services</Link></li>
                <li><Link smooth to="/#portfolio">Projects</Link></li>
                <li><Link smooth to="/contact">Contact</Link></li>
                <li><Link smooth to="/dashboard">Dashboard</Link></li>
                <li><Link smooth to="/teams">Teams</Link></li>
            </ul>
        </div>

        <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>
                <span><i className="fas fa-phone"></i> &nbsp; +8562077832019</span>
                <span><i className="fas fa-envelope"></i> &nbsp; vongxay689@gmail.com</span>
                <span><i className="fas fa-map-marker-alt"></i> &nbsp; Vientiane, Laos</span>
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required 
                />
                <button 
                    type="submit" 
                    className="btn-subscribe"
                    disabled={loading}
                >
                    {loading ? 'กำลังดำเนินการ...' : 'Subscribe'}
                </button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    </div>

            <div className="footer-bottom">
                <p>
                    &copy; 2024 - All rights reserved by <span>mr. vongxay</span> | Designed with love ❤️
        </p>
    </div>
</footer>
    )
}
export default Footer;