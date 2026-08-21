import re

def modify_crm_status(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simplify status HTML: remove status-dot-mini and uppercase the text
    status_cell_pattern = r'<span\s+class="status-pill-badge"[^>]*>.*?<\/span>'
    
    # We will use re.sub with a function to process each match
    def replace_status(match):
        text = match.group(0)
        text = re.sub(r'<span class="status-dot-mini"><\/span>', '', text)
        text = text.replace('{{ member.status }}', '{{ member.status.toUpperCase() }}')
        return text

    content = re.sub(status_cell_pattern, replace_status, content, flags=re.DOTALL)
    
    # Also for selectedMember (if exists)
    selected_status_pattern = r'<span\s+class="status active"\s*>.*?<\/span>'
    content = re.sub(selected_status_pattern, '', content, flags=re.DOTALL) # Just leave it as is for modal if we don't care, but let's just focus on table.

    # Update status CSS
    status_css_pattern = r'\.status-active \{.*?\}\s*\.status-locked \{.*?\}'
    new_status_css = '''.status-active { background: #D1FAE5; color: #065F46; }
  .status-locked { background: #F3F4F6; color: #6B7280; }'''
    content = re.sub(status_css_pattern, new_status_css, content, flags=re.DOTALL)

    # Make pill shape more rounded if image had it? Image had border-radius: 6px maybe. 
    # Current type-badge has 6px, status-pill-badge has 6px.
    # Image pill seems slightly rounded like 4px or 6px.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_crm_status('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue')
