<template>
  <div class="CurriculumWrapper">

    <div class="curriclum-table-header">
      <div class="curriculum-table-header-row">
        <div class="curriculum-table-header-col curriculum-table-header-col-num">
          <div class="curriculum-table-header-cell curriculum-table-header-num">
            순번
          </div>
        </div>
        <div class="curriculum-table-header-col curriculum-table-header-col-title">
          <div class="curriculum-table-header-cell curriculum-table-header-title">
            교과목명
          </div>
        </div>
        <div class="curriculum-table-header-col curriculum-table-header-col-detail">
          <div class="curriculum-table-header-cell curriculum-table-header-detail">
            상세교과내용
          </div>
        </div>
        <div class="curriculum-table-header-col curriculum-table-header-col-time">
          <div class="curriculum-table-header-cell curriculum-table-header-time">
            시간
          </div>
        </div>
        <div class="curriculum-table-header-col curriculum-table-header-col-period">
          <div class="curriculum-table-header-cell curriculum-table-header-period">
            기간
          </div>
        </div>
      </div>
    </div>

    <table border="1">
      <th>테이블</th>
      <th>만들기</th>
      <tr><!-- 첫번째 줄 시작 -->
        <td>첫번째 칸</td>
        <td>두번째 칸</td>
      </tr><!-- 첫번째 줄 끝 -->
      <tr><!-- 두번째 줄 시작 -->
        <td>첫번째 칸</td>
        <td>두번째 칸</td>
      </tr><!-- 두번째 줄 끝 -->
    </table>



    <!-- <div v-for="curriculum in curriculumData">
      {{ curriculum }}
      <div v-for="detail in curriculum.detailSubjectDTOList">
        {{ detail.id }} {{ detail.content }}
      </div>
    </div> -->

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