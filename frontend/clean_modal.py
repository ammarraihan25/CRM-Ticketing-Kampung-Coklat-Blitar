import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Remove emojis in the message ref
c = c.replace(
    "'Halo {name}! 👋\\n\\nAda promo spesial dari Kampung Coklat untuk Anda. Jangan lewatkan kesempatan menarik ini ya! 🍫'",
    "'Halo {name}!\\n\\nAda promo spesial dari Kampung Coklat untuk Anda. Jangan lewatkan kesempatan menarik ini ya!'"
)

# 2. Replace the chat bubble emoji in header with an SVG icon
svg_chat = """<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>"""
c = c.replace('💬', svg_chat)

# 3. Replace the dart emoji with an SVG icon or just remove the target-icon div.
# Looking at the code, it's <span class="target-icon"> 🎯 </span>
svg_target = """<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>"""
c = c.replace('🎯', svg_target)

# 4. Remove the lightbulb emoji
c = c.replace('💡 ', '')

# 5. Make section labels and subtexts darker for "lebih jelas lagi"
c = c.replace('color: #6B7280;', 'color: #374151;') # Darken all gray texts slightly
c = c.replace('.section-label {\n  color: #374151;', '.section-label {\n  color: #111827;')
# Actually let's just do direct replacements to be safe

# The previous script did this: c = c.replace('color: #a1948a;', 'color: #6B7280;') for .section-label
# Now it's color: #6B7280; inside .section-label { ... }
c = re.sub(r'(\.section-label\s*\{\s*color:\s*)#[0-9A-Fa-f]+;', r'\1#111827;', c)

# Let's also make target-left small and recipient-number span darker
c = re.sub(r'(\.target-left small\s*\{\s*color:\s*)#[0-9A-Fa-f]+;', r'\1#374151;', c)
c = re.sub(r'(\.recipient-number span\s*\{\s*color:\s*)#[0-9A-Fa-f]+;', r'\1#374151;', c)

# And the message hint text
c = re.sub(r'(\.message-hint\s*\{\s*margin-top: 6px;\s*color:\s*)#[0-9A-Fa-f]+;', r'\1#374151;', c)

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/crm/BlastConfirmModul.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print("Removed emojis and boosted contrast.")
