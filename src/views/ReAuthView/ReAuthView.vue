<template>
  <Result
    title="재인증 오류"
    desc="재인증은 불가합니다."
    :img="reAuthImg"
    route="HomeView"
  />
  {{ $route.query.longitude }}
  {{ $route.query.latitude }}
</template>

<script setup>
import reAuthImg from '@/assets/images/reauth.svg';
import Result from '@/components/Result/Result.vue';
</script>

<style module="classes" scoped></style>
