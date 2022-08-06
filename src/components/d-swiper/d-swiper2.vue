<template>
  <swiper
    class="swiper"
    :duration="duration"
    :current="innerSwiperIndex"
    :disable-programmatic-animation="true"
    @change="handleSwiperChange"
    @animationfinish="handleSwiperAnimationFinish"
  >
    <swiper-item v-for="(item, index) in innerSwiperList" :key="item.id">
      <view>
        <slot name="default"
          v-bind:context="{ item, index: innerSwiperRangeStartIndex + index }"
        ></slot>
        <text>{{(function(){test(item, index)})()}}</text>
      </view>
    </swiper-item>
  </swiper>
</template>
<script lang="ts" setup>
import {
  Prop,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect,
  onMounted,
} from "vue";
type TSwiperItem = Record<string, any>;
const emits = defineEmits(["update:current",'change']);

const props = defineProps({
  dataSource: { type: Array as PropType<Array<TSwiperItem>>, required: true },
  current: { type: Number, default: 0 },
  renderSize: { type: Number, default: 3 },
});
const outIndex = ref(0);
const duration = ref(2000);
const innerSwiperIndex = ref(0);
const innerSwiperList = ref([] as Array<TSwiperItem>);
const isSwiperChanging = ref(false);
const innerSwiperRangeStartIndex = ref(0);
const test = function(item:any,idx:any){
  console.log('reding item ...',item,idx)
}
const renderSwiper = (index: number) => {
  console.log('renderSwiper',index)
  const list = new Array<TSwiperItem>();
  let current = 0;
  let size = props.renderSize || 5;
  if (size < 3) size = 3;
  let start = index - Math.floor(size / 2);
  let end = start + size;

  for (let idx = start; idx < end; idx++) {
    if (props.dataSource[idx]) {
      list.push(props.dataSource[idx]);
      if (idx < index) {
        current++;
      }
    }
  }
  setTimeout(() => {
    duration.value = 0;
    innerSwiperList.value = list;
    innerSwiperIndex.value = current;
    innerSwiperRangeStartIndex.value = index - current;
    console.log('cur page will be ',list[current])
    // setTimeout(() => {
    //   duration.value = 200;
    // }, 100);
  }, 2000);
};
watchEffect(() => {
  const ds = props.dataSource;
  renderSwiper(0);
});



const handleSwiperChange = function (e: any) {
  // 非触摸事件不做轮播图状态更新
  if (e.detail.source != "touch") return;
  isSwiperChanging.value = true;
  let cur = e.detail.current as number;
  const outIdx = props.current + cur - innerSwiperIndex.value;
  // 更新外部idx
  emits("update:current", outIdx);
  // 更新内部idx
  innerSwiperIndex.value = cur;
  outIndex.value = outIdx;
  // change
  emits('change', outIdx);
};
const handleSwiperAnimationFinish = function () {
  // 动画结束时重新渲染
  if (!isSwiperChanging.value) return;
  isSwiperChanging.value = false;
  setTimeout(() => {
    console.log(props.current);
    renderSwiper(props.current);
  }, 10);
};
</script>
<style lang="less">
.swiper{
	height: 100%;
	
	.swiper-scroll{
		height: 100%;
	}

	.swiper-item{
		background-color: #fff;
		box-sizing: border-box;
		height: 100%;
		
		
		
		.topic-content{
			padding: 30rpx;
			font-size: 32rpx;
			color: #333;
			line-height: 1.6;
        }
    }
}
</style>