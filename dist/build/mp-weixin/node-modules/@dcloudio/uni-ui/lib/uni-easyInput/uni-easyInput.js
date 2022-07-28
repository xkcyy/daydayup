"use strict";var t=require("../../../../../common/vendor.js");function e(t){let e="";for(let o in t){e+=`${o}:${t[o]};`}return e}const o={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm","clear","eyes","change"],model:{prop:"modelValue",event:"update:modelValue"},options:{virtualHost:!0},inject:{form:{from:"uniForm",default:null},formItem:{from:"uniFormItem",default:null}},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:{type:String,default:" "},placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:24},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:()=>({color:"#333",disableColor:"#F7F6F6",borderColor:"#e5e5e5"})},errorMessage:{type:[String,Boolean],default:""}},data:()=>({focused:!1,val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1,focusShow:!1,localMsg:""}),computed:{isVal(){const t=this.val;return!(!t&&0!==t)},msg(){return this.localMsg||this.errorMessage},inputMaxlength(){return Number(this.maxlength)},boxStyle(){return`color:${this.inputBorder&&this.msg?"#e43d33":this.styles.color};`},inputContentClass(){return function(t){let e="";for(let o in t)t[o]&&(e+=`${o} `);return e}({"is-input-border":this.inputBorder,"is-input-error-border":this.inputBorder&&this.msg,"is-textarea":"textarea"===this.type,"is-disabled":this.disabled})},inputContentStyle(){const t=this.focusShow?"#2979ff":this.styles.borderColor;return e({"border-color":(this.inputBorder&&this.msg?"#dd524d":t)||"#e5e5e5","background-color":this.disabled?this.styles.disableColor:"#fff"})},inputStyle(){return e({"padding-right":"password"===this.type||this.clearable||this.prefixIcon?"":"10px","padding-left":this.prefixIcon?"":"10px"})}},watch:{value(t){this.val=t},modelValue(t){this.val=t},focus(t){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))}},created(){this.init(),this.form&&this.formItem&&this.$watch("formItem.errMsg",(t=>{this.localMsg=t}))},mounted(){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))},methods:{init(){this.value||0===this.value?this.val=this.value:this.modelValue||0===this.modelValue?this.val=this.modelValue:this.val=null},onClickIcon(t){this.$emit("iconClick",t)},onEyes(){this.showPassword=!this.showPassword,this.$emit("eyes",this.showPassword)},onInput(t){let e=t.detail.value;this.trim&&("boolean"==typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"==typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus(){this.$nextTick((()=>{this.focused=!0})),this.$emit("focus",null)},_Focus(t){this.focusShow=!0,this.$emit("focus",t)},onBlur(){this.focused=!1,this.$emit("focus",null)},_Blur(t){if(t.detail.value,this.focusShow=!1,this.$emit("blur",t),this.$emit("change",this.val),this.form&&this.formItem){const{validateTrigger:t}=this.form;"blur"===t&&this.formItem.onFieldChange()}},onConfirm(t){this.$emit("confirm",this.val),this.$emit("change",this.val)},onClear(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue",""),this.$emit("clear")},trimStr:(t,e="both")=>"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}};if(!Array){t.resolveComponent("uni-icons")()}Math;var i=t._export_sfc(o,[["render",function(e,o,i,s,r,l){return t.e({a:i.prefixIcon},i.prefixIcon?{b:t.o((t=>l.onClickIcon("prefix"))),c:t.p({type:i.prefixIcon,color:"#c0c4cc",size:"22"})}:{},{d:"textarea"===i.type},"textarea"===i.type?{e:i.inputBorder?1:"",f:i.name,g:r.val,h:i.placeholder,i:i.placeholderStyle,j:i.disabled,k:l.inputMaxlength,l:r.focused,m:i.autoHeight,n:t.o(((...t)=>l.onInput&&l.onInput(...t))),o:t.o(((...t)=>l._Blur&&l._Blur(...t))),p:t.o(((...t)=>l._Focus&&l._Focus(...t))),q:t.o(((...t)=>l.onConfirm&&l.onConfirm(...t)))}:{r:"password"===i.type?"text":i.type,s:t.s(l.inputStyle),t:i.name,v:r.val,w:!r.showPassword&&"password"===i.type,x:i.placeholder,y:i.placeholderStyle,z:i.disabled,A:l.inputMaxlength,B:r.focused,C:i.confirmType,D:t.o(((...t)=>l._Focus&&l._Focus(...t))),E:t.o(((...t)=>l._Blur&&l._Blur(...t))),F:t.o(((...t)=>l.onInput&&l.onInput(...t))),G:t.o(((...t)=>l.onConfirm&&l.onConfirm(...t)))},{H:"password"===i.type&&i.passwordIcon},"password"===i.type&&i.passwordIcon?t.e({I:l.isVal},l.isVal?{J:"textarea"===i.type?1:"",K:t.o(l.onEyes),L:t.p({type:r.showPassword?"eye-slash-filled":"eye-filled",size:22,color:r.focusShow?"#2979ff":"#c0c4cc"})}:{}):i.suffixIcon?t.e({N:i.suffixIcon},i.suffixIcon?{O:t.o((t=>l.onClickIcon("suffix"))),P:t.p({type:i.suffixIcon,color:"#c0c4cc",size:"22"})}:{}):t.e({Q:i.clearable&&l.isVal&&!i.disabled&&"textarea"!==i.type},i.clearable&&l.isVal&&!i.disabled&&"textarea"!==i.type?{R:"textarea"===i.type?1:"",S:t.o(l.onClear),T:t.p({type:"clear",size:i.clearSize,color:l.msg?"#dd524d":r.focusShow?"#2979ff":"#c0c4cc"})}:{}),{M:i.suffixIcon,U:t.n(l.inputContentClass),V:t.s(l.inputContentStyle),W:l.msg?1:"",X:t.s(l.boxStyle)})}]]);wx.createComponent(i);
