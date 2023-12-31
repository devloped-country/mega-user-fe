import HomeView from '@/views/HomeView/HomeView.vue';
import QrReaderView from '@/views/QrReaderView/QrReaderView.vue';
import MyPageView from '@/views/MyPageView/MyPageView.vue';
import CurriculumView from '@/views/CurriculumView/CurriculumView.vue';
import NoticeView from '@/views/NoticeView/NoticeView.vue';
import SuccessView from '@/views/SuccessView/SuccessView.vue';
import FailView from '@/views/FailView/FailView.vue';
import ReAuthView from '@/views/ReAuthView/ReAuthView.vue';
import _idView from '@/views/NoticeView/_idView.vue';
import LoginView from '@/views/LoginView/LoginView.vue';
import PositionAuthView from '@/views/PositionAuthView/PositionAuthView.vue';
import FAQView from '@/views/FAQView/FAQView.vue';
import JoinView from '@/views/JoinView/JoinView.vue';
import PrivacyView from '@/views/PrivacyView/PrivacyView.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: LoginView,
    name: 'LoginView',
  },
  {
    path: '/home',
    component: HomeView,
    name: 'HomeView',
  },
  {
    path: '/notice',
    component: NoticeView,
    name: 'NoticeView',
  },
  {
    path: '/notice/:id',
    component: _idView,
    name: '_idView',
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
  {
    path: '/success',
    component: SuccessView,
    name: 'SuccessView',
  },
  {
    path: '/fail',
    component: FailView,
    name: 'FailView',
  },
  {
    path: '/reauth',
    component: ReAuthView,
    name: 'ReAuthView',
  },
  {
    path: '/positionauth',
    component: PositionAuthView,
    name: 'PositionAuthView',
  },
  {
    path: '/faq',
    component: FAQView,
    name: 'FAQView',
  },
  {
    path: '/join',
    component: JoinView,
    name: 'JoinView',
  },
  {
    path: '/privacy',
    component: PrivacyView,
    name: 'PrivacyView',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
