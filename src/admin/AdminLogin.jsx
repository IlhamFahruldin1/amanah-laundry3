// src/admin/AdminLogin.jsx
import React, { useState } from "react";
import "../assets/LoginAdmin.css";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        // tampilkan pesan dari server bila ada
        alert(data?.message || "Login gagal");
        return;
      }

      if (data.success && data.token) {
        // simpan token (key: "token")
        localStorage.setItem("token", data.token);

        alert("Login Berhasil!");
        // arahkan ke dashboard admin (route /admin)
        window.location.href = "/admin";
      } else {
        alert("Login gagal: Respons tidak valid");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Admin</h2>
        <p className="login-sub">Masuk untuk mengelola laundry</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}