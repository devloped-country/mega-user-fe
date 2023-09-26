<template>
  <Result
    title="인증 실패"
    desc="다시 QR 코드를 찍어주세요."
    :img="failImg"
    route="HomeView"
  />
  {{ $route.query.longitude }}
  {{ $route.query.latitude }}
</template>

<script setup>
import failImg from '@/assets/images/fail.svg';
import Result from '@/components/Result/Result.vue';
</script>

<style module="classes" scoped></style>
