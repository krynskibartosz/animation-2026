const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../apps/web/src/components/projects/mason-mint');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let fileCount = 0;
let modifiedCount = 0;

walkDir(targetDir, function (filePath) {
    if (!filePath.match(/\.scss$/)) return;
    fileCount++;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove lines that import app/styles/variables (which are now injected via additionalData)
    content = content.replace(/@import ['"]app\/styles\/variables\/[^'"]+['"];?\s*\n?/g, '');
    content = content.replace(/@use ['"]app\/styles\/variables\/[^'"]+['"].*\n?/g, '');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} SCSS files. Modified ${modifiedCount} files.`);
