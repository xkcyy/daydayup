"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    common_vendor.ref(0);
    common_vendor.ref([{ a: 1 }]);
    const subjects = [
      {
        id: "redis",
        title: "Redis",
        img: "https://atts.w3cschool.cn/attachments/cover/cover_redis.png?imageView2/1/w/64/h/64&t=1542113432",
        desc: "\u4E00\u4E2A\u9AD8\u6027\u80FD\u7684key-value\u6570\u636E\u5E93\u3002",
        url: "https://xkcyy.github.io/daydayup/dist/build/h5/static/tests/redis.json"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(subjects, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.title),
            c: "/pages/test/test?url=" + encodeURIComponent(item.url || ""),
            d: index,
            e: "1badc801-1-" + i0 + ",1badc801-0",
            f: common_vendor.p({
              index
            })
          };
        }),
        b: common_vendor.p({
          column: 4,
          highlight: true
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"], ["__file", "D:/00Self/gitee/xkcyy/daydayup/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
