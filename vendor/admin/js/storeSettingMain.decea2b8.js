(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSettingMain"],{"14ff":function(t,e,i){"use strict";i("ac71")},"202d":function(t,e,i){"use strict";i("7b5e")},"7b5e":function(t,e,i){},"7c5e":function(t,e,i){"use strict";i("d7ba")},a0af:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"setting-page"},[i("el-scrollbar",{staticClass:"left"},[t.editStatus?t._e():i("div",{key:"1",staticClass:"content"},[i("h1",[t._v(t._s(t.$t("storeSetting.首页")))]),"home"==t.filter||"header"==t.filter?i("div",{staticClass:"modal-content list-component",on:{click:function(e){return t.routerChange("header")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),i("i",{staticClass:"fa fa-header logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页头")))])])]):t._e(),i("div",{staticClass:"mg-t-10 list-component"},[i("draggable",{attrs:{handle:".draggable-i"},on:{change:t.dragChange},model:{value:t.setting.sort,callback:function(e){t.$set(t.setting,"sort",e)},expression:"setting.sort"}},[t._l(t.setting.sort,(function(e,s){return[i("div",{key:s,staticClass:"draggable-i"},["slider"==e.type&&"home"==t.filter?i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("slider",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-picture-o logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.轮播图")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])]):t._e(),"richText"==e.type&&"home"==t.filter?i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("richText",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-font logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.富文本")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])]):t._e(),"singleImg"==e.type&&"home"==t.filter?i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("singleImg",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-file-image-o logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.单图")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])]):t._e(),"singleProduct"!=e.type||"home"!=t.filter&&"product"!=t.filter?t._e():i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("singleProduct",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-product-hunt logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.单个商品")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])]),"hotProduct"!=e.type||"home"!=t.filter&&"product"!=t.filter?t._e():i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("hotProduct",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-fire logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.热门商品列表")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])]),"productCategory"!=e.type||"home"!=t.filter&&"product"!=t.filter?t._e():i("div",{staticClass:"modal-content",on:{click:function(i){return t.routerChange("productCategory",e)}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("i",{staticClass:"fa fa-cart-arrow-down logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.商品类目")))]),i("i",{staticClass:"el-icon-delete delete-icon",on:{click:function(i){return i.stopPropagation(),t.deleteConfig(e)}}})])])])]}))],2)],1),"home"==t.filter||"product"==t.filter?i("div",{staticClass:"modal-content"},[i("div",{staticClass:"content-box",staticStyle:{color:"#356dff"},on:{click:t.editComponent}},[i("i",{staticClass:"el-icon-plus"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.添加组件")))])])]):t._e(),"home"==t.filter||"header"==t.filter?i("div",{staticClass:"modal-content list-component mg-t-10",on:{click:function(e){return t.routerChange("footer")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),i("i",{staticClass:"iconfont icon-footer logo",attrs:{"aria-hidden":"true"}}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页脚")))])])]):t._e()]),t.editStatus?i("div",{key:"2",staticClass:"content"},[i("EditList",{attrs:{setting:t.setting},on:{goBack:t.goBack,routerChange:t.routerChange}})],1):t._e()]),i("el-scrollbar",{staticClass:"right"},[i("div",{staticClass:"content"},[i("Main",{attrs:{setting:t.setting,code:t.code}})],1)])],1)},o=[],n=(i("87d5"),i("89a8"),i("1a91"),i("2788"),i("aa08"),i("e948")),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"editList"}},[i("div",{staticClass:"back",on:{click:t.goBack}},[i("el-link",{attrs:{icon:"el-icon-arrow-left",underline:!1}},[t._v(t._s(t.$t("storeSetting.添加组件")))])],1),i("h2",[t._v(t._s(t.$t("storeSetting.文字")))]),i("div",{staticClass:"config"},[i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("richText")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.富文本")))])])])]),i("h2",[t._v(t._s(t.$t("storeSetting.图片")))]),i("div",{staticClass:"config"},[i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("slider")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.轮播图")))])])]),i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("singleImg")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.单图")))])])])]),i("h2",[t._v(t._s(t.$t("storeSetting.商品")))]),i("div",{staticClass:"config"},[i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("singleProduct")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.单个商品")))])])]),i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("hotProduct")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.热门商品列表")))])])]),i("div",{staticClass:"modal-content",on:{click:function(e){return t.routerChange("productCategory")}}},[i("div",{staticClass:"content-box"},[i("i",{staticClass:"iconfont icon-draggable"}),i("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.商品类目")))])])])])])},r=[],c={props:["setting"],methods:{goBack:function(){this.$emit("goBack",!1)},routerChange:function(t){this.$emit("routerChange",t)}}},l=c,d=(i("202d"),i("cba8")),g=Object(d["a"])(l,a,r,!1,null,"0394a710",null),u=g.exports,h=i("3335"),f=i.n(h),C={props:["filter"],data:function(){return{setting:null,editStatus:!1,code:{header:[],footer:[]}}},components:{Main:n["a"],draggable:f.a,EditList:u},created:function(){this.setting=JSON.parse(JSON.stringify(this.$store.state.configJson)),this.getConfig()},methods:{dragChange:function(){var t=this;console.log(1),this.$store.commit("getStoreComponent",this.setting),this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){9999==e.ErrorCode?t.$elementMessage(t.$t("storeSetting.保存成功"),"success"):t.$message({message:e.Message,type:"error"})}))},getConfig:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){9999==e.ErrorCode?e.Data.Results.header?(t.$store.commit("getStoreComponent",e.Data.Results),t.setting=e.Data.Results,t.handleCode(e.Data.Results.customCode)):t.setting=JSON.parse(JSON.stringify(t.$store.state.configJson)):t.$message({message:e.Message,type:"error"})}))},handleCode:function(t){var e=this;console.log(t),t.forEach((function(t){t.pages.includes("首页")&&("底部"==t.position&&e.code.footer.push(t.desc),"顶部"==t.position&&e.code.header.push(t.desc))}))},deleteConfig:function(t){var e=this;this.$store.commit("delComponent",t.cid),this.setting=JSON.parse(JSON.stringify(this.$store.state.configJson)),this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(t){9999==t.ErrorCode?e.$elementMessage("删除成功","success"):e.$message({message:t.Message,type:"error"})}))},goBack:function(t){this.editStatus=!1,this.$emit("StatusChange",!1)},editComponent:function(){this.editStatus=!0,this.$emit("StatusChange",!0)},routerChange:function(t,e){var i={};switch(i.cid=e?e.cid:(new Date).getTime(),t){case"header":this.$router.push({path:"/store-setting/header"});break;case"footer":this.$router.push({path:"/store-setting/footer"});break;case"richText":this.$router.push({path:"/store-setting/richEditor",query:i});break;case"slider":this.$router.push({path:"/store-setting/slider",query:i});break;case"singleImg":this.$router.push({path:"/store-setting/singleImg",query:i});break;case"singleProduct":this.$router.push({path:"/store-setting/productOne",query:i});break;case"hotProduct":this.$router.push({path:"/store-setting/productList",query:i});break;case"productCategory":this.$router.push({path:"/store-setting/productCategory",query:i});break;default:break}}}},p=C,v=(i("7c5e"),i("14ff"),Object(d["a"])(p,s,o,!1,null,"65a606ec",null));e["default"]=v.exports},ac71:function(t,e,i){},d7ba:function(t,e,i){},e948:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"designHome"},[t.code&&t.code.header&&t.code.header.length>0&&"storeDesign"!=this.$route.name?t._l(t.code.header,(function(e,s){return i("div",{key:s,staticStyle:{overflow:"hidden"},domProps:{innerHTML:t._s(e)}})})):t._e(),i("div",{staticStyle:{position:"relative"}},[i("DHeader",{attrs:{data:t.setting.header,headerMenu:t.headerMenu}}),i("demoBody",{attrs:{data:t.setting,header:t.setting.header}}),i("Footer",{attrs:{setting:t.setting.footer}})],1),t.code&&t.code.footer&&t.code.footer.length>0&&"storeDesign"!=this.$route.name?t._l(t.code.footer,(function(e,s){return i("div",{key:s,staticStyle:{overflow:"hidden"},domProps:{innerHTML:t._s(e)}})})):t._e()],2)},o=[],n=(i("89a8"),i("1a91"),i("826e")),a=i("db46"),r=i("8c3c"),c={props:["setting","code"],components:{DHeader:n["a"],Footer:a["a"],demoBody:r["a"]},data:function(){return{headerMenu:[]}},watch:{"setting.header.activeMenu":{handler:function(){this.getMenu()},deep:!0,immediate:!0}},methods:{getMenu:function(){var t=this;this.setting.header.activeMenu&&this.setting.menu.forEach((function(e){e.id==t.setting.header.activeMenu&&(t.headerMenu=e)}))}}},l=c,d=i("cba8"),g=Object(d["a"])(l,s,o,!1,null,null,null);e["a"]=g.exports}}]);