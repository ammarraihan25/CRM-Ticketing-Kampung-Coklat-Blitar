import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Remove the modal-icon-badge from header
c = re.sub(r'<div class="modal-icon-badge"[^>]*>\s*<svg.*?</svg>\s*</div>', '', c, flags=re.DOTALL)

# 2. Remove the target-icon from Target Summary
c = re.sub(r'<span class="target-icon">\s*<svg.*?</svg>\s*</span>', '', c, flags=re.DOTALL)

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Icons removed successfully.')
