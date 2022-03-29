import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'index.html': './index.ejs',
        'home.html': './home.html',
      },
    },
  },
});
