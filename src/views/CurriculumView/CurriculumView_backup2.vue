<template>
  <div class="CurriculumWrapper">
    <div class="table-container">
    <table class="curriculum-table">
      
      <thead>
        <tr>
          <th class="col-index">순번</th>
          <th class="col-subject">교과목명</th>
          <th class="col-detail">상세교과내용</th>
          <th class="col-time">시간</th>
          <th class="col-period">기간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(curriculum, index) in curriculumData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ curriculum.subject }}</td>
          <td>
            <ul>
              <li v-for="detail in curriculum.detailSubjectDTOList" :key="detail.id">
                {{ detail.content }}
              </li>
            </ul>
          </td>
          <td>{{ curriculum.time }}</td>
          <td>{{ curriculum.startDate }} ~ {{ curriculum.endDate }}</td>
        </tr>
      </tbody>
      
    </table>
  </div>

  </div>
</template>

<script setup>
import { onMounted, ref, onUpdated, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch, useFetchs, useMutation } from '@/composables';

const router = useRouter();

const test01 = "테스트01";

const { data: curriculumData, fetchData: fetchCurriculum } = useFetch('/curriculum', {
  method: 'get',
  onSucess: (res) => {
    console.log('통신 성공!');
    console.log(res);
  },
  onError: (res) => {
    console.log('통신 실패!');
    console.log(res);
  },
})

onMounted(() => {
  fetchCurriculum();

})

onUpdated(() => {
  console.log(curriculumData.value[0])
})


</script>

<style scoped>
@import './CurriculumView.css';
</style>