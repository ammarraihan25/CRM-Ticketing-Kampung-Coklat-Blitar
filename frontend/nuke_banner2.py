def remove_banner(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Try to find the exact banner string
    start_str = '<!-- ========================================================================= -->\n    <!-- BOTTOM SAFETY BANNER                                                      -->\n    <!-- ========================================================================= -->\n    <section class="safety-banner-reference">'
    start_idx = c.find(start_str)
    
    if start_idx == -1:
        # Fallback to just the section tag
        start_idx = c.find('<section class="safety-banner-reference">')

    if start_idx != -1:
        # Find the closing tag
        end_idx = c.find('</section>', start_idx)
        if end_idx != -1:
            end_idx += len('</section>')
            # also remove any trailing whitespace or newlines up to the next block
            while end_idx < len(c) and c[end_idx] in ['\n', ' ', '\r']:
                end_idx += 1
            
            c = c[:start_idx] + c[end_idx:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(c)
            print(f"Successfully removed banner from {file_path}")
        else:
            print(f"Could not find end marker in {file_path}")
    else:
        print(f"Could not find start marker in {file_path}")

remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue')
remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
