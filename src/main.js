import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import VueCryptojs from 'vue-cryptojs';
import { createPinia } from 'pinia';
import { VueSpinnersPlugin } from 'vue3-spinners';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(VueCryptojs)
  .use(router)
  .use(VueSpinnersPlugin)
  .mount('#app');
