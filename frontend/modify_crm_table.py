import re

def modify_crm_table(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simplify member-cell HTML: remove avatar
    member_cell_pattern = r'<div class="avatar-disc-staff">.*?<\/div>'
    content = re.sub(member_cell_pattern, '', content, flags=re.DOTALL)
    
    # Update table CSS
    table_css_pattern = r'th \{[^}]*\}.*?td \{[^}]*\}.*?tbody tr \{[^}]*\}.*?tbody tr:hover \{[^}]*\}'
    
    new_table_css = '''th {
    padding: 14px 16px;
    border-bottom: 1px solid #F3F4F6;
    background: #FAFAFA;
    color: #6B7280;
    text-align: left;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  td {
    padding: 16px 16px;
    border-bottom: 1px solid #F3F4F6;
    color: #374151;
    font-size: 14px;
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

    # Adjust member-cell text styling
    member_css_pattern = r'\.member-cell > div:last-child \{[^}]*\}.*?\.member-cell strong \{[^}]*\}.*?\.member-cell small \{[^}]*\}'
    new_member_css = '''.member-cell > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .member-cell strong {
    color: #111827;
    font-size: 14px;
    font-weight: 700;
  }
  
  .member-cell small {
    color: #6B7280;
    font-size: 12px;
    font-weight: 500;
  }'''
    
    content = re.sub(member_css_pattern, new_member_css, content, flags=re.DOTALL)

    # Update type badges to look like the pills in the image
    badge_pr_pattern = r'\.badge-pr \{[^}]*\}'
    new_badge_pr = '''.badge-pr { background: #DBEAFE; color: #1E40AF; }'''
    if re.search(badge_pr_pattern, content):
        content = re.sub(badge_pr_pattern, new_badge_pr, content)
    else:
        # Let's see what classes exist
        pass

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_crm_table('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue')
