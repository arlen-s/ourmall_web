(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["transactionDetail"],{3888:function(t,e,a){"use strict";a("ce68")},5303:function(t,e,a){"use strict";a("97b7")},"97b7":function(t,e,a){},c330:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel transaction-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-s-finance"}),a("h2",[t._v(t._s(t.$t("transaction.title")))])])]),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("transaction.正常账单"),name:"2"}},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{attrs:{label:t.$t("transaction.CreateDate")}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":t.$t("myinvoice.to"),"start-placeholder":t.$t("myinvoice.startDate"),"end-placeholder":t.$t("myinvoice.endDate")},on:{clear:function(e){return t.clearFilter("date")},change:t.dateChange},model:{value:t.filterParams.date,callback:function(e){t.$set(t.filterParams,"date",e)},expression:"filterParams.date"}})],1),a("el-form-item",[a("el-radio-group",{attrs:{size:"mini"},on:{change:t.filterDate},model:{value:t.dateFilter,callback:function(e){t.dateFilter=e},expression:"dateFilter"}},[a("el-radio-button",{attrs:{label:"1"}},[t._v(t._s(t.$t("transaction.today")))]),a("el-radio-button",{attrs:{label:"2"}},[t._v(t._s(t.$t("transaction.yestoday"))+" ")]),a("el-radio-button",{attrs:{label:"3"}},[t._v(t._s(t.$t("transaction.last7Days"))+" ")]),a("el-radio-button",{attrs:{label:"4"}},[t._v(t._s(t.$t("transaction.last30Days"))+" ")])],1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.paymentCode"),clearable:""},on:{clear:function(e){return t.clearFilter("paymentCode")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.paymentCode,callback:function(e){t.$set(t.filterParams,"paymentCode",e)},expression:"filterParams.paymentCode"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.third"),clearable:""},on:{clear:function(e){return t.clearFilter("code")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.code,callback:function(e){t.$set(t.filterParams,"code",e)},expression:"filterParams.code"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.verdorName"),clearable:""},on:{clear:function(e){return t.clearFilter("verdorName")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.verdorName,callback:function(e){t.$set(t.filterParams,"verdorName",e)},expression:"filterParams.verdorName"}})],1),a("el-form-item",{attrs:{label:t.$t("transaction.tradeType")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("tradeType")}},model:{value:t.filterParams.tradeType,callback:function(e){t.$set(t.filterParams,"tradeType",e)},expression:"filterParams.tradeType"}},t._l(t.tradeTypeArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("transaction.tradeStatus")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("tradeStatus")}},model:{value:t.filterParams.tradeStatus,callback:function(e){t.$set(t.filterParams,"tradeStatus",e)},expression:"filterParams.tradeStatus"}},t._l(t.tradeStatusArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("transaction.accountPayee")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("accountPayee")}},model:{value:t.filterParams.accountPayee,callback:function(e){t.$set(t.filterParams,"accountPayee",e)},expression:"filterParams.accountPayee"}},t._l(t.accountPayeeArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("discount.订单编号"),clearable:""},on:{clear:function(e){return t.clearFilter("shopifyOrder")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.shopifyOrder,callback:function(e){t.$set(t.filterParams,"shopifyOrder",e)},expression:"filterParams.shopifyOrder"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.filterItem}},[t._v(t._s(t.$t("transaction.filter"))+" ")]),a("el-button",{attrs:{type:"danger"},on:{click:t.clearFilter}},[t._v(t._s(t.$t("transaction.clear"))+" ")])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.items,"tooltip-effect":"dark","row-key":function(t){return t.id}}},[a("el-table-column",{attrs:{label:t.$t("transaction.CreateDate")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.$moment.unix(e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.paymentCode")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.sysCode||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.third")},scopedSlots:t._u([{key:"default",fn:function(e){return["96"==e.row.code||"97"==e.row.code||"98"==e.row.code||"99"==e.row.code?a("span",[t._v("---")]):a("span",[t._v(t._s(e.row.code||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.verdorName")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.customerName||"---"))])]}}])}),148982!=t.vendorId||146428!=t.vendorId||144875!=t.vendorId||144843!=t.vendorId||143779!=t.vendorId||143654!=t.vendorId||140694!=t.vendorId||74!=t.vendorId?a("el-table-column",{attrs:{label:t.$t("transaction.仓库")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.warehouseName||"--"))])]}}],null,!1,605806532)}):t._e(),a("el-table-column",{attrs:{label:t.$t("transaction.tradeType")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("tradeType",e.row.type)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.tradeAmount")},scopedSlots:t._u([{key:"default",fn:function(e){return[3==e.row.status?a("span",{staticClass:"tx-danger"},[t._v("- "+t._s(e.row.totalAmount))]):a("span",[t._v(t._s(e.row.totalAmount))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.tradeStatus")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("tradeStatus",e.row.status)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.paymentType")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("platformType",e.row.platformType)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.备注")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.operate"),width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-link",{staticClass:"mg-r-20",attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite)||"1"!=e.row.type,type:"primary"},on:{click:function(a){return t.openExportDetail(e.row)}}},[t._v(" "+t._s(t.$t("transaction.detailView"))+" ")])],1)]}}])})],1)],1)],1)],1),t.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1),a("el-tab-pane",{attrs:{label:t.$t("transaction.异常账单"),name:"1"}},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-radio-group",{attrs:{size:"mini"},on:{change:t.filterDate},model:{value:t.dateFilter,callback:function(e){t.dateFilter=e},expression:"dateFilter"}},[a("el-radio-button",{attrs:{label:"1"}},[t._v(t._s(t.$t("transaction.today")))]),a("el-radio-button",{attrs:{label:"2"}},[t._v(t._s(t.$t("transaction.yestoday"))+" ")]),a("el-radio-button",{attrs:{label:"3"}},[t._v(t._s(t.$t("transaction.last7Days"))+" ")]),a("el-radio-button",{attrs:{label:"4"}},[t._v(t._s(t.$t("transaction.last30Days"))+" ")])],1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.paymentCode"),clearable:""},on:{clear:function(e){return t.clearFilter("paymentCode")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.paymentCode,callback:function(e){t.$set(t.filterParams,"paymentCode",e)},expression:"filterParams.paymentCode"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.third"),clearable:""},on:{clear:function(e){return t.clearFilter("code")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.code,callback:function(e){t.$set(t.filterParams,"code",e)},expression:"filterParams.code"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("transaction.verdorName"),clearable:""},on:{clear:function(e){return t.clearFilter("verdorName")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.verdorName,callback:function(e){t.$set(t.filterParams,"verdorName",e)},expression:"filterParams.verdorName"}})],1),a("el-form-item",{attrs:{label:t.$t("transaction.tradeType")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("tradeType")}},model:{value:t.filterParams.tradeType,callback:function(e){t.$set(t.filterParams,"tradeType",e)},expression:"filterParams.tradeType"}},t._l(t.tradeTypeArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("transaction.tradeStatus")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("tradeStatus")}},model:{value:t.filterParams.tradeStatus,callback:function(e){t.$set(t.filterParams,"tradeStatus",e)},expression:"filterParams.tradeStatus"}},t._l(t.tradeStatusArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("transaction.accountPayee")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:t.$t("transaction.all"),clearable:""},on:{change:t.filterItem,clear:function(e){return t.clearFilter("accountPayee")}},model:{value:t.filterParams.accountPayee,callback:function(e){t.$set(t.filterParams,"accountPayee",e)},expression:"filterParams.accountPayee"}},t._l(t.accountPayeeArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:t.$t("discount.订单编号"),clearable:""},on:{clear:function(e){return t.clearFilter("shopifyOrder")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.shopifyOrder,callback:function(e){t.$set(t.filterParams,"shopifyOrder",e)},expression:"filterParams.shopifyOrder"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.filterItem}},[t._v(t._s(t.$t("transaction.filter"))+" ")]),a("el-button",{attrs:{type:"danger"},on:{click:t.clearFilter}},[t._v(t._s(t.$t("transaction.clear"))+" ")])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.items,"tooltip-effect":"dark","row-key":function(t){return t.id}}},[a("el-table-column",{attrs:{label:t.$t("transaction.CreateDate")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.$moment.unix(e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.paymentCode")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.sysCode||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.third")},scopedSlots:t._u([{key:"default",fn:function(e){return["96"==e.row.code||"97"==e.row.code||"98"==e.row.code||"99"==e.row.code?a("span",[t._v("---")]):a("span",[t._v(t._s(e.row.code||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.verdorName")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.customerName||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.tradeType")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("tradeType",e.row.type)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.交易"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"tx-danger"},[t._v(" "+t._s(Number(e.row.bonusAmount).toFixed(2)))]),t._v(" "),a("br"),a("span",[t._v(t._s(Number(e.row.creditAmount).toFixed(2)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.tradeStatus")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("tradeStatus",e.row.status)))])]}}])}),148982!=t.vendorId||146428!=t.vendorId||144875!=t.vendorId||144843!=t.vendorId||143779!=t.vendorId||143654!=t.vendorId||140694!=t.vendorId||74!=t.vendorId?a("el-table-column",{attrs:{label:t.$t("transaction.仓库")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.warehouseName||"--"))])]}}],null,!1,605806532)}):t._e(),a("el-table-column",{attrs:{label:t.$t("transaction.paymentType")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.filterText("platformType",e.row.platformType)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.备注")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.operate"),width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-link",{staticClass:"mg-r-20",attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite)||"1"!=e.row.type,type:"primary"},on:{click:function(a){return t.openExportDetail(e.row)}}},[t._v(" "+t._s(t.$t("transaction.detailView"))+" ")]),t._v(" "),a("br"),a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.setOrder(e.row)}}},[t._v("处理")])],1)]}}])})],1)],1)],1)],1),t.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}}),a("el-dialog",{staticClass:"dialog-open-custom",attrs:{title:t.$t("transaction.exportTitle"),visible:t.viewDetail.isShow,width:"50%"},on:{close:function(e){t.viewDetail.isShow=!1}}},[a("el-divider"),a("div",{staticClass:"dialog-body"},[a("el-row",{staticClass:"tltle"},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.exportTime"))+"："+t._s(t.$moment().format("YYYY-MM-DD HH:mm:ss"))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.Petitioner"))+"："+t._s(t.$store.state.userInfo.name)+" ")])])],1),t._l(t.viewDetail.items,(function(e){return a("div",{staticClass:"item-wrap"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.CreateDate"))+"："+t._s(t.$moment.unix(e.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.paymentCode"))+"："+t._s(e.sysCode)+" ")])])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.tradeType"))+"："+t._s(t.filterText("tradeType",e.type))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.tradeAmount"))+"："+t._s(e.totalAmount)+" ")])])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[t._v(" "+t._s(t.$t("transaction.third"))+"："+t._s(e.code)+" ")])])],1)],1)}))],2),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.viewDetail.isShow=!1}}},[t._v(t._s(t.$t("transaction.cancel")))]),a("el-button",{attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite),type:"primary",loading:t.viewDetail.exportLoading},on:{click:t.exportDetailFn}},[t._v(" "+t._s(t.$t("transaction.export"))+" ")])],1)],1),a("DialogDetail",{attrs:{data:t.dialogDetailData}})],1)},i=[],s=(a("a9e3"),a("e9c4"),a("d81d"),a("b64b"),a("b0c0"),a("d3b7"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.$t("transaction.支付明细"),visible:t.data.isShow,width:"960px","custom-class":"d-detail"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("div",{staticClass:"t-table"},[a("div",{staticClass:"t-header"},[a("div",{staticClass:"c c1"},[t._v(t._s(t.$t("transaction.第三方订单")))]),a("div",{staticClass:"c c2"},[t._v(t._s(t.$t("transaction.平台订单号")))]),a("div",{staticClass:"c c3"},[t._v(t._s(t.$t("transaction.实际支付总额"))+"($)")]),a("div",{staticClass:"c c4"},[t._v(t._s(t.$t("transaction.实际支付运费"))+"($)")]),a("div",{staticClass:"c c5"},[t._v(t._s(t.$t("transaction.实际支付商品总额"))+"($)")]),a("div",{staticClass:"c c6"},[t._v(t._s(t.$t("transaction.SKU明细")))]),a("div",{staticClass:"c c7"},[t._v(t._s(t.$t("transaction.实际支付商品单价"))+"($)")]),a("div",{staticClass:"c c8"},[t._v(t._s(t.$t("transaction.商品数量")))]),a("div",{staticClass:"c c9"},[t._v(t._s(t.$t("transaction.重量"))+"(g)")])]),a("div",{staticClass:"t-body"},t._l(t.data.items,(function(e){return a("div",{key:e.id,staticClass:"t-row"},[a("div",{staticClass:"c c1"},[t._v(t._s(e.codeName))]),a("div",{staticClass:"c c2"},[t._v(t._s(e.orderId))]),a("div",{staticClass:"c c3"},[t._v(t._s(e.payTotalAmount))]),a("div",{staticClass:"c c4"},[t._v(t._s(e.shippingAllAmount))]),a("div",{staticClass:"c c5"},[t._v(t._s(e.itemAllAmount))]),a("div",{staticClass:"c c6-9"},t._l(e.items,(function(e){return a("div",{key:e.id,staticClass:"c-sub"},[a("div",{staticClass:"c c6"},[t._v(t._s(e.vendorSku))]),a("div",{staticClass:"c c7"},[t._v(t._s(e.vendorPrice))]),a("div",{staticClass:"c c8"},[t._v(t._s(e.quantity))]),a("div",{staticClass:"c c9"},[t._v(t._s(Number(e.weight)*Number(e.quantity)))])])})),0)])})),0)])]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("transaction.cancel")))]),a("el-button",{attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite),type:"primary",loading:t.data.loading},on:{click:t.exportDetailFn}},[t._v(" "+t._s(t.$t("transaction.export"))+" ")])],1)],1)}),l=[],n={props:["data"],methods:{exportDetailFn:function(){var t=this;this.data.loading=!0,0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>'),console.log(this.data.ids),this.$apiCall("api.AccountPayment.exportPayment",{ids:this.data.ids,isNew:1},(function(e){t.data.loading=!1,"9999"==e.ErrorCode?(document.getElementById("ifilePro").src=e.Data.Results.file,t.$elementMessage(t.$t("myinvoice.exportSuccess"),"success"),t.data.isShow=!1):t.$elementMessage(e.Message,"error")}))}}},o=n,c=(a("5303"),a("2877")),d=Object(c["a"])(o,s,l,!1,null,"27830c0c",null),u=d.exports,m={data:function(){return{loading:!1,vendorId:localStorage.getItem("vendorId"),pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("transactionRowsPerPage")?Number(localStorage.getItem("transactionRowsPerPage")):10,items:[],total:0,activeName:"2",totalPage:0,filterParams:{verdorName:"",paymentCode:"",code:"",accountPayee:"",tradeStatus:"",tradeType:"",date:[],timeCreatedFrom:"",timeCreatedTo:"",shopifyOrder:"",creditStatus:"2"},filterParamsDefault:"{}",dateFilter:"",viewDetail:{isShow:!1,exportLoading:!1,items:[]},tradeTypeArr:[{id:1,name:this.$t("transaction.type1")},{id:6,name:this.$t("transaction.type6")},{id:7,name:this.$t("transaction.type7")},{id:8,name:this.$t("transaction.type8")}],tradeStatusArr:[{id:1,name:this.$t("transaction.status1")},{id:2,name:this.$t("transaction.status2")},{id:3,name:this.$t("transaction.status3")},{id:9,name:this.$t("transaction.status9")}],accountPayeeArr:[{id:1,name:"stripe"},{id:2,name:"ebanx"},{id:3,name:"PayPal"},{id:4,name:"checkout"},{id:6,name:this.$t("transaction.payment6")},{id:7,name:this.$t("transaction.payment7")},{id:8,name:this.$t("transaction.payment8")},{id:10,name:"dLocal"},{id:11,name:"PAYONEER"},{id:12,name:this.$t("transaction.payment12")}],checkItems:[],dialogDetailData:{isShow:!1,loading:!1,ids:[],items:[]},defaultDialogDetailData:"{}"}},components:{DialogDetail:u},watch:{$route:"gotoPage"},mounted:function(){this.defaultDialogDetailData=JSON.stringify(this.dialogDetailData),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem()},methods:{openExportDetail:function(t){var e=this;this.loading=!0,this.$apiCall("api.AccountPayment.getInvoiceShopifyInfo",{id:t.id},(function(a){e.loading=!1,"9999"==a.ErrorCode?(e.dialogDetailData=JSON.parse(e.defaultDialogDetailData),e.dialogDetailData.ids=[t.id],e.dialogDetailData.items=Object.keys(a.Data.Results).map((function(t){return a.Data.Results[t]})),e.dialogDetailData.isShow=!0):e.$elementMessage(a.Message,"error")}))},handleClick:function(t,e){console.log(this.activeName,"this.activeName"),this.filterParams={verdorName:"",paymentCode:"",code:"",accountPayee:"",tradeStatus:"",tradeType:"",date:[],timeCreatedFrom:"",timeCreatedTo:"",shopifyOrder:"",creditStatus:t.name},this.$refs.gridTable.clearSelection(),this.getItem()},exportDetailFn:function(){var t=this,e=[];if(this.viewDetail.items.length){this.viewDetail.items.forEach((function(t){e.push(t.id)})),this.viewDetail.exportLoading=!0,0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>');var a=function(t){document.getElementById("ifilePro").src=t},r="api.AccountPayment.exportPayment";this.$apiCall(r,{ids:e,isNew:1},(function(e){t.viewDetail.exportLoading=!1,"9999"==e.ErrorCode?(t.$elementMessage(t.$t("myinvoice.exportSuccess"),"success"),a(e.Data.Results.file)):(t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure(t))}))}},handleSelectionChange:function(t){this.viewDetail.items=[],this.checkItems=[],t.length&&(this.viewDetail.items=t,this.checkItems=t)},viewDetailFn:function(t,e){this.viewDetail.isShow=!0,"row"==t&&(this.viewDetail.items=[],this.viewDetail.items.push(e))},filterText:function(t,e){var a;switch(t){case"tradeType":this.tradeTypeArr.forEach((function(t){t.id==e&&(a=t)}));break;case"tradeStatus":this.tradeStatusArr.forEach((function(t){t.id==e&&(a=t)}));break;case"platformType":this.accountPayeeArr.forEach((function(t){t.id==e&&(a=t)}));break;default:break}return a?a.name:"---"},setOrder:function(t){var e=this;this.$apiCall("api.AccountPayment.changeCreditStatus",{id:t.id},(function(t){e.loading=!1,"9999"==t.ErrorCode?(e.$elementMessage(t.Message,"success"),e.getItem()):e.$elementMessage(t.Message,"error")}))},toPage:function(t){t!=this.$route.query.page&&this.$router.push({query:{page:t}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("transactionRowsPerPage",t),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()},filterDate:function(){var t=Number(this.dateFilter),e=this.$moment().format("YYYY-MM-DD"),a=this.$moment().add(-1,"days").format("YYYY-MM-DD"),r=this.$moment().add(-6,"days").format("YYYY-MM-DD"),i=this.$moment().add(-29,"days").format("YYYY-MM-DD");switch(this.filterParams.timeCreatedTo=e,t){case 1:this.filterParams.timeCreatedFrom=e;break;case 2:this.filterParams.timeCreatedFrom=a,this.filterParams.timeCreatedTo=a;break;case 3:this.filterParams.timeCreatedFrom=r;break;case 4:this.filterParams.timeCreatedFrom=i;break;default:break}this.filterItem()},dateChange:function(){this.filterParams.date.length>1&&(this.filterParams.timeCreatedFrom=this.$moment(this.filterParams.date[0]).format("YYYY-MM-DD"),this.filterParams.timeCreatedTo=this.$moment(this.filterParams.date[1]).format("YYYY-MM-DD"),this.filterItem())},clearFilter:function(t){switch(t){case"paymentCode":this.filterParams.paymentCode="";break;case"code":this.filterParams.code="";break;case"verdorName":this.filterParams.verdorName="";break;case"shopifyOrder":this.filterParams.shopifyOrder="";break;case"tradeType":this.filterParams.tradeType="";break;case"tradeStatus":this.filterParams.tradeStatus="";break;case"accountPayee":this.filterParams.accountPayee="";break;case"date":this.filterParams.date=[],this.filterParams.timeCreatedFrom="",this.filterParams.timeCreatedTo="";break;default:this.dateFilter="",this.filterParams=JSON.parse(this.filterParamsDefault);break}this.filterItem()},filterItem:function(t){this.$refs.gridTable.clearSelection(),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},getItem:function(t){var e=this;this.loading=!0,this.$apiCall("api.AccountPayment.findByVendor",{page:this.page,rowsPerPage:this.rowsPerPage,timeCreatedFrom:this.filterParams.timeCreatedFrom,timeCreatedTo:this.filterParams.timeCreatedTo,sysCode:this.filterParams.paymentCode,code:this.filterParams.code,nameLike:this.filterParams.verdorName,shopifyOrder:this.filterParams.shopifyOrder,platformType:this.filterParams.accountPayee,paymentType:this.filterParams.tradeType,status:this.filterParams.tradeStatus,creditStatus:this.activeName},(function(t){e.loading=!1,9999==t.ErrorCode?(e.items=t.Data.Results,e.total=Number(t.Data.Pagination.totalCount),e.totalPage=Number(t.Data.Pagination.totalPage)):e.$message({message:t.Message,type:"error"})}))}}},f=m,p=(a("3888"),Object(c["a"])(f,r,i,!1,null,"4a6b000a",null));e["default"]=p.exports},ce68:function(t,e,a){},d81d:function(t,e,a){"use strict";var r=a("23e7"),i=a("b727").map,s=a("1dde"),l=s("map");r({target:"Array",proto:!0,forced:!l},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);