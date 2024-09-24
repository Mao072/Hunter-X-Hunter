<template class='home'>
  <div>
    <v-tabs align-tabs="center" color="purple-accent-4" v-model="activeTab">
      <v-tab :value="1">測驗</v-tab>
    </v-tabs>
    <v-fade-transition mode="out-in">
      <div :key="activeTab">
        <TestN v-show="activeTab === 1"/>
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutN from './AboutN.vue';
import TestN from './TestN.vue';

const activeTab = ref(1);
</script>
