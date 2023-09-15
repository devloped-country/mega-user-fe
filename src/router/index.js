import HomeView from '@/views/HomeView/HomeView.vue';
import QrReaderView from '@/views/QrReaderView/QrReaderView.vue';
import MyPageView from '@/views/MyPageView/MyPageView.vue';
import CurriculumView from '@/views/CurriculumView/CurriculumView.vue';
import NoticeView from '@/views/NoticeView/NoticeView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'HomeView',
  },
  {
    path: '/notice',
    component: NoticeView,
    name: 'NoticeView',
  },
  {
    path: '/qr',
    component: QrReaderView,
    name: 'QrReaderView',
  },
  {
    path: '/curriculum',
    component: CurriculumView,
    name: 'CurriculumView',
  },
  {
    path: '/mypage',
    component: MyPageView,
    name: 'MyPageView',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
