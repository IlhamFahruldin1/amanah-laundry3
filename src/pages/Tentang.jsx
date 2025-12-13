import React from "react";
import "../assets/tentang.css";
import Footer from "../components/Footer";
import Foto9 from "../assets/Foto/9.png"; 
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTruck, FaTshirt, FaRegSmile } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">

      {/* SECTION TITLE */}
      <div className="about-hero">
        <h1>Tentang Amanah Laundry</h1>
        <p className="about-breadcrumb">Beranda • Tentang</p>
      </div>

      {/* SECTION INTRO */}
      <section className="about-intro">
        <div className="intro-left">

          <span className="intro-subtitle">Tentang Kami</span>
          <h2>Melayani Laundry Harian dengan Profesional & Terpercaya</h2>
          <p className="intro-desc">
            Amanah Laundry telah berdiri lebih dari 5 tahun dan berkomitmen memberikan layanan laundry
            terbaik kepada masyarakat dengan hasil yang bersih, wangi, dan terawat. Kami selalu mengutamakan
            kualitas, kecepatan, dan keramahan dalam setiap layanan.
          </p>

          <ul className="intro-features">
            <li><FaCheckCircle /> Pakaian Bersih & Wangi</li>
            <li><FaCheckCircle /> Tenaga Ahli Berpengalaman</li>
            <li><FaCheckCircle /> Mesin Modern</li>
            <li><FaCheckCircle /> Express 3 Jam</li>
          </ul>

          {/* CONTACT BOX */}
          <div className="contact-box">
            <div>
              <h4>Kontak Kami</h4>
              <p>Siap membantu setiap hari mulai 08.00 - 20.00</p>
            </div>
            <a href="tel:+628123456789" className="contact-button">
              <FaPhoneAlt /> +62 812 3456 7891
            </a>
          </div>

        </div>

        {/* IMAGE */}
        <div className="about-image-container">
          <img src= {Foto9} alt="Tentang-Kami"/>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="visi-misi">
        <div className="visi">
          <h3>Visi Kami</h3>
          <p>
            Menjadi layanan laundry paling dipercaya dan modern yang memberikan kualitas terbaik untuk
            setiap pelanggan.
          </p>
        </div>

        <div className="misi">
          <h3>Misi Kami</h3>
          <ul>
            <li>Menyediakan layanan laundry cepat, bersih, dan aman.</li>
            <li>Menggunakan peralatan modern berstandar tinggi.</li>
            <li>Memberikan pelayanan ramah dan solutif.</li>
            <li>Mengutamakan kepuasan pelanggan.</li>
          </ul>
        </div>
      </section>

      {/* LAYANAN KAMI */}
      <section className="services">
        <h2>Layanan Kami</h2>

        <div className="service-grid">

          <div className="service-card">
            <FaTshirt className="service-icon" />
            <h4>Laundry Harian</h4>
            <p>Pencucian pakaian harian cepat dan bersih dengan parfum premium.</p>
          </div>

          <div className="service-card">
            <FaClock className="service-icon" />
            <h4>Express 3 Jam</h4>
            <p>Layanan cepat untuk kebutuhan mendesak dengan kualitas terjaga.</p>
          </div>

          <div className="service-card">
            <FaTruck className="service-icon" />
            <h4>Antar Jemput Gratis</h4>
            <p>Layanan free pickup & delivery untuk area tertentu.</p>
          </div>

          <div className="service-card">
            <FaRegSmile className="service-icon" />
            <h4>Cuci Premium</h4>
            <p>Perawatan khusus untuk bahan sensitif agar tetap awet.</p>
          </div>

        </div>
      </section>

      {/* STATISTIK */}
      <section className="stats">
        <div className="stat-box">
          <h3>200+</h3>
          <p>Pelanggan</p>
        </div>
        <div className="stat-box">
          <h3>150+</h3>
          <p>Pesanan / bulan</p>
        </div>
        <div className="stat-box">
          <h3>500+</h3>
          <p>Kg pakaian dicuci</p>
        </div>
        <div className="stat-box">
          <h3>95%</h3>
          <p>Kepuasan pelanggan</p>
        </div>
      </section>
      <Footer />

    </div>
    
  );
}
