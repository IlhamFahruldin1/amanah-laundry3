import React from "react";
import "../assets/Footer.css"; 
import Foto7 from "../assets/Foto/7.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* dekorasi/bg */}
      <div className="footer-decor" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-col footer-col--brand">
          <div className="brand">
            <div className="brand-logo" aria-hidden>
              🧺
            </div>
            <h3 className="brand-title"> AmanahLaundry</h3>
          </div>

          <p className="brand-desc">
            Solusi laundry modern dengan layanan cepat, antar jemput gratis, dan
            harga hemat. Kami hadir untuk mahasiswa & pekerja kantoran yang ingin hidup lebih praktis tanpa repot cucian.
          </p>

          <div className="socials">
            <a href="#" aria-label="Facebook" className="social">🔵</a>
            <a href="#" aria-label="Twitter"  className="social">🐦</a>
            <a href="#" aria-label="YouTube"  className="social">▶️</a>
            <Link to="/admin/login" className="login-admin-btn">
            🔐
          </Link>
          </div>
        </div>

        {/* Middle: Quick Links */}
        <div className="footer-col">
          <h4 className="col-title">Quick Links</h4>
          <ul className="col-list">
            <li><a href="#home">Halaman Utama</a></li>
            <li><a href="#about">Layanan</a></li>
            <li><a href="#pricing">Tentang</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
        </div>

        {/* Middle: Services */}
        <div className="footer-col">
          <h4 className="col-title">Layanan Kami</h4>
          <ul className="col-list">
            <li><a href="#kiloan">Laundry Kiloan</a></li>
            <li><a href="#express">Laundry Express</a></li>
            <li><a href="#sepatu">Laundry Satuan</a></li>
            <li><a href="#setrika">Setrika Saja</a></li>
          </ul>
        </div>

        {/* Right: Contact */}
        <div className="footer-col footer-col--contact">
          <h4 className="col-title">Contact Us</h4>
          <ul className="contact-list">
            <li>📞 <a href="tel:+123456789">+123-456-789</a></li>
            <li>✉️ <a href="mailto:Laundryin.id@gmail.com">AmanahLaundry@gmail.com</a></li>
            <li>📍 Desa Bacin, Kec. Bae, Kabupaten Kudus</li>
            <li>⏰ Setiap Hari: 08.00 - 18.00</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Amanah Laundry. All rights reserved.</p>

      </div>
    </footer>
  );
}
