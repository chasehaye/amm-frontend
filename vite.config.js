import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        //target: 'http://localhost:8000',
        target: 'http://amm-190a5f09af12.herokuapp.com/', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => {
          const rewrittenPath = path.replace(/^\/api/, '');
          const finalPath = rewrittenPath.startsWith('/') ? rewrittenPath : '/' + rewrittenPath;
          return finalPath;
        },
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
