import { useEffect, useState } from "react";
import LayananCard from "./LayananCard";
import "../assets/Layanan.css";

export default function Layanan({ limit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/layanan")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log("Error:", err));
  }, []);

  const filtered = limit ? data.slice(0, limit) : data;

  return (
    <div className="layanan-container">
      {filtered.map((item) => (
        <LayananCard key={item.id_layanan} item={item} />
      ))}
    </div>
  );
}
