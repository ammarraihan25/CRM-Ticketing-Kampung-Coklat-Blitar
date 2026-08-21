import re

def modify_dashboard_grid(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change align-items: start to align-items: stretch
    content = content.replace('.operations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }', '.operations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }\n  .ticket-sales-col, .shift-wrapper { display: flex; flex-direction: column; }\n  .ticket-sales-col > *, .shift-wrapper > * { flex: 1; }')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_dashboard_grid('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/dashboard/index.vue')
