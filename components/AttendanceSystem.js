// components/AttendanceSystem.js
"use client";

import { useAuthStore } from "../stores/useAuthStore";
import WebcamCapture from "./WebcamCapture";

export default function AttendanceSystem() {
  const { isEmployeeLoggedIn, employees, addAsistencia } = useAuthStore();
  const empleado = employees.find((e) => e.carnet === isEmployeeLoggedIn);

  // 🔒 Validar permisos
  if (!empleado?.activo) return <p>🔒 Empleado no autorizado.</p>;

  // 📤 Callback para registrar asistencia
  const handleRegister = (imagen) => {
    addAsistencia(empleado.carnet, imagen);
    alert("✅ Asistencia registrada!");
  };

  return (
    <div className="attendance-container">
      <h2>Registrar Asistencia 📸</h2>
      <WebcamCapture onRegister={handleRegister} />
    </div>
  );
}
