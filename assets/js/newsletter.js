/**
 * ZOVELLE - Newsletter & Email Form Submissions
 * Inline success feedback with field reset (no page reload).
 */

class NewsletterForms {
  constructor() {
    this.bindFooterForms();
    this.bindSubscribeButtons();
    this.bindGeneralForms();
  }

  bindFooterForms() {
    document.querySelectorAll('footer form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        if (!email || !this.isValidEmail(email.value.trim())) {
          if (email) email.focus();
          return;
        }
        form.reset();
        this.showMessage(form, 'Thank you for joining The Private List! Please check your email to confirm your subscription.');
      });
    });
  }

  bindSubscribeButtons() {
    const buttons = document.querySelectorAll('.subscribe-strip .btn-outline, [data-subscribe]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input[type="email"]');
        if (!input) return;
        if (!this.isValidEmail(input.value.trim())) {
          input.focus();
          return;
        }
        input.value = '';
        const strip = btn.closest('.subscribe-strip');
        if (strip) {
          const msg = strip.querySelector('.subscribe-msg');
          if (msg) msg.hidden = false;
          btn.disabled = true;
          btn.textContent = 'Subscribed';
        } else {
          this.showMessage(btn.parentElement, 'Thank you - you are now subscribed.', true);
        }
      });
    });
  }

  bindGeneralForms() {
    document.querySelectorAll('form[data-success]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        form.reset();
        this.showMessage(form, form.getAttribute('data-success'));
      });
    });
  }

  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  showMessage(anchor, message, forceDark) {
    const onDark = forceDark || !!anchor.closest('footer') || !!anchor.closest('[style*="color-plum"]');
    let msg = anchor.parentElement.querySelector('.form-success-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-success-msg';
      msg.style.marginTop = '0.75rem';
      msg.style.fontSize = '0.9rem';
      anchor.insertAdjacentElement('afterend', msg);
    }
    msg.style.color = onDark ? 'var(--color-champagne)' : 'var(--text-primary)';
    msg.textContent = message;
  }
}