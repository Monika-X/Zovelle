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

export default Navbar;
