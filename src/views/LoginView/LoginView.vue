<template>
  <section :class="classes.wrapper">
    <header :class="classes.header">
      <img :src="logo" alt="로고" />
      <h1 :class="classes.title">Mega</h1>
    </header>
    <main :class="classes.main">
      <form @submit.prevent="" :class="classes.form">
        <input
          type="email"
          :class="classes.input"
          placeholder="이메일"
          v-model="auth.email"
        />
        <input
          type="password"
          :class="classes.input"
          placeholder="비밀번호"
          v-model="auth.password"
        />
        <p v-show="isShowingValidateMessage" :class="classes.validateMessage">
          {{ validateMessage }}
        </p>
      </form>
    </main>
    <footer :class="classes.footer">
      <button
        type="button"
        :class="[classes.btn, classes.login]"
        @click="handleLoginBtnClick"
      >
        로그인
      </button>
      <button
        type="button"
        :class="[classes.btn, classes.join]"
        @click="handleJoinBtnClick"
      >
        회원가입
      </button>
    </footer>
  </section>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
import { ref, inject, onMounted } from 'vue';
import { useMutation } from '@/composables';
import { useRouter } from 'vue-router';
import { Crypto } from '@/util/crypto';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';

const router = useRouter();
const isLoginLoading = ref(false);
const cryptojs = inject('cryptojs');
const isShowingValidateMessage = ref(false);
const validateMessage = ref('');
const auth = ref({
  email: '',
  password: '',
});

// const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
//   '/login',
//   {
//     method: 'post',
//     onSuccess: ({ data }) => {
//       localStorage.setItem('access', data.accessToken);
//       localStorage.setItem('refresh', data.refreshToken);
//       router.push({ name: 'HomeView' });
//     },
//     onError: () => {
//       isShowingValidateMessage.value = true;
//       validateMessage.value = '이메일 또는 비밀번호가 틀렸어요.';
//     },
//   }
// );

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
};
console.log(import.meta.env.VITE_API2);
const handleLoginBtnClick = () => {
  if (isLoginLoading.value) {
    return;
  }

  isLoginLoading.value = true;

  if (!validateEmail(auth.value.email)) {
    isShowingValidateMessage.value = true;
    validateMessage.value = '이메일 형식이 맞지 않아요.';
    return;
  }

  axios
    .post(`${import.meta.env.VITE_API1}login`, {
      email: auth.value.email,
      password: sha256(auth.value.password).toString(),
    })
    .then(({ data }) => {
      localStorage.setItem('access', data.accessToken);
      localStorage.setItem('refresh', data.refreshToken);
      router.push({ name: 'HomeView' });
    })
    .catch((err) => {
      isShowingValidateMessage.value = true;

      if (err.response.status === 403) {
        validateMessage.value = '관리자의 가입승인을 기다려주세요.';
        return;
      }

      validateMessage.value = '이메일 또는 비밀번호가 틀렸어요.';
    })
    .finally(() => {
      isLoginLoading.value = false;
    });
};

const handleJoinBtnClick = () => {
  router.push({ name: 'JoinView' });
};

onMounted(() => {
  if (localStorage.getItem('access') || localStorage.getItem('refresh')) {
    router.push({ name: 'HomeView' });
  }
});
</script>

<style module="classes" scoped>
@import './LoginView.css';
</style>
