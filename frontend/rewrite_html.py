import re

def rewrite_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to ensure that profile-bar has exactly the right number of closing tags before Financial Split Metrics
    
    # First, let's find everything from <div class="profile-bar"> to <!-- Financial Split Metrics
    pattern = r'(<div class="profile-bar">.*?)(\s*<!-- Financial Split Metrics \(Bento-style\) -->)'
    match = re.search(pattern, content, flags=re.DOTALL)
    if not match:
        return
        
    profile_bar_content = match.group(1)
    
    # Replace the whole chunk with a perfectly formed one
    fixed_profile_bar = '''<div class="profile-bar">
      <div class="profile-left">
        <div class="avatar-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="profile-meta">
          <div class="profile-name-row">
            <span class="cashier-name">{{ activeShift.cashierName }}</span>
          </div>
          <span class="session-time">Sesi Aktif: {{ activeShift.startTime }} - {{ activeShift.endTime }} WIB</span>
        </div>
      </div>
    </div>'''
    
    content = content.replace(profile_bar_content, fixed_profile_bar)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

rewrite_html('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue')
