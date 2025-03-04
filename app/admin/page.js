// app/admin/page.js
"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "../../stores/useAuthStore";
import AdminPanel from "../../components/AdminPanel";
import { ToastContainer } from "react-toastify";

export default function AdminPage() {
  const { isAdminLoggedIn } = useAuthStore();
  const router = useRouter();

  // 🔒 Redirigir si no es admin
  if (!isAdminLoggedIn) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="admin-dashboard">
      <AdminPanel />
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}
