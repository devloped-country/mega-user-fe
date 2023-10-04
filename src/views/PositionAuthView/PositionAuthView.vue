<template>
  <Result
    title="위치 인증 실패"
    desc="강의장에서 인증해주세요."
    :img="positionAuth"
    route="HomeView"
  />
</template>

<script setup>
import positionAuth from '@/assets/images/positionauth.svg';
import Result from '@/components/Result/Result.vue';
</script>

<style module="classes" scoped></style>
