import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'VisualNet Solutions',
        short_name: 'VisualNet',
        description: 'Infraestructura de red profesional - Cableado estructurado certificado',
        theme_color: '#0066CC',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'https://xyajiczouzenhakumqwa.supabase.co/storage/v1/object/public/Interactiva/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
})