import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Font sizes
c = c.replace('font-size: 8px;', 'font-size: 11px;')
c = c.replace('font-size: 9px;', 'font-size: 12px;')
c = c.replace('font-size: 10px;', 'font-size: 13px;')
c = c.replace('font-size: 11px;', 'font-size: 13px;')
c = c.replace('font-size: 12px;', 'font-size: 14px;')

# Contrast Colors
# Replace pale brown/gray with solid gray (#6B7280) or dark brown (#4B5563)
c = c.replace('color: #a1948a;', 'color: #6B7280;')
c = c.replace('color: #9a8e86;', 'color: #6B7280;')
c = c.replace('color: #998d85;', 'color: #6B7280;')
c = c.replace('color: #9b9088;', 'color: #6B7280;')
c = c.replace('color: #aaa099;', 'color: #9CA3AF;')
c = c.replace('color: #a1968f;', 'color: #6B7280;')
c = c.replace('color: #77543d;', 'color: #4B5563;')

# Replace dark browns with near black (#111827) for high contrast
c = c.replace('color: #493126;', 'color: #111827;')
c = c.replace('color: #3a2419;', 'color: #111827;')
c = c.replace('color: #453127;', 'color: #111827;')
c = c.replace('color: #433026;', 'color: #111827;')
c = c.replace('color: #9c5b22;', 'color: #B45309;') # warning box text to darker amber
c = c.replace('color: #b34e48;', 'color: #DC2626;') # error box text to standard red

# Fix textarea border
c = c.replace('1px solid #ddd5cf', '1px solid #D1D5DB')
c = c.replace('border-color: #9a6b4c', 'border-color: #25D366')
c = c.replace('rgba(154,107,76,0.08)', 'rgba(37, 211, 102, 0.15)') # green glow

# Fix target box and avatars
c = c.replace('border: 1px solid #efe7e2;', 'border: 1px solid #E5E7EB;')
c = c.replace('border: 1px solid #ede4df;', 'border: 1px solid #E5E7EB;')
c = c.replace('background: #fdfaf8;', 'background: #F9FAFB;')

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Blast Confirm Modal styles updated for contrast and size.')
