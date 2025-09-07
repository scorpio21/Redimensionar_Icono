# Redimensionar Icono (PWA / Favicons)

Aplicación web ligera para redimensionar una imagen a los tamaños más comunes de iconos para PWA y navegadores. Permite:

- Seleccionar una imagen y previsualizarla.
- Generar un icono a un tamaño específico (con fondo elegido) y descargarlo.
- Copiar el bloque JSON `icons` para tu `manifest.json` (incluye `purpose: "any maskable"` para 192 y 512).
- Descargar automáticamente los tamaños básicos con nombres genéricos recomendados.

## Características principales

- Tamaños disponibles (selector): 16, 32, 36, 48, 72, 96, 120, 144, 152, 167, 180, 192, 256, 384, 512.
- Botón "Descargar básicos":
  - 16×16 → `img/favicon-16x16.png`
  - 32×32 → `img/favicon-32x32.png`
  - 180×180 → `img/apple-touch-icon.png`
  - 192×192 → `img/icon-192x192.png`
  - 512×512 → `img/icon-512x512.png`
- Enlaces en `<head>` (`index.php`) ya preparados para 16×16, 32×32 y 180×180.
- Al descargar individualmente, se solicita un nombre base (sugerido desde el nombre del archivo original). El archivo se guarda como `img/<nombre>-<ancho>x<alto>.<ext>`.

## Estructura

- `index.php`: interfaz principal y enlaces a CSS/JS.
- `css/styles.css`: estilos.
- `js/resize.js`: lógica de redimensionamiento, descargas y botón "Descargar básicos".
- `js/manifest.js`: registro y render del bloque `icons` para manifest.
- `js/darkmode.js`, `js/lang.js`: utilidades.
- `img/`: carpeta para los iconos generados por el usuario (ignorados por Git). Se incluye un `.gitkeep` para mantener la carpeta en el repo.

## Recomendaciones de uso

1. Carga una imagen en la aplicación.
2. Opcional: elige un color de fondo.
3. Usa "Redimensionar" para generar un tamaño concreto y descargarlo, o
4. Usa "Descargar básicos" para obtener los tamaños mínimos recomendados y que coinciden con los enlaces del `<head>`.
5. Copia el bloque `icons` desde el panel y pégalo en tu `manifest.json`.

## Manifest (PWA)

- Mínimos recomendados: 192×192 y 512×512 (se añade `purpose: "any maskable"`).
- iOS: usa `apple-touch-icon` de 180×180 (ya enlazado desde `index.php`).
- Favicons: 16×16 y 32×32 (ya enlazados desde `index.php`).

### Manifest real

Este proyecto incluye un `manifest.json` mínimo ya enlazado desde `index.php`:

- `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`.
- `icons`: `img/icon-192x192.png` y `img/icon-512x512.png` con `purpose: any maskable`.

Para que el manifest tenga efecto, asegúrate de generar esos archivos PNG con el botón "Descargar básicos".

## Service Worker (offline básico)

- Archivo: `js/sw.js` (cache-first simple para CSS/JS/manifest e iconos base).
- Registro: desde `js/pwa.js` y cargado en `index.php`.

Cómo probar el modo offline:
1. Accede a la app desde `http://localhost/...` (no file://).
2. Abre DevTools → Application → Service Workers y verifica que está "activated".
3. Marca "Offline" en la pestaña Network y recarga: la app debe seguir cargando gracias a la caché.

Cómo instalar como app (PWA):
- En Chrome/Edge móvil o escritorio, usa "Instalar" en la barra de URL o el menú. El icono/tema provienen del `manifest.json`.

## Desarrollo

- PHP simple con módulos JS. No hay dependencias externas.
- Buenas prácticas:
  - Todo CSS en `css/` y JS en `js/`.
  - Imágenes generadas por el usuario en `img/` (no se versionan).

## Licencia

MIT
