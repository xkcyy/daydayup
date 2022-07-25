<template>
  <view v-for="(item, index) in swiperList" :key="index">
    <view>
      {{ index }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import {
  Prop,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
  onMounted
} from "@vue/runtime-core";
type TSwiperItem = Record<string, any>;
const emits = defineEmits(["update:current"]);

const swiperList = ref([{a:1}] as Array<any>);
const isChanging = ref(false);
onMounted(()=>{
  setInterval(()=>{
    console.log(swiperList.value.length)
    swiperList.value.push({a:swiperList.value.length})
  },1000)
})
</script>
