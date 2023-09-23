<template>
  <div class="body-wrapper">
    <table class="table">
      <thead class="table-head">
        <tr>
          <th class="table-tag">태그</th>
          <th class="table-title">제목</th>
          <th class="tabe-date">작성일자</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          :key="notice.id"
          v-for="notice in noticeList"
          @click="moveToPage(notice.id)"
        >
          <td class="table-tag">{{ notice.tag_id }}</td>
          <td class="table-title">{{ notice.title }}</td>
          <td class="table-date">
            <div>
              {{ notice.author }}
            </div>
            <div class="table-created-date">
              {{ notice.createdDate }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
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

// console.log(noticeList);

onMounted(() => {
  fetchData();
});

const moveToPage = (id) => {
  console.log(id);
  router.push({
    name: "_idView",
    params: {
      id: id,
    },
  });
};
</script>

<style>
@import "./Notice.css";
</style>
