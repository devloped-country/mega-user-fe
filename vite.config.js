import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'http://ec2-43-202-53-236.ap-northeast-2.compute.amazonaws.com',
=======
      "/api": {
        target: "http://localhost:8081",
>>>>>>> 27118c6a317fd89e25a9061a69a9ac4d9ca6a628
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
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
    alias: [{ find: "@", replacement: "/src" }],
  },
});
