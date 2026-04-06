import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Project-Perfume/',
  server: {
    port: 3001,
    strictPort: true,
    open: true,
    host: 'localhost'
  }
})

