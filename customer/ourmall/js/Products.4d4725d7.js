(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Products"],{"26df":function(e,t,i){},"825e":function(e,t,i){"use strict";i("26df")},e6dc:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"contentpanel products-page"},[i("div",{ref:"pageHeader",staticClass:"pagetitle"},[i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-shopping-bag-1"}),i("h2",[e._v(e._s(e.$t("Products")))])])]),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary",size:"medium",loading:e.updateProductLoading},on:{click:e.updateProducts}},[i("span",{staticClass:" mg-r-10"}),e._v(" "+e._s(e.$t("Update Product"))+" ")])],1)]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[i("el-card",[i("el-row",{attrs:{gutter:20}},[i("div",{ref:"pageFilter",staticClass:"page-filter"},[i("el-form",{attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"Product name"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.name,callback:function(t){e.$set(e.filterParams,"name",t)},expression:"filterParams.name"}})],1),i("el-form-item",[i("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodStores,loading:e.selectLoading2,placeholder:"Enter Store name"},on:{change:e.filterGetItem},model:{value:e.filterParams.accountId,callback:function(t){e.$set(e.filterParams,"accountId",t)},expression:"filterParams.accountId"}},e._l(e.selectArr2,(function(e){return i("el-option",{key:e.id,attrs:{label:e.shopName?e.shopName:"---",value:e.id}})})),1)],1),i("el-form-item",{staticStyle:{"margin-right":"15px"}},[i("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodVendor,loading:e.selectLoading,placeholder:e.$t("Enter vendor name")},on:{change:e.filterGetItem},model:{value:e.filterParams.relationshipId,callback:function(t){e.$set(e.filterParams,"relationshipId",t)},expression:"filterParams.relationshipId"}},e._l(e.selectArr,(function(e){return i("el-option",{key:e.id,attrs:{label:e.vendorName,value:e.id}})})),1)],1),i("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price from"}},[i("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceFrom,callback:function(t){e.$set(e.filterParams,"priceFrom",t)},expression:"filterParams.priceFrom"}})],1),i("el-form-item",[e._v(" - ")]),i("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price to"}},[i("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceTo,callback:function(t){e.$set(e.filterParams,"priceTo",t)},expression:"filterParams.priceTo"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v(e._s(e.$t("Filter")))]),i("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear")))])],1)],1)],1)]),i("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px","overflow-y":"auto"},style:{height:e.tableHeight+"px"},attrs:{gutter:10}},[e.items.length?e._e():i("el-col",[i("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[e._v(e._s(e.$t("no product")))])]),e._l(e.items,(function(t){return i("el-col",{key:t.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"d-flex justify-content-between mg-b-10"},[i("el-dropdown",{attrs:{size:"mini"}},[i("span",{staticClass:"el-dropdown-link"},[e._v(" "+e._s(e.$t("All Action"))),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t.adminUrl?i("el-dropdown-item",{staticStyle:{width:"80px","text-align":"center"}},[i("a",{attrs:{href:t.adminUrl,target:"_blank"}},[e._v(e._s(e.$t("Edit")))])]):e._e(),i("el-dropdown-item",{staticStyle:{width:"80px","text-align":"center"},nativeOn:{click:function(i){return e.delP(t)}}},[i("span",{staticClass:" tx-danger"},[e._v(e._s(e.$t("Delete")))])]),i("el-dropdown-item",{staticStyle:{"text-align":"center"},nativeOn:{click:function(i){return e.checkPice(t)}}},[i("el-link",{attrs:{type:"primary"}},[e._v(e._s(e.$t("price check")))])],1),i("el-dropdown-item",{staticStyle:{width:"80px","text-align":"center"},nativeOn:{click:function(i){return e.publishSet(t)}}},[i("el-link",{attrs:{type:"primary"}},[e._v(e._s(e.$t("publish")))])],1)],1)],1),t.productUrl?i("a",{staticStyle:{color:"#5c6ac4"},attrs:{href:t.productUrl,target:"_blank"}},[e._v(" "+e._s(e.$t("Open in website"))+" "),i("i",{staticClass:"fa fa-share-square-o",attrs:{"aria-hidden":"true"}})]):e._e()],1),i("div",{staticStyle:{position:"relative","padding-bottom":"100%","margin-bottom":"15px"}},[i("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{lazy:"",fit:"contain",src:t.imgUrl,"preview-src-list":[t.imgUrl]}})],1),i("div",{staticClass:"info"},[i("div",{staticClass:"p-name tx-ellipsis2"},[e._v(e._s(t.name))]),t.minShopPrice||t.maxShopPrice?i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Retail price"))+":")]),t.minShopPrice==t.maxShopPrice?i("span",[e._v(e._s(t.currency)+" "+e._s(t.minShopPrice))]):i("span",[e._v(e._s(t.currency)+" "+e._s(t.ShopminPrice)+" - "+e._s(t.ShopmaxPrice))])]):i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Retail price"))+":")]),i("span",[e._v(e._s(e.$t("NOT SET"))+" ")])]),t.minPrice||t.maxPrice?i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Supplier price"))+":")]),t.minPrice==t.maxPrice?i("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice)))]):i("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice))+" - "+e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.maxPrice)))])]):i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Supplier price"))+":")]),i("span",[e._v(e._s(e.$t("NOT SET"))+" ")])]),i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Shopify store"))+":")]),e._v(" "+e._s(t.shopName?t.shopName:"Unknown")+" ")]),i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Vendors"))+":")]),e._v(" "+e._s(t.vendorCnt)+" ")])])])])}))],2)],1)],1),e.items.length?i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:" d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e(),i("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},r=[],s=(i("a4d3"),i("e01a"),i("b0c0"),i("a9e3"),i("ac1f"),i("5319"),i("159b"),i("5530")),o={data:function(){return{loading:!1,tableHeight:800,reSizeTime:0,pageSizes:[12,24,48],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_productsPerPage")?Number(localStorage.getItem("c_productsPerPage")):12,items:[],total:0,totalPage:0,filterParams:{name:"",relationshipId:"",priceFrom:void 0,priceTo:void 0,accountId:""},filterParamsDefault:"{}",selectLoading:!1,selectArr:[],selectLoading2:!1,selectArr2:[],updateProductLoading:!1,cnow:0,now:Date.parse(new Date)/1e3-this.$store.state.userInfo.timeDiff,updateTime:localStorage.getItem("c_products-updateTime")?Number(localStorage.getItem("c_products-updateTime")):0}},watch:{$route:"gotoPage"},mounted:function(){var e=this;this.cnow=setInterval((function(){e.now=Date.parse(new Date)/1e3-e.$store.state.userInfo.timeDiff}),1e3),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem(),window.onresize=function(){e.$getTableHeight(e)}},beforeDestroy:function(){window.onresize=function(){}},methods:{formatminute:function(e){return moment.duration(e/60,"minutes").locale("en").humanize()},updateProducts:function(){var e=this;this.updateProductLoading=!0,this.$apiCall("api.ShopifyAccount.getProductByHand",{},(function(t){e.updateProductLoading=!1,"9999"==t.ErrorCode?(e.updateTime=t.Data.Results,localStorage.setItem("c_products-updateTime",t.Data.Results),e.$elementMessage("Update Product Success","success")):e.$elementMessage(t.Message,"error")}))},delP:function(e){var t=this;this.$confirm(this.$t("Are you sure you want to delete it?"),"",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"error"}).then((function(){t.$apiCall("api.Product.deleteByUser",{id:e.id},(function(e){9999==e.ErrorCode?(t.$message({message:"deleted successfully",type:"success"}),t.getItem(!0)):t.$elementMessage(e.Message,"error")}))})).catch((function(){}))},remoteMethodStores:function(e){var t=this;this.selectArr2=[],e&&(this.selectLoading2=!0,this.$apiCall("api.Invoice.findStores",{shopName:e},(function(e){t.selectLoading2=!1,9999==e.ErrorCode?t.selectArr2=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},remoteMethodVendor:function(e){var t=this;this.selectArr=[],e&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByCustomer",{name:e},(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.selectArr=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},checkPice:function(e){var t=this,i={url:e.productUrl,name:e.name,minPrice:e.minPrice,maxPrice:e.maxPrice,description:e.description,imgUrlJson:e.imgsJson};this.$apiCall("api.OfferProduct.addByCustomer",i,(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.$message({message:e.Message,type:"success"}):t.$message({message:e.Message,type:"error"})}))},getItem:function(e){var t=this;this.loading=!0,this.$apiCall("api.Product.findByUser",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterParams.name,relationshipId:this.filterParams.relationshipId,priceFrom:this.filterParams.priceFrom,priceTo:this.filterParams.priceTo,accountId:this.filterParams.accountId},(function(i){t.loading=!1,"9999"==i.ErrorCode?(t.items=[],i.Data.Results.forEach((function(e){e.imgUrl=JSON.parse(e.imgsJson).length?JSON.parse(e.imgsJson)[0]:"",e.adminUrl=e.adminUrl.replace(/\\/g,""),e.productUrl=e.productUrl.replace(/\\/g,""),t.items.push(e)})),t.total=Number(i.Data.Pagination.totalCount),t.totalPage=Number(i.Data.Pagination.totalPage),t.$getTableHeight(t),e||(t.$refs.gridTable.$el.scrollTop=0)):t.$elementMessage(i.Message,"error")}))},clearFilter:function(){this.filterParams=JSON.parse(this.filterParamsDefault),this.selectLoading=!1,this.selectArr=[],this.selectLoading2=!1,this.selectArr2=[],1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},publishSet:function(e){var t=this,i={url:e.adminUrl,name:e.name,minPrice:e.minShopPrice,maxPrice:e.maxShopPrice,description:e.description,imgUrlJson:e.imgsJson,bundlingShopifyId:e.id,bundlingAccountId:e.shopifyId};this.$apiCall("api.OfferProduct.addByCustomer",Object(s["a"])({},i),(function(e){9999==e.ErrorCode&&t.$message.success("publish Success!")}))},filterGetItem:function(){1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_productsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}},n=o,l=(i("825e"),i("2877")),c=Object(l["a"])(n,a,r,!1,null,"0789fe06",null);t["default"]=c.exports}}]);
//# sourceMappingURL=Products.4d4725d7.js.map