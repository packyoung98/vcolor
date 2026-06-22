export interface RGBA {
  r: number; // 0–255
  g: number; // 0–255
  b: number; // 0–255
  a: number; // 0–1
}

export interface HSVA {
  h: number; // 0–360
  s: number; // 0–100
  v: number; // 0–100
  a: number; // 0–1
}

export interface HSLA {
  h: number; // 0–360
  s: number; // 0–100
  l: number; // 0–100
  a: number; // 0–1
}

// v-model로 주고받을 수 있는 색상 객체 (문자열은 별도)
export type ColorObject = RGBA | HSVA | HSLA;

// emit 포맷 (스펙 4.2)
export type ColorFormat = "hex" | "rgb" | "hsl";

// 모든 피커의 공통 props (스펙 4.2)
export interface PickerProps {
  modelValue: string | ColorObject;
  format?: ColorFormat;
  disableAlpha?: boolean;
  presetColors?: string[];
  width?: string;
}
