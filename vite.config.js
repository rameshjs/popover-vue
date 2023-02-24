/* eslint-env node */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import libCss from "vite-plugin-libcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libCss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src", "index.js"),
      name: "PopoverVue",
      fileName: "popover-vue",
      format: ["umd"],
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
});
