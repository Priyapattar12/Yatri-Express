import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark">🚌</span>
          <span>
            Yatra<span className="logo-accent">Express</span>
          </span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <a href="#offers">Offers</a>
          <a href="#faq">Help</a>
        </nav>

        <div className="navbar-actions">
          <button className="btn-secondary navbar-app-btn">
            Get the App
          </button>
          <button className="btn-primary">Login / Sign Up</button>
        </div>
      </div>
    </header>
  );
}
