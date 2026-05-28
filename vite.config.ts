import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    watch: {
      // Ignore non-source files that may be locked by the OS or other apps
      ignored: ["**/*.pdf", "**/*.docx", "**/*.xlsx", "**/*.pptx", "**/*.jpeg", "**/*.jpg", "**/*.png", "**/node_modules/**"],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
