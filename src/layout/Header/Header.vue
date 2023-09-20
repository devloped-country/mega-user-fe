<template>
  <header :class="classes.header" v-if="isHeaderShowing">
    <img :class="classes.logo" :src="logoImg" alt="로고" />
    <h1 :class="classes.title">{{ getPageTitle() }}</h1>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import logoImg from '@/assets/images/logo.svg';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHeaderShowing = ref(true);

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
    case 'SuccessView':
      return '';
    case 'FailView':
      return '';
    case 'ReAuthView':
      return '';
    case 'FAQView':
      return '자주 묻는 질문';
    case 'JoinView':
      return '회원 가입';
    default:
      return 'NotFound';
  }
};

watch(
  () => route.name,
  () => {
    if (
      route.name === 'SuccessView' ||
      route.name === 'FailView' ||
      route.name === 'ReAuthView'
    ) {
      isHeaderShowing.value = false;
      return;
    }

    isHeaderShowing.value = true;
  }
);
</script>

<style module="classes" scoped>
@import './Header.css';
</style>
