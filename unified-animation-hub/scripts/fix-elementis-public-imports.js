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

    // Convert: import SomeImage from "@/public/path/to/image.ext";
    // Into:    const SomeImage = "/projects/elementis-sotd/path/to/image.ext";
    content = content.replace(
        /import\s+(\w+)\s+from\s+["']@\/public\/([^"']+)["'];/g,
        (match, varName, imgPath) => {
            return `const ${varName} = "/projects/elementis-sotd/${imgPath}";`;
        }
    );

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} files. Modified ${modifiedCount} files.`);
