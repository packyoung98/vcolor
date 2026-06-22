import { ref, computed } from "vue";
import type { RGBA, HSVA, HSLA } from "../types";
import {
  hsvToRgb,
  rgbToHsv,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  hexToRgb,
} from "../utils/convert";

export function useColor(initial: string = "#000000") {
  // 단일 내부 상태 — 이 값만 바뀌면 아래 computed가 전부 따라 갱신된다.
  const hsva = ref<HSVA>(rgbToHsv(hexToRgb(initial)));

  // 파생 computed (읽기 전용)
  const rgba = computed<RGBA>(() => hsvToRgb(hsva.value));
  const hsla = computed<HSLA>(() => rgbToHsl(rgba.value));
  const hex = computed<string>(() => rgbToHex(rgba.value));

  // 외부 입력 → 내부 동기화 (setter)
  function setFromHsva(v: HSVA) {
    hsva.value = { ...v };
  }
  function setFromRgba(v: RGBA) {
    hsva.value = rgbToHsv(v);
  }
  function setFromHsla(v: HSLA) {
    hsva.value = rgbToHsv(hslToRgb(v));
  }
  function setFromHex(v: string) {
    hsva.value = rgbToHsv(hexToRgb(v));
  }

  // 개별 채널 업데이트 (Hue/Alpha/Saturation primitive가 사용)
  function setHue(h: number) {
    hsva.value = { ...hsva.value, h };
  }
  function setSaturation(s: number, v: number) {
    hsva.value = { ...hsva.value, s, v };
  }
  function setAlpha(a: number) {
    hsva.value = { ...hsva.value, a };
  }

  return {
    hsva,
    rgba,
    hsla,
    hex,
    setFromHsva,
    setFromRgba,
    setFromHsla,
    setFromHex,
    setHue,
    setSaturation,
    setAlpha,
  };
}
