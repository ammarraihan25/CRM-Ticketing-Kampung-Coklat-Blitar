import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/kasir.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/manager.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/owner.vue'
]

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to replace justify-content: center; inside .card-left-article
    # Let's find .card-left-article block
    
    start_idx = content.find('.card-left-article {')
    if start_idx != -1:
        end_idx = content.find('}', start_idx)
        if end_idx != -1:
            block = content[start_idx:end_idx]
            new_block = block.replace('justify-content: center;', 'justify-content: flex-end;')
            content = content[:start_idx] + new_block + content[end_idx:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
                
print('Updated 4 login pages: moved article to bottom (flex-end)')
