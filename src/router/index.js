import HomeView from '@/views/HomeView/HomeView.vue';
import QrReaderView from '@/views/QrReaderView/QrReaderView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'HomeView',
  },
  {
    path: '/qr',
    component: QrReaderView,
    name: 'QrReaderView',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
