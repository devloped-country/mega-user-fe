<template>
  <butt
  <Calendar :homeData="homeData" :currDate="currDate" />
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useFetch } from '@/composables';
import Calendar from '@/components/Calendar/Calendar.vue';

const currDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
});

const { data: homeData, fetchData: fetchHomeData } = useFetch('/home');

// watchEffect(() => {
//   // console.log(homeData.value);
//   fetchHomeData({
//     name: 'ghjkg',
//     year: currDate.value.year,
//     month: currDate.value.month,
//   });
// });
</script>

<style module="classes">
/* @import './HomeView.css'; */
</style>
