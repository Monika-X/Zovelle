const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Extract footer
const footerMatch = indexHtml.match(/<footer class="footer">[\s\S]*?<\/footer>/);
const footerHtml = footerMatch ? footerMatch[0] : '';

// Font link to inject
const fontLink = `\n  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">\n`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let modified = false;

    // Add font link if missing
    if (!content.includes('family=Bodoni+Moda')) {
        content = content.replace(/<\/head>/, fontLink + '</head>');
        modified = true;
    }

    // Add footer if missing (and it's not the 404 or maintenance page which usually don't have footers, but let's check)
    // Wait, user asked for full pages. I'll add to all except 404/maintenance if they don't want it, but let's just add to all that have <main>
    if (!content.includes('<footer') && !['404.html', 'maintenance.html'].includes(file)) {
        // Insert before <script> or </body>
        if (content.includes('<script')) {
            content = content.replace(/<script/, '\n  ' + footerHtml + '\n\n  <script');
        } else {
            content = content.replace(/<\/body>/, '\n  ' + footerHtml + '\n</body>');
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

// Let's also bundle the JS to fix the CORS issue for local file:// testing
// We'll just create a bundle.js that contains all the JS logic, and rewrite the <script> tags.
const jsDir = path.join(dir, 'assets', 'js');
const jsFiles = ['navbar.js', 'hero-slider.js', 'scroll-reveal.js', 'image-zoom.js', 'page-transition.js', 'dark-mode.js', 'rtl.js', 'lookbook.js', 'size-guide.js', 'cart.js', 'filters.js'];

let bundle = '';
jsFiles.forEach(f => {
    let code = fs.readFileSync(path.join(jsDir, f), 'utf8');
    // Remove import/export statements
    code = code.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    code = code.replace(/export\s+default\s+[a-zA-Z0-9_]+;?/g, '');
    bundle += `\n/* --- ${f} --- */\n` + code;
});

// Add main.js initialization
let mainCode = fs.readFileSync(path.join(jsDir, 'main.js'), 'utf8');
mainCode = mainCode.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
bundle += `\n/* --- main.js --- */\n` + mainCode;

fs.writeFileSync(path.join(jsDir, 'bundle.js'), bundle, 'utf8');
console.log('Created bundle.js');

// Replace script tags in all HTML files
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (content.includes('src="assets/js/main.js"')) {
        content = content.replace(/<script type="module" src="assets\/js\/main\.js"><\/script>/g, '<script src="assets/js/bundle.js"></script>');
        content = content.replace(/<script src="assets\/js\/main\.js"><\/script>/g, '<script src="assets/js/bundle.js"></script>');
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Switched to bundle.js in ${file}`);
    }
});
