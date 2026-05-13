import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning limit slightly — we know framer-motion is large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React core — tiny, loads first
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Framer Motion — large, split out so it can be cached separately
          'vendor-motion': ['framer-motion'],
          // Icons — large, split out
          'vendor-icons': ['react-icons'],
          // Pages that are NOT the home page — lazy loaded
          'page-contact': ['./src/pages/Contact.jsx'],
          'page-project': ['./src/pages/ProjectDetail.jsx'],
        },
      },
    },
  },
})
