<template>
  <div class="body-wrapper">
    <table class="table">
      <thead class="table-head">
        <tr>
          <th class="table-tag">태그</th>
          <th class="table-title">제목</th>
          <th class="table-date">작성일자</th>
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
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useFetch, useFetchs, useMutation } from '@/composables';

const router = useRouter();

const { data: noticeList, fetchData } = useFetch('/notice', {
  method: 'get',
});

onMounted(() => {
  fetchData();
});

const moveToPage = (id) => {
  router.push({
    name: '_idView',
    params: {
      id: id,
    },
  });
};
</script>

<style>
@import './Notice.css';
</style>
