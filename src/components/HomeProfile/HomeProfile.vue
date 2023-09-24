<template>
  <section :class="classes.wrapper">
    <h2 :class="classes.title">프로필</h2>
    <div v-if="isProfileLoading" :class="classes.profileLoadingWrapper">
      <VueSpinner size="40" />
    </div>
    <div v-else :class="classes.profileWrapper">
      <img :src="userImg" alt="사진" :class="classes.userImg" />
      <div>
        <h3 :class="classes.name">
          {{ name.aud }}
          <span :class="classes.role">Developer</span>
        </h3>
        <ul :class="classes.list">
          <li :class="classes.item" v-for="(profile, index) in profileData">
            {{ getProfileColumnTitle(index) }} {{ profile.attendanceCount }}
          </li>
        </ul>
      </div>
    </div>
    <footer :class="classes.info">
      위 정보는 단위기간 내의 출결 정보입니다.
    </footer>
  </section>
</template>

<script setup>
import userImg from '@/assets/images/User-60.svg';
import VueJwtDecode from 'vue-jwt-decode';
import { ref } from 'vue';

const name = ref(VueJwtDecode.decode(localStorage.getItem('access')));

defineProps({
  profileData: {
    type: Object,
  },
  isProfileLoading: {
    type: Boolean,
  },
});

const getProfileColumnTitle = (index) => {
  switch (index) {
    case 0:
      return '출석';
    case 1:
      return '지각';
    case 2:
      return '조퇴';
    case 3:
      return '공가';
    case 4:
      return '결석';
    case 5:
      return '병가';
  }
};
</script>

<style module="classes" scoped>
@import './HomeProfile.css';
</style>
