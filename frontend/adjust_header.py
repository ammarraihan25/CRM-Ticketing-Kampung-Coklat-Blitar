import re

def adjust_header(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the SVG icon inside section-title-badge
    svg_pattern = r'<div class="section-title-badge">\s*<svg.*?</svg>\s*<h2 class="sec-title">'
    content = re.sub(svg_pattern, '<div class="section-title-badge">\n              <h2 class="sec-title">', content, flags=re.DOTALL)

    # 2. Update .section-head-bar CSS
    head_bar_pattern = r'\.section-head-bar \{[^}]*\}'
    new_head_bar = '''.section-head-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }'''
    content = re.sub(head_bar_pattern, new_head_bar, content, count=1)
    
    # 3. Update .sec-title CSS
    sec_title_pattern = r'\.sec-title \{[^}]*\}'
    
    # Let's find what it currently is
    match = re.search(sec_title_pattern, content)
    if match:
        old_sec_title = match.group(0)
        # We will increase font-size. If it's e.g. 18px, we make it 24px.
        new_sec_title = re.sub(r'font-size:\s*\d+px;', 'font-size: 24px;', old_sec_title)
        # Maybe change color to a darker formal one
        content = re.sub(sec_title_pattern, new_sec_title, content, count=1)
    else:
        # If it doesn't exist, we add it after section-title-badge
        new_sec_title = '''.sec-title {
    font-size: 24px;
    font-weight: 800;
    color: #111827;
    margin: 0;
  }'''
        content = content.replace('.section-title-badge {', new_sec_title + '\n\n  .section-title-badge {')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

adjust_header('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue')
adjust_header('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
