(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["account"],{4214:function(e,t,a){"use strict";a("f493")},"77be":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"contentpanel account-page"},[t("div",{ref:"pageHeader",staticClass:"pagetitle"},[e._m(0),t("div",{staticClass:"right"},[t("el-button",{attrs:{type:"primary",size:"medium"}},[e._v("添加账号")])],1)]),t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody"},[t("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[t("el-col",{attrs:{span:24}},[t("el-card",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:24}},[t("div",{ref:"pageFilter",staticClass:"page-filter"},[t("el-form",{attrs:{inline:!0,size:"mini"}},[t("el-form-item",[t("el-input",{attrs:{placeholder:"姓名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem.apply(null,arguments)}}})],1),t("el-form-item",[t("el-input",{attrs:{placeholder:"用户名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem.apply(null,arguments)}}})],1),t("el-form-item",[t("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"选择角色"}},[t("el-option",{attrs:{label:"管理员",value:"1"}}),t("el-option",{attrs:{label:"员工",value:"2"}})],1)],1),t("el-form-item",[t("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"选择状态"}},[t("el-option",{attrs:{label:"启用",value:"1"}}),t("el-option",{attrs:{label:"禁用",value:"2"}})],1)],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v("查询")]),t("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v("重置")])],1)],1)],1)])],1),t("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{data:e.items,stripe:"","row-key":"id"}},[t("el-table-column",{attrs:{label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 马 ")]}}])}),t("el-table-column",{attrs:{label:"用户名"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 789789789 ")]}}])}),t("el-table-column",{attrs:{label:"角色"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 管理员 ")]}}])}),t("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("i",{staticClass:"s-badge"}),e._v("启用 ")]}}])}),t("el-table-column",{attrs:{label:"添加时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 2020-08-25 18:17:02 ")]}}])}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-link",{staticClass:"mg-r-15",attrs:{type:"primary"}},[e._v("编辑")]),t("el-link",{staticClass:"mg-r-15",attrs:{type:"primary"}},[e._v("禁用")]),t("el-link",{attrs:{type:"primary"}},[e._v("修改密码")])]}}])})],1)],1)],1)],1),e.items.length?t("el-row",{attrs:{gutter:20}},[t("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[t("div",[t("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1),t("DialogAddAccount",{attrs:{data:e.dialogAddData}})],1)},r=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"left"},[t("div",{staticClass:"title"},[t("i",{staticClass:"el-icon-s-check"}),t("h2",[e._v("权限管理")])])])}],i=(a("14d9"),function(){var e=this,t=e._self._c;return t("div",[t("el-dialog",{attrs:{title:"添加账户",visible:e.data.isShow,width:"760px"},on:{"update:visible":function(t){return e.$set(e.data,"isShow",t)}}},[t("el-divider"),t("div",[t("el-form",{ref:"formAdd",attrs:{size:"small","label-width":"140px"}},[t("el-form-item",{attrs:{label:"姓名",required:""}},[t("el-input")],1),t("el-form-item",{attrs:{label:"用户名",required:""}},[t("el-input")],1),t("el-form-item",{attrs:{label:"密码",required:""}},[t("el-input",{attrs:{"show-password":""}})],1),t("el-form-item",{attrs:{label:"确认密码",required:""}},[t("el-input",{attrs:{"show-password":""}})],1),t("el-form-item",{attrs:{label:"账号类型"}},[t("el-button-group",[t("el-button",[e._v("管理员")]),t("el-button",{attrs:{type:"primary"}},[e._v("员工")])],1)],1)],1),t("el-form-item",{attrs:{label:"权限"}})],1)],1)],1)}),s=[],o={props:["data"]},n=o,u=a("2877"),c=Object(u["a"])(n,i,s,!1,null,null,null),d=c.exports,p={data(){return{loading:!1,filterParams:{},page:this.$route.query.page?Number(this.$route.query.page):1,pageSizes:[10,20,50,100],rowsPerPage:localStorage.getItem("accountRowsPerPage")?Number(localStorage.getItem("accountRowsPerPage")):10,total:0,totalPage:0,items:[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}],dialogAddData:{isShow:!0,loading:!1}}},components:{DialogAddAccount:d},methods:{filterGetItem(){},clearFilter(){},getItem(){},toPage(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize(e){this.rowsPerPage=e,localStorage.setItem("accountRowsPerPage",e),this.getItem()},gotoPage(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}},g=p,m=(a("4214"),Object(u["a"])(g,l,r,!1,null,"36ea6862",null));t["default"]=m.exports},f493:function(e,t,a){}}]);