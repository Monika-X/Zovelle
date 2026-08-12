const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = ['../index.html', ...fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))];

const footerMap = (prefix, home) => [
  ['Luxury Outerwear', home],
  ['Bespoke Suits', prefix + 'services.html'],
  ['Accessories', prefix + 'home-2.html'],
  ['Gifting', prefix + 'contact.html'],
  ['Atelier Services', prefix + 'services.html'],
];

const perFile = {
  '../index.html': [
    ['Explore Collection', 'pages/home-2.html'],
    ['Shop Menswear', 'pages/services.html'],
    ['View Lookbook', 'pages/home-2.html'],
    ['View All', 'pages/home-2.html'],
    ['Shop Collection', 'pages/home-2.html'],
    ['Shop Looks', 'pages/home-2.html'],
    ['Shop The Sale', 'pages/home-2.html'],
  ],
  'home-2.html': [
    ['Discover', '../index.html'],
    ['Shop Evening Wear', '../index.html'],
  ],
  'about.html': [
    ['Learn about our process', 'services.html'],
  ],
};

files.forEach(file => {
  const filePath = file === '../index.html' ? path.join(__dirname, 'index.html') : path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const prefix = file === '../index.html' ? 'pages/' : '';
  const home = file === '../index.html' ? 'index.html' : '../index.html';

  const replaceLink = (text, href) => {
    const pattern = new RegExp(`<a href="#"([^>]*)>${text}</a>`, 'g');
    const before = content;
    content = content.replace(pattern, `<a href="${href}"$1>${text}</a>`);
    if (content === before) console.log(`  NO MATCH: ${text} in ${file}`);
  };

  footerMap(prefix, home).forEach(([text, href]) => replaceLink(text, href));
  (perFile[file] || []).forEach(([text, href]) => replaceLink(text, href));

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});