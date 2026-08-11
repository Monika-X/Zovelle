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

export default SizeGuide;
