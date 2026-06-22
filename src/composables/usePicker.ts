// composables/usePicker.ts
// 피커 공통 로직: 외부 modelValue(string|object) <-> 내부 useColor 동기화 + 포맷 emit.
// 13개 피커가 이걸 공유해서 v-model/format/change/input을 일관되게 처리한다.
import { watch } from "vue";
import type { ModelRef } from "vue";
import { useColor } from "./useColor";
import { formatOutput } from "../utils/format";
import type { ColorFormat, ColorObject } from "../types";

type ModelValue = string | ColorObject | undefined;

// Vue의 defineEmits가 만드는 오버로드 형태와 호환되는 emit 타입
export interface PickerEmit {
  (e: "change", payload: string | ColorObject): void;
  (e: "input", payload: string | ColorObject): void;
}

function ingest(color: ReturnType<typeof useColor>, value: ModelValue) {
  if (value == null) return;
  if (typeof value === "string") color.setFromHex(value);
  else if ("v" in value) color.setFromHsva(value);
  else if ("l" in value) color.setFromHsla(value);
  else color.setFromRgba(value);
}

export function usePicker(
  model: ModelRef<ModelValue>,
  emit: PickerEmit,
  getFormat: () => ColorFormat,
  getDisableAlpha: () => boolean
) {
  const color = useColor(
    typeof model.value === "string" ? model.value : "#FF5733"
  );
  ingest(color, model.value);

  function output(): string | ColorObject {
    return formatOutput(color.hsva.value, getFormat(), getDisableAlpha());
  }

  // 외부 → 내부 (단, 우리가 방금 내보낸 값과 같으면 무시 → 피드백 루프 방지)
  watch(model, (v) => {
    if (JSON.stringify(v) === JSON.stringify(output())) return;
    ingest(color, v);
  });

  function input() {
    const o = output();
    model.value = o;
    emit("input", o);
  }
  function change() {
    const o = output();
    model.value = o;
    emit("change", o);
  }

  return { ...color, output, input, change };
}
