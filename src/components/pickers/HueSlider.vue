<script setup lang="ts">
import Hue from "../primitives/Hue.vue";

// 스펙 6.5: HueSlider의 v-model은 색이 아니라 숫자(0–360) 하나다.
const model = defineModel<number>({ default: 0 });
const props = withDefaults(defineProps<{ width?: string }>(), {
  width: "var(--vc-width, 240px)",
});
const emit = defineEmits<{ change: [number]; input: [number] }>();

function onInput(h: number) {
  model.value = h;
  emit("input", h);
}
function onChange() {
  emit("change", model.value ?? 0);
}
</script>

<template>
  <div class="vc-hue-slider" :style="{ width: props.width }">
    <Hue :hue="model ?? 0" @input="onInput" @change="onChange" />
  </div>
</template>

<style>
.vc-hue-slider {
  padding: 12px;
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
}
</style>
