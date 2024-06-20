<template>
  <div class="test-end-container">
    <h1>{{ highest }}</h1>
    <h2>西索:{{ saying }}</h2>
    <RadarChart :stats="stats" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, reactive, watch } from 'vue';
import RadarChart from './RadarChart.vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true
  },
  highest: {
    type: String,
    required: true
  }
});

const saying = ref('');
const words = reactive({
  強化系: '頭腦簡單',
  變化系: '反覆無常、又愛騙人',
  具現化系: '神經質',
  放出系: '粗枝大葉、性急',
  操作系: '我行我素、愛講道理',
  特質系: '有領袖氣質',
});

watch(
  () => props.highest,
  (newHighest) => {
    saying.value = words[newHighest] || '';
  },
  { immediate: true }
);
</script>

<style scoped>
.test-end-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start (left) */
  justify-content: center;
  text-align: left; /* Align text to the left */
  width: 100%;
  padding-left: 30%; /* Add padding to the left to position content 30% from the left */
}

.test-end-container h1 {
  font-size: 48px; /* Increase font size */
  font-weight: bold; /* Make font bold */
  font-family: 'Cactus Classic Serif', Courier, monospace; /* Specify font family */
  margin: 0;
}

.test-end-container h2 {
  font-size: 36px; /* Increase font size */
  font-weight: bold; /* Make font bold */
  font-family: 'Cactus Classic Serif', Courier, monospace; /* Specify font family */
  margin: 0;
}
</style>
