(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["menuSetting"],{1575:function(t,e,n){"use strict";n("41a9")},"41a9":function(t,e,n){},acc0:function(t,e,n){"use strict";var a=n("88d4"),i=n("8735"),o=n("b595"),s=n("0859"),r=n("bf1f"),u=n("1c34"),l=n("126a"),c=n("63ef"),g=n("c40a"),d=n("d0ff"),p=n("3a6d"),m=n("4b57"),f=p("slice"),h=d("species"),$=i.Array,v=Math.max;a({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var n,a,i,d=c(this),p=l(d),f=u(t,p),S=u(void 0===e?p:e,p);if(o(d)&&(n=d.constructor,s(n)&&(n===$||o(n.prototype))?n=void 0:r(n)&&(n=n[h],null===n&&(n=void 0)),n===$||void 0===n))return m(d,f,S);for(a=new(void 0===n?$:n)(v(S-f,0)),i=0;f<S;f++,i++)f in d&&g(a,i,d[f]);return a.length=i,a}})},e9c1:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.pageLoading,expression:"pageLoading"}],staticClass:"contentpanel menu-setting-page"},[n("div",{ref:"pageHeader",staticClass:"pagetitle"},[n("div",{staticClass:"left"},[n("div",{staticClass:"title"},[n("i",{staticClass:"el-icon-menu"}),n("h2",[t._v(t._s(t.$t("storeSetting.菜单导航")))]),t._v(" "),n("span",[t._v(t._s(t.$t("menuSetting.你可以在此设置菜单，装修店铺顶部导航、页尾时，可手动关联对应的菜单")))])])]),n("div",{staticClass:"right"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.openEditMenu()}}},[t._v(t._s(t.$t("menuSetting.新增菜单")))])],1)]),n("div",{staticClass:"pagebody"},[n("el-card",[n("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{data:t.items,stripe:"","row-key":"id"}},[n("el-table-column",{attrs:{label:t.$t("menuSetting.菜单名称"),prop:"name",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))]),e.row.id<3?n("span",{staticClass:" tx-danger"},[t._v(" ("+t._s(t.$t("menuSetting.不可删除"))+")")]):t._e()]}}])}),n("el-table-column",{attrs:{label:t.$t("menuSetting.菜单一级目录")},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.menu,(function(e){return n("el-tag",{key:e.id,staticStyle:{"margin-right":"10px"},attrs:{type:"info",effect:"plain"}},[t._v(" "+t._s(e.label)+" ")])}))}}])}),n("el-table-column",{attrs:{label:t.$t("menuSetting.操作"),width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(n){return t.openEditMenu(e.row)}}},[t._v(t._s(t.$t("menuSetting.编辑")))]),e.row.id>2?n("el-button",{attrs:{type:"danger",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(n){return t.delMenu(e.row)}}},[t._v(t._s(t.$t("menuSetting.删除")))]):t._e()]}}])})],1)],1),this.$store.state.configJson.menu.length?n("el-row",{attrs:{gutter:20}},[n("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[n("div",{staticStyle:{position:"relative",top:"10px"}},[n("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"page-size":t.rowsPerPage,total:t.totalCount},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)])},i=[],o=(n("51b3"),n("10dd"),n("acc0"),n("87d5"),{data:function(){return{pageLoading:!1,page:this.$route.query.page?Number(this.$route.query.page):1,pageSize:[10,20,50,100],rowsPerPage:localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))?Number(localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))):10}},computed:{items:function(){var t=(this.page-1)*this.rowsPerPage,e=this.page*this.rowsPerPage;return this.$store.state.configJson.menu.slice(t,e)},totalCount:function(){return this.$store.state.configJson.menu.length},totalPage:function(){return Math.ceil(this.$store.state.configJson.menu.length/this.rowsPerPage)}},mounted:function(){this.getConfig()},methods:{delMenu:function(t){var e=this;this.$confirm(this.$t("menuSetting.是否要删除菜单"),"",{confirmButtonText:this.$t("products.删除"),cancelButtonText:this.$t("products.取消"),confirmButtonClass:"el-button--danger"}).then((function(){e.$store.commit("delMenu",t.id),e.pageLoading=!0,e.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(e.$store.state.configJson)},(function(t){e.pageLoading=!1,9999==t.ErrorCode?(e.$elementMessage(e.$t("shop.删除成功"),"success"),e.page>e.totalPage&&(e.page=e.totalPage)):e.$message({message:t.Message,type:"error"})}))}))},getConfig:function(){var t=this;this.pageLoading=!0,this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){t.pageLoading=!1,9999==e.ErrorCode&&0!==e.Data.Results.length&&(t.$store.commit("getShopConfig",e.Data.Results),e.Data.Results.menu&&e.Data.Results.menu.length||t.$store.commit("getDefaultMenu"))}))},openEditMenu:function(t){t?this.$router.push({name:"menuEditor",query:{id:t.id}}):this.$router.push({name:"menuEditor",query:{id:(new Date).getTime()}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("".concat(this.$route.name,"RowsPerPage"),t)},toPage:function(t){this.page=t,this.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0}}}),s=o,r=(n("1575"),n("cba8")),u=Object(r["a"])(s,a,i,!1,null,"3b473726",null);e["default"]=u.exports}}]);