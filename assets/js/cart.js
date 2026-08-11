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

export default Cart;
