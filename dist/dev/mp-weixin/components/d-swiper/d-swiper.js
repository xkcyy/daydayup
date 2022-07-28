"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    dataSource: { type: Array, required: true },
    current: { type: Number, default: 0 },
    renderSize: { type: Number, default: 3 }
  },
  emits: ["update:current", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const outIndex = common_vendor.ref(0);
    const duration = common_vendor.ref(2e3);
    const innerSwiperIndex = common_vendor.ref(0);
    const innerSwiperList = common_vendor.ref([]);
    const isSwiperChanging = common_vendor.ref(false);
    const innerSwiperRangeStartIndex = common_vendor.ref(0);
    const test = function(item, idx) {
      console.log("reding item ...", item, idx);
    };
    const renderSwiper = (index) => {
      console.log("renderSwiper", index);
      const list = new Array();
      let current = 0;
      let size = props.renderSize || 5;
      if (size < 3)
        size = 3;
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
        console.log("cur page will be ", list[current]);
        setTimeout(() => {
          duration.value = 200;
        }, 50);
      }, 20);
    };
    common_vendor.watchEffect(() => {
      props.dataSource;
      renderSwiper(0);
    });
    const handleSwiperChange = function(e) {
      if (e.detail.source != "touch")
        return;
      isSwiperChanging.value = true;
      let cur = e.detail.current;
      const outIdx = props.current + cur - innerSwiperIndex.value;
      emits("update:current", outIdx);
      innerSwiperIndex.value = cur;
      outIndex.value = outIdx;
      emits("change", outIdx);
    };
    const handleSwiperAnimationFinish = function() {
      if (!isSwiperChanging.value)
        return;
      isSwiperChanging.value = false;
      setTimeout(() => {
        console.log(props.current);
        renderSwiper(props.current);
      }, 10);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(innerSwiperList.value, (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              context: {
                item,
                index: innerSwiperRangeStartIndex.value + index
              }
            }, i0),
            c: common_vendor.t(function() {
              test(item, index);
            }()),
            d: index
          };
        }),
        b: duration.value,
        c: innerSwiperIndex.value,
        d: common_vendor.o(handleSwiperChange),
        e: common_vendor.o(handleSwiperAnimationFinish)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/00Self/gitee/xkcyy/daydayup/src/components/d-swiper/d-swiper.vue"]]);
wx.createComponent(Component);
