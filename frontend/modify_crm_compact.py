import re

def modify_crm_compact(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update table CSS to be much more compact like Image 1
    table_css_pattern = r'th \{[^}]*\}.*?td \{[^}]*\}.*?tbody tr \{[^}]*\}.*?tbody tr:hover \{[^}]*\}'
    
    new_table_css = '''th {
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    background: #FAFAFA;
    color: #6B7280;
    text-align: left;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  td {
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    vertical-align: middle;
  }
  
  tbody tr {
    transition: background 0.15s ease;
  }
  
  tbody tr:hover {
    background: #F9FAFB;
  }'''
    
    content = re.sub(table_css_pattern, new_table_css, content, flags=re.DOTALL)

    # Make member-cell more compact
    member_css_pattern = r'\.member-cell strong \{[^}]*\}.*?\.member-cell small \{[^}]*\}'
    new_member_css = '''.member-cell strong {
    color: #111827;
    font-size: 13px;
    font-weight: 700;
  }
  
  .member-cell small {
    color: #6B7280;
    font-size: 11px;
    font-weight: 500;
  }'''
    
    content = re.sub(member_css_pattern, new_member_css, content, flags=re.DOTALL)

    # Make the badges smaller to fit the compact row
    badge_css_pattern = r'\.type-badge \{[^}]*\}'
    new_badge_css = '''.type-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }'''
    content = re.sub(badge_css_pattern, new_badge_css, content, flags=re.DOTALL)

    status_css_pattern = r'\.status-pill-badge \{[^}]*\}'
    new_status_css = '''.status-pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }'''
    content = re.sub(status_css_pattern, new_status_css, content, flags=re.DOTALL)
    
    # Make view button smaller
    view_btn_pattern = r'\.view-button \{[^}]*\}'
    new_view_btn = '''.view-button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #FFFFFF;
    border: 1px solid #EADBCC;
    color: #5A3A28;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }'''
    content = re.sub(view_btn_pattern, new_view_btn, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_crm_compact('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue')
