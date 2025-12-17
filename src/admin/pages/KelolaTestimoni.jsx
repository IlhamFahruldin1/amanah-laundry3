import { useEffect, useState } from "react";
import "../admin-testimoni.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function KelolaTestimoni() {
  const [data, setData] = useState([]);

  async function load() {
    try {
      const res = await fetch(`${API_URL}/testimoni`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Gagal load testimoni:", err);
    }
  }

  async function hapus(id) {
    if (!confirm("Hapus testimoni ini?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/testimoni/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) throw new Error("Gagal hapus");

      alert("Testimoni berhasil dihapus");
      load();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-testimoni-page">
      <h2>Kelola Testimoni</h2>

      {data.length === 0 && <p>Belum ada testimoni.</p>}

      <div className="testimoni-list">
        {data.map((t) => (
          <div className="testimoni-card" key={t.id_testimoni}>
            <div className="testimoni-body">
              <h4>{t.nama}</h4>
              <p className="pesan">{t.pesan}</p>

              {t.images?.length > 0 && (
                <div className="testimoni-images">
                  {t.images.map((img) => (
                    <img
                      key={img}
                      src={`${API_URL}/uploads/${img}`}
                      alt="testimoni"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="testimoni-actions">
              <button
                className="btn-delete"
                onClick={() => hapus(t.id_testimoni)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
