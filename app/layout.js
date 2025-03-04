// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "../public/globals.css"; // Importar estilos globales
import { Navbar } from "../components/Navbar"; // Importar el Navbar

// Configuración de tipografías
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos globales
export const metadata = {
  title: "Sistema de Asistencia",
  description: "Sistema de asistencia con Next.js y Dexie.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navbar */}
        <Navbar />
        {/* Contenido principal */}
        <main>{children}</main>
      </body>
    </html>
  );
}
