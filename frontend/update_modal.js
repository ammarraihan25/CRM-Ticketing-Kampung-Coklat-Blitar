const fs = require('fs');

const files = [
  'app/pages/pos/tiket-masuk.vue',
  'app/pages/pos/wahana.vue',
  'app/pages/pos/b2b.vue',
  'app/pages/pos/edukasi.vue',
  'app/pages/pos/sewa-hall.vue'
];

const replacementTemplate = `<!-- Payment Modal (2-Column Layout) -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="payment-modal-container">
        
        <div class="pm-layout">
          <!-- Left Column -->
          <div class="pm-left">
            <button class="pm-back-btn" @click="showPaymentModal = false">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Kembali
            </button>

            <!-- Card: Total Pembayaran -->
            <div class="pm-card">
              <div class="pm-card-header">
                <div class="pm-icon bg-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3>Total Pembayaran</h3>
              </div>
              <div class="pm-total-row">
                <span>Total Tagihan</span>
                <strong class="pm-grand-total">Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
              </div>
            </div>

            <!-- Card: Metode Pembayaran -->
            <div class="pm-card">
              <div class="pm-card-header">
                <div class="pm-icon bg-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                </div>
                <h3>Metode Pembayaran</h3>
              </div>
              
              <div class="pm-methods-list">
                <!-- TUNAI -->
                <div class="pm-method-group">
                  <label class="pm-method-label">
                    <div class="pm-method-text">
                      <span class="pm-method-title">Tunai (Cash)</span>
                      <span class="pm-method-desc">Bayar langsung dengan uang tunai di kasir</span>
                    </div>
                    <input type="radio" v-model="paymentMethod" value="cash" name="paymethod" class="pm-radio" />
                  </label>
                  <div class="pm-method-detail" v-if="paymentMethod === 'cash'">
                    <label>Nominal Diterima (Rp)</label>
                    <input type="number" v-model="cashReceived" class="pm-input-text" placeholder="Ketik nominal..." />
                    <div class="pm-change-info" v-if="changeAmount > 0">
                      Kembalian: <strong>Rp {{ changeAmount.toLocaleString('id-ID') }}</strong>
                    </div>
                  </div>
                </div>

                <!-- TRANSFER -->
                <div class="pm-method-group">
                  <label class="pm-method-label">
                    <div class="pm-method-text">
                      <span class="pm-method-title">Transfer Bank / Virtual Account</span>
                      <span class="pm-method-desc">Verifikasi otomatis melalui mutasi</span>
                    </div>
                    <input type="radio" v-model="paymentMethod" value="transfer" name="paymethod" class="pm-radio" />
                  </label>
                  <div class="pm-method-detail" v-if="paymentMethod === 'transfer'">
                    <div class="pm-bank-list">
                      <label class="pm-bank-option">
                        <div style="display:flex; align-items:center; gap:10px; font-weight: 600;">
                           <div class="bank-logo bca">BCA</div> BCA
                        </div>
                        <input type="radio" name="bank" checked />
                      </label>
                      <label class="pm-bank-option">
                        <div style="display:flex; align-items:center; gap:10px; font-weight: 600;">
                           <div class="bank-logo mandiri">MDR</div> Mandiri
                        </div>
                        <input type="radio" name="bank" />
                      </label>
                      <label class="pm-bank-option">
                        <div style="display:flex; align-items:center; gap:10px; font-weight: 600;">
                           <div class="bank-logo bni">BNI</div> BNI
                        </div>
                        <input type="radio" name="bank" />
                      </label>
                      <label class="pm-bank-option">
                        <div style="display:flex; align-items:center; gap:10px; font-weight: 600;">
                           <div class="bank-logo bri">BRI</div> BRI
                        </div>
                        <input type="radio" name="bank" />
                      </label>
                    </div>
                  </div>
                </div>

                <!-- QRIS -->
                <div class="pm-method-group">
                  <label class="pm-method-label">
                    <div class="pm-method-text">
                      <span class="pm-method-title">QRIS</span>
                      <span class="pm-method-desc">Bayar menggunakan E-Wallet / Mobile Banking</span>
                    </div>
                    <input type="radio" v-model="paymentMethod" value="qris" name="paymethod" class="pm-radio" />
                  </label>
                  <div class="pm-method-detail" v-if="paymentMethod === 'qris'">
                    <div class="pm-qris-box">
                      <div class="pm-qr-placeholder">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
                      </div>
                      <p>Silakan scan QRIS di atas.</p>
                    </div>
                  </div>
                </div>

                <!-- DEBIT/KREDIT -->
                <div class="pm-method-group">
                  <label class="pm-method-label">
                    <div class="pm-method-text">
                      <span class="pm-method-title">Kartu Debit / Kredit (EDC)</span>
                      <span class="pm-method-desc">Gesek kartu pada mesin EDC Kasir</span>
                    </div>
                    <input type="radio" v-model="paymentMethod" value="debit" name="paymethod" class="pm-radio" />
                  </label>
                  <div class="pm-method-detail" v-if="paymentMethod === 'debit'">
                    <label>Nomor Referensi EDC (Opsional)</label>
                    <input type="text" class="pm-input-text" placeholder="Contoh: 123456" />
                  </div>
                </div>

              </div>
            </div>

            <button class="pm-btn-bayar" @click="processPayment">BAYAR & CETAK STRUK</button>
          </div>

          <!-- Right Column -->
          <div class="pm-right">
            <div class="pm-card" style="height: 100%; display: flex; flex-direction: column;">
              <div class="pm-card-header">
                <div class="pm-icon bg-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h3>Detail Pesanan</h3>
              </div>
              
              <div class="pm-order-list">
                <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="pm-order-item">
                  <div class="pm-item-header">
                    <span class="pm-item-name">{{ item.name }}</span>
                    <span class="pm-item-total">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
                  </div>
                  <div class="pm-item-meta">
                    <span class="pm-item-qty">{{ item.qty }}x</span> @ Rp {{ item.price.toLocaleString('id-ID') }}
                  </div>
                </div>
              </div>

              <!-- Discount for B2B if present -->
              <div v-if="typeof discountPercent !== 'undefined' && discountPercent > 0" class="pm-order-discount">
                <span>Diskon ({{ discountPercent }}%)</span>
                <span>- Rp {{ discountAmount.toLocaleString('id-ID') }}</span>
              </div>

              <div class="pm-order-grandtotal">
                <span>Total Tagihan</span>
                <span>Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>\n\n`;

const replacementCSS = `
/* Payment Modal Redesign */
.payment-modal-container { background: #f7f9fa; width: 1000px; max-width: 95vw; height: 90vh; max-height: 800px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: modalFadeIn 0.3s ease; }
@keyframes modalFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.pm-layout { display: flex; flex: 1; overflow: hidden; }
.pm-left { flex: 3; padding: 30px; overflow-y: auto; background: #f7f9fa; }
.pm-right { flex: 2; padding: 30px; background: #f0f2f5; border-left: 1px solid #e5e7eb; overflow-y: auto; }
.pm-back-btn { background: transparent; border: none; font-size: 16px; font-weight: 600; color: #555; display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 20px; padding: 0; }
.pm-back-btn:hover { color: #f29727; }
.pm-card { background: #fff; border-radius: 12px; border: 1px solid #eef0f2; box-shadow: 0 4px 15px rgba(0,0,0,0.03); padding: 25px; margin-bottom: 20px; }
.pm-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.pm-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.pm-icon.bg-green { background: #27ae60; }
.pm-card-header h3 { margin: 0; font-size: 18px; font-weight: 800; color: #2c1a13; }
.pm-total-row { display: flex; justify-content: space-between; align-items: center; background: #fdfdfd; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; }
.pm-total-row span { font-weight: 600; color: #555; }
.pm-grand-total { font-size: 24px; color: #27ae60; font-weight: 900; }
.pm-methods-list { display: flex; flex-direction: column; gap: 15px; }
.pm-method-group { border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa; overflow: hidden; }
.pm-method-label { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; cursor: pointer; background: #fff; transition: background 0.2s; }
.pm-method-label:hover { background: #fdfdfd; }
.pm-method-text { display: flex; flex-direction: column; gap: 4px; }
.pm-method-title { font-weight: 700; color: #333; font-size: 15px; }
.pm-method-desc { font-size: 12px; color: #888; }
.pm-radio { width: 20px; height: 20px; accent-color: #f29727; }
.pm-method-detail { padding: 20px; background: #fafafa; border-top: 1px solid #e5e7eb; }
.pm-input-text { width: 100%; padding: 12px 15px; font-size: 16px; border: 1.5px solid #ddd; border-radius: 8px; outline: none; font-weight: 600; background: #fff; margin-top: 8px; box-sizing: border-box; }
.pm-input-text:focus { border-color: #f29727; }
.pm-change-info { margin-top: 15px; padding: 12px; background: #e8f5e9; color: #2e7d32; border-radius: 8px; font-size: 16px; border: 1px solid #a5d6a7; display: flex; justify-content: space-between; }
.pm-bank-list { display: flex; flex-direction: column; gap: 10px; }
.pm-bank-option { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; }
.pm-bank-option:hover { border-color: #f29727; }
.bank-logo { font-size: 11px; font-weight: 900; color: #fff; padding: 4px 8px; border-radius: 4px; font-style: italic; }
.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }
.pm-qris-box { text-align: center; background: #fff; padding: 20px; border-radius: 8px; border: 1px dashed #ccc; }
.pm-qr-placeholder { width: 150px; height: 150px; margin: 0 auto 15px auto; background: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 20px 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 5px solid #eee; }
.pm-btn-bayar { width: 100%; background: #f29727; color: #fff; font-size: 18px; font-weight: 900; padding: 18px; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-top: 20px; box-shadow: 0 4px 15px rgba(242,151,39,0.3); }
.pm-btn-bayar:hover { background: #e08920; transform: translateY(-2px); }
.pm-order-list { flex: 1; overflow-y: auto; margin-bottom: 20px; padding-right: 5px; }
.pm-order-item { border-bottom: 1px dashed #e5e7eb; padding-bottom: 12px; margin-bottom: 12px; }
.pm-item-header { display: flex; justify-content: space-between; font-weight: 700; color: #333; margin-bottom: 5px; }
.pm-item-meta { font-size: 13px; color: #777; }
.pm-item-qty { font-weight: 800; color: #555; }
.pm-order-discount { display: flex; justify-content: space-between; padding: 10px; background: #fff3e0; color: #e65100; font-weight: bold; font-size: 14px; border-radius: 8px; margin-bottom: 15px; }
.pm-order-grandtotal { display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #2c1a13; font-size: 18px; font-weight: 900; color: #2c1a13; }
</style>
`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let startIndex = content.indexOf('<div class="modal-overlay" v-if="showPaymentModal">');
  let endIndex = content.indexOf('<div class="modal-overlay" v-if="showSuccessModal">');
  
  if (startIndex === -1 || endIndex === -1) {
    console.log('Could not find markers in ' + file);
    continue;
  }
  
  let newContent = content.substring(0, startIndex) + replacementTemplate + '    ' + content.substring(endIndex);
  
  newContent = newContent.replace('</style>', replacementCSS);
  fs.writeFileSync(file, newContent);
  console.log('Updated ' + file);
}
