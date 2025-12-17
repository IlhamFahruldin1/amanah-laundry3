const API_URL = import.meta.env.VITE_API_URL;

export default function LayananCard({ item }) {
  const imageUrl =
    item.images?.length > 0
      ? `${API_URL}/uploads_layanan/${item.images[0]}`
      : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="layanan-card">
      <img
        src={imageUrl}
        alt={item.nama}
        className="layanan-img"
        loading="lazy"
      />

      <div className="layanan-content">
        <h3>{item.nama}</h3>
        <p>{item.deskripsi}</p>

        <div className="layanan-footer">
          <span className="harga">
            Mulai Dari Rp {Number(item.harga).toLocaleString("id-ID")}
          </span>
          <span className="arrow">➜</span>
        </div>
      </div>
    </div>
  );
}
