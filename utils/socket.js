// utils/socket.js
import { Server } from "socket.io";

export function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://tudominio.com"
          : "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado 🔌");

    // Emitir logs en tiempo real
    socket.on("nuevo-log", (log) => {
      io.emit("log-actualizado", log);
    });
  });

  return io;
}
