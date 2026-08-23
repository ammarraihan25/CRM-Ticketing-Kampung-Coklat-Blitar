const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'app', 'pages', 'admin', 'config', 'discounts.vue');
const destPath = path.join(__dirname, 'app', 'pages', 'ticketing_dan_gate', 'self-service', 'promo.vue');

const srcContent = fs.readFileSync(srcPath, 'utf8');
let destContent = fs.readFileSync(destPath, 'utf8');

// Extract HTML block
const htmlStartMarker = '<div class="physical-vouchers-grid">';
const htmlEndMarker = '    <!-- ================================================================= -->'; // The next comment block or div closing
const htmlStartIndex = srcContent.indexOf(htmlStartMarker);

// Find the end of physical-vouchers-grid (it's closed by a div, but we can just use regex or indexOf)
// Looking at earlier cat output, it seems we can just grab from htmlStartMarker up to the end of the div.
// A safe way is to find the end of the `physical-vouchers-grid` div.
let htmlStr = '';
let openTags = 0;
for (let i = htmlStartIndex; i < srcContent.length; i++) {
  if (srcContent.substr(i, 4) === '<div') openTags++;
  if (srcContent.substr(i, 5) === '</div') openTags--;
  htmlStr += srcContent[i];
  if (openTags === 0 && srcContent[i] === '>') break;
}

// Extract CSS block
const cssStartIndex = srcContent.indexOf('.physical-vouchers-grid {');
// The CSS might end before a @media query or another unrelated class
let cssEndIndex = srcContent.indexOf('.slide-over-overlay {', cssStartIndex);
if (cssEndIndex === -1) cssEndIndex = srcContent.indexOf('</style>', cssStartIndex);

const cssStr = srcContent.substring(cssStartIndex, cssEndIndex);

// In destContent, replace `.promo-container` content with `htmlStr`
// But we need to keep the `v-for="promo in promos"` logic and variable names.
// It's safer to just provide the extracted HTML and CSS and do it manually.

fs.writeFileSync(path.join(__dirname, 'extracted_discounts.json'), JSON.stringify({ html: htmlStr, css: cssStr }, null, 2));
