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
    // Only process SCSS files
    if (!filePath.match(/\.scss$/)) return;
    fileCount++;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // In SCSS, @import '@/...' doesn't use TS path aliases.
    // Replace @/app/styles/... with the actual relative path using includePaths.
    // Since sassOptions.includePaths includes the mason-mint/src dir,
    // we just need to drop the @/ prefix from the import.
    content = content.replace(/@import\s+(['"])@\/([^'"]+)(['"])/g, "@import $1$2$3");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} SCSS files. Modified ${modifiedCount} files.`);
