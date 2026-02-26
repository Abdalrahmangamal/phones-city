import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => ({
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
  // Strip console output from production bundles to avoid leaking debug/customer data.
  esbuild: mode === "production"
    ? { drop: ["console", "debugger"] }
    : undefined,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI Libraries
          'vendor-swiper': ['swiper'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          // i18n
          'vendor-i18n': ['react-i18next', 'i18next'],
          // State management
          'vendor-zustand': ['zustand'],
          // Toast notifications
          'vendor-toast': ['react-toastify'],
          // Utilities / feature-specific libs
          'vendor-axios': ['axios'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-botpress': ['@botpress/webchat', '@botpress/chat'],
          'vendor-framer': ['framer-motion'],
          'vendor-html2pdf': ['html2pdf.js'],
        },
      },
    },
  },
}));
