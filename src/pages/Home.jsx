import "../assets/style.css";
import LayananPreview from "../components/LayananPreview";
import Testimoni from "../components/Testimoni";
import Maps from "../components/Maps";
import BookingLaundry from "../components/BookingLaundry";
import Footer from "../components/Footer";
import Foto2 from "../assets/Foto/2.png";
import Foto3 from "../assets/Foto/3.png";
import React, { useEffect } from "react";
import AOS from "aos";



export default function Home() {
  useEffect(() => {
  AOS.init({
    duration: 1200,
    once: true,
  });
}, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content" data-aos="fade-right">
          <h1>Amanah Laundry Pertama Di Desa Bacin Terpercaya</h1>
          <p>
            Kami siap menjaga kebersihan pakaian Anda dengan pelayanan cepat dan
            hasil terbaik. Menggunakan peralatan modern dan bahan ramah lingkungan.
            Amanah Laundry, bersih, rapi, dan tepat waktu setiap saat. Kami juga 
            menyediakan jasa pengambilan cucian.
          </p>
          <button
            className="cta-button"
            onClick={() => alert("AmanahLaundry")}
          >
            AmanahLaundry
          </button>
        </div>

        <div className="hero-image" data-aos="zoom-in">
          <div className="hero-image-wrapper">
            <img src={Foto2} alt="Laundry Service" className="hero-main-img" />

            <div className="hero-badge badge-top">🚚 Pengambilan</div>
            <div className="hero-badge badge-middle">⚡ Kering Cepat</div>
            <div className="hero-badge badge-left">🧺 Pencucian</div>
            <div className="hero-badge badge-bottom">🧼 Pakaian Bersih</div>
          </div>
        </div>

        <div className="features-card">
          <div className="card-inner" >
            <h2 className="features-title">Layanan Kami</h2>
            <ul className="features-grid" data-aos="zoom-in">
              <li>
                <span className="feature-badge">🧺</span>
                <span className="feature-label">Laundry</span>
              </li>
              <li>
                <span className="feature-badge">🧵</span>
                <span className="feature-label">Kering</span>
              </li>
              <li>
                <span className="feature-badge">📦</span>
                <span className="feature-label">Cuci & Lipat</span>
              </li>
              <li>
                <span className="feature-badge">🚚</span>
                <span className="feature-label">Antar Jemput Gratis</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Laundry Section */}
      <section className="laundry-section" id="services">
        <div className="laundry-inner">
          <div className="visual" data-aos="fade-right">
            <div className="img-wrap">
              <img src={Foto3} alt="Petugas menyetrika pakaian" />
            </div>
          </div>

          <div className="content" data-aos="fade-left">
            <h1 className="title">Mengapa Memilih Amanah Laundry?</h1>
            <p className="title-teks">
              Amanah Laundry hadir sebagai solusi praktis untuk menjaga kebersihan pakaian Anda.
              Kami mengutamakan pelayanan cepat, hasil cucian wangi & rapi, serta harga yang tetap
              bersahabat.
            </p>

            <ul className="features">
              <li>
                <span className="feature-icon">⏱️</span>
                <span>Cepat & Tepat Waktu – pakaian Anda selalu siap sesuai jadwal.</span>
              </li>
              <li>
                <span className="feature-icon">🧺</span>
                <span>Bersih & Wangi – dicuci dengan detergen berkualitas dan mesin modern.</span>
              </li>
              <li>
                <span className="feature-icon">🤝</span>
                <span>Pelayanan Ramah – kami layani dengan senyum dan profesionalisme.</span>
              </li>
              <li>
                <span className="feature-icon">💸</span>
                <span>Harga Terjangkau – layanan premium tanpa bikin dompet tipis.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <LayananPreview />
      <Testimoni />
      <Maps />
      <BookingLaundry />
      <Footer />
      
    </>
  );
}
