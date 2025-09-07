# Changelog

Este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/) y el formato está inspirado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [1.0.1] - 2025-09-07

### Corregido

- Registro del Service Worker desde la raíz (`sw.js`) para evitar problemas de alcance (scope) en subdirectorios.
- Precarga (precache) tolerante a errores en `sw.js`: ignora 404 y solo cachea respuestas OK, evitando fallos en la instalación del SW.
- Nombres de descarga corregidos: ya no se antepone `img/` en el nombre sugerido por el navegador.

## [1.0.0] - 2025-09-07

### Añadido

- Aplicación inicial para redimensionar iconos con soporte de PWA y favicons.
- Selector de tamaños: 16, 32, 36, 48, 72, 96, 120, 144, 152, 167, 180, 192, 256, 384, 512.
- Botón "Descargar básicos" para generar:
  - `img/favicon-16x16.png`
  - `img/favicon-32x32.png`
  - `img/apple-touch-icon.png`
  - `img/icon-192x192.png`
  - `img/icon-512x512.png`
- Bloque del manifest con `purpose: "any maskable"` para 192 y 512.
- Enlaces en `index.php` para favicon 16/32 y apple-touch-icon 180.
- `manifest.json` mínimo enlazado desde `index.php`.
- Service Worker básico (cache-first) y registro PWA.
- README y LICENSE (MIT).

---

Enlaces de release:

- 1.0.1: [https://github.com/scorpio21/Redimensionar_Icono/releases/tag/v1.0.1](https://github.com/scorpio21/Redimensionar_Icono/releases/tag/v1.0.1)
- 1.0.0: [https://github.com/scorpio21/Redimensionar_Icono/releases/tag/v1.0.0](https://github.com/scorpio21/Redimensionar_Icono/releases/tag/v1.0.0)
