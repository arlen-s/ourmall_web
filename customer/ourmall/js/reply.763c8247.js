(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reply"],{2533:function(e,t,i){"use strict";i("efc2")},7062:function(e,t,i){},"857a":function(e,t,i){var r=i("1d80"),a=/"/g;e.exports=function(e,t,i,l){var s=String(r(e)),o="<"+t;return""!==i&&(o+=" "+i+'="'+String(l).replace(a,"&quot;")+'"'),o+">"+s+"</"+t+">"}},9911:function(e,t,i){"use strict";var r=i("23e7"),a=i("857a"),l=i("af03");r({target:"String",proto:!0,forced:l("link")},{link:function(e){return a(this,"a","href",e)}})},af03:function(e,t,i){var r=i("d039");e.exports=function(e){return r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},bf36:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"search-reply"}},[i("div",{staticClass:"pagetitle"},[e._m(0),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:e.addClick}},[e._v("Publish")])],1)]),i("el-card",[i("el-row",[i("el-form",{attrs:{mode:e.filterParams,inline:!0,size:"mini"}},[i("el-form-item",{attrs:{label:"Trade name"}},[i("el-input",{attrs:{placeholder:"Please enter"},model:{value:e.filterParams.name,callback:function(t){e.$set(e.filterParams,"name",t)},expression:"filterParams.name"}})],1),i("el-form-item",{attrs:{label:"Date"}},[i("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","default-time":["00:00:00","23:59:59"],"range-separator":"-","start-placeholder":"Start date","end-placeholder":"End date"},on:{change:e.dateChange},model:{value:e.dateArr,callback:function(t){e.dateArr=t},expression:"dateArr"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.getItems}},[e._v("Query")]),i("el-button",{attrs:{type:"warning"},on:{click:e.ResetClick}},[e._v("Reset")])],1)],1)],1),i("el-divider"),i("el-row",[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],attrs:{data:e.items}},[i("el-table-column",{attrs:{label:"Product title",prop:"name"}}),i("el-table-column",{attrs:{label:"Picture"},scopedSlots:e._u([{key:"default",fn:function(e){return[i("el-image",{staticClass:"image-size",attrs:{src:e.row.imgUrlJson[0],fit:"contain","preview-src-list":[e.row.imgUrlJson[0]]}})]}}])}),i("el-table-column",{attrs:{label:"Expected Price"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$showSybmol())+" "+e._s(e.$exchangeRate(t.row.minPrice))+" - "+e._s(e.$exchangeRate(t.row.maxPrice))+" ")]}}])}),i("el-table-column",{attrs:{label:"Product link",prop:"url"}}),i("el-table-column",{attrs:{label:"Description",prop:"description"}}),i("el-table-column",{attrs:{label:"Creation date"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.moment.unix(t.row.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),i("el-table-column",{attrs:{label:"Operation"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.detailClick(t.row)}}},[e._v("Details")])]}}])})],1)],1),i("el-row",{staticClass:"pagination"},[i("el-pagination",{attrs:{"current-page":e.pagination.currentPage,"page-sizes":[10,20,30],"page-size":e.pagination.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),i("el-dialog",{attrs:{title:"Search product",visible:e.publishVisible,"close-on-click-modal":!1,width:"800px","before-close":e.publishClose},on:{"update:visible":function(t){e.publishVisible=t}}},[i("div",{staticClass:"publish"},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.publishForm,rules:e.publishRules,"label-width":"180px"}},[i("el-form-item",{attrs:{label:"Picture:",prop:"imgUrl"}},[i("el-input",{staticStyle:{display:"none"},model:{value:e.publishForm.imgUrl,callback:function(t){e.$set(e.publishForm,"imgUrl",t)},expression:"publishForm.imgUrl"}}),i("el-upload",{ref:"upload",attrs:{action:"","list-type":"picture-card",limit:5,"before-upload":e.onBeforeUpload,"http-request":e.Upload,"on-remove":e.handleRemove}},[i("i",{staticClass:"el-icon-plus"})]),i("div",[e._v("You can only upload 5 pictures")])],1),i("el-form-item",{attrs:{label:"Product Title:",prop:"title"}},[i("el-input",{attrs:{size:"small"},model:{value:e.publishForm.title,callback:function(t){e.$set(e.publishForm,"title",t)},expression:"publishForm.title"}})],1),i("el-row",[i("el-col",{attrs:{span:6}},[i("el-form-item",{attrs:{label:"Price Range:",prop:"priceFrom"}},[i("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},model:{value:e.publishForm.priceFrom,callback:function(t){e.$set(e.publishForm,"priceFrom",t)},expression:"publishForm.priceFrom"}})],1)],1),i("el-col",{attrs:{span:17}},[i("el-form-item",{attrs:{label:"——",prop:"priceTo"}},[i("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},model:{value:e.publishForm.priceTo,callback:function(t){e.$set(e.publishForm,"priceTo",t)},expression:"publishForm.priceTo"}}),i("span",{staticStyle:{color:"#ccc"}},[e._v(" $ *Price units default to US dollars ")])],1)],1)],1),i("el-form-item",{attrs:{label:"Product Links:"}},[i("el-input",{attrs:{size:"small"},model:{value:e.publishForm.link,callback:function(t){e.$set(e.publishForm,"link",t)},expression:"publishForm.link"}})],1),i("el-form-item",{attrs:{label:"Product Description:"}},[i("el-input",{attrs:{type:"textarea",size:"small",rows:4},model:{value:e.publishForm.description,callback:function(t){e.$set(e.publishForm,"description",t)},expression:"publishForm.description"}})],1)],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.publishClose}},[e._v("Cancel")]),i("el-button",{attrs:{type:"primary"},on:{click:e.publish}},[e._v("Publish")])],1)])],1)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"left"},[i("div",{staticClass:"title title-color"},[i("h2",[e._v("Store products")])])])}],l=(i("a4d3"),i("e01a"),i("a434"),i("b0c0"),i("a9e3"),i("d3b7"),i("ac1f"),i("466d"),i("1276"),i("9911"),i("159b"),i("5530")),s={data:function(){var e=function(e,t,i){if(!t)return i(new Error("Please enter price"));i()};return{tableLoading:!1,filterParams:{name:"",status:"",createdFrom:"",createdTo:""},dateArr:[],pagination:{currentPage:1,pageSize:10,totalCount:0},items:[],publishVisible:!1,publishForm:{imgUrl:"",title:"",priceFrom:"",priceTo:"",link:"",description:""},publishRules:{imgUrl:[{required:!0,message:"Please upload pictures"}],title:[{required:!0,message:"Please enter title"}],priceFrom:[{required:!0,message:"Please enter price",trigger:"blur"}],priceTo:[{validator:e,trigger:"blur"}]},fileList:[],base64:"",ext:"",file:null,index:0}},created:function(){},mounted:function(){this.getItems()},methods:{detailClick:function(e){this.$router.push({path:"/search-product/d",query:{id:e.id}})},addClick:function(){this.publishVisible=!0},dateChange:function(e){e?(this.filterParams.createdFrom=e[0],this.filterParams.createdTo=e[1]):(this.filterParams.createdFrom="",this.filterParams.createdTo="")},handleCurrentChange:function(e){this.pagination.currentPage=e,this.getItems()},handleSizeChange:function(e){this.pagination.pageSize=e,this.getItems()},ResetClick:function(){this.filterParams={name:"",status:"",createdFrom:"",createdTo:""},this.dateArr=[],this.getItems()},getItems:function(){var e=this;this.tableLoading=!0,this.$apiCall("api.OfferProduct.findByCustomer",{status:"1",nameLike:this.filterParams.name||"",timeCreatedFrom:this.filterParams.createdFrom,timeCreatedTo:this.filterParams.createdTo,rowsPerPage:this.pagination.pageSize||10,page:this.pagination.currentPage||1},(function(t){e.tableLoading=!1,9999==t.ErrorCode?(e.items=t.Data.Results,e.pagination.totalCount=Number(t.Data.Pagination.totalCount)):e.$elementMessage(t.Message,"error")}))},publishClose:function(){this.publishForm={imgUrl:"",title:"",priceFrom:"",priceTo:"",link:"",description:""},this.$refs.upload.clearFiles(),this.$refs["ruleForm"].resetFields(),this.publishVisible=!1},publish:function(){var e=this,t=!1;if(this.$refs["ruleForm"].validate((function(e){console.log(e),e&&(t=!0)})),t){var i=[];this.fileList.forEach((function(e){i.push(e.imgUrl)}));var r={url:this.publishForm.link,name:this.publishForm.title,minPrice:this.publishForm.priceFrom,maxPrice:this.publishForm.priceTo,description:this.publishForm.description,imgUrlJson:i};this.$apiCall("api.OfferProduct.addByCustomer",Object(l["a"])({},r),(function(t){9999==t.ErrorCode&&(e.publishForm={title:"",priceFrom:"",priceTo:"",link:"",description:"",imgUrl:""},e.$refs.upload.clearFiles(),e.$refs["ruleForm"].resetFields(),e.fileList=[],e.getItems(),e.$message.success("publish Success!"),e.publishVisible=!1)}))}},onBeforeUpload:function(e){this.file=e,this.index=e.uid},Upload:function(){var e=this,t=this.file,i=function(e){return new Promise((function(t,i){var r=new FileReader;r.readAsDataURL(e),r.onload=function(e){t(this.result)}}))};i(t).then((function(t){var i=t,r=i.match(/data:image\/(.*);base64,.*/);e.ext=r[1],e.base64=i.split("base64,").pop(),e.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:e.base64,ext:e.ext},(function(t){9999==t.ErrorCode&&(e.fileList.push({index:e.index,imgUrl:t.Data.Results.imgUrl}),e.publishForm.imgUrl=t.Data.Results.imgUrl,e.index++)}))}))},handleRemove:function(e){var t=this;this.fileList.forEach((function(i,r){i.index==e.uid&&t.fileList.splice(r,1)})),0==this.fileList.length&&(this.publishForm.imgUrl="")}}},o=s,n=(i("2533"),i("f6e7"),i("2877")),c=Object(n["a"])(o,r,a,!1,null,"14059817",null);t["default"]=c.exports},efc2:function(e,t,i){},f6e7:function(e,t,i){"use strict";i("7062")}}]);
//# sourceMappingURL=reply.763c8247.js.map