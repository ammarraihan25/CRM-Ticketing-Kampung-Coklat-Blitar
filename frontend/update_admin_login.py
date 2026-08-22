import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue', 'r', encoding='utf-8') as f:
    content = f.read()

css_start = content.find('/* =========================================================\n   FORM SECTION WITH DUAL-TONE SPLIT CARD')
if css_start == -1:
    css_start = content.find('/* =========================================================\n   FORM SECTION')

# The end of the file or </style>
css_end = content.find('</style>')

new_css = '''/* =========================================================
   FORM SECTION (CLEAN PROFESSIONAL THEME)
========================================================= */
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
  padding: 36px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0,0,0,0.02);
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 36px;
  align-items: center;
}

/* Left Column: Clean Light Panel */
.card-left-info {
  background: #F9F9F9;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.brand-logo-centered {
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
}

.brand-logo-img {
  max-height: 48px;
  width: auto;
  object-fit: contain;
}

.info-title {
  font-size: 21px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 10px 0;
  line-height: 1.25;
}

.info-desc {
  font-size: 13.5px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.autofill-box {
  width: 100%;
}

.btn-autofill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  color: #4B5563;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.btn-autofill:hover {
  background: #FAFAFA;
  border-color: #F59E0B;
  color: #F59E0B;
}

.bolt-icon {
  font-size: 14px;
}

/* Right Column: Clean White Form */
.card-right-form {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
}

.form-header {
  margin-bottom: 24px;
}

.form-title {
  font-size: 22px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 4px 0;
}

.form-subtitle {
  font-size: 13.5px;
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
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.help-link {
  font-size: 12px;
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
  width: 100%;
  padding: 12px 14px 12px 42px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  font-family: inherit;
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
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
}

.btn-submit-primary {
  background: #2C1A13;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
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
@media (max-width: 860px) {
  .login-card-split {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 20px;
  }

  .role-hero {
    height: 380px;
  }

  .form-container {
    margin-top: -80px;
  }
}
'''

if css_start != -1 and css_end != -1:
    content = content[:css_start] + new_css + content[css_end:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/login/admin.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated admin.vue CSS')
