(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"07ac":function(t,e,a){var i=a("23e7"),s=a("6f53").values;i({target:"Object",stat:!0},{values:function(t){return s(t)}})},"4d7b":function(t,e,a){},"4f70":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return s}));var i=[{icon:"icon-nanzhuang",name:"Men's Clothing",id:"200000343"},{id:"200000345",name:"Women's Clothing",icon:"icon-nvzhuang"},{id:"26",icon:"icon-wanjuxiong-copy",name:"Toys & Hobbies"},{id:"66",icon:"icon-huazhuangpinjiance",name:"Beauty & Health"},{id:"1511",icon:"icon-shoubiao",name:"Watches"},{id:"36",icon:"icon-shoushi",name:"Jewelry & Accessories"},{id:"15",icon:"icon-ArtwareGardeningP",name:"Home & Garden"},{id:"1501",icon:"icon-muying",name:"Mother & Kids"},{id:"18",icon:"icon-lanqiu",name:"Sports & Entertainment"}],s=[{id:21,name:"Office & School Supplies"},{id:200574005,name:"Underwear"},{id:34,name:"Automobiles & Motorcycles"},{id:7,name:"Computer & Office"},{id:44,name:"Consumer Electronics"},{id:502,name:"Electronic Components & Supplies"},{id:1503,name:"Furniture"},{id:200165144,name:"Hair Extensions & Wigs"},{id:6,name:"Home Appliances"},{id:13,name:"Home Improvement"},{id:39,name:"Lights & Lighting"},{id:1524,name:"Luggage & Bags"},{id:509,name:"Phones & Telecommunications"},{id:30,name:"Security & Protection"},{id:322,name:"Shoes"},{id:1420,name:"Tools"},{id:320,name:"Weddings & Events"},{id:200000532,name:"Novelty & Special Use"},{id:200000297,name:"Apparel Accessories"},{id:201355758,name:"Motorcycle Equipments & Parts"}]},"5fea":function(t,e,a){"use strict";a("4d7b")},6904:function(t,e,a){},"6f53":function(t,e,a){var i=a("83ab"),s=a("df75"),o=a("fc6a"),r=a("d1e7").f,n=function(t){return function(e){var a,n=o(e),c=s(n),l=c.length,d=0,g=[];while(l>d)a=c[d++],i&&!r.call(n,a)||g.push(t?[a,n[a]]:n[a]);return g}};t.exports={entries:n(!0),values:n(!1)}},7277:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"contentpanel dashboard-page"},[t._m(0),[i("div",{staticClass:"pagebody"},[[i("div",[i("el-row",{staticClass:"mg-b-30 user-status-list",attrs:{gutter:20}},[i("el-col",{attrs:{span:8}},[i("el-card",{attrs:{"body-style":{height:"290px"}}},[i("div",{staticClass:"grid-content d-flex grid-dashboard"},[i("div",{staticClass:"grid-top"},[i("img",{staticClass:"walletIcon",attrs:{src:a("f2d7"),alt:""}})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v("balance($): "+t._s(t.balance||"0.00"))]),i("p",[t._v("wallet")])])])])],1),i("el-col",{staticClass:"d-box",attrs:{span:8}},[i("el-card",{staticClass:"box-card",attrs:{"body-style":{padding:"0px 0px 20px 0px",height:"232px"}}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("system notification")])]),t._l(t.advData.slice(0,5),(function(e){return i("div",{key:e.id,staticClass:"text item fit-box"},[i("p",{staticClass:"text-style",on:{click:function(a){return t.lookLog(e.id)}}},[i("el-link",{attrs:{type:"primary"}},[i("i",{staticClass:"round"}),t._v(" "+t._s(e.title))]),i("span",[t._v(t._s(e.createdAt))])],1)])}))],2)],1)],1),i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:8}},[i("el-card",[i("div",{staticClass:"grid-content d-flex grid-dashboard"},[i("div",{staticClass:"grid-top"},[i("i",{staticClass:"el-icon-bank-card"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(t._s(t.dashBoardData.orderCnt))]),i("p",[t._v("This month Orders")])])])])],1),i("el-col",{attrs:{span:8}},[i("el-card",[i("div",{staticClass:"grid-content d-flex justify-content-between"},[i("div",{staticClass:"d-flex grid-dashboard"},[i("div",{staticClass:"grid-top"},[i("i",{staticClass:"fa fa-dollar"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(" "+t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(t.dashBoardData.orderRevenue))+" ")]),i("p",[t._v("This month Revenue")])])]),i("div",[0==t.dashBoardData.orderRevenueRate?[t._v(" "+t._s(t.dashBoardData.orderRevenueRate)+" ")]:[t.dashBoardData.orderRevenueRate<0?i("i",{staticClass:"el-icon-bottom tx-danger tx-bold"}):t._e(),t.dashBoardData.orderRevenueRate>0?i("i",{staticClass:"el-icon-top tx-success tx-bold"}):t._e(),t._v(" "+t._s(t.dashBoardData.orderRevenueRate)+" ")],i("span",[t._v(" %")])],2)])])],1),i("el-col",{attrs:{span:8}},[i("el-card",[i("div",{staticClass:"grid-content d-flex justify-content-between"},[i("div",{staticClass:"d-flex grid-dashboard"},[i("div",{staticClass:"grid-top"},[i("i",{staticClass:"fa fa-tags"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(" "+t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(t.dashBoardData.orderCost))+" ")]),i("p",[t._v("This month Cost")])])]),i("div",[0==t.dashBoardData.orderCostRate?[t._v(" "+t._s(t.dashBoardData.orderCostRate)+" ")]:[t.dashBoardData.orderCostRate<0?i("i",{staticClass:"el-icon-bottom tx-danger tx-bold"}):t._e(),t.dashBoardData.orderCostRate>0?i("i",{staticClass:"el-icon-top tx-success tx-bold"}):t._e(),t._v(" "+t._s(t.dashBoardData.orderRevenueRate)+" ")],i("span",[t._v(" %")])],2)])])],1)],1)],1),i("div",{staticClass:"mg-t-20"},[i("el-card",[i("div",{staticClass:"\n                  statistic-top\n                  d-flex\n                  align-item-center\n                  justify-content-between\n                "},[i("h2",[t._v("Statistics")]),i("div",[i("el-date-picker",{attrs:{"picker-options":t.pickerOptions0,"value-format":"yyyyMMdd",type:"daterange",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":"Start","end-placeholder":"End"},on:{change:t.dateChange},model:{value:t.statisticDate,callback:function(e){t.statisticDate=e},expression:"statisticDate"}}),i("el-select",{staticClass:"mg-l-20",staticStyle:{width:"200px"},attrs:{placeholder:"Date Range"},on:{change:t.dateRangeChange},model:{value:t.statisticDateRange,callback:function(e){t.statisticDateRange=e},expression:"statisticDateRange"}},t._l(t.dateArr,(function(t,e){return i("el-option",{key:t,attrs:{label:t,value:e}})})),1)],1)]),i("div",{staticClass:"mg-t-20",staticStyle:{width:"100%"}},[i("div",{ref:"chart",staticStyle:{width:"100%",height:"400px"},attrs:{id:"dashboardCharts"}})])])],1),i("div",{staticClass:"mg-t-20"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:16}},[i("el-card",[i("div",{staticClass:"grid-content"},[i("h2",[t._v("Reference")])]),i("div",{staticClass:"grid-content mg-t-20"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[i("el-table-column",{attrs:{prop:"date",label:"Date",width:"180"}}),i("el-table-column",{attrs:{prop:"orderCnt",label:"Total Orders"}}),i("el-table-column",{attrs:{label:"Revenue ("+t.$showSybmol()+")",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$exchangeRate(e.row.revenue))+" ")]}}])}),i("el-table-column",{attrs:{label:"Cost ("+t.$showSybmol()+")",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$exchangeRate(e.row.cost))+" ")]}}])})],1)],1),i("div",{staticClass:"grid-content mg-t-20 text-center"},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.showMoreReference}},[t._v("Show More")])],1)])],1),i("el-col",{attrs:{span:8}},[i("el-card",[i("div",{staticClass:"grid-content"},[i("h2",[t._v("Quick Summary")])]),i("el-divider"),i("div",{staticClass:"\n                      grid-content\n                      d-flex\n                      grid-dashboard\n                      quick-summary\n                      mg-t-20 mg-b-20\n                    ",on:{click:function(e){return t.gotoPage(1)}}},[i("div",{staticClass:"grid-top",staticStyle:{"background-color":"#f4f4f5",color:"#909399"}},[i("i",{staticClass:"el-icon-bank-card"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(" "+t._s(t.dashBoardData.waitPlaceOrder)+" Orders ")]),i("p",[t._v("Waiting to place order")])])]),i("el-divider"),i("div",{staticClass:"\n                      grid-content\n                      d-flex\n                      grid-dashboard\n                      quick-summary\n                      mg-t-20 mg-b-20\n                    ",on:{click:function(e){return t.gotoPage(2)}}},[i("div",{staticClass:"grid-top",staticStyle:{"background-color":"#f0f9eb",color:"#67c23a"}},[i("i",{staticClass:"el-icon-bank-card"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(" "+t._s(t.dashBoardData.invoiceCnt)+" Orders ")]),i("p",[t._v("Waiting for tracking code")])])]),i("el-divider"),i("div",{staticClass:"\n                      grid-content\n                      d-flex\n                      grid-dashboard\n                      quick-summary\n                      mg-t-20 mg-b-20\n                    ",on:{click:function(e){return t.gotoPage(3)}}},[i("div",{staticClass:"grid-top"},[i("i",{staticClass:"el-icon-shopping-cart-full"})]),i("div",{staticClass:"grid-bottom"},[i("h2",{staticClass:"tx-primary"},[t._v(" "+t._s(t.dashBoardData.shopCnt)+" Stores ")]),i("p",[t._v("Authorized")])])])],1)],1)],1)],1)],t._e()],2)],i("el-dialog",{attrs:{"custom-class":"sendInvoice",title:"Send to vendor",visible:t.sendInvoiceOpen,width:"50%"},on:{open:t.openSend,"update:visible":function(e){t.sendInvoiceOpen=e}}},[[i("el-tabs",{staticStyle:{"margin-left":"20px","margin-top":"10px"},attrs:{type:"card"},model:{value:t.activeShareName,callback:function(e){t.activeShareName=e},expression:"activeShareName"}},[i("el-tab-pane",{attrs:{name:"shareWeixin"}},[i("span",{attrs:{slot:"label"},slot:"label"},[i("i",{staticClass:"iconfont icon-shejiao"}),t._v(" Share by APP")]),i("div",[i("div",{staticClass:"d-flex mg-y-20"},[i("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[t._v(" Title: ")]),i("div",{staticStyle:{width:"70%"}},[i("el-input",{attrs:{type:"text",size:"small"},on:{change:function(e){return t.saveRemark("2")}},model:{value:t.shareTitle,callback:function(e){t.shareTitle=e},expression:"shareTitle"}})],1)]),i("div",{staticClass:"d-flex mg-y-20 align-items-center"},[i("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[t._v(" Desc: ")]),i("div",{staticStyle:{width:"70%"}},[i("el-input",{attrs:{type:"textarea",resize:"none",autosize:{minRows:3,maxRows:6},size:"small"},on:{change:function(e){return t.saveRemark("2")}},model:{value:t.shareDesc,callback:function(e){t.shareDesc=e},expression:"shareDesc"}})],1)]),i("div",{staticClass:"d-flex mg-y-20"},[i("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[t._v(" Share: ")]),i("div",{staticClass:"d-flex",staticStyle:{width:"70%"}},[i("div",{staticClass:"skype-share",staticStyle:{"margin-right":"30px"},attrs:{"data-href":t.shareTitle+t.shareDesc,"data-lang":"en-US","data-text":t.invoiceInfo.url,"data-style":"large"}}),i("div",[i("el-tooltip",{attrs:{placement:"bottom"}},[i("div",{attrs:{slot:"content"},slot:"content"},[i("p",{staticClass:"tx-center mg-b-10"},[t._v("Scan share to WeChat")]),i("img",{attrs:{src:t.invoiceInfo.qrcode,width:"130"}}),i("img",{staticStyle:{position:"absolute",left:"50%",top:"50%","margin-left":"-15px","margin-top":"-4px"},attrs:{src:"images/weixin.png",width:"30px"}})]),i("a",{staticClass:"share-weixin",attrs:{href:"javascript:;"}},[i("i",{staticClass:"fa fa-weixin"}),t._v(" Share ")])])],1)])])])]),i("el-tab-pane",{attrs:{name:"shareLink"}},[i("span",{attrs:{slot:"label"},slot:"label"},[i("i",{staticClass:"iconfont icon-link"}),t._v(" Share by link")]),i("div",{staticClass:"d-flex mg-y-20"},[i("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}},[t._v(" Share link: ")]),i("div",[i("span",[t._v(t._s(t.invoiceInfo.url))])])]),i("div",{staticClass:"d-flex mg-y-20"},[i("div",{staticStyle:{color:"#999",width:"150px","text-align":"right","margin-right":"10px","white-space":"nowrap"}}),i("div",[i("div",[i("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.invoiceInfo.url,expression:"invoiceInfo.url",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],attrs:{size:"mini",type:"success"}},[t._v("Copy Link")])],1)])])])],1)],i("el-divider"),i("div",{staticClass:"dialog-footer d-flex justify-content-between",attrs:{slot:"footer"},slot:"footer"},[i("div",[i("el-button",{directives:[{name:"show",rawName:"v-show",value:"shareWeixin"==t.activeShareName,expression:"activeShareName == 'shareWeixin'"}],attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.saveRemark("1")}}},[t._v("Clear")])],1),i("div",[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.sendInvoiceOpen=!1}}},[t._v("Close")])],1)])],2),i("el-dialog",{attrs:{title:"Welcome to use "+t.$root.$children[0].pName.a+" DropShipping App",visible:t.DialogDispatchSetting.isShow,width:"700px","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},on:{"update:visible":function(e){return t.$set(t.DialogDispatchSetting,"isShow",e)}}},[i("div",{staticStyle:{padding:"0 25px"}},[i("p",{staticStyle:{"margin-bottom":"10px"}},[t._v(" Your vendor "),i("b",{staticStyle:{margin:"0 5px",color:"#606266","font-size":"14px"}},[t._v(t._s(t.DialogDispatchSetting.vendorName))]),t._v(" is inviting you to allocate your Orders ")]),i("p",{staticStyle:{"margin-bottom":"10px","padding-bottom":"15px","border-bottom":"1px #e4e7ed solid"}},[t._v(" Your store name: "),i("b",{staticStyle:{margin:"0 5px",color:"#606266","font-size":"14px"}},[t._v(" "+t._s(this.$store.state.userInfo.name))])]),i("div",{staticStyle:{"margin-bottom":"10px"}},[i("span",{staticStyle:{"margin-right":"15px"}},[t._v("Dispatch order method:")]),i("b",{staticStyle:{color:"#606266"}},[t._v("All my unfulfilled / partially fulfilled orders")])]),i("div",{staticStyle:{"margin-bottom":"15px"}},[i("span",{staticStyle:{"margin-right":"15px"}},[t._v("Cycle time:")]),i("b",{staticStyle:{color:"#606266"}},[t._v("Every 1 day")])]),i("div",{staticStyle:{color:"#909399"}},[i("i",{staticClass:"el-icon-info",staticStyle:{"margin-right":"5px"}}),t._v(' You can modify your order dispatch rules at any time in the menu "My Orders >> Dispatch settings" ')])]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("div",[i("el-button",{attrs:{disabled:t.DialogDispatchSetting.loading},on:{click:function(e){t.DialogDispatchSetting.isShow=!1}}},[t._v("Remind later")]),i("el-button",{attrs:{type:"primary",disabled:t.DialogDispatchSetting.loading,loading:t.DialogDispatchSetting.loading},on:{click:t.saveDispatchSetting}},[t._v("I agree")])],1)])]),i("el-dialog",{attrs:{width:"30%",title:"Dispatch rule Test Preview",visible:t.DialogDispatchPreview.isShow,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.DialogDispatchPreview,"isShow",e)}}},[i("div",{staticStyle:{padding:"20px"}},[i("p",{staticStyle:{"margin-bottom":"10px"}},[t._v(" According to your settings, we found some data for you: ")]),i("p",[t._v(" Shopify order: "),i("b",{staticStyle:{"margin-right":"15px",color:"#5c6ac4"}},[t._v(t._s(t.DialogDispatchPreview.orderCnt))]),t._v(" (Dispatch to "),i("b",{staticStyle:{color:"#5c6ac4"}},[t._v(t._s(t.DialogDispatchPreview.vendorCnt))]),t._v(" vendor(s)) ")])]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{disabled:t.DialogDispatchPreview.loading},on:{click:function(e){t.DialogDispatchPreview.isShow=!1}}},[t._v(" Dispatch in the Next Cycle ")]),i("el-button",{attrs:{loading:t.DialogDispatchPreview.loading,disabled:t.DialogDispatchPreview.loading,type:"primary"},on:{click:t.runDispatchRule}},[t._v("Dispatch Immediately")])],1)]),i("el-dialog",{attrs:{loading:t.moreReference.loading,title:"Reference",visible:t.moreReference.isShow,width:"800px"},on:{"update:visible":function(e){return t.$set(t.moreReference,"isShow",e)}}},[i("el-divider"),i("div",{staticClass:"mg-t-20 mg-b-20 mg-l-20 mg-r-20"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.moreReference.tableData,stripe:""}},[i("el-table-column",{attrs:{prop:"date",label:"Date",width:"180"}}),i("el-table-column",{attrs:{prop:"orderCnt",label:"Total Orders"}}),i("el-table-column",{attrs:{prop:"revenue",label:"Revenue ("+t.$showSybmol()+")",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$exchangeRate(e.row.revenue))+" ")]}}])}),i("el-table-column",{attrs:{prop:"cost",label:"Cost ("+t.$showSybmol()+")",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$exchangeRate(e.row.cost))+" ")]}}])})],1)],1),t.tableData.length?i("el-row",{staticClass:"mg-b-20",attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":t.moreReference.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.moreReference.pageSizes,"page-size":t.moreReference.rowsPerPage,total:Number(t.moreReference.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),i("el-divider"),i("div",{staticClass:"dialog-footer d-flex justify-content-end",attrs:{slot:"footer"},slot:"footer"},[i("div",[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.moreReference.isShow=!1}}},[t._v("Close")])],1)])],1),i("el-dialog",{attrs:{title:"Welcome to use "+t.$root.$children[0].pName.a+" DropShipping App",visible:t.DialogEntrustStore.isShow,width:"700px","close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1},on:{"update:visible":function(e){return t.$set(t.DialogEntrustStore,"isShow",e)}}},[i("div",{staticStyle:{padding:"0 25px"}},[i("p",{staticStyle:{"margin-bottom":"10px"}},[t._v(" Your vendor "),i("b",{staticStyle:{margin:"0 5px",color:"#606266","font-size":"14px"}},[t._v(t._s(t.DialogEntrustStore.vendorName))]),t._v(" is inviting you to allocate your Orders ")]),i("p",{staticStyle:{"margin-bottom":"10px","padding-bottom":"15px","border-bottom":"1px #e4e7ed solid"}},[t._v(" Your store name: "),i("b",{staticStyle:{margin:"0 5px",color:"#606266","font-size":"14px"}},[t._v(" "+t._s(t.DialogEntrustStore.shopName))])]),i("div",{staticStyle:{color:"#909399"}},[i("i",{staticClass:"el-icon-info",staticStyle:{"margin-right":"5px"}}),t._v(' You can modify your store settings at any time in the menu "My Stores" ')])]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("div",[i("el-button",{attrs:{disabled:t.DialogEntrustStore.loading},on:{click:function(e){t.DialogEntrustStore.isShow=!1}}},[t._v("Remind later")]),i("el-button",{attrs:{type:"primary",disabled:t.DialogEntrustStore.loading,loading:t.DialogEntrustStore.loading},on:{click:t.saveEntrustStore}},[t._v("I agree")])],1)])]),i("div",{staticClass:"el-tips",attrs:{type:"primary",circle:""},on:{click:function(e){t.tips=!t.tips}}},[i("div",[t._v("Newbie")]),i("div",[t._v("guide")])]),i("el-dialog",{staticClass:"guide",attrs:{title:"Newbie guide",visible:t.tips,width:"681px","custom-class":"verify-1"},on:{"update:visible":function(e){t.tips=e}}},[i("div",{staticClass:"tips-content"},[i("p",{staticClass:"ctx"},[i("el-tag",{staticClass:"mg-r-10",attrs:{type:"warning"}},[t._v("Step 1")]),t._v(" Complete personal information ")],1),i("p",{staticClass:"ctx"},[i("el-tag",{staticClass:"mg-r-10",attrs:{type:"warning"}},[t._v("Step 2")]),t._v("Authorize to bind the store ")],1),i("p",{staticClass:"ctx"},[i("el-tag",{staticClass:"mg-r-10",attrs:{type:"warning"}},[t._v("Step 3")]),t._v("Publish the push product ")],1),i("p",{staticClass:"ctx"},[i("el-tag",{staticClass:"mg-r-10",attrs:{type:"warning"}},[t._v("Step 4")]),t._v("Start pulling orders ")],1)]),i("div",{staticClass:"flex-center"},[i("el-button",{staticClass:"btn spec-1",attrs:{type:"primary"},on:{click:function(e){t.tips=!1}}},[t._v("Already ")])],1)]),i("el-dialog",{attrs:{title:t.advLook.title,visible:t.dialogVisibleLog,width:"40%"},on:{"update:visible":function(e){t.dialogVisibleLog=e}}},[i("div",{staticClass:"set-css",staticStyle:{padding:"0 20px"},domProps:{innerHTML:t._s(t.advLook.content)}}),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisibleLog=!1}}},[t._v("enter")])],1)])],2)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-s-home"}),a("h2",[t._v("Dashboard")])])]),a("div",{staticClass:"right"})])}],o=(a("99af"),a("4de4"),a("7db0"),a("d81d"),a("fb6a"),a("a434"),a("b0c0"),a("a9e3"),a("07ac"),a("ac1f"),a("5319"),a("159b"),a("4f70")),r={data:function(){return{tipsNum:1,tips:!1,autoplay:!0,activeIndex:0,vendorsList:[],dialogVisibleLog:!1,advLook:{},aliexpressVendorsStatus:!localStorage.getItem("c_aliexpressVendorsStatus"),pickerOptions0:{disabledDate:function(t){return t.getTime()>Date.now()-864e4}},scrollContainer:this.$root.$children[0].$refs.mainScroll,card1Loading:!1,card2Loading:!1,card3Loading:!1,vendorItems:[],items:[],totalCount:0,items2:[],iList:[],invoiceInfo:"",shareTitle:"",shareDesc:"",sendInvoiceOpen:!1,activeShareName:"shareWeixin",showDownloadInvoice:!1,remarkLoading:!1,noneData:0,DialogEntrustStore:{isShow:!1,loading:!1,vendorName:"---",vendorId:"",shopName:"---",id:""},DialogDispatchSetting:{isShow:!1,loading:!1,vendorName:"---",vendorId:"",storeName:"---",allProducts:0,productIds:[],getProductsloading:!1,products:[],period:"1"},DialogDispatchPreview:{isShow:!1,loading:!1,orderCnt:0,vendorCnt:0},statisticDate:[],statisticDefaultDate:[],statisticDateRange:"3",statisticDateFrom:"",statisticDateTo:"",dateArr:{1:"Today",2:"Last 7 days",3:"Last 30 days",4:"Last 90 days",5:"Last 12 months",6:"Custom"},userInfo:localStorage.getItem("c_ourMallUserInfo")?JSON.parse(localStorage.getItem("c_ourMallUserInfo")):"",tableData:[],moreReference:{isShow:!1,pageSizes:[10,20,50,100],page:1,rowsPerPage:localStorage.getItem("c_moreReferenceRowsPerPage")?Number(localStorage.getItem("c_moreReferenceRowsPerPage")):10,items:[],total:0,totalPage:0,loading:!1,tableData:[]},dashBoardData:{},marketLoading:!0,categorysList:[],advData:[]}},created:function(){this.tipsNum=localStorage.getItem("tips")||1,1==this.tipsNum?(this.tips=!0,localStorage.setItem("tips",2)):this.tips=!1},mounted:function(){var t=this;localStorage.getItem("c_ourMallFirstLogin")&&2==localStorage.getItem("c_ourMallFirstLogin")?(this.noneData=0,this.getOrderItems()):this.noneData=1,this.$apiCall("api.Invoice.findStores",{},(function(e){if(9999==e.ErrorCode){var a=e.Data.Results;t.$apiCall("api.Relationship.findByCustomer",{},(function(e){if(9999==e.ErrorCode&&e.Data.Results.length>0){var i=e.Data.Results.find((function(t){return t.vendorId}));1==t.$store.state.userInfo.isInvite&&!Number(t.$store.state.userInfo.ruleCnt)&&a.every((function(t){return!t.vendorName}))&&a.forEach((function(e,s){e.subShopUrl==localStorage.getItem("c_inviteShopUrl")&&1==e.authStatus&&"1"==t.$store.state.userInfo.vendorCnt&&(t.DialogEntrustStore.shopName=a[s].subShopUrl,t.DialogEntrustStore.id=a[s].id,i.vendorId&&(t.DialogEntrustStore.vendorId=i.vendorId),t.DialogEntrustStore.vendorName=i.vendorName,t.DialogEntrustStore.isShow=!0,localStorage.removeItem("c_inviteShopUrl"))}))}}))}})),this.getDashboardSummary(),this.myEcharts(),this.getVnedors(),this.getVendorShop(),this.getBalance(),this.getAdvList()},components:{},computed:{ActiveCategoryName:function(){return this.categorysList.length&&this.categorysList[this.activeIndex].name}},methods:{check2:function(t){this.data.warning=!t},getAdvList:function(){var t=this;this.$apiCall("api.Notice.finds",{rType:2},(function(e){9999==e.ErrorCode?(console.log(e.Data,"dfsdfsd"),t.advData=e.Data.Results.filter((function(t){if("1"==t.status)return t}))):t.$message.error(e.Message)}))},lookLog:function(t){var e=this;this.dialogVisibleLog=!0,this.$apiCall("api.Notice.get",{id:t},(function(t){9999==t.ErrorCode?e.advLook=t.Data.Results:e.$message.error(t.Message)}))},getBalance:function(){var t=this;this.$apiCall("api.Relationship.getUserBonus",{},(function(e){9999==e.ErrorCode?t.balance=e.Data.Results:t.$elementMessage(e.Message,"error")}))},getVendorShopProducts:function(){var t=this,e=this.categorysList.length;this.categorysList.forEach((function(a){t.$apiCall("api.VendorShop.findProducts",{page:1,rowsPerPage:12,categoryId:a.id},(function(i){e--,e||(t.marketLoading=!1),"9999"==i.ErrorCode?a.items=i.Data.Results:t.$elementMessage(i.Message,"error")}))}))},getVendorShop:function(){var t=this;this.categorysList=[];var e=o["b"];function a(t,e){switch(arguments.length){case 1:return parseInt(Math.random()*t+1,10);case 2:return parseInt(Math.random()*(e-t+1)+t,10);default:return 0}}var i=5,s=function s(){if(i){var o=a(0,e.length);e[o]&&(t.categorysList.push(e[o]),i--),e.splice(o,1),setTimeout((function(){s()}),50)}else t.getVendorShopProducts()};s()},deleteTramsform:function(t){},productTag:function(t){this.$router.push({path:"/aliExpress-dropShipping-vendors",query:{typeid:t}})},addVendors:function(t,e){var a=this;this.$showLoading(),this.$apiCall("api.VendorShop.addToMyVendor",{id:t},(function(t){"9999"==t.ErrorCode?(a.vendorsList.forEach((function(t){t.vendorId===e&&a.$set(t,"isAdded",1)})),a.$elementMessage("Add vendors success","success")):(a.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||a.$userFailure()),a.$hideLoading()}))},closeAliexporessVendors:function(){this.aliexpressVendorsStatus=!1,localStorage.setItem("c_aliexpressVendorsStatus","1")},setActiveItem:function(t){this.autoplay=!1,this.$refs.pricingCarousel.setActiveItem(t)},handleChangeCarousel:function(){this.activeIndex=this.$refs.pricingCarousel.activeIndex},getVnedors:function(){var t=this;this.$apiCall("api.VendorShop.findByCustomer",{page:1,rowsPerPage:5,rand:!0},(function(e){"9999"==e.ErrorCode?(t.vendorsList=e.Data.Results,t.vendorsList.forEach((function(e){var a=[];e.products.slice(0,4).forEach((function(t){a.push(t.imgUrl)})),t.$set(e,"imgUrlGroup",a)}))):(t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure())}))},gotoPage:function(t){switch(t){case 1:this.$router.push({name:"WaitingForAllocated"});break;case 2:this.$router.push({name:"OrderProcessing",query:{status:4}});break;case 3:this.$router.push({path:"/stores",query:{isAuth:"1"}});break;case 4:this.$router.push({name:"vendors"});break;case 5:this.$router.push({name:"importList"});break;case 6:this.$router.push({path:"/aliExpress-dropShipping-vendors"});break;default:this.$router.push({name:"products"});break}},getTableData:function(){var t=this;this.moreReference.loading=!0,this.$apiCall("api.Invoice.dashboardStatistic",{page:this.moreReference.page,rowsPerPage:this.moreReference.rowsPerPage},(function(e){t.moreReference.loading=!1,9999==e.ErrorCode?(t.moreReference.tableData=Object.values(e.Data.Results),t.moreReference.tableData.length&&(t.moreReference.tableData.forEach((function(e){t.$set(e,"dateCode1",Number(e.dateCode)),t.$set(e,"date",e.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))})),t.moreReference.total=Number(e.Data.Pagination.totalCount),t.moreReference.totalPage=Number(e.Data.Pagination.totalPage),t.moreReference.tableData=t.moreReference.tableData.sort(t.sortData))):t.$elementMessage(e.Message,"error")}))},sortData:function(t,e){return e.dateCode1-t.dateCode1},dateChange:function(){console.log(moment(this.statisticDate[0]).format("YYYYMMDD")),this.statisticDate&&this.statisticDate.length>1&&(this.statisticDateFrom=moment(this.statisticDate[0]).format("YYYYMMDD"),this.statisticDateTo=moment(this.statisticDate[1]).format("YYYYMMDD"),this.$Burying({object:"4001",objectId:"".concat(this.statisticDateFrom," - ").concat(this.statisticDateTo)}),this.myEcharts(1),this.statisticDateRange="")},dateRangeChange:function(){var t=this.statisticDateRange;switch(t){case"1":this.statisticDateFrom=moment().format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD");break;case"2":this.statisticDateFrom=moment().subtract(7,"d").format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD");break;case"3":this.statisticDateFrom=moment().subtract(30,"d").format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD");break;case"4":this.statisticDateFrom=moment().subtract(90,"d").format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD");break;case"5":this.statisticDateFrom=moment().subtract(12,"M").format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD");break;default:this.statisticDateFrom="",this.statisticDateTo="";break}this.statisticDate=[this.statisticDateFrom,this.statisticDateTo],this.$Burying({object:"4001",objectId:"".concat(this.statisticDateFrom," - ").concat(this.statisticDateTo)}),this.myEcharts(1)},getDashboardSummary:function(){var t=this;this.$showLoading(),this.$apiCall("api.Invoice.dashboardSummary",{},(function(e){t.$hideLoading(),9999==e.ErrorCode?t.dashBoardData=e.Data.Results:t.$elementMessage(e.Message,"error")})),this.$apiCall("api.Invoice.dashboardStatistic",{page:this.moreReference.page,rowsPerPage:this.moreReference.rowsPerPage},(function(e){t.$hideLoading(),9999==e.ErrorCode?(t.tableData=Object.values(e.Data.Results),t.tableData.length&&(t.tableData.forEach((function(e){t.$set(e,"dateCode1",Number(e.dateCode)),t.$set(e,"date",e.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))})),t.moreReference.total=Number(e.Data.Pagination.totalCount),t.moreReference.totalPage=Number(e.Data.Pagination.totalPage),t.tableData=t.tableData.sort(t.sortData))):t.$elementMessage(e.Message,"error")}))},toPage:function(t){t!=this.moreReference.page&&(this.moreReference.page=t),this.getTableData()},changePageSize:function(t){this.moreReference.rowsPerPage=t,this.moreReference.page=1,localStorage.setItem("c_moreReferenceRowsPerPage",t),this.getTableData()},showMoreReference:function(){this.$Burying({object:"3012"}),this.moreReference.isShow=!0,this.getTableData()},myEcharts:function(t){var e=this,a=document.getElementById("dashboardCharts");t||(this.statisticDateFrom=moment().subtract(1,"M").format("YYYYMMDD"),this.statisticDateTo=moment().format("YYYYMMDD"),this.statisticDate=[this.statisticDateFrom,this.statisticDateTo]),this.$showLoading();var i=[];this.$apiCall("api.Invoice.dashboardStatistic",{dateFrom:this.statisticDateFrom,dateTo:this.statisticDateTo},(function(t){if(e.$hideLoading(),9999==t.ErrorCode){i=Object.values(t.Data.Results),i.length&&i.forEach((function(t){e.$set(t,"date",t.dateCode.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3"))})),console.log(i);var s=echarts.init(a),o={title:{text:""},tooltip:{trigger:"axis"},legend:{data:["Total Revenue ".concat(e.$showSybmol()),"Total Cost"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:i.map((function(t){return t.date}))},yAxis:{type:"value"},series:[{name:"Total Revenue ".concat(e.$showSybmol()),type:"line",stack:"Total Revenue",data:i.map((function(t){return e.$exchangeRate(t.revenue)})),smooth:!0},{name:"Total Cost",type:"line",stack:"Total Cost",data:i.map((function(t){return e.$exchangeRate(t.cost)})),smooth:!0}]};s.setOption(o),setTimeout((function(){s.resize()}),200),window.onresize=s.resize}else e.$elementMessage(t.Message,"error")}))},runDispatchRule:function(){var t=this;this.DialogDispatchPreview.loading=!0,this.$apiCall("api.DispatchOrderRule.testGenerate",{isGenerate:1},(function(e){t.DialogDispatchPreview.loading=!1,9999==e.ErrorCode?(t.$elementMessage("success","success"),t.DialogDispatchPreview.isShow=!1,t.$router.push({name:"invoices"})):t.$elementMessage(e.Message,"error")}))},saveEntrustStore:function(){var t=this,e={id:this.DialogEntrustStore.id,vendorId:this.DialogEntrustStore.vendorId};this.$apiCall("api.ShopifyAccount.bindVendor",e,(function(e){t.DialogEntrustStore.loading=!1,9999==e.ErrorCode?t.DialogEntrustStore.isShow=!1:t.$elementMessage(e.Message,"error")}))},saveDispatchSetting:function(t){var e=this;if(!this.DialogDispatchSetting.allProducts||this.DialogDispatchSetting.productIds.length)if(this.DialogDispatchSetting.vendorId)if(this.DialogDispatchSetting.period){this.DialogDispatchSetting.loading=!0;var a={relationshipId:this.DialogDispatchSetting.vendorId,period:this.DialogDispatchSetting.period,visibilityType:1,productIds:this.DialogDispatchSetting.productIds,status:1};this.DialogDispatchSetting.allProducts||(a.productIds=[]),this.$apiCall("api.DispatchOrderRule.addByCustomer",a,(function(t){9999==t.ErrorCode?e.$apiCall("api.DispatchOrderRule.testGenerate",{},(function(t){e.DialogDispatchSetting.loading=!1,e.DialogDispatchSetting.isShow=!1,9999==t.ErrorCode?(e.DialogDispatchPreview.vendorCnt=t.Data.Results.vendorCnt,e.DialogDispatchPreview.orderCnt=t.Data.Results.orderCnt,e.DialogDispatchPreview.isShow=!0):e.$elementMessage(t.Message,"error")})):(e.DialogDispatchSetting.loading=!1,e.$elementMessage(t.Message,"error"))}))}else this.$elementMessage("Please select the circle period","error");else this.$elementMessage("Please select the vendor","error");else this.$elementMessage("Please select the products","error")},remoteMethodGetProducts:function(t){var e=this;t&&(this.DialogDispatchSetting.getProductsloading=!0,this.$apiCall("api.Product.findByUser",{name:t},(function(t){e.DialogDispatchSetting.getProductsloading=!1,9999==t.ErrorCode&&(e.DialogDispatchSetting.products=[],t.Data.Results.forEach((function(t){JSON.parse(t.imgsJson).length&&(t.img=JSON.parse(t.imgsJson)[0]),e.DialogDispatchSetting.products.push(t)})))})))},stockImg:function(t){return JSON.parse(t.imgsJson)[0]},saveRemark:function(t){var e=this;this.remarkLoading=!0,this.$apiCall("api.Invoice.saveRemark",{uniCode:this.invoiceInfo.uniCode,title:1==t?"":this.shareTitle,desc:1==t?"":this.shareDesc},(function(t){e.remarkLoading=!1,"9999"==t.ErrorCode?(e.shareTitle=t.Data.Results.title,e.shareDesc=t.Data.Results.desc):(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure(),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure())}))},onCopy:function(t){this.$elementMessage("Has been copied to the clipboard","success")},onError:function(t){this.$elementMessage("Copy to clipboard failed, please copy manually","error")},openSend:function(){var t=0,e=setInterval((function(){(function(t,e,a){t.loadSkypeWebSdkAsync=t.loadSkypeWebSdkAsync||function(t){var i,s=e.getElementsByTagName(a)[0];e.getElementById(t.id)||(i=e.createElement(a),i.id=t.id,i.src=t.scriptToLoad,i.onload=t.callback,s.parentNode.insertBefore(i,s))};var i={scriptToLoad:"https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",id:"skype_web_sdk"};t.loadSkypeWebSdkAsync(i)})(window,document,"script"),t++,t>10&&clearInterval(e)}),300)},sendtoVendor:function(t){var e=this;this.card3Loading=!0,this.$apiCall("api.Invoice.getShareUrl",{invoiceId:t.id},(function(t){e.card3Loading=!1,"9999"==t.ErrorCode?(e.invoiceInfo=t.Data.Results,e.shareTitle=e.invoiceInfo.remark?e.invoiceInfo.remark.title:"",e.shareDesc=e.invoiceInfo.remark?e.invoiceInfo.remark.desc:"",e.sendInvoiceOpen=!0,e.activeShareName="shareWeixin"):(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure())}))},gotoOrder:function(t){var e={id:t.relationshipId,name:t.vendorName};Number(t.itemCnt)||(e.bind=!0),this.$router.push({name:"shopifyOrders",params:e})},gotoInvoice:function(t){var e=this.$router.resolve({path:"/i/"+t.uniCode});window.open(e.href,"_blank")},cancelInvoice:function(t){var e=this;this.$confirm("Are you sure you want to cancel it?","",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"error"}).then((function(){e.$apiCall("api.Invoice.cancel",{invoiceId:t.id},(function(t){9999==t.ErrorCode?(e.$message({message:"Success",type:"success"}),e.getLastInvoice()):e.$message({message:t.Message,type:"error"})}))})).catch((function(){}))},getVendorCnt:function(){var t=this;this.VendorCnt.loading=!0,this.$apiCall("api.Invoice.vendorCnt",{relationshipId:this.items[0].relationshipId},(function(e){t.VendorCnt.loading=!1,"9999"==e.ErrorCode?(t.VendorCnt.invoiceAmount=e.Data.Results.invoiceAmount,t.VendorCnt.invoiceCnt=e.Data.Results.invoiceCnt,t.VendorCnt.skuCnt=e.Data.Results.skuCnt,t.VendorCnt.name=t.items[0].vendorName):t.$elementMessage(e.Message,"error")}))},getOrderItems:function(){var t=this;this.card2Loading=!0,this.$apiCall("api.Invoice.shopifyOrders",{page:1,rowsPerPage:10},(function(e){t.card2Loading=!1,"9999"==e.ErrorCode?(e.Data.Results.length||t.noneData++,t.items2=e.Data.Results):(t.pageLoading=!1,t.$elementMessage(e.Message,"error"))}))},goto:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.$router.push({name:t,params:e})}}},n=r,c=(a("b5b8"),a("5fea"),a("2877")),l=Object(c["a"])(n,i,s,!1,null,"dbef0712",null);e["default"]=l.exports},"7db0":function(t,e,a){"use strict";var i=a("23e7"),s=a("b727").find,o=a("44d2"),r="find",n=!0;r in[]&&Array(1)[r]((function(){n=!1})),i({target:"Array",proto:!0,forced:n},{find:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),o(r)},b5b8:function(t,e,a){"use strict";a("6904")},f2d7:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAsBJREFUWEftVtFx2kAQfSvZ/+4guAM8yJnJIBJcgaGCkAoCFYRUYLmC4ApCB8gBJjOxGJIKInfAdwS6zOqQLKQ76ewffrx/3Indt2/f7h7hyEZHjo9XAM9jYLY+y0p2uv0CUDP5TeTjn3Wb3V1dbExLaw5gGXgQ+AzgEcAbEN0jjv09gF5yBuwBCg/u5cgEhBmA5WqAWHjY2g1wdj/XDby7CA8CLH810X77O7nb7XyAPLgtrw6EGYDFaghCD+1Wt85hcs9sxWKDzuW47nszAJxdbPnoOE8aqPK8CEJQ3EsYqTEzAOxkEUxBCNF2hpU+OXsWpyFb5gC4A053Pog8tFsTJQjWihBDRHY30YqBmQGQwW8g0AfRWCsuCYDrPkNkj0xA1AP4EfRg4RuAe0T2oNapBMvqv4YQfXQuZatqrBqAzIiD38F1BpmPtOXyToutyZ0DcQOiT9qS8QzTQps/dEE0KwXPzmmUlSIFKsTVQca681xQNQBJ4xpEj0o1LwIW4cckOzYVS2kQOUGv4TrnqmTVAOYPY4CGOLGbpYmXOV75EOLD/ucfuI7cC0XjZE52ISA81WDSAAg2sDCp7HnJkhw0kd2sFGcFC2UAUvXfYdvnyuzlPS8ltjRrCSTGLd470xILLFphrVHUiFKETD/RAK7TUFKajGXi7cdrWHaGEHIwWWKqHb/zYKMqQ5mB5Ur2rW6UcrtFEa9ewLK4389ANEmWz9a+05aC/QoRHrSzkoE6ANxagMw8FrIEFqVLZ6If0+od8XwG8nWpA5v/lktrWd0is2UA3ONEDaNtxuVgKz5OVOIxLkE6QnVdoFRmzaFs2b8AfS0usjID6eAgrBHZ/drlUwcov0nTJ13uP+pB9LSEwkThyRvvBWbbXQjBgm3olpJ+GcnHJc8E9TwwxcOtR7Gnmw/17wHTQC/87hXA0Rn4D0TJQzDtRRKyAAAAAElFTkSuQmCC"},fb6a:function(t,e,a){"use strict";var i=a("23e7"),s=a("861d"),o=a("e8b5"),r=a("23cb"),n=a("50c4"),c=a("fc6a"),l=a("8418"),d=a("b622"),g=a("1dde"),h=g("slice"),u=d("species"),p=[].slice,m=Math.max;i({target:"Array",proto:!0,forced:!h},{slice:function(t,e){var a,i,d,g=c(this),h=n(g.length),v=r(t,h),f=r(void 0===e?h:e,h);if(o(g)&&(a=g.constructor,"function"!=typeof a||a!==Array&&!o(a.prototype)?s(a)&&(a=a[u],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return p.call(g,v,f);for(i=new(void 0===a?Array:a)(m(f-v,0)),d=0;v<f;v++,d++)v in g&&l(i,d,g[v]);return i.length=d,i}})}}]);
//# sourceMappingURL=dashboard.23a43e54.js.map