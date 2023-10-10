<template>
  <footer :class="classes.footer" v-if="isFooterShowing">
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
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFooter } from '@/composables';

const router = useRouter();
const route = useRoute();
const { info } = useFooter();
const isFooterShowing = ref(true);

const handleClickMenu = (route) => {
  router.push({
    name: route,
  });
};

watch(
  () => route.name,
  () => {
    if (
      route.name === 'LoginView' ||
      route.name === 'SuccessView' ||
      route.name === 'FailView' ||
      route.name === 'ReAuthView' ||
      route.name === 'PositionAuthView' ||
      route.name === 'PrivacyView'
    ) {
      isFooterShowing.value = false;
      return;
    }

    isFooterShowing.value = true;
  }
);
</script>

<style module="classes" scoped>
@import './Footer.css';
</style>
