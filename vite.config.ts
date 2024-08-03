import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: true,
    proxy: {
      '/__/auth': {
        target: 'https://motos-2440a.firebaseapp.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/__\/auth/, '/__/auth'),
      },
    },
  },
});