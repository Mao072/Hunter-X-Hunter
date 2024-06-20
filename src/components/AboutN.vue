<template>
  <div>
    <v-tabs align-tabs="center" color="deep-purple-accent-4" v-model="activeTab">
      <v-tab :value="1">強化系</v-tab>
      <v-tab :value="2">放出系</v-tab>
      <v-tab :value="3">變化系</v-tab>
      <v-tab :value="4">操作系</v-tab>
      <v-tab :value="5">具現化系</v-tab>
      <v-tab :value="6">特質系</v-tab>
    </v-tabs>
    <v-scroll-x-transition mode="out-in">
      <div :key="activeTab">
        <StrongGuys v-if="activeTab === 1"></StrongGuys>
        <OutGuys v-if="activeTab === 2"></OutGuys>
        <ChangeGuys v-if="activeTab === 3"></ChangeGuys>
        <PlayGuys v-if="activeTab === 4"></PlayGuys>
        <RealtyGuys v-if="activeTab === 5"></RealtyGuys>
        <WeridGuys v-if="activeTab === 6"></WeridGuys>
      </div>
    </v-scroll-x-transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StrongGuys from './Abilitys/StrongGuys.vue';
import ChangeGuys from './Abilitys/ChangeGuys.vue';
import OutGuys from './Abilitys/OutGuys.vue';
import PlayGuys from './Abilitys/PlayGuys.vue';
import RealtyGuys from './Abilitys/RealtyGuys.vue';
import WeridGuys from './Abilitys/WeridGuys.vue';

const activeTab = ref(1);
</script>

<style scoped>
.v-scroll-x-transition-enter-active, .v-scroll-x-transition-leave-active {
  transition: transform 0.2s ease; /* 0.2秒的过渡效果 */
}
.v-scroll-x-transition-enter, .v-scroll-x-transition-leave-to {
  transform: translateX(100%);
}
</style>
