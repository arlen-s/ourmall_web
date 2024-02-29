(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orders"],{"8e7d":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return e.$store.state.userInfo.canUseWallet?t("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:e.loading,expression:"loading",modifiers:{fullscreen:!0}}],staticClass:"contentpanel",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[t("div",{ref:"pageHeader",staticClass:"pagetitle"},[e._m(0),t("div",{staticClass:"right"},[e.$store.state.userInfo.walletOpen?t("el-button",{attrs:{size:"small",icon:"el-icon-setting"},on:{click:e.closeWallet}},[e._v("停用")]):e._e()],1)]),t("div",{staticClass:"pagebody"},[t("el-card",[t("el-row",[e.$store.state.userInfo.walletOpen?t("el-col",{ref:"pageTabs",attrs:{span:24}},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.$t("router.账户概览"),name:"finance-account"}}),t("el-tab-pane",{attrs:{label:"提现明细",name:"list-withdraw"}}),t("el-tab-pane",{attrs:{label:"扣款明细",name:"list-withhold"}}),t("el-tab-pane",{attrs:{label:"冻结明细",name:"list-frozen"}}),t("el-tab-pane",{attrs:{label:"订单结算明细",name:"list-settle"}}),t("el-tab-pane",{attrs:{label:"订单流水记录",name:"list"}})],1)],1):e._e(),t("el-col",{attrs:{span:24}},[t("router-view",{key:e.pageKey,ref:"subPage",attrs:{activeName:e.activeName}})],1)],1)],1)],1)]):e._e()},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"left d-flex"},[t("div",{staticClass:"title mg-r-20"},[t("i",{staticClass:"el-icon-s-finance"}),t("h2",[e._v("我的钱包")])]),t("div",{staticClass:"mg-t-10"})])}],l=(a("14d9"),{data(){return{loading:!1,pageKey:(new Date).valueOf(),activeName:""}},mounted(){this.activeName=this.$route.name},methods:{closeWallet(){this.$confirm("是否要关闭线上支付方式？","",{confirmButtonText:"确定",cancelButtonText:"取消",confirmButtonClass:"el-button--danger"}).then(()=>{this.loading=!0,this.$apiCall("api.User.openWallet",{},e=>{"9999"==e.ErrorCode?(this.$message({message:"激活关闭成功",type:"success"}),"finance-account"!=this.$route.name&&this.$router.push({name:"finance-account"}),setTimeout(()=>{location.reload()},2e3)):this.$message({message:e.Message,type:"error"})})}).catch(()=>{})},handleClick(e){e.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:e.name})}}}),n=l,r=a("2877"),c=Object(r["a"])(n,s,i,!1,null,null,null);t["default"]=c.exports},a78a:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"contentpanel orders-page"},[t("div",{ref:"pageHeader",staticClass:"pagetitle"},[t("div",{staticClass:"left d-flex"},[t("div",{staticClass:"title mg-r-20"},[t("i",{staticClass:"el-icon-s-order"}),t("h2",[e._v(e._s(e.$t("myinvoice.purchaseOrders")))])]),t("div",{staticClass:"mg-t-10"},[1==e.cancelStatus?t("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.filterGetItem(2)}}},[e._v(e._s(e.$t("myinvoice.viewCancelled")))]):e._e(),2==e.cancelStatus?t("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.filterGetItem(1)}}},[e._v(e._s(e.$t("myinvoice.viewAll")))]):e._e()],1)]),t("div",{staticClass:"right"},["waitingForOffer"==e.activeName||"waitingForPayment"==e.activeName?t("el-button",{attrs:{disabled:!(e.checkboxArr.length>1),type:"success",size:"small"},on:{click:e.toMergeInvoice}},[e._v(e._s(e.$t("myinvoice.合并订单"))+" "+e._s(e.checkboxArr.length>1?e.checkboxArr.length:""))]):e._e(),t("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.gotoImport}},[e._v(e._s(e.$t("myinvoice.手工创建采购单")))])],1)]),t("div",{staticClass:"pagebody"},[t("el-card",[t("el-row",[t("el-col",{ref:"pageTabs",attrs:{span:24}},[1==e.cancelStatus?t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.$t("myinvoice.全部订单"),name:"allOrders"}}),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.待我报价"),name:"waitingForOffer"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.待我报价"))+" "),t("span",{staticClass:"tx-danger"},[e._v("("+e._s(e.cnt.waitCompleteCnt)+")")])])]),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.待分配仓库"),name:"waitingForOffer"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.待分配仓库"))+" "),t("span",{staticClass:"tx-danger"},[e._v("("+e._s(e.cnt.waitCompleteCnt)+")")])])]),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.待客户付款"),name:"waitingForPayment"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.待客户付款"))+" "),t("span",{staticClass:"tx-warning"},[e._v("("+e._s(e.cnt.waitCustomerPayCnt)+")")])])]),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.待我确认收款"),name:"waitingForConfirm"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.待我确认收款"))+" "),t("span",{staticClass:"tx-warning"},[e._v("("+e._s(e.cnt.waitPayCnt)+")")])])]),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.已付款待发货"),name:"waitingForDelivery"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.已付款待发货"))+" "),t("span",{staticClass:"tx-warning"},[e._v("("+e._s(e.cnt.waitDeliverCnt)+")")])])]),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.全部发货"),name:"fullDeliveryOrder"}}),t("el-tab-pane",{attrs:{label:e.$t("myinvoice.有异常"),name:"abnormal"}},[t("span",{attrs:{slot:"label"},slot:"label"},[e._v(" "+e._s(e.$t("myinvoice.有异常"))+" "),t("span",{staticClass:"tx-danger"},[e._v("("+e._s(e.cnt.abnormalCnt)+")")])])])],1):e._e()],1),t("el-col",{attrs:{span:24}},[t("router-view",{key:e.pageKey,ref:"subPage",attrs:{cancelStatus:e.cancelStatus,activeName:e.activeName},on:{getTableHeight:e.getTableHeight,getNum:e.getNum,checkedArr:e.checkedArr}})],1)],1)],1)],1)])},i=[],l=(a("14d9"),{data(){return{isShow:!1,pageKey:(new Date).valueOf(),activeName:"",cancelStatus:1,cnt:{abnormalCnt:0},checkboxArr:[]}},mounted(){this.activeName=this.$route.name,this.getNum()},watch:{$route(){this.activeName=this.$route.name,this.getNum()}},methods:{toMergeInvoice(){this.$confirm("确认要合并采购单吗？","订单合并",{confirmButtonText:"合并",cancelButtonText:"取消",type:"warning"}).then(()=>{this.loading=!0,this.$apiCall("api.Invoice.mergeInvoice",{invoiceIds:this.checkboxArr},e=>{"9999"==e.ErrorCode?(this.loading=!1,this.checkboxArr=[],this.$elementMessage("合并成功","success"),this.$refs.subPage.checkboxArr=[],this.$refs.subPage.clearFilter()):this.$elementMessage(e.Message,"error")})})},checkedArr(e){this.checkboxArr=e},filterGetItem(e){this.$router.push({name:"allOrders"}),this.activeName="allOrders",this.cancelStatus=e},getNum(){this.$apiCall("api.Invoice.vendorInvoiceCnt",{},e=>{if("9999"==e.ErrorCode){this.cnt={...e.Data.Results};for(let e in this.cnt)this.cnt[e]=Number(this.cnt[e])}else this.$elementMessage(e.Message,"error")})},gotoImport(){this.$router.push({name:"importData"})},handleClick(e){this.checkboxArr=[],e.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:e.name})},getTableHeight(e){clearTimeout(this.reSizeTime),this.reSizeTime=setTimeout(()=>{let t=this.$root.$children[0].$refs.mainScroll.wrap.offsetHeight-(this.$refs.pageHeader.offsetHeight+this.$refs.pageTabs.$el.offsetHeight+e.$refs.tablefilter.offsetHeight+e.$refs.tableFooter.offsetHeight)-120;e.tableHeight=t>200?t:200},500)}}}),n=l,r=a("2877"),c=Object(r["a"])(n,s,i,!1,null,null,null);t["default"]=c.exports}}]);