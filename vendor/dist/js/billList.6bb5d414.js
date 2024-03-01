(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["billList"],{"80e5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"contentpanel my-invoice-page"},[e("div",{ref:"pageHeader",staticClass:"pagetitle"},[e("div",{staticClass:"left d-flex align-items-center"},[e("div",{staticClass:"title",staticStyle:{"margin-right":"20px"}},[e("i",{staticClass:"el-icon-tickets"}),e("h2",[t._v(t._s(t.$t("bill.账单详情")))])])]),e("div",{staticClass:"right"})]),e("div",{staticStyle:{marginBottom:"20px"}},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/dashboard"}}},[t._v(t._s(t.$t("bill.我的首页")))]),e("el-breadcrumb-item",{attrs:{to:{path:"/payment-method"}}},[t._v(t._s(t.$t("bill.设置")))]),e("el-breadcrumb-item",[t._v(t._s(t.$t("bill.账单详情")))])],1)],1),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[e("el-card",{staticClass:"mg-b-15"},[e("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[e("el-col",{staticStyle:{position:"relative","z-index":"1"},attrs:{span:24}},[e("div",{ref:"pageFilter",staticClass:"page-filter"},[e("div",{staticClass:"d-flex"},[e("el-form",{attrs:{inline:!0,size:"mini"}},[e("el-form-item",{attrs:{label:t.$t("bill.日期")}},[e("el-date-picker",{attrs:{type:"daterange","range-separator":"-","default-time":["00:00:00","23:59:59"],"start-placeholder":t.$t("bill.开始日期"),"end-placeholder":t.$t("bill.结束日期")},on:{change:t.dateChange},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1),e("el-form-item",{staticClass:"mg-r-5",attrs:{label:t.$t("bill.订单号")}},[e("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:t.$t("bill.订单号")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem("name")}},model:{value:t.filterParams.invoiceCode,callback:function(e){t.$set(t.filterParams,"invoiceCode",e)},expression:"filterParams.invoiceCode"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.getItems}},[t._v(t._s(t.$t("bill.查询")))]),e("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("bill.清空")))]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.exportBills()}}},[t._v(t._s(t.$t("bill.导出账单")))])],1)],1)],1)])]),e("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px",position:"relative","z-index":"0"},attrs:{gutter:10}},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.items}},[e("el-table-column",{attrs:{label:t.$t("bill.类型"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" 付款 ")]}}])}),e("el-table-column",{attrs:{label:t.$t("bill.时间"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$moment(1e3*e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),e("el-table-column",{attrs:{prop:"invoice",label:t.$t("bill.订单号"),width:"180"}}),e("el-table-column",{attrs:{prop:"platformTypeText",label:t.$t("bill.支付方式"),width:"180"}}),e("el-table-column",{attrs:{prop:"totalAmount",label:t.$t("bill.付款金额"),width:"180"}})],1)],1)],1)],1),e("el-row",{ref:"pageFooter",attrs:{gutter:20}},[e("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[e("div",[e("el-pagination",{attrs:{"current-page":t.pagination.currentPage,"page-sizes":[10,20,30,40],"page-size":t.pagination.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.total},on:{"size-change":t.getItems,"current-change":t.getItems}})],1)])],1)],1),e("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}})],1)},r=[],l={data(){return{loading:!1,selectedDate:[],pagination:{currentPage:1,pageSize:10,total:0},filterParams:{invoiceCode:"",timeCreatedTo:"",timeCreatedFrom:""},items:[]}},mounted(){this.getItems()},methods:{exportBills(){this.$apiCall("api.AccountPayment.exportRecordByVendor",{notEcommerce:1,invoiceCode:this.filterParams.invoiceCode||"",timeCreatedTo:this.filterParams.timeCreatedTo||"",timeCreatedFrom:this.filterParams.timeCreatedFrom||""},t=>{9999==t.ErrorCode?window.open(t.Data.Results.file,"Bill"):this.$elementMessage(t.Message,"error")})},clearFilter(){this.selectedDate=[],this.filterParams={invoiceCode:"",timeCreatedTo:"",timeCreatedFrom:""},this.getItems()},dateChange(t){t?(this.filterParams.timeCreatedFrom=this.$moment(t[0]).format("YYYY-MM-DD"),this.filterParams.timeCreatedTo=this.$moment(t[1]).format("YYYY-MM-DD")):(this.filterParams.timeCreatedFrom="",this.filterParams.timeCreatedTo="")},getItems(){this.loading=!0,console.log("timeTo",this.filterParams.timeCreatedTo),console.log("timeFrom",this.filterParams.timeCreatedFrom),this.$apiCall("api.AccountPayment.findRecordByVendor",{notEcommerce:1,type:1,invoiceCode:this.filterParams.invoiceCode||"",timeCreatedTo:this.filterParams.timeCreatedTo||"",timeCreatedFrom:this.filterParams.timeCreatedFrom||"",page:this.pagination.currentPage||1,rowsPerPage:this.pagination.pageSize||10},t=>{9999==t.ErrorCode?(this.pagination.total=Number(t.Data.Pagination.totalCount),this.items=t.Data.Results,this.loading=!1):this.$elementMessage(t.Message,"error")})}}},s=l,o=(a("ca95"),a("2877")),n=Object(o["a"])(s,i,r,!1,null,"32b1bd81",null);e["default"]=n.exports},"9b02":function(t,e,a){},ca95:function(t,e,a){"use strict";a("9b02")}}]);