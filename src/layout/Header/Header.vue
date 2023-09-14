<template>
  <header :class="classes.header">
    <img :class="classes.logo" :src="logoImg" alt="로고" />
    <h1 :class="classes.title">{{ getPageTitle() }}</h1>
  </header>
</template>

<script setup>
import logoImg from '@/assets/images/logo.svg';
import { useRoute } from 'vue-router';

const route = useRoute();

const getPageTitle = () => {
  switch (route.name) {
    case 'HomeView':
      return '홈';
    case 'NoticeView':
      return '공지사항';
    case 'QrView':
      return 'QR';
    case 'CurriculumView':
      return '커리큘럼';
    case 'MyPageView':
      return '마이페이지';
    default:
      return 'NotFound';
  }
};
</script>

<style module="classes" scoped>
@import './Header.css';
</style>
