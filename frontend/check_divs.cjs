const fs = require('fs');
const c = fs.readFileSync('update_modal.cjs', 'utf8');
const startIndex = c.indexOf('const replacementTemplate = `') + 'const replacementTemplate = `'.length;
const endIndex = c.indexOf('`;', startIndex);
const html = c.substring(startIndex, endIndex);

let lines = html.split('\n');
let depth = 0;
lines.forEach((l, i) => {
  const opens = (l.match(/<div/g) || []).length;
  const closes = (l.match(/<\/div>/g) || []).length;
  depth += opens - closes;
  if (opens !== closes) {
     console.log(`Line ${i+1} [Depth: ${depth}]: ${l.trim()}`);
  }
});
console.log('Final depth:', depth);
