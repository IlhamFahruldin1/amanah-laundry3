import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";

const app = express();

/* =========================
   CORS & BODY PARSER
========================= */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* =========================
   STATIC FILES
========================= */
app.use("/uploads", express.static("uploads"));
app.use("/uploads_layanan", express.static("uploads_layanan"));

/* =========================
   ADMIN AUTH
========================= */
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";
const JWT_SECRET = process.env.JWT_SECRET || "rahasia-super-admin";

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false });
});

/* =========================
   MULTER
========================= */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir("uploads");
ensureDir("uploads_layanan");

const storageTestimoni = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const storageLayanan = multer.diskStorage({
  destination: "uploads_layanan",
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const uploadTestimoni = multer({ storage: storageTestimoni });
const uploadLayanan = multer({ storage: storageLayanan });

/* =========================
   DATABASE
========================= */
const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

/* =========================
   TESTIMONI
========================= */
app.get("/testimoni", async (_, res) => {
  const rows = await db.all("SELECT * FROM testimoni ORDER BY id_testimoni DESC");
  res.json(rows.map(r => ({
    ...r,
    images: r.images ? JSON.parse(r.images) : []
  })));
});

app.post("/testimoni", uploadTestimoni.array("images", 10), async (req, res) => {
  const images = JSON.stringify(req.files.map(f => f.filename));
  const { nama, pesan, rating } = req.body;

  await db.run(
    `INSERT INTO testimoni (nama, pesan, rating, images, waktu_dibuat)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [nama, pesan, rating, images]
  );

  res.json({ success: true });
});

app.delete("/testimoni/:id", verifyAdmin, async (req, res) => {
  await db.run("DELETE FROM testimoni WHERE id_testimoni=?", [req.params.id]);
  res.json({ success: true });
});

/* =========================
   KATEGORI
========================= */
app.get("/kategori", async (_, res) => {
  res.json(await db.all("SELECT * FROM kategori ORDER BY id_kategori DESC"));
});

app.post("/kategori", verifyAdmin, async (req, res) => {
  const { nama } = req.body;
  await db.run("INSERT INTO kategori (nama) VALUES (?)", [nama]);
  res.json({ success: true });
});

app.delete("/kategori/:id", verifyAdmin, async (req, res) => {
  await db.run("DELETE FROM kategori WHERE id_kategori=?", [req.params.id]);
  res.json({ success: true });
});

/* =========================
   LAYANAN (INI YANG ERROR KEMARIN)
========================= */
app.get("/layanan", async (_, res) => {
  const rows = await db.all(`
    SELECT layanan.*, kategori.nama AS nama_kategori
    FROM layanan
    LEFT JOIN kategori ON layanan.id_kategori = kategori.id_kategori
    ORDER BY id_layanan DESC
  `);

  res.json(rows.map(r => ({
    ...r,
    images: r.images ? JSON.parse(r.images) : []
  })));
});

app.post(
  "/layanan",
  verifyAdmin,
  uploadLayanan.array("images", 10),
  async (req, res) => {
    const { nama, deskripsi, harga, id_kategori } = req.body;
    const images = JSON.stringify(req.files.map(f => f.filename));

    await db.run(
      `INSERT INTO layanan (nama, deskripsi, harga, id_kategori, images)
       VALUES (?, ?, ?, ?, ?)`,
      [nama, deskripsi, harga, id_kategori || null, images]
    );

    res.json({ success: true });
  }
);

app.put(
  "/layanan/:id",
  verifyAdmin,
  uploadLayanan.array("images", 10),
  async (req, res) => {
    const { nama, deskripsi, harga, id_kategori } = req.body;

    let query = `
      UPDATE layanan
      SET nama=?, deskripsi=?, harga=?, id_kategori=?
    `;
    const params = [nama, deskripsi, harga, id_kategori || null];

    if (req.files.length) {
      query += ", images=?";
      params.push(JSON.stringify(req.files.map(f => f.filename)));
    }

    query += " WHERE id_layanan=?";
    params.push(req.params.id);

    await db.run(query, params);
    res.json({ success: true });
  }
);

app.delete("/layanan/:id", verifyAdmin, async (req, res) => {
  await db.run("DELETE FROM layanan WHERE id_layanan=?", [req.params.id]);
  res.json({ success: true });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});

app.get("/", (_, res) => {
  res.json({ status: "OK", message: "Amanah Laundry API running" });
});
