/**
 * ZOVELLE - Master Initialization File
 */

import Navbar from './navbar.js';
import HeroSlider from './hero-slider.js';
import ScrollReveal from './scroll-reveal.js';
import ImageZoom from './image-zoom.js';
import PageTransition from './page-transition.js';
import DarkMode from './dark-mode.js';
import RTLToggle from './rtl.js';
import Lookbook from './lookbook.js';
import SizeGuide from './size-guide.js';
import Filters from './filters.js';
import NewsletterForms from './newsletter.js';

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
  new Filters();
  new NewsletterForms();

  // Remove loader if present
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // Small delay to let initial animations queue up
  }
});
