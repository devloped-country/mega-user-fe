<template>
  <qrcode-stream @detect="onDetect" class="qr" @camera-on="onCameraOn">
    <div class="loadingIndicator" v-if="loading" />
    <header class="qrHeader" />
    <section class="backdrop">
      <div class="header" />
      <div class="leftSide" />
      <div class="main" />
      <div class="rightSide" />
      <div class="footer" />
    </section>
    <footer class="qrFooter">
      <h2 class="qrTitle" v-if="!loading">QR 코드 찍고 출석하세요!</h2>
      <p class="qrDesc" v-if="!loading">
        강사님이 알려주신 QR코드를 인식해주세요.
      </p>
    </footer>
  </qrcode-stream>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { QrcodeStream } from 'vue-qrcode-reader';
import { ref, onMounted } from 'vue';
import { useFetch } from '@/composables';
import VueJwtDecode from 'vue-jwt-decode';
import { apiClient } from '@/api/api';

const router = useRouter();
const loading = ref(true);
const latitude = ref();
const longitude = ref();
const url = ref('');
const isShowing = ref(false);
const token = ref(VueJwtDecode.decode(localStorage.getItem('access')));

// const { data, fetchData } = useFetch('', {
//   headers: {
//     email: token.value.jti,
//   },
//   onSuccess: (res) => {
//     router.push({
//       name: 'SuccessView',
//     });
//   },
//   onError: (err) => {
//     const status = parseInt(err.response.data.status);

//     if (status === -1) {
//       router.push({
//         name: 'FailView',
//       });
//     } else if (status === -2) {
//       router.push({
//         name: 'ReAuthView',
//       });
//     }
//   },
// });

const onDetect = (detectedCodes) => {
  if (calcUserPosition()) {
    console.log('!!!');
    return;
  }
  console.log('!');
  const [qrCode] = detectedCodes;
  url.value = qrCode.rawValue;
  const [_, qr] = url.value.split('=');

  apiClient({
    mothod: 'post',
    url: '/qr/auth?qr='.concat(qr),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
    params: {
      email: token.value.jti,
    },
  })
    .then(() => {
      router.push({
        name: 'SuccessView',
      });
    })
    .catch((err) => {
      console.log(err);
      const status = parseInt(err.response.data.status);

      if (status === -1) {
        router.push({
          name: 'FailView',
        });
      } else if (status === -2) {
        router.push({
          name: 'ReAuthView',
        });
      }
    });
};

const onCameraOn = () => {
  loading.value = false;
};

onMounted(() => {
  isShowing.value = true;
  getLocation();
});

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
};

const showPosition = (position) => {
  // latitude.value = position.coords.latitude;
  // longitude.value = position.coords.longitude;
  latitude.value = 35.1678779;
  longitude.value = 129.1231357;
};

const calcUserPosition = () => {
  console.log(latitude.value, longitude.value);
  if (
    (latitude.value < 35.172593 || latitude.value > 35.173093) &&
    (longitude.value < 129.1303 || longitude > 129.1311)
  ) {
    console.log('!!');
    router.push({
      name: 'PositionAuthView',
    });

    return true;
  }
};
</script>

<style>
@import './Reader.css';
</style>
