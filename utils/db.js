// utils/db.js
import Dexie from "dexie";

export const db = new Dexie("AsistenciaDB");

db.version(1).stores({
  sesion: "clave, valor", // Sesión del admin
  empleados: "++id, nombreCompleto, carnet, activo", // Empleados
  asistencia: "++id, carnet, fecha, hora, imagen", // Registros de asistencia
  fotos: "++id, carnet, fecha, hora, foto", // Fotos comprimidas
  logs: "++id, mensaje, fecha, hora", // Logs del sistema
});

// Inicializar contraseña del admin si no existe
db.sesion.get("admin").then((sesion) => {
  if (!sesion) {
    db.sesion.add({ clave: "admin", valor: "contraseña123" });
  }
});
