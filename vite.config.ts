import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix for Botpress Webchat compilation
      "C:/Users/c.city/OneDrive/Desktop/phones-city-main/node_modules/@botpress/webchat/dist/style.css": path.resolve(__dirname, "./src/utils/empty.css"),
      "@botpress/webchat/dist/style.css": path.resolve(__dirname, "./src/utils/empty.css"),
    },
  },
  optimizeDeps: {
    include: ['@botpress/webchat', '@botpress/chat']
  }
});
