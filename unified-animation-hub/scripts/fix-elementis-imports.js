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
    if (!filePath.match(/\.(tsx|ts|jsx|js|css)$/)) return;
    fileCount++;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Replace @/ imports with relative paths pointing to elementis-sotd folder
    content = content.replace(/from\s+['"]@\/components\//g, "from '@/components/projects/elementis-sotd/components/");
    content = content.replace(/from\s+['"]@\/sections\//g, "from '@/components/projects/elementis-sotd/sections/");
    content = content.replace(/from\s+['"]@\/hooks\//g, "from '@/components/projects/elementis-sotd/hooks/");
    content = content.replace(/from\s+['"]@\/utils\//g, "from '@/components/projects/elementis-sotd/utils/");
    content = content.replace(/from\s+['"]@\/providers['"]/g, "from '@/components/projects/elementis-sotd/providers'");

    // 2. Replace absolute asset paths with project-relative ones
    // src="/videos/..." -> src="/projects/elementis-sotd/videos/..."
    content = content.replace(/src=(['"])\/(videos|images|fonts|icons|assets)(.*?)(['"])/g, 'src=$1/projects/elementis-sotd/$2$3$4');
    content = content.replace(/src=\{(['"])\/(videos|images|fonts|icons|assets)(.*?)(['"])\}/g, 'src={$1/projects/elementis-sotd/$2$3$4}');
    // url() in css
    content = content.replace(/url\((['"]?)\/(videos|images|fonts|icons|assets)([^'"()]*?)(['"]?)\)/g, 'url($1/projects/elementis-sotd/$2$3$4)');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} files. Modified ${modifiedCount} files.`);
