"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    list: { type: Array, default: () => [], required: true },
    dataIndex: { type: Number, default: 0 },
    vertical: { type: Boolean, default: false },
    duration: { type: Number, default: 250 },
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 5e3 },
    easingFunction: { type: String, default: "default" },
    getPreviousHandler: { type: Function },
    getNextHandler: { type: Function }
  },
  emits: ["animationfinish", "transition", "indexesChange", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const params = common_vendor.reactive({
      dataLength: 0,
      swiperCurrent: 0,
      swiperList: [],
      current: 0,
      touchStartObj: {},
      disableTouch: false
    });
    const test = function(index) {
      console.log("test...", index, props.list[index]);
    };
    const useTouchMove = function(params2, props2) {
      const touchStartObj2 = common_vendor.reactive({
        pageX: 0,
        pageY: 0
      });
      const touchStart2 = function(e) {
        const item = e.changedTouches[0];
        touchStartObj2.pageX = item.pageX;
        touchStartObj2.pageY = item.pageY;
      };
      const touchMove2 = function(e) {
        var moveObj = e.changedTouches[0];
        var current2 = params2.current;
        var vertical = props2.vertical;
        var dataLength2 = params2.dataLength;
        var preDir = vertical ? moveObj.pageY - touchStartObj2.pageY > 0 : moveObj.pageX - touchStartObj2.pageX > 0;
        var nextDir = vertical ? moveObj.pageY - touchStartObj2.pageY < 0 : moveObj.pageX - touchStartObj2.pageX < 0;
        if (current2 == 0 && preDir) {
          params2.disableTouch = true;
          return false;
        } else if (current2 == dataLength2 - 1 && nextDir) {
          params2.disableTouch = true;
          return false;
        }
      };
      const touchEnd2 = function() {
        params2.disableTouch = false;
      };
      return {
        touchStart: touchStart2,
        touchMove: touchMove2,
        touchEnd: touchEnd2
      };
    };
    const refSwiper = common_vendor.ref(null);
    const { dataLength, swiperCurrent, swiperList, current, touchStartObj, disableTouch } = common_vendor.toRefs(params);
    const { touchStart, touchMove, touchEnd } = useTouchMove(params, props);
    const animationfinish = (e) => emits("animationfinish", e);
    const transition = (e) => emits("transition", e);
    const handleList = function(index) {
      switch (index) {
        case 0:
          swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
          swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1;
          break;
        case 1:
          swiperList.value[2] = (swiperList.value[1] + 1) % dataLength.value;
          swiperList.value[0] = swiperList.value[1] == 0 ? dataLength.value - 1 : swiperList.value[1] - 1;
          break;
        case 2:
          swiperList.value[0] = (swiperList.value[2] + 1) % dataLength.value;
          swiperList.value[1] = swiperList.value[2] == 0 ? dataLength.value - 1 : swiperList.value[2] - 1;
          break;
        default:
          swiperList.value[0] = props.dataIndex;
          swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
          swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1;
      }
      emits("indexesChange", swiperList.value);
    };
    const handleListDataIndexChange = function() {
      let index = swiperCurrent.value;
      switch (index) {
        case 0:
          swiperList.value[0] = props.dataIndex;
          swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
          swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1;
          break;
        case 1:
          swiperList.value[1] = props.dataIndex;
          swiperList.value[2] = (swiperList.value[1] + 1) % dataLength.value;
          swiperList.value[0] = swiperList.value[1] == 0 ? dataLength.value - 1 : swiperList.value[1] - 1;
          break;
        case 2:
          swiperList.value[2] = props.dataIndex;
          swiperList.value[0] = (swiperList.value[2] + 1) % dataLength.value;
          swiperList.value[1] = swiperList.value[2] == 0 ? dataLength.value - 1 : swiperList.value[2] - 1;
          break;
        default:
          swiperList.value[0] = props.dataIndex;
          swiperList.value[1] = (swiperList.value[0] + 1) % dataLength.value;
          swiperList.value[2] = swiperList.value[0] == 0 ? dataLength.value - 1 : swiperList.value[0] - 1;
      }
      emits("indexesChange", swiperList.value);
    };
    const insertPrevious = function() {
      current.value++;
      swiperList.value[swiperCurrent.value]++;
      handleList(swiperCurrent.value);
    };
    const change = async function(e) {
      const cur = e.detail.current;
      swiperCurrent.value = cur;
      handleList(cur);
      current.value = swiperList.value[cur];
      if (current.value == 0 && props.getPreviousHandler) {
        let hasPrevious = await props.getPreviousHandler();
        if (hasPrevious) {
          insertPrevious();
        }
      } else if (current.value == dataLength.value - 1 && props.getNextHandler) {
        await props.getNextHandler();
      }
      emits("change", current.value);
    };
    const swiperCurrentChange = function(newVal, oldVal, vm) {
      const swiper = refSwiper.value;
      swiper.currentChangeSource = "autoplay";
      swiper.currentSync = newVal;
    };
    common_vendor.watch(() => props.dataIndex, () => {
      current.value = props.dataIndex;
      emits("change", current.value);
      handleListDataIndexChange();
    }, { immediate: true });
    common_vendor.watch(() => props.list, () => {
      dataLength.value = props.list.length;
      if (dataLength.value) {
        handleList(swiperCurrent.value);
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(3, (item, index, i0) => {
          return common_vendor.e({
            a: __props.list[common_vendor.unref(swiperList)[index]]
          }, __props.list[common_vendor.unref(swiperList)[index]] ? {
            b: "d-" + i0,
            c: common_vendor.r("d", {
              item: __props.list[common_vendor.unref(swiperList)[index]],
              index: common_vendor.unref(swiperList)[index]
            }, i0)
          } : {}, {
            d: common_vendor.t(test(index)),
            e: index
          });
        }),
        b: __props.vertical,
        c: common_vendor.unref(current),
        d: common_vendor.unref(dataLength),
        e: common_vendor.o((...args) => common_vendor.unref(touchStart) && common_vendor.unref(touchStart)(...args)),
        f: common_vendor.o((...args) => common_vendor.unref(touchMove) && common_vendor.unref(touchMove)(...args)),
        g: common_vendor.o((...args) => common_vendor.unref(touchEnd) && common_vendor.unref(touchEnd)(...args)),
        h: common_vendor.t(test(-1)),
        i: common_vendor.unref(swiperCurrent),
        j: swiperCurrentChange,
        k: common_vendor.o(change),
        l: common_vendor.o(transition),
        m: common_vendor.o(animationfinish),
        n: common_vendor.unref(disableTouch),
        o: __props.vertical,
        p: __props.duration,
        q: __props.autoplay,
        r: __props.interval,
        s: __props.easingFunction
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70f1e858"], ["__file", "D:/00Self/gitee/xkcyy/daydayup/src/components/d-swiper/d-swiper3.vue"]]);
wx.createComponent(Component);
