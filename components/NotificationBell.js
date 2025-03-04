// components/NotificationBell.js
"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../stores/useAuthStore";

const socket = io(); // Conectar al servidor

export default function NotificationBell() {
  const { logs } = useAuthStore();

  useEffect(() => {
    socket.on("log-actualizado", (log) => {
      useAuthStore.setState((state) => ({
        logs: [...state.logs, log],
      }));
    });
  }, []);

  return (
    <div className="notification-bell">
      🔔 {logs.length > 0 && <span className="badge">{logs.length}</span>}
      <style jsx>{`
        .badge {
          background: red;
          color: white;
          padding: 4px 8px;
          border-radius: 50%;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
