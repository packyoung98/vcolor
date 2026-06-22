<script setup lang="ts">
import { ref, computed } from "vue";
import {
  ChromePicker,
  SketchPicker,
  PhotoshopPicker,
  CompactPicker,
  GrayscalePicker,
  MaterialPicker,
  TwitterPicker,
  SwatchesPicker,
  HueSlider,
  SliderPicker,
  RGBASliders,
  HSVSliders,
  HSLSliders,
  hexToRgb,
  rgbToHsl,
} from "./index";

const color = ref("#FF5733");
const hue = ref(200);

const rgb = computed(() => hexToRgb(color.value));
const hsl = computed(() => {
  const h = rgbToHsl(rgb.value);
  return { h: Math.round(h.h), s: Math.round(h.s), l: Math.round(h.l) };
});
const onAccent = computed(() => {
  const { r, g, b } = rgb.value;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6 ? "#15161B" : "#fff";
});
const rootVars = computed(() => ({
  "--accent": color.value,
  "--on-accent": onAccent.value,
}));

const cmd = "npm i vcolor";
const copied = ref(false);
function copy() {
  navigator.clipboard?.writeText(cmd);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1200);
}
</script>

<template>
  <div class="page" :style="rootVars">
    <div class="topline" />
    <div class="wrap">
      <nav class="nav">
        <div class="brand"><span class="dot" />vcolor</div>
        <div class="nav-links">
          <a href="#pickers">pickers</a>
          <a href="https://github.com" target="_blank">github</a>
          <a href="https://npmjs.com" target="_blank">npm</a>
        </div>
      </nav>

      <section class="hero">
        <div class="glow" />
        <div class="hero-copy">
          <p class="eyebrow">VUE 3 · 13 PICKERS · ZERO DEPS</p>
          <h1>Pick a color.<br />The page <em>follows.</em></h1>
          <p class="lede">
            Vue 3 컬러 피커 13종. 완전한 v-model, CSS 변수 테마. 옆에서 색을
            골라보세요 — 페이지 전체가 따라 물듭니다.
          </p>
          <div class="install">
            <code>{{ cmd }}</code>
            <button @click="copy">{{ copied ? "copied" : "copy" }}</button>
          </div>
          <div class="hexbig">{{ color.toUpperCase() }}</div>
          <div class="hexsub">
            rgb({{ rgb.r }}, {{ rgb.g }}, {{ rgb.b }}) · hsl({{ hsl.h }},
            {{ hsl.s }}%, {{ hsl.l }}%)
          </div>
        </div>
        <div class="hero-pick">
          <ChromePicker v-model="color" width="100%" />
        </div>
      </section>

      <section id="pickers" class="section">
        <p class="sec-eye">FULL-FEATURED</p>
        <div class="grid">
          <div class="pcard">
            <span class="tag">SketchPicker</span>
            <div class="slot"><SketchPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">PhotoshopPicker</span>
            <div class="slot"><PhotoshopPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">ChromePicker</span>
            <div class="slot"><ChromePicker v-model="color" /></div>
          </div>
        </div>

        <p class="sec-eye">PALETTE &amp; LIGHTWEIGHT</p>
        <div class="grid">
          <div class="pcard">
            <span class="tag">SwatchesPicker</span>
            <div class="slot"><SwatchesPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">TwitterPicker</span>
            <div class="slot"><TwitterPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">CompactPicker</span>
            <div class="slot"><CompactPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">GrayscalePicker</span>
            <div class="slot"><GrayscalePicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">MaterialPicker</span>
            <div class="slot"><MaterialPicker v-model="color" /></div>
          </div>
        </div>

        <p class="sec-eye">SLIDERS</p>
        <div class="grid">
          <div class="pcard">
            <span class="tag">SliderPicker</span>
            <div class="slot"><SliderPicker v-model="color" /></div>
          </div>
          <div class="pcard">
            <span class="tag">RGBASliders</span>
            <div class="slot"><RGBASliders v-model="color" format="hex" /></div>
          </div>
          <div class="pcard">
            <span class="tag">HSVSliders</span>
            <div class="slot"><HSVSliders v-model="color" format="hex" /></div>
          </div>
          <div class="pcard">
            <span class="tag">HSLSliders</span>
            <div class="slot"><HSLSliders v-model="color" format="hex" /></div>
          </div>
          <div class="pcard">
            <span class="tag">HueSlider · {{ hue }}</span>
            <div class="slot"><HueSlider v-model="hue" /></div>
          </div>
        </div>

        <p class="sec-eye">THEMEABLE — 같은 색, 다른 토큰</p>
        <div class="grid">
          <div class="pcard">
            <span class="tag">radius 4</span>
            <div class="slot framed" style="--vc-border-radius: 4px">
              <CompactPicker v-model="color" />
            </div>
          </div>
          <div class="pcard">
            <span class="tag">radius 16 · round swatch</span>
            <div
              class="slot framed"
              style="--vc-border-radius: 16px; --vc-swatch-radius: 10px"
            >
              <CompactPicker v-model="color" />
            </div>
          </div>
          <div class="pcard">
            <span class="tag">big swatch</span>
            <div
              class="slot framed"
              style="--vc-swatch-size: 26px; --vc-border-radius: 14px"
            >
              <CompactPicker v-model="color" />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>vcolor · MIT</span>
        <span
          ><a href="https://github.com" target="_blank">GitHub</a> ·
          <a href="https://npmjs.com" target="_blank">npm</a></span
        >
      </footer>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap");

.page {
  --canvas: #ecedf1;
  --surface: #fff;
  --ink: #15161b;
  --muted: #6a6e7a;
  --line: #e2e4ea;
  --display: "Space Grotesk", system-ui, sans-serif;
  --mono: "Space Mono", ui-monospace, Menlo, monospace;
  background: var(--canvas);
  color: var(--ink);
  font-family: var(--display);
  min-height: 100vh;
}
.page .wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
.page a {
  color: inherit;
}
.topline {
  height: 3px;
  background: var(--accent);
  transition: background 0.4s;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  transition: background 0.4s;
}
.nav-links {
  display: flex;
  gap: 8px;
}
.nav-links a {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  transition: 0.2s;
}
.nav-links a:hover {
  color: var(--ink);
  border-color: var(--accent);
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
  padding: 56px 0 72px;
  position: relative;
}
.glow {
  position: absolute;
  inset: -40px -10% auto auto;
  width: 520px;
  height: 380px;
  background: radial-gradient(closest-side, var(--accent), transparent 70%);
  opacity: 0.16;
  z-index: 0;
  pointer-events: none;
  transition: background 0.4s;
}
.hero-copy,
.hero-pick {
  position: relative;
  z-index: 1;
}
.hero-pick {
  max-width: 320px;
  width: 100%;
  margin-left: auto;
}
.eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin: 0 0 18px;
  transition: color 0.4s;
}
.page h1 {
  font-size: 54px;
  line-height: 1.02;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 18px;
}
.page h1 em {
  font-style: normal;
  color: var(--accent);
  transition: color 0.4s;
}
.lede {
  font-size: 17px;
  color: var(--muted);
  max-width: 32ch;
  margin: 0 0 28px;
  line-height: 1.5;
}
.install {
  display: flex;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  width: max-content;
  max-width: 100%;
  background: var(--surface);
}
.install code {
  font-family: var(--mono);
  font-size: 14px;
  padding: 13px 16px;
}
.install button {
  border: 0;
  border-left: 1px solid var(--line);
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--mono);
  font-size: 13px;
  padding: 0 16px;
  cursor: pointer;
  transition: background 0.4s;
}
.hexbig {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 40px;
  letter-spacing: -0.02em;
  margin: 18px 0 2px;
}
.hexsub {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
}

.section {
  padding: 8px 0;
}
.sec-eye {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 44px 0 22px;
}
.sec-eye::before {
  content: "";
  width: 18px;
  height: 2px;
  background: var(--accent);
  transition: background 0.4s;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
  align-items: start;
}

/* 균일한 흰 카드 프레임 */
.pcard {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.pcard:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}
.tag {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}

/* 피커는 자기 그림자/배경 끄고(이중 박스 방지) 카드 안에서 가운데 정렬 */
.slot {
  display: flex;
  justify-content: center;
  --vc-box-shadow: none;
  --vc-bg: transparent;
}
/* 테마 데모만 피커 카드 모양을 살려 radius 차이를 보이게 */
.slot.framed {
  --vc-bg: #fff;
  --vc-box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
  padding: 4px;
}

footer {
  border-top: 1px solid var(--line);
  margin-top: 56px;
  padding: 28px 0 56px;
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 13px;
  flex-wrap: wrap;
  gap: 12px;
}
footer a {
  text-decoration: none;
}
footer a:hover {
  color: var(--accent);
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .hero-pick {
    margin: 0 auto;
  }
  .page h1 {
    font-size: 40px;
  }
}
</style>
