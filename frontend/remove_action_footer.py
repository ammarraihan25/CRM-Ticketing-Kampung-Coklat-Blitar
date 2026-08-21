import re

def remove_action_footer(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the action-footer div and its contents
    pattern = r'<!-- Actions -->\s*<div class="action-footer">.*?</div>'
    
    content = re.sub(pattern, '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

remove_action_footer('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue')
