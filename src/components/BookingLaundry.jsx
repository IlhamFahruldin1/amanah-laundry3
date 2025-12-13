import React, { useEffect } from "react";
import "../assets/BookingLaundry.css";
// import Foto6 from "../assets/Foto/6.png"; 
import AOS from "aos";

export default function BookingAmanah() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="booking-section">
      <div className="booking-container">

        {/* LEFT */}
        <div className="booking-left" data-aos="fade-right">
          <h1>
            Cara Mudah Booking Laundry di{" "}
            <span className="highlight">Amanah Laundry</span>
          </h1>

          <p className="subtext" data-aos="fade-up">
            Hanya dengan beberapa langkah simpel, cucianmu langsung dijemput
            dan diantar kembali dalam keadaan bersih & wangi.
          </p>

          <div className="image-wrapper" data-aos="zoom-in">
            {/* <img src={Foto6} alt="Laundry Amanah" /> */}
          </div>
        </div>

        {/* RIGHT */}
        <div className="booking-right">

          <div className="step-item" data-aos="fade-left">
            <div className="step-number">1</div>
            <div>
              <h3>Pilih Layanan Laundry</h3>
              <p>Pilih berbagai layanan Laundry yang tersedia.</p>
            </div>
          </div>

          <div className="step-item" data-aos="fade-left" data-aos-delay="150">
            <div className="step-number">2</div>
            <div>
              <h3>Konfirmasi via WhatsApp</h3>
              <p>Kami otomatis menghubungi Anda untuk konfirmasi jadwal.</p>
            </div>
          </div>

          <div className="step-item" data-aos="fade-left" data-aos-delay="300">
            <div className="step-number">3</div>
            <div>
              <h3>Tim Kami Jemput Cucianmu</h3>
              <p>Driver datang sesuai jadwal tanpa biaya tambahan.</p>
            </div>
          </div>

          <div className="step-item last" data-aos="fade-left" data-aos-delay="450">
            <div className="step-number">4</div>
            <div>
              <h3>Cuci, Setrika, & Antar Kembali</h3>
              <p>Pakaian dicuci profesional lalu diantar rapi & wangi.</p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="order-wrapper" data-aos="fade-up" data-aos-delay="600">
            <button className="order-now-btn big">
              Order Now
              <span className="order-sub">Booking Online</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
