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

    # Add padding: 24px; to .pos-cart-pane if it's missing
    def add_padding(match):
        inner = match.group(1)
        if 'padding' not in inner:
            inner += ' padding: 24px;'
        # If it has padding: 0;, change to padding: 24px;
        inner = re.sub(r'padding:\s*0;', 'padding: 24px;', inner)
        return '.pos-cart-pane {' + inner + '}'

    content = re.sub(r'\.pos-cart-pane\s*\{([^}]*)\}', add_padding, content)

    # Also, we removed inner padding earlier: <div style="padding: 0; display: flex; flex-direction: column; height: 100%;">
    # Let's ensure it doesn't have negative margins or weird stuff.
    # Actually, padding: 24px; on the parent is enough.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated POS layouts: fixed padding for right pane (Cart)')
