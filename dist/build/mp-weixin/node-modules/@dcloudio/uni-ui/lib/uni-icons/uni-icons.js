"use strict";var e=require("../../../../../common/vendor.js");const t={name:"UniIcons",emits:["click"],props:{type:{type:String,default:""},color:{type:String,default:"#333333"},size:{type:[Number,String],default:16},customPrefix:{type:String,default:""}},data:()=>({icons:e.icons.glyphs}),computed:{unicode(){let e=this.icons.find((e=>e.font_class===this.type));return e?unescape(`%u${e.unicode}`):""},iconSize(){return"number"==typeof(e=this.size)||/^[0-9]*$/g.test(e)?e+"px":e;var e}},methods:{_onClick(){this.$emit("click")}}};var i=e._export_sfc(t,[["render",function(t,i,n,o,c,r){return{a:n.color,b:r.iconSize,c:e.n("uniui-"+n.type),d:e.n(n.customPrefix),e:e.n(n.customPrefix?n.type:""),f:e.o(((...e)=>r._onClick&&r._onClick(...e)))}}]]);wx.createComponent(i);
