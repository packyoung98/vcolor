<script setup lang="ts">
import { computed } from "vue";
import { useDrag } from "../../composables/useDrag";

const props = defineProps<{ hue: number }>();
const emit = defineEmits<{ input: [number]; change: [] }>();

const left = computed(() => `${(props.hue / 360) * 100}%`);
const { target, down } = useDrag(
  (x) => emit("input", Math.round(x * 360)),
  () => emit("change")
);

function onKey(e: KeyboardEvent) {
  let h = props.hue;
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowDown":
      h -= 1;
      break;
    case "ArrowRight":
    case "ArrowUp":
      h += 1;
      break;
    case "PageDown":
      h -= 10;
      break;
    case "PageUp":
      h += 10;
      break;
    case "Home":
      h = 0;
      break;
    case "End":
      h = 360;
      break;
    default:
      return;
  }
  e.preventDefault();
  emit("input", Math.min(360, Math.max(0, h)));
  emit("change");
}
</script>

<template>
  <div
    class="vc-hue"
    ref="target"
    @pointerdown="down"
    @keydown="onKey"
    tabindex="0"
    role="slider"
    aria-label="색조 (hue)"
    :aria-valuemin="0"
    :aria-valuemax="360"
    :aria-valuenow="Math.round(hue)"
  >
    <div class="vc-hue__pointer" :style="{ left }" />
  </div>
</template>

<style>
.vc-hue {
  position: relative;
  width: 100%;
  height: var(--vc-slider-height, 12px);
  border-radius: var(--vc-slider-radius, 6px);
  cursor: pointer;
  user-select: none;
  touch-action: none;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
.vc-hue:focus-visible {
  outline: 2px solid var(--vc-active-color, #2196f3);
  outline-offset: 2px;
}
.vc-hue__pointer {
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
