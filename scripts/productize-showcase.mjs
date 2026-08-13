import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const copyScript = '<script src="/DB-GPT-Dashboard-Showcase/product-copy.js" defer></script>';
const favicon = '<link rel="icon" href="/DB-GPT-Dashboard-Showcase/LOGO_SMALL.png"/>';
const htmlFiles = [
  'dashboards/showcase/index.html',
  'dashboard-share/showcase/index.html',
  '404.html',
  '404/index.html',
];

for (const relativePath of htmlFiles) {
  const filePath = path.join(root, relativePath);
  let content = await readFile(filePath, 'utf8');
  if (!content.includes(favicon)) content = content.replace('</head>', `${favicon}</head>`);
  if (!content.includes(copyScript)) content = content.replace('</body>', `${copyScript}</body>`);
  await writeFile(filePath, content, 'utf8');
}

await copyFile(path.join(root, 'src/index.html'), path.join(root, 'index.html'));
console.log('Showcase homepage and product copy hook updated.');
