def remove_banner(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    start_idx = c.find('<div class="safety-banner-wrapper">')
    if start_idx == -1:
        start_idx = c.find('<!-- Safety Banner -->')
    
    if start_idx != -1:
        # Find the end marker
        end_idx = c.find('<!-- ========================================================================= -->', start_idx)
        if end_idx != -1:
            c = c[:start_idx] + c[end_idx:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(c)
            print(f"Successfully sliced out banner in {file_path}")
        else:
            print(f"Could not find end marker in {file_path}")
    else:
        print(f"Could not find start marker in {file_path}")

remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue')
remove_banner('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
