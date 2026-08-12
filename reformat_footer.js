const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  ...fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f)
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const isIndex = file === 'index.html';
  const p = isIndex ? 'pages/' : '';
  const home = isIndex ? 'index.html' : '../index.html';

  const newFooter = `<footer class="footer">
    <div class="container">
      <div class="footer-top grid grid-4">
        <div>
          <a href="${home}" class="footer-brand" style="margin-bottom: 1.5rem;">
            <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="7" width="18" height="18" transform="rotate(45 16 16)" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 11.5h11L13.5 20.5h11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ZOVELLE
          </a>
          <p style="color: rgba(255,255,255,0.7); max-width: 280px; margin-bottom: 2rem; font-size: 0.9rem;">London's most exclusive destination for bespoke tailoring and luxury outerwear. A curated sanctuary where every piece tells an extraordinary story.</p>
          <div style="display: flex; gap: 1rem;">
            <a href="https://instagram.com/zovelle" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com/zovelle" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.53-4H14V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://x.com/zovelle" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="X">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href="https://youtube.com/@zovelle" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 class="footer-col-title">Collections</h4>
          <a href="#" class="footer-link">Luxury Outerwear</a>
          <a href="#" class="footer-link">Bespoke Suits</a>
          <a href="#" class="footer-link">Accessories</a>
          <a href="#" class="footer-link">Gifting</a>
          <a href="#" class="footer-link">Atelier Services</a>
        </div>
        <div>
          <h4 class="footer-col-title">Maison</h4>
          <a href="${home}" class="footer-link">Home</a>
          <a href="${p}home-2.html" class="footer-link">Home 2</a>
          <a href="${p}about.html" class="footer-link">About</a>
          <a href="${p}services.html" class="footer-link">Services</a>
          <a href="${p}blog.html" class="footer-link">Journal</a>
          <a href="${p}contact.html" class="footer-link">Contact</a>
        </div>
        <div>
          <h4 class="footer-col-title">The Private List</h4>
          <p style="margin-bottom: 1.5rem; color: rgba(255,255,255,0.7); font-size: 0.9rem;">Receive exclusive previews, private sale invitations, and styling insights before anyone else.</p>
          <form style="display: flex; gap: 0.75rem;" onsubmit="event.preventDefault(); alert('Thank you for joining The Private List! Please check your email to confirm your subscription.'); this.reset();">
            <input type="email" placeholder="Your email" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1rem; color: white; border-radius: 4px; flex: 1; min-width: 0;" required>
            <button type="submit" class="btn" style="background: var(--color-champagne); color: var(--color-plum); padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 4px; border: none; cursor: pointer;">JOIN</button>
          </form>
        </div>
      </div>
      
      <div class="footer-separator">
        <div class="footer-separator-icon">
          <div class="footer-separator-dot"></div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div>&copy; 2026 ZOVELLE. All rights reserved. Established 1987, London.</div>
        <div style="display: flex; gap: 1.5rem;">
          <a href="${p}privacy-policy.html">Privacy Policy</a>
          <a href="${p}terms.html">Terms & Conditions</a>
          <a href="${p}sitemap.html">Sitemap</a>
        </div>
      </div>
    </div>
    
    <a href="#" class="scroll-top-btn" aria-label="Scroll to top" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </a>
  </footer>`;

  content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, newFooter);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
