import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": "http://localhost:5000", // backend server
    },

    // proxy: {
    //   "/api": "http://localhost:5000",
    //   "/uploads": "http://localhost:5000",
    // },
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "./src"),
    //   },
    // },
  },
});
