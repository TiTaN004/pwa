// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       devOptions: {
//         enabled: true, // Enable PWA in development
//         type: 'module',
//         navigateFallback: 'index.html',
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
//         cleanupOutdatedCaches: true,
//         clientsClaim: true,
//       },
//       includeAssets: [
//         'favicon.ico', 
//         'apple-touch-icon.png', 
//         'masked-icon.svg',
//         'favicon-96x96.png',
//         'favicon.svg'
//       ],
//       manifest: {
//         name: 'Panth Enterprise',
//         short_name: 'Panth',
//         description: 'Panth Enterprise - Your Business Solution',
//         theme_color: '#000000',
//         background_color: '#000000',
//         display: 'standalone',
//         orientation: 'portrait',
//         scope: '/',
//         start_url: '/',
//         icons: [
//           {
//             src: 'web-app-manifest-192x192.png',
//             sizes: '192x192',
//             type: 'image/png',
//             purpose: 'any maskable'
//           },
//           {
//             src: 'web-app-manifest-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       }
//     })
//   ],
//   server: {
//     https: false, // Set to true if you want HTTPS in dev
//     host: true,
//     port: 3000
//   }
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: [
        'favicon.ico', 
        'apple-touch-icon.png', 
        'favicon-96x96.png',
        'favicon.svg'
      ],
      manifest: {
        name: 'Panth Enterprise',
        short_name: 'Panth',
        description: 'Panth Enterprise - Your Business Solution',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: '/',
        icons: [
          {
            src: 'web-app-manifest-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'web-app-manifest-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'web-app-manifest-96x96.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'web-app-manifest-192x192.png',  // Your existing 192x192 logo
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'web-app-manifest-512x512.png',  // Your existing 512x512 logo
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'web-app-manifest-512x512.png',  // Same file used for maskable
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        // Screenshots are optional for basic PWA functionality
        // screenshots: []
      }
    })
  ],
  server: {
    https: false,
    host: true,
    port: 3000
  }
});