import React, { useEffect } from "react";
import "../assets/Kontak.css";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Kontak() {
  useEffect(() => {
    AOS.init({ duration: 600 });

    // FAQ
    const items = document.querySelectorAll(".faq-item");
    items.forEach((el) => {
      el.addEventListener("click", () => {
        items.forEach((i) => {
          if (i !== el) i.classList.remove("faq-active");
        });
        el.classList.toggle("faq-active");
      });
    });

    return () => {
      items.forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  return (
    <>
      {/* Page Title */}
      <div className="page-title light-background">
        <div className="container">
          <h1>Kontak Kami</h1>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Hubungi Kami</h2>
          <p>Silakan hubungi layanan Laundry kami jika membutuhkan bantuan atau informasi lebih lanjut.</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">

            {/* Alamat */}
            <div className="col-lg-6">
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <h3>Alamat</h3>
                <p>Desan Bacin Kudus</p>
              </div>
            </div>

            {/* Telepon */}
            <div className="col-lg-3 col-md-6">
              <div className="info-item">
                <i className="bi bi-telephone"></i>
                <h3>Telepon</h3>
                <p>+62 812 3456 7891</p>
              </div>
            </div>

            {/* Email */}
            <div className="col-lg-3 col-md-6">
              <div className="info-item">
                <i className="bi bi-envelope"></i>
                <h3>Email</h3>
                <p>support@laundryclean.id</p>
              </div>
            </div>
          </div>

          {/* MAPS + FORM sejajar */}
          <div className="maps-form-row">
            {/* MAPS */}
            <div className="maps-box" data-aos="fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8342084516084!2d110.85475339999999!3d-6.790019200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db00768381cd%3A0xc0062e77344cdeef!2sAmanah%20Laundry!5e0!3m2!1sid!2sid!4v1765231954663!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* FORM */}
            <div className="form-box" data-aos="fade-up" data-aos-delay="200">
              <form className="contact-form">
                <div className="row gy-4">

                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Nama Anda" required />
                  </div>

                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email Anda" required />
                  </div>

                  <div className="col-md-12">
                    <input type="text" className="form-control" placeholder="Subjek" required />
                  </div>

                  <div className="col-md-12">
                    <textarea className="form-control" rows="6" placeholder="Pesan Anda" required></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn-kirim">Kirim Pesan</button>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Pertanyaan Seputar Laundry</h2>
          <p>Berikut beberapa pertanyaan umum dari pelanggan laundry kami.</p>
        </div>

        <div className="container">
          <div className="faq-container">

            {[
              ["Berapa lama proses laundry selesai?",
                "Rata-rata proses selesai dalam 1–2 hari, tergantung jumlah dan jenis pakaian."],

              ["Apakah tersedia layanan antar-jemput?",
                "Ya, kami menyediakan layanan pick-up & delivery tanpa biaya tambahan untuk wilayah tertentu."],

              ["Bagaimana cara memastikan pakaian tidak rusak?",
                "Kami menggunakan mesin dan deterjen khusus yang aman untuk serat pakaian. Semua pakaian dipisah berdasarkan warna dan bahan."],

              ["Apakah menerima laundry kiloan?",
                "Ya, tersedia paket laundry kiloan dengan harga ekonomis dan berkualitas."],

              ["Bisakah laundry diselesaikan dalam 1 hari?",
                "Bisa! Gunakan layanan express kami untuk penyelesaian cepat dalam 6–12 jam."],

              ["Apakah menerima laundry bed cover, karpet, dan sprei?",
                "Tentu! Kami melayani laundry besar seperti bed cover, karpet, selimut, dan sprei."],
            ].map((item, i) => (
              <div className="faq-item" key={i}>
                <h3>{item[0]}</h3>
                <div className="faq-content">
                  <p>{item[1]}</p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
