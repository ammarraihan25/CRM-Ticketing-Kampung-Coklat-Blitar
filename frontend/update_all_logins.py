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
          
          <!-- Left Column: Article Panel -->
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
                    {{{{ showPassword ? '🙈' : '👁️' }}}}
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
                  <span class="bolt-icon">⚡</span> Auto-fill Akun Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>'''

    # Replace the <section class="form-section"> block
    start_html = content.find('<section class="form-section">')
    if start_html == -1:
        continue
    end_html = content.find('</section>', start_html)
    if end_html == -1:
        continue
    end_html += 10 # include </section>

    content = content[:start_html] + new_html + content[end_html:]

    # For admin.vue, we also need to update the CSS because we previously changed it to .login-card-single
    # For others, we might need to replace their whole CSS block. The easiest is to replace everything after </script>
    
    css_content = '''
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Jost:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; }

.login-role-page {
  min-height: 100vh;
  width: 100%;
  background: #fffaf5;
  color: #321d16;
  font-family: 'Jost', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.role-hero {
  height: 480px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('~/assets/assets_digitalbook/kcb.png');
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(37, 20, 13, 0.78) 0%, rgba(48, 27, 19, 0.58) 50%, rgba(40, 22, 16, 0.86) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 92%);
  text-align: center;
  color: white;
  padding-bottom: 50px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #f49a24;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 16px;
}

.brand-line {
  width: 40px;
  height: 2px;
  background: #f49a24;
  opacity: 0.7;
}

.hero-title {
  color: white;
  font-size: clamp(36px, 4.8vw, 56px);
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0;
  font-weight: 500;
}

.hero-title strong {
  display: block;
  color: #f59b24;
  font-weight: 800;
}

.hero-desc {
  max-width: 680px;
  margin: 16px auto 0;
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 105px;
  z-index: 3;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* FORM SECTION (2 COLUMNS WITH ARTICLE) */
.form-section {
  background: #fffaf5;
  padding-bottom: 80px;
  width: 100%;
}

.form-container {
  width: min(940px, calc(100% - 40px));
  margin: -120px auto 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.login-card-split {
  width: 100%;
  background: white;
  border: 1px solid rgba(44, 26, 19, 0.08);
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0,0,0,0.02);
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.card-left-article {
  background: linear-gradient(145deg, #2C1A13 0%, #170d09 100%);
  color: white;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-icon {
  width: 48px;
  height: 48px;
  background: rgba(245, 158, 11, 0.15);
  color: #F59E0B;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.article-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  line-height: 1.25;
}

.article-content {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0 0 28px 0;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.article-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.list-icon {
  color: #F59E0B;
  flex-shrink: 0;
  margin-top: 1px;
}

.card-right-form {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #FFFFFF;
}

.form-header-unified {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
}

.brand-logo-centered {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.brand-logo-img {
  max-height: 44px;
  width: auto;
  object-fit: contain;
}

.info-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 6px 0;
}

.info-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.clean-auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  color: #374151;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.help-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: #F59E0B;
  text-decoration: none;
}

.help-link:hover { text-decoration: underline; }

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.field-input {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100%;
  padding: 13px 14px 13px 42px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.01) inset;
}

.field-input::placeholder { color: #9CA3AF; }
.field-input:focus { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }

.btn-toggle-eye {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  color: #6B7280;
}

.remember-row {
  display: flex;
  align-items: center;
  margin-top: -2px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.custom-checkbox {
  accent-color: #F59E0B;
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
}

.checkbox-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: #4B5563;
}

.btn-submit-primary {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  background: #2C1A13;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  box-shadow: 0 2px 4px rgba(44, 26, 19, 0.1);
}

.btn-submit-primary:hover:not(:disabled) {
  background: #F59E0B;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  transform: translateY(-1px);
}

.autofill-box-unified {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px dashed #E5E7EB;
}

.btn-autofill-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: none;
  border: none;
  color: #6B7280;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-autofill-text:hover { color: #F59E0B; }

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim { animation: spin 0.8s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

@media (max-width: 860px) {
  .login-card-split {
    grid-template-columns: 1fr;
  }
  .role-hero { height: 380px; }
  .form-container { margin-top: -80px; }
}
</style>
'''

    # Replace everything after <script setup ... </script> with our new css
    script_end = content.find('</script>')
    if script_end != -1:
        content = content[:script_end + 9] + "\n" + css_content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated all 4 login pages with the new 2-column article design.')
