import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/pages/CategoryDetail.tsx',
  'src/pages/Home.tsx',
  'src/pages/ProductDetail.tsx',
  'src/components/ProductCard.tsx',
  'index.html',
  'public/catalog.xml',
  'public/sitemap.xml',
  'public/robots.txt',
  'delete-data.js'
];

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/asem5g\.vercel\.app/g, 'asem5g.pages.dev');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log("Updated " + filePath);
  }
});
