const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pagesDir = path.join(dir, 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
files.push('../index.html'); // include root index.html

const newNavTemplate = (isIndex) => {
    const prefix = isIndex ? 'pages/' : '';
    const indexPrefix = isIndex ? '' : '../';
    return `<ul class="nav-menu">
        <li><a href="${indexPrefix}index.html" class="nav-link link-underline">Home</a></li>
        <li><a href="${prefix}about.html" class="nav-link link-underline">About</a></li>
        <li><a href="${prefix}services.html" class="nav-link link-underline">Services</a></li>
        <li><a href="${prefix}blog.html" class="nav-link link-underline">Blog</a></li>
        <li><a href="${prefix}contact.html" class="nav-link link-underline">Contact</a></li>
      </ul>`;
};

const newFooterTopTemplate = (isIndex) => {
    const prefix = isIndex ? 'pages/' : '';
    return `<div class="footer-top grid grid-4">
        <div>
          <div class="footer-brand">ZOVELLE</div>
          <p style="color: rgba(255,255,255,0.7); max-width: 250px;">Elevating the everyday through uncompromising craftsmanship.</p>
        </div>
        <div>
          <h4 class="footer-col-title">Pages</h4>
          <a href="${prefix}about.html" class="footer-link">About</a>
          <a href="${prefix}services.html" class="footer-link">Services</a>
          <a href="${prefix}blog.html" class="footer-link">Blog</a>
          <a href="${prefix}contact.html" class="footer-link">Contact</a>
        </div>
        <div>
          <h4 class="footer-col-title">Links</h4>
          <a href="${prefix}home-2.html" class="footer-link">Home 2</a>
          <a href="${prefix}blog-detail.html" class="footer-link">Blog Detail</a>
          <a href="${prefix}sitemap.html" class="footer-link">Sitemap</a>
          <a href="${prefix}terms.html" class="footer-link">Terms</a>
        </div>
        <div>
          <h4 class="footer-col-title">Newsletter</h4>
          <p style="margin-bottom: 1rem; color: rgba(255,255,255,0.7);">Subscribe for exclusive access to new collections and events.</p>
          <div class="input-group">
            <input type="email" class="input-field" placeholder=" " style="color: white; border-bottom-color: rgba(255,255,255,0.3);">
            <label class="input-label" style="color: rgba(255,255,255,0.5);">Email Address</label>
          </div>
        </div>
      </div>`;
};

const newFooterBottomTemplate = (isIndex) => {
    const prefix = isIndex ? 'pages/' : '';
    return `<div class="footer-bottom">
        <div>&copy; 2026 ZOVELLE. All Rights Reserved.</div>
        <div style="display: flex; gap: 1rem;">
          <a href="${prefix}privacy-policy.html">Privacy Policy</a>
          <a href="${prefix}terms.html">Terms</a>
        </div>
      </div>`;
};


files.forEach(file => {
    const filePath = file === '../index.html' ? path.join(dir, 'index.html') : path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const isIndex = file === '../index.html';
    
    // Replace nav-menu
    content = content.replace(/<ul class="nav-menu">[\s\S]*?<\/ul>/, newNavTemplate(isIndex));
    
    // Replace footer-top
    content = content.replace(/<div class="footer-top grid grid-4">[\s\S]*?<\/div>\s*<\/div>\s*<div class="footer-bottom">/, newFooterTopTemplate(isIndex) + '\n      <div class="footer-bottom">');
    
    // Replace footer-bottom
    content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/, newFooterBottomTemplate(isIndex) + '\n    </div>\n  </footer>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});
