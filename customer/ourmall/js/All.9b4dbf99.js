(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["All"],{1039:function(e,t,i){},"2d10":function(e,t,i){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",[e.item.shippingJson?t("el-popover",{attrs:{"popper-class":"customer-popover",placement:"bottom",width:"600",trigger:"hover"}},[2==e.type?t("span",{staticStyle:{cursor:"pointer"},attrs:{slot:"reference"},slot:"reference"},[t("span",[e._v(e._s(e.item.codeName||""))]),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]):t("span",{staticClass:"d-flex",staticStyle:{cursor:"pointer"},attrs:{slot:"reference"},slot:"reference"},["mini"==e.size?t("span",[t("i",{staticClass:"el-icon-user-solid",staticStyle:{color:"#909399"}})]):t("span",{staticClass:"tx-ellipsis1",staticStyle:{display:"inline-block","max-width":"160px","font-size":"12px"}},[e._v(e._s(e.item.shippingJson.name||""))]),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t("div",{staticClass:"title"},[t("div",{staticClass:"left"},[e._v("Shopify Order "+e._s(e.item.codeName))]),e.item.timeCreated?t("div",{staticClass:"right"},[t("span",[e._v("Order Date: ")]),e._v(" "+e._s(e.moment(e.item.timeCreated).format("ll [at] LTS"))+" ")]):e._e()]),t("div",{staticClass:"mg-y-15 mg-t-20 pd-x-20"},[t("div",{staticClass:"title2"},[e._v("Shipping address")]),t("div",{staticClass:"info"},[t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("Customer")]),e._v(" "+e._s(e.item.shippingJson.name||"---")+" "),e.item.shippingJson.name?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.name,expression:"item.shippingJson.name",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)]),t("div",{staticClass:"info-row",style:{marginBottom:e.item.shippingJson.country?"0":"10px"}},[t("div",[t("span",[e._v("Address")]),e._v(" "+e._s(e.item.shippingJson.zip||"")+" "+e._s(e.item.shippingJson.address1||"")+" "+e._s(e.item.shippingJson.city||"")+" "+e._s(e.item.shippingJson.province||"")+" "),e.item.shippingJson.address1?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:`${e.item.shippingJson.zip||""} ${e.item.shippingJson.address1||""}  ${e.item.shippingJson.city||""}  ${e.item.shippingJson.province||""} ${e.item.shippingJson.country||""}`,expression:"`${item.shippingJson.zip || ''} ${item.shippingJson.address1 || ''}  ${item.shippingJson.city ||  ''}  ${item.shippingJson.province || ''} ${item.shippingJson.country || ''}`",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)]),e.item.shippingJson.country?t("div",{staticClass:"info-row"},[t("div",[t("span"),e._v(" "+e._s(e.item.shippingJson.country))])]):e._e(),t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("Apartment, sulte, etc.")]),e._v(" "+e._s(e.item.shippingJson.address2||"---")+" "),e.item.shippingJson.address2?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.address2,expression:"item.shippingJson.address2",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)]),t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("City")]),e._v(" "+e._s(e.item.shippingJson.city||"---")+" "),e.item.shippingJson.city?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.city,expression:"item.shippingJson.city",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1),t("div",[t("span",[e._v("State")]),e._v(" "+e._s(e.item.shippingJson.province||"---")+" "),e.item.shippingJson.province?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.province,expression:"item.shippingJson.province",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)]),t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("Country")]),e._v(" "+e._s(e.item.shippingJson.country||"---")+" "),e.item.shippingJson.country?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.country,expression:"item.shippingJson.country",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1),t("div",[t("span",[e._v("Zipcode")]),e._v(" "+e._s(e.item.shippingJson.zip||"---")+" "),e.item.shippingJson.zip?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.zip,expression:"item.shippingJson.zip",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)])]),t("div",{staticClass:"title2"},[e._v("Contact Information")]),t("div",{staticClass:"info"},[t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("Phone number")]),e._v(" "+e._s(e.item.shippingJson.phone||"---")+" "),e.item.shippingJson.phone?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.shippingJson.phone,expression:"item.shippingJson.phone",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)]),t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("Email")]),e._v(" "+e._s(e.item.email||"---")+" "),e.item.email?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.email,expression:"item.email",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)])]),e.item.ioss?[t("div",{staticClass:"title2"},[e._v("IOSS Information")]),t("div",{staticClass:"info"},[t("div",{staticClass:"info-row"},[t("div",[t("span",[e._v("IOSS Id")]),e._v(" "+e._s(e.item.ioss)+" ")])])])]:e._e(),e.item.note?[t("div",{staticClass:"title2"},[e._v("Notes")]),t("div",{staticClass:"info"},[t("div",{staticClass:"info-row"},[t("div",{staticStyle:{"word-break":"break-all"}},[t("span",[e._v("Notes")]),e._v(" "+e._s(e.item.note)+" "),e.item.note?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"copy",placement:"right"}},[t("el-button",{attrs:{size:"mini",type:"text"}},[t("i",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.item.note,expression:"item.note",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"el-icon-document-copy"})])],1):e._e()],1)])])]:e._e()],2)]):t("span",[e._v("---")]),e.item.note&&e.isicon?t("span",{staticClass:"mg-l-5"},[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.item.note,placement:"top"}},[t("i",{staticClass:"el-icon-info",staticStyle:{"font-size":"12px",width:"12px",color:"#5c6ac4"}})])],1):e._e()],1)},s=[],r={props:["item","type","size","isicon"],methods:{onCopy(e){this.$emit("onCopy",e)},onError(e){this.$emit("onError",e)}}},o=r,l=(i("76ff"),i("e607")),n=Object(l["a"])(o,a,s,!1,null,"1df2d8d3",null);t["a"]=n.exports},"340e":function(e,t,i){e.exports=i.p+"img/shopify_icon.862d4ffa.png"},3550:function(e,t,i){"use strict";i("1039")},4582:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:e.loading,expression:"loading",modifiers:{fullscreen:!0}}],attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[t("div",{ref:"tablefilter"},[t("div",{staticClass:"d-flex",staticStyle:{"margin-bottom":"5px","justify-content":"space-between","flex-wrap":"wrap"}},[t("div",{staticClass:"left d-flex",staticStyle:{margin:"10px"}},[t("div",{staticClass:"mg-r-10"},[t("el-input",{staticStyle:{width:"190px"},attrs:{size:"mini",placeholder:"Order ID"},on:{clear:function(t){return e.clearFilter("name")}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterItems("name")}},model:{value:e.codeName,callback:function(t){e.codeName=t},expression:"codeName"}},[t("template",{slot:"prepend"},[e._v("#")])],2)],1),t("div",{staticClass:"mg-r-10"},[t("el-button-group",{staticStyle:{"min-width":"658px",height:"28px"}},[t("el-cascader",{key:e.cascaderKey,attrs:{size:"mini",placeholder:"All my stores",options:e.options,props:{expandTrigger:"hover"}},on:{change:function(t){return e.filterItems("store")}},model:{value:e.filterParams.shopifyStore,callback:function(t){e.$set(e.filterParams,"shopifyStore",t)},expression:"filterParams.shopifyStore"}}),t("el-popover",{attrs:{placement:"bottom",title:"",trigger:"click","popper-class":"d-block"},model:{value:e.popDateFilter,callback:function(t){e.popDateFilter=t},expression:"popDateFilter"}},[t("el-radio-group",{staticStyle:{"max-height":"200px"},on:{change:function(t){return e.filterItems("date")}},model:{value:e.filterParams.timeFilter,callback:function(t){e.$set(e.filterParams,"timeFilter",t)},expression:"filterParams.timeFilter"}},e._l(e.dateArr,(function(i,a){return t("el-radio",{key:a,attrs:{label:a}},[e._v(e._s(i))])})),1),6==e.filterParams.timeFilter?t("div",[t("el-date-picker",{attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":"Start","end-placeholder":"End"},on:{change:e.dateChange},model:{value:e.filterDate,callback:function(t){e.filterDate=t},expression:"filterDate"}})],1):e._e(),t("div",{staticClass:"d-flex justify-content-end"},[t("el-link",{attrs:{type:"danger",disabled:!e.filterParams.timeFilter},on:{click:function(t){return e.clearFilter("date")}}},[e._v("Clear")])],1),t("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v("Date Ranges"),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})])],1),t("el-popover",{attrs:{placement:"bottom",title:"",trigger:"click","popper-class":"d-block"},model:{value:e.popPaymentFilter,callback:function(t){e.popPaymentFilter=t},expression:"popPaymentFilter"}},[t("el-checkbox-group",{staticStyle:{"max-height":"200px"},on:{change:function(t){return e.filterItems("financial")}},model:{value:e.filterParams.financial_status,callback:function(t){e.$set(e.filterParams,"financial_status",t)},expression:"filterParams.financial_status"}},e._l(e.paymentArr,(function(i,a){return t("el-checkbox",{key:a,attrs:{label:a}},[e._v(e._s(i.text))])})),1),t("div",{staticClass:"d-flex justify-content-end"},[t("el-link",{attrs:{type:"danger",disabled:!e.filterParams.financial_status.length},on:{click:function(t){return e.clearFilter("financial")}}},[e._v("Clear")])],1),t("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v("Payment Status"),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})])],1),t("el-popover",{attrs:{placement:"bottom",title:"",trigger:"click","popper-class":"d-block"},model:{value:e.popFulfillFilter,callback:function(t){e.popFulfillFilter=t},expression:"popFulfillFilter"}},[t("el-checkbox-group",{staticStyle:{"max-height":"200px"},on:{change:function(t){return e.filterItems("fulfill")}},model:{value:e.filterParams.fulfillStatus,callback:function(t){e.$set(e.filterParams,"fulfillStatus",t)},expression:"filterParams.fulfillStatus"}},e._l(e.fulfillArr,(function(i,a){return t("el-checkbox",{key:a,attrs:{label:a}},[e._v(e._s(i.text))])})),1),t("div",{staticClass:"d-flex justify-content-end"},[t("el-link",{attrs:{type:"danger",disabled:!e.filterParams.fulfillStatus.length},on:{click:function(t){return e.clearFilter("fulfill")}}},[e._v("Clear")])],1),t("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v("Fulfillment Status"),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})])],1),t("el-popover",{attrs:{placement:"bottom",title:"",trigger:"click","popper-class":"d-block"},model:{value:e.popSortFilter,callback:function(t){e.popSortFilter=t},expression:"popSortFilter"}},[t("el-radio-group",{staticStyle:{"max-height":"200px"},on:{change:function(t){return e.filterItems("sort")}},model:{value:e.filterParams.sortBy,callback:function(t){e.$set(e.filterParams,"sortBy",t)},expression:"filterParams.sortBy"}},e._l(e.sortArr,(function(i,a){return t("el-radio",{key:a,attrs:{label:a}},[e._v(e._s(i))])})),1),t("div",{staticClass:"d-flex justify-content-end"},[t("el-link",{attrs:{type:"danger",disabled:!e.filterParams.sortBy},on:{click:function(t){return e.clearFilter("sort")}}},[e._v("Clear")])],1),t("el-button",{attrs:{slot:"reference",size:"mini"},slot:"reference"},[e._v("SortBy"),t("i",{staticClass:"el-icon-caret-bottom el-icon--right"})])],1)],1)],1),t("div",{staticStyle:{"min-width":"130px"}},[t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.filterItems()}}},[e._v("Filter")]),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.clearFilter()}}},[e._v("Clear")])],1)]),t("div",{staticClass:"right",staticStyle:{margin:"10px"}},["AbnormalOrder"==e.routerName?t("el-button",{attrs:{type:"primary",size:"mini",disabled:!e.checkedOrder.length},on:{click:e.exportDialogOpen}},[t("i",{staticClass:"fa fa-download"}),e._v(" Export ("+e._s(e.checkedOrder.length)+")")]):e._e()],1)]),t("div",[e.filterParams.codeName?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("name")}}},[e._v("#"+e._s(e.filterParams.codeName))]):e._e(),e.filterParams.shopifyStore.length?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("store")}}},[e._v(e._s(e.shopifyStoreName))]):e._e(),e.filterParams.timeFilter?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("date")}}},[e._v(" "+e._s(e.dateArr[e.filterParams.timeFilter])+" "),6==e.filterParams.timeFilter&&e.filterDate.length?t("span",[e._v(" "+e._s(e.filterDate[0])+"--"+e._s(e.filterDate[1])+" ")]):e._e()]):e._e(),e.filterParams.financial_status.length?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("financial")}}},[e._v(" "+e._s(e.paymentFilterText)+" ")]):e._e(),e.filterParams.fulfillStatus.length?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("fulfill")}}},[e._v(" "+e._s(e.fulfilledFilterText)+" ")]):e._e(),e.filterParams.sortBy?t("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("sort")}}},[e._v(e._s(e.sortArr[e.filterParams.sortBy]))]):e._e()],1)]),e.showTable?t("div",{staticClass:"table-wrap"},[t("el-table",{ref:"gridTable",attrs:{data:e.tableData,stripe:""}},["AbnormalOrder"==e.routerName?t("el-table-column",{attrs:{width:"40",fixed:""},scopedSlots:e._u([{key:"header",fn:function(i){return[t("el-checkbox",{on:{change:e.changeAllChecked},model:{value:e.AllChecked,callback:function(t){e.AllChecked=t},expression:"AllChecked"}})]}},{key:"default",fn:function(i){return[t("el-checkbox",{model:{value:i.row.checked,callback:function(t){e.$set(i.row,"checked",t)},expression:"scope.row.checked"}})]}}],null,!1,2658817189)}):e._e(),t("el-table-column",{attrs:{label:"Order",prop:"codeName",width:"150",fixed:""},scopedSlots:e._u([{key:"default",fn:function({row:i}){return[e._v(" "+e._s(i.codeName)+" "),i.note?t("span",{staticClass:"mg-l-5"},[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.note,placement:"top"}},[t("i",{staticClass:"el-icon-info",staticStyle:{"font-size":"12px",width:"12px",color:"#5c6ac4"}})])],1):e._e()]}}],null,!1,1121865220)}),t("el-table-column",{attrs:{label:"My Store",prop:"store",width:"200"},scopedSlots:e._u([{key:"default",fn:function(i){return[t("span",[t("shopCate",{attrs:{items:i.row}}),e._v(" "+e._s(i.row.store)+" ")],1)]}}],null,!1,1456384870)}),t("el-table-column",{attrs:{label:"Date",prop:"timeCreated",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.moment(t.row.timeCreated).format("ll [at] LTS"))+" ")]}}],null,!1,3284638925)}),t("el-table-column",{attrs:{label:"Customer",width:"250"},scopedSlots:e._u([{key:"default",fn:function(i){return[t("popShippingJson",{attrs:{item:i.row},on:{onCopy:e.onCopy,onError:e.onError}})]}}],null,!1,291841290)}),t("el-table-column",{attrs:{width:"120"},scopedSlots:e._u([{key:"header",fn:function(i){return[t("div",{staticClass:"tx-right"},[e._v("Total")])]}},{key:"default",fn:function(i){return[t("div",{staticClass:"tx-right"},[i.row.currency?t("span",[e._v(e._s(e.ce[i.row.currency]?e.ce[i.row.currency].symbol:i.row.currency)+" ")]):e._e(),e._v(" "+e._s(i.row.totalPrice)+" ")])]}}],null,!1,2665083286)}),t("el-table-column",{attrs:{label:"Payment",width:"170"},scopedSlots:e._u([{key:"default",fn:function(i){return[i.row.financialStatus&&"voided"!=i.row.financialStatus?t("el-tag",{attrs:{size:"small",type:e.paymentArr[i.row.financialStatus].type}},[t("span",{staticClass:"-EFlq",class:"bg"+e.paymentArr[i.row.financialStatus].r}),e._v(" "+e._s(e.paymentArr[i.row.financialStatus].text)+" ")]):e._e()]}}],null,!1,2754439836)}),t("el-table-column",{attrs:{label:"Fulfillment",width:"150"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("fulfillMentStatusTag",{attrs:{fulfillmentStatus:e.row.fulfillmentStatus}})]}}],null,!1,4216136717)}),t("el-table-column",{attrs:{label:"Items"},scopedSlots:e._u([{key:"default",fn:function(i){return[i.row.items?t("popItems",{attrs:{items:i.row.items,fulfillmentStatus:i.row.fulfillmentStatus}}):e._e()]}}],null,!1,232419951)}),"AbnormalOrder"==e.routerName?t("el-table-column",{attrs:{label:"Abnormal reason",width:"180"},scopedSlots:e._u([{key:"default",fn:function(i){return[t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:i.row.reason,placement:"bottom-end","popper-class":"reason-tip"}},[t("div",{staticClass:"tx-ellipsis1",staticStyle:{width:"165px",cursor:"default"}},[e._v(" "+e._s(i.row.reason)+" ")])])]}}],null,!1,307847036)}):e._e()],1)],1):e._e(),t("div",{ref:"tableFooter"},[e.tableData.length?t("el-row",{attrs:{gutter:20}},[t("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[t("div",{staticStyle:{position:"relative",top:"10px"}},[t("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSize,"page-size":e.rowsPerPage,total:Number(e.totalCount)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e()],1),t("el-dialog",{attrs:{title:"Export",width:"620px","close-on-click-modal":!1,visible:e.exportDialog.isShow},on:{"update:visible":function(t){return e.$set(e.exportDialog,"isShow",t)}}},[t("el-divider"),t("div",{staticStyle:{padding:"20px"}},[t("p",{staticClass:"mg-b-10"},[e._v("Export to "+e._s(e.$store.state.userInfo.email))]),t("p",{staticClass:"mg-b-10"},[e._v("Selected: "),t("b",[e._v(e._s(e.checkedOrder.length))]),e._v(" orders")])]),t("el-divider"),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:function(t){e.exportDialog.isShow=!1}}},[e._v("Cancel")]),t("el-button",{attrs:{size:"small",type:"primary",loading:e.exportDialog.loading},on:{click:e.exportOrders}},[e._v("Export orders")])],1)],1),t("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},s=[],r=(i("149f"),i("e98b")),o=i("6b2f"),l=i("2d10"),n=i("716a"),c={props:["fulfillArr"],data(){return{options:[{id:1,label:"Shopify",children:[]},{id:2,label:"Woocommerce",children:[]},{id:3,label:"Lazada",children:[]},{id:4,label:"Shopee",children:[]}],cascaderKey:1,showTable:!1,routerName:this.$route.name,loading:!1,tableHeight:400,isAllExpand:!0,tableData:[],pageSize:[20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_allOrdersRowsPerPage")?Number(localStorage.getItem("c_allOrdersRowsPerPage")):20,totalCount:0,totalPage:0,ce:this.$CE,isManage:1,codeName:"",filterParams:{codeName:"",shopifyStore:[],fulfillStatus:[],timeFilter:"",dateFrom:"",dateTo:"",sortBy:"",financial_status:[]},filterParamsDefault:"{}",AllChecked:!1,storeList:[],shopifyStoreName:"",popStoreFilter:!1,popFulfillFilter:!1,popDateFilter:!1,popSortFilter:!1,popPaymentFilter:!1,filterDate:[],dateArr:{1:"Today",2:"Last 7 days",3:"Last 30 days",4:"Last 90 days",5:"Last 12 months",6:"Custom"},sortArr:{1:"Order number (ascending)",2:"Order number (descending)",3:"Date (oldest first)",4:"Date (newest first)"},paymentArr:{paid:{text:"Paid",type:"info",r:3},partially_refunded:{text:"Partially refunded",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}},exportDialog:{isShow:!1,loading:!1},exportDialogDefault:"{}",keyTimeout:0}},components:{fulfillMentStatusTag:r["a"],popItems:o["a"],popShippingJson:l["a"],shopCate:n["a"]},mounted(){this.exportDialogDefault=JSON.stringify(this.exportDialog),this.filterParamsDefault=JSON.stringify(this.filterParams),this.$nextTick(()=>{this.getItems(),this.getStore()})},computed:{checkedOrder(){return this.tableData.filter(e=>e.checked)},CAllChecked(){let e=0;return this.tableData.forEach(t=>{t.checked&&e++}),e&&e==this.tableData.length},paymentFilterText(){let e=[];return this.filterParams.financial_status.length?(Object.keys(this.paymentArr).forEach(t=>{this.filterParams.financial_status.forEach(i=>{i==t&&e.push(this.paymentArr[t].text)})}),e.join(", ")):""},fulfilledFilterText(){let e=[];return this.filterParams.fulfillStatus.length?(Object.keys(this.fulfillArr).forEach(t=>{this.filterParams.fulfillStatus.forEach(i=>{i==t&&e.push(this.fulfillArr[t].text)})}),e.join(", ")):""}},watch:{"$route.name"(){this.showTable=!1,this.routerName=this.$route.name},$route:"gotoPage",CAllChecked(){this.AllChecked=this.CAllChecked},"filterParams.shopifyStore"(){if(!this.filterParams.shopifyStore.length)return;let e=[];this.filterParams.shopifyStore.forEach(t=>{this.storeList.forEach(i=>{t==i.shopifyAccountId&&e.push(i.store)})}),this.shopifyStoreName=e.join(",")}},methods:{exportOrders(){this.exportDialog.loading=!0;let e=this.checkedOrder.map(e=>e.id);this.$apiCall("api.Invoice.exportShopifyOrders",{email:this.$store.state.userInfo.email,orderIds:e,byAbnormal:1},e=>{"9999"==e.ErrorCode?(this.tableData.forEach(e=>{e.checked=!1}),this.exportDialog.isShow=!1,this.$message({offset:200,duration:0,dangerouslyUseHTMLString:!0,showClose:!0,message:`<strong>Your Orders are exporting</strong><br/>Your export will be delivered by email to: ${this.$store.state.userInfo.email}. <br/>Depending on how many Orders you’re exporting, this could take some time.`,type:"success"})):this.$elementMessage(e.Message,"error")})},exportDialogOpen(){this.exportDialog=JSON.parse(this.exportDialogDefault),this.exportDialog.isShow=!0},changeAllChecked(){this.tableData.forEach(e=>{this.$set(e,"checked",this.AllChecked)})},dateChange(){this.filterDate.length>1&&(this.filterParams.dateFrom=moment(this.filterDate[0]).unix(),this.filterParams.dateTo=moment(this.filterDate[1]).endOf("d").unix(),1==this.$route.query.page?this.getItems():this.$router.push({query:{page:1}}))},clearFilter(e){switch(e){case"name":this.filterParams.codeName=this.codeName="";break;case"store":this.filterParams.shopifyStore=[],this.popStoreFilter=!1,++this.cascaderKey;break;case"date":this.filterParams.timeFilter="",this.filterDate=[],this.filterParams.dateFrom="",this.filterParams.dateTo="",this.popDateFilter=!1;break;case"fulfill":this.filterParams.fulfillStatus=[],this.popFulfillFilter=!1;break;case"sort":this.filterParams.sortBy="",this.popSortFilter=!1;break;case"financial":this.filterParams.financial_status=[],this.popPaymentFilter=!1;break;default:this.filterParams=JSON.parse(this.filterParamsDefault),this.codeName="",this.filterDate=[]}1==this.$route.query.page?this.getItems():this.$router.push({query:{page:1}})},filterItems(e){switch(e){case"name":this.filterParams.codeName=this.codeName;break;case"date":this.filterDate=[],this.filterParams.dateFrom="",this.filterParams.dateTo="";break;default:this.filterParams.codeName=this.codeName;break}1==this.$route.query.page?this.getItems():this.$router.push({query:{page:1}})},getItems(e){this.loading=!0;let t=[];this.filterParams.shopifyStore[1]&&t.push(this.filterParams.shopifyStore[1]);let i={page:this.page,rowsPerPage:this.rowsPerPage,accountIds:t,timeFilter:this.filterParams.timeFilter>=6?"":this.filterParams.timeFilter,dateFrom:this.filterParams.dateFrom,dateTo:this.filterParams.dateTo,fulfillmentStatus:this.filterParams.fulfillStatus,sort:this.filterParams.sortBy,keywords:this.filterParams.codeName,financialStatus:this.filterParams.financial_status},a="api.Invoice.shopifyOrders";"AbnormalOrder"==this.routerName?(a="api.Invoice.getAbnormalShopifyOrder",i.codeName=this.filterParams.codeName):(i.isAll=1,i.keywords=this.filterParams.codeName),this.$apiCall(a,i,t=>{this.showTable=!0,this.loading=!1,"9999"==t.ErrorCode?(this.totalPage=t.Data.Pagination.totalPage,this.totalCount=t.Data.Pagination.totalCount,this.tableData=t.Data.Results.map(e=>(e.shippingJson&&(e.shippingJson=JSON.parse(e.shippingJson)),e.checked=!1,e.reason=[],e.items.forEach(t=>{t.reason&&e.reason.push(t.reason)}),e.reason=Array.from(new Set(e.reason)).join(", "),e)),!e&&this.$refs.gridTable&&(this.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0)):this.$elementMessage(t.Message,"error")})},toPage(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize(e){this.rowsPerPage=e,localStorage.setItem("c_allOrdersRowsPerPage",e),this.getItems()},gotoPage(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItems()},getStore(){this.$apiCall("api.Invoice.findStores",{authStatus:1},e=>{9999==e.ErrorCode?(this.storeList=[],e.Data.Results.forEach(e=>{this.storeList.push({shopifyAccountId:e.id,store:e.shopName})}),this.options.map(t=>{e.Data.Results.filter(e=>{e.platform==t.id&&t.children.push({label:e.shopName,value:e.id})})})):this.$message({message:e.Message,type:"error"})})},onCopy(e){this.$elementMessage("Has been copied to the clipboard","success")},onError(e){this.$elementMessage("Copy to clipboard failed, please copy manually","error")}}},p=c,m=(i("a0e4"),i("e607")),d=Object(m["a"])(p,a,s,!1,null,"0c1264f0",null);t["default"]=d.exports},"4d6b":function(e,t,i){e.exports=i.p+"img/lazada_icon.895bb3eb.png"},6247:function(e,t,i){},"6b2f":function(e,t,i){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",[e.items&&e.items.length?t("el-popover",{attrs:{placement:"right-start",trigger:"hover",width:"400"}},[t("div",{staticClass:"pop-sku"},e._l(e.items,(function(i,a){return t("div",{key:i.id,style:{borderBottom:e.items.length-1!=a?"1px #EBEEF5 solid":"none"}},[t("div",{staticClass:"image-wrap"},[t("el-image",{staticStyle:{"min-width":"50px",width:"50px",height:"50px"},attrs:{src:i.imgUrl,fit:"contain"}},[t("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[t("i",{staticClass:"el-icon-picture-outline",staticStyle:{color:"#C0C4CC","font-size":"20px"}})])]),t("i",[e._v(e._s(i.quantity))])],1),t("div",{staticClass:"info"},[t("div",{staticClass:"mg-b-10"},[t("fulfillMentStatusTag",{attrs:{fulfillmentStatus:i.fulfillmentStatus}})],1),t("div",{staticClass:"tx-ellipsis2",staticStyle:{"word-break":"normal"}},[e._v(e._s(i.name))]),t("div",[e._v(e._s(i.propertyValue))]),i.customerProperties.length?e._l(i.customerProperties,(function(i){return t("div",[t("span",{staticStyle:{"margin-right":"5px",color:"#909399"}},[e._v(e._s(i.name))]),e._v(" "+e._s(i.value)+" ")])})):e._e(),t("div",[t("span",{staticStyle:{"margin-right":"5px",color:"#909399"}},[e._v("SKU")]),e._v(" "+e._s(i.sku)+" ")]),"WaitingForSourcing"==e.$route.name&&1==i.onlyOne?t("el-tooltip",{attrs:{placement:"top"}},[t("div",{attrs:{slot:"content"},slot:"content"},[t("el-image",{staticStyle:{width:"335px",height:"270px"},attrs:{src:"images/popitem-onlyone.png","preview-src-list":["images/popitem-onlyone.png"]}})],1),t("div",{staticStyle:{color:"#E6A23C","font-size":"12px"}},[e._v(" Need to be allocated to vendor after this purchase order "),t("i",{staticClass:"el-icon-question"})])]):e._e()],2)])})),0),t("span",{staticStyle:{display:"inline-block",cursor:"pointer"},attrs:{slot:"reference"},slot:"reference"},[t("span",[e._v(e._s(e.items.length)+" Items")]),e.items.length?t("i",{staticClass:"el-icon-caret-bottom"}):e._e()])]):e._e()],1)},s=[],r=i("e98b"),o={props:["items","fulfillmentStatus"],components:{fulfillMentStatusTag:r["a"]}},l=o,n=(i("3550"),i("e607")),c=Object(n["a"])(l,a,s,!1,null,"0fc2cdfe",null);t["a"]=c.exports},"716a":function(e,t,i){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"shop"},[1==e.items.platform?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Shopify",placement:"left"}},[t("img",{staticClass:"shopImg",attrs:{src:i("340e")}})]):2==e.items.platform?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Woocommerce",placement:"left"}},[t("img",{staticClass:"shopImg",attrs:{src:i("7e46")}})]):3==e.items.platform?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Lazada",placement:"left"}},[t("img",{staticClass:"shopImg",attrs:{src:i("4d6b")}})]):4==e.items.platform?t("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Shopee",placement:"left"}},[t("img",{staticClass:"shopImg",attrs:{src:i("e74a")}})]):e._e()],1)},s=[],r={props:["items"],data(){return{}},methods:{},components:{}},o=r,l=(i("c33f"),i("e607")),n=Object(l["a"])(o,a,s,!1,null,"7d79ad08",null);t["a"]=n.exports},"76ff":function(e,t,i){"use strict";i("f8db")},"7e46":function(e,t,i){e.exports=i.p+"img/woo_icon.bbaca118.png"},"98b7":function(e,t,i){},a0e4:function(e,t,i){"use strict";i("98b7")},c33f:function(e,t,i){"use strict";i("6247")},c93a:function(e,t,i){"use strict";i("e5bf")},e5bf:function(e,t,i){},e74a:function(e,t,i){e.exports=i.p+"img/shopee_icon.c6765767.png"},e98b:function(e,t,i){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",[e.fulfillmentStatus?t("el-tag",{staticClass:"shopfiy-status",attrs:{size:"small",type:e.fulfillArr[e.fulfillmentStatus].type}},[t("span",{staticClass:"-EFlq",class:"bg"+e.fulfillArr[e.fulfillmentStatus].r}),e._v(" "+e._s(e.fulfillArr[e.fulfillmentStatus].text)+" ")]):t("el-tag",{attrs:{size:"small",type:"warning"}},[t("span",{staticClass:"-EFlq bg1"}),e._v(" Unfulfilled ")])],1)},s=[],r={props:["fulfillmentStatus"],data(){return{fulfillArr:{fulfilled:{text:"Fulfilled",type:"info",r:3},unfulfilled:{text:"Unfulfilled",type:"warning",r:1},partial:{text:"Partially Fulfilled",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}}}}},o=r,l=(i("c93a"),i("e607")),n=Object(l["a"])(o,a,s,!1,null,"d93044ba",null);t["a"]=n.exports},f8db:function(e,t,i){}}]);
//# sourceMappingURL=All.9b4dbf99.js.map