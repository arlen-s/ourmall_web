(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSetting"],{"15d1":function(t,e,n){"use strict";n("2a2f")},"2a2f":function(t,e,n){},c9e2:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"store-setting-main"},[n("header",{staticClass:"main-header"},[n("div",{staticClass:"left"},[n("el-link",{staticStyle:{"margin-right":"246px"},attrs:{icon:"el-icon-back"},on:{click:t.goback}},[t._v(t._s(t.$t("storeSetting.返回")))]),n("SettingDropdownMenu")],1),n("div",{staticClass:"right"},[n("el-button",{attrs:{size:"small",icon:"el-icon-view"},on:{click:function(e){return t.viewShop()}}},[t._v(t._s(t.$t("storeSetting.查看店铺")))]),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("storeSetting.保存")))])],1)]),n("router-view",{staticClass:"frame-box",attrs:{filter:t.filter},on:{StatusChange:t.StatusChange}})],1)},s=[],a=(n("99af"),n("b0c0"),n("e9c4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dropdown",{on:{command:t.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v(" "+t._s(t.$t(t.activeLabel))+" "),n("i",{staticClass:" el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.menu,(function(e){return n("el-dropdown-item",{key:e.label,attrs:{command:e.name}},[t._v(t._s(t.$t(e.label)))])})),1)],1)}),i=[],r=(n("d3b7"),n("159b"),{data:function(){return{menu:[{label:"storeSetting.首页",name:"storeSettingMain"},{label:"storeSetting.商品详情页",name:"storeSettingDetail"}]}},computed:{activeLabel:function(){var t=this,e="";return this.menu.forEach((function(n){n.name==t.$route.name&&(e=n.label)})),e||"storeSetting.首页"}},methods:{handleCommand:function(t){this.$router.push({name:t})}}}),l=r,c=n("2877"),u=Object(c["a"])(l,a,i,!1,null,null,null),d=u.exports,m={data:function(){return{filter:"home",editStatus:!1}},components:{SettingDropdownMenu:d},methods:{goback:function(){this.$router.push({name:"storeDesign"})},viewShop:function(){window.open("//".concat(location.host.indexOf("sandbox")>-1?"sandbox":"").concat(this.$store.state.userInfo.shop.name,".myourmall.com"))},StatusChange:function(t){this.editStatus=t},save:function(){var t=this;this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){9999==e.ErrorCode?t.$elementMessage(t.$t("storeSetting.保存成功"),"success"):t.$message({message:e.Message,type:"error"})}))}}},f=m,h=(n("15d1"),Object(c["a"])(f,o,s,!1,null,"658a8aef",null));e["default"]=h.exports}}]);