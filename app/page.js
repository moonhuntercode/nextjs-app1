// app/page.js
"use client";

import { useRef, useEffect } from "react";
import styles from "../public/page.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          toast.success("Cámara iniciada correctamente.");
        }
      } catch (error) {
        console.error("Error al acceder a la cámara:", error);
        toast.error("Error al iniciar la cámara.");
      }
    };

    const capturePhoto = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvasRef.current.toDataURL("image/png");
        console.log(imageDataUrl);
        toast.success("Foto capturada correctamente.");
        // Aquí puedes enviar imageDataUrl al servidor o guardarlo en el store
      } else {
        toast.error("No se pudo capturar la foto.");
      }
    };

    const startCameraButton = document.getElementById("start-camera");
    const capturePhotoButton = document.getElementById("capture-photo");

    if (startCameraButton && capturePhotoButton) {
      startCameraButton.onclick = startCamera;
      capturePhotoButton.onclick = capturePhoto;
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Sistema de Asistencia</h1>
        <p>Registra tu asistencia diaria usando la cámara web.</p>
        <video ref={videoRef} autoPlay playsInline id="webcam-video"></video>
        <canvas ref={canvasRef} style={{ display: "none" }} id="webcam-canvas"></canvas>
        <button id="start-camera">Iniciar Cámara</button>
        <button id="capture-photo">Capturar Foto</button>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}
