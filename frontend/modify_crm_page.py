import re

reports_file = 'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/reports/index.vue'
crm_file = 'd:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/crm/index.vue'

with open(reports_file, 'r', encoding='utf-8') as f:
    rep_content = f.read()

crm_section_match = re.search(r'<!-- TAB 3: MEMBER / CRM REPORT.*?<section[^>]*>(.*?)</section>', rep_content, re.DOTALL | re.IGNORECASE)
if not crm_section_match:
    print("Could not find CRM section in reports/index.vue")
    exit(1)
    
crm_section = crm_section_match.group(1)

style_match = re.search(r'<style scoped>.*?</style>', rep_content, re.DOTALL)
if not style_match:
    print("Could not find style in reports/index.vue")
    exit(1)
style = style_match.group(0)

# Replace data bindings in template
crm_section = crm_section.replace('memberReportData.totalMembers', 'totalMember')
crm_section = crm_section.replace('memberReportData.prCount', 'totalMemberPR')
crm_section = crm_section.replace('memberReportData.ppCount', 'totalMemberPP')
crm_section = crm_section.replace('memberReportData.ptCount', 'totalMemberPT')

crm_section = crm_section.replace('v-model="memberSegmentFilter"', 'v-model="filters.tipeMember"')
crm_section = crm_section.replace('value="ALL"', 'value=""')

crm_section = crm_section.replace('@click="handleBlastWaPlaceholder"', '@click="openBlast"')
crm_section = crm_section.replace('v-for="m in filteredMemberList"', 'v-for="m in members"')
crm_section = crm_section.replace(':key="m.whatsapp"', ':key="m.id"')
crm_section = crm_section.replace('m.name', 'm.nama')
crm_section = crm_section.replace('m.whatsapp', 'formatWhatsApp(m.whatsapp)')
crm_section = crm_section.replace('m.type.toLowerCase()', "(m.tipeMember || 'pr').toLowerCase()")
crm_section = crm_section.replace('formatMemberType(m.type)', 'getMemberTypeLabel(m.tipeMember)')
crm_section = crm_section.replace('<th>Total Kunjungan</th>', '<th>Total Transaksi GTV</th>')
crm_section = crm_section.replace('{{ m.visits }} Kali', '{{ formatRupiah(m.totalSpend) }}')
crm_section = crm_section.replace('m.registeredAt', "m.tanggalDaftar || '-'")
crm_section = crm_section.replace('m.hasActiveVoucher', "m.status === 'Aktif'")

with open(crm_file, 'r', encoding='utf-8') as f:
    crm_content = f.read()

# Add new computed properties
computed_props = """
const totalMemberPR = computed(() => members.value.filter(m => m.tipeMember === 'PR').length)
const totalMemberPP = computed(() => members.value.filter(m => m.tipeMember === 'PP').length)
const totalMemberPT = computed(() => members.value.filter(m => m.tipeMember === 'PT').length)
"""
crm_content = crm_content.replace('const totalMember = computed(() =>', computed_props + '\nconst totalMember = computed(() =>')

if '<style scoped>' not in crm_content:
    crm_content = crm_content + '\n' + style
else:
    crm_content = re.sub(r'<style scoped>.*?</style>', style, crm_content, flags=re.DOTALL)

# Modify template
new_template = f'''<template>
  <div class="crm-page report-styled">
    <!-- HEADER PATTERN KAMPUNG COKLAT -->
    <header class="executive-command-header">
      <div class="brand-text-wrapper">
        <h1 class="header-main-title">Data Member</h1>
        <div class="header-meta-clean-line">
          Kelola data dan hubungan dengan member Kampung Coklat.
        </div>
      </div>
    </header>
    {crm_section}

    <!-- MODALS AND OVERLAYS -->
'''

modals_match = re.search(r'<!-- DEMO BADGE -->.*?</template>', crm_content, re.DOTALL)
if modals_match:
    new_template += modals_match.group(0)
else:
    new_template += '\n  </div>\n</template>'

crm_content = re.sub(r'<template>.*?</template>', new_template, crm_content, flags=re.DOTALL)

with open(crm_file, 'w', encoding='utf-8') as f:
    f.write(crm_content)

print("CRM file updated successfully!")
