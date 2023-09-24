<template>
  <div class="body-wrapper" v-if="data">
    <div class="title-bar">
      <div class="top-bar-row-1">
        <div class="top-bar-tag">
          <p v-if="data.tag_id == 1">훈련비</p>
          <p v-if="data.tag_id == 2">시험</p>
          <p v-if="data.tag_id == 3">BIPA행사관련</p>
          <p v-if="data.tag_id == 4">BIPA전달사항</p>
          <p v-if="data.tag_id == 5">BIPA채용공지</p>
          <p v-if="data.tag_id == 6">세미나</p>
          <p v-if="data.tag_id == 7">긴급</p>
          <p v-if="data.tag_id == 8">기타</p>
        </div>
        <p class="top-bar-title">{{ data.title }}</p>
      </div>
      <div class="top-bar-row-2">
        <p class="top-bar-author">{{ data.author }}</p>
        <p class="top-bar-date">{{ data.createdDate }}</p>
      </div>
    </div>
    <div class="notice-content">
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, onUpdated } from 'vue';
import { useFetch, useFetchs, useMutation } from '@/composables';

const route = useRoute();
const router = useRouter();


const { data, fetchData } = useFetch('/notice/' + route.params.id, {
  method: 'get',
});

const goNotice = () => {
  router.push({
    name: 'NoticeView',
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style>
@import './Notice.css';
</style>
