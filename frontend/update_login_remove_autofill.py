import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/kasir.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/manager.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/owner.vue'
]

pattern_autofill = r'<div class="autofill-box-unified">[\s\S]*?</div>'

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the autofill box block
    content = re.sub(pattern_autofill, '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated 4 login pages: removed autofill demo button')
