import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        name: "BudgetBuddy",
        short_name: "budgetbuddy",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        description: "Budget Buddy is finance application",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/img/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/img/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern: ({ url }) => {
      //         return url.pathname.startsWith("/api");
      //       },
      //       handler: "CacheFirst",
      //       options: {
      //         cacheName: "api-cache",
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
});
