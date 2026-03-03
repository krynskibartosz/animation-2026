const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../apps/web/src/components/projects/elementis-sotd');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let fileCount = 0;
let modifiedCount = 0;

walkDir(targetDir, function (filePath) {
    if (!filePath.match(/\.(tsx|ts|jsx|js)$/)) return;
    fileCount++;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix mixed-quote imports: from '@/something/..." → from "@/something/..."
    // Pattern: starts with ' but ends with "
    content = content.replace(/from\s+'([^'"]+)"/g, "from \"$1\"");
    // Pattern: starts with " but ends with '
    content = content.replace(/from\s+"([^'"]+)'/g, "from \"$1\"");

    // Fix dynamic imports like import('...) mixed quotes
    content = content.replace(/import\s*\('([^'"]+)"\)/g, "import(\"$1\")");
    content = content.replace(/import\s*\("([^'"]+)'\)/g, "import(\"$1\")");

    // Also fix the providers import that still uses "@/app/providers"
    content = content.replace(/from\s+["']@\/app\/providers["']/g, "from '@/components/projects/elementis-sotd/providers'");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} files. Modified ${modifiedCount} files.`);
