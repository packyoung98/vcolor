import { describe, it, expect } from "vitest";
import {
  hsvToRgb,
  rgbToHsv,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  hexToRgb,
} from "./convert";

describe("convert", () => {
  it("hexToRgb #FF5733", () => {
    expect(hexToRgb("#FF5733")).toEqual({ r: 255, g: 87, b: 51, a: 1 });
  });

  // 내부값은 정밀(float). 표시값은 반올림해서 스펙 표와 일치.
  it("rgbToHsv (표시 반올림 = 스펙 표)", () => {
    const hsv = rgbToHsv({ r: 255, g: 87, b: 51, a: 1 });
    expect(Math.round(hsv.h)).toBe(11);
    expect(Math.round(hsv.s)).toBe(80);
    expect(Math.round(hsv.v)).toBe(100);
  });
  it("rgbToHsl (표시 반올림 = 스펙 표)", () => {
    const hsl = rgbToHsl({ r: 255, g: 87, b: 51, a: 1 });
    expect(Math.round(hsl.h)).toBe(11);
    expect(Math.round(hsl.s)).toBe(100);
    expect(Math.round(hsl.l)).toBe(60);
  });

  it("rgbToHex", () => {
    expect(rgbToHex({ r: 255, g: 87, b: 51, a: 1 })).toBe("#FF5733");
  });

  // 핵심: RGB → HSV → RGB 왕복이 정확히 보존돼야 한다 (정밀도 수정의 목적)
  it("RGB 왕복 무손실", () => {
    for (const rgb of [
      { r: 255, g: 87, b: 51, a: 1 },
      { r: 200, g: 20, b: 30, a: 1 },
      { r: 12, g: 200, b: 99, a: 1 },
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 255, g: 255, b: 255, a: 1 },
    ]) {
      expect(hsvToRgb(rgbToHsv(rgb))).toEqual(rgb);
    }
  });

  it("hex 왕복 무손실", () => {
    for (const hex of ["#FF5733", "#00C763", "#123456", "#FFFFFF", "#000000"]) {
      expect(rgbToHex(hexToRgb(hex))).toBe(hex);
    }
  });

  it("gray hslToRgb", () => {
    expect(hslToRgb({ h: 0, s: 0, l: 50, a: 1 })).toEqual({
      r: 128,
      g: 128,
      b: 128,
      a: 1,
    });
  });
});
