// components/EmployeePhotos.js
"use client";

import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";

export default function EmployeePhotos() {
  const { isAdminLoggedIn, photos, deletePhoto } = useAuthStore();

  return (
    <div>
      <h2>Fotos de Empleados 📸</h2>
      {photos.length > 0 ? (
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <p>
                <strong>Carnet:</strong> {photo.carnet} | <strong>Fecha:</strong>{" "}
                {photo.fecha} <strong>Hora:</strong> {photo.hora}
              </p>
              <img src={photo.foto} alt={`Foto de ${photo.carnet}`} width="150" />
              {isAdminLoggedIn && (
                <button onClick={() => deletePhoto(photo.id)}>Eliminar ❌</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay fotos registradas. 📭</p>
      )}
    </div>
  );
}
