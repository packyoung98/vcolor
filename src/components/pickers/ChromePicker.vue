<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { usePicker } from "../../composables/usePicker";
import { useEyeDropper } from "../../composables/useEyeDropper";
import type { ColorObject, ColorFormat } from "../../types";
import Saturation from "../primitives/Saturation.vue";
import Hue from "../primitives/Hue.vue";
import Alpha from "../primitives/Alpha.vue";
import EditableInput from "../primitives/EditableInput.vue";

const model = defineModel<string | ColorObject>();
const props = withDefaults(
  defineProps<{
    format?: ColorFormat;
    disableAlpha?: boolean;
    width?: string;
    inputFormats?: ColorFormat[];
  }>(),
  {
    format: "hex",
    disableAlpha: false,
    width: "var(--vc-width, 240px)",
    inputFormats: () => ["hex", "rgb", "hsl"],
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

// 스포이드: 화면에서 색 추출 → 내부 상태에 반영
const eye = useEyeDropper();
async function pickFromScreen() {
  const picked = await eye.open();
  if (picked) {
    c.setFromHex(picked);
    c.input();
    c.change();
  }
}

// 현재 입력 모드 — format이 목록에 있으면 그걸로, 아니면 목록 첫 항목
const inputMode = ref<ColorFormat>(
  props.inputFormats.includes(props.format)
    ? props.format
    : props.inputFormats[0] ?? "hex"
);
const showSwitch = computed(() => props.inputFormats.length > 1);
function cycle(dir: 1 | -1) {
  const list = props.inputFormats;
  const i = list.indexOf(inputMode.value);
  inputMode.value = list[(i + dir + list.length) % list.length];
}

// HEX: 로컬 텍스트로 받아 sanitize 후 커밋 (잘못된 문자/대소문자 정리)
const hexText = ref(c.hex.value);
const hexFocused = ref(false);
watch(
  () => c.hex.value,
  (v) => {
    if (!hexFocused.value) hexText.value = v;
  }
);
function commitHex() {
  hexFocused.value = false;
  const clean = hexText.value
    .trim()
    .replace(/[^0-9a-fA-F]/g, "")
    .slice(0, 8);
  c.setFromHex("#" + clean);
  c.input();
  hexText.value = c.hex.value;
}

// 숫자 채널
function clampInt(v: string, max: number) {
  return Math.max(0, Math.min(max, Math.round(+v || 0)));
}
function setRgb(ch: "r" | "g" | "b", v: string) {
  c.setFromRgba({ ...c.rgba.value, [ch]: clampInt(v, 255) });
  c.input();
}
function setHsl(ch: "h" | "s" | "l", v: string) {
  c.setFromHsla({ ...c.hsla.value, [ch]: clampInt(v, ch === "h" ? 360 : 100) });
  c.input();
}
function setAlpha(v: string) {
  c.setAlpha(Math.max(0, Math.min(1, +v || 0)));
  c.input();
}

const alphaDisp = computed(() => Math.round(c.rgba.value.a * 100) / 100);
const hslDisp = computed(() => ({
  h: Math.round(c.hsla.value.h),
  s: Math.round(c.hsla.value.s),
  l: Math.round(c.hsla.value.l),
}));
const previewStyle = computed(() => ({ background: c.hex.value }));
</script>

<template>
  <div class="vc-chrome" :style="{ width }">
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
    <div class="vc-chrome__body">
      <div class="vc-chrome__preview" :style="previewStyle" />
      <button
        v-if="eye.isSupported"
        type="button"
        class="vc-chrome__eyedropper"
        aria-label="스포이드로 화면 색 추출"
        title="스포이드"
        @click="pickFromScreen"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11 7l6 6" />
          <path
            d="M4 16l11.7 -11.7a2.41 2.41 0 0 1 3.4 3.4l-11.7 11.7l-4 1l1 -4z"
          />
        </svg>
      </button>
      <div class="vc-chrome__sliders">
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
    </div>

    <div class="vc-chrome__fields">
      <template v-if="inputMode === 'hex'">
        <label class="vc-input vc-input--wide">
          <input
            class="vc-input__field"
            v-model="hexText"
            @focus="hexFocused = true"
            @change="commitHex"
            @keyup.enter="commitHex"
          />
          <span class="vc-input__label">hex</span>
        </label>
        <EditableInput
          v-if="!disableAlpha"
          label="a"
          :modelValue="alphaDisp"
          @update:modelValue="setAlpha"
        />
      </template>

      <template v-else-if="inputMode === 'rgb'">
        <EditableInput
          label="r"
          :modelValue="c.rgba.value.r"
          @update:modelValue="(v) => setRgb('r', v)"
        />
        <EditableInput
          label="g"
          :modelValue="c.rgba.value.g"
          @update:modelValue="(v) => setRgb('g', v)"
        />
        <EditableInput
          label="b"
          :modelValue="c.rgba.value.b"
          @update:modelValue="(v) => setRgb('b', v)"
        />
        <EditableInput
          v-if="!disableAlpha"
          label="a"
          :modelValue="alphaDisp"
          @update:modelValue="setAlpha"
        />
      </template>

      <template v-else>
        <EditableInput
          label="h"
          :modelValue="hslDisp.h"
          @update:modelValue="(v) => setHsl('h', v)"
        />
        <EditableInput
          label="s"
          :modelValue="hslDisp.s"
          @update:modelValue="(v) => setHsl('s', v)"
        />
        <EditableInput
          label="l"
          :modelValue="hslDisp.l"
          @update:modelValue="(v) => setHsl('l', v)"
        />
        <EditableInput
          v-if="!disableAlpha"
          label="a"
          :modelValue="alphaDisp"
          @update:modelValue="setAlpha"
        />
      </template>

      <div v-if="showSwitch" class="vc-chrome__switch">
        <button
          type="button"
          class="vc-chrome__chev"
          aria-label="이전 포맷"
          @click="cycle(-1)"
        >
          &#9650;
        </button>
        <button
          type="button"
          class="vc-chrome__chev"
          aria-label="다음 포맷"
          @click="cycle(1)"
        >
          &#9660;
        </button>
      </div>
    </div>

    <div class="vc-chrome__mode">{{ inputMode.toUpperCase() }}</div>
  </div>
</template>

<style>
.vc-chrome {
  background: var(--vc-bg, #fff);
  border-radius: var(--vc-border-radius, 8px);
  box-shadow: var(--vc-box-shadow, 0 4px 20px rgba(0, 0, 0, 0.15));
  font-family: var(--vc-font-family, system-ui, sans-serif);
  overflow: hidden;
}
.vc-chrome__body {
  display: flex;
  gap: var(--vc-gap, 12px);
  padding: var(--vc-padding, 12px);
  align-items: center;
}
.vc-chrome__preview {
  width: var(--vc-preview-size, 28px);
  height: var(--vc-preview-size, 28px);
  border-radius: 50%;
  flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.vc-chrome__eyedropper {
  flex: none;
  width: var(--vc-preview-size, 28px);
  height: var(--vc-preview-size, 28px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--vc-input-border, 1px solid #e0e0e0);
  border-radius: var(--vc-btn-radius, 6px);
  background: var(--vc-btn-bg, #fff);
  color: var(--vc-btn-color, #555);
  cursor: pointer;
  padding: 0;
}
.vc-chrome__eyedropper:hover {
  color: var(--vc-btn-color-hover, #111);
}
.vc-chrome__sliders {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.vc-chrome__fields {
  display: flex;
  gap: var(--vc-gap, 6px);
  padding: 0 var(--vc-padding, 12px);
  align-items: flex-start;
}
.vc-input--wide {
  flex: 3;
}
.vc-chrome__switch {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  padding-top: 1px;
}
.vc-chrome__chev {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  font-size: 9px;
  color: var(--vc-label-color, #999);
}
.vc-chrome__chev:hover {
  color: var(--vc-btn-color-hover, #333);
}
.vc-chrome__mode {
  text-align: center;
  font-size: 11px;
  color: var(--vc-label-color, #999);
  text-transform: uppercase;
  padding: 6px 0 12px;
  letter-spacing: 0.05em;
}
</style>
