// components/AdminPanel.js
"use client";

import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import EmployeeForm from "./EmployeeForm";
import WebcamCapture from "./WebcamCapture";

export default function AdminPanel() {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const { employees, logs } = useAuthStore();

  return (
    <div className="admin-panel">
      <h2>Panel de Control 👨💻</h2>

      {/* 🛠️ Botones de Administración */}
      <div className="control-buttons">
        <button onClick={() => setShowEmployeeForm(!showEmployeeForm)}>
          {showEmployeeForm ? "❌ Ocultar Formulario" : "✅ Mostrar Formulario"}
        </button>
        <button onClick={() => setShowCamera(!showCamera)}>
          {showCamera ? "⏹️ Detener Cámara" : "🎥 Iniciar Cámara"}
        </button>
      </div>

      {/* 📝 Formulario de Empleados */}
      {showEmployeeForm && <EmployeeForm />}

      {/* 📹 Cámara para Pruebas */}
      {showCamera && <WebcamCapture />}

      {/* 📊 Estadísticas */}
      <div className="stats">
        <p>empleados: {employees.length} 👷</p>
        <p>logs: {logs.length} 📝</p>
      </div>
    </div>
  );
}
