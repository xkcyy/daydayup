<template>
  <swiper class="swiper" :duration="duration" :current="innerSwiperIndex" :disableTouch="disableTouch"
    @change="handleSwiperChange" 
    @animationfinish="handleAnimationfinish" circular>
    <swiper-item v-for="(item, index) in 3" :key="index" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
      <view>
        <slot name="default" :index="innerSwiperIndexList[index]" :item="dataSource[innerSwiperIndexList[index]]">
        </slot>
        <!-- <button @click="goPrev">prev</button>
        <button @click="goNext">next</button> -->
      </view>
    </swiper-item>
  </swiper>
</template>


<script lang="ts" setup>
import { PropType, reactive, Ref, ref, watch,computed } from "vue";
type TSwiperItem = Record<string, any>;
const emits = defineEmits(["update:current", 'change','animationfinish']);
const props = defineProps({
  dataSource: { type: Array as PropType<Array<TSwiperItem>>, required: true },
  current: { type: Number, default: 0 },
  renderSize: { type: Number, default: 3 },
  vertical: { type: Boolean, default: false },
  circular: { type: Boolean, default: false },
});
const dataSourceLength = computed(() => props.dataSource.length)
const duration = ref(300);
// 禁用滚动
const disableTouch = ref(false)
// 内部swiper的成员大小
const innerSwiperLength = 3;
// 内部swiper列表映射外部序号的列表
const innerSwiperIndexList = ref([] as Array<number>)
// 内部swiper内容touch操作
const innerSwiperIndex = ref(0);
// 手动触摸开始的位置
const touchStartObj = reactive({ pageX: 0, pageY: 0 })
// 外部的当前序号
const currentIndex = computed(() => innerSwiperIndexList.value[innerSwiperIndex.value])
// 监听数据源，初始化内部swiper序号索引
watch(() => props.dataSource, () => { innerSwiperIndexList.value = [innerSwiperIndex.value = 0, 1, props.dataSource.length - 1] }, { immediate: true })
// 监听current改变
watch(() => props.current, () => {
  // 外部更新current
  if (props.current !== currentIndex.value) {
    // 跳转到所在页面
    const nextIdx = (props.current > currentIndex.value)
      ? ((innerSwiperIndex.value + 1) % innerSwiperLength)
      : (innerSwiperIndex.value - 1 + innerSwiperLength) % innerSwiperLength

    innerSwiperIndex.value = nextIdx
    if (nextIdx != props.current) {
      innerSwiperIndexList.value[nextIdx] = props.current
    }
    updateInnerSwiperIndexList(nextIdx)
  }

})
// 更新内部swiper的序号列表
const updateInnerSwiperIndexList = function (index: number) {
  // 当 发生切换时，innerSwiperIndex 从1 切换到2时
  // 我们需要保证 切换后的序号对应的页不会发生刷新，则页面2对应的数据不做改变,页面2相邻的页面需要刷新数据
  const dateLen = props.dataSource.length
  //  dataSource: [1,2,3,4,5,6,7,8,9] 
  // innerSwiperIndex [3,4(当前),5]  <--- 滑动页 index 为1 切换到 2
  // innerSwiperIndex [3,4,5(当前)] 
  // 更新 innerSwiperIndex的序号 [6,4,5(当前)]
  if (index >= 0 && index < 3) {
    // 右侧的序号+1
    innerSwiperIndexList.value[(index + 1) % 3] = (innerSwiperIndexList.value[index] + 1) % dateLen
    // 左侧的序号-1
    innerSwiperIndexList.value[(index + 3 - 1) % 3] = (innerSwiperIndexList.value[index] + dateLen - 1) % dateLen
  } else {
    // innerSwiperIndexList.value[0] = props.dataIndex
    // innerSwiperIndexList.value[1] = (innerSwiperIndexList.value[0] + 1) % dataLength.value;
    // innerSwiperIndexList.value[2] = innerSwiperIndexList.value[0] == 0 ? dataLength.value - 1 : innerSwiperIndexList.value[0] - 1
  }
  //emits('indexesChange', innerSwiperIndexList.value)
}
// swiper 切换事件
const handleSwiperChange = function (e: any) {
  let cur = e.detail.current as number;
  const outIdx = innerSwiperIndexList.value[cur] //props.current + cur - innerSwiperIndex.value;
  // 渲染相邻节点
  updateInnerSwiperIndexList(cur)
  // 更新外部idx
  emits("update:current", outIdx);
  // 更新内部idx
  innerSwiperIndex.value = cur;
  // change
  emits('change', outIdx);
};
// swiper touch start事件处理
const handleTouchStart = function (e: any) {
  const item = e.changedTouches[0];
  touchStartObj.pageX = item.pageX;
  touchStartObj.pageY = item.pageY
}
// swiper touch move事件处理
const handleTouchMove = function (e: any) {
  console.log(currentIndex.value)
  if (props.circular) return
  var targetPos = e.changedTouches[0] as { pageX: number, pageY: number };
  var vertical = props.vertical

  // 是否向左滑动
  var preDir = vertical ? targetPos.pageY > touchStartObj.pageY : targetPos.pageX > touchStartObj.pageX
  // 是否向右滑动
  var nextDir = vertical ? targetPos.pageY < touchStartObj.pageY : targetPos.pageX < touchStartObj.pageX
  if (currentIndex.value == 0 && preDir) {
    disableTouch.value = true
    e && e.stopPropagation && e.stopPropagation();
    return false
  } else if ((currentIndex.value == dataSourceLength.value - 1) && nextDir) {
    disableTouch.value = true
    e && e.stopPropagation && e.stopPropagation();
    return false
  }
}
// swiper touch end事件处理
const handleTouchEnd = function () {
  disableTouch.value = false
}

const handleAnimationfinish = function(){
  emits('animationfinish')
}
</script>
<style lang="less">
.swiper {
  height: 100%;

  .swiper-scroll {
    height: 100%;
  }

  .swiper-item {
    background-color: #fff;
    box-sizing: border-box;
    height: 100%;



    .topic-content {
      padding: 30rpx;
      font-size: 32rpx;
      color: #333;
      line-height: 1.6;
    }
  }
}
</style>