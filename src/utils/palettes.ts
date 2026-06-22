// utils/palettes.ts — 프리셋 색상 모음
export const DEFAULT_PRESETS: string[] = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

export const MATERIAL_PRESETS: string[] = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#607D8B",
];

export const COMPACT_PRESETS: string[] = [
  "#4D4D4D",
  "#999999",
  "#FFFFFF",
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#DBDF00",
  "#A4DD00",
  "#68CCCA",
  "#73D8FF",
  "#AEA1FF",
  "#FDA1FF",
  "#333333",
  "#808080",
  "#CCCCCC",
  "#D33115",
  "#E27300",
  "#FCC400",
  "#B0BC00",
  "#68BC00",
  "#16A5A5",
  "#009CE0",
  "#7B64FF",
  "#FA28FF",
];

export const TWITTER_PRESETS: string[] = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

// 흑백 그레이스케일 그리드 생성
export const GRAYSCALE_PRESETS: string[] = Array.from(
  { length: 15 },
  (_, i) => {
    const v = Math.round((i / 14) * 255);
    const h = v.toString(16).padStart(2, "0");
    return `#${h}${h}${h}`.toUpperCase();
  }
);

// 2D 팔레트 예시 (행 = 색조 계열, 열 = 명암). SwatchesPicker 기본값.
export const MATERIAL_GRID: string[][] = [
  ["#FFEBEE", "#FFCDD2", "#E57373", "#F44336", "#D32F2F", "#B71C1C"],
  ["#F3E5F5", "#CE93D8", "#AB47BC", "#9C27B0", "#7B1FA2", "#4A148C"],
  ["#E3F2FD", "#90CAF9", "#42A5F5", "#2196F3", "#1976D2", "#0D47A1"],
  ["#E0F2F1", "#80CBC4", "#26A69A", "#009688", "#00796B", "#004D40"],
  ["#E8F5E9", "#A5D6A7", "#66BB6A", "#4CAF50", "#388E3C", "#1B5E20"],
  ["#FFFDE7", "#FFF59D", "#FFEE58", "#FFEB3B", "#FBC02D", "#F57F17"],
  ["#FFF3E0", "#FFCC80", "#FFA726", "#FF9800", "#F57C00", "#E65100"],
  ["#EFEBE9", "#BCAAA4", "#8D6E63", "#795548", "#5D4037", "#3E2723"],
];
