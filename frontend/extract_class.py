with open('d:/CRM-Ticketing-Kampung-Coklat-Blitar-main/frontend/app/pages/reports/index.vue', 'r', encoding='utf-8') as f:
    c = f.read()
import re
match = re.search(r'<template>\s*<div class="([^"]+)">', c)
print('reports main class:', match.group(1) if match else 'Not found')
