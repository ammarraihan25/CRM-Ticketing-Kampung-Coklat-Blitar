import re

def modify_discounts_watermark(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    css_art_pattern = r'\.ticket-watermark-bg \{[^}]*\}'
    new_css_art = '''.ticket-watermark-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.15;
    background-size: 280px auto;
    background-repeat: no-repeat;
    background-position: right -40px center;
    z-index: 0;
    pointer-events: none;
  }'''

    content = re.sub(css_art_pattern, new_css_art, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_discounts_watermark('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/discounts.vue')
