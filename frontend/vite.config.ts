import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// If available, you can import types for more explicit configuration, for example:
// import type { UserConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: { babelrc: true },
    }),
  ],
  build: {
    sourcemap: false,
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/",
});
