import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS plugin
    visualizer({ open: true }), // Visualize the bundle
  ],
  build: {
    chunkSizeWarningLimit: 7000, // Keep the warning limit at 700 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const moduleName = id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();

            // Debug: Log module names to identify unhandled dependencies
            console.log("Module:", moduleName);

            // Group specific dependencies
            if (moduleName === "react" || moduleName === "react-dom") {
              return "vendor-react";
            }
            if (moduleName === "lodash" || moduleName === "moment") {
              return "vendor-utils";
            }
            if (moduleName === "framer-motion") {
              return "vendor-framer"; // Split from vendor-ui
            }
            if (moduleName === "@clerk/clerk-react") {
              return "vendor-clerk"; // Split from vendor-ui
            }
            if (moduleName === "pdfmake") {
              return "vendor-pdf";
            }
            if (
              moduleName === "tailwindcss" ||
              moduleName === "@tailwindcss/vite"
            ) {
              return "vendor-css"; // Ensure Tailwind CSS is isolated
            }
            if (moduleName === "swr" || moduleName === "react-router-dom") {
              return "vendor-routing";
            }

            // Default chunk for other dependencies
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
