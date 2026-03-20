import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        'politica-de-privacidad': resolve(__dirname, 'politica-de-privacidad.html'),
        'terminos-y-condiciones': resolve(__dirname, 'terminos-y-condiciones.html'),
      },
    },
  },
});
