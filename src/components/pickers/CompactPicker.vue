<script setup lang="ts">
import { computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import { COMPACT_PRESETS } from "../../utils/palettes";
import type { ColorObject, ColorFormat } from "../../types";
import Swatch from "../primitives/Swatch.vue";
import EditableInput from "../primitives/EditableInput.vue";

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
    presetColors: () => COMPACT_PRESETS,
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
function onHex(v: string) {
  c.setFromHex(v);
  c.input();
}
</script>

<template>
  <div
    class="vc-compact"
    :style="{
      width,
      ...(columns != null ? { '--vc-swatch-columns': columns } : {}),
    }"
  >
    <div class="vc-compact__grid">
      <Swatch
        v-for="p in flat"
        :key="p"
        :color="p"
        :active="p.toUpperCase() === c.hex.value.toUpperCase()"
        @select="pick"
      />
    </div>
    <div class="vc-compact__field">
      <div class="vc-compact__preview" :style="{ background: c.hex.value }" />
      <EditableInput
        label="hex"
        :modelValue="c.hex.value"
        @update:modelValue="onHex"
      />
    </div>
  </div>
</template>

<style>
.vc-compact {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  padding: var(--vc-padding, 10px);
}
.vc-compact__grid {
  display: grid;
  grid-template-columns: repeat(var(--vc-swatch-columns, 6), 1fr);
  gap: var(--vc-swatch-gap, 5px);
}
.vc-compact__field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}
.vc-compact__preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
