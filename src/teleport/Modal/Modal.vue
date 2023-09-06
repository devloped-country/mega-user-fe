<template>
  <Teleport to="#modal">
    <section :class="classes.backdrop">
      <div :class="classes.wrapper">
        <h1>{{ title }}</h1>
        <slot />
      </div>
    </section>
  </Teleport>
</template>

<script setup>
defineProps({
  title: { type: String },
});
</script>

<style module="classes" scoped>
@import './Modal.css';
</style>
