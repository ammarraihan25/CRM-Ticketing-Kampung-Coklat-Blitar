import re
import os

files = {
    'admin.vue': {
        'title': 'Kendali Penuh Sistem CRM & Operasional',
        'content': 'Selamat datang di pusat kendali utama. Sebagai Super Admin, Anda memiliki otoritas tertinggi untuk mengatur seluruh konfigurasi sistem Kampung Coklat.',
        'list': [
            'Manajemen Pengguna & Hak Akses (RBAC)',
            'Konfigurasi Harga Tiket & Wahana',
            'Pemantauan Aktivitas Sistem Terpadu'
        ],
        'email_ph': 'admin@kampungcoklat.id',
        'role': 'Super Admin'
    },
    'manager.vue': {
        'title': 'Monitor & Evaluasi Operasional Harian',
        'content': 'Pantau kinerja dan kelancaran operasional secara real-time. Modul ini dirancang untuk memudahkan evaluasi dan pengambilan keputusan taktis di lapangan.',
        'list': [
            'Laporan & Audit Transaksi POS',
            'Pemantauan Kapasitas Wahana',
            'Approval Pengeluaran & Void Kasir'
        ],
        'email_ph': 'manager@kampungcoklat.id',
        'role': 'Operational Manager'
    },
    'owner.vue': {
        'title': 'Tinjauan Strategis & Laporan Eksekutif',
        'content': 'Akses langsung ke ringkasan performa bisnis. Pantau pertumbuhan pendapatan dan tren pengunjung untuk menentukan langkah strategis perusahaan.',
        'list': [
            'Dashboard Analitik & Visualisasi Data',
            'Laporan Keuangan Konsolidasi',
            'Tren & Demografi Pengunjung'
        ],
        'email_ph': 'direksi@kampungcoklat.id',
        'role': 'Owner / Direksi'
    },
    'kasir.vue': {
        'title': 'Pelayanan Cepat & Transaksi Terintegrasi',
        'content': 'Portal point-of-sale modern untuk memproses tiket masuk, wahana, dan paket edukasi dengan cepat dan akurat demi kepuasan pengunjung.',
        'list': [
            'Penjualan Tiket & Gelang Akses',
            'Booking Rombongan & Edukasi',
            'Penutupan & Rekapitulasi Kas Harian'
        ],
        'email_ph': 'kasir@kampungcoklat.id',
        'role': 'Kasir Front Office'
    }
}

base_path = 'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/'

for filename, data in files.items():
    filepath = os.path.join(base_path, filename)
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create the new HTML block
    list_html = ""
    for item in data['list']:
        list_html += f'''
              <li>
                <span class="list-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span>{item}</span>
              </li>'''

    new_html = f'''<section class="form-section">
      <div class="form-container">
        <div class="login-card-split">
          
          <!-- Left Column: Article Panel with Image -->
          <div class="card-left-article">
            <div class="article-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 class="article-title">{data['title']}</h2>
            <p class="article-content">{data['content']}</p>
            <ul class="article-list">
{list_html}
            </ul>
          </div>

          <!-- Right Column: Clean Form -->
          <div class="card-right-form">
            <div class="form-header-unified">
              <div class="brand-logo-centered">
                <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
              </div>
              <h2 class="info-title">Portal {data['role']}</h2>
              <p class="info-desc">Masukkan kredensial akun {data['role']} Anda</p>
            </div>

            <form class="clean-auth-form" @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="admin-email" class="field-label">Alamat Email</label>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  <input id="admin-email" v-model="email" type="email" class="field-input" placeholder="{data['email_ph']}" required />
                </div>
              </div>

              <div class="form-group">
                <div class="label-row">
                  <label for="admin-password" class="field-label">Kata Sandi</label>
                  <a href="#" class="help-link" @click.prevent="alertHelp">Bantuan Akses</a>
                </div>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </span>
                  <input id="admin-password" v-model="password" :type="showPassword ? 'text' : 'password'" class="field-input" placeholder="••••••••" required />
                  <button type="button" class="btn-toggle-eye" title="Tampilkan / Sembunyikan Sandi" @click="showPassword = !showPassword">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                  </button>
                </div>
              </div>

              <div class="remember-row">
                <label class="checkbox-label">
                  <input v-model="rememberMe" type="checkbox" class="custom-checkbox" />
                  <span class="checkbox-text">Ingat sesi di perangkat ini</span>
                </label>
              </div>

              <button type="submit" class="btn-submit-primary" :disabled="isLoading">
                <span v-if="!isLoading">Masuk Sebagai {data['role']} &rarr;</span>
                <span v-else class="loading-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-anim"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
                  <span>Memverifikasi...</span>
                </span>
              </button>
              
              <div class="autofill-box-unified">
                <button type="button" class="btn-autofill-text" @click="fillAdminCredentials">
                  Auto-fill Akun Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>'''

    start_html = content.find('<section class="form-section">')
    if start_html != -1:
        end_html = content.find('</section>', start_html)
        if end_html != -1:
            end_html += 10
            content = content[:start_html] + new_html + content[end_html:]

    # Update CSS block for card-left-article
    old_css = '  background: linear-gradient(145deg, #2C1A13 0%, #170d09 100%);'
    new_css = '''  background-image: 
    linear-gradient(145deg, rgba(44, 26, 19, 0.88) 0%, rgba(23, 13, 9, 0.95) 100%),
    url('~/assets/assets_POS/kamcok1.jpg');
  background-size: cover;
  background-position: center;'''
    
    if old_css in content:
        content = content.replace(old_css, new_css)
    else:
        # Fallback if I slightly miswrote the previous CSS
        old_css = 'background: linear-gradient(145deg, #2C1A13 0%, #170d09 100%);'
        content = content.replace(old_css, new_css)

    # Make the eye icon absolute position and padding slightly larger so it's easier to click
    # and remove any explicit font-sizes that were tiny for emojis.
    btn_eye_css_old = '''.btn-toggle-eye {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  color: #6B7280;
}'''
    btn_eye_css_new = '''.btn-toggle-eye {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-toggle-eye:hover { color: #F59E0B; }'''
    
    if btn_eye_css_old in content:
        content = content.replace(btn_eye_css_old, btn_eye_css_new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated all 4 login pages with kamcok1 bg and removed emojis')
