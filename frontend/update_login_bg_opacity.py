import re
import os

files = [
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/kasir.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/manager.vue',
    'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/owner.vue'
]

pattern_icon = r'<div class="article-icon">[\s\S]*?</div>'

old_css = '''  background-image: 
    linear-gradient(145deg, rgba(44, 26, 19, 0.88) 0%, rgba(23, 13, 9, 0.95) 100%),
    url('~/assets/assets_POS/kamcok1.jpg');'''
    
new_css = '''  background-image: 
    linear-gradient(145deg, rgba(44, 26, 19, 0.65) 0%, rgba(23, 13, 9, 0.82) 100%),
    url('~/assets/assets_POS/kamcok1.jpg');'''

for filepath in files:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove article-icon
    content = re.sub(pattern_icon, '', content, count=1)
    
    # 2. Update CSS overlay opacity
    if old_css in content:
        content = content.replace(old_css, new_css)
    else:
        # Fallback regex in case formatting slightly differs
        content = re.sub(
            r'linear-gradient\([\s\S]*?rgba\(44, 26, 19, 0\.88\)[\s\S]*?100%\),',
            'linear-gradient(145deg, rgba(44, 26, 19, 0.65) 0%, rgba(23, 13, 9, 0.82) 100%),',
            content
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated 4 login pages: removed article-icon and made background image more visible')
