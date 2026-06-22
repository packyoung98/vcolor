import { ref, readonly } from "vue";

export function useColorHistory(max = 8) {
  const history = ref<string[]>([]);

  function add(color: string) {
    const c = color.toUpperCase();
    const existing = history.value.filter((x) => x !== c);
    history.value = [c, ...existing].slice(0, max);
  }

  function clear() {
    history.value = [];
  }

  return { history: readonly(history), add, clear };
}
