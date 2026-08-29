const fs = require('fs');
let c = fs.readFileSync('update_modal.cjs', 'utf8');

// 1. Remove Cash Payment Option
const regexCash = /<label class="payment-method-card">\s*<div class="pm-radio">\s*<input type="radio" name="paymentMethod" value="cash" checked>\s*<span class="pm-radio-circle"><\/span>\s*<\/div>\s*<div class="pm-info">\s*<span class="pm-name">Tunai \(Cash\)<\/span>\s*<span class="pm-desc">Bayar langsung dengan uang tunai di kasir<\/span>\s*<\/div>\s*<\/label>\s*<!-- Nominal Input -->\s*<div class="nominal-input-container">\s*<label class="nominal-label">Nominal Diterima \(Rp\)<\/label>\s*<input type="text" class="nominal-input" placeholder="0" \/>\s*<\/div>/g;
c = c.replace(regexCash, '');

// 2. Set Transfer Bank as default checked
c = c.replace('value="transfer"', 'value="transfer" checked');

// 3. Change files target
c = c.replace(/const files = \[[\s\S]*?\];/, "const files = ['app/pages/ticketing_dan_gate/self-service/booking.vue'];");

// 4. Change start marker
c = c.replace("'<div class=\"modal-overlay\" v-if=\"showPaymentModal\">'", "'<!-- Payment Modal (QRIS) -->'");

fs.writeFileSync('update_booking_modal.cjs', c);
console.log('Created update_booking_modal.cjs');
