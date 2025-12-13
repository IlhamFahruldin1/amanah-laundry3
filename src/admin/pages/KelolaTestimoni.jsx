import { useEffect, useState } from "react";

export default function KelolaTestimoni() {
  const [data, setData] = useState([]);

  async function load() {
    const res = await fetch("http://localhost:3001/testimoni");
    setData(await res.json());
  }

  async function hapus(id) {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3001/testimoni/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Kelola Testimoni</h2>

      {data.map((t) => (
        <div key={t.id_testimoni} style={{ marginBottom: 15 }}>
          <p><b>{t.nama}</b></p>
          <p>{t.pesan}</p>

          {(t.images ?? []).map((img) => (
            <img
              key={img}
              src={`http://localhost:3001/uploads/${img}`}
              width="120"
            />
          ))}

          <button onClick={() => hapus(t.id_testimoni)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}
