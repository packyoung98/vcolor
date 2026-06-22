<script setup lang="ts">
import { usePicker } from "../../composables/usePicker";
import type { ColorObject, ColorFormat } from "../../types";

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

const channels = [
  { key: "h", max: 360, step: 1 },
  { key: "s", max: 100, step: 1 },
  { key: "v", max: 100, step: 1 },
  { key: "a", max: 1, step: 0.01 },
] as { key: string; max: number; step: number }[];

function val(key: string): number {
  return (c.hsva.value as unknown as Record<string, number>)[key];
}
function onChange(key: string, e: Event) {
  const v = +(e.target as HTMLInputElement).value;
  c.setFromHsva({ ...c.hsva.value, [key]: v });
  c.input();
}
</script>

<template>
  <div class="vc-sliders" :style="{ width }">
    <div
      class="vc-sliders__row"
      v-for="ch in channels"
      :key="ch.key"
      v-show="ch.key !== 'a' || !disableAlpha"
    >
      <span class="vc-sliders__label">{{ ch.key.toUpperCase() }}</span>
      <input
        class="vc-sliders__range"
        type="range"
        :min="0"
        :max="ch.max"
        :step="ch.step"
        :value="val(ch.key)"
        @input="(e) => onChange(ch.key, e)"
        @change="c.change()"
      />
      <span class="vc-sliders__value">{{
        ch.key === "a" ? val(ch.key).toFixed(2) : Math.round(val(ch.key))
      }}</span>
    </div>
  </div>
</template>

<style>
.vc-sliders {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  font-family: var(--vc-font-family, system-ui, sans-serif);
}
.vc-sliders__row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.vc-sliders__label {
  width: 14px;
  font-size: 12px;
  color: #888;
}
.vc-sliders__range {
  flex: 1;
}
.vc-sliders__value {
  width: 34px;
  text-align: right;
  font-size: 12px;
  color: #555;
}
</style>
