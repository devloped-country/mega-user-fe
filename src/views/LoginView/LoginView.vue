<template>
  <section :class="classes.wrapper">
    <header :class="classes.header">
      <img :src="logo" alt="로고" />
      <h1 :class="classes.title">Mega</h1>
    </header>
    <main :class="classes.main">
      <input type="text" :class="classes.input" placeholder="아이디" />
      <input type="password" :class="classes.input" placeholder="비밀번호" />
      <p :class="classes.validateMessage">아이디 또는 비밀번호가 틀렸어요.</p>
    </main>
    <footer :class="classes.footer">
      <button type="button" :class="[classes.btn, classes.login]">
        로그인
      </button>
      <button type="button" :class="[classes.btn, classes.join]">
        회원가입
      </button>
    </footer>
  </section>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
</script>

<style module="classes" scoped>
@import './LoginView.css';
</style>
