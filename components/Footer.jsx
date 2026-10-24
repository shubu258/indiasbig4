import Brand from "./Brand";
import { services } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-cta">
        <h2>
          Ready to get your <span className="hl">finances in order?</span>
        </h2>
        <a href="mailto:hello@example.com" className="btn btn-primary magnetic" data-cursor="Talk">
          Get a Free Consultation <span className="arrow">→</span>
        </a>
      </div>
      <div className="container footer-grid">
        <div>
          <Brand light />
          <p>Compliance, clarity and growth, delivered by qualified Chartered Accountants.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#team">Our Team</a>
          <a href="#faqs">FAQs</a>
        </div>
        <div>
          <h4>Services</h4>
          {services.slice(0, 5).map((s) => (
            <a href="#services" key={s.title}>{s.title}</a>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <a href="mailto:hello@example.com">hello@example.com</a>
          <p>New Delhi, India</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} S&amp;S Chartered Accountants. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
