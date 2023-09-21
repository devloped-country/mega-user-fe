<template>
  <div class="notice-header">
    <img
      class="go-notice-button"
      src="../../assets/images/angle-small-left.svg"
      alt="공지사항 목록으로 돌아가기"
      @click="goNotice()"
    />
    <h2>공지사항</h2>
  </div>
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
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
import { useFetch, useFetchs, useMutation } from "@/composables";

const route = useRoute();
const router = useRouter();

console.log(route.params.id);

const { data, fetchData } = useFetch("/noticeDetail", {
  method: "get",
  headers: {
    id: route.params.id,
  },
  onSucess: (res) => {
    console.log("통신 성공!");
    console.log(res);
  },
  onError: (res) => {
    console.log("통신 실패!");
    console.log(res);
  },
});

console.log(data);

const goNotice = () => {
  router.push({
    name: "NoticeView",
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style>
@import "./Notice.css";
</style>
