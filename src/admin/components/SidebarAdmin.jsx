import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <aside
      style={{
        width: "250px",
        height: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "25px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "5px",
          }}
        >
          Amanah Admin
        </h2>
        <p style={{ fontSize: "13px", color: "#6b7280" }}>Dashboard Panel</p>
      </div>

      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >

          <SidebarItem to="/admin">Home</SidebarItem>
          <SidebarItem to="/admin/kategori">Kategori</SidebarItem>
          <SidebarItem to="/admin/layanan">Layanan</SidebarItem>
          <SidebarItem to="/admin/testimoni">Testimoni</SidebarItem>
        </ul>
      </nav>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            padding: "10px 15px",
            background: "#fee2e2",
            color: "#b91c1c",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#fecaca";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#fee2e2";
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

/* -------------------------------
   Komponen SidebarItem
--------------------------------*/
function SidebarItem({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        style={{
          display: "block",
          padding: "10px 15px",
          textDecoration: "none",
          color: "#374151",
          fontWeight: "500",
          borderRadius: "8px",
          transition: "0.2s",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#f3f4f6";
          e.target.style.color = "#111827";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#374151";
        }}
      >
        {children}
      </Link>
    </li>
  );
}
