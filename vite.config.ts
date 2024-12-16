import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://167.172.247.51:3000', // URL del backend
        changeOrigin: true, // Cambia el origen del host en la solicitud
        secure: false, // Solo necesario si usas HTTPS con certificados no confiables
      },
    },
  },
});
