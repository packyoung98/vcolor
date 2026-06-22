# vcolor

[![npm](https://img.shields.io/npm/v/@packyoung98/vcolor)](https://www.npmjs.com/package/@packyoung98/vcolor)
[![license](https://img.shields.io/npm/l/@packyoung98/vcolor)](./LICENSE)

**[Demo](https://packyoung98.github.io/vcolor/)** · **[npm](https://www.npmjs.com/package/@packyoung98/vcolor)** · **[GitHub](https://github.com/packyoung98/vcolor)**

Vue 3 전용 컬러 피커 라이브러리. 완전한 `v-model` 지원, CSS 변수 기반 커스터마이징, 그리고 13종의 피커 컴포넌트를 제공합니다.

react-color / vue-color의 컴포넌트 구성을 따르되, 내부는 `tinycolor` 같은 외부 의존성 없이 직접 구현한 색 변환 레이어 위에서 동작합니다.

---

## 특징

- **완전한 `v-model`** — `defineModel()` 기반 양방향 바인딩
- **13종 피커** — 풀피처 / 경량 / 팔레트 / 슬라이더, 용도별로 선택
- **포맷 선택** — hex / rgb / hsl 중 원하는 형태로 값을 받음
- **CSS 변수 커스터마이징** — 클래스 없이 `--vc-*` 변수만으로 테마 변경
- **조립 가능한 원자 컴포넌트** — 직접 피커를 만들 수 있는 primitives 제공
- **스포이드** — 브라우저 네이티브 EyeDropper API 지원
- **Tree-shaking** — 쓰는 컴포넌트만 번들에 포함
- **의존성 0** — 색 변환을 직접 구현, peer dependency는 `vue`뿐
- **TypeScript** — 전체 타입 제공 (ESM + CJS + `.d.ts`)

---

## 설치

```bash
npm install @packyoung98/vcolor
```

> `vue >= 3.3.0` 이 peer dependency입니다.

---

## 빠른 시작

스타일을 한 번 import한 뒤 컴포넌트를 사용합니다.

```ts
// main.ts
import "@packyoung98/vcolor/style.css";
```

```vue
<script setup lang="ts">
import { ref } from "vue";
import { SketchPicker } from "@packyoung98/vcolor";

const color = ref("#FF5733");
</script>

<template>
  <SketchPicker v-model="color" />
</template>
```

---

## 컴포넌트

이름은 모두 named export로 가져옵니다.

```ts
import { ChromePicker, SketchPicker, HueSlider } from "@packyoung98/vcolor";
```

| 컴포넌트          | 카테고리 | Alpha | 설명                                               |
| ----------------- | -------- | :---: | -------------------------------------------------- |
| `ChromePicker`    | 풀피처   |   O   | 팔레트 + Hue/Alpha + 입력칸 + 포맷 전환 + 스포이드 |
| `SketchPicker`    | 풀피처   |   O   | Chrome 구성 + 프리셋 스워치                        |
| `PhotoshopPicker` | 풀피처   |   O   | 팔레트 + Hue + new/current 비교 + OK/Cancel        |
| `CompactPicker`   | 경량     |   –   | 색상 그리드 + hex 입력                             |
| `GrayscalePicker` | 경량     |   –   | 그레이스케일 그리드                                |
| `MaterialPicker`  | 경량     |   –   | hex + RGB 텍스트 입력                              |
| `TwitterPicker`   | 경량     |   –   | 소형 스워치 + hex 입력                             |
| `SwatchesPicker`  | 팔레트   |   –   | 대형 2D 팔레트 (색조 × 명암)                       |
| `HueSlider`       | 슬라이더 |   –   | Hue 단독 슬라이더 (숫자 v-model)                   |
| `SliderPicker`    | 슬라이더 |   O   | Hue + Lightness + Alpha                            |
| `RGBASliders`     | 슬라이더 |   O   | R / G / B / A 개별 슬라이더                        |
| `HSVSliders`      | 슬라이더 |   O   | H / S / V / A 개별 슬라이더                        |
| `HSLSliders`      | 슬라이더 |   O   | H / S / L / A 개별 슬라이더                        |

---

## v-model

### 입력 형식

`v-model`에는 **hex 문자열** 또는 **색상 객체**를 넣을 수 있습니다.

```ts
const a = ref("#FF5733"); // hex (#RGB / #RRGGBB / #RRGGBBAA)
const b = ref({ r: 255, g: 87, b: 51, a: 1 }); // RGBA 객체
const c = ref({ h: 11, s: 80, v: 100, a: 1 }); // HSVA 객체
const d = ref({ h: 11, s: 100, l: 60, a: 1 }); // HSLA 객체
```

> `HueSlider`만 예외로 **숫자(0–360)** 를 받습니다: `const hue = ref(200)`

### 출력 형식 — `format`

`format` prop으로 v-model이 내보내는 형태를 정합니다.

```vue
<ChromePicker v-model="color" format="rgb" />
<!-- emit: { r: 255, g: 87, b: 51, a: 1 } -->
```

| `format`       | 내보내는 값        |
| -------------- | ------------------ |
| `'hex'` (기본) | `'#FF5733'` 문자열 |
| `'rgb'`        | `{ r, g, b, a }`   |
| `'hsl'`        | `{ h, s, l, a }`   |

---

## 공통 Props

| Prop           | 타입                      | 기본값                 | 적용                            |
| -------------- | ------------------------- | ---------------------- | ------------------------------- |
| `modelValue`   | `string \| ColorObject`   | –                      | 전 컴포넌트 (v-model)           |
| `format`       | `'hex' \| 'rgb' \| 'hsl'` | `'hex'`                | 색상 피커 전체                  |
| `disableAlpha` | `boolean`                 | `false`                | Alpha 지원 피커                 |
| `width`        | `string`                  | `'var(--vc-width)'`    | 전 컴포넌트                     |
| `presetColors` | `string[] \| string[][]`  | 컴포넌트별 기본 팔레트 | 스워치 피커                     |
| `columns`      | `number`                  | 6 (Gray 8)             | `Compact` / `Gray` / `Swatches` |
| `inputFormats` | `('hex'\|'rgb'\|'hsl')[]` | 전부                   | `ChromePicker`                  |

### 공통 Events

| Event               | 페이로드                | 시점                    |
| ------------------- | ----------------------- | ----------------------- |
| `update:modelValue` | `string \| ColorObject` | 색 변경 (v-model)       |
| `input`             | 〃                      | 드래그/입력 중 실시간   |
| `change`            | 〃                      | 드래그 종료 / 입력 확정 |

> `PhotoshopPicker`는 추가로 `ok`, `cancel` 이벤트를 emit합니다.

---

## 주요 기능

### 입력 포맷 전환 (ChromePicker)

`ChromePicker` 하단의 `▲▼`로 입력칸을 hex / rgb / hsl로 전환할 수 있습니다.

```vue
<ChromePicker v-model="color" />
<ChromePicker v-model="color" :input-formats="['hex', 'rgb']" />
<ChromePicker v-model="color" :input-formats="['hex']" />
```

### 스포이드 (EyeDropper)

`ChromePicker`는 브라우저가 지원하는 경우 미리보기 옆에 스포이드 버튼을 표시합니다.

> 네이티브 EyeDropper API 기반이라 **Chromium 계열(Chrome·Edge 등)에서만** 동작하며, 미지원 브라우저(Firefox·Safari)에서는 버튼이 자동으로 숨겨집니다.

```ts
import { useEyeDropper } from "@packyoung98/vcolor";

const { isSupported, open } = useEyeDropper();
const hex = await open();
```

### 스워치 색 지정

```vue
<CompactPicker
  v-model="color"
  :preset-colors="['#F00', '#0F0', '#00F']"
  :columns="3"
/>

<SwatchesPicker
  v-model="color"
  :preset-colors="[
    ['#FFEBEE', '#E57373', '#F44336', '#C62828'],
    ['#E3F2FD', '#42A5F5', '#2196F3', '#1565C0'],
  ]"
/>
```

---

## 커스터마이징

자유도는 세 단계로 열려 있습니다. (자세한 내용은 [`CUSTOMIZING.md`](./CUSTOMIZING.md))

### 1. 테마 — CSS 변수

```html
<div style="--vc-width: 300px; --vc-border-radius: 16px;">
  <SketchPicker v-model="color" />
</div>
```

### 2. 배치·세부 스타일 — 클래스 오버라이드

```css
.vc-chrome__fields {
  order: -1;
}
.vc-chrome__mode {
  display: none;
}
```

### 3. 완전 자유 배치 — primitives 조립

```vue
<script setup lang="ts">
import { useColor, Hue, Saturation } from "@packyoung98/vcolor";
const c = useColor("#FF5733");
</script>

<template>
  <Saturation
    :hue="c.hsva.value.h"
    :saturation="c.hsva.value.s"
    :value="c.hsva.value.v"
    @input="(p) => c.setSaturation(p.s, p.v)"
  />
  <Hue :hue="c.hsva.value.h" @input="(h) => c.setHue(h)" />
</template>
```

---

## 색 공간 / 변환 유틸

```ts
import {
  hexToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
} from "@packyoung98/vcolor";
```

---

## Composables

`@packyoung98/vcolor` 에서 가져올 수 있습니다.

| 이름                     | 설명                                             |
| ------------------------ | ------------------------------------------------ |
| `useColor(initial)`      | 색상 상태(hsva) + 파생값(hex/rgba/hsla) + setter |
| `useDrag(onMove, onEnd)` | 포인터 드래그 → 정규화 좌표                      |
| `useColorHistory(max)`   | 최근 사용 색상                                   |
| `useEyeDropper()`        | 네이티브 스포이드 래퍼                           |

---

## 개발

```bash
npm install
npm run typecheck
npm run build
npx vitest run
```

---

## 라이선스

MIT
