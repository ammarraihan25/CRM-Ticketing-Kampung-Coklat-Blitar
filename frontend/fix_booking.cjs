const fs = require('fs');
let c = fs.readFileSync('app/pages/ticketing_dan_gate/self-service/booking.vue', 'utf8');

c = c.replace(/\r\n/g, '\n');

// 1. Remove Cash
const cashRegex = /<!-- TUNAI -->[\s\S]*?<!-- TRANSFER -->/;
c = c.replace(cashRegex, '<!-- TRANSFER -->');

// 2. Add variables to setup
c = c.replace(
`const showPaymentModal = ref(false)
const paymentSuccess = ref(false)
const showTicketModal = ref(false)`,
`const showPaymentModal = ref(false)
const paymentSuccess = ref(false)
const paymentMethod = ref('transfer')
const showTicketModal = ref(false)
const formErrorMessage = ref('')`
);

// 3. Fix grandTotal
c = c.replace(
`                  <span class="pm-total-value">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>`,
`                  <span class="pm-total-value">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>`
);

// 4. Fix showSuccessModal
c = c.replace(
`    <div class="modal-overlay" v-if="showSuccessModal">`,
`    <div class="modal-overlay" v-if="showTicketModal">`
);

// 5. Fix finishTransaction
c = c.replace(
`          <button type="button" class="pm-btn-primary" @click="finishTransaction" style="margin-top: 0; flex: 1;">SELESAI</button>`,
`          <button type="button" class="pm-btn-primary" @click="closeTicketModal" style="margin-top: 0; flex: 1;">SELESAI</button>`
);

// 6. Add saveBookingData
c = c.replace(
`const submitCustomerData = () => {`,
`const saveBookingData = () => {
  formErrorMessage.value = ''
  if (customerPhone.value.trim().length < 10) { formErrorMessage.value = 'Nomor telepon tidak valid (minimal 10 digit).'; return; }
  if (customerName.value.trim().length < 3) { formErrorMessage.value = 'Nama lengkap harus diisi (minimal 3 karakter).'; return; }
  if (!selectedDate.value) { formErrorMessage.value = 'Tanggal kunjungan harus dipilih.'; return; }
  isCustomerDataComplete.value = true
  isDateConfirmed.value = true
}

const submitCustomerData = () => {`
);

// 7. Update button to use saveBookingData and add error message UI
c = c.replace(
`            <button class="btn-primary" @click="() => { 
                if (customerPhone.trim().length < 10) { alert('Nomor telepon tidak valid.'); return; }
                if (customerName.trim().length < 3) { alert('Nama lengkap harus diisi.'); return; }
                if (!selectedDate) { alert('Tanggal kunjungan harus dipilih.'); return; }
                isCustomerDataComplete = true; isDateConfirmed = true; 
              }" 
              style="width: 100%; padding: 16px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-top: 10px;">`,
`            <div v-if="formErrorMessage" style="background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center; margin-top: 10px;">
              {{ formErrorMessage }}
            </div>
            <button class="btn-primary" @click="saveBookingData" 
              style="width: 100%; padding: 16px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-top: 10px;">`
);

// 8. Update summary view
const summaryRegex = /<!-- Summary View when Data is Complete -->[\s\S]*?<button class="btn-outline-primary"[^>]*>Ubah Form<\/button>\s*<\/div>/;
c = c.replace(summaryRegex, `<!-- Summary View when Data is Complete -->
          <div v-else class="summary-card">
            <div class="summary-content">
              <div class="summary-header">
                <div class="summary-name">{{ customerName }} <span v-if="isMemberVerified" class="member-badge">MEMBER</span></div>
                <button class="btn-edit-form" @click="() => { isCustomerDataComplete = false; isDateConfirmed = false; }">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  Ubah Data
                </button>
              </div>
              <div class="summary-details">
                <div class="detail-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>{{ customerPhone }}</span>
                </div>
                <div class="detail-item" v-if="customerAddress">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>{{ customerAddress }}</span>
                </div>
                <div class="detail-item detail-date">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f29727" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>Kunjungan: <strong>{{ formatDate(selectedDate) }}</strong></span>
                </div>
              </div>
            </div>
          </div>`);

// 9. Add CSS
c = c.replace(
`.elegant-title {
  font-family: 'Georgia', serif; /* Simulating the elegant serif of original web */
  color: #2c1a13;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}`,
`.elegant-title {
  font-family: 'Georgia', serif; /* Simulating the elegant serif of original web */
  color: #2c1a13;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

/* Summary Card */
.summary-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e5e7eb;
}
.summary-name {
  font-weight: 800;
  color: #1f2937;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.member-badge {
  background: #f29727;
  color: #ffffff;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.btn-edit-form {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-edit-form:hover {
  background: #f3f4f6;
  color: #1f2937;
  border-color: #9ca3af;
}
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #4b5563;
}
.detail-date {
  margin-top: 8px;
  background: #fff8f1;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #fde6d5;
  color: #c26900;
  display: inline-flex;
  width: fit-content;
}
.detail-date strong {
  color: #b45309;
  margin-left: 4px;
}`
);

// 10. Update verifyMember to use formErrorMessage
c = c.replace(
`const verifyMember = () => {
  if (memberId.value.trim().length >= 5) {
    isMemberVerified.value = true
    // Simulate auto-fill from member database
    customerName.value = 'Budi Santoso'
    customerPhone.value = '081234567890'
    customerAddress.value = 'Jl. Merdeka No. 10, Blitar'
  } else {
    alert('Masukkan ID Member yang valid (min. 5 karakter).')
  }
}`,
`const verifyMember = () => {
  formErrorMessage.value = ''
  if (memberId.value.trim().length >= 5) {
    isMemberVerified.value = true
    // Simulate auto-fill from member database
    customerName.value = 'Budi Santoso'
    customerPhone.value = '081234567890'
    customerAddress.value = 'Jl. Merdeka No. 10, Blitar'
  } else {
    formErrorMessage.value = 'Masukkan ID Member yang valid (min. 5 karakter).'
  }
}`
);

fs.writeFileSync('app/pages/ticketing_dan_gate/self-service/booking.vue', c);
console.log('All fixes applied!');
