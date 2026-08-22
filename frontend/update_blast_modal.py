import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace modal-header
header_start = c.find('<div class="modal-header">')
header_end = c.find('</div>', c.find('</button>', header_start)) + 6

new_header = """        <div class="modal-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #E5E7EB; padding: 20px;">
          <div class="modal-head-title" style="display: flex; align-items: center; gap: 12px;">
            <div class="modal-icon-badge" style="background-color: #ECFDF5; border: 1px solid #A7F3D0; font-size: 20px; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #047857;">
              💬
            </div>
            <div>
              <h3 style="font-size: 16px; color: #2C1A13; margin: 0; font-weight: 700;">Kirim Broadcast Promo</h3>
              <p class="modal-sub" style="font-size: 12px; color: #6B5A52; margin: 0; margin-top: 2px;">Kirim pesan WhatsApp ke member terpilih.</p>
            </div>
          </div>
          <button class="btn-close" :disabled="isLoading" @click="closeModal" style="background: transparent; border: none; font-size: 24px; cursor: pointer; color: #9CA3AF;">×</button>
        </div>"""

c = c[:header_start] + new_header + c[header_end:]

# Replace modal-footer
footer_start = c.find('<div class="modal-footer">')
footer_end = c.find('</div>', c.find('</button>', footer_start + 50)) + 6

new_footer = """        <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #E5E7EB; padding: 16px 20px;">
          <button class="cancel-button" style="background: white; color: #6B5A52; border: 1px solid #E5E7EB; border-radius: 6px; cursor: pointer; padding: 0 16px; font-weight: 600; height: 34px; font-size: 12.5px;" :disabled="isLoading" @click="closeModal">Batal</button>
          <button class="send-button" style="border-radius: 6px; padding: 0 16px; background: #25D366; border: none; color: white; display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer; height: 34px; font-size: 12.5px;" :disabled="!canSend" @click="handleConfirm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2z"/></svg> 
            <span>Konfirmasi & Kirim</span>
          </button>
        </div>"""

c = c[:footer_start] + new_footer + c[footer_end:]

# Adjust some CSS
c = c.replace('border-radius: 20px;', 'border-radius: 10px;')
c = c.replace('background: #fff0d8;', 'background: #FFF6E8;')
c = c.replace('color: #332016;', 'color: #2C1A13;')
c = c.replace('1px solid #eee7e1', '1px solid #E5E7EB')
c = c.replace('padding: 21px 23px;', 'padding: 20px;')
c = c.replace('rgba(40, 26, 18, 0.30)', 'rgba(0, 0, 0, 0.20)')
c = c.replace('box-shadow:\n    0 30px 90px', 'box-shadow: 0 20px 25px -5px')
c = c.replace('background: #fff6e8;', 'background: #FFFBEB;')
c = c.replace('border: 1px solid #eaddd3;', 'border: 1px solid #FDE68A;')

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'w', encoding='utf-8') as f:
    f.write(c)
print('Blast modal modified successfully.')
