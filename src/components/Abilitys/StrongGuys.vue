<template>
    <div class="background-container">
      <h5>強化系</h5>
    </div>
  </template>
  
  <script lang="ts" setup>
  //import gonImage from '@/assets/gon.png'; // 确保路径正确
  </script>
  
  <style scoped>
  .background-container {
    background-image: url('@/assets/gon.png'); /* 背景图片 */
    background-size: cover; /* 调整背景图片大小以覆盖容器 */
    background-position: center; /* 居中显示背景图片 */
    opacity: 0.8; /* 调整透明度 */
    width: 100%;
    height: 100vh; /* 视口高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white; /* 根据需要调整文字颜色 */
  }
  </style>
  