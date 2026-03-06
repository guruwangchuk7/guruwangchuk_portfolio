import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning threshold to 1000kb (default is 500kb)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split large dependencies into separate chunks for better caching & load performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'three-globe'],
          'gsap-vendor': ['gsap'],
          'lenis-vendor': ['lenis'],
        }
      }
    }
  }
})

