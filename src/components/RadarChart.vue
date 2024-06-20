<template>
  <div>
    <Radar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch,defineProps } from 'vue';
import { Radar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
});

const chartData = ref(null);

watch(
  () => props.stats,
  (newStats) => {
    if (newStats) {
      chartData.value = {
        labels: ['強化系', '放出系', '變化系', '操作系', '具現化系', '特質系'],
        datasets: [
          {
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            data: [
              newStats.強化系,
              newStats.放出系,
              newStats.變化系,
              newStats.操作系,
              newStats.具現化系,
              newStats.特質系,
            ]
          }
        ]
      };
    }
  },
  { immediate: true }
);

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: true
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  },plugins: {
    legend: {
      display: false,  // 隱藏標籤
    },
  },
});
</script>

<style scoped>
div {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
}
</style>
