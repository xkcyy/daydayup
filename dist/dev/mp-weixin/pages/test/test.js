"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_easyInput2 = common_vendor.resolveComponent("uni-easyInput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_tag2 + _easycom_uni_easyInput2 + _easycom_uni_icons2)();
}
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_easyInput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyInput/uni-easyInput.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_easyInput + _easycom_uni_icons + DSwiper3)();
}
const DSwiper3 = () => "../../components/d-swiper/d-swiper3.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const dataSource = common_vendor.ref(new Array());
    const current = common_vendor.ref(0);
    function handleChange(e) {
      common_vendor.index.setNavigationBarTitle({
        title: current.value + 1 + "/" + dataSource.value.length
      });
    }
    common_vendor.onMounted(() => {
      const routes = getCurrentPages();
      const route = routes[routes.length - 1];
      const url = decodeURIComponent((route.options || route.$page.options).url);
      common_vendor.index.showLoading({ title: "\u52A0\u8F7D\u4E2D..." });
      common_vendor.index.request({
        url,
        success: (res) => {
          const arr = res.data.questions;
          for (let i = 0; i < arr.length; i++) {
            const idx = Math.ceil(Math.random() * (arr.length - i)) % (arr.length - i) + i;
            const newValue = arr[idx];
            arr[idx] = arr[i];
            arr[i] = newValue;
            newValue.id = 100 + i;
          }
          dataSource.value = arr;
          common_vendor.index.hideLoading();
          handleChange();
        },
        fail: () => {
          common_vendor.index.hideLoading();
        }
      });
    });
    function handleInputConfirm(question, index) {
      question.filled = true;
      if (question.type == 3) {
        const an = question.answer.replaceAll("\u3001", ",").replaceAll("\uFF0C", ",").split(",").sort().join(",");
        const ipt = (question.answerResult || "").replaceAll("\u3001", ",").replaceAll("\uFF0C", ",").split(",").sort().join(",");
        question.answerCorrect = an == ipt;
      }
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
            f: context.index % 2
          }, context.index % 2 ? {
            g: common_vendor.o(($event) => handleInputConfirm(context.item, context.index)),
            h: "2664db0e-2-" + i0 + ",2664db0e-0",
            i: common_vendor.o(($event) => context.item.answerResult = $event),
            j: common_vendor.p({
              disabled: context.item.filled,
              placeholder: "",
              modelValue: context.item.answerResult
            })
          } : {
            k: common_vendor.o(($event) => handleInputConfirm(context.item, context.index)),
            l: "2664db0e-3-" + i0 + ",2664db0e-0",
            m: common_vendor.o(($event) => context.item.answerResult = $event),
            n: common_vendor.p({
              disabled: context.item.filled,
              placeholder: "",
              modelValue: context.item.answerResult
            })
          }, {
            o: context.item.filled
          }, context.item.filled ? common_vendor.e({
            p: context.item.filled
          }, context.item.filled ? common_vendor.e({
            q: !context.item.answerCorrect
          }, !context.item.answerCorrect ? {
            r: "2664db0e-4-" + i0 + ",2664db0e-0",
            s: common_vendor.p({
              type: "clear",
              size: "38",
              color: "#f84d27"
            })
          } : {
            t: "2664db0e-5-" + i0 + ",2664db0e-0",
            v: common_vendor.p({
              type: "checkbox-filled",
              size: "38",
              color: "#18bc37"
            })
          }) : {}, {
            w: common_vendor.t(context.item.answer)
          }) : {}, {
            x: context.item.filled && context.item.answerResult
          }, context.item.filled && context.item.answerResult ? {
            y: common_vendor.t(context.item.answerDoubt)
          } : {}) : {}, {
            z: i0,
            A: s0
          });
        }, {
          name: "d",
          path: "b",
          vueId: "2664db0e-0"
        }),
        c: common_vendor.p({
          list: dataSource.value
        }),
        d: common_vendor.p({
          type: "checkbox-filled",
          size: "18",
          color: "#0089ff"
        }),
        e: common_vendor.t(common_vendor.unref(countResult).success),
        f: common_vendor.p({
          type: "clear",
          size: "18",
          color: "#f84d27"
        }),
        g: common_vendor.t(common_vendor.unref(countResult).error)
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/00Self/gitee/xkcyy/daydayup/src/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
