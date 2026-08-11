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

export default ImageZoom;
