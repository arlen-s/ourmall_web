(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Products"],{"3fca":function(e,t,i){},"420c":function(e,t,i){"use strict";i("3fca")},"857a":function(e,t,i){var r=i("1d80"),s=/"/g;e.exports=function(e,t,i,a){var o=String(r(e)),l="<"+t;return""!==i&&(l+=" "+i+'="'+String(a).replace(s,"&quot;")+'"'),l+">"+o+"</"+t+">"}},9911:function(e,t,i){"use strict";var r=i("23e7"),s=i("857a"),a=i("af03");r({target:"String",proto:!0,forced:a("link")},{link:function(e){return s(this,"a","href",e)}})},af03:function(e,t,i){var r=i("d039");e.exports=function(e){return r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},e6dc:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"contentpanel products-page"},[i("div",{ref:"pageHeader",staticClass:"pagetitle"},[i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-shopping-bag-1"}),i("h2",[e._v(e._s(e.$t("Products")))])])]),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary",size:"medium",loading:e.updateProductLoading},on:{click:e.updateProducts}},[i("span",{staticClass:" mg-r-10"}),e._v(" "+e._s(e.$t("Update Product"))+" ")])],1)]),i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[i("el-card",[i("el-row",{attrs:{gutter:20}},[i("div",{ref:"pageFilter",staticClass:"page-filter"},[i("el-form",{attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"Product name"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.name,callback:function(t){e.$set(e.filterParams,"name",t)},expression:"filterParams.name"}})],1),i("el-form-item",[i("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodStores,loading:e.selectLoading2,placeholder:"Enter Store name"},on:{change:e.filterGetItem},model:{value:e.filterParams.accountId,callback:function(t){e.$set(e.filterParams,"accountId",t)},expression:"filterParams.accountId"}},e._l(e.selectArr2,(function(e){return i("el-option",{key:e.id,attrs:{label:e.shopName?e.shopName:"---",value:e.id}})})),1)],1),i("el-form-item",{staticStyle:{"margin-right":"15px"}},[i("el-select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethodVendor,loading:e.selectLoading,placeholder:e.$t("Enter vendor name")},on:{change:e.filterGetItem},model:{value:e.filterParams.relationshipId,callback:function(t){e.$set(e.filterParams,"relationshipId",t)},expression:"filterParams.relationshipId"}},e._l(e.selectArr,(function(e){return i("el-option",{key:e.id,attrs:{label:e.vendorName,value:e.id}})})),1)],1),i("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price from"}},[i("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceFrom,callback:function(t){e.$set(e.filterParams,"priceFrom",t)},expression:"filterParams.priceFrom"}})],1),i("el-form-item",[e._v(" - ")]),i("el-form-item",{staticStyle:{width:"190px"},attrs:{label:"Price to"}},[i("el-input-number",{staticStyle:{width:"110px"},attrs:{"controls-position":"right",min:0,precision:2},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.priceTo,callback:function(t){e.$set(e.filterParams,"priceTo",t)},expression:"filterParams.priceTo"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v(e._s(e.$t("Filter")))]),i("el-button",{attrs:{type:"danger"},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear")))])],1)],1)],1)]),i("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px","overflow-y":"auto"},style:{height:e.tableHeight+"px"},attrs:{gutter:10}},[e.items.length?e._e():i("el-col",[i("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[e._v(e._s(e.$t("no product")))])]),e._l(e.items,(function(t){return i("el-col",{key:t.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"d-flex justify-content-between mg-b-10"},[i("el-dropdown",{attrs:{size:"mini"}},[i("span",{staticClass:"el-dropdown-link"},[e._v(" "+e._s(e.$t("All Action"))),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t.adminUrl?i("el-dropdown-item",{staticStyle:{width:"80px","text-align":"left"}},[i("a",{attrs:{href:t.adminUrl,target:"_blank"}},[e._v(e._s(e.$t("Edit")))])]):e._e(),i("el-dropdown-item",{staticStyle:{width:"80px","text-align":"left"},nativeOn:{click:function(i){return e.delP(t)}}},[i("span",{staticClass:" tx-danger"},[e._v(e._s(e.$t("Delete")))])]),i("el-dropdown-item",{staticStyle:{width:"auto","text-align":"left"},nativeOn:{click:function(i){return e.checkPice(t)}}},[i("el-link",{attrs:{type:"primary"}},[e._v(e._s(e.$t("price check")))])],1),i("el-dropdown-item",{staticStyle:{width:"auto","text-align":"left"},nativeOn:{click:function(i){return e.handleShop(t)}}},[i("el-link",{attrs:{type:"primary"}},[e._v(e._s(e.$t("add related products")))])],1)],1)],1),t.productUrl?i("a",{staticStyle:{color:"#5c6ac4"},attrs:{href:t.productUrl,target:"_blank"}},[e._v(" "+e._s(e.$t("Open in website"))+" "),i("i",{staticClass:"fa fa-share-square-o",attrs:{"aria-hidden":"true"}})]):e._e()],1),i("div",{staticStyle:{position:"relative","padding-bottom":"100%","margin-bottom":"15px"}},[i("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{lazy:"",fit:"contain",src:t.imgUrl,"preview-src-list":[t.imgUrl]}})],1),i("div",{staticClass:"info"},[i("div",{staticClass:"p-name tx-ellipsis2"},[e._v(e._s(t.name))]),t.minShopPrice||t.maxShopPrice?i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Retail price"))+":")]),t.minShopPrice==t.maxShopPrice?i("span",[e._v(e._s(t.currency)+" "+e._s(t.minShopPrice))]):i("span",[e._v(e._s(t.currency)+" "+e._s(t.ShopminPrice)+" - "+e._s(t.ShopmaxPrice))])]):i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Retail price"))+":")]),i("span",[e._v(e._s(e.$t("NOT SET"))+" ")])]),t.minPrice||t.maxPrice?i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Supplier price"))+":")]),t.minPrice==t.maxPrice?i("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice)))]):i("span",[e._v(e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.minPrice))+" - "+e._s(e.$store.state.country.symbol)+" "+e._s(e.$exchangeRate(t.maxPrice)))])]):i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Supplier price"))+":")]),i("span",[e._v(e._s(e.$t("NOT SET"))+" ")])]),i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Shopify store"))+":")]),e._v(" "+e._s(t.shopName?t.shopName:"Unknown")+" ")]),i("div",[i("span",{staticClass:" mg-r-10",staticStyle:{color:"#909399"}},[e._v(e._s(e.$t("Vendors"))+":")]),e._v(" "+e._s(t.vendorCnt)+" ")])])])])}))],2)],1)],1),e.items.length?i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:" d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":e.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e(),i("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}}),i("el-dialog",{attrs:{title:"Search product",visible:e.publishVisible,"close-on-click-modal":!1,width:"800px","before-close":e.publishClose},on:{"update:visible":function(t){e.publishVisible=t}}},[i("div",{staticClass:"publish"},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.publishForm,rules:e.publishRules,"label-width":"180px"}},[i("el-form-item",{attrs:{label:"Picture:",prop:"imgUrl"}},[i("el-input",{staticStyle:{display:"none"},model:{value:e.publishForm.imgUrl,callback:function(t){e.$set(e.publishForm,"imgUrl",t)},expression:"publishForm.imgUrl"}}),i("el-upload",{ref:"upload",attrs:{action:"","list-type":"picture-card",limit:5,"before-upload":e.onBeforeUpload,"http-request":e.Upload,"on-remove":e.handleRemove}},[i("i",{staticClass:"el-icon-plus"})]),i("div",[e._v(e._s(e.$t("You can only upload 5 pictures")))])],1),e.publishForm.linkImg?i("el-form-item",{attrs:{label:"link Picture:"}},[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.publishForm.linkImg,fit:"fit"}})],1):e._e(),i("el-form-item",{attrs:{label:"Product Title:",prop:"title"}},[i("el-input",{attrs:{size:"small"},model:{value:e.publishForm.title,callback:function(t){e.$set(e.publishForm,"title",t)},expression:"publishForm.title"}})],1),i("el-form-item",{attrs:{label:"Product Type:"}},[i("el-radio-group",{model:{value:e.publishForm.productType,callback:function(t){e.$set(e.publishForm,"productType",t)},expression:"publishForm.productType"}},[i("el-radio",{attrs:{label:1}},[e._v("card")]),i("el-radio",{attrs:{label:2}},[e._v("package logo")]),i("el-radio",{attrs:{label:3}},[e._v("product logo")]),i("el-radio",{attrs:{label:4}},[e._v("other features")])],1)],1),i("el-row",[i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"Price Range:",prop:"priceFrom"}},[i("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},model:{value:e.publishForm.priceFrom,callback:function(t){e.$set(e.publishForm,"priceFrom",t)},expression:"publishForm.priceFrom"}})],1)],1),i("el-col",{attrs:{span:17}},[i("el-form-item",{attrs:{label:"——",prop:"priceTo"}},[i("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},model:{value:e.publishForm.priceTo,callback:function(t){e.$set(e.publishForm,"priceTo",t)},expression:"publishForm.priceTo"}}),i("span",{staticStyle:{color:"#ccc"}},[e._v(" "+e._s(e.$store.state.country.symbol)+" *"+e._s(e.$t("Price units default to"))+" "+e._s(e.$store.state.country.shopCurrency)+" ")])],1)],1)],1),i("el-form-item",{attrs:{label:"Product Links:"}},[i("el-input",{attrs:{size:"small"},model:{value:e.publishForm.link,callback:function(t){e.$set(e.publishForm,"link",t)},expression:"publishForm.link"}})],1),i("el-form-item",{attrs:{label:"Product Description:"}},[i("el-input",{attrs:{type:"textarea",size:"small",rows:4},model:{value:e.publishForm.description,callback:function(t){e.$set(e.publishForm,"description",t)},expression:"publishForm.description"}})],1)],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.publishClose}},[e._v(e._s(e.$t("Cancel")))]),i("el-button",{attrs:{type:"primary"},on:{click:e.publish}},[e._v(e._s(e.$t("Publish")))])],1)])],1)},s=[],a=(i("a4d3"),i("e01a"),i("a434"),i("b0c0"),i("a9e3"),i("d3b7"),i("ac1f"),i("466d"),i("5319"),i("1276"),i("9911"),i("159b"),i("5530")),o={data:function(){var e=function(e,t,i){if(!t)return i(new Error("Please enter price"));i()};return{loading:!1,tableHeight:800,publishVisible:!1,publishForm:{imgUrl:"",title:"",priceFrom:"",priceTo:"",link:"",description:"",productType:"",linkImg:this.$route.query.imgUrl,id:this.$route.query.productId},tempShopItem:{},publishRules:{imgUrl:[{required:!0,message:this.$t("Please upload pictures")}],title:[{required:!0,message:this.$t("Please enter title")}],priceFrom:[{required:!0,message:this.$t("Please enter price"),trigger:"blur"}],priceTo:[{validator:e,trigger:"blur"}]},reSizeTime:0,pageSizes:[12,24,48],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_productsPerPage")?Number(localStorage.getItem("c_productsPerPage")):12,items:[],total:0,totalPage:0,filterParams:{name:"",relationshipId:"",priceFrom:void 0,priceTo:void 0,accountId:""},fileList:[],base64:"",ext:"",file:null,index:0,urlParams:"",filterParamsDefault:"{}",selectLoading:!1,selectArr:[],selectLoading2:!1,selectArr2:[],updateProductLoading:!1,cnow:0,now:Date.parse(new Date)/1e3-this.$store.state.userInfo.timeDiff,updateTime:localStorage.getItem("c_products-updateTime")?Number(localStorage.getItem("c_products-updateTime")):0}},watch:{$route:"gotoPage"},mounted:function(){var e=this;this.cnow=setInterval((function(){e.now=Date.parse(new Date)/1e3-e.$store.state.userInfo.timeDiff}),1e3),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem(),window.onresize=function(){e.$getTableHeight(e)}},beforeDestroy:function(){window.onresize=function(){}},methods:{formatminute:function(e){return moment.duration(e/60,"minutes").locale("en").humanize()},updateProducts:function(){var e=this;this.updateProductLoading=!0,this.$apiCall("api.ShopifyAccount.getProductByHand",{},(function(t){e.updateProductLoading=!1,"9999"==t.ErrorCode?(e.updateTime=t.Data.Results,localStorage.setItem("c_products-updateTime",t.Data.Results),e.$elementMessage("Update Product Success","success")):e.$elementMessage(t.Message,"error")}))},delP:function(e){var t=this;this.$confirm(this.$t("Are you sure you want to delete it?"),"",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"error"}).then((function(){t.$apiCall("api.Product.deleteByUser",{id:e.id},(function(e){9999==e.ErrorCode?(t.$message({message:"deleted successfully",type:"success"}),t.getItem(!0)):t.$elementMessage(e.Message,"error")}))})).catch((function(){}))},publishClose:function(){this.publishForm={imgUrl:"",title:"",priceFrom:"",priceTo:"",link:"",description:"",id:"",productType:""},this.$refs.upload.clearFiles(),this.$refs["ruleForm"].resetFields(),this.publishVisible=!1},publish:function(){var e=this,t=!1;if(this.$refs["ruleForm"].validate((function(e){console.log(e),e&&(t=!0)})),t){var i=[];this.fileList.forEach((function(e){i.push(e.imgUrl)}));var r={url:this.publishForm.link,name:this.publishForm.title,minPrice:this.publishForm.priceFrom,maxPrice:this.publishForm.priceTo,description:this.publishForm.description,imgUrlJson:i,productType:this.publishForm.productType,bundlingAccountId:this.tempShopItem.accountId,bundlingShopifyId:this.tempShopItem.shopifyId};this.$apiCall("api.OfferProduct.addByCustomer",Object(a["a"])({},r),(function(t){9999==t.ErrorCode&&(e.publishForm={title:"",priceFrom:"",priceTo:"",link:"",productType:"",description:"",imgUrl:""},e.$refs.upload.clearFiles(),e.$refs["ruleForm"].resetFields(),e.fileList=[],e.$message.success("publish Success!"),e.publishVisible=!1)}))}},onBeforeUpload:function(e){this.file=e,this.index=e.uid},Upload:function(){var e=this,t=this.file,i=function(e){return new Promise((function(t,i){var r=new FileReader;r.readAsDataURL(e),r.onload=function(e){t(this.result)}}))};i(t).then((function(t){var i=t,r=i.match(/data:image\/(.*);base64,.*/);e.ext=r[1],e.base64=i.split("base64,").pop(),e.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:e.base64,ext:e.ext},(function(t){9999==t.ErrorCode&&(e.fileList.push({index:e.index,imgUrl:t.Data.Results.imgUrl}),e.publishForm.imgUrl=t.Data.Results.imgUrl,e.index++)}))}))},handleRemove:function(e){var t=this;this.fileList.forEach((function(i,r){i.index==e.uid&&t.fileList.splice(r,1)})),0==this.fileList.length&&(this.publishForm.imgUrl="")},remoteMethodStores:function(e){var t=this;this.selectArr2=[],e&&(this.selectLoading2=!0,this.$apiCall("api.Invoice.findStores",{shopName:e},(function(e){t.selectLoading2=!1,9999==e.ErrorCode?t.selectArr2=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},remoteMethodVendor:function(e){var t=this;this.selectArr=[],e&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByCustomer",{name:e},(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.selectArr=e.Data.Results:t.$message({message:e.Message,type:"error"})})))},checkPice:function(e){var t=this,i={url:e.productUrl,name:e.name,minPrice:e.minPrice,maxPrice:e.maxPrice,description:e.description,imgUrlJson:e.imgsJson};this.$apiCall("api.OfferProduct.addByCustomer",i,(function(e){t.selectLoading=!1,9999==e.ErrorCode?t.$message({message:e.Message,type:"success"}):t.$message({message:e.Message,type:"error"})}))},handleShop:function(e){this.publishVisible=!0,this.tempShopItem=e},getItem:function(e){var t=this;this.loading=!0,this.$apiCall("api.Product.findByUser",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterParams.name,relationshipId:this.filterParams.relationshipId,priceFrom:this.filterParams.priceFrom,priceTo:this.filterParams.priceTo,accountId:this.filterParams.accountId},(function(i){t.loading=!1,"9999"==i.ErrorCode?(t.items=[],i.Data.Results.forEach((function(e){e.imgUrl=JSON.parse(e.imgsJson).length?JSON.parse(e.imgsJson)[0]:"",e.adminUrl=e.adminUrl.replace(/\\/g,""),e.productUrl=e.productUrl.replace(/\\/g,""),t.items.push(e)})),t.total=Number(i.Data.Pagination.totalCount),t.totalPage=Number(i.Data.Pagination.totalPage),t.$getTableHeight(t),e||(t.$refs.gridTable.$el.scrollTop=0)):t.$elementMessage(i.Message,"error")}))},clearFilter:function(){this.filterParams=JSON.parse(this.filterParamsDefault),this.selectLoading=!1,this.selectArr=[],this.selectLoading2=!1,this.selectArr2=[],1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},publishSet:function(e){var t=this,i={url:e.adminUrl,name:e.name,minPrice:e.minShopPrice,maxPrice:e.maxShopPrice,description:e.description,imgUrlJson:e.imgsJson,bundlingShopifyId:e.id,bundlingAccountId:e.shopifyId};this.$apiCall("api.OfferProduct.addByCustomer",Object(a["a"])({},i),(function(e){9999==e.ErrorCode&&t.$message.success("publish Success!")}))},filterGetItem:function(){1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_productsPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}},l=o,n=(i("420c"),i("2877")),c=Object(n["a"])(l,r,s,!1,null,"90642062",null);t["default"]=c.exports}}]);
//# sourceMappingURL=Products.c8e02c32.js.map