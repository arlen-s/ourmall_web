(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["preview"],{"9e6a":function(t,e,i){"use strict";i("eb06")},a64c:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("el-scrollbar",{ref:"myScrollbar",staticClass:"page-content"},[e("div",{staticClass:"invoice"},[e("el-container",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],class:t.noMore||5==t.tabActive?"":"pd-b-100",attrs:{"infinite-scroll-distance":800,"infinite-scroll-disabled":"disabled"}},[e("el-main",[e("el-card",{staticStyle:{"margin-bottom":"20px"},attrs:{shadow:"always"}},[e("el-steps",{attrs:{active:2,"process-status":"wait"}},[e("el-step",{attrs:{title:"步骤1",icon:"el-icon-success",description:"这是一段很长很长很长的描述性文字"}}),e("el-step",{attrs:{title:"步骤2",description:"这是一段很长很长很长的描述性文字"}}),e("el-step",{attrs:{title:"步骤3",description:"这是一段很长很长很长的描述性文字"}}),e("el-step",{attrs:{title:"步骤4",description:"这是一段很长很长很长的描述性文字"}})],1)],1),e("el-card",{attrs:{shadow:"always"}},[e("el-row",{staticStyle:{"margin-top":"25px","align-items":"flex-start"},attrs:{type:"flex"}},[e("el-col",{attrs:{span:12}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.pageLoading,expression:"pageLoading"}],staticClass:"grid-content invoice-header-logo"})]),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"grid-content invoice-header-info"},[e("div",{staticClass:"wv-heading-title"},[t._v("INVOICE")]),[e("div",{staticClass:"wv-text-strong"},[t._v(" "+t._s(t.invoiceInfo.vendorName?t.invoiceInfo.vendorName:"---")+" ")])]],2)])],1),e("el-divider"),e("el-row",{attrs:{type:"flex",align:"middle"}},[e("el-col",{attrs:{span:12}},[e("div",{staticClass:"grid-content invoice-metadata-custome tx-left pos-relative"},[e("div",[t._v(" BILL To "),e("br"),[e("span",{staticClass:"wv-text-strong",staticStyle:{cursor:"pointer"}},[t._v(t._s(t.invoiceInfo.customerName?t.invoiceInfo.customerName:"---"))])]],2),e("div",{staticClass:"change-customer"})])]),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"invoice-metadata-info mg-b-20"},[e("div",{staticClass:"text-right"},[e("p",[t._v("Invoice Number :")]),e("p",{staticClass:"mg-y-10"},[t._v("Invoice Date :")]),e("p",{staticClass:"text-bg"},[t._v("Amount Due (US$) :")])]),e("div",{staticClass:"text-left"},[e("p",[t._v("# "+t._s(t.invoiceInfo.code?t.invoiceInfo.code:"---"))]),e("p",{staticClass:"mg-y-10"},[t._v(t._s(t.invoiceInfo.timeCreated?t.invoiceInfo.timeCreated:"---"))]),e("p",{staticClass:"wv-text-strong text-bg",staticStyle:{"padding-left":"0"}},[t._v("$ "+t._s(t.realAmount?t.$numberToCurrency(t.realAmount):"0.00"))])])])])],1),5!=t.tabActive?[e("div",{staticClass:"table-wrap"},[e("el-table",{staticClass:"table-only",attrs:{"header-cell-style":t.getRowClass,"cell-style":t.cellStyle}},[e("el-table-column",{attrs:{label:"Items"}}),e("el-table-column",{attrs:{label:"Quantity",width:"160"}}),e("el-table-column",{attrs:{label:"Unit Cost(US$)",width:"120"}}),e("el-table-column",{attrs:{label:"Subtotal(US$)",width:"120"}})],1),e("el-table",{staticClass:"table-with-body",attrs:{"row-class-name":t.tableRowClassName,"header-cell-style":t.getRowClass,"cell-style":t.cellStyle,data:t.invoiceData,stripe:"",border:""}},[e("el-table-column",{attrs:{label:"Items"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("div",{},[e("div",{staticStyle:{"max-width":"100%","text-align":"left"}},[e("div",{staticClass:"tx-600"},[t._v(" "+t._s(i.row.name)+" ")]),2!=t.tabActive?e("div",{staticClass:"d-flex no-wrap justify-content-between"},[e("el-popover",{attrs:{"popper-class":"customer-popover",placement:"bottom",title:"Shopify Order "+i.row.codeName,width:"500",trigger:"hover"}},[e("span",{staticStyle:{cursor:"pointer"},attrs:{slot:"reference"},slot:"reference"},[t._v(t._s(i.row.codeName)),e("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e("div",{staticClass:"mg-y-15 mg-t-20"},[e("div",{staticClass:"d-flex"},[e("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[e("div",{staticStyle:{width:"120px","text-align":"right",color:"#999"}},[t._v("Order Date :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(i.row.timeCreated))])])]),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[e("div",{staticStyle:{width:"120px","text-align":"right",color:"#999"}},[t._v("Customer :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(i.row.shippingJson&&i.row.shippingJson.name?i.row.shippingJson.name:"---"))])])]),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[e("div",{staticStyle:{width:"120px","text-align":"right",color:"#999"}},[t._v("Shipping Address :")]),e("div",{staticClass:"mg-l-5 pd-r-15",staticStyle:{"max-width":"75%"}},[t._v(" "+t._s(i.row.shippingJson&&i.row.shippingJson.zip?i.row.shippingJson.zip:"---")+" "+t._s(i.row.shippingJson&&i.row.shippingJson.address1?i.row.shippingJson.address1:"---")+" "+t._s(i.row.shippingJson&&i.row.shippingJson.city?i.row.shippingJson.city:"---")+" "+t._s(i.row.shippingJson&&i.row.shippingJson.province?i.row.shippingJson.province:"---")+" ")])])]),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[e("div",{staticStyle:{width:"120px","text-align":"right",color:"#999"}}),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(i.row.shippingJson&&i.row.shippingJson.country?i.row.shippingJson.country:"---"))])])]),e("div",{staticClass:"d-flex"},[e("div",{staticClass:"d-flex",staticStyle:{width:"90%"}},[e("div",{staticStyle:{width:"120px","text-align":"right",color:"#999"}},[t._v("Email：")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(i.row.email))])])])])]),e("div",{staticStyle:{width:"50px"}}),e("div",{staticClass:"no-wrap"},[i.row.trackNumber?e("div",{staticClass:"d-flex"},[e("div",[t._v(" "+t._s(i.row.trackCompany)+" "+t._s(i.row.trackNumber)+" ")]),2==i.row.syncStatus?e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"right"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("供应商已发货，但物流信息未同步到Shopify店铺。"),e("br"),t._v("原因：客户未授权该订单对应的Shopify账号。")]),e("i",{staticClass:"iconfont icon-tongbu1 mg-l-10",staticStyle:{color:"#E6A23C","font-size":"18px"}})]):e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"供应商已发货，物流信息已同步到Shopify店铺。",placement:"right"}},[e("i",{staticClass:"iconfont icon-tongbu1 mg-l-10",staticStyle:{color:"#67C23A","font-size":"20px"}})])],1):1==i.row.fulfillStatus?e("div",[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"This item hasn't been shipped yet.",placement:"right"}},[e("el-alert",{attrs:{title:"Not shipped",type:"warning",closable:!1}})],1)],1):e("div",[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Reason："+i.row.stopReason,placement:"right"}},[e("el-alert",{attrs:{title:"Can't shipment",type:"error",closable:!1}})],1)],1)])],1):t._e()])])]}}],null,!1,320709396)}),e("el-table-column",{attrs:{prop:"qty",label:"Quantity",width:"160"},scopedSlots:t._u([{key:"default",fn:function(i){return[2!=t.tabActive?[1==t.invoiceInfo.payStatus?[e("el-input-number",{attrs:{disabled:1==t.preview,size:"small",min:0},on:{change:function(e){return t.handleChange(i.row,e)}},model:{value:i.row.quantity,callback:function(e){t.$set(i.row,"quantity",e)},expression:"scope.row.quantity"}})]:t._e(),2==t.invoiceInfo.payStatus?[e("el-input-number",{attrs:{disabled:1==t.preview,size:"small",min:0},on:{change:function(e){return t.handleChange(i.row,e)}},model:{value:i.row.quantity,callback:function(e){t.$set(i.row,"quantity",e)},expression:"scope.row.quantity"}})]:t._e()]:t._e(),2==t.tabActive?e("span",[t._v(t._s(i.row.quantity))]):t._e()]}}],null,!1,486726724)}),e("el-table-column",{attrs:{prop:"price",label:"Unit Cost(US$)",width:"120"},scopedSlots:t._u([{key:"default",fn:function(i){return[2!=t.tabActive?e("div",[e("div",[t._v(" "+t._s(i.row.price)+" ")])]):t._e(),2==t.tabActive?e("div",[t._v(" "+t._s(i.row.price)+" ")]):t._e()]}}],null,!1,2353231076)}),e("el-table-column",{attrs:{label:"Subtotal(US$)",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$numberToCurrency(e.row.amount))+" ")]}}],null,!1,570403819)})],1)],1),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"page-footer mg-t-30 mg-b-10",staticStyle:{"min-height":"50px","z-index":"0"}},[e("el-row",{directives:[{name:"show",rawName:"v-show",value:t.noMore,expression:"noMore"}]},[e("el-col",{attrs:{span:20,offset:4}},[e("div",{staticClass:"grid-content invoice-bottom"},[e("div",{staticClass:"d-flex justify-content-end mg-b-10"},[e("div",{},[t._v("Items total (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(t.$numberToCurrency(t.itemAmount)))])]),e("div",{staticClass:"d-flex justify-content-end"},[e("div",{},[t._v("Shipping total (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(" "+t._s(t.$numberToCurrency(t.shippingAmount))+" ")])]),e("el-divider"),e("div",{staticClass:"d-flex justify-content-end"},[e("div",{},[t._v("Subtotal (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(t.$numberToCurrency(t.totalAmount)))])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.discount>0,expression:"discount>0"}],staticClass:"d-flex justify-content-end mg-t-10"},[e("div",{},[t._v("Discount (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15",staticStyle:{color:"rgb(103, 194, 58)"}},[t._v("- "+t._s(t.$numberToCurrency(t.discount)))])]),e("div",{staticClass:"d-flex justify-content-end mg-t-10 bold-input"},[e("div",{staticClass:"tx-bold"},[t._v("Amount Due (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15",staticStyle:{"font-size":"16px","font-weight":"bold"}},[t._v(" "+t._s(t.$numberToCurrency(t.realAmount))+" ")])]),e("div",{staticClass:"d-flex justify-content-end mg-t-10",staticStyle:{"align-items":"flex-start"}},[e("div",{},[t._v("Payment :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(" "+t._s(1==t.paymentType?"Transfer by bank or PayPal":"AliExpress")+" ")])]),2==t.paymentType?e("div",{staticClass:"mg-t-10 normal-input pd-r-15",staticStyle:{"text-align":"right"}},[e("p",{staticStyle:{"margin-bottom":"10px"}},[t._v("As the vendor's setting, you can go to Aliexpress to buy the item in the vendor's store to finish the payment.")]),e("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){return t.openPayUrl(t.payUrl)}}},[t._v("Go to AliExpress NOW")])],1):t._e()],1),1==t.invoiceInfo.paymentType||2==t.invoiceInfo.paymentType?[1==t.invoiceInfo.payStatus?e("div",{staticClass:"tx-right mg-t-15"},[e("span",[e("el-alert",{staticStyle:{display:"inline"},attrs:{title:"The vender has confirmed the payment.",type:"success",closable:!1}})],1)]):t._e()]:t._e()],2)],1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.noMore,expression:"!noMore"}],staticClass:"page-footer-fixed"},[e("div",{staticStyle:{width:"1030px",margin:"0 auto"}},[e("div",{staticClass:"without-hover"},[e("el-row",{staticStyle:{margin:"20px 15px 10px -15px"}},[e("el-col",{attrs:{span:24}},[e("div",{staticClass:"d-flex justify-content-end"},[e("div",{staticClass:"tx-bold"},[t._v("Amount Due (US$) :")]),e("div",{staticClass:"mg-l-5",staticStyle:{"font-weight":"bold","font-size":"16px!important"}},[t._v(" "+t._s(t.$numberToCurrency(t.realAmount))+" ")])])])],1)],1),e("div",{staticClass:"with-hover"},[e("el-row",{staticStyle:{margin:"10px 15px 10px -15px"}},[e("el-col",{attrs:{span:8}},[e("div",[e("el-button",{attrs:{size:"medium",plain:"",type:"primary",icon:"el-icon-printer"}},[t._v("Print")])],1)]),e("el-col",{attrs:{span:16}},[e("div",{staticClass:"grid-content invoice-bottom"},[e("div",{staticClass:"d-flex justify-content-end mg-b-10"},[e("div",{},[t._v("Items total (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(t.$numberToCurrency(t.itemAmount)))])]),e("div",{staticClass:"d-flex justify-content-end"},[e("div",{},[t._v("Shipping total (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(" "+t._s(t.$numberToCurrency(t.shippingAmount))+" ")])]),e("el-divider"),e("div",{staticClass:"d-flex justify-content-end"},[e("div",{},[t._v("Subtotal (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(t._s(t.$numberToCurrency(t.totalAmount)))])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.discount>0,expression:"discount>0"}],staticClass:"d-flex justify-content-end mg-t-10"},[e("div",{},[t._v("Discount (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15",staticStyle:{color:"rgb(103, 194, 58)"}},[t._v("- "+t._s(t.$numberToCurrency(t.discount)))])]),e("div",{staticClass:"d-flex justify-content-end mg-t-10 bold-input"},[e("div",{staticClass:"tx-bold"},[t._v("Amount Due (US$) :")]),e("div",{staticClass:"mg-l-5 pd-r-15",staticStyle:{"font-size":"16px","font-weight":"bold"}},[t._v(" "+t._s(t.$numberToCurrency(t.realAmount))+" ")])]),e("div",{staticClass:"d-flex justify-content-end mg-t-10",staticStyle:{"align-items":"flex-start"}},[e("div",{},[t._v("Payment :")]),e("div",{staticClass:"mg-l-5 pd-r-15"},[t._v(" "+t._s(1==t.paymentType?"Transfer by bank or PayPal":"AliExpress")+" ")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:2==t.paymentType,expression:"paymentType == 2"}],staticClass:"mg-t-10 normal-input pd-r-15",staticStyle:{"text-align":"right"}},[e("p",{staticStyle:{"margin-bottom":"10px"}},[t._v("As the vendor's setting, you can go to Aliexpress to buy the item in the vendor's store to finish the payment.")]),e("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){return t.openPayUrl(t.payUrl)}}},[t._v("Go to AliExpress NOW")])],1)],1),e("div",{staticClass:"tx-right mg-t-20"},[1==t.invoiceInfo.paymentType||2==t.invoiceInfo.paymentType?[1==t.invoiceInfo.payStatus?e("span",[e("el-alert",{staticStyle:{display:"inline"},attrs:{title:"The vender has confirmed the payment.",type:"success",closable:!1}})],1):t._e()]:t._e()],2)])],1)],1)])])]:t._e()],2)],1),e("el-aside",{staticStyle:{position:"relative",left:"50px"},attrs:{width:"50px"}},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Download & Upload",placement:"right"}},[e("el-button",{staticStyle:{position:"fixed",bottom:"260px",width:"40px",height:"40px","line-height":"40px","text-align":"center",padding:"0","z-index":"1"},attrs:{size:"medium",circle:"",type:"primary"}},[e("i",{staticClass:"iconfont icon-xiazai",staticStyle:{"margin-right":"0","font-size":"22px"}})])],1),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Statistics",placement:"right"}},[e("el-button",{staticStyle:{"margin-left":"0",position:"fixed",bottom:"200px",width:"40px",height:"40px","line-height":"40px","text-align":"center",padding:"0","z-index":"1"},attrs:{size:"medium",circle:"",type:"primary"},on:{click:function(e){t.drawer=!0}}},[e("i",{staticClass:"fa fa-bar-chart",staticStyle:{"margin-right":"0"}})])],1),e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Help",placement:"right"}},[e("el-button",{staticStyle:{"margin-left":"0",position:"fixed",bottom:"140px",width:"40px",height:"40px","line-height":"40px","text-align":"center",padding:"0","z-index":"1"},attrs:{size:"medium",circle:"",type:"primary"}},[e("i",{staticClass:"fa fa-question-circle-o",staticStyle:{"margin-right":"0","font-size":"20px"}})])],1),e("el-backtop",{staticStyle:{right:"auto",bottom:"80px","z-index":"1"},attrs:{target:".el-scrollbar__wrap"}})],1)],1),e("el-container",{directives:[{name:"show",rawName:"v-show",value:5!=t.tabActive&&t.noMore||5==t.tabActive,expression:"(tabActive != 5 && noMore) || tabActive == 5"}],attrs:{id:"messageContainer"}},[e("el-main",[e("div",{staticClass:"d-flex justify-content-between mg-b-20 pd-x-20"},[e("span",{staticClass:"tx-16 tx-600"},[t._v("Timeline")]),e("el-checkbox",{model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("Show comments")])],1),e("el-divider"),e("el-row",{attrs:{gutter:30}},[e("el-col",{attrs:{span:12}},[t.currentPageDataLog.length?e("el-timeline",[t._l(t.currentPageDataLog,(function(i){return[e("el-timeline-item",[t._v(" "+t._s(i.date)+" ")]),t._l(i.listInfo,(function(i,s){return e("el-timeline-item",{attrs:{color:"#5c6ac4"}},[e("div",{staticClass:"d-flex justify-content-between",staticStyle:{"align-items":"flex-start"}},[e("span",[t._v(t._s(i.content))]),e("span",{staticStyle:{"white-space":"nowrap","margin-left":"10px",color:"#999"}},[t._v(t._s(i.datetime))])])])}))]}))],2):e("p",{staticClass:"tx-center"},[t._v("No more data")])],1),e("el-col",{attrs:{span:12}},[e("div",{staticClass:"mg-b-15",class:1==t.preview?"with-preview":"",staticStyle:{"margin-left":"40px",position:"relative",background:"#fff",border:"1px solid #ddd",padding:"10px"}},[e("ul",{staticClass:"figure-list"},t._l(t.fileList,(function(i,s){return e("li",[e("figure",{style:{backgroundImage:"url("+i.url+")",backgroundSize:"cover"}},[e("a",{attrs:{href:"#"}}),e("a",{staticClass:"btn",attrs:{href:"#"},on:{click:function(e){return t.removeMsgImg(s)}}},[e("i",{staticClass:"el-icon-close"})])])])})),0),e("el-input",{staticClass:"input-with-select",staticStyle:{border:"none"},attrs:{size:"medium",placeholder:"Please leave your message",type:"textarea",autosize:"",resize:"none"},model:{value:t.msgContent,callback:function(e){t.msgContent=e},expression:"msgContent"}}),e("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"flex-end",position:"absolute",bottom:"10px",right:"10px"}},[e("i",{staticClass:"fa fa-smile-o",staticStyle:{"font-size":"20px",margin:"0 10px"},attrs:{slot:"suffix"},slot:"suffix"}),e("el-upload",{staticClass:"upload-demo",attrs:{action:"","show-file-list":!1,"http-request":t.uploadSectionFile2}},[e("i",{staticClass:"fa fa-paperclip",staticStyle:{"font-size":"20px",margin:"0 10px"}})]),e("el-button",{attrs:{slot:"append",size:"small"},on:{click:t.addMessage},slot:"append"},[t._v("Send")])],1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:t.checked,expression:"checked"}]},[t.currentmessages.length?e("el-timeline",[t._l(t.currentmessages,(function(i){return[e("el-timeline-item",[t._v(" "+t._s(i.date)+" ")]),t._l(i.listInfo,(function(i,s){return[1==i.type?e("el-timeline-item",{attrs:{color:"#5c6ac4",timestamp:i.datetime,placement:"top"}},[e("el-card",[e("div",{staticClass:"d-flex timeline-customer"},[e("el-avatar",{attrs:{size:40}},[t._v(" "+t._s(i.cname)+" ")]),e("div",{staticClass:"mg-l-10"},[e("h4",[t._v(t._s(i.customerName)+" ")]),e("p",{staticClass:"mg-t-5"},[t._v(t._s(i.content))])])],1)])],1):t._e(),2==i.type?e("el-timeline-item",{attrs:{color:"#5c6ac4",timestamp:i.datetime,placement:"top"}},[e("el-card",{attrs:{"body-style":{background:"#9eea6a"}}},[e("div",{staticClass:"d-flex justify-content-end tx-right timeline-self"},[e("div",{staticClass:"mg-r-10"},[e("h4",[t._v(t._s(i.vendorName))]),e("p",{staticClass:"mg-t-5"},[t._v(t._s(i.content))]),i.imgJson?e("p",{staticClass:"mg-t-10"},t._l(i.imgJson,(function(t){return e("img",{staticClass:"mg-l-10",attrs:{src:t,width:"60"}})})),0):t._e()]),e("el-avatar",{attrs:{size:40}},[t._v(" "+t._s(i.vname)+" ")])],1)])],1):t._e()]}))]}))],2):e("p",{staticClass:"tx-center"},[t._v("No more comment")])],1)])],1)],1),e("el-aside",{attrs:{width:"50px"}})],1),e("el-dialog",{attrs:{title:"发票预览","custom-class":"previewTip",visible:t.previewTipOpen,width:"50%","close-on-click-modal":!1},on:{"update:visible":function(e){t.previewTipOpen=e}}},[e("el-divider"),e("div",[e("h2",{staticStyle:{"font-size":"16px","font-weight":"bold",margin:"30px 20px","text-align":"center"}},[t._v("当前发票页面仅供预览，如果发送给客户请使用发票编辑页面的“发送发票”功能！")])]),e("div",{staticClass:"d-flex",staticStyle:{"justify-content":"space-around",margin:"20px"}},[e("div",{staticStyle:{width:"48%","margin-right":"2%"}},[e("p",{staticClass:"mg-y-10"},[t._v("如图一所示：页面顶部“发送发票”按钮")]),e("img",{staticStyle:{"box-shadow":"0 2px 12px 0 rgba(0,0,0,.1)"},attrs:{width:"100%",src:"images/url2-2.png"}})]),e("div",{staticStyle:{width:"48%","margin-left":"2%"}},[e("p",{staticClass:"mg-y-10"},[t._v("如图二所示：页面底部“发送发票”按钮")]),e("img",{staticStyle:{"box-shadow":"0 2px 12px 0 rgba(0,0,0,.1)"},attrs:{width:"100%",src:"images/url2-1.png"}})])]),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.previewTipOpen=!1}}},[t._v("我知道了")])],1)],1),e("el-drawer",{attrs:{title:"我是标题",visible:t.drawer,"with-header":!1},on:{"update:visible":function(e){t.drawer=e}}},[e("el-scrollbar",[e("h2",{staticStyle:{padding:"20px","font-size":"24px"}},[t._v("数据统计：")]),e("el-card",{staticClass:"box-card",attrs:{shadow:"never"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("采购订单基础信息")])]),e("div",{staticStyle:{"margin-top":"-30px"}},[e("el-form",{attrs:{"label-position":"right","label-width":"120px"}},[e("el-form-item",{attrs:{label:"订单总数："}},[t._v(" 212 个 ")]),e("el-form-item",{attrs:{label:"订单商品项："}},[t._v(" 22 种 ")]),e("el-form-item",{attrs:{label:"合计商品总数："}},[t._v(" 1219 件 ")]),e("el-form-item",{attrs:{label:"合计采购金额："}},[t._v(" US$ 152,233,698.65 ")])],1)],1)]),e("el-card",{staticClass:"box-card",attrs:{shadow:"never"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("发货情况统计")])]),e("div",{staticStyle:{"margin-top":"-30px"}},[e("el-form",{attrs:{"label-position":"right","label-width":"120px"}},[e("el-form-item",{attrs:{label:"已发货商品数："}},[e("span",{staticClass:"tx-success"},[t._v("1212")]),t._v(" 件 ")]),e("el-form-item",{attrs:{label:"已发货商品额："}},[t._v(" US$ "),e("span",{staticClass:"tx-warning"},[t._v("212,963.99")])]),e("el-form-item",{attrs:{label:"未发货商品数："}},[e("span",{staticClass:"tx-warning"},[t._v("99")]),t._v(" 件 ")]),e("el-form-item",{attrs:{label:"未发货商品额："}},[t._v(" US$ "),e("span",{staticClass:"tx-warning"},[t._v("152,698.65")])]),e("el-form-item",{attrs:{label:"不发货商品数："}},[e("span",{staticClass:"tx-warning"},[t._v("12")]),t._v(" 件 ")]),e("el-form-item",{attrs:{label:"不发货商品额："}},[t._v(" US$ "),e("span",{staticClass:"tx-warning"},[t._v("96.78")])]),e("el-form-item",{attrs:{label:"发货率："}},[e("span",{staticClass:"tx-warning"},[t._v("21.6%")])])],1)],1)]),e("el-card",{staticClass:"box-card",attrs:{shadow:"never"}},[e("el-button",{attrs:{type:"primary",plain:""}},[t._v("导出到Excel")]),e("el-button",{attrs:{type:"success",plain:""}},[t._v("导出到Excel")])],1)],1)],1)],1)])},a=[],o=(i("14d9"),{name:"invoice",data(){return{previewTipOpen:!1,payUrl:"",paymentType:"",msgContent:"",drawer:!1,alreadySet:!1,isCollapse:!0,customerName:"",checked:!0,count:20,loading:!1,pageLoading:!1,tabActive:1,imageUrl:"",page:1,totalPage:1,rowsPerPage:50,totalCount:0,type:"all",invoiceInfo:"",invoiceData:[],firstLoading:!0,invoiceCnt:"",getListFlag:!0,relationship:[],showLogo:!1,logoUrl:"",shippingAmount:"",itemAmount:"",totalAmount:"",realAmount:"",discount:"",operateLog:[],totalPageLog:1,currentPageLog:1,pageSizeLog:20,currentPageDataLog:[],getLogFlag:!0,messages:[],currentmessages:[],msgpage:1,msgtotalPage:1,msgrowsPerPage:20,msgtotalCount:0,getMsgFlag:!0,pack:"",fileList:[],uniCode:this.$route.query.uniCode?this.$route.query.uniCode:"",preview:this.$route.query.preview?this.$route.query.preview:""}},computed:{noMore(){return this.invoiceData.length==Number(this.totalCount)&&!this.loading},disabled(){return this.loading||this.noMore}},watch:{noMore(){this.noMore&&(this.getOperateLog(this.invoiceInfo.id),this.getMessages(this.invoiceInfo.id))},customerName(){this.changeCustomerName()}},mounted(){this.getDataAll(),this.isCollapse=!0,this.$nextTick(()=>{this.handleScroll()}),1==this.preview?this.previewTipOpen=!0:this.previewTipOpen=!1},destroyed(){},components:{},methods:{handleScroll(){let t=this.$refs.myScrollbar.wrap;$(".invoice .el-container:first-child").offset().top,$(".invoice .el-container:first-child").outerHeight();t.onscroll=()=>{$(".el-popover").remove(),$(".el-scrollbar__wrap").scrollTop()+$(".el-scrollbar__wrap").height()>=$(".el-container:first-child").height()-10?this.noMore&&setTimeout(()=>{$(".page-footer-fixed").css("display","none")},300):setTimeout(()=>{$(".page-footer-fixed").css("display","block")},300),$(".el-scrollbar__wrap").scrollTop()+$(".el-scrollbar__wrap").height()>=$(".el-scrollbar__view").height()-100&&this.noMore&&setTimeout(()=>{this.operateLog.length?this.nextPage():this.getOperateLog(this.invoiceInfo.id),this.getMessages(this.invoiceInfo.id)},300)}},uploadSectionFile2(t){let e=t.file;const i=e.size/1024/1024<.5;i?this.$apiCall("api.User.uploadImg",{"@file":e},t=>{"9999"==t.ErrorCode?this.fileList.push({name:"test",url:t.Data.Results.imgUrl}):(this.pageLoading=!1,this.$elementMessage(t.Message,"error"))}):this.$message.error("上传图片大小不能超过 500kb!")},selectEmoji(t){console.log(t)},toFixed(t){if(t)return Number(t).toFixed(2)},onCopy(t){this.$elementMessage("已经成功复制到剪切板","success")},onError(t){this.$elementMessage("复制到剪切板失败，请手工复制","error")},load(){if(!this.invoiceInfo)return;let t=this.tabActive;this.getListFlag&&(this.page>this.totalPage||(this.loading=!0,this.getListFlag=!1,this.$apiCall("api.Invoice.getItemsByC",{uniCode:this.uniCode,invoiceId:this.invoiceInfo.id,type:this.type,page:this.page,rowsPerPage:this.rowsPerPage,preview:1==this.preview},e=>{if(this.getListFlag=!0,this.loading=!1,"9999"==e.ErrorCode){this.totalPage=e.Data.Pagination.totalPage,this.totalCount=e.Data.Pagination.totalCount,e.Data.Results.forEach((t,e)=>{this.invoiceData.push(t)}),this.page++;let i={data:this.invoiceData,page:this.page,totalPage:this.totalPage,totalCount:this.totalCount,loadAll:this.page>this.totalPage};1==t?sessionStorage.setItem("tabActiveAll",JSON.stringify(i)):2==t?sessionStorage.setItem("tabActiveSku",JSON.stringify(i)):3==t?sessionStorage.setItem("tabActiveNotBind",JSON.stringify(i)):4==t&&sessionStorage.setItem("tabActiveNotDeliver",JSON.stringify(i))}else this.$elementMessage(e.Message,"error")})))},getInvoiceData(t){this.invoiceData=[];let e=this.tabActive;this.$showLoading(),this.$apiCall("api.Invoice.getItemsByC",{uniCode:this.uniCode,invoiceId:t,type:this.type,page:this.page,rowsPerPage:this.rowsPerPage,preview:1==this.preview},t=>{if(this.$hideLoading(),"9999"==t.ErrorCode){this.totalPage=t.Data.Pagination.totalPage,this.totalCount=t.Data.Pagination.totalCount,1==this.totalPage&&(this.getOperateLog(this.invoiceInfo.id),this.getMessages(this.invoiceInfo.id)),t.Data.Results.forEach((t,e)=>{this.invoiceData.push(t)}),this.page++;let i={data:this.invoiceData,page:this.page,totalPage:this.totalPage,totalCount:this.totalCount,loadAll:this.page>this.totalPage};1==e?sessionStorage.setItem("tabActiveAll",JSON.stringify(i)):2==e?sessionStorage.setItem("tabActiveSku",JSON.stringify(i)):3==e?sessionStorage.setItem("tabActiveNotBind",JSON.stringify(i)):4==e&&sessionStorage.setItem("tabActiveNotDeliver",JSON.stringify(i))}else this.$elementMessage(t.Message,"error")})},getCnt(t){this.$apiCall("api.Invoice.getItemsCntByC",{uniCode:this.uniCode,invoiceId:t,preview:1==this.preview},t=>{"9999"==t.ErrorCode?this.invoiceCnt=t.Data.Results:this.$elementMessage(t.Message,"error")})},groupBy(t){for(var e={},i=[],s=0;s<t.length;s++){var a=t[s];if(e[a.date])for(var o=0;o<i.length;o++){var n=i[o];if(n.date==a.date){n.listInfo.push(a);break}}else i.push({date:a.date,listInfo:[a]}),e[a.date]=a}return i},getOperateLog(t){this.$apiCall("api.Invoice.getOperateLog",{invoiceId:t},t=>{"9999"==t.ErrorCode?(this.operateLog=t.Data.Results,this.$moment().locale("en"),this.operateLog.forEach(t=>{this.$set(t,"date",this.$moment(t.time).format("MMMM Do")),this.$set(t,"datetime",this.$moment(t.time).format("h:mm a"))}),this.totalPageLog=Math.ceil(this.operateLog.length/this.pageSizeLog),this.totalPageLog=0==this.totalPageLog?1:this.totalPageLog,this.setCurrentPageData()):this.$elementMessage(t.Message,"error")})},setCurrentPageData(){this.currentPageLog,this.pageSizeLog;let t=this.currentPageLog*this.pageSizeLog;this.currentPageDataLog=this.groupBy(this.operateLog.slice(0,t))},nextPage(){this.getLogFlag&&this.currentPageLog!=this.totalPageLog&&(this.getLogFlag=!1,this.currentPageLog++,this.setCurrentPageData(),this.getLogFlag=!0)},getMessages(t){this.getMsgFlag&&(this.msgpage>this.msgtotalPage||(this.getMsgFlag=!1,this.$apiCall("api.Invoice.getMessages",{invoiceId:t,page:this.msgpage,rowsPerPage:this.msgrowsPerPage},t=>{this.getMsgFlag=!0,"9999"==t.ErrorCode?(this.msgtotalPage=t.Data.Pagination.totalPage,this.msgtotalCount=t.Data.Pagination.totalCount,t.Data.Results.forEach((t,e)=>{this.messages.push(t)}),this.$moment().locale("en"),this.messages.forEach(t=>{this.$set(t,"date",this.$moment(t.timeCreated).format("MMMM Do")),this.$set(t,"datetime",this.$moment(t.timeCreated).format("h:mm a")),this.$set(t,"vname",t.vendorName.substr(0,1)),this.$set(t,"cname",t.customerName.substr(0,1))}),this.currentmessages=this.groupBy(this.messages),this.msgpage++):this.$elementMessage(t.Message,"error")})))},addMessage(){let t=[];this.fileList.length&&this.fileList.forEach(e=>{t.push(e.url)}),this.$apiCall("api.Invoice.addMessageByC",{uniCode:this.uniCode,invoiceId:this.invoiceInfo.id,content:this.msgContent,images:t},t=>{"9999"==t.ErrorCode?(this.msgContent="",this.fileList=[],this.msgpage=1,this.messages=[],this.$apiCall("api.Invoice.getMessages",{invoiceId:this.invoiceInfo.id,page:this.msgpage,rowsPerPage:this.msgrowsPerPage},t=>{"9999"==t.ErrorCode?(this.msgtotalPage=t.Data.Pagination.totalPage,this.msgtotalCount=t.Data.Pagination.totalCount,t.Data.Results.forEach((t,e)=>{this.messages.push(t)}),this.$moment().locale("en"),this.messages.forEach(t=>{this.$set(t,"date",this.$moment(t.timeCreated).format("MMMM Do")),this.$set(t,"datetime",this.$moment(t.timeCreated).format("h:mm a")),this.$set(t,"vname",t.vendorName.substr(0,1)),this.$set(t,"cname",t.customerName.substr(0,1))}),this.currentmessages=this.groupBy(this.messages),this.msgpage++):this.$elementMessage(t.Message,"error")})):this.$elementMessage(t.Message,"error")})},removeMsgImg(t){this.fileList.splice(t,1)},getDataAll(){this.showLogo=!1,this.logoUrl="",this.$apiCall("api.Invoice.getOneByC",{uniCode:this.uniCode,preview:1==this.preview},t=>{"9999"==t.ErrorCode?(this.invoiceInfo=t.Data.Results,document.title=`Invoice # ${this.invoiceInfo.code} - ${this.invoiceInfo.vendorName} - Ourmall ERP`,1==this.page&&this.getInvoiceData(this.invoiceInfo.id),this.invoiceInfo&&this.invoiceInfo.logo&&(this.showLogo=!0,this.logoUrl=this.invoiceInfo.logo),this.payUrl=this.invoiceInfo.payUrl?this.invoiceInfo.payUrl:"",this.paymentType=this.invoiceInfo.paymentType?this.invoiceInfo.paymentType:"",this.shippingAmount=this.invoiceInfo.shippingAmount?this.toFixed(this.invoiceInfo.shippingAmount):"0",this.itemAmount=this.invoiceInfo.itemAmount?this.toFixed(this.invoiceInfo.itemAmount):"0",this.totalAmount=this.invoiceInfo.totalAmount?this.toFixed(this.invoiceInfo.totalAmount):"0",this.realAmount=this.invoiceInfo.realAmount?this.toFixed(this.invoiceInfo.realAmount):"0"):this.$elementMessage(t.Message,"error")})},getData(){this.showLogo=!1,this.logoUrl="",this.$apiCall("api.Invoice.getOneByC",{uniCode:this.uniCode,preview:1==this.preview},t=>{"9999"==t.ErrorCode?(this.invoiceInfo=t.Data.Results,this.invoiceInfo.logo?(this.showLogo=!0,this.logoUrl=this.invoiceInfo.logo):(this.showLogo=!1,this.logoUrl=""),this.payUrl=this.invoiceInfo.payUrl?this.invoiceInfo.payUrl:"",this.paymentType=this.invoiceInfo.paymentType?this.invoiceInfo.paymentType:"",this.shippingAmount=this.invoiceInfo.shippingAmount?this.toFixed(this.invoiceInfo.shippingAmount):"0",this.itemAmount=this.invoiceInfo.itemAmount?this.toFixed(this.invoiceInfo.itemAmount):"0",this.totalAmount=this.invoiceInfo.totalAmount?this.toFixed(this.invoiceInfo.totalAmount):"0",this.realAmount=this.invoiceInfo.realAmount?this.toFixed(this.invoiceInfo.realAmount):"0"):this.$elementMessage(t.Message,"error")})},handleChange(t,e){this.$nextTick(()=>{this.$apiCall("api.Invoice.changeQuantityByC",{uniCode:this.uniCode,invoiceId:this.invoiceInfo.id,itemId:t.id,quantity:e,preview:1==this.preview},i=>{"9999"==i.ErrorCode?(this.itemAmount=i.Data.Results.itemAmount?this.toFixed(i.Data.Results.itemAmount):"0",this.totalAmount=i.Data.Results.totalAmount?this.toFixed(i.Data.Results.totalAmount):"0",this.realAmount=i.Data.Results.realAmount?this.toFixed(i.Data.Results.realAmount):"0",this.invoiceData.map(i=>{t.id==i.id&&(this.$set(i,"quantity",Number(e)),this.$set(i,"amount",(Number(i.quantity)*Number(i.price)).toFixed(2)))})):this.$elementMessage(i.Message,"error")})})},tableRowClassName({row:t,rowIndex:e}){return 0==this.invoiceData[e].quantity?"warning-row":""},getRowClass({row:t,column:e,rowIndex:i,columnIndex:s}){if(0===i)return 0==s?"padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;":3==s?"padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;":"text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;"},cellStyle({row:t,column:e,rowIndex:i,columnIndex:s}){return 0===s?"padding-left:10px;text-align:left;":2==s||3==s?"padding-right:10px;text-align:right;":"text-align:center;"}}}),n=o,l=(i("9e6a"),i("2877")),r=Object(l["a"])(n,s,a,!1,null,"291844b2",null);e["default"]=r.exports},eb06:function(t,e,i){}}]);