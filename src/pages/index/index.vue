<template>
  <view>
    <view class="page_header">
      <view class="header_content">
        <view class="left">
          <text class="title">好好学习,天天向上</text>
          <text class="sub_title">每天进步一点点，轻松得来终觉浅</text>
          <text class="btn">加油</text>
        </view>
        <view>
          <image
            src="/static/right.png"
            style="width: 131px; height: 122px"
          ></image>
        </view>
      </view>
    </view>

    <view class="page_content" >
      <uni-grid :column="4" :highlight="true">
        <uni-grid-item
          v-for="(item, index) in subjects"
          :index="index"
          :key="index"
        >
          <view style="background-color: #fff;height:100%">
            <!-- <uni-icons type="image" :size="30" color="#777" /> -->
            <navigator class="grid-item-box" 
              :url="'/pages/test/test?url=' + encodeURIComponent(item.url || '')"
              animationType="pop-in"
              animationDuration="200"
            >
              <image
                class="img"
                style="width: 100rpx; height: 100rpx; background-color: #eeeeee"
                mode="aspectFit"
                :src="item.img"
              ></image>
              <text class="text">{{ item.title }}</text>
            </navigator>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const t = ref(0);
const swiperList = ref([{a:1}])



const subjects = [
  {
    id: "redis",
    title: "Redis",
    img: "https://atts.w3cschool.cn/attachments/cover/cover_redis.png?imageView2/1/w/64/h/64&t=1542113432",
    desc: "一个高性能的key-value数据库。",
    url: "https://xkcyy.github.io/daydayup/dist/build/h5/static/tests/redis.json",
  }
];

const handlerGridClick = function (idx: number) {
  alert(1);
  let sub = subjects[idx];
  uni.navigateTo({
    url: `/topic?data=${sub.id}`,
    animationType: "pop-in",
    animationDuration: 200,
  });
};
</script>

<style lang="less" scoped>
page {
  width: 100%;
  background-color: #ebebeb;
}

.page_header {
  padding-top: var(--status-bar-height);
  background-color: #0bc99d;
  width: 100%;

  .header_content {
    display: flex;
    flex-direction: row;

    .left {
      display: flex;
      flex-direction: column;
      width: 57%;
      margin-top: 40rpx;
      margin-left: 30rpx;
      margin-right: 30rpx;

      .title {
        width: 419rpx;
        height: 70rpx;
        font-size: 50rpx;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }

      .sub_title {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

        background: linear-gradient(
          0deg,
          rgba(120, 255, 224, 1) 0%,
          rgba(255, 255, 255, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .btn {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        width: 260rpx;
        height: 80rpx;
        background: linear-gradient(
          -30deg,
          rgba(252, 135, 29, 1),
          rgba(246, 185, 9, 1)
        );
        box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
        border-radius: 30rpx;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.page_content {
  .grid-item-box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx 20rpx;
    }
    .text {
      margin-top: 10rpx;
      font-size: 28rpx;
      color: #333333;
    }
  }
}
</style>