import type { RGBA, HSVA, HSLA } from "../types";

// h(0–360)를 0–360 범위로 정규화
function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

// HSV → RGB
export function hsvToRgb({ h, s, v, a }: HSVA): RGBA {
  h = normalizeHue(h);
  s = clamp(s, 0, 100) / 100;
  v = clamp(v, 0, 100) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

// RGB → HSV
export function rgbToHsv({ r, g, b, a }: RGBA): HSVA {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = normalizeHue(h * 60);
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  // 내부 계산은 반올림하지 않는다 (왕복 정밀도 유지). 표시할 때만 반올림.
  return { h, s: s * 100, v: v * 100, a };
}

// RGB → HSL
export function rgbToHsl({ r, g, b, a }: RGBA): HSLA {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = normalizeHue(h * 60);
  }

  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100, a };
}

// HSL → RGB
export function hslToRgb({ h, s, l, a }: HSLA): RGBA {
  h = normalizeHue(h);
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

// RGB → HEX (#RRGGBB, a<1이면 #RRGGBBAA)
export function rgbToHex({ r, g, b, a }: RGBA): string {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) hex += toHex(Math.round(a * 255));
  return hex.toUpperCase();
}

// HEX → RGB (#RGB / #RGBA / #RRGGBB / #RRGGBBAA 모두 허용)
export function hexToRgb(hex: string): RGBA {
  let h = hex.trim().replace(/^#/, "");

  // 단축형(#RGB, #RGBA) → 풀형으로 확장
  if (h.length === 3 || h.length === 4) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;

  return {
    r: Number.isNaN(r) ? 0 : r,
    g: Number.isNaN(g) ? 0 : g,
    b: Number.isNaN(b) ? 0 : b,
    a: Number.isNaN(a) ? 1 : a,
  };
}
