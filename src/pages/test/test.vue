<template>
  <view class="container" v-if="dataSource.length">
    <DSwiper3 :list="dataSource">
      <template #default="context">
        <scroll-view scroll-y="true" class="swiper-scroll">
          <view class="topic-content">
            <template v-if="context.item.type == 3">
              <view class="title">
                <uni-tag size="small" text="填空题" type="primary" style="margin-right: 20rpx;" />
                <!-- <text class="index">{{index+1}}、</text> -->
                <text>{{ context.index + 1 }}. {{ context.item.title }}</text>
              </view>
              <view class="answer-input">
                <view v-if="context.index % 2">
                  <uni-easyInput :disabled="context.item.filled" v-model="context.item.answerResult" placeholder=""
                    @confirm="handleInputConfirm(context.item, context.index)" />
                </view>
                <uni-easyInput v-else :disabled="context.item.filled" v-model="context.item.answerResult" placeholder=""
                  @confirm="handleInputConfirm(context.item, context.index)" />
              </view>
              <view v-if="context.item.filled">
                <view style="display:flex">
                  <view style="width:80rpx;flex:none;height:80rpx;line-height: 80rpx;">
                    <view v-if="context.item.filled">
                      <uni-icons v-if="!context.item.answerCorrect" type="clear" size="38" color="#f84d27"></uni-icons>
                      <uni-icons v-else type="checkbox-filled" size="38" color="#18bc37"></uni-icons>
                    </view>
                  </view>
                  <view class="answer-result" style="flex:1">
                    <text>答案</text>
                    <text style="color: #0089ff;font-weight: bold;padding: 0 20rpx;">{{ context.item.answer }}</text>
                  </view>
                </view>

              </view>
              <view class="answer-doubt" v-if="context.item.filled && context.item.answerResult">
                <text style="font-weight: bold;">题目解析：</text>
                <text>{{ context.item.answerDoubt }}</text>
              </view>

            </template>
          </view>
        </scroll-view>
      </template>
    </DSwiper3>
    <view class="panel-bottom">
      <view class="count-result">
        <view class="item">
          <uni-icons type="checkbox-filled" size="18" color="#0089ff"></uni-icons>
        </view>
        <view class="item success-num" style="padding-left: 10rpx;margin-right: 30rpx;">{{ countResult.success }}</view>
        <view class="item">
          <uni-icons type="clear" size="18" color="#f84d27"></uni-icons>
        </view>
        <view class="item error-num" style="padding-left: 10rpx;">{{ countResult.error }}</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import DSwiper from "../../components/d-swiper/d-swiper.vue";
import DSwiper3 from '../../components/d-swiper/d-swiper3.vue'
import { fetchQuestions, TestingQuestion } from "./api";
const dataSource = ref(new Array<TestingQuestion>());
const current = ref(0);

function handleChange(e: any) {
  uni.setNavigationBarTitle({
    title: current.value + 1 + '/' + dataSource.value.length
  })
}

onMounted(() => {
  const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  const route = routes[routes.length - 1] as any
  const url = decodeURIComponent((route.options || route.$page.options).url as string)

  // const url = ((route as any).$page.options as any).url as string;
  uni.showLoading({ title: '加载中...' })
  uni.request({
    url: url,
    success: (res: any) => {

      const arr = res.data.questions as Array<TestingQuestion>
      for (let i = 0; i < arr.length; i++) {
        const idx = Math.ceil((Math.random() * (arr.length - i))) % (arr.length - i) + i
        // 交换i与idx
        const newValue = arr[idx]
        arr[idx] = arr[i]
        arr[i] = newValue;
        newValue.id = 100 + i;
      }
      dataSource.value = arr
      uni.hideLoading()
      handleChange(null)
    }, fail: () => {
      uni.hideLoading()
    }
  })

})
function handleInputConfirm(question: TestingQuestion, index: number) {
  question.filled = true
  if (question.type == 3) {
    // 填空题
    const an = question.answer
      .replaceAll("、", ",")
      .replaceAll("，", ",")
      .split(",")
      .sort()
      .join(',')

    const ipt = (question.answerResult || '')
      .replaceAll("、", ",")
      .replaceAll("，", ",")
      .split(",")
      .sort()
      .join(',')
    question.answerCorrect = an == ipt
  }
}

const countResult = computed(() => {
  let [success, error] = [0, 0];
  dataSource.value.forEach(item => {
    if (item.filled) {
      if (item.answerCorrect) success++
      else error++
    }
  })

  return {
    success,
    error
  }
})
</script>
<style lang="less">
page {
  height: 100%;
}

// 容器
.container {
  height: 100%;
  background-color: #fff;
  position: relative;
  color: #333;
  font-size: 28rpx;
}

.topic-content {
  padding: 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.answer-input {
  padding: 20px 2px;
}

.answer-result {
  background-color: #f3f3f3;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
}

.answer-doubt {
  font-size: 14px;
  color: #8a6d3b;
  background-color: #fcf8e3;
  border: #faebcc solid 1px;
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  word-break: break-all;
}

.quesion-buttons {
  position: fixed;
  z-index: 10;
  bottom: 140rpx;
  left: 0;
  width: 100%;
  height: auto;
  background-color: #fff;
  height: 60rpx;
  align-items: center;
  display: flex;
}

.panel-bottom {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: #fff;
  border-top: 1px solid #ccc;
  height: 100rpx;
  line-height: 100rpx;
  padding-left: 20rpx;

  .count-result {
    display: inline-block;

    .item {
      display: inline-block;
    }
  }
}
</style>