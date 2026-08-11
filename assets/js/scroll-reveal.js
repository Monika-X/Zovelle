/**
 * ZOVELLE - Scroll Reveal (Intersection Observer)
 */

class ScrollReveal {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% visible
    };
    
    this.init();
  }

  init() {
    if (this.revealElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);

    this.revealElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing to animate only once
        observer.unobserve(entry.target);
      }
    });
  }
}

export default ScrollReveal;
