// app/changelog/page.js
export default function ChangelogPage() {
  const features = [
    "✅ Autenticación de admin con Zustand + Dexie.js",
    "📸 Captura de fotos comprimidas con Camera API",
    "📊 Exportación de datos a CSV/PDF",
    " 🔌 Notificaciones en tiempo real con Socket.IO",
  ];
  const futurePlans = [
    "🌐 Dashboard con gráficos interactivos",
    "🔒 Roles de usuario avanzados",
    "📱 Versión móvil optimizada",
  ];

  return (
    <div className="changelog-container">
      <h1>Funcionalidades del Sistema 🚀</h1>

      <section>
        <h2>Implementadas ✅</h2>
        <ul>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Próximas Mejoras 🛠️</h2>
        <ul>
          {futurePlans.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
