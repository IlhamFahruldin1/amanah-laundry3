import { useEffect, useState } from "react";
import LayananCard from "../components/LayananCard";
import "../assets/Layanan.css";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("all");

  useEffect(() => {
    fetch(`${API_URL}/layanan`)
      .then((res) => res.json())
      .then((data) => setLayanan(data))
      .catch((err) => console.error("Gagal load layanan:", err));

    fetch(`${API_URL}/kategori`)
      .then((res) => res.json())
      .then((data) => setKategori(data))
      .catch((err) => console.error("Gagal load kategori:", err));
  }, []);

  const filtered =
    selectedKategori === "all"
      ? layanan
      : layanan.filter(
          (item) => item.id_kategori == selectedKategori
        );

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
            className={
              selectedKategori == kat.id_kategori ? "active" : ""
            }
            onClick={() => setSelectedKategori(kat.id_kategori)}
          >
            {kat.nama}
          </button>
        ))}
      </div>

      {/* LIST LAYANAN */}
      <div className="layanan-list">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <LayananCard
              key={item.id_layanan}
              item={item}
            />
          ))
        ) : (
          <p style={{ marginTop: "20px" }}>
            Tidak ada layanan pada kategori ini.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
