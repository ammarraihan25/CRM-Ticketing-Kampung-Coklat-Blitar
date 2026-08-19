<template>
  <div class="pos-layout">
    <header class="pos-header">
      <div class="brand">
        <h2>POS Kasir</h2>
      </div>
      <div class="user-info">
        <span>Kasir: Budi</span>
        <NuxtLink to="/" class="btn-link">Tutup Kasir</NuxtLink>
      </div>
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
  background-color: var(--color-surface);
  overflow: hidden;
}

.pos-header {
  background-color: var(--color-primary);
  color: var(--color-neutral);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-secondary);
}

.pos-header h2 {
  color: var(--color-neutral);
  margin: 0;
  font-size: var(--text-headline-sm);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--text-body-sm);
}

.btn-link {
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 500;
}

.pos-content {
  flex: 1;
  overflow: hidden;
}
</style>
