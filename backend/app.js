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
app.use(cors({
  origin: "*"
}));
app.use(express.json());

/* =========================
   STATIC FOLDER (WAJIB)
========================= */
app.use("/uploads", express.static("uploads"));
app.use("/uploads_layanan", express.static("uploads_layanan"));

/* =========================
   ADMIN AUTH (DEMO)
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

  res.status(401).json({ success: false, message: "Login gagal" });
});

/* =========================
   MULTER SETUP
========================= */
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir("uploads");
ensureDir("uploads_layanan");

const storageTestimoni = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads"),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + Math.random().toString(36).slice(2) + path.extname(file.originalname)),
});

const uploadTestimoni = multer({ storage: storageTestimoni });

const storageLayanan = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads_layanan"),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + Math.random().toString(36).slice(2) + path.extname(file.originalname)),
});

const uploadLayanan = multer({ storage: storageLayanan });

/* =========================
   SQLITE DATABASE
========================= */
const db = await open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

/* =========================
   ROUTES
========================= */

// TESTIMONI
app.get("/testimoni", async (_, res) => {
  const rows = await db.all("SELECT * FROM testimoni ORDER BY id_testimoni DESC");
  res.json(rows.map(r => ({ ...r, images: r.images ? JSON.parse(r.images) : [] })));
});

app.post("/testimoni", uploadTestimoni.array("images", 10), async (req, res) => {
  const { nama, pesan, rating } = req.body;
  const images = JSON.stringify(req.files.map(f => f.filename));

  await db.run(
    `INSERT INTO testimoni (nama, pesan, rating, images, waktu_dibuat)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [nama, pesan, rating, images]
  );

  res.json({ success: true });
});

app.delete("/testimoni/:id", verifyAdmin, async (req, res) => {
  const row = await db.get("SELECT images FROM testimoni WHERE id_testimoni = ?", [req.params.id]);
  if (!row) return res.status(404).json({ error: "Not found" });

  JSON.parse(row.images || "[]").forEach(f => {
    try { fs.unlinkSync(`uploads/${f}`); } catch {}
  });

  await db.run("DELETE FROM testimoni WHERE id_testimoni = ?", [req.params.id]);
  res.json({ success: true });
});

// KATEGORI
app.get("/kategori", async (_, res) => {
  res.json(await db.all("SELECT * FROM kategori ORDER BY id_kategori DESC"));
});

// LAYANAN
app.get("/layanan", async (_, res) => {
  const rows = await db.all(`
    SELECT layanan.*, kategori.nama AS nama_kategori
    FROM layanan
    LEFT JOIN kategori ON layanan.id_kategori = kategori.id_kategori
    ORDER BY id_layanan DESC
  `);

  res.json(rows.map(r => ({ ...r, images: r.images ? JSON.parse(r.images) : [] })));
});

/* =========================
   SERVER START (PENTING)
========================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Amanah Laundry API is running"
  });
});

