import { Routes, Route, useLocation } from "react-router-dom";

// ================= FRONT PAGES =================
import Home from "./pages/Home";
import Layanan from "./pages/Layanan";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import Navbar from "./components/Navbar";

// ================= ADMIN LOGIN (baru) =================
import AdminLogin from "./admin/AdminLogin";

// ================= ADMIN DASHBOARD =================
import AdminLayout from "./admin/AdminLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import KelolaKategori from "./admin/pages/KelolaKategori";
import KelolaLayanan from "./admin/pages/KelolaLayanan";
import KelolaTestimoni from "./admin/pages/KelolaTestimoni";

function App() {
  const location = useLocation();

  // Halaman yang TIDAK menampilkan Navbar
  const hideNavbarOn = [
    "/admin/login",
    "/admin",
    "/admin/kategori",
    "/admin/layanan",
    "/admin/testimoni",
  ];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>

        {/* ========= HALAMAN PENGGUNA ========= */}
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />

        {/* ========= LOGIN ADMIN BARU ========= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========= DASHBOARD ADMIN ========= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="kategori" element={<KelolaKategori />} />
          <Route path="layanan" element={<KelolaLayanan />} />
          <Route path="testimoni" element={<KelolaTestimoni />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
