<template>
  <table>
    <thead>
      <tr>
        <th>태그</th>
        <th>제목</th>
        <th>작성일자</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :key="notice.createdDate"
        v-for="notice in noticeList"
        v-on:click="NoticeDetail"
      >
        <input type="hidden" name="id" value="${{ notice.id }}" />
        <input type="hidden" name="content" value="${{ notice.content }}" />
        <td>{{ notice.tag_id }}</td>
        <td>{{ notice.title }}</td>
        <td>
          {{ notice.author }} <br />
          {{ notice.createdDate }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUpdated } from "vue";
import { useFetch, useFetchs, useMutation } from "@/composables";

const router = useRouter();

const { data: noticeList, fetchData } = useFetch("/notice", {
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

console.log(noticeList);

onMounted(() => {
  fetchData();
});

const NoticeDetail = () => {
  router.push({ name: "NoticeDetailView" });
};

onUpdated(() => {
  console.log(curriculumData.value[0]);
});
</script>

<style>
/* @import "./Notice.css"; */
</style>
