import re

def modify_bottom_align(filepath, bottom_class):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'\.' + bottom_class + r' \{[^}]*\}'
    match = re.search(pattern, content)
    if match:
        original = match.group(0)
        # Only add margin-top: auto if not already present
        if 'margin-top: auto' not in original:
            new_css = original.replace('}', '  margin-top: auto;\n}')
            content = content.replace(original, new_css)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

modify_bottom_align('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue', 'grand-total-bar')
modify_bottom_align('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/TicketSalesTable.vue', 'grand-total-footer')
