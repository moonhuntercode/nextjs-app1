// app/consultas/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import useAuthStore from "../../stores/useAuthStore";
import { exportToCSV, exportToPDF } from "../../utils/export";

// Importar Chart.js de forma segura
const Chart = dynamic(() => import("chart.js/auto").then((mod) => mod.Chart), {
  ssr: false,
  loading: () => <p>⏳ Cargando gráfico...</p>,
});

export default function ConsultasPage() {
  const [filtroCarnet, setFiltroCarnet] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const { isAdminLoggedIn, isEmployeeLoggedIn, asistencia, fetchAsistencia } =
    useAuthStore();

  // 🔒 Proteger la ruta
  if (!isAdminLoggedIn && !isEmployeeLoggedIn) {
    return (
      <p className="access-denied">
        🔒 Acceso denegado. Inicia sesión como admin o empleado.
      </p>
    );
  }

  // 🔄 Cargar datos al montar
  useEffect(() => {
    fetchAsistencia();
  }, []);

  // 📊 Filtrar registros
  const registrosFiltrados = asistencia.filter(
    (r) =>
      (filtroCarnet ? r.carnet === filtroCarnet : true) &&
      (filtroFecha ? r.fecha === filtroFecha : true)
  );

  return (
    <div className="consultas-container">
      <h1>Consultas de Asistencia 📊</h1>

      {/* 🎛️ Filtros */}
      <div className="filtros-grid">
        <input
          type="text"
          placeholder="🔍 Carnet"
          value={filtroCarnet}
          onChange={(e) => setFiltroCarnet(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* 📄 Botones de Exportación */}
      <div className="export-buttons">
        <button onClick={() => exportToCSV(registrosFiltrados)}>Exportar CSV 📄</button>
        <button onClick={() => exportToPDF(registrosFiltrados)}>Exportar PDF 📄</button>
      </div>

      {/* 📉 Gráfico */}
      <div className="chart-wrapper">
        {registrosFiltrados.length > 0 ? (
          <Chart
            type="bar"
            data={{
              labels: registrosFiltrados.map((r) => r.carnet),
              datasets: [
                {
                  label: "Registros de Asistencia",
                  data: registrosFiltrados.map(() => 1),
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true },
              },
            }}
          />
        ) : (
          <p>텅 No hay datos para mostrar.</p>
        )}
      </div>

      {/* 📋 Lista de Registros */}
      <ul className="registros-list">
        {registrosFiltrados.map((r) => (
          <li key={r.id} className="registro-item">
            <div className="registro-header">
              <p>📅 {r.fecha}</p>
              <p>⏰ {r.hora}</p>
            </div>
            <img src={r.imagen} alt="Foto" className="registro-foto" />
            <p>👤 Carnet: {r.carnet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
