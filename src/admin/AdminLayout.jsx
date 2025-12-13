import { Outlet } from "react-router-dom";
import SidebarAdmin from "./components/SidebarAdmin";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
