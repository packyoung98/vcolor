<script setup lang="ts">
import { computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import { MATERIAL_GRID } from "../../utils/palettes";
import type { ColorObject, ColorFormat } from "../../types";
import Swatch from "../primitives/Swatch.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    // 1차원 배열(grid) 또는 2차원 배열(행 단위) 모두 허용
    presetColors?: string[] | string[][];
    columns?: number;
    width?: string;
  }>(),
  {
    format: "hex",
    presetColors: () => MATERIAL_GRID,
    width: "var(--vc-width, 260px)",
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
const isGrid2D = computed(() => Array.isArray(props.presetColors[0]));
const rows = computed<string[][]>(() =>
  isGrid2D.value ? (props.presetColors as string[][]) : []
);

function pick(hex: string) {
  c.setFromHex(hex);
  c.input();
  c.change();
}
function isActive(p: string) {
  return p.toUpperCase() === c.hex.value.toUpperCase();
}
</script>

<template>
  <div
    class="vc-swatches"
    :style="{
      width,
      ...(columns != null ? { '--vc-swatch-columns': columns } : {}),
    }"
  >
    <template v-if="isGrid2D">
      <div v-for="(row, i) in rows" :key="i" class="vc-swatches__row">
        <Swatch
          v-for="p in row"
          :key="p"
          :color="p"
          :active="isActive(p)"
          @select="pick"
        />
      </div>
    </template>
    <div v-else class="vc-swatches__grid">
      <Swatch
        v-for="p in (presetColors as string[])"
        :key="p"
        :color="p"
        :active="isActive(p)"
        @select="pick"
      />
    </div>
  </div>
</template>

<style>
.vc-swatches {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  padding: var(--vc-padding, 14px);
  display: flex;
  flex-direction: column;
  gap: var(--vc-swatch-gap, 8px);
}
.vc-swatches__row {
  display: flex;
  gap: var(--vc-swatch-gap, 8px);
}
.vc-swatches__row > .vc-swatch {
  flex: 1;
}
.vc-swatches__grid {
  display: grid;
  grid-template-columns: repeat(var(--vc-swatch-columns, 6), 1fr);
  gap: var(--vc-swatch-gap, 8px);
}
.vc-swatches__grid > .vc-swatch {
  width: 100%;
}
</style>
