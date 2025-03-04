// tests/socket.spec.js
import { test, expect } from "@playwright/test";

test("Socket.IO notification", async ({ page }) => {
  await page.goto("http://localhost:3000"); // Reemplaza con la URL de tu aplicación

  // Aquí puedes agregar lógica para interactuar con la página y desencadenar eventos de Socket.IO
  // Por ejemplo, simular un inicio de sesión o una acción que genere una notificación

  // Verificar que la notificación se reciba
  await page.waitForFunction(() => {
    return window.socketNotificationReceived; // Necesitas agregar esta variable en tu código del cliente
  });

  expect(await page.textContent("#notification-message")).toContain(
    "¡Conectado a Socket.IO!"
  );
});
