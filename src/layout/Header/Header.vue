<template>
  <header
    :class="[classes.header, isHeaderLayout && classes.changeHeader]"
    v-if="isHeaderShowing"
  >
    <img
      v-if="isHeaderLayout"
      :class="classes.backArrow"
      :src="backArrow"
      @click="handleBackMoveBtnClick"
      alt="뒤로가기"
    />
    <img v-else :class="classes.logo" :src="logo" alt="로고" />
    <h1 :class="classes.title">{{ getPageTitle() }}</h1>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import logo from '@/assets/images/logo.svg';
import backArrow from '@/assets/images/arrow-left.svg';
import { useRoute } from 'vue-router';
import { router } from '../../router';

const route = useRoute();
const isHeaderLayout = ref(false);
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
    case '_idView':
      return '공지사항';
    default:
      return 'NotFound';
  }
};

const changeLayout = () => {
  switch (route.name) {
    case 'FAQView':
    case '_idView':
      isHeaderLayout.value = true;
      break;
    default:
      isHeaderLayout.value = false;
      break;
  }
};

const handleBackMoveBtnClick = () => {
  router.back();
};

watch(
  () => route.name,
  () => {
    if (
      route.name === 'LoginView' ||
      route.name === 'SuccessView' ||
      route.name === 'FailView' ||
      route.name === 'ReAuthView'
    ) {
      isHeaderShowing.value = false;
      return;
    }
    isHeaderShowing.value = true;

    changeLayout();
  }
);
</script>

<style module="classes" scoped>
@import './Header.css';
</style>
