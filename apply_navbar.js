const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pagesDir = path.join(dir, 'pages');

const navMenuTemplate = (isIndex) => {
    const prefix = isIndex ? 'pages/' : '';
    const indexRef = isIndex ? 'index.html' : '../index.html';
    return `<ul class="nav-menu">
        <li><a href="${indexRef}" class="nav-link link-underline">Home</a></li>
        <li><a href="${prefix}home-2.html" class="nav-link link-underline">Home 2</a></li>
        <li><a href="${prefix}about.html" class="nav-link link-underline">About</a></li>
        <li><a href="${prefix}services.html" class="nav-link link-underline">Services</a></li>
        <li><a href="${prefix}blog.html" class="nav-link link-underline">Blog</a></li>
        <li><a href="${prefix}contact.html" class="nav-link link-underline">Contact</a></li>
      </ul>`;
};

const navIconsTemplate = () => `<div class="nav-icons">
        <button class="nav-icon" aria-label="Search">
          <svg viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>
        <button class="nav-icon" aria-label="Account">
          <svg viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </button>
        <button class="nav-icon dark-mode-toggle" aria-label="Toggle Theme">
          <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24"><path d="M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
        <button class="nav-icon rtl-toggle" aria-label="Toggle RTL">RTL</button>
        <button class="nav-icon" aria-label="Cart">
          <svg viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </button>
        <button class="menu-toggle" aria-label="Toggle Menu">
          <span></span><span></span><span></span>
        </button>
      </div>`;

const processFile = (filePath, isIndex) => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Remove dev comment in about.html navbar (and similar artifacts)
    content = content.replace(/^\s*<!-- Navbar code omitted for brevity.*?-->\s*$/m, '');

    // Replace nav-menu
    content = content.replace(/<ul class="nav-menu">[\s\S]*?<\/ul>/, navMenuTemplate(isIndex));

    // Replace nav-icons (single-line or multi-line variants)
    content = content.replace(/<div class="nav-icons">[\s\S]*?<\/div>\s*<\/div>\s*<\/nav>/, navIconsTemplate() + '\n    </div>\n  </nav>');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.relative(dir, filePath)}`);
    } else {
        console.log(`Skipped (no navbar found): ${path.relative(dir, filePath)}`);
    }
};

// Root index.html
processFile(path.join(dir, 'index.html'), true);

// All pages
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
pageFiles.forEach(file => {
    processFile(path.join(pagesDir, file), false);
});