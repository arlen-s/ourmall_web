(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["transactionDetail"],{"059d":function(e,t,a){"use strict";a("1d61")},"1a71":function(e,t,a){},"1d61":function(e,t,a){},6648:function(e,t,a){},ac11:function(e,t,a){"use strict";a("1a71")},b24b:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel transaction-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-s-finance"}),a("h2",[e._v(e._s(e.$t("提现列表")))])])]),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodCustom,loading:e.selectLoading,placeholder:e.$t("pleaseCusName"),clearable:""},on:{change:function(t){return e.filterItem("relationshipId")},clear:e.close},model:{value:e.filterParams.name,callback:function(t){e.$set(e.filterParams,"name",t)},expression:"filterParams.name"}},e._l(e.selectArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.customerName,value:e.customerName}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("提现方式")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:e.$t("All"),clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("drawType")}},model:{value:e.filterParams.drawType,callback:function(t){e.$set(e.filterParams,"drawType",t)},expression:"filterParams.drawType"}},e._l(e.typeArrMail,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("CreateDate")}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",placement:"top",type:"daterange",align:"right","unlink-panels":"","range-separator":e.$t("to"),"start-placeholder":e.$t("startDate"),"end-placeholder":e.$t("endDate")},on:{clear:function(t){return e.clearFilter("date")},change:e.dateChange},model:{value:e.filterParams.date,callback:function(t){e.$set(e.filterParams,"date",t)},expression:"filterParams.date"}})],1),a("el-form-item",{attrs:{label:e.$t("accountPayee")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:e.$t("All"),clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("accountPayee")}},model:{value:e.filterParams.accountPayee,callback:function(t){e.$set(e.filterParams,"accountPayee",t)},expression:"filterParams.accountPayee"}},e._l(e.accountPayeeArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterItem}},[e._v(e._s(e.$t("Filter"))+" ")]),a("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear"))+" ")])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.items,"tooltip-effect":"dark","row-key":function(e){return e.id}}},[a("el-table-column",{attrs:{label:e.$t("customersName")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.customerName||"--"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("提现方式")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1==t.row.drawType?e.$t("余额"):e.$t("线下")))])]}}])}),a("el-table-column",{attrs:{label:e.$t("状态")},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.drawStatus?a("span",[e._v(e._s(e.$t("待审核")))]):2==t.row.drawStatus?a("span",[e._v(e._s(e.$t("通过")))]):a("span",[e._v(e._s(e.$t("拒绝")))])]}}])}),a("el-table-column",{attrs:{label:""+e.$t("tradeAmount")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.amount||"--"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Remark")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remark||"---"))])]}}])})],1),e.items.length?a("el-row",{staticStyle:{"margin-top":"10px"},attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(e.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1)],1)],1)],1)])},i=[],s=(a("b0c0"),a("a9e3"),a("159b"),a("ade3")),l={data:function(){var e;return e={loading:!1,vendorId:localStorage.getItem("vendorId"),pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("transactionRowsPerPage")?Number(localStorage.getItem("transactionRowsPerPage")):10,items:[],selectLoading:!1,selectArr:[],total:0,totalPage:0,typeArrMail:[{value:"1",label:this.$t("余额")},{value:"2",label:this.$t("线下")}],filterParams:{name:"",accountPayee:"",tradeStatus:"",tradeType:"",date:[],drawType:"",timeCreatedFrom:"",timeCreatedTo:"",creditStatus:"2",relationshipId:""},accountPayeeArr:[{id:1,name:this.$t("待审批")},{id:2,name:this.$t("已审批")}]},Object(s["a"])(e,"selectArr",[]),Object(s["a"])(e,"filterParamsDefault","{}"),e},components:{},watch:{},mounted:function(){this.getItem(),this.filterParamsDefault=JSON.stringify(this.filterParams)},methods:{remoteMethodCustom:function(e){var t=this;this.selectArr=[],e&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByVendor",{name:e},(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.selectArr=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changeStatus:function(e,t){var a=this;this.$apiCall("api.CustomerWithdrawal.checkStatus",{drawStatus:e,id:t.id},(function(e){a.selectLoading=!1,9999==e.ErrorCode?a.getItem():a.$message({message:e.Message,type:"error"})}))},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("transactionRowsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()},dateChange:function(){this.filterParams.date.length>1&&(this.filterParams.timeCreatedFrom=this.$moment(this.filterParams.date[0]).format("YYYY-MM-DD"),this.filterParams.timeCreatedTo=this.$moment(this.filterParams.date[1]).format("YYYY-MM-DD"),this.filterItem())},clearFilter:function(e){switch(e){case"tradeStatus":this.filterParams.tradeStatus="";break;case"accountPayee":this.filterParams.accountPayee="";break;case"date":this.filterParams.date=[],this.filterParams.timeCreatedFrom="",this.filterParams.timeCreatedTo="";break;default:this.filterParams=JSON.parse(this.filterParamsDefault);break}this.filterItem()},filterItem:function(e){var t=this;this.$refs.gridTable.clearSelection(),"relationshipId"==e?(this.selectArr.forEach((function(e){e.customerName==t.filterParams.name&&(t.filterParams.relationshipId=e.id)})),this.getItem()):1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}}),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},close:function(){this.selectArr=[],this.filterParams.relationshipId="",this.getItem()},getItem:function(e){var t=this;console.log(this.filterParams.creditStatus,"this.filterParams.creditStatus"),this.loading=!0,this.$apiCall("api.CustomerWithdrawal.get",{page:this.page,rowsPerPage:this.rowsPerPage,timeCreatedFrom:this.filterParams.timeCreatedFrom,timeCreatedTo:this.filterParams.timeCreatedTo,customerId:this.filterParams.relationshipId,drawType:this.filterParams.drawType,drawStatus:this.filterParams.accountPayee},(function(e){t.loading=!1,9999==e.ErrorCode?(t.items=e.Data.Results,t.total=Number(e.Data.Pagination.totalCount),t.totalPage=Number(e.Data.Pagination.totalPage)):t.$message({message:e.Message,type:"error"})}))}}},o=l,n=(a("ff37"),a("2877")),c=Object(n["a"])(o,r,i,!1,null,"07b12739",null);t["default"]=c.exports},c330:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel transaction-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-s-finance"}),a("h2",[e._v(e._s(e.$t("Transaction")))])])]),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:e.$t("normal bill"),name:"2"}},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{attrs:{label:e.$t("Create Date")}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","start-placeholder":"Start","end-placeholder":"End"},on:{clear:function(t){return e.clearFilter("date")},change:e.dateChange},model:{value:e.filterParams.date,callback:function(t){e.$set(e.filterParams,"date",t)},expression:"filterParams.date"}})],1),a("el-form-item",[a("el-radio-group",{attrs:{size:"mini"},on:{change:e.filterDate},model:{value:e.dateFilter,callback:function(t){e.dateFilter=t},expression:"dateFilter"}},[a("el-radio-button",{attrs:{label:"1"}},[e._v(e._s(e.$t("Today")))]),a("el-radio-button",{attrs:{label:"2"}},[e._v(e._s(e.$t("Yesterday"))+" ")]),a("el-radio-button",{attrs:{label:"3"}},[e._v(e._s(e.$t("Last 7 days"))+" ")]),a("el-radio-button",{attrs:{label:"4"}},[e._v(e._s(e.$t("Last 30 days"))+" ")])],1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Payment code"),clearable:""},on:{clear:function(t){return e.clearFilter("paymentCode")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.paymentCode,callback:function(t){e.$set(e.filterParams,"paymentCode",t)},expression:"filterParams.paymentCode"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Third Party Number"),clearable:""},on:{clear:function(t){return e.clearFilter("code")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.code,callback:function(t){e.$set(e.filterParams,"code",t)},expression:"filterParams.code"}})],1),a("el-form-item",{attrs:{label:e.$t("Trade type")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("tradeType")}},model:{value:e.filterParams.tradeType,callback:function(t){e.$set(e.filterParams,"tradeType",t)},expression:"filterParams.tradeType"}},e._l(e.tradeTypeArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("Trade status")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("tradeStatus")}},model:{value:e.filterParams.tradeStatus,callback:function(t){e.$set(e.filterParams,"tradeStatus",t)},expression:"filterParams.tradeStatus"}},e._l(e.tradeStatusArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("Account payee")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("accountPayee")}},model:{value:e.filterParams.accountPayee,callback:function(t){e.$set(e.filterParams,"accountPayee",t)},expression:"filterParams.accountPayee"}},e._l(e.accountPayeeArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Order number"),clearable:""},on:{clear:function(t){return e.clearFilter("shopifyOrder")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.shopifyOrder,callback:function(t){e.$set(e.filterParams,"shopifyOrder",t)},expression:"filterParams.shopifyOrder"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterItem}},[e._v(e._s(e.$t("Filter")))]),a("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear")))])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.items,"tooltip-effect":"dark","row-key":function(e){return e.id}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{label:e.$t("Create Date"),width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.moment.unix(t.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Payment code"),width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sysCode||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Third Party Number"),"min-width":"350"},scopedSlots:e._u([{key:"default",fn:function(t){return["96"==t.row.code||"97"==t.row.code||"98"==t.row.code||"99"==t.row.code?a("span",[e._v("---")]):a("span",[e._v(e._s(t.row.code||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Trade type"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("tradeType",t.row.type)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Trade amount")+"("+e.$store.state.country.symbol+")",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[3==t.row.status?a("span",{staticClass:"tx-danger"},[e._v("- "+e._s(t.row.totalAmount))]):a("span",[e._v(e._s(t.row.totalAmount))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Trade status"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("tradeStatus",t.row.status)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Payment type"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("platformType",t.row.platformType)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Remark")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remark||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Operate"),width:"120",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-link",{staticClass:"mg-r-20",attrs:{disabled:"1"!=t.row.type,type:"primary"},on:{click:function(a){return e.openExportDetail(t.row)}}},[e._v(" "+e._s(e.$t("View detail"))+" ")]),a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.exportPdf(t.row)}}},[e._v(" "+e._s(e.$t("download PDF"))+" ")])],1)]}}])})],1)],1)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1),a("el-tab-pane",{attrs:{label:e.$t("abnormal bill"),name:"1"}},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{attrs:{label:e.$t("Create Date")}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","start-placeholder":"Start","end-placeholder":"End"},on:{clear:function(t){return e.clearFilter("date")},change:e.dateChange},model:{value:e.filterParams.date,callback:function(t){e.$set(e.filterParams,"date",t)},expression:"filterParams.date"}})],1),a("el-form-item",[a("el-radio-group",{attrs:{size:"mini"},on:{change:e.filterDate},model:{value:e.dateFilter,callback:function(t){e.dateFilter=t},expression:"dateFilter"}},[a("el-radio-button",{attrs:{label:"1"}},[e._v(e._s(e.$t("Today")))]),a("el-radio-button",{attrs:{label:"2"}},[e._v(e._s(e.$t("Yesterday"))+" ")]),a("el-radio-button",{attrs:{label:"3"}},[e._v(e._s(e.$t("Last 7 days"))+" ")]),a("el-radio-button",{attrs:{label:"4"}},[e._v(e._s(e.$t("Last 30 days"))+" ")])],1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Payment code"),clearable:""},on:{clear:function(t){return e.clearFilter("paymentCode")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.paymentCode,callback:function(t){e.$set(e.filterParams,"paymentCode",t)},expression:"filterParams.paymentCode"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Third Party Number"),clearable:""},on:{clear:function(t){return e.clearFilter("code")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.code,callback:function(t){e.$set(e.filterParams,"code",t)},expression:"filterParams.code"}})],1),a("el-form-item",{attrs:{label:e.$t("Trade type")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("tradeType")}},model:{value:e.filterParams.tradeType,callback:function(t){e.$set(e.filterParams,"tradeType",t)},expression:"filterParams.tradeType"}},e._l(e.tradeTypeArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("Trade status")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("tradeStatus")}},model:{value:e.filterParams.tradeStatus,callback:function(t){e.$set(e.filterParams,"tradeStatus",t)},expression:"filterParams.tradeStatus"}},e._l(e.tradeStatusArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("Account payee")}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"all",clearable:""},on:{change:e.filterItem,clear:function(t){return e.clearFilter("accountPayee")}},model:{value:e.filterParams.accountPayee,callback:function(t){e.$set(e.filterParams,"accountPayee",t)},expression:"filterParams.accountPayee"}},e._l(e.accountPayeeArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Order number"),clearable:""},on:{clear:function(t){return e.clearFilter("shopifyOrder")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItem(t)}},model:{value:e.filterParams.shopifyOrder,callback:function(t){e.$set(e.filterParams,"shopifyOrder",t)},expression:"filterParams.shopifyOrder"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterItem}},[e._v(e._s(e.$t("Filter")))]),a("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear")))])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.items,"tooltip-effect":"dark","row-key":function(e){return e.id}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{label:e.$t("Create Date"),width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.moment.unix(t.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Payment code"),width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sysCode||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Third Party Number"),"min-width":"350"},scopedSlots:e._u([{key:"default",fn:function(t){return["96"==t.row.code||"97"==t.row.code||"98"==t.row.code||"99"==t.row.code?a("span",[e._v("---")]):a("span",[e._v(e._s(t.row.code||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Trade type"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("tradeType",t.row.type)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Amount paid/Credit payment"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"tx-danger"},[e._v(" "+e._s(Number(t.row.bonusAmount).toFixed(2)))]),e._v(" "),a("br"),a("span",[e._v(e._s(Number(t.row.creditAmount).toFixed(2)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Trade status"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("tradeStatus",t.row.status)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Payment type"),width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.filterText("platformType",t.row.platformType)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Remark")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.remark||"---"))])]}}])}),a("el-table-column",{attrs:{label:e.$t("Operate"),width:"120",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-link",{staticClass:"mg-r-20",attrs:{disabled:"1"!=t.row.type,type:"primary"},on:{click:function(a){return e.openExportDetail(t.row)}}},[e._v(" "+e._s(e.$t("View detail"))+" ")]),a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.exportPdf(t.row)}}},[e._v(" "+e._s(e.$t("download PDF"))+" ")])],1)]}}])})],1)],1)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1)],1)],1),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}}),a("el-dialog",{staticClass:"dialog-open-custom",attrs:{title:"Detail export records",visible:e.viewDetail.isShow,width:"50%"},on:{close:function(t){e.viewDetail.isShow=!1}}},[a("el-divider"),a("div",{staticClass:"dialog-body"},[a("el-row",{staticClass:"tltle"},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("The export of time"))+"："+e._s(e.moment().format("YYYY-MM-DD HH:mm:ss"))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Petitioner："))+e._s(e.$store.state.userInfo.name)+" ")])])],1),e._l(e.viewDetail.items,(function(t,r){return a("div",{key:r,staticClass:"item-wrap"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Create Date"))+"："+e._s(e.moment.unix(t.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Payment code"))+"："+e._s(t.sysCode)+" ")])])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Trade type"))+"："+e._s(e.filterText("tradeType",t.type))+" ")])]),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Trade amount"))+"("+e._s(e.$store.state.country.symbol)+")："+e._s(e.$exchangeRate(t.totalAmount))+" ")])])],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[e._v(" "+e._s(e.$t("Third Party Number"))+"："+e._s(t.code)+" ")])])],1)],1)}))],2),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.viewDetail.isShow=!1}}},[e._v(e._s(e.$t("Cancel")))]),a("el-button",{attrs:{type:"primary",loading:e.viewDetail.exportLoading},on:{click:e.exportDetailFn}},[e._v(" "+e._s(e.$t("Export"))+" ")])],1)],1),a("DialogDetail",{attrs:{data:e.dialogDetailData}})],1)},i=[],s=(a("d81d"),a("b0c0"),a("a9e3"),a("b64b"),a("159b"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"Billing Detail",visible:e.data.isShow,width:"960px","custom-class":"d-detail"},on:{"update:visible":function(t){return e.$set(e.data,"isShow",t)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("div",{staticClass:"t-table"},[a("div",{staticClass:"t-header"},[a("div",{staticClass:"c c1"},[e._v(e._s(e.$t("Your shop order num")))]),a("div",{staticClass:"c c2"},[e._v(e._s(e.$t("Order Number")))]),a("div",{staticClass:"c c3"},[e._v(e._s(e.$t("Total Payment"))+"("+e._s(e.$store.state.country.symbol)+")")]),a("div",{staticClass:"c c4"},[e._v(e._s(e.$t("Freight"))+"("+e._s(e.$store.state.country.symbol)+")")]),a("div",{staticClass:"c c5"},[e._v(e._s(e.$t("Total Merchandise"))+"("+e._s(e.$store.state.country.symbol)+")")]),a("div",{staticClass:"c c6"},[e._v(e._s(e.$t("SKU Details")))]),a("div",{staticClass:"c c7"},[e._v(e._s(e.$t("Commodity Price"))+"("+e._s(e.$store.state.country.symbol)+")")]),a("div",{staticClass:"c c8"},[e._v(e._s(e.$t("Quantity")))]),a("div",{staticClass:"c c9"},[e._v(e._s(e.$t("weight"))+"(g)")])]),a("div",{staticClass:"t-body"},e._l(e.data.items,(function(t){return a("div",{key:t.id,staticClass:"t-row"},[a("div",{staticClass:"c c1"},[e._v(e._s(t.codeName))]),a("div",{staticClass:"c c2"},[e._v(e._s(t.orderId))]),a("div",{staticClass:"c c3"},[e._v(e._s(t.payTotalAmount))]),a("div",{staticClass:"c c4"},[e._v(e._s(t.shippingAllAmount))]),a("div",{staticClass:"c c5"},[e._v(e._s(t.itemAllAmount))]),a("div",{staticClass:"c c6-9"},e._l(t.items,(function(t){return a("div",{key:t.id,staticClass:"c-sub"},[a("div",{staticClass:"c c6"},[e._v(e._s(t.vendorSku))]),a("div",{staticClass:"c c7"},[e._v(e._s(t.vendorPrice))]),a("div",{staticClass:"c c8"},[e._v(e._s(t.quantity))]),a("div",{staticClass:"c c9"},[e._v(e._s(Number(t.weight)*Number(t.quantity)))])])})),0)])})),0)])]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.data.isShow=!1}}},[e._v(e._s(e.$t("Cancel")))]),a("el-button",{attrs:{type:"primary",loading:e.data.loading},on:{click:e.exportDetailFn}},[e._v(" "+e._s(e.$t("Export"))+" ")])],1)],1)}),l=[],o={props:["data"],methods:{exportDetailFn:function(){var e=this;this.data.loading=!0,0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>'),this.$apiCall("api.AccountPayment.exportPayment",{ids:this.data.ids,isNew:1},(function(t){e.data.loading=!1,"9999"==t.ErrorCode?(document.getElementById("ifilePro").src=t.Data.Results.file,e.$elementMessage("Export success","success"),e.data.isShow=!1):e.$elementMessage(t.Message,"error")}))}}},n=o,c=(a("cff6"),a("2877")),d=Object(c["a"])(n,s,l,!1,null,"00bc079f",null),u=d.exports,m={data:function(){return{loading:!1,pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_transactionRowsPerPage")?Number(localStorage.getItem("c_transactionRowsPerPage")):10,items:[],total:0,activeName:"2",totalPage:0,filterParams:{vendorName:"",paymentCode:"",code:"",accountPayee:"",tradeStatus:"",tradeType:"",date:[],timeCreatedFrom:"",timeCreatedTo:"",shopifyOrder:"",creditStatus:"2"},filterParamsDefault:"{}",dateFilter:"",viewDetail:{isShow:!1,exportLoading:!1,items:[]},tradeTypeArr:[{id:1,name:this.$t("Payment order")},{id:6,name:this.$t("Refund order")},{id:7,name:this.$t("Wallet card")},{id:8,name:this.$t("Manual deduction")}],tradeStatusArr:[{id:1,name:this.$t("Paying")},{id:2,name:this.$t("Account paid")},{id:3,name:this.$t("Refunded")},{id:9,name:this.$t("Cancel")}],accountPayeeArr:[{id:1,name:"stripe"},{id:2,name:"ebanx"},{id:3,name:"PayPal"},{id:4,name:"checkout"},{id:6,name:"Bonus balance"},{id:7,name:"Credit"},{id:8,name:"balance + credit"},{id:10,name:"dLocal"},{id:11,name:"PAYONEER"},{id:12,name:"Offline payment"}],checkItems:[],dialogDetailData:{isShow:!1,loading:!1,ids:[],items:[]},defaultDialogDetailData:"{}"}},components:{DialogDetail:u},watch:{$route:"gotoPage"},mounted:function(){this.defaultDialogDetailData=JSON.stringify(this.dialogDetailData),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem()},methods:{openExportDetail:function(e){var t=this;this.loading=!0,this.$apiCall("api.AccountPayment.getInvoiceShopifyInfo",{id:e.id},(function(a){t.loading=!1,"9999"==a.ErrorCode?(t.dialogDetailData=JSON.parse(t.defaultDialogDetailData),t.dialogDetailData.ids=[e.id],t.dialogDetailData.items=Object.keys(a.Data.Results).map((function(e){return a.Data.Results[e]})),t.dialogDetailData.isShow=!0):t.$elementMessage(a.Message,"error")}))},exportPdf:function(e){console.log(e,"trwrw");var t=this.$router.resolve({path:"/bill?uniCode="+e.invoice.uniCode});window.open(t.href,"_blank")},setOrder:function(e){var t=this;this.$apiCall("api.AccountPayment.changeCreditStatus",{id:e.id},(function(e){t.loading=!1,"9999"==e.ErrorCode?(t.$elementMessage(e.Message,"success"),t.getItem()):t.$elementMessage(e.Message,"error")}))},exportDetailFn:function(){var e=this,t=[];if(this.viewDetail.items.length){this.viewDetail.items.forEach((function(e){t.push(e.id)})),this.viewDetail.exportLoading=!0,0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>');var a=function(e){document.getElementById("ifilePro").src=e},r="api.AccountPayment.exportPayment";this.$apiCall(r,{ids:t},(function(t){e.viewDetail.exportLoading=!1,"9999"==t.ErrorCode?(e.$elementMessage("Export success","success"),a(t.Data.Results.file)):(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure(e))}))}},handleClick:function(e,t){this.filterParams={vendorName:"",paymentCode:"",code:"",accountPayee:"",tradeStatus:"",tradeType:"",date:[],timeCreatedFrom:"",timeCreatedTo:"",shopifyOrder:"",creditStatus:e.name},this.$refs.gridTable.clearSelection(),this.getItem()},handleSelectionChange:function(e){this.viewDetail.items=[],this.checkItems=[],e.length&&(this.viewDetail.items=e,this.checkItems=e)},viewDetailFn:function(e,t){this.viewDetail.isShow=!0,"row"==e&&(this.viewDetail.items=[],this.viewDetail.items.push(t))},filterText:function(e,t){var a;switch(e){case"tradeType":this.tradeTypeArr.forEach((function(e){e.id==t&&(a=e)}));break;case"tradeStatus":this.tradeStatusArr.forEach((function(e){e.id==t&&(a=e)}));break;case"platformType":this.accountPayeeArr.forEach((function(e){e.id==t&&(a=e)}));break;default:break}return a?a.name:"---"},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_transactionRowsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?Number(this.$route.query.page):1,this.getItem()},filterDate:function(){var e=Number(this.dateFilter),t=moment().format("YYYY-MM-DD"),a=moment().add(-1,"days").format("YYYY-MM-DD"),r=moment().add(-6,"days").format("YYYY-MM-DD"),i=moment().add(-29,"days").format("YYYY-MM-DD");switch(this.filterParams.timeCreatedTo=t,e){case 1:this.filterParams.timeCreatedFrom=t;break;case 2:this.filterParams.timeCreatedFrom=a,this.filterParams.timeCreatedTo=a;break;case 3:this.filterParams.timeCreatedFrom=r;break;case 4:this.filterParams.timeCreatedFrom=i;break;default:break}this.filterItem()},dateChange:function(){this.filterParams.date.length>1&&(this.filterParams.timeCreatedFrom=moment(this.filterParams.date[0]).format("YYYY-MM-DD"),this.filterParams.timeCreatedTo=moment(this.filterParams.date[1]).format("YYYY-MM-DD"),this.filterItem())},clearFilter:function(e){switch(e){case"shopifyOrder":this.filterParams.shopifyOrder="";break;case"paymentCode":this.filterParams.paymentCode="";break;case"code":this.filterParams.code="";break;case"vendorName":this.filterParams.vendorName="";break;case"tradeType":this.filterParams.tradeType="";break;case"tradeStatus":this.filterParams.tradeStatus="";break;case"accountPayee":this.filterParams.accountPayee="";break;case"date":this.filterParams.date=[],this.filterParams.timeCreatedFrom="",this.filterParams.timeCreatedTo="";break;default:this.dateFilter="",this.filterParams=JSON.parse(this.filterParamsDefault);break}this.filterItem()},filterItem:function(e){this.$refs.gridTable.clearSelection(),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},getItem:function(e){var t=this;this.loading=!0,this.$apiCall("api.AccountPayment.findByCustomer",{page:this.page,rowsPerPage:this.rowsPerPage,timeCreatedFrom:this.filterParams.timeCreatedFrom,timeCreatedTo:this.filterParams.timeCreatedTo,sysCode:this.filterParams.paymentCode,code:this.filterParams.code,platformType:this.filterParams.accountPayee,paymentType:this.filterParams.tradeType,status:this.filterParams.tradeStatus,shopifyOrder:this.filterParams.shopifyOrder,creditStatus:this.activeName},(function(e){t.loading=!1,9999==e.ErrorCode?(t.items=e.Data.Results,t.total=Number(e.Data.Pagination.totalCount),t.totalPage=Number(e.Data.Pagination.totalPage)):t.$message({message:e.Message,type:"error"})}))}}},f=m,p=(a("ac11"),a("059d"),Object(c["a"])(f,r,i,!1,null,"119c632d",null));t["default"]=p.exports},cff6:function(e,t,a){"use strict";a("6648")},fb02:function(e,t,a){},ff37:function(e,t,a){"use strict";a("fb02")}}]);
//# sourceMappingURL=transactionDetail.11dfe635.js.map