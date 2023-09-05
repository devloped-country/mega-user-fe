import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import VueCryptojs from 'vue-cryptojs';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App).use(pinia).use(VueCryptojs).use(router).mount('#app');
