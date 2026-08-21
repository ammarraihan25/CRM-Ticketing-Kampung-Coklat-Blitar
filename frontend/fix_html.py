import re

def fix_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The buggy HTML is:
    #       </div>
    # 
    #       </div>
    #     </div>
    # 
    #     <!-- Financial Split Metrics (Bento-style) -->
    
    # Let's just fix it by replacing the extra </div>
    pattern = r'      </div>\n\n      </div>\n    </div>\n\n    <!-- Financial Split Metrics \(Bento-style\) -->'
    replacement = r'      </div>\n    </div>\n\n    <!-- Financial Split Metrics (Bento-style) -->'
    content = re.sub(pattern, replacement, content)
    
    # Also wait, let's make sure we find the exact string.
    # Let's print it if it matches.
    
    # A more robust regex:
    pattern2 = r'(\s*</div>)\s*</div>\s*</div>\s*(<!-- Financial Split Metrics \(Bento-style\) -->)'
    content = re.sub(pattern2, r'\1\n    </div>\n\n    \2', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_html('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/components/dashboard/ShiftSummaryCard.vue')
