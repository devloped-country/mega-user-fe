<template></template>

<script setup>
import { useRouter } from 'vue-router';
import { useAxioses } from '../../composables/axioses';

const router = useRouter();

const { data } = useAxioses([
  {
    method: 'get',
    url: '/notice',
  },
  {
    method: 'get',
    url: '/notice',
  },
  {
    method: 'get',
    url: '/notice',
  },
]);

console.log(data);
</script>

<style module="classes">
/* @import './HomeView.css'; */
</style>
