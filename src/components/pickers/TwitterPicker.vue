<script setup lang="ts">
import { computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import { TWITTER_PRESETS } from "../../utils/palettes";
import type { ColorObject, ColorFormat } from "../../types";
import Swatch from "../primitives/Swatch.vue";
import EditableInput from "../primitives/EditableInput.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    presetColors?: string[] | string[][];
    width?: string;
  }>(),
  {
    format: "hex",
    presetColors: () => TWITTER_PRESETS,
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
  <div class="vc-twitter" :style="{ width }">
    <div class="vc-twitter__swatches">
      <Swatch v-for="p in flat" :key="p" :color="p" @select="pick" />
    </div>
    <div class="vc-twitter__field">
      <span class="vc-twitter__hash">#</span>
      <EditableInput
        label=""
        :modelValue="c.hex.value.replace('#', '')"
        @update:modelValue="(v) => onHex('#' + v)"
      />
    </div>
  </div>
</template>

<style>
.vc-twitter {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  padding: var(--vc-padding, 12px);
}
.vc-twitter__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vc-swatch-gap, 6px);
}
.vc-twitter__field {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--vc-border-color, #eee);
}
.vc-twitter__hash {
  color: var(--vc-label-color, #999);
  font-size: 13px;
}
</style>
