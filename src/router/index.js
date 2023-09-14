import HomeView from '@/views/HomeView/HomeView.vue';
import QrView from '@/views/QrView/QrView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'HomeView',
  },
  {
    path: '/qr',
    component: QrView,
    name: 'QrView',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
