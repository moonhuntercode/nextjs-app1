// components/WebcamCapture.js
"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function WebcamCapture() {
  const videoRef = useRef(null);
  const [permission, setPermission] = useState("prompt");
  const [stream, setStream] = useState(null);

  // 🔌 Solicitar permisos al montar
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setStream(stream);
        setPermission("granted");
        toast.success("✅ Cámara lista!");
      } catch (err) {
        setPermission("denied");
        toast.error("⚠️ Habilita permisos de cámara.");
      }
    };
    checkPermission();
  }, []);

  // 🖼️ Capturar foto
  const handleCapture = () => {
    if (permission !== "granted") return toast.warning("📸 Sin acceso a cámara.");
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imagen = canvas.toDataURL("image/png");
    // Lógica para registrar asistencia con imagen
    console.log("Foto capturada:", imagen);
    toast.info("📸 Foto capturada!");
  };

  return (
    <div className="webcam-container">
      {permission === "granted" && (
        <>
          <video ref={videoRef} autoPlay playsInline className="camera-feed" />
          <button onClick={handleCapture}>Capturar Foto 📸</button>
        </>
      )}
      {permission === "denied" && (
        <p className="error">🔴 No se puede acceder a la cámara.</p>
      )}
    </div>
  );
}
