<template>
  <section :class="classes.wrapper">
    <header :class="classes.greetingWrapper">
      <h3 :class="classes.greeting">
        김유범님 안녕하세요 👋🏼<br />오늘도 좋은 하루 되세요.
      </h3>
    </header>
    <main :class="classes.contentWrapper">
      <ul :class="classes.list">
        <li :class="classes.item" @click="$router.push({ name: 'FAQView' })">
          <p :class="classes.text">자주 묻는 질문</p>
          <img :src="rightArrow" alt="화살표" />
        </li>
        <li :class="classes.item" @click="handleLogoutBtnClick">
          <p :class="classes.text">로그아웃</p>
          <img :src="rightArrow" alt="화살표" />
        </li>
      </ul>
    </main>
    <footer :class="classes.info">
      <p :class="classes.infoText">
        고객센터<br />
        010-7322-2109<br />
        24시간 운영, 연중무휴
      </p>
    </footer>
  </section>
</template>

<script setup>
import rightArrow from '@/assets/images/angle-small-right.svg';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogoutBtnClick = () => {
  window.localStorage.clear();
  router.push({ name: 'LoginView' });
};
</script>

<style module="classes" scoped>
@import './MyPageView.css';
</style>
