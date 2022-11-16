(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Products"],{"94bb":function(e,t,a){},d11a:function(e,t,a){"use strict";a("94bb")},e6dc:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel products-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[e._m(0),a("div",{staticClass:"right"},[a("el-button",{attrs:{disabled:!!(e.updateTime&&e.updateTime>e.now),type:"primary",size:"medium",loading:e.updateProductLoading},on:{click:e.updateProducts}},[e.updateTime&&e.updateTime>e.now?a("span",{staticClass:" mg-r-10"},[e._v(" ("+e._s(e.formatminute(e.updateTime-e.now))+") ")]):e._e(),e._v(" Update Product ")])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[a("el-card",[a("el-row",{attrs:{gutter:20}},[a("div",{ref:"pageFilter",staticClass:"page-filter"},[a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"Product name"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.name,callback:function(t){e.$set(e.filterParams,"name",t)},expression:"filterParams.name"}})],1),a("el-form-item",[a("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodStores,loading:e.selectLoading2,placeholder:"Enter Store name"},on:{change:e.filterGetItem},model:{value:e.filterParams.accountId,callback:function(t){e.$set(e.filterParams,"accountId",t)},expression:"filterParams.accountId"}},e._l(e.selectArr2,(function(e){return a("el-option",{key:e.id,attrs:{label:e.shopName?e.shopName:"---",value:e.id}})})),1)],1),a("el-form-item",{staticStyle:{"margin-right":"15px"}},[a("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodVendor,loading:e.selectLoading,placeholder:"Enter vendor name"},on:{change:e.filterGetItem},model:{value:e.filterParams.relationshipId,callback:function(t){e.$set(e.filterParams,"relationshipId",t)},expression:"filterParams.relationshipId"}},e._l(e.selectArr,(function(e){return a("el-option",{key:e.id,attrs:{label:e.vendorName,value:e.id}})})),1)],1),a("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price from"}},[a("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceFrom,callback:function(t){e.$set(e.filterParams,"priceFrom",t)},expression:"filterParams.priceFrom"}})],1),a("el-form-item",[e._v(" - ")]),a("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price to"}},[a("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceTo,callback:function(t){e.$set(e.filterParams,"priceTo",t)},expression:"filterParams.priceTo"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v("Filter")]),a("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v("Clear")])],1)],1)],1)]),a("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px","overflow-y":"auto"},style:{height:e.tableHeight+"px"},attrs:{gutter:10}},[e.items.length?e._e():a("el-col",[a("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[e._v("no product")])]),e._l(e.items,(function(t){return a("el-col",{key:t.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[a("div",{staticClass:"product-box"},[a("div",{staticClass:"d-flex justify-content-between mg-b-10"},[a("el-dropdown",{attrs:{size:"mini"}},[a("span",{staticClass:"el-dropdown-link"},[e._v(" All Action"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t.adminUrl?a("el-dropdown-item",{staticStyle:{width:"80px","text-align":"center"}},[a("a",{attrs:{href:t.adminUrl,target:"_blank"}},[e._v("Edit")])]):e._e(),a("el-dropdown-item",{staticStyle:{width:"80px","text-align":"center"},nativeOn:{click:function(a){return e.delP(t)}}},[a("span",{staticClass:" tx-danger"},[e._v("Delete")])])],1)],1),t.productUrl?a("a",{staticStyle:{color:"#5c6ac4"},attrs:{href:t.productUrl,target:"_blank"}},[e._v(" Open in website "),a("i",{staticClass:"fa fa-share-square-o",attrs:{"aria-hidden":"true"}})]):e._e()],1),a("div",{staticStyle:{position:"relative","padding-bottom":"100%","margin-bottom":"15px"}},[a("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{lazy:"",fit:"contain",src:t.imgUrl,"preview-src-list":[t.imgUrl]}})],1),a("div",{staticClass:"info"},[a("div",{staticClass:"p-name tx-ellipsis2"},[e._v(e._s(t.name))]),t.minShopPrice||t.maxShopPrice?a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Retail price:")]),t.minShopPrice==t.maxShopPrice?a("span",[e._v(e._s(t.currency)+" "+e._s(t.minShopPrice))]):a("span",[e._v(e._s(t.currency)+" "+e._s(t.ShopminPrice)+" - "+e._s(t.ShopmaxPrice))])]):a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Retail price:")]),a("span",[e._v(" NOT SET")])]),t.minPrice||t.maxPrice?a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Supplier price:")]),t.minPrice==t.maxPrice?a("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice)))]):a("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice))+" - "+e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.maxPrice)))])]):a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Supplier price:")]),a("span",[e._v(" NOT SET")])]),a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Shopify store:")]),e._v(" "+e._s(t.shopName?t.shopName:"Unknown")+" ")]),a("div",[a("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v("Vendors:")]),e._v(" "+e._s(t.vendorCnt)+" ")])])])])}))],2)],1)],1),e.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:" d-flex justify-content-center",attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e(),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-shopping-bag-1"}),a("h2",[e._v("Products")])])])}],s=(a("b0c0"),a("a9e3"),a("ac1f"),a("5319"),a("159b"),{data:function(){return{loading:!1,tableHeight:800,reSizeTime:0,pageSizes:[12,24,48],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_productsPerPage")?Number(localStorage.getItem("c_productsPerPage")):12,items:[],total:0,totalPage:0,filterParams:{name:"",relationshipId:"",priceFrom:void 0,priceTo:void 0,accountId:""},filterParamsDefault:"{}",selectLoading:!1,selectArr:[],selectLoading2:!1,selectArr2:[],updateProductLoading:!1,cnow:0,now:Date.parse(new Date)/1e3-this.$store.state.userInfo.timeDiff,updateTime:localStorage.getItem("c_products-updateTime")?Number(localStorage.getItem("c_products-updateTime")):0}},watch:{$route:"gotoPage"},mounted:function(){var e=this;this.cnow=setInterval((function(){e.now=Date.parse(new Date)/1e3-e.$store.state.userInfo.timeDiff}),1e3),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem(),window.onresize=function(){e.$getTableHeight(e)}},beforeDestroy:function(){window.onresize=function(){}},methods:{formatminute:function(e){return moment.duration(e/60,"minutes").locale("en").humanize()},updateProducts:function(){var e=this;this.updateProductLoading=!0,this.$apiCall("api.ShopifyAccount.getProductByHand",{},(function(t){e.updateProductLoading=!1,"9999"==t.ErrorCode?(e.updateTime=t.Data.Results,localStorage.setItem("c_products-updateTime",t.Data.Results),e.$elementMessage("Update Product Success","success")):e.$elementMessage(t.Message,"error")}))},delP:function(e){var t=this;this.$confirm("Are you sure you want to delete it?","",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"error"}).then((function(){t.$apiCall("api.Product.deleteByUser",{id:e.id},(function(e){9999==e.ErrorCode?(t.$message({message:"deleted successfully",type:"success"}),t.getItem(!0)):t.$elementMessage(e.Message,"error")}))})).catch((function(){}))},remoteMethodStores:function(e){var t=this;this.selectArr2=[],e&&(this.selectLoading2=!0,this.$apiCall("api.Invoice.findStores",{shopName:e},(function(e){t.selectLoading2=!1,9999==e.ErrorCode?t.selectArr2=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},remoteMethodVendor:function(e){var t=this;this.selectArr=[],e&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByCustomer",{name:e},(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.selectArr=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},getItem:function(e){var t=this;this.loading=!0,this.$apiCall("api.Product.findByUser",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterParams.name,relationshipId:this.filterParams.relationshipId,priceFrom:this.filterParams.priceFrom,priceTo:this.filterParams.priceTo,accountId:this.filterParams.accountId},(function(a){t.loading=!1,"9999"==a.ErrorCode?(t.items=[],a.Data.Results.forEach((function(e){e.imgUrl=JSON.parse(e.imgsJson).length?JSON.parse(e.imgsJson)[0]:"",e.adminUrl=e.adminUrl.replace(/\\/g,""),e.productUrl=e.productUrl.replace(/\\/g,""),t.items.push(e)})),t.total=Number(a.Data.Pagination.totalCount),t.totalPage=Number(a.Data.Pagination.totalPage),t.$getTableHeight(t),e||(t.$refs.gridTable.$el.scrollTop=0)):t.$elementMessage(a.Message,"error")}))},clearFilter:function(){this.filterParams=JSON.parse(this.filterParamsDefault),this.selectLoading=!1,this.selectArr=[],this.selectLoading2=!1,this.selectArr2=[],1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},filterGetItem:function(){1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_productsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}}),o=s,n=(a("d11a"),a("2877")),l=Object(n["a"])(o,r,i,!1,null,"7e995031",null);t["default"]=l.exports}}]);
//# sourceMappingURL=Products.b259f551.js.map