import re

def revert_stats(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the profile-stats block from metrics-grid
    profile_stats_in_grid_pattern = r'<div class="metric-card"[^>]*>\s*<div class="profile-stats".*?</div>\s*</div>\s*</div>'
    match = re.search(profile_stats_in_grid_pattern, content, flags=re.DOTALL)
    if match:
        content = content.replace(match.group(0), '')
    
    # Re-add profile-stats to profile-bar right after profile-left
    profile_left_pattern = r'(<div class="profile-left">.*?</div>)(\s*)(</div>)'
    
    original_profile_stats = '''
      <div class="profile-stats">
        <div class="stat-group">
          <span class="stat-val">{{ activeShift.totalTransactions.toLocaleString('id-ID') }}</span>
          <span class="stat-lbl">Transaksi</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-group">
          <span class="stat-val text-amber">{{ activeShift.totalTicketsSold.toLocaleString('id-ID') }}</span>
          <span class="stat-lbl">Pax Terbit</span>
        </div>
      </div>'''

    def replacer(m):
        # m.group(1) is profile-left block
        # m.group(3) is the closing div of profile-bar
        return m.group(1) + "\n" + original_profile_stats + m.group(2) + m.group(3)
        
    content = re.sub(profile_left_pattern, replacer, content, flags=re.DOTALL)
    
    # Reset grid-template-columns
    content = content.replace('grid-template-columns: 1fr 1fr 1fr;', 'grid-template-columns: 1fr 1fr;')
    
    # Reset CSS for profile-stats
    css_pattern = r'\.profile-stats \{\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*gap: 16px;\s*width: 100%;\s*\}'
    original_css = '''.profile-stats {
    display: flex;
    align-items: center;
    gap: 16px;
  }'''
    content = re.sub(css_pattern, original_css, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

revert_stats('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue')
