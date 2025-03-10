import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  build: {
    chunkSizeWarningLimit: 7000,
    // Remove manualChunks to prevent splitting
  },
});
