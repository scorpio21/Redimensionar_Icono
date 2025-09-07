<?php /* index.php: Entrada principal de la app de redimensión de iconos */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redimensionar Icono</title>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <!-- Favicons & Apple Touch Icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png">
</head>
<body>
<div class="header-bar">
  <select id="langSelect" class="lang-select" aria-label="Idioma">
    <option value="es">ES</option>
    <option value="en">EN</option>
  </select>
  <button id="toggleDark" class="toggle-dark" title="Modo oscuro/Light mode" aria-label="Modo oscuro"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg></button>
</div>

<h1>Redimensionar Icono para Manifest</h1>
<div class="container">
    <h2>Paso 1: Seleccionar imagen</h2>
    <label for="imageInput">Seleccionar imagen:</label>
    <input type="file" id="imageInput" accept="image/*">
    <div id="dropZone" class="drop-zone">Arrastra tu imagen aquí o haz click para seleccionar</div>
    <div id="originalImageContainer" class="image-preview"></div>
    <h2>Paso 2: Configurar icono</h2>
    <label for="iconSize">Tamaño:</label>
    <select id="iconSize">
        <option value="16">16x16</option>
        <option value="32">32x32</option>
        <option value="36">36x36</option>
        <option value="48">48x48</option>
        <option value="72">72x72</option>
        <option value="96">96x96</option>
        <option value="120">120x120</option>
        <option value="144">144x144</option>
        <option value="152">152x152</option>
        <option value="167">167x167</option>
        <option value="180">180x180</option>
        <option value="192">192x192</option>
        <option value="256">256x256</option>
        <option value="384">384x384</option>
        <option value="512">512x512</option>
    </select>
    <label for="bgColor">Fondo:</label>
    <input type="color" id="bgColor" value="#ffffff">
    <button id="resizeButton">Redimensionar</button>
    <div id="feedbackMsg" class="feedback"></div>
    <div id="resizedImageContainer" class="image-preview"></div>
    <div class="actions">
      <button id="downloadButton" disabled><span class="download-text">Descargar imagen</span></button>
      <button id="downloadAllButton" disabled><span class="download-all-text">Descargar básicos</span></button>
      <select id="formatSelect">
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WEBP</option>
      </select>
    </div>
    <div class="mobile-preview-block">
      <h3>Vista móvil</h3>
      <div id="mobileScreen" class="mobile-preview"></div>
    </div>
    <div class="manifest-block">
      <h3>Bloque Manifest</h3>
      <pre id="manifestBlock">"icons": []</pre>
      <button id="copyManifest">Copiar bloque JSON</button>
      <span id="copyMsg" class="copy-msg"></span>
    </div>
</div>

<script type="module">
  import { setDarkMode, setupDarkModeButton } from './js/darkmode.js';
  import { setupLangSelector, updateLangTexts } from './js/lang.js';
  import { setupResizeEvents } from './js/resize.js';
  import { setupCopyManifest } from './js/manifest.js';

  setupDarkModeButton();
  setupLangSelector(updateLangTexts);
  setupResizeEvents();
  updateLangTexts();
  setupCopyManifest();
</script>
</body>
</html>
