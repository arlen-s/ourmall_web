(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSettingProductCategory"],{"308b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"setting-page"},[s("el-scrollbar",{staticClass:"left"},[s("div",{staticClass:"content"},[s("h1",{on:{click:t.goBack}},[s("el-link",{attrs:{icon:"el-icon-arrow-left",underline:!1}},[t._v(t._s(t.$t("storeSetting.商品类目")))])],1),s("div",{staticClass:"change-content"},[s("div",[t._v(t._s(t.$t("storeSetting.商品类目"))+" "+t._s(t.setting.categorys.length)+"/"+t._s(t.setting.cntPerRows*this.setting.rows))]),s("div",{staticClass:"category-p"},[t._v(t._s(t.$t("storeSetting.如需更换分类封面图可前往商品分类管理进行配置"))+" "),s("router-link",{attrs:{to:"/category-mgr"}},[t._v(t._s(t.$t("storeSetting.立即前往")))])],1),s("draggable",{attrs:{handle:".draggable-i"},model:{value:t.setting.categorys,callback:function(e){t.$set(t.setting,"categorys",e)},expression:"setting.categorys"}},t._l(t.setting.categorys,(function(e,i){return s("div",{key:i,staticClass:"category-select draggable-i"},[s("i",{staticClass:"iconfont icon-draggable"}),s("el-image",{staticClass:"mg-l-5 img",attrs:{src:e.themeUrl,fit:"contain"}}),s("div",{staticClass:"mg-l-5 name"},[t._v(t._s(e.name))]),s("i",{staticClass:"delete el-icon-delete",on:{click:function(e){return t.deleteCategory(i)}}})],1)})),0),t.selectedIds.length<t.setting.rows*t.setting.cntPerRows?s("div",{staticClass:"add-category",on:{click:t.addCategory}},[s("i",{staticClass:"el-icon-circle-plus"}),s("div",{staticClass:"mg-l-5"},[t._v(t._s(t.$t("storeSetting.添加商品分类")))])]):s("div",{staticClass:"notice"},[t._v(" "+t._s(t.$t("storeSetting.类目已经达到上限请先删除再添加"))+" ")])],1),s("div",{staticClass:"change-content mt-20"},[s("el-form",{ref:"category-form",attrs:{size:"mini"}},[s("el-form-item",{attrs:{label:t.$t("storeSetting.标题")}},[s("el-input",{staticStyle:{width:"210px"},model:{value:t.setting.title,callback:function(e){t.$set(t.setting,"title",e)},expression:"setting.title"}})],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.展示排数(最多可展示4排)")}},[s("el-input-number",{staticStyle:{width:"210px"},attrs:{"controls-position":"right",min:1,max:4},on:{change:t.rowsChange},model:{value:t.setting.rows,callback:function(e){t.$set(t.setting,"rows",e)},expression:"setting.rows"}})],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.每排展示个数(每排最多可展示4排)")}},[s("el-input-number",{staticStyle:{width:"210px"},attrs:{"controls-position":"right",min:1,max:4},on:{change:t.perChange},model:{value:t.setting.cntPerRows,callback:function(e){t.$set(t.setting,"cntPerRows",e)},expression:"setting.cntPerRows"}})],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.更多按钮文案")}},[s("el-input",{staticStyle:{width:"210px"},model:{value:t.setting.moreText,callback:function(e){t.$set(t.setting,"moreText",e)},expression:"setting.moreText"}})],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.图片比例")}},[s("el-select",{staticStyle:{width:"210px"},model:{value:t.setting.proportion,callback:function(e){t.$set(t.setting,"proportion",e)},expression:"setting.proportion"}},[s("el-option",{attrs:{value:"1",label:"1:1"}}),s("el-option",{attrs:{value:"1.5",label:"2:3"}}),s("el-option",{attrs:{value:"0.666",label:"3:2"}}),s("el-option",{attrs:{value:"1.333",label:"3:4"}}),s("el-option",{attrs:{value:"0.75",label:"4:3"}})],1)],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.图片填充方式")}},[s("el-select",{staticStyle:{width:"210px"},model:{value:t.setting.fillWay,callback:function(e){t.$set(t.setting,"fillWay",e)},expression:"setting.fillWay"}},[s("el-option",{attrs:{value:"fill",label:"$t('storeSetting.填充')"}}),s("el-option",{attrs:{value:"contain",label:"$t('storeSetting.适应')"}})],1)],1),s("el-form-item",{attrs:{label:t.$t("storeSetting.链接打开方式")}},[s("el-radio-group",{model:{value:t.setting.target,callback:function(e){t.$set(t.setting,"target",e)},expression:"setting.target"}},[s("el-radio",{attrs:{label:"_self"}},[t._v(t._s(t.$t("storeSetting.当前页面打开链接")))]),s("el-radio",{attrs:{label:"_blank"}},[t._v(t._s(t.$t("storeSetting.新开窗口打开链接")))])],1)],1)],1)],1)])]),s("div",{staticClass:"action"},[s("el-button",{attrs:{type:"danger",size:"medium"},on:{click:t.del}},[t._v(t._s(t.$t("storeSetting.删除该组件")))]),s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.saveData}},[t._v(t._s(t.$t("storeSetting.完成")))])],1),s("el-scrollbar",{ref:"rightBox",staticClass:"right"},[s("div",{staticClass:"content"},[s("demoHeader",{attrs:{data:t.$store.state.configJson.header,headerMenu:t.headerMenu}}),s("demoBody",{attrs:{data:t.setting,header:t.$store.state.configJson.header}}),s("demoFooter",{attrs:{setting:t.$store.state.configJson.footer}})],1)]),s("el-dialog",{attrs:{title:t.$t("storeSetting.商品分类"),width:"300px",visible:t.addCategoryVisible},on:{"update:visible":function(e){t.addCategoryVisible=e}}},[s("div",{staticClass:"dialog-area"},[s("div",{staticClass:"search"},[s("el-input",{attrs:{size:"mini","suffix-icon":"el-icon-search"},on:{input:t.searchCategory},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),s("el-scrollbar",[t.displayItems.length>0?s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.cLoading,expression:"cLoading"}],staticClass:"item-area"},[t._l(t.displayItems,(function(e,i){return[-1==t.selectedIds.indexOf(e.id)?s("div",{key:i},[s("div",{staticClass:"item-list"},[s("div",{staticClass:"left"},[s("el-image",{staticClass:"image",attrs:{fit:"contain",src:e.themeUrl}}),s("div",{staticClass:"name"},[t._v(t._s(e.name))])],1),s("div",[s("el-checkbox",{attrs:{label:e},model:{value:t.selectedItems,callback:function(e){t.selectedItems=e},expression:"selectedItems"}},[s("div",{staticStyle:{display:"none"}},[t._v("1")])])],1)]),s("el-divider")],1):t._e()]})),t.selectedIds.length==t.displayItems.length?s("div",{staticClass:"no-category"},[t._v(" "+t._s(t.$t("storeSetting.暂无更多类目"))+" ")]):t._e(),s("div",{staticStyle:{height:"20px"}})],2):t._e()]),0==t.displayItems.length?s("div",{staticClass:"no-category"},[t._v(" "+t._s(t.$t("storeSetting.暂无类目"))+" "),s("router-link",{attrs:{to:"/category-mgr"}},[t._v(t._s(t.$t("storeSetting.前去添加")))])],1):t._e(),s("div",{staticClass:"control"},[s("router-link",{staticClass:"mg-r-20",attrs:{to:"/category-mgr"}},[t._v(t._s(t.$t("storeSetting.管理商品类目")))]),s("i",{staticClass:"refresh mg-r-20 el-icon-refresh",on:{click:t.getCategory}}),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.addCategoryHandle}},[t._v(t._s(t.$t("storeSetting.添加"))+" ")])],1)],1)])],1)},n=[],r=s("6c65"),o=(s("0d90"),s("5ad0"),s("cf33"),s("bab0"),s("e456"),s("af46"),s("1baf"),s("c792"),s("4f85")),a=s("826e"),c=s("db46"),l=s("8c3c"),g=s("3335"),d=s.n(g),u={data:function(){return{keyword:"",selectedIds:[],cLoading:!1,selectedItems:[],headerMenu:[],addCategoryVisible:!1,editorOption:{modules:{syntax:{highlight:function(t){return hljs.highlightAuto(t).value}},toolbar:{container:[["bold","italic","underline","strike"]]}},placeholder:this.$t("goodsEdit.编辑商品描述")},isSave:!1,setting:{cid:this.$route.query.cid,type:"productCategory",title:"",rows:2,cntPerRows:3,moreText:"",proportion:"1",fillWay:"cover",target:"_blank",categorys:[]},items:[],exist:!1,displayItems:[]}},components:{Category:o["a"],demoHeader:a["a"],draggable:d.a,demoBody:l["a"],demoFooter:c["a"]},beforeRouteLeave:function(t,e,s){if(this.isSave)s();else{var i=confirm(this.$t("logistics.当前页面还未保存，确定要离开吗?"));i?s():s(!1)}},created:function(){this.getCategory()},methods:{rowsChange:function(t,e){t*this.setting.cntPerRows<this.setting.categorys.length&&(this.setting.categorys.splice(t*this.setting.cntPerRows-1,this.setting.categorys.length-t*this.setting.cntPerRows),this.selectedIds.splice(t*this.setting.cntPerRows-1,this.selectedIds.length-t*this.setting.cntPerRows))},perChange:function(t,e){t*this.setting.rows<this.setting.categorys.length&&(this.setting.categorys.splice(t*this.setting.rows-1,this.setting.categorys.length-t*this.setting.rows),this.selectedIds.splice(t*this.setting.rows-1,this.selectedIds.length-t*this.setting.rows))},del:function(){var t=this;this.isSave=!0,this.$store.commit("delComponent",this.setting.cid),this.setting=JSON.parse(JSON.stringify(this.$store.state.configJson)),this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){9999==e.ErrorCode?(t.$elementMessage("删除成功","success"),t.$router.replace({name:"storeSettingMain"})):t.$message({message:e.Message,type:"error"})}))},deleteCategory:function(t){this.selectedIds.splice(t,1),this.setting.categorys.splice(t,1)},searchCategory:function(t){var e=[];this.items.forEach((function(s){s.name.indexOf(t)>-1&&e.push(s)})),this.displayItems=e,console.log(this.displayItems)},addCategoryHandle:function(){var t,e=this,s=this.setting.rows*this.setting.cntPerRows;this.selectedIds.length+this.selectedItems.length>s?this.$elementMessage(this.$t("storeSetting.超出限制数量"),"error"):(this.selectedItems.forEach((function(t){e.selectedIds.push(t.id)})),(t=this.setting.categorys).push.apply(t,Object(r["a"])(this.selectedItems)),this.selectedItems=[],this.addCategoryVisible=!1)},getCategory:function(){var t=this;this.cLoading=!0,this.$apiCall("api.ProductCategory.findByUser",{level:1},(function(e){setTimeout((function(){t.cLoading=!1}),500),9999==e.ErrorCode&&(t.items=e.Data.Results,t.displayItems=e.Data.Results,t.$apiCall("api.VendorShop.getShopConfig",{},(function(e){9999==e.ErrorCode&&0!==e.Data.Results.length&&(e.Data.Results.sort.forEach((function(e){if(e.cid==t.$route.query.cid){var s=[];e.categorys.forEach((function(e){t.items.forEach((function(i){e.id==i.id&&(s.push(i),t.selectedIds.push(i.id))}))})),e.categorys=s,t.setting=JSON.parse(JSON.stringify(e)),t.exist=!0,t.$nextTick((function(){t.$refs.rightBox.wrap.scrollTop=document.getElementById("row".concat(e.cid)).offsetTop}))}})),t.$store.commit("getShopConfig",e.Data.Results),t.exist||(t.setting={cid:t.$route.query.cid,type:"productCategory",title:"",rows:2,cntPerRows:3,moreText:"",proportion:"1",fillWay:"cover",target:"_blank",categorys:[]},t.exist=!0,t.$store.commit("addStoreComponent",t.setting)))})))}))},addCategory:function(){this.addCategoryVisible=!0},goBack:function(){this.$router.push({name:"storeSettingMain"})},saveData:function(){var t=this;this.isSave=!0,this.exist&&(this.$store.commit("setStoreComponent",this.setting),this.$elementMessage("保存成功","success")),this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){9999==e.ErrorCode?t.$elementMessage("保存成功","success"):t.$message({message:e.Message,type:"error"})}))}}},f=u,h=(s("be9f"),s("6152"),s("cba8")),p=Object(h["a"])(f,i,n,!1,null,"e211ef22",null);e["default"]=p.exports},3173:function(t,e,s){},"4f84":function(t,e,s){"use strict";var i=s("7e70"),n=s("71fe"),r=s("3db2"),o=s("1ef5"),a=s("8c6b"),c=s("4839"),l=s("07d2"),g=s("bed2"),d=s("42ce"),u=s("4cd7"),f=s("2574"),h=s("f432"),p=f("slice"),m=u("species"),v=n.Array,y=Math.max;i({target:"Array",proto:!0,forced:!p},{slice:function(t,e){var s,i,n,u=g(this),f=l(u),p=c(t,f),b=c(void 0===e?f:e,f);if(r(u)&&(s=u.constructor,o(s)&&(s===v||r(s.prototype))?s=void 0:a(s)&&(s=s[m],null===s&&(s=void 0)),s===v||void 0===s))return h(u,p,b);for(i=new(void 0===s?v:s)(y(b-p,0)),n=0;p<b;p++,n++)p in u&&d(i,n,u[p]);return i.length=n,i}})},5459:function(t,e,s){var i=s("8c6b"),n=s("7799");t.exports=function(t,e){i(e)&&"cause"in e&&n(t,"cause",e.cause)}},"5e4f":function(t,e,s){var i=s("7e70"),n=s("71fe"),r=s("b5a9"),o=s("7b39"),a="WebAssembly",c=n[a],l=7!==Error("e",{cause:7}).cause,g=function(t,e){var s={};s[t]=o(t,e,l),i({global:!0,forced:l},s)},d=function(t,e){if(c&&c[t]){var s={};s[t]=o(a+"."+t,e,l),i({target:a,stat:!0,forced:l},s)}};g("Error",(function(t){return function(e){return r(t,this,arguments)}})),g("EvalError",(function(t){return function(e){return r(t,this,arguments)}})),g("RangeError",(function(t){return function(e){return r(t,this,arguments)}})),g("ReferenceError",(function(t){return function(e){return r(t,this,arguments)}})),g("SyntaxError",(function(t){return function(e){return r(t,this,arguments)}})),g("TypeError",(function(t){return function(e){return r(t,this,arguments)}})),g("URIError",(function(t){return function(e){return r(t,this,arguments)}})),d("CompileError",(function(t){return function(e){return r(t,this,arguments)}})),d("LinkError",(function(t){return function(e){return r(t,this,arguments)}})),d("RuntimeError",(function(t){return function(e){return r(t,this,arguments)}}))},6152:function(t,e,s){"use strict";s("8653")},"61d6":function(t,e,s){var i=s("9145");t.exports=function(t,e){return void 0===t?arguments.length<2?"":e:i(t)}},"6c65":function(t,e,s){"use strict";s.d(e,"a",(function(){return c}));var i=s("88a6");function n(t){if(Array.isArray(t))return Object(i["a"])(t)}s("e749"),s("42c2"),s("e456"),s("2d78"),s("b141"),s("df9c"),s("d72f");function r(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var o=s("e3b1");s("5e4f");function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return n(t)||r(t)||Object(o["a"])(t)||a()}},"7aa2":function(t,e,s){var i=s("137b"),n=s("80cb");t.exports=!i((function(){var t=Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",n(1,7)),7!==t.stack)}))},"7b39":function(t,e,s){"use strict";var i=s("57ad"),n=s("ec0b"),r=s("7799"),o=s("8bc7"),a=s("2b51"),c=s("57f1"),l=s("bab3"),g=s("61d6"),d=s("5459"),u=s("be31"),f=s("7aa2"),h=s("6c4d");t.exports=function(t,e,s,p){var m=p?2:1,v=t.split("."),y=v[v.length-1],b=i.apply(null,v);if(b){var C=b.prototype;if(!h&&n(C,"cause")&&delete C.cause,!s)return b;var $=i("Error"),S=e((function(t,e){var s=g(p?e:t,void 0),i=p?new b(t):new b;return void 0!==s&&r(i,"message",s),f&&r(i,"stack",u(i.stack,2)),this&&o(C,this)&&l(i,this,S),arguments.length>m&&d(i,arguments[m]),i}));if(S.prototype=C,"Error"!==y&&(a?a(S,$):c(S,$,{name:!0})),c(S,b),!h)try{C.name!==y&&r(C,"name",y),C.constructor=S}catch(w){}return S}}},8653:function(t,e,s){},"88a6":function(t,e,s){"use strict";function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,i=new Array(e);s<e;s++)i[s]=t[s];return i}s.d(e,"a",(function(){return i}))},"9b67":function(t,e,s){"use strict";var i=s("71fe"),n=s("0db1"),r=s("6d92"),o=s("df65"),a=s("a1da"),c=s("ca5d"),l=s("1ef5"),g=s("07d2"),d=s("42ce"),u=s("63de"),f=s("4f1d"),h=i.Array;t.exports=function(t){var e=o(t),s=l(this),i=arguments.length,p=i>1?arguments[1]:void 0,m=void 0!==p;m&&(p=n(p,i>2?arguments[2]:void 0));var v,y,b,C,$,S,w=f(e),x=0;if(!w||this==h&&c(w))for(v=g(e),y=s?new this(v):h(v);v>x;x++)S=m?p(e[x],x):e[x],d(y,x,S);else for(C=u(e,w),$=C.next,y=s?new this:[];!(b=r($,C)).done;x++)S=m?a(C,p,[b.value,x],!0):b.value,d(y,x,S);return y.length=x,y}},a1da:function(t,e,s){var i=s("986c"),n=s("bb9b");t.exports=function(t,e,s,r){try{return r?e(i(s)[0],s[1]):e(s)}catch(o){n(t,"throw",o)}}},be31:function(t,e,s){var i=s("add7"),n=i("".replace),r=function(t){return String(Error(t).stack)}("zxcasd"),o=/\n\s*at [^:]*:[^\n]*/,a=o.test(r);t.exports=function(t,e){if(a&&"string"==typeof t)while(e--)t=n(t,o,"");return t}},be9f:function(t,e,s){"use strict";s("3173")},d72f:function(t,e,s){var i=s("7e70"),n=s("9b67"),r=s("3c37"),o=!r((function(t){Array.from(t)}));i({target:"Array",stat:!0,forced:o},{from:n})},e3b1:function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));s("4f84"),s("e456"),s("1baf"),s("d72f"),s("b141"),s("cf33"),s("1d94");var i=s("88a6");function n(t,e){if(t){if("string"===typeof t)return Object(i["a"])(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?Object(i["a"])(t,e):void 0}}}}]);