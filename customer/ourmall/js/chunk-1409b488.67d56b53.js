(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1409b488"],{3052:function(e,t,a){"use strict";a("ab05")},"98fc":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel orders-page"},[e._m(0),a("div",{staticClass:"pagebody"},[a("el-card",[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-tabs",{on:{"tab-click":e.search},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"Awaiting Response",name:"1"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Awaiting Response "),a("span",[e._v("("+e._s(e.total)+")")])])]),a("el-tab-pane",{attrs:{label:"Completed",name:"3"}}),a("el-tab-pane",{attrs:{label:"Closed",name:"4"}})],1)],1),a("el-col",{attrs:{span:24}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{staticClass:"do_date"},[a("el-date-picker",{attrs:{"value-format":"yyyyMMdd",type:"daterange",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":"Start date","end-placeholder":"End date","picker-options":e.pickerOptions},on:{change:e.search},model:{value:e.timeCreated,callback:function(t){e.timeCreated=t},expression:"timeCreated"}})],1),a("el-form-item",{staticClass:"do_search"},[a("el-input",{staticClass:"search_txt",attrs:{placeholder:"Enter order number"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search.apply(null,arguments)}},model:{value:e.search_txt,callback:function(t){e.search_txt=t},expression:"search_txt"}}),a("el-button",{staticClass:"search_btn",attrs:{type:"primary"},on:{click:function(t){return t.stopPropagation(),e.search.apply(null,arguments)}}},[e._v("Search")])],1),a("el-form-item",[a("el-select",{attrs:{placeholder:"Please select"},on:{change:e.search},model:{value:e.search_select,callback:function(t){e.search_select=t},expression:"search_select"}},e._l(e.$dict.PurchaseStatus,(function(e,t){return a("el-option",{key:t,attrs:{label:e.text,value:e.val}})})),1)],1)],1)],1)])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.items,stripe:"","row-key":"id"}},[a("el-table-column",{attrs:{type:"selection"}}),a("el-table-column",{attrs:{label:"Order Number"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.code)+" ")]}}])}),a("el-table-column",{attrs:{label:"Tracking Number"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.row.reissueCode)+" ")]}}])}),a("el-table-column",{attrs:{label:"Dispute Type"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.$dict.disputedReason[(t.row.abnormalJson||{}).reason]||{}).text)+" ")]}}])}),a("el-table-column",{attrs:{label:"Expected Solution"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.$dict.disputedResult[(t.row.abnormalJson||{}).result]||{}).text)+" ")]}}])}),a("el-table-column",{attrs:{label:"Create Date"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.moment(1e3*t.row.timeAbnormal).format("YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),a("el-table-column",{attrs:{label:"Status"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s((e.$dict.disputedStatus[t.row.abnormalStatus]||{}).text)+" ")]}}])})],1)],1)],1)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1)],1)],1)],1)])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header-diy"},[a("div",{staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-shopify"}),a("h2",[e._v("Disputed order")])])])])])}],n=(a("6351"),a("abd8"),a("b7bb"),{data:function(){return{activeName:"1",loading:!1,pickerOptions:{shortcuts:[{text:"Last week",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"Last month",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"Last three months",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},search_txt:"",search_select:"",timeCreated:"",items:[],pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_storeRowsPerPage")?Number(localStorage.getItem("c_storeRowsPerPage")):10,total:0}},watch:{$route:"gotoPage",search_checkbox:function(){this.search()}},created:function(){this.initData()},methods:{initData:function(){this.getTable()},getTable:function(e){var t=this;this.loading=!0;var a={rowsPerPage:this.rowsPerPage,page:this.page,abnormalStatus:Number(this.activeName),invoiceCode:this.search_txt,timeCreatedFrom:(this.timeCreated||[])[0]||"",timeCreatedTo:(this.timeCreated||[])[1]||""};this.search_select&&(a.status=Number(this.search_select)),this.$apiCall("api.PurchaseOrder.findByCustomer",a,(function(a){t.loading=!1,9999==a.ErrorCode?(t.items=a.Data.Results,t.total=Number(a.Data.Pagination.totalCount),t.totalPage=Number(a.Data.Pagination.totalPage),e||(t.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0)):t.$message({message:a.Message,type:"error"})}))},search:function(){1==this.$route.query.page?this.getTable():this.$router.push({query:{page:1}})},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_storeRowsPerPage",e),this.getTable()},gotoPage:function(){this.page=this.$route.query.page?Number(this.$route.query.page):1,this.getTable()}}}),l=n,i=(a("3052"),a("cba8")),o=Object(i["a"])(l,s,r,!1,null,"1c59d0c8",null);t["default"]=o.exports},ab05:function(e,t,a){},b7bb:function(e,t,a){"use strict";var s=a("7b14"),r=a("f675"),n=a("6f9a"),l=a("1fcb"),i=a("c5ca"),o=a("3727"),c=a("1ba2"),u=a("962e");r("search",(function(e,t,a){return[function(t){var a=l(this),r=void 0==t?void 0:c(t,e);return r?s(r,t,a):new RegExp(t)[e](o(a))},function(e){var s=n(this),r=o(e),l=a(t,s,r);if(l.done)return l.value;var c=s.lastIndex;i(c,0)||(s.lastIndex=0);var d=u(s,r);return i(s.lastIndex,c)||(s.lastIndex=c),null===d?-1:d.index}]}))},c5ca:function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}}}]);