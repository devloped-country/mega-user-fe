<template>
  <section :class="classes.wrapper">
    <HomeProfile
      :profileData="profileData"
      :isProfileLoading="isProfileLoading"
    />
    <HomeNotice :noticeData="noticeData" :isNoticeLoading="isNoticeLoading" />
    <HomeCurriculum
      :curriculumData="curriculumData"
      :isCurriculumLoading="isCurriculumLoading"
    />
    <Calendar
      :attendanceData="attendanceData"
      :currDate="currDate"
      :isAttendanceLoading="isAttendanceLoading"
    />
  </section>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useFetch } from '@/composables';
import Calendar from '@/components/Calendar/Calendar.vue';
import HomeProfile from '@/components/HomeProfile/HomeProfile.vue';
import HomeNotice from '@/components/HomeNotice/HomeNotice.vue';
import HomeCurriculum from '@/components/HomeCurriculum/HomeCurriculum.vue';

const token = ref(VueJwtDecode.decode(localStorage.getItem('access')));
const currDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
});

const {
  isLoading: isAttendanceLoading,
  data: attendanceData,
  fetchData: fetchAttendanceData,
} = useFetch('/home/attendance');

const {
  isLoading: isCurriculumLoading,
  data: curriculumData,
  fetchData: fetchCurriculumData,
} = useFetch('/home/curriculum');

const {
  isLoading: isNoticeLoading,
  data: noticeData,
  fetchData: fetchNoticeData,
} = useFetch('/home/notice');

const {
  isLoading: isProfileLoading,
  data: profileData,
  fetchData: fetchProfileData,
} = useFetch('/home/profile');

watchEffect(() => {
  fetchAttendanceData({
    name: token.value.aud,
    year: currDate.value.year,
    month: currDate.value.month,
  });
});

onMounted(() => {
  fetchCurriculumData();
  fetchNoticeData();
  fetchProfileData({
    name: token.value.aud,
  });
});
</script>

<style module="classes" scoped>
@import './HomeView.css';
</style>
