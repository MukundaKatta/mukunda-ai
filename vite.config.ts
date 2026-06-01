import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom')) return 'vendor'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-icons')) return 'icons'
        },
      },
    },
  },
})
