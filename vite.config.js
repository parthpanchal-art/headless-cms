import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // This forces Vite to correctly handle the Apollo Client exports
    include: ['@apollo/client/core', '@apollo/client/cache'],
    exclude: ['@apollo/client'] 
  },
})