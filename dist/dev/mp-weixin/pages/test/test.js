"use strict";
var common_vendor = require("../../common/vendor.js");
var services_score = require("../../services/score.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_easyInput2 = common_vendor.resolveComponent("uni-easyInput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_tag2 + _easycom_uni_easyInput2 + _easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_popup2)();
}
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_easyInput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyInput/uni-easyInput.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_easyInput + _easycom_uni_icons + DSwiper + _easycom_uni_card + _easycom_uni_popup)();
}
const DSwiper = () => "../../components/d-swiper/d-swiper.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const dataSource = common_vendor.ref(new Array());
    const focusSource = common_vendor.ref(new Array());
    const current = common_vendor.ref(0);
    const refSwiper = common_vendor.ref({});
    const refPopupTestResult = common_vendor.ref(null);
    common_vendor.ref({});
    function handleBlur(index) {
      focusSource.value[index] = false;
      console.log("blur");
    }
    function handleChange(index) {
      current.value = index;
      common_vendor.index.setNavigationBarTitle({
        title: index + 1 + "/" + dataSource.value.length
      });
      for (let i = 0; i < dataSource.value.length; i++) {
        focusSource.value[i] = false;
      }
      focusSource.value[index] = true;
    }
    function submit() {
      const topics = dataSource.value.map((x) => {
        return {
          index: parseInt(x.id),
          success: x.answerCorrect || false
        };
      });
      services_score.updateSujectScores("redis", topics);
      const score = Math.round(countResult.value.success * 100 / dataSource.value.length);
      common_vendor.index.showModal({
        content: score + "\u5206",
        cancelText: "\u5173\u95ED",
        confirmText: "\u518D\u6765\u4E00\u6B21",
        success: function() {
          common_vendor.index.navigateBack();
        },
        fail: function() {
          common_vendor.index.navigateBack();
        }
      });
    }
    common_vendor.onMounted(() => {
      const routes = getCurrentPages();
      const route = routes[routes.length - 1];
      const url = decodeURIComponent((route.options || route.$page.options).url);
      common_vendor.index.showLoading({ title: "\u52A0\u8F7D\u4E2D..." });
      services_score.fetchSubjectRandom({ url, name: "redis", random: true, top: 10 }).then((res) => {
        dataSource.value = res;
        focusSource.value = res.map((x) => false);
        focusSource.value[0] = true;
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    });
    function handleInputConfirm(question, index) {
      question.filled = true;
      if (question.type == 3) {
        const an = question.answer.replaceAll("\u3001", ",").replaceAll("\uFF0C", ",").split(",").sort().join(",");
        const ipt = (question.answerResult || "").replaceAll("\u3001", ",").replaceAll("\uFF0C", ",").split(",").sort().join(",");
        question.answerCorrect = an == ipt;
      }
      console.log(current.value);
      if (current.value == focusSource.value.length - 1) {
        submit();
      } else if (question.answerCorrect) {
        setTimeout(() => {
          current.value += 1;
        }, 300);
      }
    }
    function handleAnimationfinish() {
      for (let i = 0; i < dataSource.value.length; i++) {
        focusSource.value[i] = false;
      }
      focusSource.value[current.value] = true;
    }
    const countResult = common_vendor.computed$1(() => {
      let [success, error] = [0, 0];
      dataSource.value.forEach((item) => {
        if (item.filled) {
          if (item.answerCorrect)
            success++;
          else
            error++;
        }
      });
      return {
        success,
        error
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: dataSource.value.length
      }, dataSource.value.length ? {
        b: common_vendor.w((context, s0, i0) => {
          return common_vendor.e({
            a: context.item.type == 3
          }, context.item.type == 3 ? common_vendor.e({
            b: "2664db0e-1-" + i0 + ",2664db0e-0",
            c: common_vendor.p({
              size: "small",
              text: "\u586B\u7A7A\u9898",
              type: "primary"
            }),
            d: common_vendor.t(context.index + 1),
            e: common_vendor.t(context.item.title),
            f: common_vendor.o(($event) => handleBlur(context.index)),
            g: common_vendor.o(($event) => handleInputConfirm(context.item, context.index)),
            h: "2664db0e-2-" + i0 + ",2664db0e-0",
            i: common_vendor.o(($event) => context.item.answerResult = $event),
            j: common_vendor.p({
              focus: focusSource.value[context.index],
              disabled: context.item.filled,
              placeholder: "",
              modelValue: context.item.answerResult
            }),
            k: context.item.filled
          }, context.item.filled ? common_vendor.e({
            l: context.item.filled
          }, context.item.filled ? common_vendor.e({
            m: !context.item.answerCorrect
          }, !context.item.answerCorrect ? {
            n: "2664db0e-3-" + i0 + ",2664db0e-0",
            o: common_vendor.p({
              type: "clear",
              size: "38",
              color: "#f84d27"
            })
          } : {
            p: "2664db0e-4-" + i0 + ",2664db0e-0",
            q: common_vendor.p({
              type: "checkbox-filled",
              size: "38",
              color: "#18bc37"
            })
          }) : {}, {
            r: common_vendor.t(context.item.answer)
          }) : {}, {
            s: context.item.filled && context.item.answerResult
          }, context.item.filled && context.item.answerResult ? {
            t: common_vendor.t(context.item.answerDoubt)
          } : {}) : {}, {
            v: i0,
            w: s0
          });
        }, {
          name: "d",
          path: "b",
          vueId: "2664db0e-0"
        }),
        c: common_vendor.sr(refSwiper, "2664db0e-0", {
          "k": "refSwiper"
        }),
        d: common_vendor.o(handleAnimationfinish),
        e: common_vendor.o(handleChange),
        f: common_vendor.o(($event) => current.value = $event),
        g: common_vendor.p({
          dataSource: dataSource.value,
          current: current.value
        }),
        h: common_vendor.p({
          type: "checkbox-filled",
          size: "18",
          color: "#0089ff"
        }),
        i: common_vendor.t(common_vendor.unref(countResult).success),
        j: common_vendor.p({
          type: "clear",
          size: "18",
          color: "#f84d27"
        }),
        k: common_vendor.t(common_vendor.unref(countResult).error),
        l: common_vendor.p({
          type: "checkbox-filled",
          size: "18",
          color: "#0089ff"
        }),
        m: common_vendor.t(common_vendor.unref(countResult).success),
        n: common_vendor.p({
          type: "clear",
          size: "18",
          color: "#f84d27"
        }),
        o: common_vendor.t(common_vendor.unref(countResult).error),
        p: common_vendor.p({
          type: "pengyouquan",
          size: "18",
          color: "#999"
        }),
        q: common_vendor.p({
          type: "chatbubble",
          size: "18",
          color: "#999"
        }),
        r: common_vendor.sr(refPopupTestResult, "2664db0e-7", {
          "k": "refPopupTestResult"
        }),
        s: common_vendor.p({
          ["background-color"]: "#fff"
        })
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/00Self/gitee/xkcyy/daydayup/src/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
