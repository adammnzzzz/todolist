import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Todo App",
        short_name: "Todo",
        theme_color: "#1e1e1e",
        background_color: "#1e1e1e",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/todos/,
            handler: "NetworkFirst",
            options: {
              cacheName: "todo-api-cache",
            },
          },
        ],
      },
    }),
  ],

  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});