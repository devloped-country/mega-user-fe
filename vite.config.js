import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/v1': {
        target: 'https://api.megamega-app.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
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
