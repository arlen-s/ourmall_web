(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["invoices"],{"0e8f":function(e,t,a){},"51b0":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel my-invoice-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle",staticStyle:{"flex-wrap":"wrap",height:"auto"}},[a("div",{staticClass:"left d-flex align-items-center"},[e._m(0),a("div",{staticStyle:{"margin-top":"8px"}},[e.waitStatus?e._e():[1==e.cancelStatus?a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.filterGetItem2(2)}}},[e._v("Show cancelled orders")]):e._e(),2==e.cancelStatus?a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.filterGetItem2(1)}}},[e._v("Show all valid orders")]):e._e()],e.waitStatus?a("el-link",{attrs:{type:"primary"},on:{click:function(t){return e.filterGetItem2(3)}}},[e._v("Show all valid orders")]):e._e()],2)]),a("div",{staticClass:"right"}),a("div",{staticStyle:{margin:"5px",width:"100%"}},[e.waitConfirmCnt&&!e.waitStatus?a("el-alert",{staticClass:"top-warning",attrs:{type:"warning",closable:!1}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("p",{staticClass:"c-title",staticStyle:{color:"#e6a23c"}},[a("i",{staticClass:"el-icon-warning"}),a("b",[e._v("Notice: ")]),e._v(" You have "),a("a",{attrs:{href:"javascript:;"},on:{click:e.filterWaitConfirm}},[e._v(e._s(e.waitConfirmCnt)+" purchase order(s)")]),e._v(" need your reconfirm, "),a("a",{attrs:{href:"javascript:;"},on:{click:e.filterWaitConfirm}},[e._v("click here")]),e._v(" to view details. ")])])]):e._e()],1)]),a("div",{staticClass:"pagebody"},[a("el-row",{staticClass:" mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",{staticClass:" mg-r-5",attrs:{label:"#"}},[a("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"Invoice Number"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.code,callback:function(t){e.$set(e.filterParams,"code",t)},expression:"filterParams.code"}})],1),a("el-form-item",{staticClass:" mg-r-5"},[a("el-input",{staticStyle:{width:"120px"},attrs:{placeholder:"Track Number"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.trackNumber,callback:function(t){e.$set(e.filterParams,"trackNumber",t)},expression:"filterParams.trackNumber"}})],1),a("el-form-item",{staticClass:" mg-r-5"},[a("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"Shopify order number"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.codeName,callback:function(t){e.$set(e.filterParams,"codeName",t)},expression:"filterParams.codeName"}})],1),a("el-form-item",{staticClass:" mg-r-5"},[a("el-select",{attrs:{filterable:"",remote:"","remote-method":e.getShopName,loading:e.getShopNameInput.loading,placeholder:"Shopify store Name"},on:{change:e.filterGetItem},model:{value:e.filterParams.accountId,callback:function(t){e.$set(e.filterParams,"accountId",t)},expression:"filterParams.accountId"}},e._l(e.getShopNameInput.shopList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.shopName,value:e.id}})})),1)],1),a("el-form-item",{staticClass:" mg-r-20"},[a("el-select",{staticClass:" mg-r-5",staticStyle:{width:"150px"},attrs:{placeholder:"Date type"},model:{value:e.filterParams.timeFilter,callback:function(t){e.$set(e.filterParams,"timeFilter",t)},expression:"filterParams.timeFilter"}},e._l(e.filterParams.timeOption,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e.filterParams.timeFilter?a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":"Start","end-placeholder":"End"},on:{change:e.dateChange},model:{value:e.filterParams.date,callback:function(t){e.$set(e.filterParams,"date",t)},expression:"filterParams.date"}}):e._e()],1),e.waitStatus?e._e():a("el-form-item",[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"All status"},on:{change:e.filterGetItem},model:{value:e.filterParams.status,callback:function(t){e.$set(e.filterParams,"status",t)},expression:"filterParams.status"}},[a("el-option",{attrs:{label:"All status",value:""}}),e._l(e.$dict.invoiceStatus,(function(t){return 9!=t.val?a("el-option",{key:t.val,attrs:{label:t.text,value:t.val}}):e._e()}))],2)],1),a("el-form-item",{staticClass:" mg-r-5"},[a("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodVendor,loading:e.selectLoading,placeholder:"Enter vendor name"},on:{change:e.filterGetItem},model:{value:e.filterParams.relationshipId,callback:function(t){e.$set(e.filterParams,"relationshipId",t)},expression:"filterParams.relationshipId"}},e._l(e.selectArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.vendorName,value:e.id}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v("Filter")]),a("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v("Clear")])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{data:e.items,"row-key":"id",stripe:"",height:e.tableHeight,"row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{label:"#Invoice Number",prop:"code",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v("#"+e._s(t.row.code))]),a("p",{staticClass:"tx-gray-600",staticStyle:{"white-space":"nowrap"}},[e._v("Includes: "),a("span",{staticStyle:{color:"#606266"}},[e._v(e._s(t.row.orderCnt?t.row.orderCnt:0)+" ")]),e._v("orders / "),a("span",{staticStyle:{color:"#606266"}},[e._v(e._s(t.row.totalCnt?t.row.totalCnt:0)+" ")]),e._v("products / "),a("span",{staticStyle:{color:"#606266"}},[e._v(e._s(t.row.shops.length?t.row.shops.length:0)+" ")]),e._v(" stores ")])]}}])}),a("el-table-column",{attrs:{label:"Vendor",prop:"vendorName",width:"180"}}),a("el-table-column",{staticClass:" pd-r-15",attrs:{label:"Amount Due",prop:"realAmount",width:"180",align:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.realAmount>0?a("span",{staticClass:" tx-danger"},[e._v("US$ "),a("span",[e._v(e._s(t.row.realAmount))])]):a("span",{staticClass:" tx-danger"},[e._v("Not set up")])]}}])}),a("el-table-column",{attrs:{label:"Statistics",width:"400"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Vendor shipped: ")]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)>0?a("span",[a("el-popover",{attrs:{placement:"bottom",title:"Download tracking information",width:"700",trigger:"hover"}},[a("div",{staticClass:"mg-t-15 mg-b-15",staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Vendor shipped: ")]),a("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.row.orderStatusCnt?t.row.orderStatusCnt.deliveredOrderCnt:"---"))]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt)>0?a("span",{staticClass:"mg-l-10"},[e._v("(But "),a("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.row.orderStatusCnt?Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt):"---"))]),e._v(" unfulfilled / partially fulfilled)")]):e._e()]),a("el-alert",{staticClass:"icon-color",attrs:{closable:!1,title:"You may download these tracking information and fulfilled these orders in your Shopify store manualy.",type:"info","show-icon":""}}),a("div",{staticClass:"mg-t-15 d-flex justify-content-center"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.exportDeliver(t.row.id,1)}}},[e._v("Download ALL tracking information")]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt)>0?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.exportDeliver(t.row.id,2)}}},[e._v("Download NOT FULFILLED tracking information")]):e._e()],1),a("a",{attrs:{slot:"reference",href:"javascript:;"},slot:"reference"},[e._v(e._s(t.row.orderStatusCnt?t.row.orderStatusCnt.deliveredOrderCnt:"---"))])],1)],1):a("span",[a("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.row.orderStatusCnt?t.row.orderStatusCnt.deliveredOrderCnt:"---"))])]),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"bottom",content:"The Shopify orders that the vendor had upload tracking information."}},[a("i",{staticClass:"fa fa-question-circle-o mg-l-5"})]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt)>0?[a("span",{staticClass:"mg-l-10"},[e._v("(But "),a("el-popover",{attrs:{placement:"bottom",title:"Download tracking information",width:"700",trigger:"hover"}},[a("div",{staticClass:"mg-t-15 mg-b-15",staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Vendor shipped: ")]),a("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.row.orderStatusCnt?t.row.orderStatusCnt.deliveredOrderCnt:"---"))]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt)>0?a("span",{staticClass:"mg-l-10"},[e._v("(But "),a("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t.row.orderStatusCnt?Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt):"---"))]),e._v(" unfulfilled / partially fulfilled)")]):e._e()]),a("el-alert",{staticClass:"icon-color",attrs:{closable:!1,title:"You may download these tracking information and fulfilled these orders in your Shopify store manualy.",type:"info","show-icon":""}}),a("div",{staticClass:"mg-t-15 d-flex justify-content-center"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.exportDeliver(t.row.id,1)}}},[e._v("Download ALL tracking information")]),t.row.orderStatusCnt&&Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt)>0?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.exportDeliver(t.row.id,2)}}},[e._v("Download NOT FULFILLED tracking information")]):e._e()],1),a("a",{attrs:{slot:"reference",href:"javascript:;"},slot:"reference"},[e._v(e._s(t.row.orderStatusCnt?Number(t.row.orderStatusCnt.deliveredOrderCnt)-Number(t.row.orderStatusCnt.syncOrderCnt):"---"))])],1),e._v(" unfulfilled / partially fulfilled) ")],1),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"bottom"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("The Shopify orders still unfulfilled / partially fulfilled even if the vendor had upload tracking information. "),a("br"),e._v("( You may download these tracking information and fulfilled these order in your Shopify store manually. ) ")]),a("i",{staticClass:"fa fa-question-circle-o mg-l-5"})])]:e._e()],2)]}}])}),a("el-table-column",{attrs:{label:"Status",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:"s-label label-"+e.$dict.invoiceStatus[t.row.status].type},[e._v(e._s(e.$dict.invoiceStatus[t.row.status].text))])]}}])}),a("el-table-column",{attrs:{label:"Date",width:"275"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.timeCreated?a("div",{staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Order created:")]),a("span",[e._v(e._s(t.row.timeCreated?e.moment.unix(t.row.timeCreated).format("ll [at] LTS"):"--"))])]):e._e(),t.row.timeRead?a("div",{staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Order paid:")]),a("span",[e._v(e._s(t.row.timeRead?e.moment.unix(t.row.timeRead).format("ll [at] LTS"):"--"))])]):e._e(),t.row.timePaid?a("div",{staticStyle:{"white-space":"nowrap"}},[a("span",{staticClass:" tx-gray-600"},[e._v("Order confirmed:")]),a("span",[e._v(e._s(t.row.timeCreateOrder?e.moment.unix(t.row.timeCreateOrder).format("ll [at] LTS"):"--"))])]):e._e()]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"Action",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[7==t.row.status?a("div",[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.openReconfirm(t.row)}}},[e._v("Reconfirm")])],1):a("div",[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.gotoInvoice(t.row)}}},[e._v("View Details")])],1),4==t.row.paymentType&&1==t.row.payStatus||6==t.row.paymentType?e._e():[1!=t.row.status&&2!=t.row.status&&7!=t.row.status||1!=t.row.createUserType?e._e():a("div",[a("el-link",{attrs:{type:"danger"},on:{click:function(a){return e.cancelInvoice(t.row)}}},[e._v("Cancel order")])],1)],7!=t.row.status?a("div",[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return e.sendtoVendor(t.row)}}},[e._v("Send to vendor")])],1):e._e()]}}])})],1)],1)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:" d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1),a("el-dialog",{staticClass:"selected-save-dialog",attrs:{visible:e.selectedSaveDialog.isShow,width:"620px","close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.selectedSaveDialog,"isShow",t)}}},[a("div",{staticStyle:{padding:"0 20px 20px","text-align":"center"}},[a("i",{staticClass:"el-message__icon el-icon-success",staticStyle:{color:"#67C23A","font-size":"50px"}}),a("p",{staticStyle:{color:"#67C23A","font-weight":"bold","font-size":"18px",margin:"10px 0px 20px"}},[e._v("Selected saved! Now you can Check the purchase orders")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.selectedSaveDialog.info,border:""}},[a("el-table-column",{attrs:{label:"#Invoice Number",prop:"code"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v("#"+e._s(t.row.code))])]}}])}),a("el-table-column",{attrs:{label:"Vendor",prop:"vendorName"}}),a("el-table-column",{attrs:{label:"Amount Due",prop:"realAmount"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.realAmount>0?a("span",{staticClass:" tx-danger"},[e._v("US$ "),a("span",[e._v(e._s(t.row.realAmount))])]):a("span",{staticClass:" tx-danger"},[e._v("Not set up")])]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"Action"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-link",{staticStyle:{"font-size":"12px","font-weight":"normal"},attrs:{type:"primary"},on:{click:function(a){return e.gotoInvoice(t.row)}}},[e._v("View Details")])],1),a("div",[a("el-link",{staticStyle:{"font-size":"12px","font-weight":"normal"},attrs:{type:"primary"},on:{click:function(a){return e.sendtoVendor(t.row)}}},[e._v("Send to vendor")])],1)]}}])})],1)],1)]),a("el-dialog",{attrs:{"custom-class":"sendInvoice",title:"Send to vendor",visible:e.sendInvoiceOpen,width:"50%"},on:{open:e.openSend,close:e.closeSend,"update:visible":function(t){e.sendInvoiceOpen=t}}},[[a("el-tabs",{staticStyle:{"margin-left":"20px","margin-top":"10px"},attrs:{type:"card"},model:{value:e.activeShareName,callback:function(t){e.activeShareName=t},expression:"activeShareName"}},[a("el-tab-pane",{attrs:{name:"shareLink"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"iconfont icon-link"}),e._v(" Share by link")]),a("div",{staticClass:"d-flex mg-y-20"},[a("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[e._v("Share link:")]),a("div",[a("span",[e._v(e._s(e.invoiceInfo.url))])])]),a("div",{staticClass:"d-flex mg-y-20"},[a("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}}),a("div",[a("div",[a("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.invoiceInfo.url,expression:"invoiceInfo.url",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],attrs:{size:"mini",type:"success"}},[e._v("Copy Link")])],1)])])]),a("el-tab-pane",{attrs:{name:"shareWeixin"}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"iconfont icon-shejiao"}),e._v(" Share by APP")]),a("div",[a("div",{staticClass:"d-flex mg-y-20"},[a("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[e._v("Title:")]),a("div",{staticStyle:{width:"70%"}},[a("el-input",{attrs:{type:"text",size:"small"},on:{change:function(t){return e.saveRemark("2")}},model:{value:e.shareTitle,callback:function(t){e.shareTitle=t},expression:"shareTitle"}})],1)]),a("div",{staticClass:"d-flex mg-y-20 align-items-center"},[a("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[e._v("Desc:")]),a("div",{staticStyle:{width:"70%"}},[a("el-input",{attrs:{type:"textarea",resize:"none",autosize:{minRows:3,maxRows:6},size:"small"},on:{change:function(t){return e.saveRemark("2")}},model:{value:e.shareDesc,callback:function(t){e.shareDesc=t},expression:"shareDesc"}})],1)]),a("div",{staticClass:"d-flex mg-y-20"},[a("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[e._v("Share:")]),a("div",{staticClass:"d-flex",staticStyle:{width:"70%"}},[a("div",{staticClass:"skype-share",staticStyle:{"margin-right":"30px"},attrs:{"data-href":e.shareTitle+e.shareDesc,"data-lang":"en-US","data-text":e.invoiceInfo.url,"data-style":"large"}}),a("div",[a("el-tooltip",{attrs:{placement:"bottom"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("p",{staticClass:"tx-center mg-b-10"},[e._v("Scan share to WeChat")]),a("img",{attrs:{src:e.invoiceInfo.qrcode,width:"130"}}),a("img",{staticStyle:{position:"absolute",left:"50%",top:"50%","margin-left":"-15px","margin-top":"-4px"},attrs:{src:"images/weixin.png",width:"30px"}})]),a("a",{staticClass:"share-weixin",attrs:{href:"javascript:;"}},[a("i",{staticClass:"fa fa-weixin"}),e._v(" Share ")])])],1)])])])])],1)],a("el-divider"),a("div",{staticClass:"dialog-footer d-flex justify-content-between",attrs:{slot:"footer"},slot:"footer"},[a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:"shareWeixin"==e.activeShareName,expression:"activeShareName == 'shareWeixin'"}],attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.saveRemark("1")}}},[e._v("Clear")])],1),a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.sendInvoiceOpen=!1}}},[e._v("Close")])],1)])],2),a("el-dialog",{attrs:{title:"Purchase Order Reconfirm",visible:e.DialogReconfirm.isShow,width:"450px"},on:{"update:visible":function(t){return e.$set(e.DialogReconfirm,"isShow",t)}}},[e.DialogReconfirm.item?[a("div",{staticStyle:{padding:"0 20px"}},[a("div",{staticStyle:{"margin-bottom":"10px"}},[e._v("Vendor name: "),a("b",{staticStyle:{color:"#909399"}},[e._v(e._s(e.DialogReconfirm.item.vendorName))])]),a("div",[e._v(" Includes: "),a("b",{staticStyle:{color:"#5c6ac4"}},[e._v(e._s(e.DialogReconfirm.item.orderCnt?e.DialogReconfirm.item.orderCnt:0))]),e._v(" Shopify orders / "),a("b",{staticStyle:{color:"#5c6ac4"}},[e._v(e._s(e.DialogReconfirm.item.totalCnt?e.DialogReconfirm.item.totalCnt:0))]),e._v(" products ")])]),a("div",{staticClass:"dialog-footer d-flex",attrs:{slot:"footer"},slot:"footer"},[7==e.DialogReconfirm.item.status?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.runReconfirm(1)}}},[e._v(" Allow vendor to process these orders ")]):e._e(),a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.runReconfirm(2)}}},[e._v("View details")])],1)]:e._e()],2)],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"title",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"el-icon-bank-card"}),a("h2",[e._v("Purchase Orders")])])}],s=(a("b0c0"),a("a9e3"),a("159b"),{data:function(){return{getShopNameInput:{loading:!1,shopList:[]},loading:!1,reSizeTime:0,tableHeight:400,pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_customerInvoiceRowsPerPage")?Number(localStorage.getItem("c_customerInvoiceRowsPerPage")):10,items:[],total:0,totalPage:0,filterParams:{timeOption:[{label:"Order created",value:"timeCreated"},{label:"Order paid",value:"timePaid"},{label:"Order confirmed",value:"timeRead"}],timeFilter:"",date:[],dateFrom:"",dateTo:"",code:"",status:"",customerRead:"",payStatus:"",relationshipId:"",vendorName:"",vendorSelectArr:[],trackNumber:"",codeName:"",accountId:""},filterParamsDefault:"{}",selectedSaveDialog:{isShow:!1,info:""},selectedSaveDialogDefault:"{}",invoiceInfo:"",shareTitle:"",shareDesc:"",showDownloadInvoice:!1,sendInvoiceOpen:!1,activeShareName:"shareLink",saveCode:"",saveItem:"",vendorData:[],selectLoading:!1,selectArr:[],cancelStatus:1,waitConfirmCnt:0,waitStatus:0,DialogReconfirm:{isShow:!1,item:null}}},watch:{items:function(){var e=this;this.items.forEach((function(e,t){e.isLoadOrderCnt=0})),setTimeout((function(){e.loadCnt()}),500)},$route:"gotoPage",saveCode:function(){this.saveCode&&(this.selectedSaveDialog=JSON.parse(this.selectedSaveDialogDefault),this.selectedSaveDialog.info=sessionStorage.getItem("c_selectedSaveInfo")?JSON.parse(sessionStorage.getItem("c_selectedSaveInfo")):[],this.selectedSaveDialog.info.length&&(this.selectedSaveDialog.isShow=!0))}},mounted:function(){var e=this;this.filterParamsDefault=JSON.stringify(this.filterParams),this.filterParams.status=this.$route.query.status?Number(this.$route.query.status):"",this.$route.query.rid&&(this.filterParams.relationshipId=this.$route.query.rid,this.filterParams.vendorName=this.$route.query.name,this.selectArr=[{id:this.$route.query.rid,vendorName:this.$route.query.name}]),this.$route.params.rid&&(this.filterParams.relationshipId=this.$route.params.rid,this.filterParams.vendorName=this.$route.params.name,this.selectArr=[{id:this.$route.params.rid,vendorName:this.$route.params.name}]),this.getItem(),this.getVendor(),window.onresize=function(){e.$getTableHeight(e)},this.selectedSaveDialogDefault=JSON.stringify(this.selectedSaveDialog),this.saveCode=this.$route.params.saveCode?this.$route.params.saveCode:"";var t,a=this.$refs.gridTable.bodyWrapper;a.onscroll=function(){setTimeout((function(){e.loadCnt()}),100)},$(window).scroll((function(){clearTimeout(t),t=setTimeout((function(){e.loadCnt()}),100)})).resize((function(){clearTimeout(t),t=setTimeout((function(){e.loadCnt()}),100)}))},beforeDestroy:function(){window.onresize=null},methods:{getShopName:function(e){var t=this;this.getShopNameInput.shopList=[],e&&(this.getShopNameInput.loading=!0,this.$apiCall("api.Invoice.findStores",{shopName:e},(function(e){t.getShopNameInput.loading=!1,9999==e.ErrorCode?t.getShopNameInput.shopList=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},runReconfirm:function(e){this.DialogReconfirm.isShow=!1,1==e&&this.confirmInvoice(this.DialogReconfirm.item),2==e&&this.gotoInvoice(this.DialogReconfirm.item)},openReconfirm:function(e){this.DialogReconfirm.isShow=!0,this.DialogReconfirm.item=e},confirmInvoice:function(e){var t=this;this.$set(e,"confirmLoading",!0),this.$apiCall("api.Invoice.confirmInvoice",{invoiceId:e.id},(function(a){t.$set(e,"confirmLoading",!1),"9999"==a.ErrorCode?(t.$elementMessage("success","success"),t.getItem(!0,!0)):t.$elementMessage(a.Message,"error")}))},filterWaitConfirm:function(){this.cancelStatus=1,this.waitStatus=1,this.filterGetItem()},exportDeliver:function(e,t){var a=this;this.$showLoading(),this.$apiCall("api.Invoice.exportDeliverTitle",{invoiceId:e},(function(r){if("9999"==r.ErrorCode){var i=[];for(var s in r.Data.Results.titles){var o={};o.key=s,o.orName=r.Data.Results.titles[s],o.name=r.Data.Results.titles[s],i.push(o)}var n={};i.forEach((function(e){n[e.key]=e.name}));var l={invoiceId:e,titles:n,onlyDelivered:!0};2==t&&(l.onlyNotSync=!0),0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>');var c=function(e){document.getElementById("ifilePro").src=e};a.$apiCall("api.Invoice.exportDeliver",l,(function(e){a.$hideLoading(),"9999"==e.ErrorCode?(a.$elementMessage("Your request is been submitted, please wait one moment.","success"),c(e.Data.Results.file)):(a.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||a.$userFailure())}))}else a.$elementMessage(r.Message,"error"),"1002"!=r.ErrorCode&&"1003"!=r.ErrorCode||his.$userFailure()}))},tableRowClassName:function(e){e.row;var t=e.rowIndex;return"data-invocieid invocieid".concat(this.items[t].id)},loadCnt:function(){var e=this;if(this.$refs.gridTable){var t=this.$refs.gridTable.bodyWrapper,a=t.scrollHeight,r=t.scrollTop;$(".el-table__body-wrapper .data-invocieid").each((function(t){$(".el-table__body-wrapper .data-invocieid").eq(t);var i=$(".el-table__body-wrapper .data-invocieid").eq(t).offset().top-200;if(i<a+r&&i>r){var s=e.items[t].id;e.items.some((function(t){t.id==s&&(t.isLoadOrderCnt||e.getOrderCnt(s))}))}}))}},getOrderCnt:function(e){var t,a=this,r=!1;this.items.some((function(a){if(a.id==e)return a.isLoadOrderCnt?!0:t=a,!0})),r||(t.isLoadOrderCnt=1,this.$apiCall("api.Invoice.getSummary",{invoiceId:e},(function(e){a.$hideLoading(),"9999"==e.ErrorCode?a.$set(t,"orderStatusCnt",e.Data.Results):(a.$elementMessage(e.Message,"error"),t.isLoadOrderCnt=2)})))},remoteMethodVendor:function(e){var t=this;this.selectArr=[],e&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByCustomer",{name:e},(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.selectArr=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},changeCustomerName:function(){var e=this;window.lazy&&window.clearTimeout(window.lazy),window.lazy=setTimeout((function(){e.$apiCall("api.Relationship.findByCustomer",{name:e.filterParams.vendorName},(function(t){"9999"==t.ErrorCode?e.vendorData=t.Data.Results:(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure())}))}),400)},showPopover:function(){setTimeout((function(){$(".customer-input input").focus()}),100)},selectCustomer:function(e){this.$refs.popoverCustomer.doClose(),this.filterParams.relationshipId=e.id,this.filterParams.vendorName=e.vendorName,this.filterGetItem()},getVendor:function(){var e=this;this.$apiCall("api.Relationship.findByCustomer",{},(function(t){"9999"==t.ErrorCode?e.vendorData=t.Data.Results:(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure())}))},onCopy:function(e){this.$elementMessage("Has been copied to the clipboard","success")},onError:function(e){this.$elementMessage("Copy to clipboard failed, please copy manually","error")},openSend:function(){var e=0,t=setInterval((function(){(function(e,t,a){e.loadSkypeWebSdkAsync=e.loadSkypeWebSdkAsync||function(e){var r,i=t.getElementsByTagName(a)[0];t.getElementById(e.id)||(r=t.createElement(a),r.id=e.id,r.src=e.scriptToLoad,r.onload=e.callback,i.parentNode.insertBefore(r,i))};var r={scriptToLoad:"https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",id:"skype_web_sdk"};e.loadSkypeWebSdkAsync(r)})(window,document,"script"),e++,e>10&&clearInterval(t)}),300)},closeSend:function(){this.saveCode&&(this.selectedSaveDialog.isShow=!0)},saveRemark:function(e){var t=this;this.$showLoading(),this.$apiCall("api.Invoice.saveRemark",{uniCode:this.invoiceInfo.uniCode,title:1==e?"":this.shareTitle,desc:1==e?"":this.shareDesc},(function(e){t.$hideLoading(),"9999"==e.ErrorCode?(t.shareTitle=e.Data.Results.title,t.shareDesc=e.Data.Results.desc):(t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure(),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure())}))},sendtoVendor:function(e){var t=this;this.selectedSaveDialog.isShow=!1,this.$showLoading(),this.$apiCall("api.Invoice.getShareUrl",{invoiceId:e.id},(function(e){t.$hideLoading(),"9999"==e.ErrorCode?(t.invoiceInfo=e.Data.Results,t.shareTitle=t.invoiceInfo.remark?t.invoiceInfo.remark.title:"",t.shareDesc=t.invoiceInfo.remark?t.invoiceInfo.remark.desc:"",t.sendInvoiceOpen=!0,t.activeShareName="shareLink"):(t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure())}))},clearFilter:function(){this.selectArr=[],this.filterParams=JSON.parse(this.filterParamsDefault),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},filterGetItem:function(){1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},filterGetItem2:function(e){3==e?(this.waitStatus=0,this.cancelStatus=1):this.cancelStatus=e,1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},dateChange:function(){this.filterParams.date.length>1&&(this.filterParams.dateFrom=moment(this.filterParams.date[0]).format("YYYY-MM-DD"),this.filterParams.dateTo=moment(this.filterParams.date[1]).format("YYYY-MM-DD"),this.filterGetItem())},cancelInvoice:function(e){var t=this;this.$confirm("Are you sure you want to cancel it?","",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"error"}).then((function(){t.$apiCall("api.Invoice.cancel",{invoiceId:e.id},(function(e){9999==e.ErrorCode?(t.$message({message:"Success",type:"success"}),t.getItem(!0,!0)):t.$message({message:e.Message,type:"error"})}))})).catch((function(){}))},getItem:function(e,t){var a=this;this.$showLoading();var r={page:this.page,rowsPerPage:this.rowsPerPage,timeFilter:this.filterParams.timeFilter,dateFrom:this.filterParams.dateFrom,dateTo:this.filterParams.dateTo,code:this.filterParams.code,status:2==this.cancelStatus?9:this.filterParams.status,customerRead:this.filterParams.customerRead,payStatus:this.filterParams.payStatus,relationshipId:this.filterParams.relationshipId,trackNumber:this.filterParams.trackNumber,codeName:this.filterParams.codeName,accountId:this.filterParams.accountId};this.waitStatus&&(r.status=7),this.$apiCall("api.Invoice.findByCustomer",r,(function(r){a.$hideLoading(),9999==r.ErrorCode?(a.items=[],r.Data.Results.forEach((function(e){e.confirmLoading=!1,a.items.push(e)})),a.total=Number(r.Data.Pagination.totalCount),a.totalPage=Number(r.Data.Pagination.totalPage),a.$getTableHeight(a),r.Data.Results.length&&r.Data.Results[0].confirmCnt&&(a.waitConfirmCnt=Number(r.Data.Results[0].confirmCnt)),t&&!a.items.length&&a.waitStatus&&(a.waitStatus=0,a.clearFilter()),e||(a.$refs.gridTable.bodyWrapper.scrollTop=0)):a.$message({message:r.Message,type:"error"})}))},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_customerInvoiceRowsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()},gotoImport:function(){this.$router.push({name:"importData"})},gotoInvoice:function(e){var t=this.$router.resolve({path:"/i/"+e.uniCode+"?fromPage=1"});window.open(t.href,"_blank")}}}),o=s,n=(a("59c3"),a("d575"),a("708c"),a("2877")),l=Object(n["a"])(o,r,i,!1,null,"3fc7cdaa",null);t["default"]=l.exports},"57f0":function(e,t,a){},"59c3":function(e,t,a){"use strict";a("57f0")},"6afc":function(e,t,a){},"708c":function(e,t,a){"use strict";a("6afc")},d575:function(e,t,a){"use strict";a("0e8f")}}]);
//# sourceMappingURL=invoices.c1bec91f.js.map