<template>
  <Teleport to="#modal">
    <section :class="classes.backdrop">
      <div :class="classes.wrapper">
        <h1 :class="classes.title">{{ title }}</h1>
        <p :class="classes.content">{{ content }}</p>
        <slot />
      </div>
    </section>
  </Teleport>
</template>

<script setup>
defineProps({
  title: { type: String },
  content: { type: String },
});
</script>

<style module="classes" scoped>
@import './Modal.css';
</style>
