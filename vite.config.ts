import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  server: {
    watch: {
      // Ignore backend folder to prevent frontend dev server from watching backend files
      ignored: ["**/backend/**", "server.js", "config/**"],
    },
  },
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
  build: {
    chunkSizeWarningLimit: 7000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Don’t split react or react-dom
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return; // Include in main bundle (index)
          }
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-framer";
          }
          if (id.includes("node_modules/pdfmake")) {
            return "vendor-pdf";
          }
          return "vendor";
        },
      },
    },
  },
});
