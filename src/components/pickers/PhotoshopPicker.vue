<script setup lang="ts">
import { ref, computed } from "vue";
import { usePicker } from "../../composables/usePicker";
import type { ColorObject, ColorFormat } from "../../types";
import { rgbToHex } from "../../utils/convert";
import Saturation from "../primitives/Saturation.vue";
import Hue from "../primitives/Hue.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    disableAlpha?: boolean;
    width?: string;
  }>(),
  { format: "hex", disableAlpha: false, width: "var(--vc-width, 280px)" }
);
const emit = defineEmits<{
  change: [string | ColorObject];
  input: [string | ColorObject];
  ok: [string | ColorObject];
  cancel: [];
}>();

const c = usePicker(
  model,
  emit,
  () => props.format,
  () => props.disableAlpha
);
const current = ref(rgbToHex({ ...c.rgba.value, a: 1 }));
const newColor = computed(() => c.hex.value);

function ok() {
  emit("ok", c.output());
  current.value = c.hex.value;
}
function cancel() {
  c.setFromHex(current.value);
  c.input();
  emit("cancel");
}
</script>

<template>
  <div class="vc-ps" :style="{ width }">
    <div class="vc-ps__main">
      <Saturation
        class="vc-ps__sat"
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
      <div class="vc-ps__hue">
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
    </div>
    <div class="vc-ps__side">
      <div class="vc-ps__compare">
        <div class="vc-ps__swatch" :style="{ background: newColor }">
          <span>new</span>
        </div>
        <div class="vc-ps__swatch" :style="{ background: current }">
          <span>current</span>
        </div>
      </div>
      <button type="button" class="vc-ps__btn vc-ps__btn--ok" @click="ok">
        OK
      </button>
      <button type="button" class="vc-ps__btn" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<style>
.vc-ps {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  font-family: var(--vc-font-family, system-ui, sans-serif);
}
.vc-ps__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.vc-ps__hue {
  padding-top: 2px;
}
.vc-ps__side {
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.vc-ps__compare {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.vc-ps__swatch {
  height: 34px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.vc-ps__swatch span {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 1px 3px;
  border-radius: 0 0 0 3px;
}
.vc-ps__btn {
  padding: 6px;
  border: var(--vc-input-border, 1px solid #ccc);
  border-radius: var(--vc-btn-radius, 4px);
  background: var(--vc-btn-bg, #f5f5f5);
  color: var(--vc-btn-color, #333);
  cursor: pointer;
  font-size: 13px;
}
.vc-ps__btn--ok {
  background: var(--vc-btn-apply-bg, #111);
  color: var(--vc-btn-apply-color, #fff);
  border-color: transparent;
}
</style>
