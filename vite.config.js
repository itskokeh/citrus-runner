import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  build: {
    emptyOutDir: true,

    rollupOptions: {
      // Multi-page setup
      input: {
        main: path.resolve(__dirname, './index.html'),
        game: path.resolve(__dirname, './src/phaser/main.js')
      },
      output: {
        // Keep builds separated
        entryFileNames: '[name]/[name]-[hash].js',
        assetFileNames: '[name]/assets/[name]-[hash].[ext]'
      }
    }
  }
});
