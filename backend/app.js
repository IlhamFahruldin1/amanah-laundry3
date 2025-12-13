import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// ========================================
// STATIC FOLDER GAMBAR TESTIMONI + LAYANAN
// ========================================
app.use("/uploads", express.static("uploads"));
app.use("/uploads_layanan", express.static("uploads_layanan"));

// ========================================
// LOGIN ADMIN SEDERHANA
// ========================================
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";
const JWT_SECRET = "rahasia-super-admin";

// MIDDLEWARE CEK TOKEN
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// LOGIN ADMIN
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Login gagal" });
});

// ========================================
// MULTER STORAGE TESTIMONI
// ========================================
const storageTestimoni = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const uploadTestimoni = multer({ storage: storageTestimoni });

// ========================================
// MULTER STORAGE LAYANAN
// ========================================
const storageLayanan = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads_layanan"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const uploadLayanan = multer({ storage: storageLayanan });

// ========================================
// KONEKSI DATABASE SQLITE
// ========================================
const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

// ==========================================================
// ======================= TESTIMONI ========================
// ==========================================================

app.get("/testimoni", async (req, res) => {
  const rows = await db.all("SELECT * FROM testimoni ORDER BY id_testimoni DESC");

  const finalData = rows.map((i) => ({
    ...i,
    images: i.images ? JSON.parse(i.images) : [],
  }));

  res.json(finalData);
});

app.post("/testimoni", uploadTestimoni.array("images", 10), async (req, res) => {
  const { nama, pesan, rating } = req.body;
  const fileNames = req.files.map((f) => f.filename);
  const imagesJSON = JSON.stringify(fileNames);

  await db.run(
    `INSERT INTO testimoni (nama, pesan, rating, images, waktu_dibuat)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [nama, pesan, rating, imagesJSON]
  );

  res.json({ success: true });
});

// DELETE TESTIMONI
app.delete("/testimoni/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  const row = await db.get("SELECT images FROM testimoni WHERE id_testimoni = ?", [id]);
  if (!row) return res.status(404).json({ error: "Data tidak ditemukan" });

  const photos = row.images ? JSON.parse(row.images) : [];

  photos.forEach((img) => {
    try {
      fs.unlinkSync(`./uploads/${img}`);
    } catch {}
  });

  await db.run("DELETE FROM testimoni WHERE id_testimoni = ?", [id]);

  res.json({ success: true });
});

// ==========================================================
// ==================== KATEGORI LAYANAN =====================
// ==========================================================

app.get("/kategori", async (req, res) => {
  const rows = await db.all("SELECT * FROM kategori ORDER BY id_kategori DESC");
  res.json(rows);
});

app.post("/kategori", verifyAdmin, async (req, res) => {
  const { nama } = req.body;
  await db.run(`INSERT INTO kategori (nama) VALUES (?)`, [nama]);
  res.json({ success: true });
});

app.delete("/kategori/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  await db.run(`DELETE FROM kategori WHERE id_kategori = ?`, [id]);
  res.json({ success: true });
});

// ==========================================================
// ======================== LAYANAN ==========================
// ==========================================================

// GET semua layanan
app.get("/layanan", async (req, res) => {
  const rows = await db.all(`
    SELECT layanan.*, kategori.nama AS nama_kategori
    FROM layanan
    LEFT JOIN kategori ON layanan.id_kategori = kategori.id_kategori
    ORDER BY id_layanan DESC
  `);

  const finalData = rows.map((item) => ({
    ...item,
    images: item.images ? JSON.parse(item.images) : [],
  }));

  res.json(finalData);
});

// POST tambah layanan
app.post("/layanan", verifyAdmin, uploadLayanan.array("images", 10), async (req, res) => {
  const { nama, deskripsi, harga, id_kategori } = req.body;

  const fileNames = req.files.map((f) => f.filename);
  const imagesJSON = JSON.stringify(fileNames);

  await db.run(
    `
      INSERT INTO layanan (nama, deskripsi, harga, id_kategori, images, waktu_dibuat)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `,
    [nama, deskripsi, harga, id_kategori, imagesJSON]
  );

  res.json({ success: true });
});

// ==========================
// UPDATE layanan (BARU)
// ==========================
app.put("/layanan/:id", verifyAdmin, uploadLayanan.array("images", 10), async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, harga, id_kategori, existingImages } = req.body;

  const old = await db.get("SELECT images FROM layanan WHERE id_layanan = ?", [id]);
  if (!old) return res.status(404).json({ error: "Data tidak ditemukan" });

  let oldImages = JSON.parse(old.images || "[]");
  let keepImages = existingImages ? JSON.parse(existingImages) : [];

  const removedImages = oldImages.filter((img) => !keepImages.includes(img));
  removedImages.forEach((fname) => {
    try {
      fs.unlinkSync(`./uploads_layanan/${fname}`);
    } catch {}
  });

  let newImages = req.files.length ? req.files.map((f) => f.filename) : [];

  const finalImages = [...keepImages, ...newImages];

  await db.run(
    `
      UPDATE layanan
      SET nama = ?, deskripsi = ?, harga = ?, id_kategori = ?, images = ?
      WHERE id_layanan = ?
    `,
    [nama, deskripsi, harga, id_kategori, JSON.stringify(finalImages), id]
  );

  res.json({ success: true });
});

// DELETE layanan
app.delete("/layanan/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  await db.run(`DELETE FROM layanan WHERE id_layanan = ?`, [id]);

  res.json({ success: true });
});

// ==========================================================
// RUN SERVER
// ==========================================================
app.listen(3001, () =>
  console.log("Backend running on http://localhost:3001")
);
