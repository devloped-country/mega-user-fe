<template>
  <ul :class="classes.dateList">
    <li :class="classes.date" v-for="_ in firstDay"></li>
    <li :class="classes.date" v-for="date in lastDate">
      <p>{{ date }}</p>
      <div :class="classes.attendancePin" />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  currDate: {
    type: Object,
  },
  firstDay: {
    type: Number,
  },
  lastDate: {
    type: Number,
  },
});
</script>

<style module="classes" scoped>
@import './Dates.css';
</style>
