import{o as t,c as e,w as i,a as s,r,n as d,b as o,d as a,i as l,e as h,f as n,g as c,h as u,j as g,k as p,F as f,l as m,m as _,p as b,q as w,t as y,s as x}from"./index.8fad8349.js";import{_ as v}from"./plugin-vue_export-helper.21dcd24c.js";var C=v({name:"UniGridItem",inject:["grid"],props:{index:{type:Number,default:0}},data:()=>({column:0,showBorder:!0,square:!0,highlight:!0,left:0,top:0,openNum:2,width:0,borderColor:"#e5e5e5"}),created(){this.column=this.grid.column,this.showBorder=this.grid.showBorder,this.square=this.grid.square,this.highlight=this.grid.highlight,this.top=0===this.hor?this.grid.hor:this.hor,this.left=0===this.ver?this.grid.ver:this.ver,this.borderColor=this.grid.borderColor,this.grid.children.push(this),this.width=this.grid.width},beforeDestroy(){this.grid.children.forEach(((t,e)=>{t===this&&this.grid.children.splice(e,1)}))},methods:{_onClick(){this.grid.change({detail:{index:this.index}})}}},[["render",function(h,n,c,u,g,p){const f=l;return g.width?(t(),e(f,{key:0,style:o("width:"+g.width+";"+(g.square?"height:"+g.width:"")),class:"uni-grid-item"},{default:i((()=>[s(f,{class:d([{"uni-grid-item--border":g.showBorder,"uni-grid-item--border-top":g.showBorder&&c.index<g.column,"uni-highlight":g.highlight},"uni-grid-item__box"]),style:o({"border-right-color":g.borderColor,"border-bottom-color":g.borderColor,"border-top-color":g.borderColor}),onClick:p._onClick},{default:i((()=>[r(h.$slots,"default",{},void 0,!0)])),_:3},8,["class","style","onClick"])])),_:3},8,["style"])):a("v-if",!0)}],["__scopeId","data-v-05fe0c65"]]);var k=v({name:"UniGrid",emits:["change"],props:{column:{type:Number,default:3},showBorder:{type:Boolean,default:!0},borderColor:{type:String,default:"#D2D2D2"},square:{type:Boolean,default:!0},highlight:{type:Boolean,default:!0}},provide(){return{grid:this}},data:()=>({elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,width:0}),created(){this.children=[]},mounted(){this.$nextTick((()=>{this.init()}))},methods:{init(){setTimeout((()=>{this._getSize((t=>{this.children.forEach(((e,i)=>{e.width=t}))}))}),50)},change(t){this.$emit("change",t)},_getSize(t){h().in(this).select(`#${this.elId}`).boundingClientRect().exec((e=>{this.width=parseInt((e[0].width-1)/this.column)+"px",t(this.width)}))}}},[["render",function(a,h,n,c,u,g){const p=l;return t(),e(p,{class:"uni-grid-wrap"},{default:i((()=>[s(p,{id:u.elId,ref:"uni-grid",class:d(["uni-grid",{"uni-grid--border":n.showBorder}]),style:o({"border-left-color":n.borderColor})},{default:i((()=>[r(a.$slots,"default",{},void 0,!0)])),_:3},8,["id","class","style"])])),_:3})}],["__scopeId","data-v-4d62c72c"]]);var B=v(n({setup(r){c(0),c([{a:1}]);const d=[{id:"redis",title:"Redis",img:"https://atts.w3cschool.cn/attachments/cover/cover_redis.png?imageView2/1/w/64/h/64&t=1542113432",desc:"一个高性能的key-value数据库。",url:"https://xkcyy.github.io/daydayup/dist/build/h5/static/tests/redis.json"}];return(r,o)=>{const h=m,n=l,c=_,v=x,B=b(w("uni-grid-item"),C),I=b(w("uni-grid"),k);return t(),e(n,null,{default:i((()=>[s(n,{class:"page_header"},{default:i((()=>[s(n,{class:"header_content"},{default:i((()=>[s(n,{class:"left"},{default:i((()=>[s(h,{class:"title"},{default:i((()=>[u("好好学习,天天向上")])),_:1}),s(h,{class:"sub_title"},{default:i((()=>[u("每天进步一点点，轻松得来终觉浅")])),_:1}),s(h,{class:"btn"},{default:i((()=>[u("加油")])),_:1})])),_:1}),s(n,null,{default:i((()=>[s(c,{src:"./static/right.png",style:{width:"131px",height:"122px"}})])),_:1})])),_:1})])),_:1}),s(n,{class:"page_content"},{default:i((()=>[s(I,{column:4,highlight:!0},{default:i((()=>[(t(),g(f,null,p(d,((t,e)=>s(B,{index:e,key:e},{default:i((()=>[s(n,{style:{"background-color":"#fff",height:"100%"}},{default:i((()=>[a(' <uni-icons type="image" :size="30" color="#777" /> '),s(v,{class:"grid-item-box",url:"/pages/test/test?url="+encodeURIComponent(t.url||""),animationType:"pop-in",animationDuration:"200"},{default:i((()=>[s(c,{class:"img",style:{width:"100rpx",height:"100rpx","background-color":"#eeeeee"},mode:"aspectFit",src:t.img},null,8,["src"]),s(h,{class:"text"},{default:i((()=>[u(y(t.title),1)])),_:2},1024)])),_:2},1032,["url"])])),_:2},1024)])),_:2},1032,["index"]))),64))])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-68daff30"]]);export{B as default};
