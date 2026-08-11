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

export default Lookbook;
