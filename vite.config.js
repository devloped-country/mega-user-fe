import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.megamega-app.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         signup: ['./src/views/SignupView/SignupView'],
  //       },
  //     },
  //   },
  // },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
