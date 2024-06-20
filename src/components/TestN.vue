<template>
  <div class="center-container">
    <v-btn v-show="!ifStart" @click="start" height="72" min-width="164">
      <v-icon left>
        <img :src="hunterLogo" alt="hunter logo" height="24" />
      </v-icon>
      開始測驗
    </v-btn>
    <div v-show="ifStart" class="question-container">
      <div v-show='!ifEnd' class="header-container">
        <h1 v-show="currentIndex <= 10">單選題</h1>
        <h1 v-show="(currentIndex > 10)&&(currentIndex <= 14)">多選題</h1>
        <h1 v-show="currentIndex > 14">是非題</h1>
        <h2>{{ currentTopic?.title }}</h2>
      </div>
      <div v-show='!ifEnd' class="options-container">
        <div v-for="(option, index) in currentTopic?.options" :key="index">
          <v-btn v-if="currentIndex <= 10 || currentIndex > 14" @click="selectOption(option)">{{ option.text }}</v-btn>
          <v-btn v-else :class="{'selected': selectedOptions[index]}" @click="toggleOption(index)">
            {{ option.text }}
          </v-btn>
        </div>
      </div>
      <v-btn v-show="(currentIndex > 10)&&(currentIndex <= 14)" @click="submitMultipleChoice">提交</v-btn>
    </div>
    <TestEnd v-if="ifEnd" :stats="stats" :highest="highest"/>
  </div>
</template>


<script setup lang="ts">
import hunterLogo from '@/assets/hunterLogo.png';
import { ref, reactive } from 'vue';
import TestEnd from './TestEnd.vue';

const ifStart = ref(false);
const ifEnd = ref(false);
const currentTopic = ref(null);
const currentIndex = ref(0);
const selectedOptions = reactive([]);
const stats = reactive({
  強化系: 0,
  放出系: 0,
  變化系: 0,
  操作系: 0,
  具現化系: 0,
  特質系: 0,
});
const highest = ref("");
const topics = reactive([
  {//0
    title: 'Q1 有一天你走在路上看到兩隻被拋棄的黑貓，你會怎麼做？',
    options: [
      { text: 'A 帶回家', effects: { 強化系: 10, 放出系: 10, 操作系:10,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 1 },
      { text: 'B 不帶回家', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 10, 具現化系: 10, 特質系:10 }, nextTopic: 2 },
    ],
  },
  {//1
    title: 'Q2帶回家之後，你會怎麼做？',
    options: [
      { text: 'A 不管怎樣都一定要養！', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 3 },
      { text: 'B 想養的，不過被反對了於是去找別人養', effects: { 強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 3 },
      { text: 'C 不想養，找別人養', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 3 },
    ],
  },
  {//2
    title: 'Q2為什麼不選擇帶回家？',
    options: [
      { text: 'A 因為家裡不給養', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30}, nextTopic: 3 },
      { text: 'B 因為黑貓不吉利', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 3 },
      { text: 'C 儘管現在是很可愛，總有一天會厭煩的', effects: { 強化系: 0, 放出系: 0, 操作系: 0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 3 },
    ],
  },
  {//3
    title: 'Q3早上起床後發現天空烏雲密布，聽天氣預報說降雨概率為40%。你出門會帶傘嗎？',
    options: [
      { text: 'A 覺得肯定會下雨於是帶上手頭的傘', effects: { 強化系: 0, 放出系: 0, 操作系:15,變化系: 0, 具現化系: 15, 特質系:0}, nextTopic: 4},
      { text: 'B 覺得大概會下雨就帶了折疊傘', effects: { 強化系: 0, 放出系: 15, 操作系:0,變化系: 0, 具現化系: 0, 特質系:15}, nextTopic: 4 },
      { text: 'C 不帶傘', effects: { 強化系: 15, 放出系: 0, 操作系:0,變化系: 15, 具現化系: 0, 特質系:0}, nextTopic: 4 },
    ],
  },
  {//4
    title: 'Q4 和朋友約好出去玩，可是約定時間到了朋友卻沒有來。你能等多少分鐘？',
    options: [
      { text: 'A 等不了', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 5},
      { text: 'B 5分鐘左右', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 5 },
      { text: 'C 10分鐘左右', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 5 },
      { text: 'D 15分鐘左右', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30}, nextTopic: 5 },
      { text: 'E 20分鐘左右', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 5 },
      { text: 'F 可以一直等下去', effects: { 強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 5 }, 
    ],
  },
  {//5
    title: 'Q5 這次是你遲到了。對方生氣了，你會怎麼做？',
    options: [
      { text: 'A 道歉，3天內為對方做任何事', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 6},
      { text: 'B 道歉，讓對方心情好起來', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 6 },
      { text: 'C 道歉，下次起早來20分鐘', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 6},
      { text: 'D 辯解，不認錯', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 6 },
      { text: 'E 辯解，讓對方心情好起來', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 6 },
      { text: 'F 這種事不可能發生', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 6 }, 
    ],
  },
  {//6
    title: 'Q6 早上醒來你發現自己變成動物了。是什麼動物？',
    options: [
      { text: 'A 綿羊', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 7},
      { text: 'B 黑豹', effects: { 強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 7 },
      { text: 'C 猴子', effects: {  強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 7},
      { text: 'D 老虎', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 7 },
      { text: 'E 狼', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 7 },
      { text: 'F 珀伽索斯（希臘神話中的飛馬）', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 7 }, 
      { text: 'G 獅子', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30}, nextTopic: 7 }, 
    ],
  },
  {//7
    title: 'Q7 承Q6，為什麼這麼想？',
    options: [
      { text: 'A 因為動物占卜裡自己測出來是它', effects: { 強化系: 0, 放出系: 0, 操作系:15,變化系: 0, 具現化系: 15, 特質系:0 }, nextTopic: 8},
      { text: 'B 因為喜歡這種動物', effects: { 強化系: 15, 放出系: 15, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 8 },
      { text: 'C 因為想變成這種動物', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 15, 具現化系: 0, 特質系:15 }, nextTopic: 8},
      { text: 'D 不為什麼', effects: { 強化系: 5, 放出系: 5, 操作系:5,變化系: 5, 具現化系: 5, 特質系:5}, nextTopic: 8 },
    ],
  },
  {//8
    title:'Q8 你最擅長的是？',
    options: [
      { text: 'A 數理', effects: { s: 0, o: 0, p:0,c: 0, r: 35, w:0 }, extTopic: 9},
      { text: 'B 語文', effects: {強化系: 0, 放出系: 0, 操作系:35,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 9 },
      { text: 'C 社會', effects: { 強化系: 0, 放出系: 35, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 9},
      { text: 'D 創作', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:35}, nextTopic: 9 },
      { text: 'E 體育', effects: { 強化系: 35, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 9 },
      { text: 'F 無', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 35, 具現化系: 0, 特質系:0}, nextTopic: 9 },
    ],
  },
  {//9
    title:'Q9 你最討厭的是？',
    options: [
      { text: 'A 數理', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 10},
      { text: 'B 語文', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30}, nextTopic: 10 },
      { text: 'C 社會', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 10},
      { text: 'D 創作', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 10 },
      { text: 'E 體育', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 10 },
      { text: 'F 無', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 10 },
    ],
  },
  {//10
    title:'Q10 如果你成為了盜賊，第一件想偷的是什麼？',
    options: [
      { text: 'A 人命', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 11},
      { text: 'B 錢', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 11 },
      { text: 'C 鑽石、寶石', effects: {強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 11},
      { text: 'D 美術品', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 11 },
      { text: 'E 古書', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 11 },
      { text: 'F 絕對不會成為盜賊', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 11 },
    ],
  },
    {//11
      title:'Q11 你覺得自己的優點有？',
    options: [
      { text: 'A 規規矩矩', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 12},
      { text: 'B 有責任感', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 12},
      { text: 'C 被人信賴', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 12},
      { text: 'D 有引人注目的特長', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 12 },
      { text: 'E 對自己要求嚴格', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 12 },
      { text: 'F 有行動力', effects: {強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 12},
      { text: 'G 朋友多', effects: {強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 12 },
      { text: 'H 反复無常難以捉摸', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 12 },
      { text: 'I 畫畫唱歌很好', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 12},
      { text: 'J 利己主義', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 12 },
      { text: 'K 擅長精細活', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 12 },
      { text: 'L 我行我素', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 12 },
    ],
  },
  {//12
    title:'Q12 覺得自己的缺點有？',
    options: [
      { text: 'A 沒有協調性', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 13},
      { text: 'B 粗心大意', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 13 },
      { text: 'C 愛說謊', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 13},
      { text: 'D 討厭的人有10個以上', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 13 },
      { text: 'E 對錢斤斤計較', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 13 },
      { text: 'F 覺得沒道理的事就無法接受', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 13 },
      { text: 'G 自我中心', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 13 },
      { text: 'H 為達到目的不擇手段', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 13},
      { text: 'I 容易生氣', effects: {強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 13 },
      { text: 'J 淚點低', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 13 },
      { text: 'K 行動遲緩', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 13 },
      { text: 'L 容易上當', effects: {強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 13 },
    ],
  },
  {//13 
    title:'Q13 什麼樣的人會讓你真的起殺心？',
    options: [
      { text: 'A 殺了自己家人的人', effects: { 強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 14},
      { text: 'B 殺了自己喜歡的人的人', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 14 },
      { text: 'C 給了自己最大屈辱的人', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 14},
      { text: 'D 想殺自己的人', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 14 },
      { text: 'E 在自己面前大量濫殺無辜的人', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0}, nextTopic: 14 },
      { text: 'F 背叛自己的人', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 14 },
    ],
  },
  {//14
    title:'Q14 什麼時候你會哭？',
    options: [
      { text: 'A 重要的人死去時', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 15},
      { text: 'B 悲傷或是感動時', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0}, nextTopic: 15 },
      { text: 'C 被甩時', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 15},
      { text: 'D 被求婚時', effects: {強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 15 },
      { text: 'E 看體育項目感動時', effects: { 強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0}, nextTopic: 15 },
      { text: 'F 達成某重大目標時', effects: {強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 15 },
      { text: 'G 工作出現大失敗時', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 15 },
      { text: 'H 身邊長時間沒人時', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 15},
      { text: 'I 回憶痛苦往事時', effects: {強化系: 0, 放出系: 30, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 15 },
      { text: 'J 自尊被傷害時', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 15 },
      { text: 'K 被朋友背叛', effects: {強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 15 },
      { text: 'L 不大哭', effects: {強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 15 },
    ],
  },
  {//15
    title:'Q15 覺得魔術師很厲害嗎？',
    options: [
      { text: '是', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 30, 具現化系: 0, 特質系:0 }, nextTopic: 16},
      { text: '否', effects: { 強化系: 6, 放出系: 6, 操作系:6,變化系: 6, 具現化系: 6, 特質系:6}, nextTopic: 16 },
    ],
  },
  {//16
    title:'Q16 用行動力逮捕犯人的警察是不對的嗎？',
    options: [
      { text: '是', effects: { 強化系: 0, 放出系: 0, 操作系:30,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 17},
      { text: '否', effects: { 強化系: 6, 放出系: 6, 操作系:6,變化系: 6, 具現化系: 6, 特質系:6}, nextTopic: 17 },
    ],
  },
  {//17
    title:'Q17 書架上的書順序排得亂七八糟的話會不舒服嗎？',
    options: [
      { text: '是', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 30, 特質系:0 }, nextTopic: 18},
      { text: '否', effects: { 強化系: 6, 放出系: 6, 操作系:6,變化系: 6, 具現化系: 6, 特質系:6}, nextTopic: 18 },
    ],
  },
  {//18
    title:'Q18 絕對不會花心嗎？',
    options: [
      { text: '是', effects: { 強化系: 30, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:0 }, nextTopic: 19},
      { text: '否', effects: { 強化系: 6, 放出系: 6, 操作系:6,變化系: 6, 具現化系: 6, 特質系:6}, nextTopic: 19 },
    ],
  },
  {//19
    title:'Q19 只要自己好的話其他怎樣都無所謂嗎？',
    options: [
      { text: '是', effects: { 強化系: 0, 放出系: 0, 操作系:0,變化系: 0, 具現化系: 0, 特質系:30 }, nextTopic: 20},
      { text: '否', effects: { 強化系: 6, 放出系: 6, 操作系:6,變化系: 6, 具現化系: 6, 特質系:6}, nextTopic: 20 },
    ],
  },
  {//20
    title:'Q20 不喜歡整理收拾嗎？',
    options: [
      { text: '是', effects: { s: 0, o: 30, p:0,c: 0, r: 0, w:0 }, nextTopic: null},
      { text: '否', effects: { s: 6, o: 6, p:6,c: 6, r: 6, w:6}, nextTopic: null },
    ],
  },
]);

function start() {
  ifStart.value = true;
  currentTopic.value = topics[currentIndex.value];
  selectedOptions.length = currentTopic.value.options.length; // 初始化多选题选项
}

function selectOption(option) {
  updateStats(option.effects);

  if (option.nextTopic !== null) {
    currentIndex.value = option.nextTopic;
    currentTopic.value = topics[currentIndex.value];
  } else {
    ifEnd.value = true;
    updateHighestStat();
  }
}

function updateStats(effects) {
  stats.強化系 += effects.強化系 || 0;
  stats.放出系 += effects.放出系 || 0;
  stats.變化系 += effects.變化系 || 0;
  stats.操作系 += effects.操作系 || 0;
  stats.具現化系 += effects.具現化系 || 0;
  stats.特質系 += effects.特質系 || 0;
}

function submitMultipleChoice() {
  currentTopic.value.options.forEach((option, index) => {
    if (selectedOptions[index]) {
      updateStats(option.effects);
    }
  });

  if (currentTopic.value.options[0].nextTopic !== null) {
    currentIndex.value = currentTopic.value.options[0].nextTopic;
    currentTopic.value = topics[currentIndex.value];
    selectedOptions.length = currentTopic.value.options.length; 
    resetSelectedOptions(); 
  } else {
    ifEnd.value = true;
    updateHighestStat();
  }
}

function resetSelectedOptions() {
  for (let i = 0; i < selectedOptions.length; i++) {
    selectedOptions[i] = false;
  }
}

function toggleOption(index) {
  selectedOptions[index] = !selectedOptions[index];
}

function updateHighestStat() {
  const statEntries = Object.entries(stats);
  const maxEntry = statEntries.reduce((max, entry) => entry[1] > max[1] ? entry : max, statEntries[0]);
  highest.value = maxEntry[0];
}
</script>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: Arial, Helvetica, sans-serif;
}

.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header-container h1, .header-container h2 {
  text-align: center;
  width: 100%;
}

.v-btn {
  font-size: 24px;
  margin: 5px;
}

.v-btn img {
  height: 24px;
  margin-right: 8px;
}

.options-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.v-btn.selected {
  background-color: #6200ea;
  color: white;
}
</style>



