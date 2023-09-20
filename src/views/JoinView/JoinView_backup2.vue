<template>
  <label for="email">이메일 주소:</label><br>
  <input type="email" id="email" name="email" v-model="email" @input="validateEmail" placeholder="이메일 *"><button>중복 확인</button><br>
  <div v-if="!isEmailValid">이메일을 형식에 맞게 입력해 주세요</div>
  <div v-if="!email">이메일을 입력하세요</div>
  <br><br>

  <label for="password">비밀번호:</label><br>
  <input type="password" id="password" name="password" v-model="password" @input="validatePassword" placeholder="비밀번호 *"><br>
  <div v-if="!isPasswordValid">비밀번호 : 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요</div>
  <div v-if="!password">비밀번호를 입력하세요</div>
  <br><br>

  <label for="confirmPassword">비밀번호 확인:</label><br>
  <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="비밀번호 확인 *">
  <div v-if="!confirmPassword">비밀번호 확인를 입력해 주세요</div>
  <div v-if="!isConfirmPasswordValid">비밀번호가 일치하지 않습니다.</div>
  <br><br>

  <label for="name">이름:</label><br>
  <input type="text" id="name_" name="name" required placeholder="이름 *">
  <div v-if="!name">이름을 입력하세요</div>
  <br><br>

  <label for="phone">휴대폰 번호:</label><br>
  <input type="tel" id="phone" name="phone" v-model="phone" @input="validatePhone" placeholder="휴대폰번호 *"><br>
  <div v-if="!isPhoneValid && phone.length > 0">올바른 휴대폰 번호를 입력해 주세요</div>
  <div v-if="!phone">휴대폰 번호를 입력하세요</div>
  <br><br>

  <button @click="registerUser">[회원 가입]</button>
  <button>취소</button>
</template>

<script setup>
import { useMutation } from '@/composables';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const phone = ref('');
const isEmailValid = ref(true);
const isPasswordValid = ref(true);
const isPhoneValid = ref(true);
const isConfirmPasswordValid = ref(true);

const validateConfirmPassword = () => {
  if (password != confirmPassword ) {
    isConfirmPasswordValid = false
  }
}

const validatePhoe = () => {
  const phoneRegex = /^01(?:0|1|[6-9])(?:\d{7,8})$/;
  isPhoneValid.value = phoneRegex.test(phone.value);
}

const validateEmail = () => {
  if (email.value === '') {
    isEmailValid.value = true;
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isEmailValid.value = emailRegex.test(email.value);
};

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  isPasswordValid.value = passwordRegex.test(password.value);
}

</script>






<script>
import { useMutation } from '@/composables';

const { mutate } = useMutation('/join', {
  method: 'post'
});



const registerUser = () => {
  const param = {

    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: name_.value,
    phone: phone.value
  };
  console.log(param);
  mutate(param);
};
</script>

<!-- <style module="classes" scoped>
@import './JoinView.css';
</style> -->