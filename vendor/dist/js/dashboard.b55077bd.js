(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{4601:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"contentpanel dashboard-page"},[s("div",{staticClass:"pagetitle"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[s("i",{staticClass:"el-icon-s-home"}),s("h2",[t._v(t._s(t.$t("dashboard.dashboard")))])])]),s("div",{staticClass:"right"})]),s("div",{staticClass:"pagebody",staticStyle:{display:"none"}},[s("el-row",{staticClass:"mg-b-30",attrs:{gutter:15}},[s("el-col",{attrs:{span:14}},[s("el-card",[s("el-row",{attrs:{gutter:10}},[s("el-col",{staticClass:"d-flex align-items-center mg-b-30 top-box-wrap",attrs:{span:12}},[s("div",{staticClass:"top-box"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[t._v(t._s(t.$t("dashboard.customerAdded")))]),s("div",{staticClass:"t-link"},[s("el-link",{staticClass:"mg-r-10",attrs:{type:"primary",href:"#/my-custom"}},[t._v(" "+t._s(t.$store.state.cnt.customerCnt))]),t._v(" "+t._s(t.$t("dashboard.pcs"))+" ")],1)]),s("i",{staticClass:"el-icon-s-custom"})])]),s("el-col",{staticClass:"d-flex align-items-center mg-b-30 top-box-wrap",attrs:{span:12}},[s("div",{staticClass:"top-box"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[t._v(t._s(t.$t("dashboard.authorizedShopifyCustomers")))]),s("div",{staticClass:"t-link"},[s("el-link",{staticClass:"mg-r-10",attrs:{type:"primary",href:"#/my-custom?isAuth=true"}},[t._v(" "+t._s(t.$store.state.cnt.customerAuthCnt))]),t._v(" "+t._s(t.$t("dashboard.pcs"))+" ")],1)]),s("i",{staticClass:"el-icon-s-goods"})])]),s("el-col",{staticClass:"d-flex align-items-center top-box-wrap",attrs:{span:12}},[s("div",{staticClass:"top-box"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[t._v(t._s(t.$t("dashboard.validInvoice")))]),s("div",{staticClass:"t-link"},[s("el-link",{staticClass:"mg-r-10",attrs:{type:"primary",href:"#/my-invoice"}},[t._v(" "+t._s(t.$store.state.cnt.invoiceCnt)+" ")]),t._v(" "+t._s(t.$t("dashboard.pcs"))+" ")],1)]),s("i",{staticClass:"el-icon-s-order"})])])],1)],1)],1),s("el-col",{attrs:{offset:1,span:7}},[s("el-card",{staticClass:"add-box"},[s("a",{staticClass:"d-flex",attrs:{href:"javascript:;"},on:{click:t.openAddVendor}},[s("i",{staticClass:"el-icon-plus"}),s("span",[t._v(t._s(t.$t("dashboard.addNumCustomer",{num:Number(t.$store.state.cnt.customerCnt)+1})))])])])],1)],1),s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:22}},[t.lastVendor.length?s("div",{staticClass:"last-customer"},[s("div",{staticClass:"header"},[t._v(" "+t._s(t.$t("dashboard.recentCooperation"))+" "),s("el-link",{attrs:{type:"primary",href:"#/my-custom"}},[t._v(t._s(t.$t("dashboard.more")))])],1),s("el-row",{attrs:{gutter:20}},t._l(t.lastVendor,(function(a,e){return s("el-col",{key:a.id,attrs:{xl:6,lg:12,md:12}},[s("el-card",{staticClass:"c-box"},[s("div",{staticClass:"c-box-content"},[s("div",{staticClass:"left tx-ellipsis1",attrs:{title:a.customerName}},[s("i",{staticClass:"avatar-title",style:{backgroundColor:t.aBg[e]}},[t._v(t._s(a.customerName.substr(0,1)))]),s("div",{staticClass:"name tx-ellipsis1",staticStyle:{"max-width":"100px"}},[t._v(" "+t._s(a.customerName))])]),s("div",{staticClass:"right"},[s("div",{staticClass:"mg-b-10 d-flex align-items-center v-content"},[s("span",{staticClass:"v-content-title"},[t._v(t._s(t.$t("dashboard.validInvoice2")))]),s("el-link",{staticClass:"v-content-val",attrs:{type:"primary"},on:{click:function(s){return t.gotoInvoice(a)}}},[t._v(t._s(a.invoiceCnt))])],1),s("div",{staticClass:"mg-b-20 d-flex align-items-center v-content"},[s("span",{staticClass:"v-content-title"},[t._v(t._s(t.$t("dashboard.authorizedShopifyStores")))]),s("span",{staticClass:"v-content-val"},[t._v(t._s(a.customerAuthCnt))])]),s("div",{staticClass:"tx-right"},[s("el-link",{attrs:{type:"primary"},on:{click:function(s){return t.gotoCustom(a)}}},[t._v(" "+t._s(t.$t("mycustomer.Invitecustomers2"))+" ")])],1)])])])],1)})),1)],1):t._e()])],1)],1),s("div",{staticClass:"pagebodytwo",staticStyle:{display:"block"}},[s("el-row",{staticClass:"mg-b-30 user-status-list",attrs:{gutter:20}},[s("el-col",{attrs:{span:8}},[s("el-card",{staticClass:"box-card bg-box",attrs:{"body-style":{height:"290px"}}},[s("div",[s("el-image",{staticStyle:{width:"70px",height:"70px","border-radius":"50%"},attrs:{src:this.$store.state.userInfo.logo,fit:"fit"}},[s("div",{staticClass:"image-slot",staticStyle:{background:"#f6e9e9"},attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline"})])])],1),s("div",{staticStyle:{color:"#fff","padding-top":"10px"}},[s("b",[t._v(t._s(t.$t("dashboard.嗨"))+" ，"+t._s(this.$store.state.userInfo.username))])]),s("div",[s("p",{staticStyle:{color:"#fff","padding-top":"10px"}},[t._v(t._s(t.$t("dashboard.用户编号"))+":"+t._s(this.$store.state.userInfo.id))])])])],1),s("el-col",{attrs:{span:16}},[s("el-card",{staticClass:"box-card",attrs:{"body-style":{padding:"0px 0px 20px 0px",height:"232px"}}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v(t._s(t.$t("dashboard.system notification")))])]),t._l(t.advData.slice(0,5),(function(a){return s("div",{key:a.id,staticClass:"text item fit-box"},[s("p",{staticClass:"text-style",on:{click:function(s){return t.lookLog(a.id)}}},[s("el-link",{attrs:{type:"primary"}},[s("i",{staticClass:"round"}),t._v(" "+t._s(a.title))]),s("span",[t._v(t._s(a.createdAt))])],1)])}))],2)],1)],1),s("el-row",{staticClass:"mg-b-30 user-status-list",attrs:{gutter:20}},[s("el-col",{attrs:{span:8,xs:24,sm:12,md:8,lg:8,type:"flex"}},[s("div",{staticClass:"user-status-item",on:{click:function(s){return t.gotoPage(1)}}},[s("div",{staticClass:"status-icon"},[s("i",{staticClass:"iconfont icon-daiwanshankaoshi"})]),s("div",{staticClass:"status-content"},[s("div",{staticClass:"status-num",staticStyle:{color:"#e6a23c"}},[t._v(t._s(t.vendorAllOrderCntText(2)||"0"))]),s("div",{staticClass:"status-description"},[t._v(t._s(t.$t("dashboard.待报价订单")))])])])]),s("el-col",{attrs:{span:8,xs:24,sm:12,md:8,lg:8,type:"flex"}},[s("div",{staticClass:"user-status-item",on:{click:function(s){return t.gotoPage(2)}}},[s("div",{staticClass:"status-icon"},[s("i",{staticClass:"el-icon-finished"})]),s("div",{staticClass:"status-content"},[s("div",{staticClass:"status-num",staticStyle:{color:"#e6a23c"}},[t._v(t._s(t.vendorAllOrderCntText(22)||"0"))]),s("div",{staticClass:"status-description"},[t._v(t._s(t.$t("dashboard.待确认收款订单")))])])])]),s("el-col",{attrs:{span:8,xs:24,sm:12,md:8,lg:8,type:"flex"}},[s("div",{staticClass:"user-status-item",on:{click:function(s){return t.gotoPage(3)}}},[s("div",{staticClass:"status-icon"},[s("i",{staticClass:"el-icon-truck"})]),s("div",{staticClass:"status-content"},[s("div",{staticClass:"status-num",staticStyle:{color:"#e6a23c"}},[t._v(t._s(t.vendorAllOrderCntText(5)||"0"))]),s("div",{staticClass:"status-description"},[t._v(t._s(t.$t("dashboard.待发货订单")))])])])])],1),s("div",{staticClass:"chart mg-b-30"},[s("div",{staticClass:"chart-header"},[s("div",{staticClass:"chart-title"},[t._v(t._s(t.$t("dashboard.销售统计")))]),s("div",{staticClass:"chart-right"},[s("el-date-picker",{attrs:{"picker-options":t.pickerOptions0,"value-format":"yyyyMMdd",type:"daterange",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":t.$t("dashboard.起始"),"end-placeholder":t.$t("dashboard.截止")},on:{change:t.dateChange},model:{value:t.statisticDate,callback:function(s){t.statisticDate=s},expression:"statisticDate"}}),s("el-select",{staticClass:"mg-l-20",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("dashboard.日期范围")},on:{change:t.dateRangeChange},model:{value:t.statisticDateRange,callback:function(s){t.statisticDateRange=s},expression:"statisticDateRange"}},t._l(t.dateArr,(function(a,e){return s("el-option",{key:a,attrs:{label:t.$t(a),value:e}})})),1)],1)]),s("div",{staticClass:"chart-body",staticStyle:{width:"100%"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowCart,expression:"isShowCart"}],ref:"chart",staticStyle:{width:"100%",height:"400px"},attrs:{id:"dashboardCharts"}}),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowCart,expression:"!isShowCart"}],staticClass:"tx-center",staticStyle:{height:"100px","line-height":"100px",color:"#909399"}},[t._v(t._s(t.$t("invoice.Nodata")))])])]),s("el-row",{staticClass:"mg-b-30",attrs:{gutter:20}},[s("el-col",{attrs:{span:16,type:"flex"}},[s("div",{staticClass:"day-statistics mg-b-30"},[s("div",{staticClass:"day-statistics-title"},[t._v(t._s(t.$t("dashboard.每日统计")))]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[s("el-table-column",{attrs:{prop:"date",label:t.$t("dashboard.日期")},scopedSlots:t._u([{key:"header",fn:function(){return[s("div",{staticClass:"tableTiop"},[t._v(t._s(t.$t("dashboard.日期")))])]},proxy:!0}])}),s("el-table-column",{attrs:{prop:"customerCnt",label:t.$t("dashboard.下单客户量")},scopedSlots:t._u([{key:"header",fn:function(){return[s("div",{staticClass:"tableTiop"},[t._v(t._s(t.$t("dashboard.下单客户量")))])]},proxy:!0}])}),s("el-table-column",{attrs:{prop:"orderCnt",label:t.$t("dashboard.订单数")},scopedSlots:t._u([{key:"header",fn:function(){return[s("div",{staticClass:"tableTiop"},[t._v(t._s(t.$t("dashboard.订单数")))])]},proxy:!0}])}),s("el-table-column",{attrs:{prop:"amount",label:`${t.$t("dashboard.销售额")}${t.$store.state.country.shopCurrency}${t.$store.state.country.symbol}`},scopedSlots:t._u([{key:"header",fn:function(){return[s("div",{staticClass:"tableTiop"},[t._v(t._s(t.$t("dashboard.销售额"))+t._s(t.$store.state.country.shopCurrency)+t._s(t.$store.state.country.symbol)+" ")])]},proxy:!0}])})],1),s("div",{staticClass:"day-statistics-footer"},[s("el-button",{attrs:{type:"primary"},on:{click:t.showMoreReference}},[t._v(t._s(t.$t("dashboard.显示更多")))])],1)],1)]),s("el-col",{attrs:{span:8,type:"flex"}},[s("div",{staticClass:"info-aggregation mg-b-30"},[s("div",{staticClass:"info-aggregation-title"},[t._v(t._s(t.$t("dashboard.信息汇总")))]),s("el-divider"),s("div",{staticClass:"info-aggregation-list"},[s("div",{staticClass:"item",on:{click:function(s){return t.gotoPage(8)}}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"el-icon-sell"})]),s("div",{staticClass:"text"},[s("div",[t._v(t._s(t.$t("dashboard.上架商品数"))+": "),s("b",[t._v(t._s(t.vendorDashboardSummary.productCnt||"0"))])])])]),s("el-divider"),s("div",{staticClass:"item",on:{click:function(s){return t.gotoPage(5)}}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"el-icon-user-solid"})]),s("div",{staticClass:"text"},[s("div",[t._v(t._s(t.$t("dashboard.下单客户量"))+": "),s("b",[t._v(t._s(t.vendorDashboardSummary.customerCnt||"0"))])])])]),s("el-divider"),s("div",{staticClass:"item",on:{click:function(s){return t.gotoPage(1)}}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"el-icon-s-order"})]),s("div",{staticClass:"text"},[s("div",[t._v(t._s(t.$t("dashboard.订单数"))+": "),s("b",[t._v(t._s(t.vendorDashboardSummary.orderCnt||"0"))])])])]),s("el-divider"),s("div",{staticClass:"item",on:{click:function(s){return t.gotoPage(10)}}},[s("div",{staticClass:"icon"},[s("i",{staticClass:"fa fa-exchange"})]),s("div",{staticClass:"text"},[s("div",[t._v(t._s(t.$t("dashboard.销售额"))+t._s(t.$store.state.country.shopCurrency)+t._s(t.$store.state.country.symbol)+": "),s("b",[t._v(t._s(Number(t.vendorDashboardSummary.orderTotalAmount).toFixed(2)||"0"))])])])]),s("el-divider")],1)],1)])],1)],1),s("el-dialog",{attrs:{loading:t.moreReference.loading,title:"Reference",visible:t.moreReference.isShow,width:"800px"},on:{"update:visible":function(s){return t.$set(t.moreReference,"isShow",s)}}},[s("el-divider"),s("div",{staticClass:"mg-t-20 mg-b-20 mg-l-20 mg-r-20"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.moreReference.tableData,stripe:""}},[s("el-table-column",{attrs:{prop:"date",label:t.$t("dashboard.日期"),width:"180"}}),s("el-table-column",{attrs:{prop:"customerCnt",label:t.$t("dashboard.下单客户量")}}),s("el-table-column",{attrs:{prop:"orderCnt",label:t.$t("dashboard.订单数"),width:"180"}}),s("el-table-column",{attrs:{prop:"amount",label:`${t.$t("dashboard.销售额")}${t.$store.state.country.shopCurrency}${t.$store.state.country.symbol}`,width:"180"}})],1)],1),t.tableData.length?s("el-row",{staticClass:"mg-b-20",attrs:{gutter:20}},[s("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[s("div",[s("el-pagination",{attrs:{"current-page":t.moreReference.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.moreReference.pageSizes,"page-size":t.moreReference.rowsPerPage,total:Number(t.moreReference.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),s("el-divider"),s("div",{staticClass:"dialog-footer d-flex justify-content-end",attrs:{slot:"footer"},slot:"footer"},[s("div",[s("el-button",{attrs:{size:"small"},on:{click:function(s){t.moreReference.isShow=!1}}},[t._v("Close")])],1)])],1),s("el-dialog",{attrs:{title:t.$t("dashboard.welcomeOurMallApp"),visible:t.createdNameDialog.isShow,width:"650px","show-close":!1,"close-on-press-escape":!1,"close-on-click-modal":!1},on:{"update:visible":function(s){return t.$set(t.createdNameDialog,"isShow",s)}}},[s("el-row",[s("el-col",{attrs:{span:24}},[s("p",{staticStyle:{"padding-left":"20px"}},[t._v(t._s(t.$t("dashboard.relevantInformation")))]),s("el-form",[s("el-form-item",{attrs:{label:t.$t("dashboard.yourCompany"),"label-width":t.createdNameDialog.labelW,required:""}},[s("el-input",{attrs:{placeholder:t.$t("dashboard.customersView"),"auto-complete":"off"},model:{value:t.createdNameDialog.name,callback:function(s){t.$set(t.createdNameDialog,"name",s)},expression:"createdNameDialog.name"}})],1),s("el-form-item",{attrs:{label:t.$t("dashboard.yourEmail"),"label-width":t.createdNameDialog.labelW}},[this.$store.state.userInfo.email?s("span",[t._v(" "+t._s(this.$store.state.userInfo.email)+" "),s("a",{attrs:{href:"javascript:;"},on:{click:t.changeMail}},[t._v(t._s(t.$t("dashboard.modify")))])]):s("a",{attrs:{href:"javascript:;"},on:{click:t.changeMail}},[t._v(t._s(t.$t("dashboard.add")))])])],1)],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",loading:t.createdNameDialog.loading},on:{click:t.saveName}},[t._v(" "+t._s(t.$t("dashboard.save")))])],1)],1),s("el-dialog",{attrs:{title:t.advLook.title,visible:t.dialogVisibleLog,width:"40%"},on:{"update:visible":function(s){t.dialogVisibleLog=s}}},[s("div",{staticClass:"set-css",staticStyle:{padding:"0 20px"},domProps:{innerHTML:t._s(t.advLook.content)}}),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(s){t.dialogVisibleLog=!1}}},[t._v(t._s(t.$t("dashboard.save")))])],1)])],1)},i=[],r=(a("14d9"),{data(){return{statisticDateRange:"3",statisticDateFrom:"",statisticDateTo:"",statisticDate:[],advData:[],advLook:{},dialogVisibleLog:!1,dateArr:{1:"dashboard.今天",2:"dashboard.7天前",3:"dashboard.30天前",4:"dashboard.90天前",5:"dashboard.一年前",6:"dashboard.自定义"},pickerOptions0:{disabledDate(t){return t.getTime()>Date.now()-864e4}},tableData:[],chartData:{columns:[this.$t("dashboard.日期"),`${this.$t("dashboard.销售额")}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,this.$t("dashboard.订单数")],rows:[]},moreReference:{isShow:!1,pageSizes:[10,20,50,100],page:1,rowsPerPage:10,items:[],total:0,totalPage:0,loading:!1,tableData:[]},vendorDashboardSummary:{waitCompleteCnt:"",waitDeliverCnt:"",abnormalCnt:"",syncFailCnt:"",customerCnt:"",shopCnt:"",offerItemCnt:""},dialogVisibleAddVendor:!1,addVendorDialog:{isShow:!1,loading:!1,labelW:"100px",name:"",remark:"",email:""},addVendorDialogDefault:"{}",lastVendor:[],aBg:["#343a40","#c5a46b","#f46a6a","#34c38f"],createdNameDialog:{isShow:!1,loading:!1,labelW:"150px",name:"",email:""},createdNameDialogDefault:"{}",isShowCart:!0,vendorAllOrderCnt:{}}},components:{},mounted(){this.initPageData(),this.getCharts(),this.getAdvList(),this.getVendorAllOrderCnt(),this.addVendorDialogDefault=JSON.stringify(this.addVendorDialog),this.createdNameDialogDefault=JSON.stringify(this.createdNameDialog),this.getLastVendor(),this.$store.state.userInfo.name||(this.createdNameDialog.isShow=!0)},methods:{getVendorAllOrderCnt(){this.$apiCall("api.ShopifyOrder.getVendorAllOrderCnt",{},t=>{9999==t.ErrorCode?this.vendorAllOrderCnt=t.Data.Results:10086!=t.ErrorCode&&this.$message({message:t.Message,type:"error"})})},vendorAllOrderCntText(t){let s=0;return s=22==t?this.vendorAllOrderCnt.waitVendorConfirmCnt?this.vendorAllOrderCnt.waitVendorConfirmCnt:0:this.vendorAllOrderCnt[t]?this.vendorAllOrderCnt[t]:0,s},getAdvList(){this.$apiCall("api.Notice.finds",{rType:1},t=>{9999==t.ErrorCode?this.advData=t.Data.Results.filter(t=>{if("1"==t.status)return t}):this.$message.error(t.Message)})},lookLog(t){this.dialogVisibleLog=!0,this.$apiCall("api.Notice.get",{id:t},t=>{9999==t.ErrorCode?this.advLook=t.Data.Results:this.$message.error(t.Message)})},gotoPage(t){switch(t){case 1:this.$router.push({path:"/ordersManage/2/1"});break;case 2:this.$router.push({path:"/ordersManage/2/2"});break;case 3:this.$router.push({path:"/ordersManage/2/3"});break;case 4:this.$router.push({path:"/abnormal"});break;case 5:this.$router.push({path:"/my-custom"});break;case 6:this.$router.push({path:"/shopify-orders"});break;case 7:this.$router.push({path:"/products",query:{filterParams:1}});break;case 8:this.$router.push({path:"/goods-mgr/shelves"});break;case 9:this.$router.push({name:"allOrders"});break;case 10:break}},toPage(t){t!=this.moreReference.page&&(this.moreReference.page=t),this.getTableData()},changePageSize(t){this.moreReference.rowsPerPage=t,this.moreReference.page=1,localStorage.setItem("moreReferenceRowsPerPage",t),this.getTableData()},showMoreReference(){this.moreReference.isShow=!0,this.getTableData()},getTableData(){this.moreReference.loading=!0,this.$apiCall("api.Invoice.vendorDashboardStatistic",{page:this.moreReference.page,rowsPerPage:this.moreReference.rowsPerPage},t=>{this.moreReference.loading=!1,9999==t.ErrorCode?(this.moreReference.tableData=Object.values(t.Data.Results),this.moreReference.tableData.length&&(this.moreReference.tableData.forEach(t=>{this.$set(t,"dateCode1",Number(t.dateCode)),this.$set(t,"date",t.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))}),this.moreReference.total=Number(t.Data.Pagination.totalCount),this.moreReference.totalPage=Number(t.Data.Pagination.totalPage),this.moreReference.tableData=this.moreReference.tableData.sort(this.sortData))):10086!=t.ErrorCode&&this.$elementMessage(t.Message,"error")})},dateChange(){this.statisticDate.length>1&&(this.statisticDateFrom=this.$moment(this.statisticDate[0]).format("YYYYMMDD"),this.statisticDateTo=this.$moment(this.statisticDate[1]).format("YYYYMMDD"),this.getCharts(1),this.statisticDateRange="")},dateRangeChange(){let t=this.statisticDateRange;switch(t){case"1":this.statisticDateFrom=this.$moment().format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD");break;case"2":this.statisticDateFrom=this.$moment().subtract(7,"d").format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD");break;case"3":this.statisticDateFrom=this.$moment().subtract(30,"d").format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD");break;case"4":this.statisticDateFrom=this.$moment().subtract(90,"d").format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD");break;case"5":this.statisticDateFrom=this.$moment().subtract(12,"M").format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD");break;default:this.statisticDateFrom="",this.statisticDateTo="";break}this.statisticDate=[this.statisticDateFrom,this.statisticDateTo],this.getCharts(1)},initPageData(){this.$showLoading(),this.$apiCall("api.Invoice.vendorDashboardSummary",{},t=>{9999==t.ErrorCode?(this.vendorDashboardSummary=t.Data.Results,this.$hideLoading()):10086!=t.ErrorCode&&this.$message({message:t.Message,type:"error"})}),this.$apiCall("api.Invoice.vendorDashboardStatistic",{page:this.moreReference.page,rowsPerPage:this.moreReference.rowsPerPage},t=>{9999==t.ErrorCode?(this.tableData=Object.values(t.Data.Results),this.tableData.length&&this.tableData.forEach(t=>{this.$set(t,"dateCode1",Number(t.dateCode)),this.$set(t,"date",t.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))}),this.tableData=this.tableData.reverse(),this.$hideLoading()):10086!=t.ErrorCode&&this.$message({message:t.Message,type:"error"})})},getCharts(t){const s=this.$refs.chart;t||(this.statisticDateFrom=this.$moment().subtract(1,"M").format("YYYYMMDD"),this.statisticDateTo=this.$moment().format("YYYYMMDD"),this.statisticDate=[this.statisticDateFrom,this.statisticDateTo]),this.$showLoading();let a=[];this.$apiCall("api.Invoice.vendorDashboardStatistic",{dateFrom:this.statisticDateFrom,dateTo:this.statisticDateTo},t=>{if(this.$hideLoading(),9999==t.ErrorCode){if(a=Object.values(t.Data.Results),!a.length)return void(this.isShowCart=!1);this.isShowCart=!0,a.forEach(t=>{this.$set(t,"date",t.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))});const e=this.$echarts.init(s),i={title:{text:""},tooltip:{trigger:"axis"},legend:{data:[`${this.$t("dashboard.销售额")}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,this.$t("dashboard.订单数")]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:a.map(t=>t.date)},yAxis:{type:"value"},series:[{name:`${this.$t("dashboard.销售额")}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,type:"line",stack:`${this.$t("dashboard.销售额")}${this.$store.state.country.shopCurrency}${this.$store.state.country.symbol}`,data:a.map(t=>t.amount),smooth:!0},{name:this.$t("dashboard.订单数"),type:"line",stack:this.$t("dashboard.订单数"),data:a.map(t=>t.orderCnt),smooth:!0}]};e.setOption(i),setTimeout(()=>{e.resize()},200),window.onresize=function(){e.resize()}}else 10086!=t.ErrorCode&&this.$elementMessage(t.Message,"error")})},changeMail(){this.$root.$children[0].changeUserEmail()},saveName(){this.createdNameDialog.name?(this.createdNameDialog.loading=!0,this.$apiCall("api.User.changeByUser",{name:this.createdNameDialog.name},t=>{if(9999==t.ErrorCode){this.createdNameDialog.isShow=!1;let t=this.$store.state.userInfo;t.name=this.createdNameDialog.name,localStorage.setItem("userInfo",JSON.stringify(t)),this.$store.commit("setUserInfo",t),this.firstCustomer()}else this.$message({message:t.Message,type:"error"})})):this.$message({message:this.$t("dashboard.nameEnter"),type:"error"})},gotoCustom(t){this.$router.push({name:"myCustom",params:{item:t}})},gotoInvoice(t){this.$router.push({name:"allOrders",params:{customerName:t.customerName,id:t.id}})},getLastVendor(){this.$showLoading(),this.$apiCall("api.Relationship.findByVendor",{last:!0,page:1,rowsPerPage:4},t=>{this.$hideLoading(),9999==t.ErrorCode?(this.lastVendor=t.Data.Results,this.lastVendor.forEach(t=>{this.$apiCall("api.Relationship.getCntDetail",{relationshipId:t.id},s=>{9999==s.ErrorCode&&(t.invoiceCnt=s.Data.Results.invoiceCnt,t.totalAmount=s.Data.Results.totalAmount,t.orderCnt=s.Data.Results.orderCnt,t.skuCnt=s.Data.Results.skuCnt,t.offerSkuCnt=s.Data.Results.offerSkuCnt,this.lastVendor=[...this.lastVendor])})})):10086!=t.ErrorCode&&this.$message({message:t.Message,type:"error"})})},addVendorSaveSuccess(){this.$root.$children[0].getCnt(),this.getLastVendor()},openAddVendor(){this.addVendorDialog=JSON.parse(this.addVendorDialogDefault),this.addVendorDialog.isShow=!0},firstCustomer(){this.openAddVendor()},gotoImport(t){this.$router.push({name:"importData",query:{rid:t.id}})}}}),o=r,l=(a("a7b4"),a("d9e1"),a("2877")),d=Object(l["a"])(o,e,i,!1,null,"44fa2da6",null);s["default"]=d.exports},6044:function(t,s,a){},a5de:function(t,s,a){},a7b4:function(t,s,a){"use strict";a("a5de")},d9e1:function(t,s,a){"use strict";a("6044")}}]);