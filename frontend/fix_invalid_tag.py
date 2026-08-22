import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/tiket-masuk.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/wahana.vue'
]

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the triple </div> before cart-footer-summary and replace with double </div>
    pattern = r'</div>\s*</div>\s*</div>\s*<div class="cart-footer-summary">'
    replacement = '</div>\n          </div>\n          <div class="cart-footer-summary">'
    
    content = re.sub(pattern, replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Fixed invalid end tag error')
