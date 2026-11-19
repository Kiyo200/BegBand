import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fejlesztéskor az /api kéréseket a Spring backend kapja (localhost:8080), így nem kell CORS.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
