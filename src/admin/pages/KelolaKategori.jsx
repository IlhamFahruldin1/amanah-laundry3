// src/admin/pages/KelolaKategori.jsx
import { useEffect, useState } from "react";
import "../admin-kategori.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function KelolaKategori() {
  const [kategori, setKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  async function loadKategori() {
    try {
      setError("");
      const res = await fetch(`${API_URL}/kategori`);
      if (!res.ok) throw new Error("Gagal memuat kategori");
      const data = await res.json();
      setKategori(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat kategori");
    }
  }

  async function tambahKategori() {
    if (!nama.trim()) {
      setError("Nama kategori harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/kategori`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ nama }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Gagal tambah kategori");

      setNama("");
      loadKategori();
    } catch (err) {
      console.error(err);
      setError("Gagal menambah kategori");
    } finally {
      setLoading(false);
    }
  }

  async function hapusKategori(id) {
    if (!confirm("Hapus kategori ini?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/kategori/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Gagal menghapus kategori");

      loadKategori();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus kategori");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKategori();
  }, []);

  return (
    <div className="admin-kategori-page">
      <h2>Kelola Kategori</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="kategori-form">
        <input
          type="text"
          placeholder="Nama kategori"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <button onClick={tambahKategori} disabled={loading}>
          {loading ? "Memproses..." : "Tambah"}
        </button>
      </div>

      {kategori.length === 0 && <p>Belum ada kategori.</p>}

      <ul className="kategori-list">
        {kategori.map((k) => (
          <li key={k.id_kategori} className="kategori-item">
            <span>{k.nama}</span>
            <button
              className="btn-delete"
              onClick={() => hapusKategori(k.id_kategori)}
              disabled={loading}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
