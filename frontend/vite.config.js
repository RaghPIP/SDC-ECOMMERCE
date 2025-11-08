import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        // Local backend runs on 5001 by default in this project
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
