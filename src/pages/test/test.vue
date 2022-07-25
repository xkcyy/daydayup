<template>
  <view class="container">
    <DSwiper :data-source="dataSource" v-model:current="current" @change="handleChange">
      <template #default="{ item, index }">
        <scroll-view scroll-y="true" class="swiper-scroll">
          <view class="topic-content">
            <template v-if="item.type == 3">
              <view class="title">

                <uni-tag size="small" text="填空题" type="primary" style="margin-right: 20rpx;" />
                <!-- <text class="index">{{index+1}}、</text> -->
                <text>{{ item.title }}</text>
              </view>
              <view class="answer-input">
                <view v-if="index % 2">
                  <uni-easyinput :disabled="item.filled" v-model="item.answerResult" placeholder=""
                    @confirm="handleInputConfirm(item, index)" />
                </view>
                <uni-easyinput v-else :disabled="item.filled" v-model="item.answerResult" placeholder=""
                  @confirm="handleInputConfirm(item, index)" />
              </view>
              <view v-if="item.filled">
                <view style="display:flex">
                  <view style="width:80rpx;flex:none;height:80rpx;line-height: 80rpx;">
                    <view v-if="item.filled">
                      <uni-icons v-if="!item.answerCorrect" type="clear" size="38" color="#f84d27"></uni-icons>
                      <uni-icons v-else type="checkbox-filled" size="38" color="#18bc37"></uni-icons>
                    </view>
                  </view>
                  <view class="answer-result" style="flex:1">
                    <text>答案</text>
                    <text style="color: #0089ff;font-weight: bold;padding: 0 20rpx;">{{ item.answer }}</text>
                  </view>
                </view>

              </view>
              <view class="answer-doubt" v-if="item.filled && item.answerResult">
                <text style="font-weight: bold;">题目解析：</text>
                <text>{{ item.answerDoubt }}</text>
              </view>

            </template>
          </view>
        </scroll-view>
      </template>
    </DSwiper>
    <view class="panel-bottom">
      <view class="count-result">
        <view>
          <uni-icons type="checkbox-filled" size="18" color="#0089ff"></uni-icons>
        </view>
        <view class="success-num" style="padding-left: 10rpx;margin-right: 30rpx;">{{ countResult.success }}</view>
        <view>
          <uni-icons type="clear" size="18" color="#f84d27"></uni-icons>
        </view>
        <view class="error-num" style="padding-left: 10rpx;">{{ countResult.error }}</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import DSwiper from "../../components/d-swiper/d-swiper.vue";
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
  const route = routes[routes.length - 1]

  const url = ((route as any).$page.options as any).url as string;
  uni.request({
    url: url,
    success: (res: any) => {
      const arr = res.data.questions as Array<TestingQuestion>
      for (let i = 0; i < arr.length; i++) {
        const idx = Math.ceil((Math.random() * (arr.length - i))) % (arr.length - i)+i
        // 交换i与idx
        const newValue = arr[idx]
        arr[idx] = arr[i]
        arr[i] = newValue;
      }
      dataSource.value =arr
      handleChange(null)
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

    * {
      display: inline-block;
    }
  }
}
</style>