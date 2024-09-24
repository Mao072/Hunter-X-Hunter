<script lang="ts" setup>
  import { defineProps, ref, reactive, watch, onMounted } from 'vue';
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
  const backgroundImage = ref(''); 
  const words = reactive({
    強化系: '頭腦簡單',
    變化系: '反覆無常、又愛騙人',
    具現化系: '神經質',
    放出系: '粗枝大葉、性急',
    操作系: '我行我素、愛講道理',
    特質系: '有領袖氣質',
  });
  
  const backgroundImages = reactive({
    強化系: require('@/assets/gon.png'),
    變化系: require('@/assets/gon.png'),
    具現化系: require('@/assets/gon.png'),
    放出系: require('@/assets/gon.png'),
    操作系: require('@/assets/gon.png'),
    特質系: require('@/assets/gon.png'),
  });
  
  // 在組件掛載時設置背景圖片
  onMounted(() => {
    backgroundImage.value = backgroundImages[props.highest] || require('@/assets/default_image.png');
    console.log("123")
  });
  
  watch(
    () => props.highest,
    (newHighest) => {
      saying.value = words[newHighest] || '';
      backgroundImage.value = backgroundImages[newHighest] || require('@/assets/default_image.png'); 
    },
    { immediate: true }
  );
  </script>
  
  <template>
    <div class="test-end-container" :style="{ backgroundImage: `url('${backgroundImage}')` }">
      <h1>{{ highest }}</h1>
      <h2>西索: {{ saying }}</h2>
      <RadarChart :stats="stats" />
    </div>
  </template>
  
  <style scoped>
  .test-end-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
    width: 100%;
    padding-left: 30%;
    background-size: cover;  
    background-position: center; 
  }
  
  .test-end-container h1 {
    font-size: 48px;
    font-weight: bold;
    font-family: 'Cactus Classic Serif', Courier, monospace;
    margin: 0;
  }
  
  .test-end-container h2 {
    font-size: 36px;
    font-weight: bold;
    font-family: 'Cactus Classic Serif', Courier, monospace;
    margin: 0;
  }
  </style>
  