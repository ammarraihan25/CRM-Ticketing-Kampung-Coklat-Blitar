<template>
  <div class="pos-layout">
    <!-- POS usually takes the full screen and has a custom top bar -->
    <header class="pos-header">
      <h1>POS Kasir - Kampung Coklat</h1>
      <NuxtLink to="/">Kembali ke Dashboard</NuxtLink>
    </header>
    <main class="pos-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.pos-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ecf0f1;
}
.pos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2980b9;
  color: white;
}
.pos-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
.pos-header a {
  color: white;
  text-decoration: none;
}
.pos-content {
  flex: 1;
  overflow: hidden;
}
</style>
