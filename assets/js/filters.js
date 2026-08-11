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

export default Filters;
