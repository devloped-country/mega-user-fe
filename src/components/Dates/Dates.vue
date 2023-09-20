<template>
  <template v-if="isAttendanceLoading"></template>
  <template v-else>
    <ul :class="classes.dateList" v-if="attendanceData.status === '-1'">
      <li :class="classes.date" v-for="_ in firstDay"></li>
      <template
        v-for="val in new Date(currDate.year, currDate.month, 0).getDate()"
      >
        <li :class="classes.date">
          <p>
            {{ val }}
          </p>
          <template
            v-if="
              new Date(currDate.year, currDate.month - 1, val).getDay() !== 6 &&
              new Date(currDate.year, currDate.month - 1, val).getDay() !== 0
            "
          >
            <div :class="classes.notAttendancePin" />
          </template>
        </li>
      </template>
    </ul>
    <template v-else>
      <ul :class="classes.dateList" v-if="attendanceData">
        <li :class="classes.date" v-for="_ in firstDay"></li>
        <template v-for="homeInfo in attendanceData">
          <li :class="classes.date">
            <p>{{ new Date(homeInfo.startDate).getDate() }}</p>
            <div
              v-if="homeInfo.stat === 1"
              :class="classes.notAttendancePin"
            ></div>
            <div
              v-else-if="homeInfo.stat === 2"
              :class="classes.attendancePin"
            ></div>
            <div v-else-if="homeInfo.stat === 3" :class="classes.latePin"></div>
            <div
              v-else-if="homeInfo.stat === 4"
              :class="classes.earlyLeavePin"
            ></div>
            <div
              v-else-if="homeInfo.stat === 5"
              :class="classes.officialLeavePin"
            ></div>
            <div
              v-else-if="homeInfo.stat === 6"
              :class="classes.absentPin"
            ></div>
            <div v-else-if="homeInfo.stat === 7" :class="classes.sickPin"></div>
          </li>

          <li
            :class="classes.date"
            v-if="
              new Date(homeInfo.startDate).getDay() === 5 &&
              new Date(
                new Date(homeInfo.startDate).getFullYear(),
                new Date(homeInfo.startDate).getMonth() + 1,
                0
              ).getDate() >=
                new Date(homeInfo.startDate).getDate() + 1
            "
          >
            <p>{{ new Date(homeInfo.startDate).getDate() + 1 }}</p>
          </li>
          <li
            :class="classes.date"
            v-if="
              new Date(homeInfo.startDate).getDay() === 5 &&
              new Date(
                new Date(homeInfo.startDate).getFullYear(),
                new Date(homeInfo.startDate).getMonth() + 1,
                0
              ).getDate() >=
                new Date(homeInfo.startDate).getDate() + 2
            "
          >
            <p>{{ new Date(homeInfo.startDate).getDate() + 2 }}</p>
          </li>
        </template>
        <li
          :class="classes.date"
          v-for="date in new Date(currDate.year, currDate.month, 0)"
        >
          <p>{{ date }}</p>
          <div :class="classes.attendancePin"></div>
        </li></ul
    ></template>
  </template>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currDate: {
    type: Object,
  },
  attendanceData: {
    type: Object,
  },
  isAttendanceLoading: {
    type: Boolean,
  },
});

const firstDay = computed(() =>
  new Date(props.currDate.year, props.currDate.month - 1, 1).getDay()
);
</script>

<style module="classes" scoped>
@import './Dates.css';
</style>
