"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    dataSource: { type: Array, required: true },
    current: { type: Number, default: 0 },
    renderSize: { type: Number, default: 3 },
    vertical: { type: Boolean, default: false },
    circular: { type: Boolean, default: false }
  },
  emits: ["update:current", "change", "animationfinish"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const dataSourceLength = common_vendor.computed$1(() => props.dataSource.length);
    const duration = common_vendor.ref(300);
    const disableTouch = common_vendor.ref(false);
    const innerSwiperLength = 3;
    const innerSwiperIndexList = common_vendor.ref([]);
    const innerSwiperIndex = common_vendor.ref(0);
    const touchStartObj = common_vendor.reactive({ pageX: 0, pageY: 0 });
    const currentIndex = common_vendor.computed$1(() => innerSwiperIndexList.value[innerSwiperIndex.value]);
    common_vendor.watch(() => props.dataSource, () => {
      innerSwiperIndexList.value = [innerSwiperIndex.value = 0, 1, props.dataSource.length - 1];
    }, { immediate: true });
    common_vendor.watch(() => props.current, () => {
      if (props.current !== currentIndex.value) {
        const nextIdx = props.current > currentIndex.value ? (innerSwiperIndex.value + 1) % innerSwiperLength : (innerSwiperIndex.value - 1 + innerSwiperLength) % innerSwiperLength;
        innerSwiperIndex.value = nextIdx;
        if (nextIdx != props.current) {
          innerSwiperIndexList.value[nextIdx] = props.current;
        }
        updateInnerSwiperIndexList(nextIdx);
      }
    });
    const updateInnerSwiperIndexList = function(index) {
      const dateLen = props.dataSource.length;
      if (index >= 0 && index < 3) {
        innerSwiperIndexList.value[(index + 1) % 3] = (innerSwiperIndexList.value[index] + 1) % dateLen;
        innerSwiperIndexList.value[(index + 3 - 1) % 3] = (innerSwiperIndexList.value[index] + dateLen - 1) % dateLen;
      }
    };
    const handleSwiperChange = function(e) {
      let cur = e.detail.current;
      const outIdx = innerSwiperIndexList.value[cur];
      updateInnerSwiperIndexList(cur);
      emits("update:current", outIdx);
      innerSwiperIndex.value = cur;
      emits("change", outIdx);
    };
    const handleTouchStart = function(e) {
      const item = e.changedTouches[0];
      touchStartObj.pageX = item.pageX;
      touchStartObj.pageY = item.pageY;
    };
    const handleTouchMove = function(e) {
      console.log(currentIndex.value);
      if (props.circular)
        return;
      var targetPos = e.changedTouches[0];
      var vertical = props.vertical;
      var preDir = vertical ? targetPos.pageY > touchStartObj.pageY : targetPos.pageX > touchStartObj.pageX;
      var nextDir = vertical ? targetPos.pageY < touchStartObj.pageY : targetPos.pageX < touchStartObj.pageX;
      if (currentIndex.value == 0 && preDir) {
        disableTouch.value = true;
        e && e.stopPropagation && e.stopPropagation();
        return false;
      } else if (currentIndex.value == dataSourceLength.value - 1 && nextDir) {
        disableTouch.value = true;
        e && e.stopPropagation && e.stopPropagation();
        return false;
      }
    };
    const handleTouchEnd = function() {
      disableTouch.value = false;
    };
    const handleAnimationfinish = function() {
      emits("animationfinish");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              index: innerSwiperIndexList.value[index],
              item: __props.dataSource[innerSwiperIndexList.value[index]]
            }, i0),
            c: index
          };
        }),
        b: common_vendor.o(handleTouchStart),
        c: common_vendor.o(handleTouchMove),
        d: common_vendor.o(handleTouchEnd),
        e: duration.value,
        f: innerSwiperIndex.value,
        g: disableTouch.value,
        h: common_vendor.o(handleSwiperChange),
        i: common_vendor.o(handleAnimationfinish)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/00Self/gitee/xkcyy/daydayup/src/components/d-swiper/d-swiper.vue"]]);
wx.createComponent(Component);
