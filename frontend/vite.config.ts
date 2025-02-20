import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths(),TanStackRouterVite()],
  optimizeDeps: {
    force: true,
  },
  build: {
    target: "es2017",
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          tanstack: ["@tanstack/react-router", "@tanstack/react-query"],
          react_admin: ["react-admin", "@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
});
