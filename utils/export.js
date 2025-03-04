// utils/export.js
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Requerido para tablas en PDF

// Exportar a CSV
export const exportToCSV = (data) => {
  if (!data.length) return alert("텅 No hay datos para exportar.");

  const csv = Papa.unparse({
    fields: ["carnet", "fecha", "hora", "imagen"],
    data: data.map((registro) => ({
      carnet: registro.carnet,
      fecha: registro.fecha,
      hora: registro.hora,
      imagen: registro.imagen.split(",")[1] || "N/A", // Extraer Base64 si existe
    })),
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "asistencia.csv";
  link.click();
  URL.revokeObjectURL(url);
};

// Exportar a PDF
export const exportToPDF = (data) => {
  if (!data.length) return alert("텅 No hay datos para exportar.");

  const doc = new jsPDF();
  doc.autoTable({
    head: [["Carnet", "Fecha", "Hora"]],
    body: data.map((registro) => [registro.carnet, registro.fecha, registro.hora]),
  });
  doc.save("asistencia.pdf");
};
