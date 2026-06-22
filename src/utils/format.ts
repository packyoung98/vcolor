import type { ColorFormat, ColorObject, HSVA } from "../types";
import { hsvToRgb, rgbToHsl, rgbToHex } from "./convert";

export function formatOutput(
  hsva: HSVA,
  format: ColorFormat,
  disableAlpha = false
): string | ColorObject {
  const a = disableAlpha ? 1 : hsva.a;
  const rgba = hsvToRgb({ ...hsva, a });
  if (format === "rgb") return rgba;
  if (format === "hsl") {
    const hsla = rgbToHsl(rgba);
    return {
      h: Math.round(hsla.h),
      s: Math.round(hsla.s),
      l: Math.round(hsla.l),
      a: hsla.a,
    };
  }
  return rgbToHex(rgba);
}
