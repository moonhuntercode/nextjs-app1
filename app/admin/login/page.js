// app/admin/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@stores/useAuthStore.js";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginAdmin(password);
    if (success) {
      setError("");
      router.push("/admin"); // Redirige al panel de admin
    } else {
      setError("❌ Contraseña incorrecta. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <h1>Panel de Admin </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión ✅</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
