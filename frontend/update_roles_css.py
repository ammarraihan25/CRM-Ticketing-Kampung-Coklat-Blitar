import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/roles.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update section-widget-frame
c = re.sub(
    r'\.section-widget-frame\s*\{[^}]*\}',
    '.section-widget-frame {\n  background: white;\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n  display: flex;\n  flex-direction: column;\n}',
    c
)

# 2. Update section-head-bar
c = re.sub(
    r'\.section-head-bar\s*\{[^}]*\}',
    '.section-head-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  border-bottom: 1px solid #E5E7EB;\n}',
    c
)

# 3. Update aesthetic-staff-table thead th
c = re.sub(
    r'\.aesthetic-staff-table\s*thead\s*th\s*\{[^}]*\}',
    '.aesthetic-staff-table thead th {\n  padding: 14px 20px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6B5A52;\n  background: #FAF8F5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  text-align: left;\n  border-bottom: 1px solid #E5E7EB;\n}',
    c
)

# 4. Update aesthetic-matrix-table thead th
c = re.sub(
    r'\.aesthetic-matrix-table\s*thead\s*th\s*\{[^}]*\}',
    '.aesthetic-matrix-table thead th {\n  padding: 14px 20px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6B5A52;\n  background: #FAF8F5;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  text-align: left;\n  border-bottom: 1px solid #E5E7EB;\n}',
    c
)

# 5. Update staff-row
c = re.sub(
    r'\.staff-row\s*\{[^}]*\}',
    '.staff-row {\n  background: #FFFFFF;\n  border-bottom: 1px solid #F3F4F6;\n  transition: all 0.2s ease;\n}',
    c
)
c = re.sub(
    r'\.staff-row:hover\s*\{[^}]*\}',
    '.staff-row:hover {\n  background: #F9FAFB;\n}',
    c
)
c = re.sub(
    r'\.staff-row\s*td\s*\{[^}]*\}',
    '.staff-row td {\n  padding: 16px 20px;\n  font-size: 14px;\n  vertical-align: middle;\n  color: #2C1A13;\n}',
    c
)

# 6. Update matrix-row
c = re.sub(
    r'\.matrix-row\s*\{[^}]*\}',
    '.matrix-row {\n  background: #FFFFFF;\n  border-bottom: 1px solid #F3F4F6;\n  transition: all 0.2s ease;\n}',
    c
)
c = re.sub(
    r'\.matrix-row:hover\s*\{[^}]*\}',
    '.matrix-row:hover {\n  background: #F9FAFB;\n}',
    c
)
c = re.sub(
    r'\.matrix-row\s*td\s*\{[^}]*\}',
    '.matrix-row td {\n  padding: 16px 20px;\n  font-size: 14px;\n  vertical-align: middle;\n  color: #2C1A13;\n}',
    c
)

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/roles.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated table CSS in roles.vue to match CRM layout.')
