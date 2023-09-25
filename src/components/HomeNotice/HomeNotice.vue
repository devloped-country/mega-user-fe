<template>
  <section :class="classes.wrapper">
    <h2 :class="classes.title">공지사항</h2>
    <div v-if="isNoticeLoading" :class="classes.noticeLoadingWrapper">
      <VueSpinner size="40" />
    </div>
    <ul v-else :class="classes.list">
      <li
        :class="classes.item"
        v-for="notice in noticeData"
        :key="notice.id"
        @click="() => handleNoticeItemClick(notice.id)"
      >
        <h3 :class="classes.itemTitle">
          [{{ notice.tag }}] {{ notice.title }}
        </h3>
        <div :class="classes.itemRight">
          <p :class="classes.author">{{ notice.author }}</p>
          <p :class="classes.date">
            {{ DateFormat.formatYYYYMMDD(notice.createdDate) }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { DateFormat } from '@/util/format';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
  noticeData: { type: Object },
  isNoticeLoading: {
    type: Boolean,
  },
});

const handleNoticeItemClick = (id) => {
  router.push(`/notice/${id}`);
};
</script>

<style module="classes" scoped>
@import './HomeNotice.css';
</style>
