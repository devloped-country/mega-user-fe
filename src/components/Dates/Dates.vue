<template>
  <ul :class="classes.dateList">
    <li :class="classes.date" v-for="_ in firstDay"></li>
    <template v-for="homeInfo in homeData">
      <li :class="classes.date">
        <!-- <p>{{ new Date(homeInfo.startDate) }}</p> -->
        <!-- <p>{{ new Date(homeInfo.startDate).getDay() }}</p> -->
        <div :class="classes.attendancePin">{{ homeInfo.stat }}</div>
      </li>
      <li v-if="new Date(homeInfo.startDate).getDay() === 5"></li>
      <li v-if="new Date(homeInfo.startDate).getDay() === 5"></li>
    </template>
    <!-- <li :class="classes.date" v-for="date in lastDate">
      <p>{{ date }}</p>
      <div :class="classes.attendancePin" />
    </li> -->
  </ul>
</template>

<script setup>
const props = defineProps({
  currDate: {
    type: Object,
  },
  firstDay: {
    type: Number,
  },
  lastDate: {
    type: Number,
  },
  homeData: {
    type: Object,
  },
});
</script>

<style module="classes" scoped>
@import './Dates.css';
</style>
