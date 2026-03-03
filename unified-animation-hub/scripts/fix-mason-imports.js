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
    if (!filePath.match(/\.(tsx|ts|jsx|js|scss|css)$/)) return;
    fileCount++;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Replace @/ imports with @mason-mint/
    content = content.replace(/from\s+['"]@\//g, "from '@mason-mint/");
    content = content.replace(/import\s*\(\s*['"]@\//g, "import('@mason-mint/");

    // 1.5 Replace next/router and next/head
    content = content.replace(/['"]next\/router['"]/g, "'@mason-mint/utils/router-shim'");
    content = content.replace(/['"]next\/head['"]/g, "'@mason-mint/utils/head-shim'");

    // 2. Replace absolute public folder asset paths with /projects/mason-mint/
    // Match src="/some-image.png" -> src="/projects/mason-mint/some-image.png"
    content = content.replace(/src=(['"])\/([^'"]+)(['"])/g, 'src=$1/projects/mason-mint/$2$3');

    // Match src={'/some-image.png'} -> src={'/projects/mason-mint/some-image.png'}
    content = content.replace(/src=\{(['"])\/([^'"]+)(['"])\}/g, 'src={$1/projects/mason-mint/$2$3}');

    // Match url('/fonts/etc...') in SCSS / CSS
    content = content.replace(/url\((['"]?)\/([^'"()]+)(['"]?)\)/g, "url($1/projects/mason-mint/$2$3)");

    // Provide fallback for any generic href="/..." for static files (though risky, usually safe for images/fonts)
    // Let's only target <link href="/..., <a href="/... and typical asset paths
    content = content.replace(/href=(['"])\/(favicon|images|fonts|videos|lottie|icons)(.*?)(['"])/g, "href=$1/projects/mason-mint/$2$3$4");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Checked ${fileCount} files. Modified ${modifiedCount} files.`);
