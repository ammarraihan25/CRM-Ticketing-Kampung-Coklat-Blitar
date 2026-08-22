import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace HTML section
start_html = content.find('<section class="form-section">')
end_html = content.find('</section>', start_html) + 10

new_html = '''<section class="form-section">
      <div class="form-container">
        <div class="login-card-single">
          
          <div class="form-header-unified">
            <div class="brand-logo-centered">
              <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
            </div>
            <h2 class="info-title">Portal Super Admin</h2>
            <p class="info-desc">Masukkan kredensial akun administrator Anda</p>
          </div>

          <form class="clean-auth-form" @submit.prevent="handleLogin">
            
            <div class="form-group">
              <label for="admin-email" class="field-label">Alamat Email</label>
              <div class="input-wrap">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="admin-email"
                  v-model="email"
                  type="email"
                  class="field-input"
                  placeholder="admin@kampungcoklat.id"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="admin-password" class="field-label">Kata Sandi</label>
                <a href="#" class="help-link" @click.prevent="alertHelp">Bantuan Akses</a>
              </div>
              <div class="input-wrap">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="admin-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="field-input"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  class="btn-toggle-eye"
                  title="Tampilkan / Sembunyikan Sandi"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
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
              <span v-if="!isLoading">Masuk Sebagai Super Admin &rarr;</span>
              <span v-else class="loading-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-anim">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
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
    </section>'''

if start_html != -1 and end_html != -1:
    content = content[:start_html] + new_html + content[end_html:]


# Replace CSS section
css_start = content.find('/* =========================================================\n   FORM SECTION')
css_end = content.find('</style>')

new_css = '''/* =========================================================
   FORM SECTION (SINGLE CENTERED CARD)
========================================================= */
.form-section {
  background: #fffaf5;
  padding-bottom: 80px;
  width: 100%;
}

.form-container {
  width: min(520px, calc(100% - 40px));
  margin: -120px auto 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.login-card-single {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid rgba(44, 26, 19, 0.08);
  border-radius: 16px;
  padding: 40px 48px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
}

.form-header-unified {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
}

.brand-logo-centered {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.brand-logo-img {
  max-height: 52px;
  width: auto;
  object-fit: contain;
}

.info-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 8px 0;
  line-height: 1.25;
}

.info-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 0;
}

.clean-auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.help-link:hover {
  text-decoration: underline;
}

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

.field-input::placeholder {
  color: #9CA3AF;
}

.field-input:focus {
  border-color: #F59E0B;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

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
  gap: 10px;
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

.btn-autofill-text:hover {
  color: #F59E0B;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 640px) {
  .login-card-single {
    padding: 32px 24px;
  }
}
\n'''

if css_start != -1 and css_end != -1:
    content = content[:css_start] + new_css + content[css_end:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated admin login model to a single centered layout with neat fonts')
