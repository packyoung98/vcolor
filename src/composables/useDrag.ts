import { ref, onBeforeUnmount } from "vue";

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function useDrag(
  onMove: (x: number, y: number) => void,
  onEnd?: () => void
) {
  const target = ref<HTMLElement | null>(null);

  function compute(e: PointerEvent) {
    const el = target.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width);
    const y = clamp((e.clientY - rect.top) / rect.height);
    onMove(x, y);
  }

  function up() {
    window.removeEventListener("pointermove", compute);
    window.removeEventListener("pointerup", up);
    onEnd?.();
  }

  function down(e: PointerEvent) {
    e.preventDefault();
    target.value?.focus?.();
    compute(e);
    window.addEventListener("pointermove", compute);
    window.addEventListener("pointerup", up);
  }

  onBeforeUnmount(up);

  return { target, down };
}
