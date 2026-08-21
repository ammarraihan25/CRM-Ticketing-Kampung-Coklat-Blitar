import re

def modify_wahana(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove Edit Button
    edit_button_pattern = r'<button\s+type="button"\s+class="btn-wahana-pill btn-pill-edit"[^>]*>.*?<\/button>'
    content = re.sub(edit_button_pattern, '', content, flags=re.DOTALL)

    # 2. Update .wahana-top-ribbon
    ribbon_pattern = r'\.wahana-top-ribbon \{[^}]*\}'
    new_ribbon = '''.wahana-top-ribbon {
    position: absolute;
    top: -1px;
    left: -1px;
    background: #F8F2EA;
    color: #C67215;
    border: none;
    padding: 6px 12px;
    border-radius: 8px 0 8px 0;
    font-size: 11px;
    font-weight: 900;
    box-shadow: none;
    z-index: 2;
  }
  
  .wahana-top-ribbon.ribbon-paid {
    background: #FFF1F2;
    color: #BE123C;
  }'''
    # Wait, image 2 is a full pill, not a corner ribbon.
    new_ribbon = '''.wahana-top-ribbon {
    position: absolute;
    top: 8px;
    left: 8px;
    background: #F8F2EA;
    color: #C67215;
    border: none;
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 900;
    box-shadow: none;
    z-index: 2;
  }
  
  .wahana-top-ribbon.ribbon-paid {
    background: #FFF1F2;
    color: #BE123C;
  }'''
    content = re.sub(ribbon_pattern, new_ribbon, content, count=1)
    
    # 3. Update .wahana-status-pill
    status_pill_pattern = r'\.wahana-status-pill \{[^}]*\}'
    new_status_pill = '''.wahana-status-pill {
    position: absolute;
    top: 8px;
    right: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 900;
    cursor: pointer;
    box-shadow: none;
    transition: transform 0.15s ease;
    z-index: 2;
  }'''
    content = re.sub(status_pill_pattern, new_status_pill, content, count=1)
    
    # Update Maintenance button to full width
    action_bar_pattern = r'\.wahana-action-bar-compact \{[^}]*\}'
    new_action_bar = '''.wahana-action-bar-compact {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }
  .btn-pill-maint {
    width: 100%;
    justify-content: center;
  }'''
    content = re.sub(action_bar_pattern, new_action_bar, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_wahana('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
