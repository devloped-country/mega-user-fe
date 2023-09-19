<template>
  <div :class="classes.CurriculumWrapper">
    <div :class="classes['table-container']">
      <table :class="classes['curriculum-table']">
        <thead>
          <tr>
            <th :class="classes['col-index']">순번</th>
            <th :class="classes['col-subject']">교과목명</th>
            <th :class="classes['col-detail']">상세교과내용</th>
            <th :class="classes['col-time']">시간</th>
            <th :class="classes['col-period']">기간</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(curriculum, index1) in curriculumData" :key="index1">
            <tr v-for="(detail, index2) in curriculum.detailSubjectDTOList" :key="index2">

              <template v-if="index2 === 0"> 
                <td :rowspan="curriculum.detailSubjectDTOList.length" :class="classes['col-index']">
                  {{ index1 + 1 }}
                </td>
                <td :rowspan="curriculum.detailSubjectDTOList.length" :class="classes['col-subject']">
                  {{ curriculum.subject }}
                </td>
              </template>


              <td :class="classes[col-detail]">
                {{ detail.content }}
              </td>

              <template v-if="index2 === 0"> 
                <td :rowspan="curriculum.detailSubjectDTOList.length" :class="classes['col-time']">
                  {{ curriculum.time }}h
                </td>
                <td :rowspan="curriculum.detailSubjectDTOList.length" :class="classes['col-period']">
                  {{ curriculum.startDateString }} <br>~<br> {{ curriculum.endDateString }}
                </td>
              </template>
              
            </tr>
          </template>
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
})

onMounted(() => {
  fetchCurriculum();
})

</script>

<style module="classes" scoped>
@import './CurriculumView.css';
</style>