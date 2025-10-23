import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API to the express server
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      // Proxy asset requests so <img src="/assets/..." /> fetches from express
      '/assets': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }



})
