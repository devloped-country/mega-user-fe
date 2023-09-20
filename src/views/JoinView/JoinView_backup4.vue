<template>
  <label for="email">이메일 주소:</label><br>
  <input type="email" id="email" name="email" v-model="email" @input="validateEmail" placeholder="이메일 *">
  <button @click="emailCheck">중복 확인</button><br>
  <div v-if="!isEmailValid">이메일을 형식에 맞게 입력해 주세요</div>
  <div v-if="!email">이메일을 입력하세요</div>
  <br><br>

  <label for="password">비밀번호:</label><br>
  <input type="password" id="password" name="password" required placeholder="비밀번호 *">
  <div v-if="!password">비밀번호를 입력하세요</div>
  <br><br>

  <label for="confirmPassword">비밀번호 확인:</label><br>
  <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="비밀번호 확인 *">
  <div v-if="!confirmPassword">비밀번호 확인을 눌러주세요</div>
  <br><br>

  <label for="name">이름:</label><br>
  <input type="text" id="name_" name="name" required placeholder="이름 *">
  <div v-if="!name">이름을 입력하세요</div>
  <br><br>

  <label for="phone">휴대폰 번호:</label><br>
  <input type="tel" id="phone" name="phone" required placeholder="휴대폰번호*">
  <div v-if="!phone">휴대폰 번호를 입력하세요</div>
  <br><br>

  <button @click="registerUser">[회원 가입]</button>
  <button>취소</button>

  <div v-if="showSuccessModal">
  <div>
    [모달창임]
    사용 가능한 email입니다.
    <button @click="showSuccessModal = false">확인</button>
  </div>
  </div>

  <div v-if="showFailModal">
  <div>
    [모달창임]
    중복된 email입니다. 다른 email을 사용하세요.
    <button @click="showFailModal = false">확인</button>
  </div>
  </div>

</template>

<script setup>
import { useMutation } from '@/composables';
import { ref } from 'vue';
// const showSuccessModal = ref(false);
// const showFailModal = ref(false);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const phone = ref('');
const isEmailValid = ref(true);

const validateEmail = () => {
  if (email.value === '') {
    isEmailValid.value = true; // 입력값이 없으면 메시지를 숨깁니다.
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isEmailValid.value = emailRegex.test(email.value);
};

</script>






<script>

import { ref } from 'vue';
const showSuccessModal = ref(false);
const showFailModal = ref(false);

import { useMutation } from '@/composables';

const { mutate: mutateRegister } = useMutation('/join', {
  method: 'post'
});

const { mutate: mutateEmailCheck, data: resultData } = useMutation('/userCheck', {
  method: 'post',
  onSuccess: (res) => {
    // console.log('API 호출 성공:', res);
    // console.log('Result Data:', resultData.value);
    console.log(res.data);
    if(res.data === 'OK') {
      showSuccessModal.value = true;
    } else {
      showFailModal.value = true;
    }
  }
});

const emailCheck = () => {
  const param = {
    email: email.value
  }

  console.log(param);
  mutateEmailCheck(param);
}



const registerUser = () => {
  const param = {

    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: name_.value,
    phone: phone.value
  };
  console.log(param);
  mutateRegister(param);
};
</script>

<!-- <style module="classes" scoped>
@import './JoinView.css';
</style> -->