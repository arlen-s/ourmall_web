(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orderQuote"],{"1aff":function(t,e,a){"use strict";a("a68a")},"1e88":function(t,e,a){},"270f":function(t,e,a){var i=a("9ad2"),r=a("d9c5");t.exports=!i((function(){var t=Error("a");return!("stack"in t)||(Object.defineProperty(t,"stack",r(1,7)),7!==t.stack)}))},"2c0a":function(t,e,a){"use strict";a("3d17")},"385f":function(t,e,a){"use strict";a("8026")},3999:function(t,e,a){var i=a("3b43"),r=a("ce5b"),o=a("3580"),s=a("63ef"),l=a("d78b").f,n=r(l),c=r([].push),u=function(t){return function(e){var a,r=s(e),l=o(r),u=l.length,d=0,f=[];while(u>d)a=l[d++],i&&!n(r,a)||c(f,t?[a,r[a]]:r[a]);return f}};t.exports={entries:u(!0),values:u(!1)}},"3b5d":function(t,e,a){var i=a("ce5b"),r=i("".replace),o=function(t){return String(Error(t).stack)}("zxcasd"),s=/\n\s*at [^:]*:[^\n]*/,l=s.test(o);t.exports=function(t,e){if(l&&"string"==typeof t)while(e--)t=r(t,s,"");return t}},"3d17":function(t,e,a){},"42ae":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel transaction-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("el-link",{attrs:{type:"primary"},on:{click:t.goback}},[t._v(t._s(t.$t("orders.back")))]),a("span",{staticStyle:{margin:"0 20px"}},[t._v("/")]),a("h2",[t._v(t._s(t.$t("orders.Made")))])],1)]),a("div",{staticClass:"right"})]),a("div",{staticClass:"pagebody mg-t-30"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{staticClass:"mg-b-30 mg-t-10",attrs:{span:24}},[a("el-card",[a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.items}},[a("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"d-flex"},[a("img",{attrs:{src:e.row.imgUrl,width:"60",height:"60"}}),a("div",{staticClass:"mg-l-20"},[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("Shop SPU: "+t._s(e.row.spu))]),a("p",[t._v("Shop SKU: "+t._s(e.row.sku))])])])]}}])}),a("el-table-column",{attrs:{prop:"quantity",label:t.$t("orders.qty"),width:"200"}}),a("el-table-column",{attrs:{label:t.$t("orders.price"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.currency)+" "+t._s(e.row.price||0))])]}}])}),a("el-table-column",{attrs:{label:t.$t("orders.operate"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-link",{staticClass:"mg-r-20",attrs:{type:"primary"},on:{click:t.goto}},[t._v(" "+t._s(t.$t("orders.putaway"))+" ")]),a("el-link",{staticClass:"mg-r-20",attrs:{type:"primary"},on:{click:function(a){return t.openRelate(e.row)}}},[t._v(" "+t._s(t.$t("orders.relate"))+" ")]),a("el-link",{staticClass:"mg-r-20",attrs:{type:"primary"},on:{click:function(a){return t.openDetail(e.row)}}},[t._v(" "+t._s(t.$t("orders.查看详情"))+" ")])],1)]}}])})],1)],1)],1)],1)],1),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}}),a("dialogRelate",{attrs:{relateData:t.dialogRelateInfo},on:{relateFn:t.relateFn}}),a("dialogDetail",{attrs:{detailData:t.dialogDetailInfo}})],1)},r=[],o=(a("87d5"),a("89a8"),a("1a91"),a("10dd"),a("85a4"),a("8c6c")),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.detailData.isShow,title:"",width:"800px"},on:{"update:visible":function(e){return t.$set(t.detailData,"isShow",e)},open:function(e){return t.open()}}},[a("div",{staticClass:"d-body",staticStyle:{margin:"0 20px 20px"}},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("orders.基础商品"),name:"1"}},[a("el-form",{ref:"baseForm",attrs:{"label-position":"left"}},[a("el-form-item",{staticClass:"img-box",attrs:{label:t.$t("quotation.图片："),"label-width":"150px"}},[t.detailData.data.imgUrlArr?a("div",{staticClass:"d-flex",staticStyle:{"flex-wrap":"wrap"}},[a("div",{staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.detailData.data.imgUrlArr[0],"z-index":9999,fit:"cover"}})],1)]):t._e()]),a("el-form-item",{attrs:{label:t.$t("quotation.商品名称")+":","label-width":"150px"}},[t.detailData.data.name?a("span",[t._v(t._s(t.detailData.data.name))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.描述")+":","label-width":"150px"}},[t.detailData.data.description?a("quill-editor",{ref:"goodsEditor",attrs:{options:t.editorOption},model:{value:t.detailData.data.description,callback:function(e){t.$set(t.detailData.data,"description",e)},expression:"detailData.data.description"}}):a("span",[t._v("---")])],1)],1)],1),a("el-tab-pane",{attrs:{label:t.$t("orders.多属性"),name:"2"}},[a("el-table",{staticClass:"mg-t-20",attrs:{border:"",data:t.detailData.data.stocks}},[a("el-table-column",{attrs:{label:t.$t("quotation.图片")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.propertyImage?a("div",{staticClass:"d-flex",staticStyle:{"flex-wrap":"wrap"}},[a("div",{staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.row.propertyImage,"z-index":9999,fit:"cover"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])])],1)]):t._e()]}}])}),a("el-table-column",{attrs:{label:"SKU"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(e.row.sku||"--")+" ")])]}}])}),a("el-table-column",{attrs:{label:t.$t("orders.属性")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(e.row.propertyValue||"--")+" ")])]}}])}),a("el-table-column",{attrs:{label:t.$t("quotation.价格")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(" "+t._s(e.row.currency||"")+" "+t._s(e.row.price||"--")+" ")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:t.$t("orders.图片集"),name:"3"}},[3==t.activeName&&t.detailData.data.imgUrlArr.length?a("div",{staticClass:"d-flex",staticStyle:{"flex-wrap":"wrap"}},t._l(t.detailData.data.imgUrlArr,(function(e){return a("div",{key:e,staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e,"z-index":9999,fit:"cover",lazy:""}},[a("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[t._v(" Loading"),a("span",{staticClass:"dot"},[t._v("...")])]),a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])])],1)})),0):t._e()])],1)],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.detailData.isShow=!1}}},[t._v(t._s(t.$t("orders.cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.copy()}}},[t._v(t._s(t.$t("orders.复制商品")))])],1)],1)},l=[],n=a("65b3"),c=(a("121a"),a("7e41"),a("96be"),a("b881"));c["Quill"].register("modules/eeSourceBtn",n["a"]);var u={props:["detailData"],data:function(){return{editorOption:{modules:{toolbar:{container:[]}}},activeName:"1"}},components:{quillEditor:c["quillEditor"]},methods:{open:function(){this.activeName="1"},copy:function(){var t=this.$router.resolve({name:"AddGoods",query:{id:this.detailData.variableId,isCopy:1}});window.open(t.href,"_blank")}}},d=u,f=(a("590e"),a("cba8")),p=Object(f["a"])(d,s,l,!1,null,"67da9e85",null),g=p.exports,h={data:function(){return{dialogRelateInfo:{isShow:!1,loading:!1,items:[],Pagination:{},item:"",list:[]},dialogRelateInfoDefault:"{}",dialogDetailInfo:{isShow:!1,loading:!1,data:{},variableId:""},dialogDetailInfoDefault:"{}",items:[]}},components:{dialogRelate:o["a"],dialogDetail:g},watch:{},mounted:function(){this.dialogRelateInfoDefault=JSON.stringify(this.dialogRelateInfo),this.dialogDetailInfoDefault=JSON.stringify(this.dialogDetailInfo),this.getItems()},methods:{openDetail:function(t){var e=this;this.$showLoading(),this.$apiCall("api.ShopifyOrder.getCustomerProductDetail",{variableId:t.variableId},(function(a){"9999"==a.ErrorCode?(e.dialogDetailInfo=JSON.parse(e.dialogDetailInfoDefault),e.dialogDetailInfo.data=a.Data.Results,e.$set(e.dialogDetailInfo.data,"imgUrlArr",e.dialogDetailInfo.data.imgsJson?JSON.parse(e.dialogDetailInfo.data.imgsJson):[]),e.dialogDetailInfo.variableId=t.variableId,e.dialogDetailInfo.isShow=!0):e.$elementMessage(a.Message,"error"),e.$hideLoading()}))},goback:function(){this.$router.push({path:"ordersManage/2/1"})},getItems:function(){var t=localStorage.getItem("needQuoteOrders")?JSON.parse(localStorage.getItem("needQuoteOrders")):"";t&&(this.items=t||[])},goto:function(){var t=this.$router.resolve({name:"AddGoods"});window.open(t.href,"_blank")},openRelate:function(t){var e=this;this.$showLoading(),this.$apiCall("api.VendorShop.vendorFindProducts",{page:1,rowsPerPage:10,status:1},(function(a){if("9999"==a.ErrorCode){if(!a.Data.Results||!a.Data.Results.length)return e.$hideLoading(),void e.$elementMessage("No data","error");e.dialogRelateInfo=JSON.parse(e.dialogRelateInfoDefault),e.dialogRelateInfo.isShow=!0,e.dialogRelateInfo.item=t,e.dialogRelateInfo.Pagination=a.Data.Pagination,e.dialogRelateInfo.items=[],e.dialogRelateInfo.list=[],a.Data.Results.forEach((function(t){t.stocks&&t.stocks.length&&t.stocks.forEach((function(a){e.$set(a,"name",t.name),e.dialogRelateInfo.items.push(a)})),e.dialogRelateInfo.list.push(t)}))}else e.$elementMessage(a.Message,"error");e.$hideLoading()}))},relateFn:function(t){var e=this;this.$showLoading(),this.$apiCall("api.ShopifyOrder.setSkuRelation",{customerSku:this.dialogRelateInfo.item.variableId,customerId:this.dialogRelateInfo.item.customerId,vendorSku:t},(function(t){"9999"==t.ErrorCode?(e.$elementMessage(e.$t("orders.success"),"success"),e.dialogRelateInfo=JSON.parse(e.dialogRelateInfoDefault),e.updateItems()):e.$elementMessage(t.Message,"error"),e.$hideLoading()}))},updateItems:function(){var t=this;this.$apiCall("api.ShopifyOrder.getOfferShopifyItems",{ids:this.$route.params.ids},(function(e){if("9999"==e.ErrorCode)if(e.Data&&e.Data.Results){var a=Object.values(e.Data.Results);a&&a.length?t.items=a||[]:t.$router.push({path:"ordersManage/2/1"})}else t.$router.push({path:"ordersManage/2/1"});else t.$router.push({path:"ordersManage/2/1"})}))}}},m=h,v=Object(f["a"])(m,i,r,!1,null,"3072a551",null);e["default"]=v.exports},"590e":function(t,e,a){"use strict";a("1e88")},"65b3":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("8fec");function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e,a){return e&&r(t.prototype,e),a&&r(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}var s=function(){function t(e,a){i(this,t);var r=this;r.addDom(e),e.on("text-change",(function(t,a,i){r.replaceSourceEditorContent(e)}));var o=document.createElement("button");o.innerHTML=">_",o.onclick=function(){r.showSourceEditor(e)};var s=document.createElement("span");s.setAttribute("class","ql-formats ee-flag-source"),s.appendChild(o),e.container.previousSibling.appendChild(s)}return o(t,[{key:"addDom",value:function(t){if(!t.container.querySelector(".ql-ee-source")){var e=document.createElement("textarea");e.style.cssText="width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 13px;outline: none;padding: 12px 15px;line-height: 1.42;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;";var a=t.addContainer("ql-ee-source");a.style.cssText="display:none",a.appendChild(e)}}},{key:"replaceSourceEditorContent",value:function(t){var e=t.container.querySelector(".ql-editor"),a=t.container.querySelector(".ql-ee-source"),i=a.querySelector("textarea");i.value=e.innerHTML}},{key:"showSourceEditor",value:function(t){var e=t.container.querySelector(".ql-editor"),a=t.container.querySelector(".ql-ee-source"),i=a.querySelector("textarea");"none"===a.style.display?(a.style.display="",i.value=e.innerHTML):(a.style.display="none",e.innerHTML=i.value)}}]),t}();window.eeSourceBtn=s},7369:function(t,e,a){"use strict";var i=a("da77"),r=a("6c75"),o=a("ee7c"),s=a("a7b6"),l=a("17b3"),n=a("28f5"),c=a("55f9"),u=a("890f"),d=a("c4a1"),f=a("3b5d"),p=a("270f"),g=a("9f52");t.exports=function(t,e,a,h){var m=h?2:1,v=t.split("."),b=v[v.length-1],y=i.apply(null,v);if(y){var k=y.prototype;if(!g&&r(k,"cause")&&delete k.cause,!a)return y;var w=i("Error"),S=e((function(t,e){var a=u(h?e:t,void 0),i=h?new y(t):new y;return void 0!==a&&o(i,"message",a),p&&o(i,"stack",f(i.stack,2)),this&&s(k,this)&&c(i,this,S),arguments.length>m&&d(i,arguments[m]),i}));if(S.prototype=k,"Error"!==b&&(l?l(S,w):n(S,w,{name:!0})),n(S,y),!g)try{k.name!==b&&o(k,"name",b),k.constructor=S}catch(_){}return S}}},8026:function(t,e,a){},"84bf":function(t,e,a){"use strict";a("944a")},"85a4":function(t,e,a){var i=a("88d4"),r=a("3999").values;i({target:"Object",stat:!0},{values:function(t){return r(t)}})},"890f":function(t,e,a){var i=a("3ffc");t.exports=function(t,e){return void 0===t?arguments.length<2?"":e:i(t)}},"8c6c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.relateData.isShow,title:t.$t("orders.associated"),width:"800px"},on:{"update:visible":function(e){return t.$set(t.relateData,"isShow",e)},open:t.open}},[a("el-divider"),a("div",{staticClass:"d-body",staticStyle:{margin:"20px"}},[a("div",{staticClass:"d-flex",staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:t.$t("orders.spuHolder"),clearable:""},on:{clear:function(e){return t.clearFilter("spu")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.spu,callback:function(e){t.spu=e},expression:"spu"}}),a("el-input",{staticStyle:{width:"200px",margin:"0 20px"},attrs:{placeholder:t.$t("orders.skuHolder"),clearable:""},on:{clear:function(e){return t.clearFilter("sku")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.sku,callback:function(e){t.sku=e},expression:"sku"}}),a("el-input",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:t.$t("orders.nameHolder"),clearable:""},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.filterItem}},[t._v(t._s(t.$t("orders.filter")))])],1),a("el-table",{staticClass:"no-hover",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.list}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","show-header":!1,data:e.row.stocks}},[a("el-table-column",{attrs:{label:t.$t("orders.select"),width:"55"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-radio",{attrs:{label:e.row.sku+"||"+e.row.id},model:{value:t.tableRadio,callback:function(e){t.tableRadio=e},expression:"tableRadio"}},[a("i")])]}}],null,!0)}),a("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"d-flex"},[a("img",{attrs:{src:e.row.propertyImage,width:"60",height:"60"}}),a("div",{staticClass:"mg-l-20"},[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("SKU: "+t._s(e.row.sku))])])])]}}],null,!0)})],1)]}}])}),a("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"d-flex"},[a("img",{attrs:{src:e.row.imgUrl,width:"60",height:"60"}}),a("div",{staticClass:"mg-l-20"},[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("SPU: "+t._s(e.row.sku))])])])]}}])})],1)],1),a("div",{staticClass:"d-flex",staticStyle:{"justify-content":"center",margin:"20px"}},[a("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"total, prev, pager, next",total:Number(t.total)},on:{"current-change":t.toPage}})],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.relateData.isShow=!1}}},[t._v(t._s(t.$t("orders.cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:t.relateFn}},[t._v(t._s(t.$t("orders.confirm")))])],1)],1)},r=[],o=(a("10dd"),a("51b3"),a("89a8"),a("1a91"),a("4c1e"),a("fee8"),{props:["relateData"],data:function(){return{tableRadio:"",page:1,rowsPerPage:10,total:0,totalPage:0,items:[],list:[],sku:"",spu:"",name:"",dealRelation:1}},methods:{filterItem:function(){this.toPage(1)},clearFilter:function(t){"sku"==t?this.sku="":"spu"==t&&(this.spu=""),this.name="",this.toPage(1)},open:function(){this.sku="",this.spu="",this.name="",this.page=1,this.tableRadio="",this.total=Number(this.relateData.Pagination.totalCount),this.totalPage=Number(this.relateData.Pagination.totalPage),this.items=this.relateData.items,this.list=this.relateData.list,$(".el-dialog__body").scrollTop(0)},toPage:function(t){var e=this;this.page=t,this.$showLoading(),this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:10,status:1,sku:this.sku,spu:this.spu,name:this.name},(function(t){"9999"==t.ErrorCode?(e.tableRadio="",e.total=Number(t.Data.Pagination.totalCount),e.totalPage=Number(t.Data.Pagination.totalPage),e.items=[],e.list=[],t.Data.Results.forEach((function(t){t.stocks&&t.stocks.length&&t.stocks.forEach((function(a){e.$set(a,"name",t.name),e.items.push(a)})),e.list.push(t)})),$(".el-dialog__body").scrollTop(0)):e.$elementMessage(t.Message,"error"),e.$hideLoading()}))},relateFn:function(){if(this.tableRadio){var t=this.tableRadio.split("||");this.$emit("relateFn",t[0])}else this.$elementMessage("Please check a SKU first","error")},clickChange:function(t,e){}}}),s=o,l=(a("385f"),a("84bf"),a("cba8")),n=Object(l["a"])(s,i,r,!1,null,"319d7238",null);e["a"]=n.exports},"8fec":function(t,e,a){var i=a("88d4"),r=a("8735"),o=a("e7c5"),s=a("7369"),l="WebAssembly",n=r[l],c=7!==Error("e",{cause:7}).cause,u=function(t,e){var a={};a[t]=s(t,e,c),i({global:!0,forced:c},a)},d=function(t,e){if(n&&n[t]){var a={};a[t]=s(l+"."+t,e,c),i({target:l,stat:!0,forced:c},a)}};u("Error",(function(t){return function(e){return o(t,this,arguments)}})),u("EvalError",(function(t){return function(e){return o(t,this,arguments)}})),u("RangeError",(function(t){return function(e){return o(t,this,arguments)}})),u("ReferenceError",(function(t){return function(e){return o(t,this,arguments)}})),u("SyntaxError",(function(t){return function(e){return o(t,this,arguments)}})),u("TypeError",(function(t){return function(e){return o(t,this,arguments)}})),u("URIError",(function(t){return function(e){return o(t,this,arguments)}})),d("CompileError",(function(t){return function(e){return o(t,this,arguments)}})),d("LinkError",(function(t){return function(e){return o(t,this,arguments)}})),d("RuntimeError",(function(t){return function(e){return o(t,this,arguments)}}))},"944a":function(t,e,a){},a331:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel transaction-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("el-link",{attrs:{type:"primary"},on:{click:t.goback}},[t._v(t._s(t.$t("orders.back")))]),a("span",{staticStyle:{margin:"0 20px"}},[t._v("/")]),a("h2",[t._v(t._s(t.$t("orders.导入确认")))])],1)]),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"primary"},on:{click:t.waitSubmit}},[t._v(t._s(t.$t("orders.提交")))])],1)]),a("div",{staticClass:"mg-t-20"},[a("el-button",{on:{click:t.batchDelete}},[t._v(t._s(t.$t("orders.批量删除")))])],1),a("div",{staticClass:"pagebody"},[a("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[a("el-col",{staticClass:"mg-b-30 mg-t-10",attrs:{span:24}},[a("el-card",[a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.items},on:{"selection-change":t.selectionChange}},[a("el-table-column",{attrs:{align:"center",type:"selection"}}),a("el-table-column",{attrs:{width:"80",align:"center",label:t.$t("orders.商品id"),prop:"itemId"}}),a("el-table-column",{attrs:{width:"140",align:"center",label:t.$t("orders.商品图片链接")},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.row.imgUrl}})]}}])}),a("el-table-column",{attrs:{width:"400",align:"center",label:t.$t("orders.店铺商品名称"),prop:"itemName"}}),a("el-table-column",{attrs:{width:"200",align:"center",label:t.$t("orders.店铺sku"),prop:"itemSku"}}),a("el-table-column",{attrs:{align:"center",label:t.$t("orders.客户名称"),prop:"customerName"}}),a("el-table-column",{attrs:{align:"center",label:t.$t("orders.店铺"),prop:"shopName"}}),a("el-table-column",{attrs:{align:"center",label:t.$t("orders.供应商sku"),prop:"vendorSku"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{style:{color:1==e.row.vendorSkuStatus?"":"red"}},[t._v(t._s(e.row.vendorSku))]),1==e.row.vendorSkuStatus?a("div"):t._e(),2==e.row.vendorSkuStatus?a("div",{staticStyle:{color:"red"}},[t._v(t._s(t.$t("orders.商品下架")))]):t._e(),3==e.row.vendorSkuStatus?a("div",{staticStyle:{color:"red"}},[t._v(t._s(t.$t("orders.商品不存在")))]):t._e()]}}])}),a("el-table-column",{attrs:{width:"100",align:"center",label:""+t.$t("orders.店铺售价")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.currency)+" "+t._s(e.row.itemPrice))])]}}])}),a("el-table-column",{attrs:{align:"center",label:t.$t("orders.状态")},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.matchStatus?a("div",[t._v(t._s(t.$t("orders.匹配成功")))]):t._e(),2==e.row.matchStatus?a("div",{staticStyle:{color:"red"}},[t._v(t._s(t.$t("orders.匹配失败")))]):t._e()]}}])}),a("el-table-column",{attrs:{align:"center",label:t.$t("orders.operate")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(a){return t.openRelate(e.row)}}},[t._v(t._s(t.$t("orders.关联")))]),a("br"),a("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(a){return t.deleteFn(e.row)}}},[t._v(t._s(t.$t("orders.删除")))])]}}])})],1)],1)],1)],1)],1),a("dialogAssRelate",{attrs:{relateData:t.dialogRelateInfo},on:{relateFn:t.relateFn}}),a("el-dialog",{attrs:{width:"500px",visible:t.dialogDelete.isShow},on:{"update:visible":function(e){return t.$set(t.dialogDelete,"isShow",e)}}},[a("el-row",{staticClass:"tx-center"},[a("h3",[t._v(t._s(t.$t("orders.是否确认删除所选的商品,删除后需重新关联")))]),a("div",{staticClass:"mg-t-20"},[a("el-button",{on:{click:t.deleteHandle}},[t._v(t._s(t.$t("orders.知道了")))])],1)])],1)],1)},r=[],o=(a("87d5"),a("10dd"),a("89a8"),a("1a91"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.relateData.isShow,title:t.$t("orders.associated"),width:"800px"},on:{"update:visible":function(e){return t.$set(t.relateData,"isShow",e)},open:t.open}},[a("el-divider"),a("div",{staticClass:"d-body",staticStyle:{margin:"20px"}},[a("div",{staticClass:"d-flex",staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:t.$t("orders.skuHolder"),clearable:""},on:{clear:function(e){return t.clearFilter("sku")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.sku,callback:function(e){t.sku=e},expression:"sku"}}),a("el-input",{staticStyle:{width:"200px",margin:"0 20px"},attrs:{placeholder:t.$t("orders.nameHolder"),clearable:""},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterItem.apply(null,arguments)}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.filterItem}},[t._v(t._s(t.$t("orders.filter")))])],1),a("el-table",{staticClass:"no-hover",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.list}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","show-header":!1,data:e.row.stocks}},[a("el-table-column",{attrs:{label:t.$t("orders.select"),width:"55"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-radio",{attrs:{label:e.row.sku+"||"+e.row.id},model:{value:t.tableRadio,callback:function(e){t.tableRadio=e},expression:"tableRadio"}},[a("i")])]}}],null,!0)}),a("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"d-flex"},[a("img",{attrs:{src:e.row.propertyImage,width:"60",height:"60"}}),a("div",{staticClass:"mg-l-20"},[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("SKU: "+t._s(e.row.sku))])])])]}}],null,!0)})],1)]}}])}),a("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"d-flex"},[a("img",{attrs:{src:e.row.imgUrl,width:"60",height:"60"}}),a("div",{staticClass:"mg-l-20"},[a("p",[t._v(t._s(e.row.name))]),a("p",[t._v("SKU: "+t._s(e.row.sku))])])])]}}])})],1)],1),a("div",{staticClass:"d-flex",staticStyle:{"justify-content":"center",margin:"20px"}},[a("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"total, prev, pager, next",total:Number(t.total)},on:{"current-change":t.toPage}})],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.relateData.isShow=!1}}},[t._v(t._s(t.$t("orders.cancel")))]),a("el-button",{attrs:{type:"primary"},on:{click:t.relateFn}},[t._v(t._s(t.$t("orders.confirm")))])],1)],1)}),s=[],l=(a("51b3"),a("4c1e"),a("fee8"),{props:["relateData"],data:function(){return{tableRadio:"",page:1,rowsPerPage:10,total:0,totalPage:0,items:[],list:[],sku:"",name:"",dealRelation:1}},methods:{filterItem:function(){this.toPage(1)},clearFilter:function(t){"sku"==t?this.sku="":this.name="",this.toPage(1)},open:function(){this.sku="",this.name="",this.page=1,this.tableRadio="",this.total=Number(this.relateData.Pagination.totalCount),this.totalPage=Number(this.relateData.Pagination.totalPage),this.items=this.relateData.items,this.list=this.relateData.list,$(".el-dialog__body").scrollTop(0)},toPage:function(t){var e=this;this.page=t,this.$showLoading(),this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:10,status:1,dealRelation:this.dealRelation,sku:this.sku,name:this.name},(function(t){"9999"==t.ErrorCode?(e.tableRadio="",e.total=Number(t.Data.Pagination.totalCount),e.totalPage=Number(t.Data.Pagination.totalPage),e.items=[],e.list=[],t.Data.Results.forEach((function(t){t.stocks&&t.stocks.length&&t.stocks.forEach((function(a){e.$set(a,"name",t.name),e.items.push(a)})),e.list.push(t)})),$(".el-dialog__body").scrollTop(0)):e.$elementMessage(t.Message,"error"),e.$hideLoading()}))},relateFn:function(){if(this.tableRadio){var t=this.tableRadio.split("||");this.$emit("relateFn",t[0])}else this.$elementMessage("Please check a SKU first","error")},clickChange:function(t,e){}}}),n=l,c=(a("2c0a"),a("1aff"),a("cba8")),u=Object(c["a"])(n,o,s,!1,null,"3ebbe205",null),d=u.exports,f={data:function(){return{dialogDelete:{isShow:!1,item:null},dialogRelateInfo:{isShow:!1,loading:!1,items:[],Pagination:{},item:"",list:[]},dialogRelateInfoDefault:"{}",items:[],selectionIds:[],batchDeleteStatus:!1,isSave:!1}},components:{dialogAssRelate:d},watch:{},mounted:function(){this.dialogRelateInfoDefault=JSON.stringify(this.dialogRelateInfo),this.getItems()},beforeRouteLeave:function(t,e,a){if("orderAssociation"!=t.name)if(this.isSave)a();else{var i=confirm(this.$t("orders.需点击提交后，才能完成报价"));i?a():a(!1)}else a()},methods:{waitSubmit:function(){var t=this;this.$apiCall("api.ShopifyOrder.setSkuRelationWaitBindItem",{},(function(e){9999==e.ErrorCode?(t.isSave=!0,t.$router.push({path:"/ordersManage/2/1"})):t.$elementMessage(e.Message,"error")}))},selectionChange:function(t){var e=this;console.log(t),this.selectionIds=[],t.forEach((function(t){e.selectionIds.push(t.variableId)}))},batchDelete:function(){0!=this.selectionIds.length?(this.batchDeleteStatus=!0,this.dialogDelete.isShow=!0):this.$elementMessage(this.$t("orders.请选择需要删除的数据"),"error")},deleteFn:function(t){this.dialogDelete.isShow=!0,this.dialogDelete.item=t},deleteHandle:function(){var t=this,e=[];e=this.batchDeleteStatus?this.selectionIds:[this.dialogDelete.item.variableId],this.$apiCall("api.ShopifyOrder.delWaitBindItem",{ids:e},(function(e){t.batchDeleteStatus=!1,9999==e.ErrorCode?(t.$elementMessage(t.$t("orders.删除成功"),"success"),t.dialogDelete.isShow=!1,t.dialogDelete.item=null,t.getItems()):t.$elementMessage(e.Message,"error")}))},goback:function(){this.$router.push({path:"ordersManage/2/1"})},handleSizeChange:function(t){this.pagination.pageSize=t,this.getItems()},handleCurrentChange:function(t){this.pagination.currentPage=t,this.getItems()},getItems:function(){var t=this;this.$apiCall("api.ShopifyOrder.getWaitBindItem",{},(function(e){9999==e.ErrorCode?t.items=e.Data.Results:t.$elementMessage(e.Message,"error")}))},openRelate:function(t){var e=this;this.$showLoading(),this.$apiCall("api.VendorShop.vendorFindProducts",{page:1,rowsPerPage:10,status:1},(function(a){if("9999"==a.ErrorCode){if(!a.Data.Results||!a.Data.Results.length)return e.$hideLoading(),void e.$elementMessage("No data","error");e.dialogRelateInfo=JSON.parse(e.dialogRelateInfoDefault),e.dialogRelateInfo.isShow=!0,e.dialogRelateInfo.item=t,e.dialogRelateInfo.Pagination=a.Data.Pagination,e.dialogRelateInfo.items=[],e.dialogRelateInfo.list=[],a.Data.Results.forEach((function(t){t.stocks&&t.stocks.length&&t.stocks.forEach((function(a){e.$set(a,"name",t.name),e.dialogRelateInfo.items.push(a)})),e.dialogRelateInfo.list.push(t)}))}else e.$elementMessage(a.Message,"error");e.$hideLoading()}))},relateFn:function(t){var e=this;this.$showLoading(),this.$apiCall("api.ShopifyOrder.setSkuRelation",{customerSku:this.dialogRelateInfo.item.variableId,customerId:this.dialogRelateInfo.item.customerId,vendorSku:t},(function(t){"9999"==t.ErrorCode?(e.$elementMessage(e.$t("orders.success"),"success"),e.dialogRelateInfo=JSON.parse(e.dialogRelateInfoDefault),e.getItems()):e.$elementMessage(t.Message,"error"),e.$hideLoading()}))}}},p=f,g=Object(c["a"])(p,i,r,!1,null,"3d892b78",null);e["default"]=g.exports},a68a:function(t,e,a){},c4a1:function(t,e,a){var i=a("bf1f"),r=a("ee7c");t.exports=function(t,e){i(e)&&"cause"in e&&r(t,"cause",e.cause)}}}]);