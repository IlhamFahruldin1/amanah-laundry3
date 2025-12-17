import { useState } from "react";
import "../assets/LoginAdmin.css";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data?.message || "Login gagal");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login berhasil");
        window.location.href = "/admin";
      } else {
        alert("Login gagal: token tidak diterima");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      alert("Terjadi kesalahan saat menghubungi server");
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
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
