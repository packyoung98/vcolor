<script setup lang="ts">
import { computed } from "vue";
import { useDrag } from "../../composables/useDrag";
import type { RGBA } from "../../types";

const props = defineProps<{ rgba: RGBA }>();
const emit = defineEmits<{ input: [number]; change: [] }>();

const grad = computed(() => {
  const { r, g, b } = props.rgba;
  return `linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`;
});
const left = computed(() => `${props.rgba.a * 100}%`);

const { target, down } = useDrag(
  (x) => emit("input", Math.round(x * 100) / 100),
  () => emit("change")
);

function onKey(e: KeyboardEvent) {
  let a = props.rgba.a;
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowDown":
      a -= 0.05;
      break;
    case "ArrowRight":
    case "ArrowUp":
      a += 0.05;
      break;
    case "Home":
      a = 0;
      break;
    case "End":
      a = 1;
      break;
    default:
      return;
  }
  e.preventDefault();
  a = Math.min(1, Math.max(0, Math.round(a * 100) / 100));
  emit("input", a);
  emit("change");
}
</script>

<template>
  <div
    class="vc-alpha"
    ref="target"
    @pointerdown="down"
    @keydown="onKey"
    tabindex="0"
    role="slider"
    aria-label="투명도 (alpha)"
    :aria-valuemin="0"
    :aria-valuemax="1"
    :aria-valuenow="rgba.a"
  >
    <div class="vc-alpha__track">
      <div class="vc-alpha__checker" />
      <div class="vc-alpha__grad" :style="{ background: grad }" />
    </div>
    <div class="vc-alpha__pointer" :style="{ left }" />
  </div>
</template>

<style>
.vc-alpha {
  position: relative;
  width: 100%;
  height: var(--vc-slider-height, 12px);
  cursor: pointer;
  user-select: none;
  touch-action: none;
}
.vc-alpha:focus-visible {
  outline: 2px solid var(--vc-active-color, #2196f3);
  outline-offset: 2px;
}
.vc-alpha__track {
  position: absolute;
  inset: 0;
  border-radius: var(--vc-slider-radius, 6px);
  overflow: hidden;
}
.vc-alpha__checker {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
}
.vc-alpha__grad {
  position: absolute;
  inset: 0;
}
.vc-alpha__pointer {
  position: absolute;
  top: 50%;
  width: var(--vc-pointer-size, 14px);
  height: var(--vc-pointer-size, 14px);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
