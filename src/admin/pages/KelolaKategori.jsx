// src/admin/pages/KelolaKategori.jsx
import { useEffect, useState } from "react";

export default function KelolaKategori() {
  const [kategori, setKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // gunakan key "token" (sama dengan yang disimpan di AdminLogin.jsx)
  const token = localStorage.getItem("token");

  async function loadKategori() {
    try {
      setError("");
      const res = await fetch("http://localhost:3001/kategori");
      if (!res.ok) throw new Error("Gagal memuat kategori");
      const data = await res.json();
      setKategori(data);
    } catch (err) {
      console.error("loadKategori error:", err);
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
      const res = await fetch("http://localhost:3001/kategori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // <- kirim token
        },
        body: JSON.stringify({ nama }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("tambahKategori failed:", data);
        throw new Error(data?.message || "Gagal tambah kategori");
      }

      setNama("");
      await loadKategori();
    } catch (err) {
      console.error("tambahKategori error:", err);
      setError("Gagal menambah kategori (cek token / server)");
    } finally {
      setLoading(false);
    }
  }

  async function hapusKategori(id) {
    if (!confirm("Hapus kategori ini?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/kategori/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Gagal menghapus kategori");
      }

      await loadKategori();
    } catch (err) {
      console.error("hapusKategori error:", err);
      setError("Gagal menghapus kategori (cek token / server)");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKategori();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Kelola Kategori</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
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

      <ul>
        {kategori.map((k) => (
          <li key={k.id_kategori} style={{ marginBottom: 8 }}>
            {k.nama}
            <button
              onClick={() => hapusKategori(k.id_kategori)}
              style={{ marginLeft: 10 }}
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