<script setup lang="ts">
defineProps<{
  title: string;
  breadcrumb: string;
}>();
</script>

<template>
  <section class="page-header">
    <div class="page-header-inner">
      <h1>{{ title }}</h1>
      <p class="breadcrumb">
        <NuxtLink to="/">Home</NuxtLink>
        <span class="sep">›</span>
        <span>{{ breadcrumb }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.page-header {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(44, 26, 19, 0.9)), var(--color-primary);
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
  text-align: center;
}

.page-header-inner h1 {
  color: var(--color-neutral);
  font-size: var(--text-headline-lg);
  margin-bottom: var(--spacing-sm);
}

.breadcrumb {
  color: var(--color-primary-20);
  font-size: var(--text-body-sm);
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  margin: 0;
}

.breadcrumb a {
  color: var(--color-primary-20);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--color-secondary);
}

.sep {
  color: var(--color-secondary);
}
</style>