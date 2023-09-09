<template>
  <Modal :title="title">
    <div>여기서 모달마다 다른 기능을 구현하여 slot으로 넘겨줘요.</div>
  </Modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch, useFetchs, useMutation } from '@/composables';
import Modal from '@/teleport/Modal/Modal.vue';

const id = ref('');
const pw = ref('');
const title = ref('여기서는 모달의 공통 스타일을 정의해요.');
const router = useRouter();

const { data: noticeData, fetchData: fetchNotice } = useFetch('/notice', {
  method: 'get',
  onSuccess: (res) => {
    console.log('통신 성공!');
    console.log(res);
  },
  onError: (res) => {
    console.log('통신 실패!');
    console.log(res);
  },
});

const { data: noticesData, fetchData: fetchNotices } = useFetchs(
  ['/notice', '/notice', '/notice'],
  {
    onSuccess: (res) => {
      console.log('통신 성공!');
      console.log(res);
    },
    onError: (res) => {
      console.log('통신 실패!');
      console.log(res);
    },
  }
);

const { mutate } = useMutation('/notice', {
  method: 'post',
  onSuccess: (res) => {
    console.log('통신 성공!');
    console.log(res);
  },
  onError: (res) => {
    console.log('통신 실패!');
    console.log(res);
  },
});

onMounted(() => {
  fetchNotice();
  fetchNotices();
  // mutate({ id, pw });
});
</script>

<style module="classes">
/* @import './HomeView.css'; */
</style>
