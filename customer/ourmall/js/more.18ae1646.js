(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["more"],{"4c5a":function(t,e,i){},"610e":function(t,e,i){"use strict";i("4c5a")},"6b14":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.allLoading,expression:"allLoading"}],staticClass:"contentpanel box"},[i("div",{ref:"pageHeader",staticClass:"pagetitle",staticStyle:{"padding-right":"0","flex-wrap":"wrap"}},[i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-s-goods"}),i("h2",[t._v(t._s(t.$root.$children[0].pName.a)+" Products Market")])])]),i("el-row",{staticStyle:{"margin-right":"20px"},attrs:{gutter:20}},[i("el-col",{attrs:{span:21}},[i("div",{staticStyle:{"margin-top":"5px"}},[i("el-input",{staticClass:"input-with-select",staticStyle:{"min-width":"550px"},attrs:{placeholder:"Search products"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},[i("el-select",{attrs:{slot:"append",placeholder:"IN ALL CATEGORIES"},on:{change:t.search},slot:"append",model:{value:t.categoryId,callback:function(e){t.categoryId=e},expression:"categoryId"}},[i("el-option",{attrs:{label:"IN ALL CATEGORIES",value:""}}),t._l(t.commodityTypeMoreList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2),i("el-button",{attrs:{slot:"prepend",icon:"el-icon-search"},slot:"prepend"})],1)],1)]),i("el-col",{attrs:{span:3}},[i("el-button",{staticStyle:{"margin-top":"4px"},attrs:{type:"primary"},on:{click:function(e){return t.search()}}},[t._v("SEARCH")])],1)],1),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.quotation()}}},[i("i",{staticClass:"el-icon-plus"}),t._v(" Request Quotation ")])],1)],1),i("div",{staticClass:"pagetitle",staticStyle:{height:"53px"}},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/find-products"}}},[t._v(t._s(t.$root.$children[0].pName.a)+" Products Market")]),this.content?i("el-breadcrumb-item",[i("span",[t._v("Keywords "),i("b",[t._v(t._s(this.content))]),t._v(" results")]),this.content&&this.categoryId?i("span",[t._v(" in "+t._s(this.categoryId))]):t._e()]):this.categoryId||this.content?i("el-breadcrumb-item",[t._v(" "+t._s(this.categoryId)+" ")]):i("el-breadcrumb-item",[t._v(" IN ALL CATEGORIES ")])],1)],1),t.items&&0==t.items.length?i("div",{staticStyle:{width:"100%"}},[i("el-card",[i("b",[t._v("There are no products in this category")])])],1):i("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"body-style":"padding:20px 0 20px 0;"}},[i("div",{staticClass:"list"},t._l(t.items,(function(e){return i("el-col",{key:e.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[i("div",{staticClass:"pro_box"},[i("div",{staticClass:"pro_img"},[i("div",{staticClass:"img-wrap"},[i("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{fit:"cover",src:e.imgUrl},on:{click:function(i){return t.goToDetail(e)}}})],1)]),i("div",{staticClass:"pro_name",on:{click:function(i){return t.goToDetail(e)}}},[i("a",{attrs:{href:"javescript:;"}},[t._v(t._s(e.name))])]),i("div",{staticClass:"price"},[i("span",{staticClass:"pro_cost"},[t._v(t._s(t.$showSybmol())+" "+t._s(t.$exchangeRate(e.cost)))])]),i("div",{staticClass:"imports"}),i("div",{staticStyle:{display:"flex",width:"100%","justify-content":"center","margin-top":"15px"}},[i("el-dropdown",[i("el-button",{attrs:{type:"primary"}},[t._v(" Add to Import List"),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==e.hasImport},nativeOn:{click:function(i){return t.import_pro(e,i)}}},[t._v("Add to Import List")]),i("el-dropdown-item",{nativeOn:{click:function(i){return t.goToDetail(e)}}},[t._v("Add to Cart")])],1)],1)],1)])])})),1)])],1),t.items.length?i("el-row",{staticStyle:{margin:"20px 0"},attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e(),i("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),i("Quotation",{attrs:{visible:t.visible},on:{"update:visible":function(e){t.visible=e}}}),i("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},o=[],s=(i("b0c0"),i("a9e3"),i("159b"),i("ea9d")),r={props:{},data:function(){return{categoryId:null,name:"",items:[],commodityTypeMoreList:[],page:this.$route.query.page?Number(this.$route.query.page):"1",rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,pageSizes:[12,24,48],total:0,totalPage:0,input:"",content:"",visible:!1,loading:!0,allLoading:!0,ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0}}},mounted:function(){this.categoryId=this.$route.query.id,this.input=this.$route.query.input,this.content=this.input,this.getCategory()},watch:{$route:"gotoPage"},components:{Quotation:s["a"]},methods:{quotation:function(){this.visible=!0},goToDetail:function(t){var e=$(".el-breadcrumb__inner").eq(1).text();this.$router.push({name:"productDetail",query:{id:t.id,name:t.name,moreName:e}})},getCategory:function(){var t=this;this.$apiCall("api.VendorShop.getAllCategorys",{},(function(e){9999==e.ErrorCode&&(t.commodityTypeMoreList=e.Data.Results,t.getItems())}))},getItems:function(){var t=this;this.loading=!0,this.allLoading=!0,this.commodityTypeMoreList.forEach((function(e){e.name==t.categoryId&&(t.categoryId=e.id)})),this.$apiCall("api.VendorShop.findProducts",{name:this.input,categoryId:this.categoryId,page:this.page,rowsPerPage:this.rowsPerPage},(function(e){t.allLoading=!1,t.loading=!1,t.commodityTypeMoreList.forEach((function(e){e.id==t.categoryId&&(t.name=e.name,t.categoryId=e.name)})),t.items=e.Data.Results,t.total=e.Data.Pagination.totalCount,t.totalPage=e.Data.Pagination.totalPage,t.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0}))},search:function(){this.content=this.input,this.$router.push({query:{page:1,input:this.content,id:this.categoryId}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getItems()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.categoryId=this.$route.query.id,this.input=this.$route.query.input,this.getItems()},toPage:function(t){if(t!=this.$route.query.page){var e={};e.page=t,this.$route.query.id&&(e.id=this.$route.query.id),this.$route.query.input&&(e.input=this.$route.query.input),this.$router.push({name:"more",query:e})}},import_pro:function(t,e){var i=this;this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(a){if(9999==a.ErrorCode){t.hasImport=1,t.imports++,i.$message.success("Import Success !"),i.ball.x=e.clientX,i.ball.y=e.clientY,setTimeout((function(){i.ball.opacity=1}),500);var o=function(t){var e=t.offsetTop,i=t.offsetLeft,a=t.offsetParent;while(null!==a)e+=a.offsetTop,i+=a.offsetLeft,a=a.offsetParent;return{left:i,top:e}},s=o(document.querySelector("[data-name='Import List']"));setTimeout((function(){i.ball.x=s.left+65,i.ball.y=s.top+15}),1e3),setTimeout((function(){i.ball.opacity=0}),1500)}else i.$message.error(a.Message)}))}},computed:{product:function(){var t=this,e="";return this.commodityTypeMoreList.forEach((function(i){i.id==t.categoryId&&(e=i.name)})),e}}},n=r,l=(i("adea"),i("2877")),c=Object(l["a"])(n,a,o,!1,null,"fedfe1aa",null);e["default"]=c.exports},"80e8":function(t,e,i){},adea:function(t,e,i){"use strict";i("80e8")},ea9d:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{title:"Request a quotation for products",visible:t.openCardDialog},on:{"update:visible":function(e){t.openCardDialog=e},close:t.closeDialog}},[i("el-divider"),t.imgView?i("div",{staticClass:"proQuotation"},[i("div",{staticClass:"quotationTit"},[t._v("products for quotation")]),i("div",{staticStyle:{display:"flex"}},[i("div",{staticClass:"imgList"},t._l(t.imgList,(function(t){return i("img",{key:t,staticClass:"upload imgItem",attrs:{src:t}})})),0),i("div",{staticClass:"upload",on:{click:t.openForm}},[i("i",{staticClass:"el-icon-plus"})])])]):t._e(),t.isForm?i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"formRole"},[i("div",{staticClass:"quotationTit"},[t._v("Product information")]),i("el-form",{attrs:{model:t.form,"label-position":"left","label-width":"150px"}},[i("el-form-item",{attrs:{label:"Product images:",required:""}},[i("div",{staticClass:"upload",on:{click:t.uploadOpen}},[t.form.imgUrl?i("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.form.imgUrl,fit:"cover"}}):i("i",{staticClass:"el-icon-plus"})],1)]),i("el-form-item",{attrs:{label:"Details:",required:""}},[i("el-input",{attrs:{placeholder:"Product name / URL / description or anything you can tell us"},model:{value:t.form.details,callback:function(e){t.$set(t.form,"details",e)},expression:"form.details"}})],1),i("el-form-item",{attrs:{label:"Expected price (US$):"}},[i("el-input-number",{attrs:{controls:!1},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),i("el-form-item",{attrs:{label:"Remarks:"}},[i("el-input",{attrs:{placeholder:"Leave your message that you want to tell "+t.$root.$children[0].pName.a+" Vendors"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),i("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.saveQuotation}},[t._v("Save")])],1):t._e(),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("Submit Request")]),i("el-button",{on:{click:t.closeQuotation}},[t._v("Discard")])],1)],1),i("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(e){return t.Base64(e)}}})],1)},o=[],s=(i("ac1f"),i("466d"),i("1276"),{props:{visible:{type:Boolean,default:!1}},data:function(){return{form:{imgUrl:"",details:"",price:void 0,remark:""},imgView:!1,outerVisible:!1,innerVisible:!1,isForm:!0,loading:!1,dialogVisible:!1,imgList:[],detailsList:[],priceList:[],remarkList:[]}},computed:{openCardDialog:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},mounted:function(){},methods:{openForm:function(){var t=this;this.isForm=!0,this.loading=!0,setTimeout((function(){t.loading=!1}),800)},uploadOpen:function(){document.getElementById("imgFile").click()},Base64:function(t){var e=this;if(t.target.value){var i=new FileReader,a=new Image,o="";i.onload=function(t){a.src=t.target.result;var e=t.target.result.match(/data:image\/(.*);base64,.*/);o=e[1]},a.onload=function(i){base64Image({file:t.target,callback:function(t){var i=t.split("base64,").pop();e.uploadImgBase64(i,o)}})},i.readAsDataURL(t.target.files[0])}},uploadImgBase64:function(t,e){var i=this;this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:t,ext:e},(function(t){i.loading=!1,9999==t.ErrorCode?i.form.imgUrl=t.Data.Results.imgUrl:i.$message.error(t.Message)}))},saveQuotation:function(){return""==this.form.imgUrl?(this.$message.error("Please select a picture !"),!1):""==this.form.details?(this.$message.error("Please fill in the details !"),!1):(this.imgView=!0,this.isForm=!1,this.imgList.push(this.form.imgUrl),this.detailsList.push(this.form.details),this.priceList.push(this.form.price),this.remarkList.push(this.form.remark),void(this.form={imgUrl:"",details:"",price:void 0,remark:""}))},closeQuotation:function(){this.openCardDialog=!1,this.form={imgUrl:"",details:"",price:void 0,remark:""},this.imgList=[],this.detailsList=[],this.priceList=[],this.remarkList=[],this.isForm=!0,this.imgView=!1},closeDialog:function(){this.closeQuotation()},submit:function(){for(var t=this,e=[],i=0;i<this.imgList.length;i++)e.push({detail:this.detailsList[i],imgUrl:this.imgList[i],expectPrice:this.priceList[i],remarks:this.remarkList[i]});this.$apiCall("api.OfferList.genOfferProduct",{products:e},(function(e){9999==e.ErrorCode?(t.$message.success("Submit Success !"),t.closeQuotation(),t.$router.push("/Waiting-for-vendors-respond")):t.$message.error(e.Message)}))}},components:{}}),r=s,n=(i("610e"),i("2877")),l=Object(n["a"])(r,a,o,!1,null,"6167711f",null);e["a"]=l.exports}}]);
//# sourceMappingURL=more.18ae1646.js.map