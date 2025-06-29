// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // ▶️  Base “/” para que los assets se sirvan correctamente en Vercel
  base: "/",

  plugins: [react()],

  // 🔧 Ajustes de servidor solo afectan al modo dev
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
  },
});
