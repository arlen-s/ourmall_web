(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSetting"],{2330:function(t,e,n){"use strict";n("f68a")},c9e2:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"store-setting-main"},[e("header",{staticClass:"main-header"},[e("div",{staticClass:"left"},[e("el-link",{staticStyle:{"margin-right":"246px"},attrs:{icon:"el-icon-back"},on:{click:t.goback}},[t._v(t._s(t.$t("storeSetting.返回")))]),e("SettingDropdownMenu")],1),e("div",{staticClass:"right"},[e("el-button",{attrs:{size:"small",icon:"el-icon-view"},on:{click:function(e){return t.viewShop()}}},[t._v(t._s(t.$t("storeSetting.查看店铺")))]),e("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("storeSetting.保存")))])],1)]),e("router-view",{staticClass:"frame-box",attrs:{filter:t.filter},on:{StatusChange:t.StatusChange}})],1)},o=[],a=(n("14d9"),function(){var t=this,e=t._self._c;return e("el-dropdown",{on:{command:t.handleCommand}},[e("span",{staticClass:"el-dropdown-link"},[t._v(" "+t._s(t.$t(t.activeLabel))+" "),e("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.menu,(function(n){return e("el-dropdown-item",{key:n.label,attrs:{command:n.name}},[t._v(t._s(t.$t(n.label)))])})),1)],1)}),i=[],r={data(){return{menu:[{label:"storeSetting.首页",name:"storeSettingMain"},{label:"storeSetting.商品详情页",name:"storeSettingDetail"}]}},computed:{activeLabel(){let t="";return this.menu.forEach(e=>{e.name==this.$route.name&&(t=e.label)}),t||"storeSetting.首页"}},methods:{handleCommand(t){this.$router.push({name:t})}}},l=r,c=n("2877"),u=Object(c["a"])(l,a,i,!1,null,null,null),d=u.exports,h={data(){return{filter:"home",editStatus:!1}},components:{SettingDropdownMenu:d},methods:{goback(){this.$router.push({name:"storeDesign"})},viewShop(){window.open(`//${location.host.indexOf("sandbox")>-1?"sandbox":""}${this.$store.state.userInfo.shop.name}.bcndropshippingelite.com`)},StatusChange(t){this.editStatus=t},save(){this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},t=>{9999==t.ErrorCode?this.$elementMessage(this.$t("storeSetting.保存成功"),"success"):this.$message({message:t.Message,type:"error"})})}}},m=h,p=(n("2330"),Object(c["a"])(m,s,o,!1,null,"63992130",null));e["default"]=p.exports},f68a:function(t,e,n){}}]);