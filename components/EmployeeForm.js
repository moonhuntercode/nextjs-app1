// components/EmployeeForm.js
"use client";

import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { toast } from "react-toastify";

export default function EmployeeForm() {
  const [nombre, setNombre] = useState("");
  const [carnet, setCarnet] = useState("");
  const { addEmployee } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(nombre, carnet);
      toast.success("✅ Empleado registrado!");
      setNombre("");
      setCarnet("");
    } catch (error) {
      toast.error(`❌ Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        placeholder="Nombre Completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Carnet"
        value={carnet}
        onChange={(e) => setCarnet(e.target.value)}
        required
      />
      <button type="submit">Registrar Empleado 👷</button>
    </form>
  );
}
