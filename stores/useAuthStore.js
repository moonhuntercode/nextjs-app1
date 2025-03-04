// store/useAuthStore.js
"use client";

import { create } from "zustand";
import { db } from "../utils/db";

const useAuthStore = create((set, get) => ({
  // 📌 Estado Inicial
  isAdminLoggedIn: false,
  isEmployeeLoggedIn: null,
  employees: [],
  asistencia: [],
  photos: [],
  logs: [],
  adminPassword: null,
  employeeRegistrationAllowed: false, // 🎛️ Permiso para registrar empleados

  // 🔒 Persistencia de Autenticación
  loadAuthFromStorage: () => {
    if (typeof window !== "undefined") {
      set({
        isAdminLoggedIn: JSON.parse(localStorage.getItem("admin") || "false"),
        isEmployeeLoggedIn: JSON.parse(localStorage.getItem("employee") || "null"),
      });
    }
  },
  saveAuthToStorage: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin", JSON.stringify(get().isAdminLoggedIn));
      localStorage.setItem("employee", JSON.stringify(get().isEmployeeLoggedIn));
    }
  },

  // 🔑 Métodos de Admin
  loginAdmin: async (password) => {
    const adminSession = await db.sesion.get("admin");
    if (adminSession?.valor === password) {
      set({ isAdminLoggedIn: true });
      get().saveAuthToStorage();
      return true;
    }
    return false;
  },
  logoutAdmin: () => {
    set({ isAdminLoggedIn: false });
    get().saveAuthToStorage();
  },

  // 👷 Métodos de Empleados
  fetchEmployees: async () => {
    const employees = await db.empleados.toArray();
    set({ employees });
  },
  addEmployee: async (nombreCompleto, carnet) => {
    if (!get().isAdminLoggedIn)
      throw new Error("❌ Solo admins pueden registrar empleados.");
    await db.empleados.add({ nombreCompleto, carnet, activo: true });
    await get().fetchEmployees();
    return true; // ⚡ El componente manejará el toast
  },
  updateEmployee: async (id, data) => {
    if (!get().isAdminLoggedIn)
      throw new Error("❌ Solo admins pueden actualizar empleados.");
    await db.empleados.update(id, data);
    await get().fetchEmployees();
  },
  deleteEmployee: async (id) => {
    if (!get().isAdminLoggedIn)
      throw new Error("❌ Solo admins pueden eliminar empleados.");
    await db.empleados.delete(id);
    await get().fetchEmployees();
  },

  // 📸 Métodos de Asistencia
  fetchAsistencia: async () => {
    const asistencia = await db.asistencia.toArray();
    set({ asistencia });
  },
  addAsistencia: async (carnet, imagen) => {
    const empleado = get().employees.find((e) => e.carnet === carnet && e.activo);
    if (!empleado) throw new Error("🔒 Empleado no autorizado.");

    await db.asistencia.add({
      carnet,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString(),
      imagen,
    });
    await get().fetchAsistencia();
  },

  // 📦 Métodos de Fotos
  fetchPhotos: async () => {
    const photos = await db.fotos.toArray();
    set({ photos });
  },
  addPhoto: async (carnet, foto) => {
    await db.fotos.add({
      carnet,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString(),
      foto,
    });
    await get().fetchPhotos();
  },
  deletePhoto: async (id) => {
    if (!get().isAdminLoggedIn) throw new Error("❌ Solo admins pueden eliminar fotos.");
    await db.fotos.delete(id);
    await get().fetchPhotos();
  },

  // 📝 Métodos de Logs
  fetchLogs: async () => {
    const logs = await db.logs.toArray();
    set({ logs });
  },
  addLog: async (mensaje) => {
    await db.logs.add({
      mensaje,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString(),
    });
    await get().fetchLogs();
  },
  deleteLog: async (id) => {
    if (!get().isAdminLoggedIn) throw new Error("❌ Solo admins pueden eliminar logs.");
    await db.logs.delete(id);
    await get().fetchLogs();
  },

  // ⚡ Inicialización de Datos
  initializeData: async () => {
    try {
      const [adminSession, employees, asistencia, photos, logs] = await Promise.all([
        db.sesion.get("admin"),
        db.empleados.toArray(),
        db.asistencia.toArray(),
        db.fotos.toArray(),
        db.logs.toArray(),
      ]);
      set({
        adminPassword: adminSession?.valor,
        employees,
        asistencia,
        photos,
        logs,
      });
    } catch (error) {
      console.error("❌ Error al inicializar datos:", error);
    }
  },

  // 🛠️ Control de Permisos
  setEmployeeRegistrationPermission: (allowed) => {
    set({ employeeRegistrationAllowed: allowed });
  },
}));

// Cargar estado inicial (solo cliente)
if (typeof window !== "undefined") {
  useAuthStore.getState().loadAuthFromStorage();
  useAuthStore.getState().initializeData();
}

export default useAuthStore;
