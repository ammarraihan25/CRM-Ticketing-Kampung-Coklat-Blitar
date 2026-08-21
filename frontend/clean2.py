import sys

def clean_file(filepath, mode):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    out_lines = []
    skip = False
    
    for line in lines:
        if mode == 'tickets':
            if '<!-- SECTION 2: KATALOG WAHANA' in line:
                skip = True
                # also skip the preceding hr comment
                if len(out_lines) > 0 and '======' in out_lines[-1]:
                    out_lines.pop()
            
            if '<!-- BOTTOM SAFETY BANNER' in line:
                skip = False
                out_lines.append('    <!-- ========================================================================= -->\n')
                
        elif mode == 'wahana':
            if '<section class="section-widget-frame">' in line and 'Tarif Tiket Masuk' in ''.join(lines):
                # We need to skip the first section
                pass
                
        if not skip:
            out_lines.append(line)
            
    if mode == 'tickets':
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(out_lines)

clean_file('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/tickets-rides.vue', 'tickets')
