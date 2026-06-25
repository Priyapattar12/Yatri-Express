import { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-logo">
            Yatra<span className="logo-accent">Express</span>
          </h3>
          <p className="footer-tagline">
            Reliable intercity bus booking across India, with real-time
            availability and instant confirmation.
          </p>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>support@yatraexpress.app</li>
            <li>+91 98XXX XXXXX</li>
            <li>Bengaluru, Karnataka, India</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Help Center</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h4>Stay Updated</h4>
          <p className="footer-tagline">
            Subscribe for fare drops and route announcements.
          </p>
          {subscribed ? (
            <p className="footer-subscribed">Subscribed! 🎉</p>
          ) : (
            <form className="footer-subscribe" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YatraExpress. All rights reserved.</p>
      </div>
    </footer>
  );
}
