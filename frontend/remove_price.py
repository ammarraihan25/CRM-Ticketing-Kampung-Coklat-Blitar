import re

def remove_price(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove wahana-meta-line HTML
    meta_line_pattern = r'<!-- Price & Capacity in a Single Symmetric Row -->\s*<div class="wahana-meta-line">.*?<\/div>'
    content = re.sub(meta_line_pattern, '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

remove_price('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
