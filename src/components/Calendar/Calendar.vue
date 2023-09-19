<template>
  <section v-if="homeData" :class="classes.calendarWrapper">
    <header :class="classes.calendarHeader">
      <h2 :class="classes.calendarTitle">캘린더</h2>
      <ul :class="classes.calendarPinList">
        <li :class="[classes.calendarPinItem, classes.attendance]">출석</li>
        <li :class="[classes.calendarPinItem, classes.late]">지각</li>
        <li :class="[classes.calendarPinItem, classes.absent]">결석</li>
      </ul>
    </header>
    <CalendarNav
      :currDate="currDate"
      @increaseMonth="increaseMonth"
      @decreaseMonth="decreaseMonth"
    />
    <ul :class="classes.dayList">
      <li :class="classes.day">일</li>
      <li :class="classes.day">월</li>
      <li :class="classes.day">화</li>
      <li :class="classes.day">수</li>
      <li :class="classes.day">목</li>
      <li :class="classes.day">금</li>
      <li :class="classes.day">토</li>
    </ul>
    <Dates
      :currDate="currDate"
      :homeData="homeData"
      :firstDay="firstDay.getDay()"
      :lastDate="lastDay.getDate()"
    />
  </section>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import Dates from '@/components/Dates/Dates.vue';
import CalendarNav from '@/components/CalendarNav/CalendarNav.vue';

const props = defineProps({
  homeData: {
    type: Array,
  },
  currDate: {
    type: Object,
  },
});

const firstDay = computed(
  () => new Date(props.currDate.year, props.currDate.month - 1, 1)
);

const lastDay = computed(
  () => new Date(props.currDate.year, props.currDate.month, 0)
);

const increaseMonth = () => {
  props.currDate.month = props.currDate.month + 1;
};

const decreaseMonth = () => {
  props.currDate.month = props.currDate.month - 1;
};
</script>

<style module="classes" scoped>
@import './Calendar.css';
</style>
