<template>
  <div>
    <div>
      <div>
        <p>{{ noticeDTO.tag_id }}</p>
        <a>|</a>
        <p>{{ noticeDTO.title }}</p>
      </div>
      <div>
        <p>{{ noticeDTO.author }}</p>
        <p>{{ noticeDTO.createdDate }}</p>
      </div>
    </div>
    <div>
      <p>{{ noticeDTO.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
import { useFetch, useFetchs, useMutation } from "@/composables";

const router = useRouter();

const { data: noticeDTO, fetchData } = useFetch("/notice", {
  method: "get",
  onSucess: (res) => {
    console.log("통신 성공!");
    console.log(res);
  },
  onError: (res) => {
    console.log("통신 실패!");
    console.log(res);
  },
});

onMounted(() => {
  fetchData();
});
</script>

<style>
/* @import "./NoticeDetail.css"; */
</style>
