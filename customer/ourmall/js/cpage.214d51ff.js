(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["cpage"],{"0c1c":function(t,e,o){},"778d":function(t,e,o){"use strict";o("0c1c")},b66c:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-page"},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"home-body"},[o("div",{staticClass:"designHome test"},[o("div",{staticStyle:{position:"relative"}},[o("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}}),o("div",{staticClass:"page-body-wrap ql-snow"},[o("div",{staticClass:"body ql-editor",style:{paddingTop:t.setting.header.logoWidth&&t.setting.header.logoWidth>120?t.setting.header.logoWidth+"px":"120px"},domProps:{innerHTML:t._s(t.page.content)}})]),o("Footer",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}})],1)])])])},s=[],i=(o("ac1f"),o("1276"),o("159b"),o("a753"),o("8096"),o("14e1"),o("8214")),n=o("d8f7"),r={data:function(){return{headerMenu:[],setting:{header:{}},loading:!1,id:this.$route.params.id,page:{content:null,id:null,title:null,updateTime:null},code:{header:[],footer:[]}}},components:{DHeader:i["a"],Footer:n["a"]},watch:{"$route.params.id":{handler:function(){this.getInfo()},deep:!0}},created:function(){this.getInfo()},mounted:function(){},methods:{getInfo:function(){var t=this;if(!("www"==location.host.split(".")[0].toLowerCase()||"sandboxwww"==location.host.split(".")[0].toLowerCase()||"supplier"==location.host.split(".")[0].toLowerCase()||"sandboxsupplier"==location.host.split(".")[0].toLowerCase()&&location.host.indexOf("localhost")<0)){this.loading=!0;var e=location.host;location.host.indexOf("localhost")>-1&&(e="shop242.myourmall.com"),this.$apiCall("api.User.getInfoFromUrl",{url:e},(function(e){9999==e.ErrorCode?(localStorage.setItem("c_apiShopId",e.Data.Results.shopId),t.getItem()):(t.loading=!1,t.$elementMessage(e.Message,"error"))}))}},getItem:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){t.loading=!1,9999==e.ErrorCode?0!==e.Data.Results.length?(e.Data.Results.header.activeMenu&&e.Data.Results.menu.forEach((function(o){o.id==e.Data.Results.header.activeMenu&&(t.headerMenu=o)})),t.$store.commit("getStoreComponent",e.Data.Results),t.setting=e.Data.Results,t.$route.params.id&&(t.id=t.$route.params.id),t.setting.customPage&&t.setting.customPage.forEach((function(e){t.id==e.id&&(t.page=e)})),localStorage.setItem("c_shopConfigJson",JSON.stringify(e.Data.Results))):t.setting=JSON.parse(JSON.stringify(t.$store.state.configJson)):t.$message({message:e.Message,type:"error"})}))}}},l=r,d=(o("778d"),o("2877")),c=Object(d["a"])(l,a,s,!1,null,"0eac4d62",null);e["default"]=c.exports}}]);
//# sourceMappingURL=cpage.214d51ff.js.map