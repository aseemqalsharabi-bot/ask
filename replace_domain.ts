import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function replaceInFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('asem5g.pages.dev') || content.includes('asem5g.vercel.app')) {
      content = content.replace(/asem5g\.pages\.dev/g, 'www.asemnet.com');
      content = content.replace(/asem5g\.vercel\.app/g, 'www.asemnet.com');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log("Updated " + filePath);
    }
  }
}

['src', 'public'].forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) walkDir(fullPath, replaceInFile);
});

['index.html', 'delete-data.js'].forEach(file => {
  replaceInFile(path.join(process.cwd(), file));
});
