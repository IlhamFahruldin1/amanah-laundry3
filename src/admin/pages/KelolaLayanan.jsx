import { useEffect, useState, useRef } from "react";
import "../admin-layanan.css";

export default function KelolaLayanan() {
  const [layanan, setLayanan] = useState([]);
  const [kategori, setKategori] = useState([]);

  // form state
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
      const res = await fetch("http://localhost:3001/layanan");
      const data = await res.json();
      setLayanan(data);
    } catch (err) {
      console.error("Gagal load layanan:", err);
    }
  }

  async function loadKategori() {
    try {
      const res = await fetch("http://localhost:3001/kategori");
      const data = await res.json();
      setKategori(data);
    } catch (err) {
      console.error("Gagal load kategori:", err);
    }
  }

  // HANDLE FILE INPUT (multiple)
  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const previews = files.map((f) => URL.createObjectURL(f));
    setPreviewFiles(previews);
  }

  // CLEAR FORM
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

  // SUBMIT (CREATE or UPDATE)
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
      ? `http://localhost:3001/layanan/${editingId}`
      : "http://localhost:3001/layanan";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
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
    alert("Terjadi error. Periksa console.");
  }
}


  // DELETE layanan
  async function handleDelete(id) {
    if (!confirm("Hapus layanan ini?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3001/layanan/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
      });

      if (!res.ok) throw new Error("Hapus gagal");

      alert("Layanan telah dihapus");
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  }

  // EDIT layanan
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

  function removeExistingImage(idx) {
    const copy = [...existingImages];
    copy.splice(idx, 1);
    setExistingImages(copy);
  }

  return (
    <div className="admin-layanan-page">
      <h2>Kelola Layanan</h2>

      {/* FORM */}
      <form className="form-layanan" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Layanan" : "Tambah Layanan"}</h3>

        <label>Nama</label>
        <input value={nama} onChange={(e) => setNama(e.target.value)} />

        <label>Deskripsi</label>
        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />

        <label>Harga</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />

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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
        />

        {previewFiles.length > 0 && (
          <div className="preview-row">
            {previewFiles.map((src, i) => (
              <div className="preview-box" key={i}>
                <img src={src} alt={`preview-${i}`} />
              </div>
            ))}
          </div>
        )}

        {editingId && existingImages.length > 0 && (
          <>
            <label>Gambar Saat Ini</label>
            <div className="preview-row">
              {existingImages.map((fname, idx) => (
                <div className="preview-box" key={idx}>
                  <img src={`http://localhost:3001/uploads_layanan/${fname}`} alt={fname} />
                  <button
                    type="button"
                    className="btn-remove-img"
                    onClick={() => removeExistingImage(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-save">
            {editingId ? "Update Layanan" : "Tambah Layanan"}
          </button>
          <button type="button" className="btn-cancel" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      {/* LIST LAYANAN */}
      <div className="list-layanan">
        {layanan.length === 0 && <p>Belum ada layanan.</p>}

        {layanan.map((item) => (
          <div className="card-admin" key={item.id_layanan}>
            <div className="card-img">
              <img
                src={
                  item.images?.length
                    ? `http://localhost:3001/uploads_layanan/${item.images[0]}`
                    : "https://via.placeholder.com/300x180?text=No+Image"
                }
                alt={item.nama}
              />
            </div>

            <div className="card-body">
              <h4>{item.nama}</h4>
              <p className="small">{item.deskripsi}</p>
              <div className="meta">
                <span>Rp {Number(item.harga).toLocaleString("id-ID")}</span>
                <span className="kat">{item.nama_kategori || "-"}</span>
              </div>

              <div className="card-actions">
                <button onClick={() => startEdit(item)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(item.id_layanan)} className="btn-delete">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
