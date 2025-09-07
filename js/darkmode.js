// darkmode.js
export function setDarkMode(on) {
  document.body.classList.toggle('dark', on);
  localStorage.setItem('dark', on);
}

export function setupDarkModeButton() {
  const toggleDark = document.getElementById('toggleDark');
  let dark = localStorage.getItem('dark') === 'true';
  setDarkMode(dark);
  toggleDark.addEventListener('click', () => {
    dark = !dark;
    setDarkMode(dark);
  });
}
