import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace everything from <div class="sidebar-footer"> to the end of </aside>
start_idx = c.find('<div class="sidebar-footer">')
end_idx = c.find('</aside>', start_idx)

new_footer = '''<div class="sidebar-footer">
        <div class="user-profile-btn" style="position: relative; padding-right: 48px;">
          <div class="user-avatar-disc" style="background: rgba(255,255,255,0.05); display: flex; justify-content: center; align-items: center; border-radius: 50%; color: #F59E0B; border: 1px solid rgba(255,255,255,0.1);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="user-online-pip"></span>
          </div>
          <div class="user-details">
            <span class="user-name-text">{{ user.name }}</span>
            <span class="user-role-text">{{ user.roleTitle }}</span>
          </div>
          
          <NuxtLink to="/login" class="btn-logout-icon" title="Tutup Kasir" style="position: absolute; right: 12px; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #EF4444; text-decoration: none; transition: all 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    '''

if start_idx != -1 and end_idx != -1:
    c = c[:start_idx] + new_footer + c[end_idx:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Combined user profile and logout button in admin.vue')
