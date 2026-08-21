import re

def modify_card(filepath, root_class):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # ensure height: 100% and display: flex
    pattern = r'\.' + root_class + r' \{[^}]*\}'
    match = re.search(pattern, content)
    if match:
        original = match.group(0)
        new_css = original.replace('}', '  height: 100%;\n  display: flex;\n  flex-direction: column;\n}')
        content = content.replace(original, new_css)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

modify_card('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue', 'premium-shift-card')
modify_card('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/TicketSalesTable.vue', 'ticket-breakdown-card')
