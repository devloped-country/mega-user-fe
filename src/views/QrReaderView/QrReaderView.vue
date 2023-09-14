<template>
  <section :class="classes.wrapper">
    <Reader />
  </section>
</template>

<script setup>
import Reader from '@/components/Qr/Reader.vue';
</script>

<style module="classes" scoped>
@import './QrReaderView.css';
</style>
