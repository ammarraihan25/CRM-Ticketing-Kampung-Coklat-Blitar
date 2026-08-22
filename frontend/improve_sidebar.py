import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace everything from <div class="sidebar-footer"> to the end of </aside>
start_idx = c.find('<div class="sidebar-footer">')
end_idx = c.find('</aside>', start_idx)

new_footer = '''<div class="sidebar-footer">
        <div class="user-profile-btn" style="padding: 12px; gap: 10px;">
          <div class="user-avatar-disc" style="background: linear-gradient(135deg, #F59E0B, #D97706); display: flex; justify-content: center; align-items: center; border-radius: 50%; color: #FFFFFF; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="user-online-pip"></span>
          </div>
          
          <div class="user-details" style="flex: 1; min-width: 0; display: flex; flex-direction: column;">
            <span class="user-name-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 13.5px;">{{ user.name }}</span>
            <span class="user-role-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 11.5px; opacity: 0.9;">{{ user.roleTitle }}</span>
          </div>
          
          <NuxtLink to="/login" class="btn-logout-icon" title="Tutup Kasir">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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

# Add CSS for .btn-logout-icon if not already there
if '.btn-logout-icon' not in c:
    css_to_add = '''
.btn-logout-icon {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  color: #F87171;
  text-decoration: none;
  transition: all 0.2s ease;
}
.btn-logout-icon:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}
'''
    # Insert before </style>
    style_end_idx = c.find('</style>')
    if style_end_idx != -1:
        c = c[:style_end_idx] + css_to_add + c[style_end_idx:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/layouts/admin.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Improved user profile styling for neatness and contrast')
