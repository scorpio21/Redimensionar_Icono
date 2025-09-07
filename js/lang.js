// lang.js

export const TEXTS = {
  es: {
    dimsOrig: t => `Original: ${t}`,
    dimsResized: (n,c) => `Redimensionado: ${n} (fondo ${c})`,
    downloaded: '¡Imagen descargada!',
    mobilePreview: 'Vista móvil',
    dark: 'Modo oscuro',
    light: 'Modo claro',
    copy: 'Copiar bloque JSON',
    copied: '¡Copiado!',
    downloadAll: 'Descargar todos',
  },
  en: {
    dimsOrig: t => `Original: ${t}`,
    dimsResized: (n,c) => `Resized: ${n} (bg ${c})`,
    downloaded: 'Image downloaded!',
    mobilePreview: 'Mobile preview',
    dark: 'Dark mode',
    light: 'Light mode',
    copy: 'Copy JSON block',
    copied: 'Copied!',
    downloadAll: 'Download all',
  }
};

export function updateLangTexts() {
  const lang = localStorage.getItem('lang') || 'es';
  window.lang = lang;
  window.TEXTS = TEXTS;
  document.querySelector('h1').textContent = 'Redimensionar Icono para Manifest';
  document.querySelector('h2').textContent = lang === 'es' ? 'Paso 1: Seleccionar imagen' : 'Step 1: Select image';
  document.querySelector('label[for="imageInput"]').textContent = lang === 'es' ? 'Seleccionar imagen:' : 'Select image:';
  document.getElementById('resizeButton').textContent = lang === 'es' ? 'Redimensionar' : 'Resize';
  document.getElementById('downloadButton').querySelector('.download-text').textContent = lang === 'es' ? 'Descargar imagen' : 'Download image';
  document.getElementById('downloadAllButton').querySelector('.download-all-text').textContent = TEXTS[lang].downloadAll;
  document.getElementById('copyManifest').textContent = TEXTS[lang].copy;
  // Puedes añadir más textos dinámicos aquí
}

export function setupLangSelector(updateLangTexts) {
  const langSelect = document.getElementById('langSelect');
  let lang = localStorage.getItem('lang') || 'es';
  langSelect.value = lang;
  langSelect.addEventListener('change', function() {
    lang = langSelect.value;
    localStorage.setItem('lang', lang);
    updateLangTexts();
  });
}
