import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django development server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'),
  ],
  //base: '/static/',  // Set the base path to match Django's STATIC_URL
  build: {
    outDir: 'dist',  // Output directory
    assetsDir: 'assets', //static file directory
  },

})
