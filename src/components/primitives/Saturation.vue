<script setup lang="ts">
import { computed } from "vue";
import { useDrag } from "../../composables/useDrag";

const props = defineProps<{ hue: number; saturation: number; value: number }>();
const emit = defineEmits<{ input: [{ s: number; v: number }]; change: [] }>();

const bg = computed(() => `hsl(${props.hue}, 100%, 50%)`);
const left = computed(() => `${props.saturation}%`);
const top = computed(() => `${100 - props.value}%`);

const { target: _target, down } = useDrag(
  (x, y) =>
    emit("input", { s: Math.round(x * 100), v: Math.round((1 - y) * 100) }),
  () => emit("change")
);

function onKey(e: KeyboardEvent) {
  let s = props.saturation;
  let v = props.value;
  switch (e.key) {
    case "ArrowLeft":
      s -= 1;
      break;
    case "ArrowRight":
      s += 1;
      break;
    case "ArrowUp":
      v += 1;
      break;
    case "ArrowDown":
      v -= 1;
      break;
    default:
      return;
  }
  e.preventDefault();
  emit("input", {
    s: Math.min(100, Math.max(0, s)),
    v: Math.min(100, Math.max(0, v)),
  });
  emit("change");
}
</script>

<template>
  <div
    class="vc-saturation"
    ref="target"
    :style="{ background: bg }"
    @pointerdown="down"
    @keydown="onKey"
    tabindex="0"
    role="slider"
    aria-label="채도/명도 (saturation/value)"
    :aria-valuetext="`S ${Math.round(saturation)}, V ${Math.round(value)}`"
  >
    <div class="vc-saturation__white" />
    <div class="vc-saturation__black" />
    <div class="vc-saturation__pointer" :style="{ left, top }" />
  </div>
</template>

<style>
.vc-saturation {
  position: relative;
  width: 100%;
  height: var(--vc-panel-height, 140px);
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  overflow: hidden;
}
.vc-saturation:focus-visible {
  box-shadow: inset 0 0 0 2px var(--vc-active-color, #2196f3);
}
.vc-saturation__white {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.vc-saturation__black {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.vc-saturation__pointer {
  position: absolute;
  width: var(--vc-pointer-size, 12px);
  height: var(--vc-pointer-size, 12px);
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
