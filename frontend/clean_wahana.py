import sys

def clean_wahana(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    out_lines = []
    skip = False
    
    for line in lines:
        if '<section class="section-widget-frame">' in line and not skip and not 'SECTION 2' in out_lines[-1] and not 'SECTION 2' in out_lines[-2]:
            # This is the first section (Tickets). We skip until the next section
            skip = True
            
        if '<!-- SECTION 2: KATALOG WAHANA' in line:
            skip = False
            # remove the preceding hr comment if any
            if len(out_lines) > 0 and '======' in out_lines[-1]:
                out_lines.pop()
            out_lines.append('    <!-- ========================================================================= -->\n')
            
        if not skip:
            out_lines.append(line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(out_lines)

clean_wahana('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/wahana.vue')
