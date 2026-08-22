import re
import os

files_to_update = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/kasir.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/manager.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/owner.vue'
]

pattern = r'<!-- Top Back Navigation -->\s*<div class="top-nav-bar">.*?</div>'

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We need to make sure we match across multiple lines
        new_content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated {os.path.basename(filepath)}")

