import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/index.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# First, remove them from the HTML
content = re.sub(r'card-(admin|manager|owner|kasir)', '', content)
content = re.sub(r'blob-(admin|manager|owner|kasir)', '', content)
content = re.sub(r'title-(admin|manager|owner|kasir)', '', content)
content = re.sub(r'tag-(admin|manager|owner|kasir)', '', content)
# Clean up multiple spaces inside class quotes
content = re.sub(r'class="([^"]+)"', lambda m: 'class="' + ' '.join(m.group(1).split()) + '"', content)

# Now, replace the CSS section for the role cards
css_start = content.find('/* =========================================================\n   2X2 HARMONIOUS CHOCOLATE TONED ROLE CARDS')
if css_start == -1:
    css_start = content.find('/* =========================================================\n   2X2')
css_end = content.find('/* Icon Blobs */')

new_css = '''/* =========================================================
   PROFESSIONAL UNIFIED ROLE CARDS
========================================================= */
.role-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}

.vibrant-role-card {
  background: #FFFFFF;
  border: 1px solid rgba(44, 26, 19, 0.12);
  border-radius: 14px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.02);
}

.vibrant-role-card:hover {
  border-color: #F59E0B;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.12);
  transform: translateY(-2px);
}

'''

content = content[:css_start] + new_css + content[css_end:]

# Now replace the Icon Blobs and Text Info section
css_start2 = content.find('/* Icon Blobs */')
css_end2 = content.find('/* Card Bottom Footer */')

new_css2 = '''/* Icon Blobs */
.role-icon-blob {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: #F8F5F1;
  color: #3D2214;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.vibrant-role-card:hover .role-icon-blob {
  background: #F59E0B;
  color: #FFFFFF;
  transform: scale(1.05);
}

/* Role Text Info */
.role-text-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.role-name-text {
  font-size: 15px;
  font-weight: 700;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.3px;
  transition: color 0.25s ease;
}

.vibrant-role-card:hover .role-name-text {
  color: #D97706;
}

.role-tag-pill {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  background: #F8F5F1;
  color: #5A3825;
  letter-spacing: 0.2px;
}

'''

content = content[:css_start2] + new_css2 + content[css_end2:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/index.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated login portal CSS')
