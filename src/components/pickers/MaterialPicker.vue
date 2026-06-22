<script setup lang="ts">
import { usePicker } from "../../composables/usePicker";
import type { ColorObject, ColorFormat } from "../../types";
import EditableInput from "../primitives/EditableInput.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{ format?: ColorFormat; width?: string }>(),
  { format: "hex", width: "var(--vc-width, 240px)" }
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
function onHex(v: string) {
  c.setFromHex(v);
  c.input();
}
function clampInt(v: string) {
  return Math.max(0, Math.min(255, Math.round(+v || 0)));
}
function onChannel(ch: "r" | "g" | "b", v: string) {
  c.setFromRgba({ ...c.rgba.value, [ch]: clampInt(v) });
  c.input();
}
</script>

<template>
  <div class="vc-material" :style="{ width, borderTopColor: c.hex.value }">
    <EditableInput
      class="vc-material__hex"
      label="hex"
      :modelValue="c.hex.value"
      @update:modelValue="onHex"
    />
    <div class="vc-material__rgb">
      <EditableInput
        label="r"
        :modelValue="c.rgba.value.r"
        @update:modelValue="(v) => onChannel('r', v)"
      />
      <EditableInput
        label="g"
        :modelValue="c.rgba.value.g"
        @update:modelValue="(v) => onChannel('g', v)"
      />
      <EditableInput
        label="b"
        :modelValue="c.rgba.value.b"
        @update:modelValue="(v) => onChannel('b', v)"
      />
    </div>
  </div>
</template>

<style>
.vc-material {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  border-top: 3px solid;
  padding: 14px;
  font-family: var(--vc-font-family, system-ui, sans-serif);
}
.vc-material__hex {
  margin-bottom: 12px;
}
.vc-material__rgb {
  display: flex;
  gap: 10px;
}
</style>
