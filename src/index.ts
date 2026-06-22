// index.ts — 라이브러리 전체 진입점 (Tree-shaking 지원, 스펙 2.3)

// 풀피처
export { default as ChromePicker } from './components/pickers/ChromePicker.vue'
export { default as SketchPicker } from './components/pickers/SketchPicker.vue'
export { default as PhotoshopPicker } from './components/pickers/PhotoshopPicker.vue'

// 경량
export { default as CompactPicker } from './components/pickers/CompactPicker.vue'
export { default as GrayscalePicker } from './components/pickers/GrayscalePicker.vue'
export { default as MaterialPicker } from './components/pickers/MaterialPicker.vue'
export { default as TwitterPicker } from './components/pickers/TwitterPicker.vue'

// 팔레트
export { default as SwatchesPicker } from './components/pickers/SwatchesPicker.vue'

// 슬라이더
export { default as HueSlider } from './components/pickers/HueSlider.vue'
export { default as SliderPicker } from './components/pickers/SliderPicker.vue'
export { default as RGBASliders } from './components/pickers/RGBASliders.vue'
export { default as HSVSliders } from './components/pickers/HSVSliders.vue'
export { default as HSLSliders } from './components/pickers/HSLSliders.vue'

// primitives (직접 조립용)
export { default as Saturation } from './components/primitives/Saturation.vue'
export { default as Hue } from './components/primitives/Hue.vue'
export { default as Alpha } from './components/primitives/Alpha.vue'
export { default as Swatch } from './components/primitives/Swatch.vue'
export { default as EditableInput } from './components/primitives/EditableInput.vue'

// composables
export { useColor } from './composables/useColor'
export { useDrag } from './composables/useDrag'
export { useColorHistory } from './composables/useColorHistory'
export { useEyeDropper } from './composables/useEyeDropper'

// 변환 유틸 & 타입
export * from './utils/convert'
export * from './utils/palettes'
export type { RGBA, HSVA, HSLA, ColorObject, ColorFormat, PickerProps } from './types'
