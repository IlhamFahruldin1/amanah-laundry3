import { useEffect, useState } from "react";
import LayananCard from "../components/LayananCard";
import "../assets/Layanan.css";
import Footer from "../components/Footer";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3001/layanan")
      .then((res) => res.json())
      .then((data) => setLayanan(data));

    fetch("http://localhost:3001/kategori")
      .then((res) => res.json())
      .then((data) => setKategori(data));
  }, []);

  const filtered = selectedKategori === "all"
    ? layanan
    : layanan.filter((item) => item.id_kategori == selectedKategori);

  return (
    <div className="layanan-page">
      <h1>Layanan Amanah Laundry</h1>

      {/* FILTER KATEGORI */}
      <div className="kategori-filter">
        <button
          className={selectedKategori === "all" ? "active" : ""}
          onClick={() => setSelectedKategori("all")}
        >
          All Services
        </button>

        {kategori.map((kat) => (
          <button
            key={kat.id_kategori}
            className={selectedKategori == kat.id_kategori ? "active" : ""}
            onClick={() => setSelectedKategori(kat.id_kategori)}
          >
            {kat.nama}
          </button>
        ))}
      </div>

      {/* LIST LAYANAN */}
      <div className="layanan-list">
        {filtered.length > 0 ? (
          filtered.map((item) => <LayananCard key={item.id_layanan} item={item} />)
        ) : (
          <p style={{ marginTop: "20px" }}>Tidak ada layanan pada kategori ini.</p>
        )}

        
      </div>
      <Footer />
    </div>
    
  );
}
