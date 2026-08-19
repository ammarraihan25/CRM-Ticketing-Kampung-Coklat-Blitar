<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0] p-6 font-['Jost',sans-serif]">
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-[#EAE5DF] max-w-xl w-full text-center">
      <h1 class="text-2xl font-bold text-[#2C1A13] mb-2">CRM Ticketing &bull; Kampung Coklat Blitar</h1>
      <p class="text-sm text-[#6B5A52] mb-6">Pilih modul yang ingin diakses:</p>
      
      <div class="grid grid-cols-2 gap-3 mb-6">
        <NuxtLink to="/login" class="px-4 py-3 bg-[#2C1A13] text-white text-sm font-bold rounded-xl hover:bg-[#4A2E22] transition-all flex items-center justify-center gap-2 shadow-sm">
          <span>🚪</span> Portal Masuk (4 Role)
        </NuxtLink>
        <NuxtLink to="/dashboard" class="px-4 py-3 bg-[#F29727] text-[#2C1A13] text-sm font-bold rounded-xl hover:bg-[#FFB04D] transition-all flex items-center justify-center gap-2 shadow-sm">
          <span>📊</span> Dashboard Utama
        </NuxtLink>
        <NuxtLink to="/pos" class="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
          <span>🧾</span> POS Kasir
        </NuxtLink>
        <NuxtLink to="/ticketing_dan_gate/self-service" class="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
          <span>🎟️</span> Self Service
        </NuxtLink>
        <NuxtLink to="/guestbook" class="px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
          <span>📖</span> Guestbook
        </NuxtLink>
        <NuxtLink to="/gate" class="px-4 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2">
          <span>🚧</span> Turnstile Gate
        </NuxtLink>
      </div>

      <div class="pt-4 border-t border-[#F3EFEA] flex justify-center gap-4 text-xs text-[#6B5A52]">
        <NuxtLink to="/reports" class="hover:text-[#2C1A13] underline font-medium">Reports & Analytics</NuxtLink>
        <span>&bull;</span>
        <NuxtLink to="/admin/config/tickets-rides" class="hover:text-[#2C1A13] underline font-medium">Tarif & Wahana</NuxtLink>
        <span>&bull;</span>
        <NuxtLink to="/admin/config/roles" class="hover:text-[#2C1A13] underline font-medium">RBAC Roles</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Index navigation hub
</script>
