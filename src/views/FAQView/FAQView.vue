<template>
  <section :class="classes.wrapper">
    <ul :class="classes.qaList">
      <template v-for="({ title, content }, index) in faqData" :key="index">
        <li :class="classes.qaItem">
          <div :class="classes.qaQuestion">
            {{ title }}
            <button @click="toggleContent(index)">
              <img v-if="!showContent[index]" :src="downButton" />
              <img v-else :src="upButton" />
            </button>
          </div>
          <div v-if="showContent[index]" :class="classes.qaAnswer">
            {{ content }}
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import faqData from './faqData';
import upButton from '@/assets/images/angle-small-up.svg';
import downButton from '@/assets/images/angle-small-down.svg';

const showContent = ref([]);

const toggleContent = (index) => {
  showContent.value[index] = !showContent.value[index];
};
</script>

<style module="classes" scoped>
@import './FAQView.css';
</style>
