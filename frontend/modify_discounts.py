import re

def modify_discounts(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the SVG art block with the new watermark div
    svg_art_pattern = r'<!-- Soft Aesthetic Botanical Cocoa Artwork -->\s*<div class="ticket-illustration-art">.*?<\/div>'
    new_watermark = '<!-- Tiled Logo Watermark -->\n            <div class="ticket-watermark-bg" :style="{ backgroundImage: url() }"></div>'
    
    content = re.sub(svg_art_pattern, new_watermark, content, flags=re.DOTALL)

    # 2. Add the CSS for ticket-watermark-bg
    # Find the CSS block for ticket-illustration-art to replace it
    css_art_pattern = r'\.ticket-illustration-art \{[^}]*\}\s*\.cocoa-art-svg \{[^}]*\}'
    new_css_art = '''.ticket-watermark-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.12;
    background-size: 80px auto;
    background-repeat: repeat;
    background-position: center;
    z-index: 0;
    pointer-events: none;
  }'''
    content = re.sub(css_art_pattern, new_css_art, content, flags=re.DOTALL)
    
    # Let's ensure z-index is set for content. .voucher-content-wrap usually holds the text
    # Let's find it.
    if '.voucher-content-wrap {' in content:
        content = content.replace('.voucher-content-wrap {', '.voucher-content-wrap {\n    position: relative;\n    z-index: 1;')
    if '.ticket-vertical-edge {' in content:
        content = content.replace('.ticket-vertical-edge {', '.ticket-vertical-edge {\n    position: relative;\n    z-index: 1;')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_discounts('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/discounts.vue')
