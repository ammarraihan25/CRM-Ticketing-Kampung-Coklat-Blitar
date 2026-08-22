with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/roles.vue', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace the title and description with just the title, and remove margin-bottom from title
c = c.replace(
    '<div class="module-title-txt">{{ item.module }}</div>\n                <div class="module-desc-txt">{{ item.description }}</div>',
    '<div class="module-title-txt" style="margin-bottom: 0;">{{ item.module }}</div>'
)

# Also update the CSS for module-title-txt so it doesn't need inline style, but inline style works just fine as a quick fix.
# Let's just remove the description completely in one fell swoop.

with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/admin/config/roles.vue', 'w', encoding='utf-8') as f:
    f.write(c)

print('Description removed from roles.vue')
