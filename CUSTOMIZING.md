# 커스터마이징 가이드

자유도는 세 단계로 열려 있습니다.

## 1. 테마 — CSS 변수 (가장 쉬움)

상위 요소에 `--vc-*` 변수만 선언하면 모든 피커에 적용됩니다.

```html
<div
  style="
  --vc-width: 320px;
  --vc-border-radius: 16px;
  --vc-btn-apply-bg: #6c5ce7;
  --vc-swatch-size: 28px;
  --vc-swatch-columns: 8;
"
>
  <ChromePicker v-model="color" />
  <SwatchesPicker v-model="color" />
</div>
```

### 전체 토큰 목록

| 변수                                         | 기본값                     | 적용 대상                   |
| -------------------------------------------- | -------------------------- | --------------------------- |
| `--vc-width`                                 | 240px                      | 피커 너비                   |
| `--vc-bg`                                    | #fff                       | 배경                        |
| `--vc-border-radius`                         | 8px                        | 모서리                      |
| `--vc-box-shadow`                            | 0 4px 20px rgba(0,0,0,.15) | 그림자                      |
| `--vc-font-family`                           | system-ui                  | 폰트                        |
| `--vc-padding`                               | 12px                       | 내부 여백                   |
| `--vc-gap`                                   | 12px                       | 요소 간격                   |
| `--vc-panel-height`                          | 140px                      | Saturation 팔레트 높이      |
| `--vc-slider-height`                         | 12px                       | Hue/Alpha 두께              |
| `--vc-slider-radius`                         | 6px                        | 슬라이더 모서리             |
| `--vc-pointer-size`                          | 14px                       | 드래그 포인터 크기          |
| `--vc-preview-size`                          | 28px                       | 미리보기/스포이드 버튼 크기 |
| `--vc-border-color`                          | #e0e0e0                    | 구분선                      |
| `--vc-active-color`                          | #2196f3                    | 선택된 스워치 테두리        |
| `--vc-swatch-size`                           | 20px                       | 스워치 한 칸                |
| `--vc-swatch-radius`                         | 4px                        | 스워치 모서리               |
| `--vc-swatch-gap`                            | 6px                        | 스워치 간격                 |
| `--vc-swatch-columns`                        | 6                          | 스워치 그리드 열 수         |
| `--vc-input-border`                          | 1px solid #e0e0e0          | 입력창 테두리               |
| `--vc-input-bg` / `--vc-input-color`         | #fff / inherit             | 입력창 배경/글자            |
| `--vc-input-radius`                          | 4px                        | 입력창 모서리               |
| `--vc-input-font-size`                       | 12px                       | 입력창 글자 크기            |
| `--vc-label-color`                           | #999                       | 라벨 색                     |
| `--vc-btn-bg` / `--vc-btn-color`             | #f5f5f5 / #333             | 버튼 배경/글자              |
| `--vc-btn-color-hover`                       | #111                       | 버튼 hover 글자             |
| `--vc-btn-radius`                            | 6px                        | 버튼 모서리                 |
| `--vc-btn-apply-bg` / `--vc-btn-apply-color` | #111 / #fff                | 적용/OK 버튼                |

## 2. 배치/세부 스타일 — 클래스 오버라이드

모든 컴포넌트가 `vc-` BEM 클래스를 쓰고 **scoped가 아니라서**, 일반 CSS로 무엇이든 덮어쓸 수 있습니다.
배치 변경도 가능합니다.

```css
/* 입력칸을 맨 위로, 슬라이더를 세로 반전 */
.vc-chrome__body {
  flex-direction: row-reverse;
}
.vc-chrome__fields {
  order: -1;
}

/* 특정 부분 숨기기 */
.vc-chrome__mode {
  display: none;
}

/* 버튼 크기/색 자유 변경 */
.vc-ps__btn {
  padding: 10px 16px;
  font-size: 15px;
}
```

> 클래스는 전부 `vc-` 접두사라 충돌 위험이 적습니다.

## 3. 완전 자유 배치 — primitives 직접 조립

미리 만든 피커를 안 쓰고 원자 컴포넌트로 직접 만들면 배치 100% 자유입니다.

```vue
<script setup lang="ts">
import { useColor, Saturation, Hue } from "@packyoung98/vcolor";
const c = useColor("#FF5733");
</script>
<template>
  <!-- 원하는 순서/레이아웃으로 자유 배치 -->
  <Hue :hue="c.hsva.value.h" @input="(h) => c.setHue(h)" />
  <Saturation
    :hue="c.hsva.value.h"
    :saturation="c.hsva.value.s"
    :value="c.hsva.value.v"
    @input="(p) => c.setSaturation(p.s, p.v)"
  />
</template>
```

## 스와치 색 자유 지정

`CompactPicker` / `GrayscalePicker` / `TwitterPicker` / `SwatchesPicker` 는
`presetColors` 로 **1차원 또는 2차원(행 단위)** 배열을 받습니다. 안 주면 기본 팔레트.

```vue
<!-- 1차원 -->
<CompactPicker
  v-model="color"
  :preset-colors="['#FF0000', '#00FF00', '#0000FF']"
  :columns="3"
/>

<!-- 2차원 (행 = 색조, 열 = 명암) -->
<SwatchesPicker
  v-model="color"
  :preset-colors="[
    ['#FFEBEE', '#E57373', '#F44336', '#C62828'],
    ['#E3F2FD', '#42A5F5', '#2196F3', '#1565C0'],
  ]"
/>
```
