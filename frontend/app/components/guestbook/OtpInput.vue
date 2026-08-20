<script setup lang="ts">
const props = withDefaults(defineProps<{ length?: number }>(), {
  length: 6
});

// v-model dua arah: parent baca kode lengkap lewat "code"
const code = defineModel<string>({ default: '' });

const digits = ref<string[]>(Array(props.length).fill(''));
const inputs = ref<HTMLInputElement[]>([]);

function onInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, '').slice(-1);
  digits.value[index] = value;
  code.value = digits.value.join('');

  if (value && index < props.length - 1) {
    inputs.value[index + 1]?.focus();
  }
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}
</script>

<template>
  <div class="otp-input">
    <input
      v-for="(digit, i) in digits"
      :key="i"
      :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }"
      v-model="digits[i]"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="otp-box"
      @input="onInput(i, $event)"
      @keydown="onKeydown(i, $event)"
    />
  </div>
</template>

<style scoped>
.otp-input {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.otp-box {
  width: 44px;
  height: 48px;
  text-align: center;
  font-size: var(--text-headline-sm);
  font-weight: 700;
  border: 1px solid var(--color-border);
  border-radius: var(--rounded-sm);
  color: var(--color-primary);
  font-family: var(--font-family);
}

.otp-box:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 1px var(--color-secondary);
}
</style>