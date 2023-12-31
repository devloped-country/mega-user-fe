<template>
  <section :class="classes.wrapper">
    <div :class="classes.info">회원 정보를 입력해 주세요</div>

    <div :class="classes.inputContainer">
      <div :class="classes.emailContainer">
        <input
          :class="classes.inputEmail"
          type="email"
          id="email"
          name="email"
          v-model="email"
          @input="validateEmail"
          required
          placeholder="이메일 *"
        />
        <button :class="classes['emailCheck-button']" @click="emailCheck" type="button">
          중복 확인
        </button>
      </div>
      <div :class="classes.red" v-if="!isEmailValid">
        이메일을 형식에 맞게 입력해 주세요
      </div>
      <div :class="classes.red" v-if="!email">이메일을 입력하세요</div>

      <input
        :class="classes.input"
        type="password"
        id="password"
        name="password"
        v-model="password"
        @input="validatePassword"
        required
        placeholder="비밀번호 *"
      />
      <div :class="classes.red" v-if="!isPasswordValid">
        비밀번호: 8~16자의 영문 대/소문자, <br />
        숫자, 특수문자를 사용해 주세요.
      </div>
      <div :class="classes.red" v-if="!password">비밀번호를 입력하세요</div>

      <input
        :class="classes.input"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        v-model="confirmPassword"
        @input="checkPasswordMatch"
        required
        placeholder="비밀번호 확인 *"
      />
      <div :class="classes.red" v-if="!isPasswordMatch">
        비밀번호가 일치하지 않아요
      </div>
      <div :class="classes.red" v-if="!confirmPassword">
        비밀번호 확인을 입력하세요
      </div>

      <input
        :class="classes.input"
        type="text"
        id="name_"
        name="name"
        v-model="name"
        required
        placeholder="이름 *"
      />
      <div :class="classes.red" v-if="!name">이름을 입력하세요</div>

      <input
        :class="classes.input"
        type="tel"
        id="phone"
        name="phone"
        v-model="phone"
        @input="validatePhone"
        required
        placeholder="휴대폰번호*"
      />
      <div :class="classes.red" v-if="!isPhoneValid">
        휴대폰 번호를 확인하세요
      </div>
      <div :class="classes.red" v-if="!phone">휴대폰 번호를 입력하세요</div>
    </div>

    <button :class="classes['register-button']" @click="registerUser">
      회원 가입
    </button>
    <button :class="classes['cancel-button']" @click="goToMainPage">
      취소
    </button>
  </section>

  <div v-if="showSuccessModal">
    <Modal title="가능" content="사용 가능한 이메일입니다.">
      <button 
        :class="classes['ok-button']"
        @click="showSuccessModal = false"
      >
        확인
      </button>
    </Modal>
  </div>

  <div v-if="showFailModal">
    <Modal title="입력 오류" content="중복된 이메일입니다. 다른 이메일을 사용하세요." >
      <button 
       :class="classes['ok-button']"
        @click="showFailModal = false"
      >
        확인
      </button>
    </Modal>
  </div>

  <div v-if="showMissingInputModal">
    <Modal title="입력 오류" content="입력이 누락된 값이 있습니다.">
      <button
        :class="classes['ok-button']"
        @click="showMissingInputModal = false"
      >
        확인
      </button>
    </Modal>
  </div>

  <div v-if="showInvalidInputModal">
    <Modal title="입력 오류" content="입력값을 확인하세요.">
      <button 
        :class="classes['ok-button']"
        @click="showInvalidInputModal = false"
      >
        확인
      </button>
    </Modal>
  </div>

  <div v-if="showJoinSuccessModal">
    <Modal title="성공" content="회원가입이 완료되었습니다.">
      <button 
        :class="classes['ok-button']"
        @click="() => {
          router.push('/');
          showJoinSuccessModal = false;
        }"
      >
        확인
      </button>
    </Modal>
  </div>
</template>

<script setup>
// import { useMutation } from '@/composables';
import { ref } from 'vue';
import Modal from '@/teleport/Modal/Modal.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

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

const isEmailChecked = ref(false);

// 모달용
const showSuccessModal = ref(false);
const showFailModal = ref(false);
const showMissingInputModal = ref(false);
const showInvalidInputModal = ref(false);
const showJoinSuccessModal = ref(false);

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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,16}$/;
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

// 비밀번호 일치 여부 검사함.
const checkPasswordMatch = () => {
  if (!(confirmPassword.value == null)) {
    isPasswordMatch.value = password.value === confirmPassword.value;
  }
};

// 이메일 중복 검사 관련
// const { mutate: mutateEmailCheck } = useMutation('/userCheck', {
//   method: 'post',
//   onSuccess: (res) => {
    // if (res.data === 'OK') {
    //   showSuccessModal.value = true;
    // } else {
    //   showFailModal.value = true;
    //   isEmailChecked.value = false;
    // }
  // },
// });

const emailCheck = () => {
  if (email.value === '') {
    return;
  }

  if (isEmailValid.value) {
    const param = {
      email: email.value,
    };
    // mutateEmailCheck(param);
    axios.post('https://api.megamega-app.com/userCheck', param).then((res) => {
      if (res.data === 'OK') {
      showSuccessModal.value = true;
    } else {
      showFailModal.value = true;
      isEmailChecked.value = false;
    }
    })
    isEmailChecked.value = true;
  }
};

// // 회원 가입 관련
// const { mutate: mutateRegister } = useMutation('/join', {
//   method: 'post',
// });

const registerUser = () => {
  if (
    !email.value ||
    !password.value ||
    !confirmPassword.value ||
    !name.value ||
    !phone.value
  ) {
    // 필수 입력 값이 누락되었다면 모달을 띄움
    showMissingInputModal.value = true;
    return;
  }
  if (
    !isEmailValid.value ||
    !isPasswordValid.value ||
    !isPasswordMatch.value ||
    !isPhoneValid.value
  ) {
    // 유효하지 않은 입력값이 있으면 모달을 띄움
    showInvalidInputModal.value = true;
    return;
  }

  if (!isEmailChecked.value) {
    return;
  }

  const param = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: name.value,
    phone: phone.value,
  };
  // mutateRegister(param);

  // axios.post('https://api.megamega-app.com/join', param).then(() => {
  //   router.push('/');
  // });

  axios.post('https://api.megamega-app.com/join', param).then((res) => {

    if (res.data === 'OK') {
      showJoinSuccessModal.value = true;
    }
  });

};

const goToMainPage = () => {
  router.push('/');
};
</script>

<style module="classes" scoped>
@import './JoinView.css';
</style>
