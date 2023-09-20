<template>
  <section :class="classes.wrapper">
    <h2 :class="classes.title">프로필</h2>
    <div :class="classes.profileWrapper">
      <img :src="userImg" alt="사진" :class="classes.userImg" />
      <div>
        <h3 :class="classes.name">김유범</h3>
        <ul :class="classes.list">
          <li :class="classes.item" v-for="(profile, index) in profileData">
            {{ getProfileColumnTitle(index) }} {{ profile.attendanceCount }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import userImg from '@/assets/images/User-60.svg';

defineProps({
  profileData: {
    type: Object,
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
      return '결석';
    case 4:
      return '공가';
    case 5:
      return '병가';
  }
};
</script>

<style module="classes" scoped>
@import './HomeProfile.css';
</style>
