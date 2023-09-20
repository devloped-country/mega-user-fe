<template>
  <label for="email">이메일 주소:</label><br>
  <input type="email" id="email" name="email" v-model="email" @input="validateEmail" required placeholder="이메일 *">
  <button @click="emailCheck">중복 확인</button><br>
  <div v-if="!isEmailValid">이메일을 형식에 맞게 입력해 주세요</div>
  <div v-if="!email">이메일을 입력하세요</div>
  <br><br>

  <label for="password">비밀번호:</label><br>
  <input type="password" id="password" name="password" v-model="password" @input="validatePassword" required
    placeholder="비밀번호 *">
  <div v-if="!isPasswordValid">비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</div>
  <div v-if="!password">비밀번호를 입력하세요</div>
  <br><br>

  <label for="confirmPassword">비밀번호 확인:</label><br>
  <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" @input="checkPasswordMatch"
    required placeholder="비밀번호 확인 *">
  <div v-if="!isPasswordMatch">비밀번호가 일치하지 않아요</div>
  <div v-if="!confirmPassword">비밀번호 확인을 입력하세요</div>
  <br><br>

  <label for="name">이름:</label><br>
  <input type="text" id="name_" name="name" v-model="name" required placeholder="이름 *">
  <div v-if="!name">이름을 입력하세요</div>
  <br><br>

  <label for="phone">휴대폰 번호:</label><br>
  <input type="tel" id="phone" name="phone" v-model="phone" @input="validatePhone" required placeholder="휴대폰번호*">
  <div v-if="!isPhoneValid">휴대폰 번호를 확인하세요</div>
  <div v-if="!phone">휴대폰 번호를 입력하세요</div>
  <br><br>

  <button @click="registerUser">[회원 가입]</button>
  <button>취소</button>


  <div v-if="showSuccessModal">
    <!-- <div>
      [모달창임]
      사용 가능한 email입니다.
      <button @click="showSuccessModal = false">확인</button>
    </div> -->
    <Modal title="사용 가능한 email입니다.">
      <button @click="showSuccessModal = false">확인</button>
    </Modal>
  </div>

  <div v-if="showFailModal">
    <!-- <div>
      [모달창임]
      중복된 email입니다. 다른 email을 사용하세요.
      <button @click="showFailModal = false">확인</button>
    </div> -->
    <Modal title="중복된 email입니다. 다른 email을 사용하세요.">
      <button @click="showFailModal = false">확인</button>
    </Modal>
  </div>

  <!-- <Modal title="입력이 누락된 값이 있습니다.">
  <div v-if="showMissingInputModal">
    <div>
      [모달창임]
      입력이 누락된 값이 있습니다.
      <button @click="showMissingInputModal = false">확인</button>
    </div>
  </div>
</Modal> -->

  <div v-if="showMissingInputModal">
    <Modal title="입력이 누락된 값이 있습니다.">
      <button @click="showMissingInputModal = false">확인</button>
    </Modal>
  </div>
</template>

<script setup>
import { useMutation } from '@/composables';
import { ref } from 'vue';
import Modal from '@/teleport/Modal/Modal.vue';

// 데이터용
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const phone = ref('');

// 검증용
const isEmailValid = ref(true);
const isPasswordValid = ref(true);
const isPasswordMatch = ref(true);
const isPhoneValid = ref(true);

// 모달용
const showSuccessModal = ref(false);
const showFailModal = ref(false);
const showMissingInputModal = ref(false);

// 이메일 검증
const validateEmail = () => {
  if (email.value === '') {
    isEmailValid.value = true;
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isEmailValid.value = emailRegex.test(email.value);
};

// 비밀번호 유효성 검사
const validatePassword = () => {
  if (password.value === '') {
    isPasswordValid.value = true;
    return;
  }
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,16}$/;
  isPasswordValid.value = passwordRegex.test(password.value);
};

// 휴대폰 번호 유효성 검사
const validatePhone = () => {
  if (phone.value === '') {
    isPhoneValid.value = true;
    return;
  }
  // 대한민국 휴대폰 번호 포맷(010으로 시작, 총 11자리)
  const phoneRegex = /^010[0-9]{8}$/;
  isPhoneValid.value = phoneRegex.test(phone.value);
};

// 비밀번호 일치 여부 검사 함수
const checkPasswordMatch = () => {
  isPasswordMatch.value = password.value === confirmPassword.value;
};

// 이메일 중복 검사
const { mutate: mutateEmailCheck } = useMutation('/userCheck', {
  method: 'post',
  onSuccess: (res) => {
    if (res.data === 'OK') {
      showSuccessModal.value = true;
    } else {
      showFailModal.value = true;
    }
  }
});

const emailCheck = () => {
  const param = {
    email: email.value
  };
  mutateEmailCheck(param);
};

// 회원 가입
const { mutate: mutateRegister } = useMutation('/join', {
  method: 'post'
});

const registerUser = () => {
  if (!email.value || !password.value || !confirmPassword.value || !name.value || !phone.value) {
    // 필수 입력 값이 누락되었다면 모달을 띄움
    showMissingInputModal.value = true;
    return;
  }

  const param = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: name.value,
    phone: phone.value
  };
  mutateRegister(param);
};
</script>

<!-- <style module="classes" scoped>
@import './JoinView.css';
</style> -->