(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["allocatedProducts"],{1034:function(e,t,a){},2694:function(e,t,a){"use strict";a("e79d")},"3f6c":function(e,t,a){"use strict";a("1034")},8216:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel allocate-products-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title",staticStyle:{"margin-bottom":"10px"}},[a("i",{staticClass:"el-icon-shopping-bag-1"}),a("h2",[e._v(e._s(e.$t("My Allocated Products")))])]),a("el-breadcrumb",{staticStyle:{"font-size":"12px"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{staticStyle:{color:"#5c6ac4"},attrs:{to:{path:"/vendors"}}},[e._v(e._s(e.$t("Vendors")))]),a("el-breadcrumb-item",{staticStyle:{color:"#C0C4CC"}},[e._v(e._s(e.$t("My Allocated Products")))])],1)],1),a("div",{staticClass:"right"},[a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",size:"medium",disabled:!e.checkdeStatus.checkedArr.length},on:{click:function(t){return e.openAllocateToVendor()}}},[e._v(e._s(e.$t("Batch Re-allocate")))]),a("el-button",{attrs:{type:"danger",size:"medium",disabled:!e.checkdeStatus.checkedArr.length},on:{click:function(t){return e.confirmUnAllocate("multi")}}},[e._v(e._s(e.$t("Batch Un-allocate")))])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-cascader",{key:e.cascaderKey,attrs:{placeholder:e.$t("All my stores"),options:e.options,props:{expandTrigger:"hover"}},on:{change:e.filterGetItem},model:{value:e.cascaderValue,callback:function(t){e.cascaderValue=t},expression:"cascaderValue"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:e.$t("Product name")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.productName,callback:function(t){e.productName=t},expression:"productName"}})],1),a("el-form-item",[a("el-select",{attrs:{filterable:"",placeholder:e.$t("All my vendors")},on:{change:e.filterGetItem},model:{value:e.filterParams.relationshipId,callback:function(t){e.$set(e.filterParams,"relationshipId",t)},expression:"filterParams.relationshipId"}},[a("el-option",{attrs:{label:e.$t("All my vendors"),value:""}}),e._l(e.vendors,(function(e){return a("el-option",{key:e.id,attrs:{label:e.vendorName,value:e.id}})}))],2)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v(e._s(e.$t("Filter")))]),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return e.clearFilter("all")}}},[e._v(e._s(e.$t("Clear")))])],1)],1),a("div",{staticStyle:{"margin-bottom":"5px"}},[e.filterParams.accountId?a("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("store")}}},[e._v(" "+e._s(e.storeName(e.filterParams.accountId))+" ")]):e._e(),e.filterParams.productName?a("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("name")}}},[e._v(" "+e._s(e.filterParams.productName)+" ")]):e._e(),e.filterParams.relationshipId?a("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(t){return e.clearFilter("vendor")}}},[e._v(" "+e._s(e.venderName(e.filterParams.relationshipId))+" ")]):e._e()],1),a("el-row",{staticStyle:{"margin-bottom":"5px"},attrs:{gutter:10}},[a("el-col",{staticStyle:{"padding-right":"25px"},attrs:{span:24}},[a("el-card",{staticClass:"table-header",attrs:{shadow:"never","body-style":{padding:"0 20px"}}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:" d-flex"},[a("el-checkbox",{staticStyle:{"margin-right":"10px","margin-bottom":"0"},on:{change:e.changeAllChecked},model:{value:e.allChecked,callback:function(t){e.allChecked=t},expression:"allChecked"}}),a("div",{staticClass:"title"},[e._v(e._s(e.$t("My Product")))])],1)]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:" title"},[e._v(e._s(e.$t("My store")))])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:" title"},[e._v(e._s(e.$t("Vendor")))])]),a("el-col",{attrs:{span:2}})],1)],1)],1)],1)]),a("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px","overflow-y":"auto"},style:[{height:e.tableHeight+"px"},{overflowX:"hidden"}],attrs:{gutter:10}},[e.items.length?e._e():a("el-col",[a("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[e._v(e._s(e.$t("No product")))])]),e._l(e.items,(function(t){return a("el-row",{key:t.id,attrs:{gutter:10}},[a("el-col",{staticStyle:{"padding-right":"25px"},attrs:{span:24}},[a("el-card",{staticClass:"table-body-card",attrs:{"body-style":[{display:"flex"},{padding:"10px 20px"},{alignItems:"center"}]}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"product-box"},[a("el-checkbox",{model:{value:t.checked,callback:function(a){e.$set(t,"checked",a)},expression:"item.checked"}}),a("el-image",{staticStyle:{"min-width":"120px",width:"120px",height:"120px"},attrs:{fit:"contain",src:t.img,"preview-src-list":[t.img]}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])]),a("div",{staticClass:"info"},[a("div",{staticClass:"name tx-ellipsis3"},[e._v(e._s(t.productName))]),a("div",{staticClass:"row1"},[a("span",{staticStyle:{color:"#909399"}},[e._v("SKU:")]),e._v(" "+e._s(t.sku)+" ")])])],1)]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"info-wrap"},[a("div",{staticClass:"row1"},[e._v(e._s(t.storeName))]),a("div",{staticClass:"row1"},[a("span",{staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Sale price"))+": ")]),t.saleCurrency?a("span",[e._v(e._s(e.ce[t.saleCurrency]?e.ce[t.saleCurrency].symbol:t.saleCurrency)+" ")]):e._e(),e._v(" "+e._s(t.salePrice)+" ")])])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"info-wrap"},[a("div",{staticClass:"row1"},[e._v(e._s(t.vendorName))]),a("div",{staticClass:"row1"},[a("span",{staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Purchase price"))+": ")]),a("span",[e._v("$ ")]),e._v(" "+e._s(t.purchasePrice)+" ")])])]),a("el-col",{attrs:{span:2}},[a("div",{staticClass:"info-wrap"},[a("div",{staticClass:"row1 mg-b-10"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.openAllocateToVendor(t)}}},[e._v("Re-allocate")])],1),a("div",{staticClass:"row1"},[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.confirmUnAllocate("single",t)}}},[e._v("Un-allocate")])],1)])])],1)],1)],1)}))],2)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:" d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e(),a("DistributionVendorDialog",{ref:"DistributionVendorDialog",attrs:{type:"products"},on:{resetPage:e.filterGetItem}})],1)},r=[],i=(a("4de4"),a("d81d"),a("fb6a"),a("a9e3"),a("159b"),a("f02e")),l=(a("9b8c"),{data:function(){var e=this;return{cascaderKey:1,cascaderValue:"",options:[{id:1,label:"Shopify",children:[]},{id:2,label:"Woocommerce",children:[]},{id:3,label:"Lazada",children:[]},{id:4,label:"Shopee",children:[]}],loading:!1,tableHeight:400,reSizeTime:0,page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_allocateProductsPerPage")?Number(localStorage.getItem("c_allocateProductsPerPage")):10,total:0,totalPage:0,pageSizes:[10,20,50],items:[],productName:"",filterParams:{accountId:"",productName:"",relationshipId:""},filterParamsDefault:"{}",ce:this.$CE,allChecked:!1,storeList:[],vendors:[],resizeH:function(){e.$getTableHeight(e)}}},components:{DistributionVendorDialog:i["a"]},computed:{checkdeStatus:function(){var e=[],t=[];return this.items.forEach((function(a){a.checked&&(e.push(a),t.push(a.variableId))})),{checkedArr:e,allChecked:this.items.length&&this.items.length==e.length,variableIdArr:t}}},watch:{$route:"gotoPage","checkdeStatus.allChecked":function(){this.allChecked=this.checkdeStatus.allChecked}},mounted:function(){var e=this;this.filterParamsDefault=JSON.stringify(this.filterParams),this.filterParams.relationshipId=this.$route.params.vendorId,this.getStore(),this.getVendors(),this.getItems(),this.$nextTick((function(){e.resizeH(),window.addEventListener("resize",e.resizeH,!1)}))},beforeDestroy:function(){window.removeEventListener("resize",this.resizeH)},methods:{openAllocateToVendor:function(e){e?this.$refs.DistributionVendorDialog.openDistributionDialog([e]):this.$refs.DistributionVendorDialog.openDistributionDialog(this.checkdeStatus.checkedArr.slice())},confirmUnAllocate:function(e,t){var a=this;this.$confirm("single"==e?this.$t("Un-allocate selected products?"):"Un-allocate selected (".concat(this.checkdeStatus.variableIdArr.length,") products? "),"",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then((function(){a.unAllocate(e,t)}))},unAllocate:function(e,t){var a=this;this.loading=!0;var s={};s.variableIds="single"==e?[t.variableId]:this.checkdeStatus.variableIdArr,this.$apiCall("api.DispatchOrderRule.unAllocate",s,(function(e){"9999"==e.ErrorCode?(a.getItems(!0),a.$elementMessage("UN-allocate Success","success")):a.$elementMessage(e.Message,"error")}))},storeName:function(e){var t="";return this.storeList.some((function(a){if(a.shopifyAccountId==e)return t=a.store,!0})),t},venderName:function(e){var t="";return this.vendors.some((function(a){if(a.id==e)return t=a.vendorName,!0})),t},changeAllChecked:function(){var e=this;this.items.forEach((function(t){t.checked=e.allChecked}))},clearFilter:function(e){switch(e){case"store":this.filterParams.accountId="",this.cascaderValue="",++this.cascaderKey;break;case"name":this.productName=this.filterParams.productName="";break;case"vendor":this.filterParams.relationshipId="";break;case"all":this.filterParams=JSON.parse(this.filterParamsDefault);break}1==this.$route.query.page?this.getItems():this.$router.push({query:{page:1}})},filterGetItem:function(){""!=this.cascaderValue&&(this.filterParams.accountId=this.cascaderValue[1]),this.filterParams.productName=this.productName,1==this.$route.query.page?this.getItems():this.$router.push({query:{page:1}})},getItems:function(e){var t=this;this.loading=!0;var a={page:this.page,rowsPerPage:this.rowsPerPage,accountId:this.filterParams.accountId,productName:this.filterParams.productName,relationshipId:this.filterParams.relationshipId};this.$apiCall("api.DispatchOrderRule.findAllocatedProducts",a,(function(a){t.loading=!1,"9999"==a.ErrorCode?(t.items=a.Data.Results.map((function(e){return e.checked=!1,e})),t.total=Number(a.Data.Pagination.totalCount),t.totalPage=Number(a.Data.Pagination.totalPage),t.resizeH(),!e&&t.$refs.gridTable&&(t.$refs.gridTable.$el.scrollTop=0)):t.$elementMessage(a.Message,"error")}))},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_allocateProductsPerPage",e),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItems()},getStore:function(){var e=this;this.$apiCall("api.Invoice.findStores",{authStatus:1},(function(t){9999==t.ErrorCode?(e.storeList=[],t.Data.Results.forEach((function(t){e.storeList.push({shopifyAccountId:t.id,store:t.shopName})})),e.options.map((function(e){t.Data.Results.filter((function(t){t.platform==e.id&&e.children.push({label:t.shopName,value:t.id})}))}))):e.$message({message:t.Message,type:"error"})}))},getVendors:function(){var e=this;this.$apiCall("api.Relationship.findByCustomer",{},(function(t){"9999"==t.ErrorCode?e.vendors=t.Data.Results:e.$elementMessage(t.Message,"error")}))}}}),o=l,c=(a("2694"),a("3f6c"),a("2877")),n=Object(c["a"])(o,s,r,!1,null,"3902b852",null);t["default"]=n.exports},e79d:function(e,t,a){}}]);
//# sourceMappingURL=allocatedProducts.e5a89354.js.map