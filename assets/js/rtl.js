/**
 * ZOVELLE - RTL Toggle
 */

class RTLToggle {
  constructor() {
    this.html = document.documentElement;
    this.toggles = document.querySelectorAll('.rtl-toggle');
    this.init();
  }

  init() {
    // Restore persisted state
    const isRTL = localStorage.getItem('zovelle-dir') === 'rtl';
    if (isRTL) {
      this.html.setAttribute('dir', 'rtl');
    }
    this.updateButtons();

    this.toggles.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

    // Expose globally for console access
    window.toggleRTL = () => this.toggle();
  }

  toggle() {
    const isRTL = this.html.getAttribute('dir') === 'rtl';
    if (isRTL) {
      this.html.removeAttribute('dir');
      localStorage.setItem('zovelle-dir', 'ltr');
    } else {
      this.html.setAttribute('dir', 'rtl');
      localStorage.setItem('zovelle-dir', 'rtl');
    }
    this.updateButtons();
  }

  updateButtons() {
    const isRTL = this.html.getAttribute('dir') === 'rtl';
    this.toggles.forEach(btn => {
      btn.textContent = isRTL ? 'LTR' : 'RTL';
    });
  }
}

export default RTLToggle;
