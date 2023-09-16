<template>
  <Result
    title="인증 완료!"
    desc="오늘도 열심히 공부해요!"
    :img="successImg"
    route="HomeView"
  />
</template>

<script setup>
import successImg from '@/assets/images/success.svg';
import Result from '@/components/Result/Result.vue';
</script>

<style module="classes" scoped></style>
