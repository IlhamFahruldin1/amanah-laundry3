import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/style.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="logo">🧺 AmanahLaundry</div>

      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/layanan" onClick={() => setMenuOpen(false)}>Layanan</Link></li>
        <li><Link to="/tentang" onClick={() => setMenuOpen(false)}>Tentang</Link></li>
        <li><Link to="/kontak" onClick={() => setMenuOpen(false)}>Kontak</Link></li>
      </ul>

      <div className="nav_btn">
        <button className="btn">
          <a href="https://api.whatsapp.com/send?phone=6281803217494">Whatsapp</a>
        </button>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
