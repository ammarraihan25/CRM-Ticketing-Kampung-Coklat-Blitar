import re

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# I will find the exact div wrapper for the safety banner.
# The previous search showed it has class="safety-banner-wrapper" or similar, let's just find the start of the banner and remove it.
start_idx = c.find('<div class="safety-banner')
if start_idx == -1:
    # Maybe it's not called safety-banner-wrapper
    start_idx = c.find('<!-- Safety Banner')
    if start_idx == -1:
        # Just find the div containing the word "Safety is our Priority" and trace back to its parent container
        # Let's use regex to aggressively remove the section containing "Safety is our Priority"
        c = re.sub(r'<div[^>]*class="[^"]*banner[^"]*"[^>]*>.*?Safety is our Priority.*?</div>\s*</div>\s*</div>', '', c, flags=re.DOTALL | re.IGNORECASE)

if start_idx != -1:
    # We found a marker. Let's just remove everything from this marker up to the next SECTION comment.
    end_idx = c.find('<!-- ========================================================================= -->', start_idx)
    if end_idx != -1:
        c = c[:start_idx] + c[end_idx:]

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Banner removed from tickets-rides.vue')
