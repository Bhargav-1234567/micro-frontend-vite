import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "client-portal",
      filename: "clientPortal.js",
      // remotes: {
      //   layout_components: "http://localhost:4173/assets/layoutContainer.js",
      // },
      exposes: {
        "./Client": "./src/App.jsx",
      },
      shared: ["react"],
    }),
  ],
  server: {
    port: 3001,
    cors: {
      origin: "*",
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",

    minify: false,
    cssCodeSplit: false,
  },
});
