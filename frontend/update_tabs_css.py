import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace .ticket-category-tabs
c = re.sub(
    r'\.ticket-category-tabs\s*\{[^}]*\}',
    '.ticket-category-tabs {\n  display: flex;\n  align-items: center;\n  background-color: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 8px;\n  padding: 4px;\n  gap: 4px;\n  overflow-x: auto;\n  margin-bottom: 24px;\n}',
    c
)

# Replace .ticket-tab-btn
c = re.sub(
    r'\.ticket-tab-btn\s*\{[^}]*\}',
    '.ticket-tab-btn {\n  flex: 1;\n  padding: 10px 16px;\n  font-size: 13px;\n  font-weight: 500;\n  font-family: inherit;\n  border: none;\n  background: transparent;\n  color: #6B5A52;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  white-space: nowrap;\n  transition: all 0.2s ease;\n}',
    c
)

# Replace .ticket-tab-btn:hover
c = re.sub(
    r'\.ticket-tab-btn:hover\s*\{[^}]*\}',
    '.ticket-tab-btn:hover {\n  background-color: #F9FAFB;\n  color: #2C1A13;\n}',
    c
)

# Replace .ticket-tab-btn.active
c = re.sub(
    r'\.ticket-tab-btn\.active\s*\{[^}]*\}',
    '.ticket-tab-btn.active {\n  background-color: #2C1A13;\n  color: #FFFFFF;\n  font-weight: 600;\n}',
    c
)

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated tabs CSS in tickets-rides.vue to match reports/index.vue')
