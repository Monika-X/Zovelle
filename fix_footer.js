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

  const newPages = `<h4 class="footer-col-title">Pages</h4>
          <a href="${home}" class="footer-link">Home</a>
          <a href="${p}home-2.html" class="footer-link">Home 2</a>
          <a href="${p}about.html" class="footer-link">About</a>
          <a href="${p}services.html" class="footer-link">Services</a>
          <a href="${p}blog.html" class="footer-link">Blog</a>
          <a href="${p}contact.html" class="footer-link">Contact</a>`;
          
  const newLinks = `<h4 class="footer-col-title">Links</h4>
          <a href="${p}blog-detail.html" class="footer-link">Blog Detail</a>
          <a href="${p}sitemap.html" class="footer-link">Sitemap</a>
          <a href="${p}terms.html" class="footer-link">Terms</a>`;

  content = content.replace(/<h4 class="footer-col-title">Pages<\/h4>[\s\S]*?(?=<\/div>)/, newPages + '\n        ');
  content = content.replace(/<h4 class="footer-col-title">Links<\/h4>[\s\S]*?(?=<\/div>)/, newLinks + '\n        ');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
