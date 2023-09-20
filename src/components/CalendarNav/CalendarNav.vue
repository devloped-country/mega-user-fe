<template>
  <nav :class="classes.nav">
    <button
      type="button"
      :class="classes.arrowBtn"
      @click="handleLeftArrowBtnClick"
    >
      <img :src="smallArrowLeft" alt="왼쪽 화살표" :class="classes.arrowImg" />
    </button>
    <h3 :class="classes.title">{{ currDate.year }}년 {{ currDate.month }}월</h3>
    <button
      type="button"
      :class="classes.arrowBtn"
      @click="handleRightArrowBtnClick"
    >
      <img
        :src="smallArrowRight"
        alt="오른쪽 화살표"
        :class="classes.arrowImg"
      />
    </button>
  </nav>
</template>

<script setup>
import smallArrowLeft from '@/assets/images/small-arrow-left.svg';
import smallArrowRight from '@/assets/images/small-arrow-right.svg';

const props = defineProps({
  currDate: {
    type: Object,
  },
  attendanceData: {
    type: Object,
  },
});
const emit = defineEmits();

const handleLeftArrowBtnClick = () => {
  if (props.currDate.month <= 1) {
    return;
  }

  emit('decreaseMonth');
};

const handleRightArrowBtnClick = () => {
  if (props.currDate.month >= new Date().getMonth() + 1) {
    return;
  }

  emit('increaseMonth');
};
</script>

<style module="classes" scoped>
@import './CalendarNav.css';
</style>
