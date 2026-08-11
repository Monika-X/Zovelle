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

export default HeroSlider;
