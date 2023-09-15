import {defineConfig} from 'vite';

export default defineConfig({
  root: './client',
  build: {
    outDir: '../public',
    rollupOptions: {
      input: {
        index: './client/index.html',
        recoverLicense: './client/recover-license.html',
        thankYou: './client/thank-you.html',
      },
    },
  },
});
