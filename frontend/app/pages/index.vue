<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">CRM Ticketing - Kampung Coklat Blitar</h1>
    <p class="mb-4">Pilih modul yang ingin diakses:</p>
    <div class="flex flex-wrap gap-4 justify-center">
      <NuxtLink to="/pos" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">POS</NuxtLink>
      <NuxtLink to="/ticketing_dan_gate/self-service" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Self Service (Ticketing)</NuxtLink>
      <NuxtLink to="/guestbook" class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Guestbook</NuxtLink>
      <NuxtLink to="/gate" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Gate</NuxtLink>
    </div>
  </div>
</template>
