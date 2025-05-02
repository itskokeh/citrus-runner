import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()], // Only needed for React components

  build: {
    // Disable automatic directory cleaning (safety first!)
    emptyOutDir: false,

    rollupOptions: {
      // Multi-page setup
      input: {
        main: path.resolve(__dirname, './index.html'), // React app
        game: path.resolve(__dirname, './src/phaser/main.js') // Phaser entry
      },
      output: {
        // Keep builds separated
        entryFileNames: '[name]/[name]-[hash].js',
        assetFileNames: '[name]/assets/[name]-[hash].[ext]'
      }
    }
  }
});
