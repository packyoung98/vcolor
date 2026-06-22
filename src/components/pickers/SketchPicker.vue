<script setup lang="ts">
import { computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import { DEFAULT_PRESETS } from "../../utils/palettes";
import type { ColorObject, ColorFormat } from "../../types";
import Saturation from "../primitives/Saturation.vue";
import Hue from "../primitives/Hue.vue";
import Alpha from "../primitives/Alpha.vue";
import Swatch from "../primitives/Swatch.vue";
import EditableInput from "../primitives/EditableInput.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    disableAlpha?: boolean;
    presetColors?: string[];
    width?: string;
  }>(),
  {
    format: "hex",
    disableAlpha: false,
    presetColors: () => DEFAULT_PRESETS,
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
  () => props.disableAlpha
);
const previewStyle = computed(() => ({ background: c.hex.value }));
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
  <div class="vc-sketch" :style="{ width }">
    <Saturation
      :hue="c.hsva.value.h"
      :saturation="c.hsva.value.s"
      :value="c.hsva.value.v"
      @input="
        (p) => {
          c.setSaturation(p.s, p.v);
          c.input();
        }
      "
      @change="c.change()"
    />
    <div class="vc-sketch__controls">
      <div class="vc-sketch__sliders">
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
        <Alpha
          v-if="!disableAlpha"
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
      <div class="vc-sketch__preview" :style="previewStyle" />
    </div>
    <div class="vc-sketch__field">
      <EditableInput
        label="hex"
        :modelValue="c.hex.value"
        @update:modelValue="onHex"
      />
    </div>
    <div class="vc-sketch__presets">
      <Swatch v-for="p in presetColors" :key="p" :color="p" @select="pick" />
    </div>
  </div>
</template>

<style>
.vc-sketch {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  font-family: var(--vc-font-family, system-ui, sans-serif);
  overflow: hidden;
}
.vc-sketch__controls {
  display: flex;
  gap: 12px;
  padding: 12px;
  align-items: center;
}
.vc-sketch__sliders {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.vc-sketch__preview {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.vc-sketch__field {
  padding: 0 12px 8px;
}
.vc-sketch__presets {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--vc-swatch-size, 20px));
  gap: var(--vc-swatch-gap, 6px);
  padding: 0 var(--vc-padding, 12px) 12px;
  border-top: 1px solid var(--vc-border-color, #eee);
  padding-top: 10px;
}
</style>
