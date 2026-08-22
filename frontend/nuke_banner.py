import os

def remove_banner(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            c = f.read()
        
        # Look for the start of the banner wrapper
        start_idx = c.find('<div class="safety-banner-wrapper">')
        if start_idx != -1:
            # Look for the next section closing or a known element after the banner
            # Let's find the closing tag of the banner wrapper. It's a div.
            # Assuming it's the last element before closing a section or just the end of the template.
            # Let's just find the exact string we know is there and remove its parent block manually.
            pass
        
        import re
        # Remove anything starting with <div class="safety-banner-wrapper"> up to a certain point
        # Since it's at the end of the main section, we can just replace the whole block
        new_c = re.sub(r'<div class="safety-banner-wrapper">.*?</div>\s*</div>\s*</div>\s*(<!-- ==================|</section>)', r'\1', c, flags=re.DOTALL)
        
        # Fallback if the regex above didn't catch it
        if new_c == c:
            new_c = re.sub(r'<!-- Safety Banner -->.*?<!-- ========================================================================= -->', '<!-- ========================================================================= -->', c, flags=re.DOTALL)
        
        # Another fallback
        if new_c == c:
            new_c = re.sub(r'<div class="safety-banner-wrapper">.*?</svg>\s*</div>\s*</div>', '', c, flags=re.DOTALL)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_c)
            
        print(f"Processed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue')
remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
