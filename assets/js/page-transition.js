/**
 * ZOVELLE - Page Transitions
 */

class PageTransition {
  constructor() {
    this.links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');
    this.init();
  }

  init() {
    // Create transition element
    this.transitionEl = document.createElement('div');
    this.transitionEl.classList.add('page-transition');
    document.body.appendChild(this.transitionEl);

    // Initial load animation
    window.addEventListener('load', () => {
      this.transitionEl.classList.remove('is-active');
    });

    // Handle back button cache (bfcache)
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        this.transitionEl.classList.remove('is-active');
      }
    });

    // Handle internal link clicks
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const url = link.getAttribute('href');
        if (url && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
          e.preventDefault();
          this.transitionEl.classList.add('is-active');
          
          setTimeout(() => {
            window.location.href = url;
          }, 800); // Matches transition duration in CSS
        }
      });
    });
  }
}

export default PageTransition;
