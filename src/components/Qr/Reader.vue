<template>
  <qrcode-stream @detect="onDetect" class="qr" @camera-on="onCameraOn">
    <div class="loadingIndicator" v-if="loading" />
    <header class="qrHeader">
      <h2 class="qrTitle" v-if="!loading">QR 코드 찍고 출석하세요!</h2>
    </header>
    <section class="backdrop">
      <div class="header" />
      <div class="leftSide" />
      <div class="main" />
      <div class="rightSide" />
      <div class="footer" />
    </section>
    <footer class="qrFooter">
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

const router = useRouter();
const loading = ref(true);
const latitude = ref();
const longitude = ref();
const url = ref('');

const { data, fetchData } = useFetch('', {
  headers: {
    email: 'ub@naver.com',
  },
  onSuccess: (res) => {
    router.push({
      name: 'SuccessView',
    });
  },
  onError: (err) => {
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
  },
});

const onDetect = (detectedCodes) => {
  const [qrCode] = detectedCodes;
  url.value = qrCode.rawValue;
  const [_, qr] = url.value.split('=');
  fetchData('/qr/auth?qr='.concat(qr));
  // qrCode.rawValue가 내가 보낸 url이면
  // message.value = firstCode.rawValue;
  // 해당 url로 post 요청을 id와 pw를 담아서 보낸다.
  // 요청이 성공하면 router로 성공 페이지(출석이 완료되었습니다?)로 보낸다.
};

const onCameraOn = () => {
  loading.value = false;
};

onMounted(() => {
  getLocation();
});

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
};

const showPosition = (position) => {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;

  console.log(latitude, longitude);
};
</script>

<style>
@import './Reader.css';
</style>
