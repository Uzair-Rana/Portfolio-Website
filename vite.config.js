import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and set to your repo name if deploying to GitHub Pages
  // base: '/your-repo-name/',
})
