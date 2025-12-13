export default function LayananCard({ item }) {
  const imageUrl = item.images?.length
    ? `http://localhost:3001/uploads_layanan/${item.images[0]}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="layanan-card">
      <img src={imageUrl} alt={item.nama} className="layanan-img" />

      <div className="layanan-content">
        <h3>{item.nama}</h3>
        <p>{item.deskripsi}</p>

        <div className="layanan-footer">
          <span className="harga">Mulai Dari Rp {item.harga}</span>
          <span className="arrow">➜</span>
        </div>
      </div>
    </div>
  );
}
