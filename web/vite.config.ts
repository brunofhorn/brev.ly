import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://lb-rocketseat-1923466556.us-east-2.elb.amazonaws.com",
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, "")
      }
    }
  }
});
