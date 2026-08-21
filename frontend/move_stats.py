import re

def move_stats_to_grid(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract profile-stats
    stats_pattern = r'<div class="profile-stats">.*?</div>\s*</div>'
    match = re.search(stats_pattern, content, flags=re.DOTALL)
    if not match:
        return
    
    stats_html = match.group(0)
    
    # We only want the profile-stats div, not the closing div of the parent
    stats_inner = re.search(r'<div class="profile-stats">.*?</div>\s*</div>\s*</div>', content, flags=re.DOTALL) # actually it's inside <div class="profile-bar">
    
    # Let's do it carefully
    # 1. Remove profile-stats from profile-bar
    new_content = re.sub(r'<div class="profile-stats">.*?</div>\s*</div>\s*</div>', '</div>\n    </div>', content, flags=re.DOTALL)

    # Re-read to get the exact HTML
    # The profile-stats block:
    profile_stats_block = '''<div class="metric-card" style="display: flex; align-items: center; justify-content: center;">
        <div class="profile-stats" style="flex-direction: column; align-items: center; gap: 8px;">
          <div class="stat-group" style="align-items: center;">
            <span class="stat-val" style="font-size: 20px;">{{ activeShift.totalTransactions.toLocaleString('id-ID') }}</span>
            <span class="stat-lbl" style="font-size: 11px;">TRANSAKSI</span>
          </div>
          <div class="stat-divider" style="width: 40px; height: 1px; background: #E5E7EB;"></div>
          <div class="stat-group" style="align-items: center;">
            <span class="stat-val text-amber" style="font-size: 20px;">{{ activeShift.totalTicketsSold.toLocaleString('id-ID') }}</span>
            <span class="stat-lbl" style="font-size: 11px;">PAX TERBIT</span>
          </div>
        </div>
      </div>'''

    # Insert into metrics-grid
    grid_pattern = r'<!-- Financial Split Metrics \(Bento-style\) -->\s*<div class="metrics-grid">'
    new_content = re.sub(grid_pattern, f'<!-- Financial Split Metrics (Bento-style) -->\n    <div class="metrics-grid">\n      {profile_stats_block}', new_content)

    # Change grid-template-columns
    new_content = new_content.replace('grid-template-columns: 1fr 1fr;', 'grid-template-columns: 1fr 1fr 1fr;')

    # Fix CSS for profile-stats since it's no longer a row
    new_content = new_content.replace('.profile-stats {\n    display: flex;\n    align-items: center;\n    gap: 16px;\n  }', '.profile-stats {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 16px;\n    width: 100%;\n  }')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

move_stats_to_grid('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue')
