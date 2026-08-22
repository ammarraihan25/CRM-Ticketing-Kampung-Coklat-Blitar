import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Replace the cartoon SVG with a clean minimalist User icon
svg_pattern = r'<svg class="admin-vector-svg".*?</svg>'
clean_icon = '''<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 50%; color: #F59E0B; border: 1px solid rgba(255,255,255,0.1);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>'''
c = re.sub(svg_pattern, clean_icon, c, flags=re.DOTALL)

# 2. Update the button CSS
btn_pattern = r'\.btn-tutup-kasir\s*\{[^}]*\}'
new_btn = '.btn-tutup-kasir {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 8px;\n  background: transparent;\n  color: #EF4444;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 600;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  transition: all 0.2s ease;\n}'
c = re.sub(btn_pattern, new_btn, c)

hover_pattern = r'\.btn-tutup-kasir:hover\s*\{[^}]*\}'
new_hover = '.btn-tutup-kasir:hover {\n  background: rgba(239, 68, 68, 0.05);\n  border-color: rgba(239, 68, 68, 0.5);\n}'
c = re.sub(hover_pattern, new_hover, c)

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated admin.vue profile and button styling')
