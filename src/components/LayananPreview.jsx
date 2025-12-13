import Layanan from "./Layanan";

export default function LayananPreview() {
  return (
    <section>
      <h2 className="judul-section">Layanan Kami</h2>
      <Layanan limit={4} />
    </section>
  );
}
