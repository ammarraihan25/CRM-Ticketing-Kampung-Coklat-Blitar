import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/tiket-masuk.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/wahana.vue'
]

cart_old_footer = r'<div style="border-bottom: 1px dotted #dcdcdc; margin: 20px 0;"></div>[\s\S]*?<button @click="processCheckout" :disabled="cart.length === 0"[^>]*>\s*Checkout\s*</button>'
cart_new_footer = '''<div class="cart-footer-summary">
            <div class="summary-row grand-total">
              <span>Total Tagihan</span>
              <span class="total-price">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
            </div>
            <button class="btn-checkout-premium" @click="processCheckout" :disabled="cart.length === 0">
              Proses Pembayaran
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>'''

css_append = '''
.cart-footer-summary { margin-top: auto; padding-top: 20px; border-top: 1px solid #E5E7EB; }
.summary-row.grand-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; background: #F9FAFB; padding: 16px 20px; border-radius: 12px; border: 1px solid #E5E7EB; }
.summary-row.grand-total span:first-child { font-size: 13px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; }
.summary-row.grand-total .total-price { font-size: 22px; font-weight: 900; color: #1F2937; }
.btn-checkout-premium { width: 100%; background: #2C1A13; color: #fff; border: none; padding: 18px; font-size: 15px; font-weight: 800; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(44,26,19,0.1); }
.btn-checkout-premium:hover:not(:disabled) { background: #3d241a; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(44,26,19,0.2); }
.btn-checkout-premium:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; box-shadow: none; }
'''

def process_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add icons to titles
    content = re.sub(
        r'<h2 class="pane-title">(Pilih Produk:[^<]+)</h2>',
        r'<h2 class="pane-title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>\1</h2>',
        content
    )
    
    content = re.sub(
        r'<h2 class="pane-title">Keranjang</h2>',
        r'<h2 class="pane-title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>Keranjang</h2>',
        content
    )

    # Replace Cart Footer
    if '<div class="cart-footer-summary">' not in content:
        content = re.sub(cart_old_footer, cart_new_footer, content)

    # Append CSS if not exists
    if '.cart-footer-summary' not in content:
        content = content.replace('</style>', css_append + '\n</style>')

    # Improve empty state
    content = content.replace(
        '<div v-if="cart.length === 0" style="color: #aaa; font-size: 14px; text-align: center; padding: 40px 0;">Belum ada pesanan.</div>',
        '<div v-if="cart.length === 0" style="color: #9CA3AF; font-size: 14px; text-align: center; padding: 60px 0; font-weight: 500; display: flex; flex-direction: column; align-items: center; gap: 12px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>Keranjang kosong</div>'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fp in files:
    process_file(fp)

print('Updated POS layouts: added icons and premium cart footer')
