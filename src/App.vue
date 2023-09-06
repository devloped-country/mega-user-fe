<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script setup>
import Header from '@/layout/Header/Header.vue';
import Footer from '@/layout/Footer/Footer.vue';
</script>

<style>
@import '@/assets/css/reset.css';
@import '@/assets/css/theme.css';
@import '@/assets/css/fonts.css';
</style>
