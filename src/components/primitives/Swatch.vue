<script setup lang="ts">
defineProps<{ color: string; active?: boolean }>();
const emit = defineEmits<{ select: [string] }>();
</script>

<template>
  <button
    class="vc-swatch"
    :class="{ 'is-active': active }"
    :style="{ background: color }"
    type="button"
    :aria-label="color"
    @click="emit('select', color)"
  />
</template>

<style>
.vc-swatch {
  width: var(--vc-swatch-size, 20px);
  height: var(--vc-swatch-size, 20px);
  border-radius: var(--vc-swatch-radius, 4px);
  border: none;
  padding: 0;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.vc-swatch.is-active {
  outline: 2px solid var(--vc-active-color, #2196f3);
  outline-offset: 1px;
}
</style>
