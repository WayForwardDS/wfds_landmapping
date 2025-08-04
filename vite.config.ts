// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//    optimizeDeps: {
//     include: ['leaflet']
//   },
//    resolve: {
//     alias: {}
//   }
 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['leaflet']
  },
  resolve: {
    alias: {}
  },
  base: '/', // This ensures assets are loaded correctly in production
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
