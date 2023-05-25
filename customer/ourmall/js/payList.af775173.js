(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["payList"],{cefd:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel pay-list-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-money"}),a("h2",[t._v(t._s(t.$t("Payment Record")))])])]),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[a("el-breadcrumb",{staticStyle:{"margin-bottom":"10px","font-size":"12px"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/Recharge"}}},[t._v(t._s(t.$t("Recharge")))]),a("el-breadcrumb-item",[t._v(t._s(t.$t("Payment Record")))])],1),a("el-card",[a("el-row",{ref:"gridTable",staticStyle:{"margin-bottom":"15px","padding-top":"15px"},attrs:{gutter:10}},[a("el-col",{attrs:{span:24}},[a("el-table",{ref:"gridTable",attrs:{data:t.tableData,stripe:"",width:""}},[a("el-table-column",{attrs:{label:"Platform / Type"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s((t.payPlatformDict[e.row.platform]||{}).name)+" "),a("span",{staticStyle:{color:"#909399"}},[t._v("/")])]),a("div",[t._v(t._s((t.payTypeDict[e.row.type]||{}).name))])]}}])}),a("el-table-column",{attrs:{label:"Payment Amount",prop:"amount"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$store.state.country.shopCurrency)+t._s(t.$store.state.country.symbol)+" "+t._s(e.row.amount)+" ")]}}])}),a("el-table-column",{attrs:{label:"Payment Status",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{class:t.payStatusDict[e.row.status].style},[t._v(" "+t._s((t.payStatusDict[e.row.status]||{}).name)+" ")])]}}])}),a("el-table-column",{attrs:{label:"Payment Num"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticStyle:{color:"#909399"}},[t._v("code：")]),t._v(" "+t._s(e.row.code)+" ")]),a("div",[a("span",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("trade code"))+"：")]),t._v(" "+t._s(e.row.tradeCode)+" ")])]}}])}),a("el-table-column",{attrs:{label:"Payment Date"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(t.moment.unix(e.row.timeCreated).format("ll [at] LTS"))+" ")])]}}])})],1)],1)],1),a("div",{ref:"tableFooter"},[t.tableData.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",{staticStyle:{position:"relative",top:"10px"}},[a("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"page-size":t.rowsPerPage,total:Number(t.totalCount)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1)])},o=[],r=(a("a9e3"),{data:function(){return{loading:!1,pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_allOrdersRowsPerPage")?Number(localStorage.getItem("c_allOrdersRowsPerPage")):20,totalCount:0,totalPage:0,tableData:[],payStatusDict:{1:{name:"Pending",style:"tx-warning"},2:{name:"Paid",style:"tx-success"},3:{name:"Refund",style:"tx-danger"},4:{name:"Cancelled",style:"tx-info"}},payTypeDict:{1:{name:"VIP Membership"},2:{name:"Recharge"},3:{name:"Used"}},payPlatformDict:{1:{name:"PayPal"},2:{name:"Checkout"}}}},mounted:function(){this.getItem()},watch:{$route:"gotoPage"},methods:{getItem:function(){var t=this;this.loading=!0;var e={page:this.page,rowsPerPage:this.rowsPerPage};this.loading=!1,this.$apiCall("api.PayRecord.findByUser",e,(function(e){"9999"==e.ErrorCode?(t.tableData=e.Data.Results,t.totalPage=e.Data.Pagination.totalPage,t.totalCount=e.Data.Pagination.totalCount):t.$elementMessage(e.Message,"error")}))},toPage:function(t){t!=this.$route.query.page&&this.$router.push({query:{page:t}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_payListRowsPerPage",t),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}}),l=r,n=a("2877"),i=Object(n["a"])(l,s,o,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=payList.af775173.js.map