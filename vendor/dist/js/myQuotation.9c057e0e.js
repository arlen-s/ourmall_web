(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["myQuotation"],{"0a20":function(t,e,a){"use strict";a("1a38")},"1a38":function(t,e,a){},"480c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel my-custom-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-baojiadan"}),a("h2",[t._v(t._s(t.$t("quotation.我的报价单")))])])]),a("div",{staticClass:"right"})]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-input",{staticStyle:{width:"120px"},attrs:{placeholder:t.$t("quotation.编号"),clearable:""},on:{clear:function(e){return t.clearFilter("code")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.filterParams.code,callback:function(e){t.$set(t.filterParams,"code",e)},expression:"filterParams.code"}})],1),a("el-form-item",[a("el-select",{attrs:{filterable:"",remote:"","remote-method":t.remoteMethodCustom,loading:t.selectLoading,placeholder:t.$t("myinvoice.pleaseCusName"),clearable:""},on:{change:function(e){return t.filterItem("cust")},clear:t.close},model:{value:t.filterParams.customer,callback:function(e){t.$set(t.filterParams,"customer",e)},expression:"filterParams.customer"}},t._l(t.selectArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.customerName,value:t.customerName}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("quotation.状态：")}},[a("el-select",{staticStyle:{width:"120px"},attrs:{filterable:"",clearable:"",placeholder:t.$t("quotation.请选择状态")},on:{change:function(e){return t.filterItem()}},model:{value:t.filterParams.status,callback:function(e){t.$set(t.filterParams,"status",e)},expression:"filterParams.status"}},[a("el-option",{attrs:{label:"ALL",value:""}}),a("el-option",{attrs:{label:t.$t("quotation.待报价"),value:"1"}}),a("el-option",{attrs:{label:t.$t("quotation.报价中"),value:"2"}}),a("el-option",{attrs:{label:t.$t("quotation.已报价"),value:"3"}}),a("el-option",{attrs:{label:t.$t("quotation.作废单"),value:"9"}})],1)],1),a("el-form-item",{attrs:{label:t.$t("quotation.创建日期：")}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","range-separator":t.$t("myinvoice.to"),"start-placeholder":t.$t("myinvoice.startDate"),"end-placeholder":t.$t("myinvoice.endDate")},on:{clear:function(e){return t.clearFilter("date")},change:t.dateChange},model:{value:t.filterParams.date,callback:function(e){t.$set(t.filterParams,"date",e)},expression:"filterParams.date"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.filterItem}},[t._v(t._s(t.$t("mycustomer.filter")))]),a("el-button",{attrs:{type:"danger"},on:{click:t.clearFilter}},[t._v(t._s(t.$t("mycustomer.clear")))])],1)],1)],1)])],1),a("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{data:t.items,stripe:"","row-key":"id"}},[a("el-table-column",{attrs:{label:t.$t("quotation.编号"),prop:"code"}}),a("el-table-column",{attrs:{label:t.$t("quotation.状态")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(1==e.row.status&&t.$t("quotation.待报价")||2==e.row.status&&t.$t("quotation.报价中")||3==e.row.status&&t.$t("quotation.已报价")||4==e.row.status&&t.$t("quotation.作废单")||t.$t("quotation.作废单"))+" "),2==e.row.status||3==e.row.status?a("span",[t._v("（ "+t._s(1==e.row.vendorStatus&&t.$t("quotation.待报价")||2==e.row.vendorStatus&&t.$t("quotation.报价中")||3==e.row.vendorStatus&&t.$t("quotation.待审核")||4==e.row.vendorStatus&&t.$t("quotation.已采纳")||9==e.row.vendorStatus&&t.$t("quotation.未采纳")||t.$t("quotation.无效"))+" ）")]):t._e()]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.报价单类型")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(1==e.row.type?t.$t("quotation.订单报价单"):t.$t("quotation.商品报价单"))+" ")]}}])}),1!=t.filterParams.type?[a("el-table-column",{attrs:{label:t.$t("quotation.客户")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.customerName)+" ")]}}],null,!1,4129509950)})]:[a("el-table-column",{attrs:{label:t.$t("quotation.shopify店铺")},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.accounts?t._l(e.row.accounts,(function(e){return a("div",{key:e.id},[t._v(" "+t._s(e)+" ")])})):void 0}}],null,!0)}),a("el-table-column",{attrs:{label:t.$t("quotation.shopify订单"),prop:"orderCnt"}}),a("el-table-column",{attrs:{label:t.$t("quotation.订单金额"),prop:"totalPrice"}})],a("el-table-column",{attrs:{label:t.$t("quotation.创建时间"),width:"230"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.$moment.unix(e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")])]}}])},[a("div")]),a("el-table-column",{attrs:{label:t.$t("quotation.操作"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[9!=e.row.status?a("div",[[e.row.canComplete&&3!=e.row.status?a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.completeQuotation(e.row)}}},[t._v(t._s(t.$t("quotation.完成报价")))]):t._e()]],2):t._e(),a("div",[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.getProduct(e.row)}}},[t._v(t._s(t.$t("quotation.报价详情")))])],1)]}}])},[a("div")])],2)],1)],1)],1),t.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}}),a("el-dialog",{attrs:{visible:t.quotationDetail,width:"50%"},on:{close:function(e){t.quotationDetail=!1}}},[a("div",{staticClass:"dialog-body"},[a("div",{staticStyle:{padding:"20px"}},[a("el-divider"),a("el-table",{ref:"gridTable2",staticStyle:{width:"100%"},attrs:{data:t.datailList,stripe:"","row-key":"id",height:"500"}},[a("el-table-column",{attrs:{label:t.$t("quotation.名称"),prop:"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.name,placement:"top"}},[a("span",{staticClass:"tx-ellipsis2",staticStyle:{"white-space":"none"}},[t._v(" "+t._s(e.row.name)+" ")])])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.图片"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{height:"70px",width:"70px"},attrs:{src:t.row.imgUrl,"z-index":9999,fit:"cover","preview-src-list":[t.row.imgUrl]}})]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.客户SKU"),prop:"shopifySkuId"}}),a("el-table-column",{attrs:{label:t.$t("quotation.属性"),prop:"propertyValue"}}),a("el-table-column",{attrs:{label:"SKU",prop:"vendorSku"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.vendorSku?a("span",[t._v(t._s(e.row.vendorSku)+" ")]):a("span",[t._v("---")])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.报价")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.price?a("span",[t._v(t._s(e.row.price)+" ")]):a("span",[t._v(t._s(t.$t("quotation.未报价")))])]}}])})],1)],1)])]),a("el-dialog",{attrs:{"close-on-click-modal":!1,visible:t.ProductDetailVis,width:"50%",title:t.$t("quotation.报价详情")},on:{close:function(e){t.ProductDetailVis=!1}}},[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.addLoading,expression:"addLoading"}],attrs:{"append-to-body":"","close-on-click-modal":!1,visible:t.addProductVis,width:"70%",title:t.$t("quotation.添加商品")},on:{close:t.closeAdd}},[a("el-divider"),a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.基础信息")))]),a("el-form",{attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:t.$t("quotation.图片："),"label-width":"150px"}},[a("div",{staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.nowItem.imgUrl,"z-index":9999,fit:"cover","preview-src-list":[t.nowItem.imgUrl]}})],1)]),a("el-form-item",{attrs:{label:t.$t("quotation.描述"),"label-width":"150px"}},[a("span",[t._v(t._s(t.nowItem.detail))])]),a("el-form-item",{attrs:{label:t.$t("quotation.期望价格"),"label-width":"150px"}},[t.nowItem.expectPrice&&"0.00"!=t.nowItem.expectPrice?a("span",[t._v(" "+t._s(t.nowItem.expectPrice))]):a("span",[t._v("/")])]),a("el-form-item",{attrs:{label:t.$t("quotation.备注"),"label-width":"150px"}},[a("span",[t._v(t._s(t.nowItem.remarks))])])],1),a("el-divider"),a("div",{staticStyle:{padding:"20px 0"}},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("quotation.手工添加"),name:"first"}},[a("b",{staticClass:"mg-t-20"},[t._v(t._s(t.$t("quotation.商品规格")))]),a("div",{staticStyle:{"margin-left":"40px","margin-top":"20px"}},[a("div",{staticClass:"mg-b-20"},[t._v(" "+t._s(t.$t("quotation.规格名称："))+" "),t._l(t.dynamicTags,(function(e,i){return a("el-tag",{key:i,attrs:{closable:"","disable-transitions":!1},on:{close:function(a){return t.handleClose(e)}}},[t._v(" "+t._s(e.name)+" ")])})),[t.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm.apply(null,arguments)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput}},[t._v(t._s(t.$t("quotation.+ 自定义")))]),a("span",{staticStyle:{color:"#ccc","margin-left":"20px"}},[t._v(t._s(t.$t("quotation.回车键确认添加")))])]],2),a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{width:"76px","padding-top":"14px"}},[t._v(" "+t._s(t.$t("quotation.规格值："))+" ")]),a("div",t._l(t.dynamicTags,(function(e,i){return a("div",{key:i,staticClass:"mg-t-10 d-flex"},[a("span",[t._v(t._s(e.name)+": ")]),a("el-input",{ref:"saveTagInput",refInFor:!0,staticClass:"input-new-tag",attrs:{size:"small",placeholder:t.$t("quotation.请输入值")},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"tag.value"}})],1)})),0)]),a("div",{staticClass:"mg-t-15"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.addPro("on")}}},[t._v(t._s(t.$t("quotation.添加")))])],1)])]),a("el-tab-pane",{attrs:{label:t.$t("quotation.商品链接添加"),name:"second"}},[a("el-form",[a("el-form-item",{attrs:{label:t.$t("quotation.商品链接：")}},[a("el-input",{staticClass:"mg-r-20",staticStyle:{width:"80%"},attrs:{placeholder:t.$t("quotation.请输入AliExpress商品链接")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.LinkAdd.apply(null,arguments)}},model:{value:t.LinkUrl,callback:function(e){t.LinkUrl=e},expression:"LinkUrl"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.LinkAdd}},[t._v(t._s(t.$t("quotation.添加")))])],1)],1)],1)],1)],1),a("el-divider"),a("el-dialog",{attrs:{width:"40%",title:t.$t("quotation.编辑属性"),visible:t.innerVisible,"append-to-body":""},on:{"update:visible":function(e){t.innerVisible=e},close:t.closeEdit}},[a("div",{staticStyle:{"margin-left":"40px","margin-top":"20px"}},[a("div",{staticClass:"mg-b-20"},[t._v(" "+t._s(t.$t("quotation.规格名称："))+" "),t._l(t.dynamicTags2,(function(e,i){return a("el-tag",{key:i,attrs:{closable:"","disable-transitions":!1},on:{close:function(a){return t.handleClose(e)}}},[t._v(" "+t._s(e.name)+" ")])})),t.inputVisible2?a("el-input",{ref:"saveTagInput2",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:t.handleInputConfirm2},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm2.apply(null,arguments)}},model:{value:t.inputValue2,callback:function(e){t.inputValue2=e},expression:"inputValue2"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput2}},[t._v(t._s(t.$t("quotation.+ 自定义")))])],2),a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{width:"76px","padding-top":"14px"}},[t._v(" "+t._s(t.$t("quotation.规格值："))+" ")]),a("div",t._l(t.dynamicTags2,(function(e,i){return a("div",{key:i,staticClass:"mg-t-10 d-flex"},[a("span",[t._v(t._s(e.name)+": ")]),a("el-input",{ref:"saveTagInput2",refInFor:!0,staticClass:"input-new-tag",attrs:{size:"small",placeholder:t.$t("quotation.请输入值")},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"tag.value"}})],1)})),0)])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addPro()}}},[t._v(t._s(t.$t("quotation.修改")))])],1)]),a("div",{staticStyle:{padding:"20px 0"}},[a("b",{staticClass:"mg-t-20"},[t._v(t._s(t.$t("quotation.商品规格列表")))]),a("el-table",{ref:"gridTable2",staticStyle:{width:"100%"},attrs:{data:t.productList.stocks,stripe:"","row-key":"id"}},[a("el-table-column",{attrs:{label:t.$t("quotation.名称")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"scope.row.name"}})]}}])}),a("el-table-column",{attrs:{label:"SKU"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{model:{value:e.row.vendorSku,callback:function(a){t.$set(e.row,"vendorSku",a)},expression:"scope.row.vendorSku"}})]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.属性")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.propertyName.split("||"),(function(i,o){return a("div",{key:i},[t._v(" "+t._s(i)+" : "+t._s(e.row.propertyValue.split("||")[o])+" ")])})),a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.editProper(e.row)}}},[t._v(t._s(t.$t("quotation.编辑")))])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.报价($)"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input-number",{staticStyle:{width:"140px"},attrs:{precision:2,controls:!1},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.操作"),width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.delProper(e)}}},[t._v(t._s(t.$t("quotation.删除")))])]}}])})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addProductVis=!1}}},[t._v(t._s(t.$t("mycustomer.取 消")))]),a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v(t._s(t.$t("quotation.保存并完成报价")))])],1)],1),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,visible:t.ProductDetailbody,width:"70%",title:t.$t("quotation.报价详情")},on:{close:function(e){t.ProductDetailbody=!1}}},[a("el-divider"),a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.基础信息")))]),a("el-form",{attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:t.$t("quotation.图片："),"label-width":"150px"}},[a("div",{staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.nowItemDetail.imgUrl,"z-index":9999,fit:"cover","preview-src-list":[t.nowItemDetail.imgUrl]}})],1)]),a("el-form-item",{attrs:{label:t.$t("quotation.描述"),"label-width":"150px"}},[a("span",[t._v(t._s(t.nowItemDetail.detail))])]),a("el-form-item",{attrs:{label:t.$t("quotation.期望价格"),"label-width":"150px"}},[t.nowItemDetail.expectPrice&&"0.00"!=t.nowItemDetail.expectPrice?a("span",[t._v(" "+t._s(t.nowItemDetail.expectPrice))]):a("span",[t._v("/")])]),a("el-form-item",{attrs:{label:t.$t("quotation.备注"),"label-width":"150px"}},[a("span",[t._v(t._s(t.nowItemDetail.remarks))])])],1),a("el-divider"),a("div",{staticStyle:{padding:"20px 0"}},[a("b",{staticClass:"mg-t-20"},[t._v(t._s(t.$t("quotation.商品规格列表")))]),a("el-table",{ref:"gridTable2",staticStyle:{width:"100%"},attrs:{data:t.nowItemDetail.offerPrices,stripe:"","row-key":"id"}},[a("el-table-column",{attrs:{label:t.$t("quotation.名称")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.productName))])]}}])}),a("el-table-column",{attrs:{label:"SKU"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.vendorSku))])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.属性")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.propertyName?a("div",t._l(e.row.propertyName.split("||"),(function(i,o){return a("div",{key:i},[t._v(" "+t._s(i)+" : "+t._s(e.row.variableId.split("||")[o])+" ")])})),0):a("div",[t._v("---")])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.报价($)"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.price))])]}}])})],1)],1)],1)],1),a("div",{staticClass:"dialog-body"},[a("div",{staticStyle:{padding:"20px"}},[a("el-divider"),a("el-table",{ref:"gridTable3",staticStyle:{width:"100%"},attrs:{data:t.productDetailList,stripe:"","row-key":"id",height:"500"}},[a("el-table-column",{attrs:{label:t.$t("quotation.图片"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{height:"70px",width:"70px"},attrs:{src:t.row.imgUrl,"z-index":9999,fit:"cover","preview-src-list":[t.row.imgUrl]}})]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.描述"),prop:"detail"}}),a("el-table-column",{attrs:{label:t.$t("quotation.期望价格"),prop:"expectPrice"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.expectPrice&&"0.00"!=e.row.expectPrice?a("span",[t._v(" "+t._s(e.row.expectPrice)+" ")]):a("span",[t._v(" / ")])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.备注"),prop:"remarks"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.remarks?a("span",[t._v(t._s(e.row.remarks))]):a("span",[t._v("---")])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.操作")},scopedSlots:t._u([{key:"default",fn:function(e){return[9!=t.filterParams.status?a("div",[e.row.offerPrices&&0!=e.row.offerPrices.length?a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.proDetail(e)}}},[t._v(t._s(t.$t("quotation.报价详情")))]):a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.addProduct(e.row)}}},[t._v(t._s(t.$t("quotation.提交商品")))])],1):a("div",[t._v(" --- ")])]}}])})],1)],1)])],1)],1)},o=[],s=(a("a9e3"),a("e9c4"),a("ac1f"),a("1276"),a("a434"),a("d3b7"),a("159b"),a("b0c0"),a("a15b"),{props:{},data:function(){return{productDetailList:[],ProductDetailbody:!1,isReady:!0,propertyList2:[],nowItemDetail:{},ProductDetailVis:!1,offerId:"",index:"",innerVisible:!1,nowItem:{},addLoading:!1,propertyList:[],productList:{stocks:[]},importId:"",uploadFile:"",LinkUrl:"",activeName:"first",items:[],datailList:[],loading:!1,addProductVis:!1,filterParams:{code:"",customerId:"",customer:"",accountId:"",account:"",status:"",type:"2",date:[],timeCreatedFrom:"",timeCreatedTo:""},dynamicTags:[],dynamicTags2:[],inputVisible2:!1,inputValue2:"",inputVisible:!1,inputValue:"",filterParamsDefault:"{}",quotationDetail:!1,pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("myQuotationRowsPerPage")?Number(localStorage.getItem("myQuotationRowsPerPage")):10,total:0,totalPage:0,getShopNameInput:{shopList:[],loading:!1},selectLoading:!1,selectArr:[]}},watch:{$route:"gotoPage"},mounted:function(){this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem()},methods:{close:function(){this.selectArr=[],this.filterParams.customerId=this.filterParams.customer="",this.getItem()},remoteMethodCustom:function(t){var e=this;this.selectArr=[],t&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByVendor",{name:t},(function(t){e.selectLoading=!1,9999==t.ErrorCode?e.selectArr=t.Data.Results:e.$message({message:t.Message,type:"error"})})))},completeQuotation:function(t){var e=this;this.loading=!0,this.$apiCall("api.OfferList.completeOffer",{id:t.id},(function(t){e.loading=!1,9999==t.ErrorCode?(e.getItem(),e.$message({message:e.$t("quotation.完成报价成功"),type:"success"})):e.$message({message:t.Message,type:"error"})}))},proDetail:function(t){this.nowItemDetail=this.productDetailList[t.$index],this.productDetailList[t.$index].offerPrices[0]&&this.productDetailList[t.$index].offerPrices[0].propertyName?this.propertyList2=this.productDetailList[t.$index].offerPrices[0].propertyName.split("||"):this.propertyList2=[],this.ProductDetailbody=!0},getShopName:function(t){var e=this;this.getShopNameInput.shopList=[],t&&(this.getShopNameInput.loading=!0,this.$apiCall("api.Invoice.findStoreByVendor",{shopName:t},(function(t){e.getShopNameInput.loading=!1,9999==t.ErrorCode?e.getShopNameInput.shopList=t.Data.Results:e.$message({message:t.Message,type:"error"})})))},delProper:function(t){var e=t.$index;this.productList.stocks.splice(e,1),this.$elementMessage(this.$t("quotation.删除成功"),"success")},handleChange:function(t){var e=this;this.loading=!0,this.$apiCall("api.OfferList.importByVendor",{id:this.importId,"@file":t.raw},(function(t){e.loading=!1,"9999"==t.ErrorCode?e.$elementMessage(e.$t("quotation.导入成功"),"success"):e.$elementMessage(t.Message,"error")}))},closeAdd:function(){this.addProductVis=!1,this.productList={stocks:[]},this.dynamicTags=[],this.propertyList=[],this.LinkUrl="",this.activeName="first"},closeEdit:function(){this.dynamicTags2=[],this.inputVisible2=!1,this.inputValue2=""},editProper:function(t){var e=this;this.productList.stocks.forEach((function(a,i){a==t&&(e.index=i)}));var a=t.propertyName.split("||");a.forEach((function(a,i){e.dynamicTags2.push({name:a,value:t.propertyValue.split("||")[i]})})),this.innerVisible=!0},addPro:function(t){var e=this;if(t){var a=[];this.propertyList=[],this.dynamicTags.forEach((function(t){a.push(t.value),e.propertyList.push(t.name)})),this.productList.propertyName=this.propertyList.join("||");var i=!1;if(this.productList.stocks.forEach((function(t){t.propertyValue==a.join("||")&&t.propertyName==e.propertyList.join("||")&&(e.$elementMessage(e.$t("quotation.不能添加重复属性"),"error"),i=!0)})),i)return!1;this.productList.stocks.push({name:"",price:"",propertyValue:a.join("||"),propertyName:this.propertyList.join("||"),vendorSku:""}),this.$elementMessage(this.$t("quotation.添加成功"),"success")}else{var o=[],s=[],r=!1;if(this.dynamicTags2.forEach((function(t){o.push(t.value),s.push(t.name)})),this.productList.stocks.forEach((function(t){t.propertyValue==o.join("||")&&t.propertyName==s.join("||")&&(e.$elementMessage(e.$t("quotation.该属性已存在"),"error"),r=!0)})),0!=r)return!1;this.productList.stocks[this.index].propertyValue=o.join("||"),this.productList.stocks[this.index].propertyName=s.join("||"),this.innerVisible=!1,this.$elementMessage(this.$t("quotation.编辑成功"),"success")}},save:function(){var t=this;this.addLoading=!0;var e=this.productList.stocks;e.forEach((function(t){t.productName=t.name})),this.$apiCall("api.OfferList.completeByVendor",{id:this.offerId,offerId:this.nowItem.offerId,skuArr:e},(function(e){t.addLoading=!1,9999==e.ErrorCode?(t.$elementMessage(t.$t("quotation.保存成功"),"success"),t.getItem(),t.addProductVis=!1,t.ProductDetailVis=!1):t.$message({message:e.Message,type:"error"})}))},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick((function(){t.$refs.saveTagInput.$refs.input.focus()}))},handleInputConfirm:function(){this.inputValue&&this.dynamicTags.push({name:this.inputValue,value:""}),this.inputVisible=!1,this.inputValue=""},showInput2:function(){var t=this;this.inputVisible2=!0,this.$nextTick((function(){t.$refs.saveTagInput2.$refs.input.focus()}))},handleInputConfirm2:function(){this.inputValue2&&this.dynamicTags2.push({name:this.inputValue2,value:""}),this.inputVisible2=!1,this.inputValue2=""},importPro:function(t){this.importId=t.id},exportPro:function(t){var e=this;this.loading=!0,0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>'),this.$apiCall("api.OfferList.exportByVendor",{id:t.id},(function(t){9999==t.ErrorCode?(e.loading=!1,e.$elementMessage(e.$t("quotation.导出成功"),"success"),document.getElementById("ifilePro").src=t.Data.Results.file):e.$message({message:t.Message,type:"error"})}))},LinkAdd:function(){var t=this;this.addLoading=!0,this.$apiCall("api.OfferList.getByUrl",{url:this.LinkUrl},(function(e){t.addLoading=!1,9999==e.ErrorCode?(e.Data.Results.stocks.forEach((function(t){t.name=e.Data.Results.productName,t.propertyName=e.Data.Results.propertyName})),t.productList=e.Data.Results,t.propertyList=t.productList.propertyName.split("||"),t.$elementMessage(t.$t("quotation.添加成功"),"success")):t.$message({message:e.Message,type:"error"})}))},addProduct:function(t){this.nowItem=t,this.offerId=t.id,this.addProductVis=!0},toPage:function(t){t!=this.$route.query.page&&this.$router.push({query:{page:t}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("myQuotationRowsPerPage",t),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()},getItem:function(){var t=this;this.loading=!0,this.$apiCall("api.OfferList.findByVendor",{status:this.filterParams.status,type:this.filterParams.type,customerId:this.filterParams.customerId,accountId:this.filterParams.accountId,code:this.filterParams.code,timeCreatedFrom:this.filterParams.timeCreatedFrom,timeCreatedTo:this.filterParams.timeCreatedTo,page:this.page,rowsPerPage:this.rowsPerPage},(function(e){t.loading=!1,9999==e.ErrorCode?(t.items=e.Data.Results,t.total=Number(e.Data.Pagination.totalCount),t.totalPage=Number(e.Data.Pagination.totalPage),t.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0):t.$message({message:e.Message,type:"error"})}))},dateChange:function(){this.filterParams.date.length>1&&(this.filterParams.timeCreatedFrom=this.$moment(this.filterParams.date[0]).format("YYYY-MM-DD"),this.filterParams.timeCreatedTo=this.$moment(this.filterParams.date[1]).format("YYYY-MM-DD"),this.filterItem())},getOrder:function(t){var e=this;this.$apiCall("api.OfferList.getDetailByVendor",{id:t.id},(function(t){9999==t.ErrorCode?e.datailList=t.Data.Results:e.$message({message:t.Message,type:"error"})})),this.quotationDetail=!0},getProduct:function(t){var e=this;this.$apiCall("api.OfferList.getDetailByVendor",{id:t.id},(function(t){9999==t.ErrorCode?(e.productDetailList=t.Data.Results,e.ProductDetailVis=!0):e.$message({message:t.Message,type:"error"})}))},clearFilter:function(t){switch(t){case"code":this.filterParams.code="";break;case"customerId":this.filterParams.customerId="",this.filterParams.accountId="";break;case"type":this.filterParams.type="";break;case"date":this.filterParams.date=[],this.filterParams.timeCreatedFrom="",this.filterParams.timeCreatedTo="";break;default:this.filterParams=JSON.parse(this.filterParamsDefault);break}this.filterItem()},filterItem:function(t){var e=this;"cust"==t?(this.selectArr.forEach((function(t){t.customerName==e.filterParams.customer&&(e.filterParams.customerId=t.customerId)})),this.getItem()):1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})}},components:{}}),r=s,l=(a("574b"),a("0a20"),a("2877")),n=Object(l["a"])(r,i,o,!1,null,"5a14bcca",null);e["default"]=n.exports},"490d":function(t,e,a){},"574b":function(t,e,a){"use strict";a("490d")},a15b:function(t,e,a){"use strict";var i=a("23e7"),o=a("e330"),s=a("44ad"),r=a("fc6a"),l=a("a640"),n=o([].join),u=s!=Object,c=l("join",",");i({target:"Array",proto:!0,forced:u||!c},{join:function(t){return n(r(this),void 0===t?",":t)}})}}]);