import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ permite acceso desde red local
    port: 5173, // ✅ puerto por defecto (puedes cambiarlo si está ocupado)
    strictPort: true, // ❗ garantiza que no se cambie automáticamente
    open: false, // puedes poner true si quieres que se abra automáticamente en el navegador
  },
});
