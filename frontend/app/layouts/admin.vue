<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="brand">
        <h2>Kampung Coklat</h2>
        <span class="subtitle">Admin Portal</span>
      </div>
      <nav>
        <ul>
          <li class="section-title">POS & Gate</li>
          <li><NuxtLink to="/pos/regular" exact-active-class="active">POS Reguler</NuxtLink></li>
          <li><NuxtLink to="/pos/terusan" exact-active-class="active">POS Terusan</NuxtLink></li>
          <li><NuxtLink to="/pos/b2b" exact-active-class="active">POS B2B</NuxtLink></li>
          <li><NuxtLink to="/gate" exact-active-class="active">Gate Scanner</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-surface);
}

.sidebar {
  width: 260px;
  background-color: var(--color-primary);
  color: var(--color-neutral);
  padding: var(--spacing-lg) var(--spacing-md);
  border-right: 1px solid var(--color-primary-60);
  display: flex;
  flex-direction: column;
}

.brand {
  margin-bottom: var(--spacing-lg);
}

.brand h2 {
  color: var(--color-secondary);
  font-size: var(--text-headline-sm);
  margin-bottom: var(--spacing-xs);
}

.brand .subtitle {
  color: var(--color-primary-20);
  font-size: var(--text-body-sm);
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.section-title {
  color: var(--color-primary-20);
  font-size: var(--text-label-sm);
  text-transform: uppercase;
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  letter-spacing: 1px;
}

.sidebar nav ul li a {
  color: var(--color-neutral);
  text-decoration: none;
  font-size: var(--text-label-md);
  padding: 10px 16px;
  display: block;
  border-radius: var(--rounded-sm);
  transition: all 0.2s ease;
}

.sidebar nav ul li a:hover {
  background-color: var(--color-primary-60);
  color: var(--color-neutral);
}

.sidebar nav ul li a.active {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  font-weight: 500;
}

.content {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}
</style>
