// manifest.js

let generatedIcons = [];

function renderManifestBlock() {
  const manifestBlock = document.getElementById('manifestBlock');
  const manifest = { icons: generatedIcons.map(icon => ({
    src: icon.path,
    sizes: `${icon.size}x${icon.size}`,
    type: icon.type,
    // Añade purpose maskable para 192 y 512
    ...(Number(icon.size) === 192 || Number(icon.size) === 512 ? { purpose: 'any maskable' } : {})
  })) };
  console.log('[renderManifestBlock] Estado actual de icons:', generatedIcons);
  manifestBlock.textContent = JSON.stringify(manifest, null, 2);
}

export function registerIcon(icon) {
  console.log('[registerIcon] Registrando icono:', icon);
  generatedIcons = generatedIcons.filter(i => i.path !== icon.path);
  generatedIcons.push(icon);
  renderManifestBlock();
}

export function setupCopyManifest() {
  const copyManifest = document.getElementById('copyManifest');
  const manifestBlock = document.getElementById('manifestBlock');
  const copyMsg = document.getElementById('copyMsg');
  copyManifest.addEventListener('click', () => {
    navigator.clipboard.writeText(manifestBlock.textContent)
      .then(() => {
        copyMsg.textContent = (window.TEXTS?.[window.lang]?.copied || '¡Copiado!');
        setTimeout(() => { copyMsg.textContent = ''; }, 200);
        setTimeout(() => { location.reload(); }, 400); // Recarga tras feedback
      });
  });
}
