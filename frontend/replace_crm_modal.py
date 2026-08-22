import re
with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace the Teleport content for the Detail Member modal
modal_start = c.find('<Teleport to="body">')
modal_end = c.find('</Teleport>', modal_start) + 11

new_modal = """    <Teleport to="body">
      <div v-if="showDetailModal && selectedMember" class="modal-backdrop" @click.self="closeMemberDetail">
        <div class="modal-card" style="max-width: 500px;">
          <div class="modal-header">
            <div class="modal-head-title">
              <div class="modal-icon-badge" style="background-color: #FFF6E8; border: 1px solid #FDE68A; color: #B45309;">👤</div>
              <div>
                <h3>Detail Member</h3>
                <p class="modal-sub">Profil dan informasi kontak member</p>
              </div>
            </div>
            <button class="btn-close" @click="closeMemberDetail">×</button>
          </div>
          <div class="modal-body">
            <div class="export-preview-box">
               <div class="preview-logo-box" style="width: 56px; height: 56px; background: #FFF; border: 2px solid #FDE68A;">
                 <span style="font-size: 24px; font-weight: 900; color: #B45309;">{{ getInitial(selectedMember.nama) }}</span>
               </div>
               <div class="preview-meta" style="flex: 1;">
                 <span class="doc-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 19px;">{{ selectedMember.nama }}</span>
                 <span class="doc-sub">Member sejak {{ selectedMember.tanggalDaftar || '2024' }}</span>
                 <span class="doc-tag" style="margin-top: 6px; padding: 2px 8px;">{{ getMemberTypeLabel(selectedMember.tipeMember) }}</span>
               </div>
            </div>

            <div class="ticket-status-grid" style="grid-template-columns: repeat(2, 1fr); margin-top: 10px;">
              <div class="ticket-stat-card border-green">
                <span class="t-stat-label">WhatsApp</span>
                <span class="t-stat-val" style="font-size: 16px;">{{ formatWhatsApp(selectedMember.whatsapp) }}</span>
                <span class="t-stat-sub">Nomor kontak utama</span>
              </div>
              <div class="ticket-stat-card border-amber">
                <span class="t-stat-label">Domisili</span>
                <span class="t-stat-val" style="font-size: 16px;">{{ selectedMember.domisili || '-' }}</span>
                <span class="t-stat-sub">Kota / wilayah</span>
              </div>
              <div class="ticket-stat-card border-blue">
                <span class="t-stat-label">Total Spend</span>
                <span class="t-stat-val" style="font-size: 16px;">{{ formatRupiah(selectedMember.totalSpend) }}</span>
                <span class="t-stat-sub">Total transaksi member</span>
              </div>
              <div class="ticket-stat-card border-gray">
                <span class="t-stat-label">Member ID</span>
                <span class="t-stat-val" style="font-size: 16px;">#{{ selectedMember.id }}</span>
                <span class="t-stat-sub">ID sistem CRM</span>
              </div>
            </div>

            <div class="ticket-stat-card border-all" style="margin-top: 5px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                 <span class="t-stat-label">Member Overview</span>
                 <span class="status-pill pill-used" style="background-color: #ECFDF5; color: #047857;">● ACTIVE</span>
              </div>
              <div class="demo-grid-row">
                 <div>
                    <span class="t-stat-sub">Member Type</span><br>
                    <strong style="font-size: 13px;">{{ getMemberTypeLabel(selectedMember.tipeMember) }}</strong>
                 </div>
                 <div>
                    <span class="t-stat-sub">WhatsApp</span><br>
                    <strong style="font-size: 13px;">{{ selectedMember.whatsapp ? 'Tersedia' : 'Tidak tersedia' }}</strong>
                 </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="margin-top: 10px;">
            <button class="btn-sm" style="background: white; color: #6B5A52; border: 1px solid #E5E7EB; border-radius: 6px; cursor: pointer; padding: 0 16px; font-weight: 600;" @click="closeMemberDetail">Tutup</button>
            <button class="btn-primary btn-sm" style="border-radius: 6px; padding: 0 16px; background: #25D366; border: none; color: white; display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer;" :disabled="!selectedMember.whatsapp" @click="selected = [selectedMember.id]; closeMemberDetail(); openBlast();">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Kirim WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Teleport>"""

new_content = c[:modal_start] + new_modal + c[modal_end:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('CRM modal replaced successfully.')
