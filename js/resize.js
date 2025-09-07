// resize.js
// Lógica principal de selección, redimensionamiento y descarga de iconos

let originalImage = null;
let resizedCanvas = null;
import { registerIcon } from './manifest.js';
// Nombre base por defecto para guardar archivos
let defaultBaseName = 'icon';

export function setupResizeEvents() {
  const imageInput = document.getElementById('imageInput');
  const dropZone = document.getElementById('dropZone');
  const originalImageContainer = document.getElementById('originalImageContainer');
  const resizeButton = document.getElementById('resizeButton');
  const resizedImageContainer = document.getElementById('resizedImageContainer');
  const downloadButton = document.getElementById('downloadButton');
  const downloadAllButton = document.getElementById('downloadAllButton');
  const feedbackMsg = document.getElementById('feedbackMsg');

  // Drag & drop
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', e => {
    dropZone.classList.remove('dragover');
  });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      imageInput.files = e.dataTransfer.files;
      imageInput.dispatchEvent(new Event('change'));
    }
  });
  dropZone.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    // Sugerir nombre base a partir del archivo original
    try {
      const suggested = file.name.replace(/\.[^.]+$/, '');
      if (suggested) defaultBaseName = suggested;
    } catch (_) { /* noop */ }
    const reader = new FileReader();
    reader.onload = function(event) {
      originalImage = new Image();
      originalImage.src = event.target.result;
      originalImage.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxDimension = Math.max(originalImage.width, originalImage.height);
        const scale = 300 / maxDimension;
        canvas.width = originalImage.width * scale;
        canvas.height = originalImage.height * scale;
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
        const previewDiv = document.createElement('div');
        previewDiv.className = 'checker-bg';
        previewDiv.appendChild(canvas);
        originalImageContainer.innerHTML = '';
        originalImageContainer.appendChild(previewDiv);
        const dimensions = document.createElement('p');
        // TEXTS y lang deben ser globales o importados
        dimensions.textContent = (window.TEXTS?.[window.lang]?.dimsOrig || (t=>t))(`${originalImage.width}x${originalImage.height} px`);
        originalImageContainer.appendChild(dimensions);
        resizeButton.disabled = false;
        // Habilitar descarga de básicos al tener imagen cargada
        if (downloadAllButton) downloadAllButton.disabled = false;
      };
    };
    reader.readAsDataURL(file);
  });

  resizeButton.addEventListener('click', function() {
    feedbackMsg.textContent = '';
    if (!originalImage) return;
    resizedImageContainer.innerHTML = '';
    const size = parseInt(document.getElementById('iconSize').value, 10);
    resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = size;
    resizedCanvas.height = size;
    const ctx = resizedCanvas.getContext('2d');
    // Fondo cuadriculado
    ctx.save();
    for(let y=0;y<size;y+=20) for(let x=0;x<size;x+=20) ctx.fillStyle = ((x+y)%40===0)?'#eee':'#fff', ctx.fillRect(x,y,20,20);
    ctx.restore();
    // Fondo según selección del usuario
    const bgColor = document.getElementById('bgColor').value;
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(0, 0, size, size);
    ctx.globalAlpha = 1;
    // Calcular dimensiones manteniendo proporción
    const aspectRatio = originalImage.width / originalImage.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    if (aspectRatio > 1) {
      drawWidth = size;
      drawHeight = size / aspectRatio;
      offsetY = (size - drawHeight) / 2;
    } else {
      drawHeight = size;
      drawWidth = size * aspectRatio;
      offsetX = (size - drawWidth) / 2;
    }
    ctx.drawImage(originalImage, offsetX, offsetY, drawWidth, drawHeight);
    // Mostrar preview en checker-bg
    const previewDiv = document.createElement('div');
    previewDiv.className = 'checker-bg';
    previewDiv.appendChild(resizedCanvas);
    resizedImageContainer.appendChild(previewDiv);
    // Mobile preview
    const mobileScreen = document.getElementById('mobileScreen');
    mobileScreen.innerHTML = '';
    const mobileIcon = document.createElement('img');
    mobileIcon.src = resizedCanvas.toDataURL();
    mobileIcon.alt = 'Icono preview';
    mobileIcon.style.width = '96px';
    mobileIcon.style.height = '96px';
    mobileScreen.appendChild(mobileIcon);
    // Dimensiones
    const dimensions = document.createElement('p');
    let colorDesc = bgColor;
    dimensions.textContent = (window.TEXTS?.[window.lang]?.dimsResized || ((t,c)=>`${t} fondo ${c}`))(`${size}x${size} px`, colorDesc);
    resizedImageContainer.appendChild(dimensions);
    // Guardar tamaño para descarga
    resizedCanvas.dataset.size = size;
    downloadButton.disabled = false;
  });

  downloadButton.addEventListener('click', function() {
    feedbackMsg.textContent = '';
    if (!resizedCanvas) return;
    const size = resizedCanvas.dataset.size || '192';
    // Pedir nombre al usuario antes de guardar
    let userBase = window.prompt('Nombre de archivo (sin extensión):', defaultBaseName);
    if (userBase === null) { // Cancelado
      feedbackMsg.textContent = (window.TEXTS?.[window.lang]?.cancelled || 'Operación cancelada.');
      setTimeout(()=>{feedbackMsg.textContent='';}, 2000);
      return;
    }
    userBase = (userBase || '').trim();
    if (!userBase) {
      userBase = defaultBaseName;
    }
    // Sanitizar nombre: solo letras, números, guiones y guiones bajos
    userBase = userBase
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
      .replace(/[^a-zA-Z0-9-_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^[-_]+|[-_]+$/g, '')
      .toLowerCase();
    if (!userBase) userBase = 'icono';
    const format = document.getElementById('formatSelect').value;
    let mime = 'image/png', ext = 'png';
    if(format==='jpg'){ mime='image/jpeg'; ext='jpg'; }
    if(format==='webp'){ mime='image/webp'; ext='webp'; }
    const link = document.createElement('a');
    link.download = `img/${userBase}-${size}x${size}.${ext}`;
    link.href = resizedCanvas.toDataURL(mime);
    link.click();
    // --- Registrar icono generado en manifest ---
    const iconPath = `img/${userBase}-${size}x${size}.${ext}`;
    registerIcon({
      path: iconPath,
      size: size,
      type: mime,
      dataurl: link.href
    });
    // --- Fin registro manifest ---
    feedbackMsg.textContent = (window.TEXTS?.[window.lang]?.downloaded || '¡Imagen descargada!');
    setTimeout(()=>{feedbackMsg.textContent='';}, 3000);
  });

  // --- Descarga de básicos: 16, 32, 180, 192, 512 (PNG) ---
  function crearIconoYDescargar(size, filename) {
    if (!originalImage) return;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    // Fondo cuadriculado
    ctx.save();
    for(let y=0;y<size;y+=20){
      for(let x=0;x<size;x+=20){
        ctx.fillStyle = ((x+y)%40===0)?'#eee':'#fff';
        ctx.fillRect(x,y,20,20);
      }
    }
    ctx.restore();
    // Fondo según selección del usuario
    const bgColor = document.getElementById('bgColor').value;
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(0, 0, size, size);
    ctx.globalAlpha = 1;
    // Ajuste de imagen manteniendo proporción
    const aspectRatio = originalImage.width / originalImage.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    if (aspectRatio > 1) {
      drawWidth = size;
      drawHeight = size / aspectRatio;
      offsetY = (size - drawHeight) / 2;
    } else {
      drawHeight = size;
      drawWidth = size * aspectRatio;
      offsetX = (size - drawWidth) / 2;
    }
    ctx.drawImage(originalImage, offsetX, offsetY, drawWidth, drawHeight);
    const mime = 'image/png';
    const ext = 'png';
    const link = document.createElement('a');
    link.download = `img/${filename}.${ext}`;
    link.href = canvas.toDataURL(mime);
    link.click();
    registerIcon({
      path: `img/${filename}.${ext}`,
      size: size,
      type: mime,
      dataurl: link.href
    });
  }

  if (downloadAllButton) {
    downloadAllButton.addEventListener('click', function(){
      feedbackMsg.textContent = '';
      if (!originalImage) return;
      // Lista de básicos y nombres genéricos
      const basicos = [
        { size: 16, name: 'favicon-16x16' },
        { size: 32, name: 'favicon-32x32' },
        { size: 180, name: 'apple-touch-icon' },
        { size: 192, name: 'icon-192x192' },
        { size: 512, name: 'icon-512x512' },
      ];
      basicos.forEach(item => crearIconoYDescargar(item.size, item.name));
      feedbackMsg.textContent = (window.TEXTS?.[window.lang]?.downloadedAll || '¡Básicos descargados!');
      setTimeout(()=>{feedbackMsg.textContent='';}, 3000);
    });
  }
}
