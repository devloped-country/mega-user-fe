<template>
  <section :class="classes.wrapper">
    <Reader />
  </section>
</template>

<script setup>
import Reader from '@/components/QR/Reader.vue';
</script>

<style module="classes" scoped>
@import './QrView.css';
</style>
