import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/kasir.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/manager.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/owner.vue'
]

pattern_list = r'<ul class="article-list">[\s\S]*?</ul>'

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the list block
    content = re.sub(pattern_list, '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated 4 login pages: removed article list')
