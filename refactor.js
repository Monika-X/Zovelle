const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pagesDir = path.join(dir, 'pages');

if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
}

const allFiles = fs.readdirSync(dir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html') && f !== 'index.html');

// Process other HTML files
htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Update assets paths
    content = content.replace(/href="assets\//g, 'href="../assets/');
    content = content.replace(/src="assets\//g, 'src="../assets/');
    
    // Update link back to index.html
    content = content.replace(/href="index\.html"/g, 'href="../index.html"');
    
    // Write to pages directory
    fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
    
    // Delete from root
    fs.unlinkSync(path.join(dir, file));
    console.log(`Moved ${file} to pages/ and updated paths`);
});

// Process index.html
let indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
htmlFiles.forEach(file => {
    // We want to replace href="file.html" with href="pages/file.html"
    const regex = new RegExp(`href="${file}"`, 'g');
    indexContent = indexContent.replace(regex, `href="pages/${file}"`);
});
fs.writeFileSync(path.join(dir, 'index.html'), indexContent, 'utf8');
console.log('Updated index.html paths');
