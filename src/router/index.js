import HomeView from '@/views/HomeView/HomeView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'HomeView',
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
