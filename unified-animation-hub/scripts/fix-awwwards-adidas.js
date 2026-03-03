const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../apps/web/src/components/projects/awwwards-adidas');
const pageFile = path.resolve(__dirname, '../apps/web/src/app/(projects)/awwwards-adidas/page.tsx');
const layoutFile = path.resolve(__dirname, '../apps/web/src/app/(projects)/awwwards-adidas/layout.tsx');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFile(filePath) {
    if (!filePath.match(/\.(tsx|ts|jsx|js|css)$/)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Replace @/ imports with paths pointing to awwwards-adidas folder
    content = content.replace(/from\s+['"]@\/components\//g, "from '@/components/projects/awwwards-adidas/components/");
    content = content.replace(/from\s+['"]@\/lib\//g, "from '@/components/projects/awwwards-adidas/lib/");

    // Also account for dynamic imports if any
    content = content.replace(/import\(['"]@\/components\//g, "import('@/components/projects/awwwards-adidas/components/");

    // 2. Replace absolute asset paths with project-relative ones
    // src="/models/..." -> src="/awwwards-adidas/models/..."
    content = content.replace(/src=(['"])\/(models|textures|icons|test)(.*?)(['"])/g, 'src=$1/awwwards-adidas/$2$3$4');
    content = content.replace(/src=\{(['"])\/(models|textures|icons|test)(.*?)(['"])\}/g, 'src={$1/awwwards-adidas/$2$3$4}');
    content = content.replace(/url\((['"]?)\/(models|textures|icons|test)([^'"()]*?)(['"]?)\)/g, 'url($1/awwwards-adidas/$2$3$4)');

    // Sometimes strings are used directly for loading models e.g. useGLTF('/models/...')
    content = content.replace(/(['"])\/(models|textures|icons|test)(.*?)\1/g, "'/awwwards-adidas/$2$3'");

    // Update main-optimized.mp3
    content = content.replace(/(['"])\/main-optimized\.mp3\1/g, "'/awwwards-adidas/main-optimized.mp3'");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Modified", filePath);
    }
}

// Process the components and lib folder
walkDir(targetDir, processFile);

// Process the page specific files in app
if (fs.existsSync(pageFile)) {
    processFile(pageFile);
}
// globals.css is copied, but lets process it just in case
let globalsCss = path.resolve(__dirname, '../apps/web/src/app/(projects)/awwwards-adidas/globals.css');
if (fs.existsSync(globalsCss)) {
    processFile(globalsCss);
}
