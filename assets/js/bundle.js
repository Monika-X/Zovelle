
/* --- navbar.js --- */
/**
 * ZOVELLE - Navbar Interaction
 */

class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.body = document.body;
    
    this.init();
  }

  init() {
    if (!this.navbar) return;
    
    // Scroll listener for sticky nav
    window.addEventListener('scroll', () => this.handleScroll());
    this.handleScroll(); // Check initial state
    
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    // Toggle icon animation could go here
    if (this.navMenu.classList.contains('active')) {
      this.navbar.classList.add('scrolled'); // Ensure bg is solid when open
    } else {
      this.handleScroll(); // Re-evaluate based on scroll pos
    }
  }
}



/* --- hero-slider.js --- */
/**
 * ZOVELLE - Hero Slider Interaction
 */

class HeroSlider {
  constructor() {
    this.slider = document.querySelector('.hero-slider');
    if (!this.slider) return;

    this.slides = Array.from(this.slider.querySelectorAll('.hero-slide'));
    this.dots = Array.from(document.querySelectorAll('.slider-dot'));
    this.currentIndex = 0;
    this.intervalTime = 6000; // 6 seconds per slide
    this.interval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Set initial active state
    this.slides[this.currentIndex].classList.add('active');
    if (this.dots.length > 0) {
      this.dots[this.currentIndex].classList.add('active');
    }

    // Add click listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetInterval();
      });
    });

    this.startInterval();
  }

  goToSlide(index) {
    if (index === this.currentIndex) return;

    // Remove active class from current
    this.slides[this.currentIndex].classList.remove('active');
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.remove('active');
    }

    // Update index
    this.currentIndex = index;

    // Add active class to new
    this.slides[this.currentIndex].classList.add('active');
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.add('active');
    }
  }

  nextSlide() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.slides.length) {
      nextIndex = 0;
    }
    this.goToSlide(nextIndex);
  }

  startInterval() {
    this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
  }

  resetInterval() {
    clearInterval(this.interval);
    this.startInterval();
  }
}



/* --- scroll-reveal.js --- */
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



/* --- image-zoom.js --- */
/**
 * ZOVELLE - Image Zoom Effect
 */

class ImageZoom {
  constructor() {
    this.images = document.querySelectorAll('.card-product-img-wrapper img, .hero-image');
    this.init();
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

    this.images.forEach(img => {
      // Adding a subtle mousemove parallax/zoom effect
      img.addEventListener('mousemove', (e) => this.handleMouseMove(e, img));
      img.addEventListener('mouseleave', () => this.handleMouseLeave(img));
    });
  }

  handleMouseMove(e, img) {
    const { left, top, width, height } = img.parentElement.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Move the transform origin based on mouse position
    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    img.style.transform = 'scale(1.15)';
  }

  handleMouseLeave(img) {
    img.style.transformOrigin = 'center center';
    img.style.transform = 'scale(1)';
  }
}



/* --- page-transition.js --- */
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



/* --- dark-mode.js --- */
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



/* --- rtl.js --- */
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



/* --- lookbook.js --- */
/**
 * ZOVELLE - Lookbook Lightbox
 */

class Lookbook {
  constructor() {
    this.triggers = document.querySelectorAll('.lookbook-trigger');
    this.init();
  }

  init() {
    if (this.triggers.length === 0) return;
    
    // Scaffolding for a lightbox gallery
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Open Lookbook Lightbox for:', trigger.href || 'Image');
        // Implementation would create a full-screen modal with the image
      });
    });
  }
}



/* --- size-guide.js --- */
/**
 * ZOVELLE - Size Guide Modal
 */

class SizeGuide {
  constructor() {
    this.triggers = document.querySelectorAll('.size-guide-trigger');
    this.init();
  }

  init() {
    if (this.triggers.length === 0) return;
    
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Open Size Guide Modal');
        // Implementation would open a modal with size charts
      });
    });
  }
}



/* --- cart.js --- */
/**
 * ZOVELLE - Cart Sidebar
 */

class Cart {
  constructor() {
    this.cartIcon = document.querySelector('button[aria-label="Cart"]');
    this.addButtons = document.querySelectorAll('.card-product-action .btn');
    this.init();
  }

  init() {
    if (this.cartIcon) {
      this.cartIcon.addEventListener('click', () => {
        console.log('Toggle Cart Sidebar');
        // Implementation would slide in the cart sidebar
      });
    }

    this.addButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = e.target.closest('.card-product').querySelector('.card-product-title').innerText;
        console.log(`Added to cart: ${productName}`);
        
        // Visual feedback
        const originalText = btn.innerText;
        btn.innerText = 'Added';
        setTimeout(() => {
          btn.innerText = originalText;
        }, 2000);
      });
    });
  }
}



/* --- filters.js --- */
/**
 * ZOVELLE - Content Filters
 */

class Filters {
  constructor() {
    this.filterButtons = document.querySelectorAll('.categories-bar .btn, section .btn-outline[style*="border-radius: 50px"]');
    this.init();
  }

  init() {
    if (this.filterButtons.length === 0) return;

    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Simple visual toggle for filter buttons (like on the blog page)
        this.filterButtons.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        
        e.target.classList.remove('btn-outline');
        e.target.classList.add('btn-primary');
        
        console.log(`Filtering by: ${e.target.innerText}`);
      });
    });
  }
}



/* --- main.js --- */
/**
 * ZOVELLE - Master Initialization File
 */













document.addEventListener('DOMContentLoaded', () => {
  // Initialize core components
  new Navbar();
  new HeroSlider();
  new ScrollReveal();
  new ImageZoom();
  new PageTransition();
  new DarkMode();
  new RTLToggle();
  
  // Initialize interactive features
  new Lookbook();
  new SizeGuide();
  new Cart();
  new Filters();

  // Remove loader if present
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // Small delay to let initial animations queue up
  }
});
