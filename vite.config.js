import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.png', '**/*.jpg', '**/*.jpeg'],
  server: {
    port: 5173
  }
})
