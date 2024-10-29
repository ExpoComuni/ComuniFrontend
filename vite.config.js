import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Communi',
        short_name: 'Communi',
        description: 'Aplicación orientada a mejorar la comunicación entre la municipalidad de Alajuelita y sus habidantes.',
        theme_color: '#F7FAFC',
        background_color: '#F7FAFC',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: './vite.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
})
