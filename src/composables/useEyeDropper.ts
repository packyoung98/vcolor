import { ref } from "vue";

interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperInstance {
  open: (options?: { signal?: AbortSignal }) => Promise<EyeDropperResult>;
}
interface EyeDropperCtor {
  new (): EyeDropperInstance;
}

declare global {
  interface Window {
    EyeDropper?: EyeDropperCtor;
  }
}

export function useEyeDropper() {
  const isSupported = ref(
    typeof window !== "undefined" && "EyeDropper" in window
  );
  const sRGBHex = ref<string>("");

  // 성공 시 '#rrggbb' 반환, 미지원/취소(ESC) 시 null
  async function open(): Promise<string | null> {
    if (!isSupported.value || !window.EyeDropper) return null;
    try {
      const dropper = new window.EyeDropper();
      const result = await dropper.open();
      sRGBHex.value = result.sRGBHex;
      return result.sRGBHex;
    } catch {
      return null;
    }
  }

  return { isSupported, sRGBHex, open };
}
