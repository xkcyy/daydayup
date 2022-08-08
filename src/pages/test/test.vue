<template>
  <view class="container" v-if="dataSource.length">
    <DSwiper ref="refSwiper" v-model:current="current" @animationfinish="handleAnimationfinish" :dataSource="dataSource"
      @chagne="handleChange">
      <template #default="context">
        <scroll-view scroll-y="true" class="swiper-scroll">
          <view class="topic-content">
            <template v-if="context.item.type == 3">
              <view class="title">
                <uni-tag size="small" text="填空题" type="primary" style="margin-right: 20rpx;" />
                <!-- <text class="index">{{index+1}}、</text> -->
                <text>{{ context.index + 1 }}.<text style="font-size: 16rpx;color:#888;">({{(context.item.id + 1)}})</text> {{ context.item.title }}</text>
              </view>
              <view class="answer-input">
                <!-- <view v-if="context.index % 2">
                  <uni-easyInput :focus="focusSource[context.index]" @blur="handleBlur(context.index)"
                    :disabled="context.item.filled" v-model="context.item.answerResult" placeholder=""
                    @confirm="handleInputConfirm(context.item, context.index)" />
                </view> -->
                <uni-easyInput :focus="focusSource[context.index]" @blur="handleBlur(context.index)"
                  :disabled="context.item.filled" v-model="context.item.answerResult" placeholder=""
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
    </DSwiper>
    <view class="panel-bottom" ref="bottomRef">
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
    <uni-popup ref="refPopupTestResult" background-color="#fff">
      <view>
        <uni-card>
          <!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
          <view class="uni-body">
            <view class="count-result">
              <view class="item">
                <uni-icons type="checkbox-filled" size="18" color="#0089ff"></uni-icons>
              </view>
              <view class="item success-num" style="padding-left: 10rpx;margin-right: 30rpx;">{{ countResult.success }}
              </view>
              <view class="item">
                <uni-icons type="clear" size="18" color="#f84d27"></uni-icons>
              </view>
              <view class="item error-num" style="padding-left: 10rpx;">{{ countResult.error }}</view>
            </view>
            <view></view>
          </view>
          <view slot="actions" class="card-actions">
            <view class="card-actions-item">
              <uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
              <text class="card-actions-item-text">分享</text>
            </view>
            <view class="card-actions-item">
              <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
              <text class="card-actions-item-text">评论</text>
            </view>
          </view>
        </uni-card>
      </view>
    </uni-popup>
  </view>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import DSwiper from "../../components/d-swiper/d-swiper.vue";
import DSwiper3 from '../../components/d-swiper/d-swiper3.vue'
import { fetchQuestions, TestingQuestion } from "./api";
import { fetchSubjectRandom, updateSujectScores } from '../../services/score'


const dataSource = ref(new Array<TestingQuestion>());
const focusSource = ref(new Array<Boolean>);
const current = ref(0);
const refSwiper = ref({} as any)
const refPopupTestResult = ref(null as any)
const bottomRef = ref({} as any)

function handleBlur(index: number) {
  focusSource.value[index] = false
  console.log('blur')
}

function handleChange(index: number) {
  current.value = index
  uni.setNavigationBarTitle({
    title: index + 1 + '/' + dataSource.value.length
  })
  for (let i = 0; i < dataSource.value.length; i++) {
    focusSource.value[i] = false;
  }
  focusSource.value[index] = true
}

function submit() {
  const topics = dataSource.value.map(x => {
    return {
      index: parseInt(x.id as string),
      success: x.answerCorrect || false
    }
  })
  updateSujectScores('redis', topics)

  const score = Math.round(countResult.value.success * 100 / dataSource.value.length)

  uni.showModal({
    content: score + '分',
    cancelText: "关闭",
    confirmText: '再来一次',
    success: function () {
      // 
      uni.navigateBack()
    },
    fail: function () {
      uni.navigateBack()
    }
  })
}

onMounted(() => {
  const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  const route = routes[routes.length - 1] as any
  const url = decodeURIComponent((route.options || route.$page.options).url as string)

  uni.showLoading({ title: '加载中...' })
  fetchSubjectRandom({ url, name: 'redis', random: true, top: 10 }).then(res => {
    dataSource.value = res as any as Array<TestingQuestion>
    focusSource.value = res.map(x => false)
    focusSource.value[0] = true
  }).finally(() => {
    uni.hideLoading()
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

  console.log(current.value)
  if (current.value == focusSource.value.length - 1) {
    // 结束
    submit()
  } else if (question.answerCorrect) {
    //正确下一个
    setTimeout(() => {
      current.value += 1
    }, 300);
  }

}

function handleAnimationfinish() {
  for (let i = 0; i < dataSource.value.length; i++) {
    focusSource.value[i] = false;
  }
  focusSource.value[current.value] = true
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