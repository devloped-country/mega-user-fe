<template>
  <div>

    <template v-for="(data, index) in faqData" :key="index">
      <div>
        {{ data.title }}
        <button @click="toggleContent(index)">
          <img v-if="!showContent[index]" :src="downButton">
          <img v-else :src="upButton">
        </button>
      </div>
      <div v-if="showContent[index]">
        {{ data.content }}
      </div>
    </template>
        
  </div>
</template>

<script setup>
import { ref } from 'vue';
import faqData from './FAQData';
import upButton from '@/assets/images/angle-small-up.svg'
import downButton from '@/assets/images/angle-small-down.svg'

const showContent = ref([]);

const toggleContent = (index) => {
  showContent.value[index] = !showContent.value[index];
}

</script>

<style scoped>

</style>