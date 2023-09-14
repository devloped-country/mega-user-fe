<template>
  <footer :class="classes.footer">
    <ul :class="classes.menuList">
      <li
        :class="classes.menuItem"
        :key="index"
        v-for="({ route, img, title }, index) in info"
        @click="handleClickMenu(route)"
      >
        <img :src="img" :alt="title" />
        <h4 :class="classes.menuName">{{ title }}</h4>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useFooter } from '@/composables';

const router = useRouter();
const { info } = useFooter();

const handleClickMenu = (route) => {
  router.push({
    name: route,
  });
};
</script>

<style module="classes" scoped>
@import './Footer.css';
</style>
