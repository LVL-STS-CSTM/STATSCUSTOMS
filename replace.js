import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components');

const sizeMap = {
    'text-9xl': 'text-7xl',
    'text-8xl': 'text-6xl',
    'text-7xl': 'text-5xl',
    'text-6xl': 'text-4xl',
    'text-5xl': 'text-3xl',
    'text-4xl': 'text-2xl',
    'text-3xl': 'text-xl',
    'text-2xl': 'text-lg'
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text sizes using a regex that matches all keys
    const regex = new RegExp(Object.keys(sizeMap).join('|'), 'g');
    content = content.replace(regex, (match) => sizeMap[match]);
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

walkDir(componentsDir);
console.log('Done replacing text sizes.');
