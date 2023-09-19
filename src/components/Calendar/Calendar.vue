<template>
  <section v-if="homeData" :class="classes.calendarWrapper">
    {{ homeData }}
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
      :firstDay="firstDay.getDay()"
      :lastDate="lastDay.getDate()"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Dates from '@/components/Dates/Dates.vue';
import CalendarNav from '@/components/CalendarNav/CalendarNav.vue';
import { useFetch } from '@/composables';

const { data: homeData, fetchData: fetchHomeData } = useFetch('/home', {
  headers: {
    userName: 'asdfsadf',
  },
  onSuccess: (res) => {
    console.log('통신 성공!');
    console.log(res);
  },
  onError: (res) => {
    console.log('통신 실패!');
    console.log(res);
  },
});

const currDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
});

const firstDay = computed(
  () => new Date(currDate.value.year, currDate.value.month - 1, 1)
);

const lastDay = computed(
  () => new Date(currDate.value.year, currDate.value.month, 0)
);

const increaseMonth = () => {
  currDate.value.month = currDate.value.month + 1;
};

const decreaseMonth = () => {
  currDate.value.month = currDate.value.month - 1;
};

onMounted(() => {
  fetchHomeData();
});
</script>

<style module="classes" scoped>
@import './Calendar.css';
</style>
