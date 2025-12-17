import { useState, useEffect } from "react";
import "../assets/Testimoni.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Testimoni() {
  const [testimonis, setTestimonis] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);

  // ================= GET TESTIMONI =================
  useEffect(() => {
    fetch(`${API_URL}/testimoni`)
      .then((res) => res.json())
      .then((data) => setTestimonis(data))
      .catch((err) => console.error("Error fetch:", err));
  }, []);

  // ================= HANDLE UPLOAD =================
  const handleMultipleUpload = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  // ================= KIRIM TESTIMONI =================
  const sendTestimoni = async () => {
    if (!name || !text) {
      alert("Nama dan testimoni wajib diisi");
      return;
    }

    const form = new FormData();
    form.append("nama", name);
    form.append("pesan", text);
    form.append("rating", rating);

    images.forEach((img) => form.append("images", img));

    await fetch(`${API_URL}/testimoni`, {
      method: "POST",
      body: form,
    });

    // reset form
    setName("");
    setText("");
    setRating(5);
    setImages([]);

    // reload data
    fetch(`${API_URL}/testimoni`)
      .then((res) => res.json())
      .then((data) => setTestimonis(data));
  };

  return (
    <div className="testimoni-container">
      {/* ================= LIST ================= */}
      <h2 className="judul-besar">Testimoni Pelanggan</h2>

      <div className="list-wrapper">
        {testimonis.map((item) => (
          <div className="card-testimoni" key={item.id_testimoni}>
            <div className="card-header">
              <div className="profile-icon">
                {item.nama?.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="nama">{item.nama}</div>

                <div className="bintang">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>

                <div className="tanggal">
                  {new Date(item.waktu_dibuat).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="isi">{item.pesan}</div>

            {item.images?.length > 0 && (
              <div className="foto-grid">
                {item.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${API_URL}/uploads/${img}`}
                    className="foto-testimoni"
                    alt="testimoni"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= FORM ================= */}
      <div className="form-box">
        <h3>Kirim Testimoni</h3>

        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-control"
        />

        <textarea
          placeholder="Tulis testimoni..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textarea-control"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input-control"
        >
          <option value={5}>5 Bintang</option>
          <option value={4}>4 Bintang</option>
          <option value={3}>3 Bintang</option>
          <option value={2}>2 Bintang</option>
          <option value={1}>1 Bintang</option>
        </select>

        <label className="label-upload">
          Upload Foto (boleh lebih dari 1)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleUpload}
        />

        {images.length > 0 && (
          <div className="preview-multiple">
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                className="preview-image"
                alt="preview"
              />
            ))}
          </div>
        )}

        <button className="btn-submit" onClick={sendTestimoni}>
          Kirim
        </button>
      </div>
    </div>
  );
}
