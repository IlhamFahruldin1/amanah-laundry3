import { useEffect, useState, useRef } from "react";
import "../admin-layanan.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function KelolaLayanan() {
  const [layanan, setLayanan] = useState([]);
  const [kategori, setKategori] = useState([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  const fileInputRef = useRef();

  useEffect(() => {
    loadAll();
    loadKategori();
  }, []);

  async function loadAll() {
    try {
      const res = await fetch(`${API_URL}/layanan`);
      const data = await res.json();
      setLayanan(data);
    } catch (err) {
      console.error("Gagal load layanan:", err);
    }
  }

  async function loadKategori() {
    try {
      const res = await fetch(`${API_URL}/kategori`);
      const data = await res.json();
      setKategori(data);
    } catch (err) {
      console.error("Gagal load kategori:", err);
    }
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setPreviewFiles(files.map((f) => URL.createObjectURL(f)));
  }

  function resetForm() {
    setNama("");
    setDeskripsi("");
    setHarga("");
    setIdKategori("");
    setSelectedFiles([]);
    setPreviewFiles([]);
    setEditingId(null);
    setExistingImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!nama || !harga) {
      alert("Isi nama dan harga.");
      return;
    }

    const form = new FormData();
    form.append("nama", nama);
    form.append("deskripsi", deskripsi);
    form.append("harga", harga);
    form.append("id_kategori", idKategori);
    selectedFiles.forEach((f) => form.append("images", f));

    try {
      const url = editingId
        ? `${API_URL}/layanan/${editingId}`
        : `${API_URL}/layanan`;

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form,
      });

      if (!res.ok) throw new Error("Request gagal");

      alert(editingId ? "Berhasil diupdate" : "Berhasil ditambahkan");
      resetForm();
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Terjadi error.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus layanan ini?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/layanan/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("Hapus gagal");

      alert("Layanan dihapus");
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  }

  function startEdit(item) {
    setEditingId(item.id_layanan);
    setNama(item.nama || "");
    setDeskripsi(item.deskripsi || "");
    setHarga(item.harga || "");
    setIdKategori(item.id_kategori || "");
    setExistingImages(item.images || []);
    setSelectedFiles([]);
    setPreviewFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="admin-layanan-page">
      <h2>Kelola Layanan</h2>

      <form className="form-layanan" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Layanan" : "Tambah Layanan"}</h3>

        <label>Nama</label>
        <input value={nama} onChange={(e) => setNama(e.target.value)} />

        <label>Deskripsi</label>
        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />

        <label>Harga</label>
        <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />

        <label>Kategori</label>
        <select value={idKategori} onChange={(e) => setIdKategori(e.target.value)}>
          <option value="">-- Pilih kategori --</option>
          {kategori.map((k) => (
            <option key={k.id_kategori} value={k.id_kategori}>
              {k.nama}
            </option>
          ))}
        </select>

        <label>Upload Gambar</label>
        <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFiles} />

        <div className="form-actions">
          <button type="submit">{editingId ? "Update" : "Tambah"}</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>

      <div className="list-layanan">
        {layanan.length === 0 && <p>Belum ada layanan.</p>}

        {layanan.map((item) => (
          <div className="card-admin" key={item.id_layanan}>
            <img
              src={
                item.images?.length
                  ? `${API_URL}/uploads_layanan/${item.images[0]}`
                  : "https://via.placeholder.com/300x180?text=No+Image"
              }
              alt={item.nama}
            />
            <h4>{item.nama}</h4>
            <p>{item.deskripsi}</p>
            <span>Rp {Number(item.harga).toLocaleString("id-ID")}</span>
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id_layanan)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
