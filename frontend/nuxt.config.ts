// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    routeRules: {
      '/api/**': { proxy: 'http://localhost:3001/api/**' },
      '/uploads/**': { proxy: 'http://localhost:3001/uploads/**' }
    }
  },
  vite: {
    server: {
      allowedHosts: [
        'usage-mango-equipment.ngrok-free.dev',
        '.ngrok-free.dev',
        '.ngrok-free.app',
        '.ngrok.io'
      ],
      hmr: {
        clientPort: 443
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true
        },
        '/uploads': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      }
    }
  }
})
