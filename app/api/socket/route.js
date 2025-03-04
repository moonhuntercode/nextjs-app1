// app/api/socket/route.js
import WebSocket from "ws";
import { NextResponse } from "next/server";

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ noServer: true });

// Manejar conexiones
wss.on("connection", (ws) => {
  console.log("Cliente conectado al WebSocket 🔌");

  // Enviar notificación de bienvenida
  ws.send(
    JSON.stringify({
      type: "notification",
      message: "¡Conectado al sistema de notificaciones!",
    })
  );

  // Escuchar mensajes del cliente
  ws.on("message", (message) => {
    console.log("Mensaje recibido:", message.toString());
  });

  // Manejar desconexión
  ws.on("close", () => {
    console.log("Cliente desconectado del WebSocket 🔌");
  });
});

// Integrar con el servidor HTTP de Next.js
export const GET = async (request) => {
  const { socket } = request;
  socket.on("upgrade", (ws) => {
    wss.handleUpgrade(request, ws, null, (client) => {
      wss.emit("connection", client, request);
    });
  });
  return NextResponse.json({ message: "WebSocket iniciado" });
};

export const dynamic = "force-dynamic"; // Forzar respuesta dinámica
