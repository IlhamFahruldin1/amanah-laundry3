import { useEffect, useState } from "react";
import LayananCard from "./LayananCard";
import "../assets/Layanan.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Layanan({ limit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/layanan`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data layanan");
        return res.json();
      })
      .then((result) => setData(result))
      .catch((err) => console.error("Error:", err));
  }, []);

  const filtered = limit ? data.slice(0, limit) : data;

  return (
    <div className="layanan-container">
      {filtered.length > 0 ? (
        filtered.map((item) => (
          <LayananCard key={item.id_layanan} item={item} />
        ))
      ) : (
        <p>Tidak ada layanan.</p>
      )}
    </div>
  );
}
