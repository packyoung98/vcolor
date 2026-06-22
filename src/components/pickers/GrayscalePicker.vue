<script setup lang="ts">
import { computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import { GRAYSCALE_PRESETS } from "../../utils/palettes";
import type { ColorObject, ColorFormat } from "../../types";
import Swatch from "../primitives/Swatch.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    presetColors?: string[] | string[][];
    columns?: number;
    width?: string;
  }>(),
  {
    format: "hex",
    presetColors: () => GRAYSCALE_PRESETS,
    width: "var(--vc-width, 240px)",
  }
);
const emit = defineEmits<{
  change: [string | ColorObject];
  input: [string | ColorObject];
}>();

const c = usePicker(
  model,
  emit,
  () => props.format,
  () => true
);
const flat = computed<string[]>(() =>
  Array.isArray(props.presetColors[0])
    ? (props.presetColors as string[][]).flat()
    : (props.presetColors as string[])
);
function pick(hex: string) {
  c.setFromHex(hex);
  c.input();
  c.change();
}
</script>

<template>
  <div
    class="vc-gray"
    :style="{
      width,
      ...(columns != null ? { '--vc-swatch-columns': columns } : {}),
    }"
  >
    <Swatch
      v-for="p in flat"
      :key="p"
      :color="p"
      :active="p.toUpperCase() === c.hex.value.toUpperCase()"
      @select="pick"
    />
  </div>
</template>

<style>
.vc-gray {
  display: grid;
  grid-template-columns: repeat(var(--vc-swatch-columns, 8), 1fr);
  gap: var(--vc-swatch-gap, 4px);
  padding: var(--vc-padding, 10px);
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
}
.vc-gray > .vc-swatch {
  width: 100%;
}
</style>
