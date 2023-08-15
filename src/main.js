import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import VueCryptojs from 'vue-cryptojs';

createApp(App).use(VueCryptojs).use(router).mount('#app');
