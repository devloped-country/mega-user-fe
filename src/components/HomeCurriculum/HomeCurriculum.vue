<template>
  <section :class="classes.wrapper">
    <h2 :class="classes.title">커리큘럼</h2>
    <ul :class="classes.list" @click="handleCurriculumClick">
      <li :class="classes.item" v-for="curriculum in curriculumData">
        <h3 :class="classes.itemTitle">{{ curriculum.subject }}</h3>
        <p :class="classes.date">
          {{ DateFormat.formatYYYYMMDD(curriculum.startDate) }} ~
          {{ DateFormat.formatYYYYMMDD(curriculum.endDate) }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { DateFormat } from '@/util/format';

defineProps({
  curriculumData: {
    type: Object,
  },
});
const router = useRouter();

const handleCurriculumClick = () => {
  router.push({
    name: 'CurriculumView',
  });
};
</script>

<style module="classes" scoped>
@import './HomeCurriculum.css';
</style>
