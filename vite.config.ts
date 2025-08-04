import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: ['leaflet']
  },
   resolve: {
    alias: {}
  }
  // build: {
  //   sourcemap: false, 
  //   minify: 'terser', 
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  // },
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['react-leaflet'],
//   },
//   resolve: {
//     dedupe: ['react-leaflet'],
//   },
// });
// ;

