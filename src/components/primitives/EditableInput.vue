<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const props = defineProps<{ label: string; modelValue: string | number }>();
const emit = defineEmits<{ "update:modelValue": [string]; change: [] }>();

// 로컬 버퍼: 타이핑 중에는 외부 값이 덮어쓰지 않게 한다 (커서 튐/재포맷 방지)
const text = ref(String(props.modelValue));
const focused = ref(false);

watch(
  () => props.modelValue,
  (v) => {
    if (!focused.value) text.value = String(v);
  }
);

function onInput(e: Event) {
  text.value = (e.target as HTMLInputElement).value;
}
function onFocus() {
  focused.value = true;
}
async function onBlur() {
  focused.value = false;
  emit("update:modelValue", text.value);
  emit("change");
  // 부모가 정규화한 값으로 되돌림 (예: 'ff5733' -> '#FF5733', '300' -> '255')
  await nextTick();
  text.value = String(props.modelValue);
}
function onEnter(e: KeyboardEvent) {
  (e.target as HTMLInputElement).blur();
}
</script>

<template>
  <label class="vc-input">
    <input
      class="vc-input__field"
      :value="text"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onEnter"
    />
    <span class="vc-input__label">{{ label }}</span>
  </label>
</template>

<style>
.vc-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  min-width: 0;
}
.vc-input__field {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-align: center;
  border: var(--vc-input-border, 1px solid #e0e0e0);
  background: var(--vc-input-bg, #fff);
  color: var(--vc-input-color, inherit);
  border-radius: var(--vc-input-radius, 4px);
  padding: 4px 2px;
  font-size: var(--vc-input-font-size, 12px);
  font-family: var(--vc-font-family, inherit);
}
.vc-input__field:focus-visible {
  outline: 2px solid var(--vc-active-color, #2196f3);
  outline-offset: -1px;
}
.vc-input__label {
  font-size: 11px;
  color: var(--vc-label-color, #999);
  text-transform: uppercase;
}
</style>
