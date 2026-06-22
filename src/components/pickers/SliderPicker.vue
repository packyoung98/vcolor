<script setup lang="ts">
import { usePicker } from "../../composables/usePicker";
import type { ColorObject, ColorFormat } from "../../types";
import Hue from "../primitives/Hue.vue";
import Alpha from "../primitives/Alpha.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    disableAlpha?: boolean;
    width?: string;
  }>(),
  { format: "hex", disableAlpha: false, width: "var(--vc-width, 240px)" }
);
const emit = defineEmits<{
  change: [string | ColorObject];
  input: [string | ColorObject];
}>();

const c = usePicker(
  model,
  emit,
  () => props.format,
  () => props.disableAlpha
);

function onLightness(e: Event) {
  const l = +(e.target as HTMLInputElement).value;
  c.setFromHsla({ ...c.hsla.value, l });
  c.input();
}
</script>

<template>
  <div class="vc-slider" :style="{ width }">
    <div class="vc-slider__row">
      <span class="vc-slider__label">H</span>
      <Hue
        :hue="c.hsva.value.h"
        @input="
          (h) => {
            c.setHue(h);
            c.input();
          }
        "
        @change="c.change()"
      />
    </div>
    <div class="vc-slider__row">
      <span class="vc-slider__label">L</span>
      <input
        class="vc-slider__range"
        type="range"
        min="0"
        max="100"
        :value="c.hsla.value.l"
        @input="onLightness"
        @change="c.change()"
      />
    </div>
    <div class="vc-slider__row" v-if="!disableAlpha">
      <span class="vc-slider__label">A</span>
      <Alpha
        :rgba="c.rgba.value"
        @input="
          (a) => {
            c.setAlpha(a);
            c.input();
          }
        "
        @change="c.change()"
      />
    </div>
  </div>
</template>

<style>
.vc-slider {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  font-family: var(--vc-font-family, system-ui, sans-serif);
}
.vc-slider__row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.vc-slider__label {
  width: 12px;
  font-size: 12px;
  color: #888;
}
.vc-slider__range {
  flex: 1;
}
</style>
