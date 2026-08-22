import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/tiket-masuk.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/pos/wahana.vue'
]

css_replacements = {
    # Replace wrapper
    r"\.pos-wrapper \{.*?\}": ".pos-wrapper { display: flex; height: calc(100vh - 60px); background-color: #F3F4F6; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; gap: 20px; padding: 20px; box-sizing: border-box; }",
    # Replace left pane
    r"\.pos-form-pane \{.*?\}": ".pos-form-pane { width: 360px; min-width: 360px; background: #ffffff; padding: 24px; overflow-y: auto; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; }",
    # Replace middle pane
    r"\.pos-catalog-pane \{.*?\}": ".pos-catalog-pane { flex: 1; display: flex; flex-direction: column; padding: 24px; overflow: hidden; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }",
    # Replace right pane
    r"\.pos-cart-pane \{.*?\}": ".pos-cart-pane { width: 360px; min-width: 360px; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; }",
    # Replace pane-title
    r"\.pane-title \{.*?\}": ".pane-title { font-size: 18px; font-weight: 800; color: #1F2937; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #F3F4F6; padding-bottom: 12px; }",
    # form-section-box remove margin and border if already in a card
    r"\.form-section-box \{.*?\}": ".form-section-box { background: transparent; padding: 0; border: none; box-shadow: none; margin-bottom: 0; }"
}

def process_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply CSS replacements
    for pattern, replacement in css_replacements.items():
        content = re.sub(pattern, replacement, content)

    # Make inner titles uniform. 
    # Left pane title is already <h2 class="pane-title">
    
    # Middle pane title: <h1 style="font-size: 32px;...">Pilih Produk...</h1>
    content = re.sub(
        r'<h1 style="[^"]*font-size: 32px[^"]*">(Pilih Produk:[^<]+)</h1>',
        r'<h2 class="pane-title">\1</h2>',
        content
    )
    
    # Right pane title: <h1 style="font-size: 32px;...">Keranjang</h1>
    content = re.sub(
        r'<h1 style="[^"]*font-size: 32px[^"]*">(Keranjang)</h1>',
        r'<h2 class="pane-title">\1</h2>',
        content
    )
    
    # Right pane div with padding 30px -> remove inner padding because we applied it to the pane
    content = re.sub(
        r'<div class="pos-cart-pane"[^>]*>\s*<div style="padding: 30px; display: flex; flex-direction: column; height: 100%;">',
        r'<div class="pos-cart-pane">\n        <div style="padding: 0; display: flex; flex-direction: column; height: 100%;">',
        content
    )
    # Just to be safe, if the inner div padding is 24px or something:
    content = re.sub(
        r'<div style="padding: 30px; display: flex; flex-direction: column; height: 100%;">',
        r'<div style="padding: 0; display: flex; flex-direction: column; height: 100%;">',
        content
    )
    # Remove inline style from pos-cart-pane
    content = re.sub(
        r'<div class="pos-cart-pane"[^>]*>',
        r'<div class="pos-cart-pane">',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for fp in files:
    process_file(fp)

print('Updated POS layouts to match modern CRM standard')
