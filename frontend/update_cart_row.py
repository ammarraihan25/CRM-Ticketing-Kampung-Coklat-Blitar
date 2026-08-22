import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/tiket-masuk.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/wahana.vue'
]

old_row = r'<div v-for="item in cart"[^>]*class="cart-item-row">[\s\S]*?(?=</div>\s*</div>\s*<div style="border-bottom:)'
# Wait, a safer regex for the cart row block:
# It starts with `<div v-for="item in cart"` and ends with the third `</div>`.
# Let's just use string replacement or a precise regex.

new_row = '''<div v-for="item in cart" :key="item.id || item.packageId || item.name" class="cart-item-row">
              <div class="cart-item-top">
                <div class="cart-item-name">{{ item.name }}</div>
                <div class="cart-item-subtotal">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</div>
              </div>
              <div class="cart-item-bottom">
                <div class="cart-item-price">@ Rp {{ item.price.toLocaleString('id-ID') }}</div>
                <div class="cart-item-qty-control">
                  <button @click="decreaseItem(item)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span>{{ item.qty }}</span>
                  <button @click="increaseItem(item)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            </div>'''

css_replacements = {
    r'\.cart-item-row \{.*?\}': '.cart-item-row { display: flex; flex-direction: column; gap: 10px; background: #ffffff; border: 1px solid #E5E7EB; padding: 16px; border-radius: 12px; margin-bottom: 12px; }',
    r'\.cart-item-details \{.*?\}': '.cart-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }\n.cart-item-bottom { display: flex; justify-content: space-between; align-items: center; }',
    r'\.cart-item-name \{.*?\}': '.cart-item-name { font-weight: 700; color: #1F2937; font-size: 15px; line-height: 1.3; }',
    r'\.cart-item-price \{.*?\}': '.cart-item-price { font-size: 13px; color: #6B7280; font-weight: 500; }',
    r'\.cart-item-qty-control \{.*?\}': '.cart-item-qty-control { display: flex; align-items: center; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; background: #F9FAFB; }',
    r'\.cart-item-qty-control button \{.*?\}': '.cart-item-qty-control button { background: transparent; border: none; width: 32px; height: 32px; cursor: pointer; color: #4B5563; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }\n.cart-item-qty-control button:hover { background: #E5E7EB; color: #1F2937; }',
    r'\.cart-item-qty-control span \{.*?\}': '.cart-item-qty-control span { width: 36px; text-align: center; font-weight: 700; font-size: 14px; color: #1F2937; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; height: 32px; background: #ffffff; }',
    r'\.cart-item-subtotal \{.*?\}': '.cart-item-subtotal { font-weight: 800; color: #2C1A13; font-size: 16px; white-space: nowrap; }'
}

def process_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace cart item row HTML
    # It's a block starting with <div v-for="item in cart" ...>
    # and ends just before <div style="border-bottom: 1px dotted #dcdcdc; margin: 20px 0;"></div>
    # But wait, in the previous script I replaced that border-bottom with <div class="cart-footer-summary">
    # So the block ends just before </div> \n <div class="cart-footer-summary">
    
    # Let's use a regex to match the v-for item in cart block:
    pattern = r'<div v-for="item in cart"[^>]*class="cart-item-row">[\s\S]*?</div>\s*</div>\s*</div>\s*(?=</div>\s*<div class="cart-footer-summary">)'
    
    # Actually, the original HTML inside cart-item-row has 3 inner divs, so </div></div></div></div> is the end.
    # Let's try matching from <div v-for="item in cart" down to the last </div> before cart-footer-summary.
    # A simpler way is to find the exact block if we know its structure.
    
    # Let's just find the start: `<div v-for="item in cart"`
    # And replace everything until `</div>\n          </div>\n          <div class="cart-footer-summary">`
    # Or simply:
    start_str = '<div v-for="item in cart"'
    end_str = '<div class="cart-footer-summary">'
    
    idx_start = content.find(start_str)
    idx_end = content.find(end_str)
    
    if idx_start != -1 and idx_end != -1:
        # We need to find where the `</div>` that closes the `v-if="cart.length === 0"` or the loop wrapper is.
        # Wait, the structure is:
        # <div style="flex: 1; overflow-y: auto; ...">
        #   <div v-if="cart.length === 0">...</div>
        #   <div v-for="item in cart" ... class="cart-item-row">...</div>
        # </div>
        # <div class="cart-footer-summary">...</div>
        
        # So we just replace the <div v-for="item in cart"...>...</div>
        # Since it might be multiple lines, I'll use regex.
        content = re.sub(
            r'<div v-for="item in cart"[^>]*class="cart-item-row">\s*<div class="cart-item-(details|top)">[\s\S]*?(?=</div>\s*</div>\s*<div class="cart-footer-summary">)',
            new_row + '\n          ',
            content
        )

    # Apply CSS replacements
    for pattern, replacement in css_replacements.items():
        content = re.sub(pattern, replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fp in files:
    process_file(fp)

print('Updated cart item row layout')
