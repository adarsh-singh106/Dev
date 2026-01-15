import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    host:true
  },

  resolve: {
    alias: {
      // "path.resolve" defaults to the project root (CWD) automatically
      "@": path.resolve("./src"), 
    },
  },
});