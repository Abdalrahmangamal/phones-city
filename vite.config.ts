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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI Libraries
          'vendor-swiper': ['swiper'],
          // i18n
          'vendor-i18n': ['react-i18next', 'i18next'],
          // State management
          'vendor-zustand': ['zustand'],
          // Toast notifications
          'vendor-toast': ['react-toastify'],
        },
      },
    },
  },
});
