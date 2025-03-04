// server.js
import http from "http";
import next from "next";
import { setupSocket } from "./utils/socket.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Puerto dinámico (lee de variables de entorno)
const PORT = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    // Crear servidor HTTP
    const httpServer = http.createServer((req, res) => handle(req, res));

    // Configurar Socket.IO
    const io = setupSocket(httpServer);

    // Iniciar servidor
    httpServer.listen(PORT, () => {
      console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`✅ Modo: ${dev ? "Desarrollo" : "Producción"}`);
    });

    // Cierre seguro del servidor
    const shutdown = () => {
      io.close(); // Cerrar Socket.IO
      httpServer.close(() => {
        console.log("🛑 Servidor cerrado correctamente");
        process.exit(0);
      });
    };

    // Manejar señales de cierre
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((err) => {
    console.error("❌ Error fatal:", err);
    process.exit(1);
  });
