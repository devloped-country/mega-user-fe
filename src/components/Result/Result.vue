<template>
  <section :class="classes.wrapper">
    <div :class="classes.content">
      <img :src="img" :alt="title" />
      <h2 :class="classes.title">{{ title }}</h2>
      <p :class="classes.desc">{{ desc }}</p>
      <button type="button" :class="classes.btn" @click="handleHomeBtnClick">
        홈으로 이동
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const { title, desc, img, route } = defineProps({
  title: String,
  desc: String,
  img: Object,
  route: String,
});

const router = useRouter();

const handleHomeBtnClick = () => {
  router.push({
    name: route,
  });
};
</script>

<style module="classes" scoped>
@import './Result.css';
</style>
