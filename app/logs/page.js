// app/logs/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogsPage() {
  const { isAdminLoggedIn, logs, fetchLogs, deleteLog } = useAuthStore();
  const [filter, setFilter] = useState("");

  // 🔒 Proteger la ruta
  useEffect(() => {
    if (!isAdminLoggedIn) {
      toast.error("🔒 Solo admins pueden ver logs.", { autoClose: 2000 });
      window.location.href = "/admin/login";
    }
  }, [isAdminLoggedIn]);

  // 🔄 Cargar logs al montar
  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchLogs();
    }
  }, [isAdminLoggedIn]);

  // 🗑️ Eliminar log con confirmación
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ ¿Eliminar este log?")) {
      try {
        await deleteLog(id);
        toast.success("✅ Log eliminado!", { autoClose: 2000 });
      } catch (error) {
        toast.error(`❌ Error: ${error.message}`, { autoClose: 3000 });
      }
    }
  };

  // 🎛️ Filtro de búsqueda
  const filteredLogs = logs.filter((log) =>
    log.mensaje.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="logs-page">
      <h1>Logs del Sistema 📝</h1>

      {/* Filtros y acciones */}
      <div className="logs-header">
        <input
          type="text"
          placeholder="🔍 Buscar logs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <Link href="/admin">
          <button className="back-button">🔙 Volver al Panel</button>
        </Link>
      </div>

      {/* Lista de logs */}
      <ul className="logs-list">
        {filteredLogs.map((log) => (
          <li key={log.id} className="log-item">
            <div className="log-content">
              <span className="timestamp">
                📅 {log.fecha} | ⏰ {log.hora}
              </span>
              <p>
                {getEmojiForLog(log.mensaje)} {log.mensaje}
              </p>
            </div>
            <button onClick={() => handleDelete(log.id)} className="delete-log">
              🗑️
            </button>
          </li>
        ))}
        {filteredLogs.length === 0 && <p>텅 No hay logs que coincidan.</p>}
      </ul>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
      />
    </div>
  );
}

// 🎨 Asignar emojis según el tipo de log
const getEmojiForLog = (mensaje) => {
  if (mensaje.includes("Empleado agregado")) return "✅";
  if (mensaje.includes("Empleado eliminado")) return "❌";
  if (mensaje.includes("Foto")) return "📸";
  if (mensaje.includes("Asistencia")) return "📅";
  return "ℹ️";
};
