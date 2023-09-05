import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useExampleStore = defineStore('example', () => {
  const isShowing = ref(true);

  function showLayout() {
    isShowing.value = true;
  }

  function hideLayout() {
    isShowing.value = false;
  }

  return { isShowing, showLayout, hideLayout };
});
