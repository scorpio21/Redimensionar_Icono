// pwa.js
// Registro del Service Worker y utilidades PWA

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        // Registrar el SW en la raíz del proyecto (sw.js)
        const reg = await navigator.serviceWorker.register('sw.js');
        console.log('[PWA] Service Worker registrado:', reg.scope);
      } catch (err) {
        console.warn('[PWA] Error registrando SW:', err);
      }
    });
  }
}

export function installPromptHelper() {
  // (Opcional) Manejar evento beforeinstallprompt si se quiere UI custom
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log('[PWA] beforeinstallprompt capturado');
  });
}
