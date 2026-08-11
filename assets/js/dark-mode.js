/**
 * ZOVELLE - Dark Mode Toggle
 */

class DarkMode {
  constructor() {
    this.toggles = document.querySelectorAll('.dark-mode-toggle');
    this.body = document.body;
    this.init();
  }

  init() {
    // Check local storage
    const isDark = localStorage.getItem('zovelle-theme') === 'dark';
    if (isDark) {
      this.body.classList.add('dark-mode');
    }

    // Since we don't have a UI button in the HTML yet, we expose it globally for testing or future UI
    window.toggleDarkMode = () => this.toggle();

    this.toggles.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }

  toggle() {
    this.body.classList.toggle('dark-mode');
    const isDark = this.body.classList.contains('dark-mode');
    localStorage.setItem('zovelle-theme', isDark ? 'dark' : 'light');
  }
}

export default DarkMode;
