<script setup lang="ts">
defineProps<{
  text: string;
  type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
  <button :type="type || 'button'" class="base-btn">
    {{ text }}
  </button>
</template>

<style scoped>
.base-btn {
  padding: 0.75rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}
.base-btn:hover {
  background-color: #1a252f;
}
</style>
