import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  if (mode === "pages") {
    return {
      base: "/vcolor/",
      plugins: [vue()],
    };
  }

  return {
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "VColor",
        fileName: "vcolor",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
