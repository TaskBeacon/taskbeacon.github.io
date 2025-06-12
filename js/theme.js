const toggle = document.getElementById('theme-toggle');
if (toggle) {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    document.body.classList.add('dark');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
