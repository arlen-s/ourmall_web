(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods-mgr"],{"17cb":function(t,e,a){"use strict";a("5f4c")},"2c08":function(t,e,a){"use strict";a("49c9")},"2f0f":function(t,e,a){},"3c4b":function(t,e,a){},"416f":function(t,e,a){"use strict";a("cb95")},"49c9":function(t,e,a){},"5f4c":function(t,e,a){},"6e8b":function(t,e,a){"use strict";a("2f0f")},"765a":function(t,e,a){},"954b":function(t,e,a){"use strict";a("765a")},ad38:function(t,e,a){"use strict";a("3c4b")},cb95:function(t,e,a){},d81d:function(t,e,a){"use strict";var s=a("23e7"),o=a("b727").map,i=a("1dde"),r=i("map");s({target:"Array",proto:!0,forced:!r},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},f694:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel goods-mgr-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"el-icon-s-goods"}),a("h2",[t._v(t._s(t.$t("goods.商品管理")))])])]),a("div",{staticClass:"right"},[t.exportBtn.isShow?a("el-badge",{staticClass:"export-btn",attrs:{hidden:!t.exportBtn.process.status,type:t.exportBtn.process.status?t.exportBtn.process.statusObj[t.exportBtn.process.status].type:"info",value:t.exportBtn.process.status?t.exportBtn.process.statusObj[t.exportBtn.process.status].txt:""}},[a("el-link",{staticClass:" mg-r-15",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.openDialogExport}},[t._v(t._s(t.$t("goods.导出产品")))])],1):t._e(),a("el-link",{staticClass:" mg-r-30",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.openDialogImport}},[t._v(t._s(t.$t("goods.导入产品")))]),a("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.goto("AddGoods")}}},[t._v(t._s(t.$t("goods.新增产品")))]),a("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.collectGoods()}}},[t._v(t._s(t.$t("goods.采集商品")))])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-card",[a("el-row",[a("el-col",{ref:"pageTabs",attrs:{span:24}},[t.$root.$children[0].vipNowDetail&&t.$root.$children[0].vipNowDetail.productCnt?a("div",{staticStyle:{position:"absolute",right:"0"}},[t._v(" "+t._s(t.$t("package.当前版本支持上架商品数为：{num1}个SPU，目前剩余{num2}个",{num1:t.$root.$children[0].vipNowDetail.productCnt,num2:t.$root.$children[0].vipNowDetail.nowProductCnt}))+" ")]):t._e(),a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("goods.全部"),name:"GoodsMgrAll"}}),a("el-tab-pane",{attrs:{label:t.$t("goods.已上架"),name:"GoodsMgrOn"}}),a("el-tab-pane",{attrs:{label:t.$t("goods.已下架"),name:"GoodsMgrOff"}})],1)],1),a("el-col",{attrs:{span:24}},[a("router-view",{key:t.pageKey,ref:"subPage",attrs:{loading:t.loading,items:t.items,categroyArr:t.selectCategroyArr,filterData:t.filterData},on:{goto:t.goto,changeStatus:t.changeStatus,changeStatusAll:t.changeStatusAll,delSelected:t.delSelected,filterGetItem:t.filterGetItem,clearFilter:t.clearFilter,openChangeCategory:t.openChangeCategory,openVisiableCus:t.openVisiableCus}}),a("div",{ref:"tableFooter"},[t.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",{staticStyle:{position:"relative",top:"10px"}},[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1)],1)],1),a("DialogExport",{attrs:{data:t.dialogExportData,filterData:t.filterData,exportTime:t.exportTime},on:{runExport:t.runExport,resetExport:t.resetExport,breakDown:t.breakDown}}),a("DialogImport",{attrs:{data:t.dialogImportData},on:{uploadSuccess:t.uploadSuccess}}),a("dialogVisibleCus",{attrs:{keyData:t.dialogVisibleCustomers}}),t.$root.$children[0].vipNowDetail&&t.$root.$children[0].vipNowDetail.productCnt?[a("el-dialog",{attrs:{visible:t.dialogVipUp,width:"400px"},on:{close:function(e){t.dialogVipUp=!1}}},[a("el-divider"),a("div",{staticStyle:{padding:"20px","font-size":"18px","line-height":"36px"}},[t._v("您当前的商品上架数量已达"+t._s(t.$root.$children[0].vipNowDetail.productCnt)+"个，是否进行套餐升级？")]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVipUp=!1}}},[t._v(t._s(t.$t("shop.取消")))])],1)],1)]:t._e(),a("DialogSelectCategory",{attrs:{data:t.dialogSelectCategoryData,categroyArr:t.selectCategroyArr}}),a("DialogCollect",{attrs:{data:t.collectGoodsData},on:{collectSuccess:t.collectSuccess}})],2)},o=[],i=(a("a9e3"),a("b0c0"),a("e9c4"),a("d3b7"),a("159b"),a("d81d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.导出商品"),width:"400px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),t.data.step?t._e():a("div",{staticClass:"d-body"},[a("h2",[t._v(t._s(t.$t("goods.导出范围")))]),a("el-radio-group",{model:{value:t.data.method,callback:function(e){t.$set(t.data,"method",e)},expression:"data.method"}},[a("el-radio",{attrs:{label:"selected"}},[t._v(t._s(t.$t("goods.所选商品")))]),a("el-radio",{attrs:{label:"search"}},[t._v(t._s(t.$t("goods.当前筛选搜索的商品")))]),a("el-radio",{attrs:{label:"all"}},[t._v(t._s(t.$t("goods.所有商品")))])],1)],1),1==t.data.step?a("div",{staticClass:"progress-body"},[a("p",[t._v(t._s(t.$t("goods.关闭本弹窗不影响文件生成，文件生成后将通知您")))]),a("div",{staticClass:"progress-wrap"},[a("el-progress",{attrs:{type:"circle",percentage:parseInt(t.data.process.execNum/t.data.process.totalNum*100),width:80,color:"#535fb0"}})],1)]):t._e(),2==t.data.step?a("div",{staticClass:"success-body"},[1==t.data.process.status?[a("div",{staticClass:"progress-wrap"},[a("el-progress",{attrs:{type:"circle",percentage:100,width:80,"show-text":!1,color:"#67C23A"}}),a("i",{staticClass:"el-icon-check"})],1),a("p",{staticClass:" mg-b-10"},[t._v(t._s(t.$t("goods.文件已生成")))]),a("p",{staticClass:" mg-b-10"},[t._v("下载："),a("el-link",{attrs:{type:"primary",href:t.data.process.uploadUrl,target:"_blank"}},[t._v(t._s(t.data.process.uploadUrl))])],1),a("p",{staticStyle:{color:"#909399","font-size":"12px"}},[t._v(t._s(t.$t("goods.下载文件只保存12小时")))])]:t._e(),2==t.data.process.status?[a("div",{staticClass:"progress-wrap"},[a("el-progress",{attrs:{type:"circle",percentage:100,width:80,"show-text":!1,color:"#f56c6c"}}),a("i",{staticClass:"el-icon-close",staticStyle:{color:"#f56c6c"}})],1),a("p",{staticClass:" mg-b-10",staticStyle:{color:"#f56c6c"}},[t._v(t._s(t.$t("goods.文件生成失败，请重试")))])]:t._e()],2):t._e(),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.exportTime?[a("el-button",{on:{click:t.breakDown}},[t._v(t._s(t.$t("goods.中止")))]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.收起")))])]:[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),t.data.step?t._e():a("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:t.exportProducts}},[t._v(t._s(t.$t("goods.确定")))]),2==t.data.step?a("el-button",{attrs:{type:"primary"},on:{click:t.reset}},[t._v(t._s(t.$t("goods.新建导出")))]):t._e()]],2)],1)}),r=[],l={props:["data","filterData","exportTime"],methods:{exportProducts:function(){switch(this.data.method){case"selected":if(this.$parent.$refs.subPage&&this.$parent.$refs.subPage.checkboxArr.length){var t={method:"selected",productIds:this.$parent.$refs.subPage.checkboxArr};this.runExport(t)}else this.$message({message:this.$t("goods.请选择一个商品"),type:"error"});break;case"search":var e={method:"search",name:this.filterData.name,categoryId:this.filterData.categoryId,status:"GoodsMgrAll"==this.$route.name?"":"GoodsMgrOn"==this.$route.name?"1":"2",costFrom:this.filterData.costFrom,costTo:this.filterData.costTo};this.runExport(e);break;case"all":var a={method:"all"};this.runExport(a);break}},runExport:function(t){this.$emit("runExport",t)},reset:function(){this.$emit("resetExport")},breakDown:function(){this.$emit("breakDown")}}},n=l,c=(a("6e8b"),a("2877")),d=Object(c["a"])(n,i,r,!1,null,"ca8e1054",null),p=d.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.导入商品"),width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[t.data.filePath?a("div",{staticClass:"path"},[a("p",{staticClass:" mg-b-20 tx-ellipsis3"},[t._v(t._s(t.data.filePath))]),a("div",{staticClass:" tx-center"},[a("el-link",{attrs:{type:"danger"},on:{click:t.clearFile}},[a("i",{staticClass:"el-icon-delete"})])],1)]):a("a",{staticClass:"i-btn",attrs:{href:"javascript:;"},on:{click:t.openUpload}},[a("i",{staticClass:"el-icon-upload"}),a("p",[t._v(t._s(t.$t("goods.选择文件")))])]),a("div",{staticClass:"right"},[a("p",{staticClass:"t1"},[a("span",[t._v(t._s(t.$t("goods.点击下载")))]),t._v(" "),a("el-link",{attrs:{type:"primary",href:"./file/importGood.xlsx",target:"_blank"}},[t._v(t._s(t.$t("goods.商品导入模板")))])],1),a("p",{staticClass:"t2"},[t._v(" "+t._s(t.$t("goods.请按规范填写表格，仅支持xlsx格式文件"))+" ")]),a("p",{staticClass:"t2",domProps:{innerHTML:t._s(t.$t("goods.上传的文件不能超过 2M，只处理前 <b>99</b> 条数据。"))}})])]),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"uploadXls",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},on:{change:function(e){return t.fileUpload(e)}}}),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),a("el-button",{attrs:{type:"primary",loading:t.data.loading,disabled:!t.data.file},on:{click:t.apiUpload}},[t._v(t._s(t.$t("goods.提交")))])],1)],1)},u=[],h={props:["data"],methods:{clearFile:function(){this.data.file=null,this.data.filePath="",document.getElementById("uploadXls").value=""},fileUpload:function(t){this.data.file=t.target.files[0],this.data.filePath=t.target.value,t.target.value=""},apiUpload:function(){var t=this;this.data.file.size>2097152?this.$message({message:this.$t("goods.文件不能大于10MB"),type:"error"}):this.data.file?(this.$set(this.data,"loading",!0),0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>'),this.$apiCall("api.VendorShop.deliverImportProduct",{"@file":this.data.file},(function(e){t.$set(t.data,"loading",!1),9999==e.ErrorCode?e.Data.Results.file?(t.$emit("uploadSuccess","error"),document.getElementById("ifilePro").src=e.Data.Results.file):t.$emit("uploadSuccess"):t.$message({message:e.Message,type:"error"})}))):this.$message({message:this.$t("goods.请上传文件"),type:"error"})},openUpload:function(){document.getElementById("uploadXls").click()}}},f=h,m=(a("416f"),Object(c["a"])(f,g,u,!1,null,"74405bc4",null)),y=m.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.$t("goods.指定客户可见"),visible:t.keyData.isShow,width:"600px","close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.keyData,"isShow",e)},open:t.open}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.keyData.items}},[a("el-table-column",{attrs:{label:t.$t("goods.客户邮箱")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(e.row.customer&&e.row.customer.email||"---"))])]}}])}),a("el-table-column",{attrs:{label:t.$t("goods.指定可见时间"),width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.$moment.unix(e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])})],1)],1),a("div",{staticClass:"d-flex",staticStyle:{"justify-content":"center",margin:"20px"}},[a("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"total, prev, pager, next",total:Number(t.total)},on:{"current-change":t.toPage}})],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.keyData.isShow=!1}}},[t._v(" "+t._s(t.$t("goods.关闭"))+" ")])],1)],1)},b=[],D={props:["keyData"],data:function(){return{page:1,rowsPerPage:10,total:0,totalPage:0,items:[]}},methods:{open:function(){this.page=1,this.tableRadio="",this.total=Number(this.keyData.Pagination.totalCount),this.totalPage=Number(this.keyData.Pagination.totalPage),this.items=this.keyData.items},toPage:function(t){var e=this;this.page=t,this.$showLoading(),this.$apiCall("api.VendorShop.getVisibleCustomers",{page:this.page,rowsPerPage:10,productId:this.keyData.pproductId},(function(t){"9999"==t.ErrorCode?(e.total=Number(t.Data.Pagination.totalCount),e.totalPage=Number(t.Data.Pagination.totalPage),e.items=t.Data.Results,$(".el-dialog__body").scrollTop(0)):e.$elementMessage(t.Message,"error"),e.$hideLoading()}))}}},C=D,x=(a("954b"),Object(c["a"])(C,v,b,!1,null,"525479ad",null)),_=x.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.修改商品类目"),"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("div",{staticClass:"d-flex"},[a("span",[t._v(t._s(t.$t("goods.将所选商品类目修改为："))+" ")]),a("el-cascader",{ref:"cascaderHandle",attrs:{size:"small",props:{expandTrigger:"hover",checkStrictly:!0},options:t.categroyArr,placeholder:t.$t("goods.商品分类")},on:{change:t.changeCategory},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.data;return a("span",{on:{click:t.clickNode}},[t._v(t._s(s.label))])}}]),model:{value:t.data.selected,callback:function(e){t.$set(t.data,"selected",e)},expression:"data.selected"}})],1)]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),a("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:t.save}},[t._v(t._s(t.$t("goods.保存")))])],1)],1)},P=[],w={props:["data","categroyArr"],computed:{categoryId:function(){var t="";return this.data.selected.length&&(t=this.data.selected[this.data.selected.length-1]),t}},methods:{save:function(){var t=this;if(this.categoryId){this.data.loading=!0;var e={ids:this.data.ids,categoryId:this.categoryId};this.$apiCall("api.VendorShop.batchModifyVendorProduct",e,(function(e){t.data.loading=!1,9999==e.ErrorCode?(t.$message({message:t.$t("goods.修改成功"),type:"success"}),t.data.isShow=!1,t.$parent.getItems()):t.$message({message:e.Message,type:"error"})}))}else this.$message({message:this.$t("goods.请先选择商品分类"),type:"error"})},changeCategory:function(){this.$refs.cascaderHandle.dropDownVisible=!1},clickNode:function(t){t.target.parentElement.parentElement.firstElementChild.click()}}},k=w,I=(a("2c08"),Object(c["a"])(k,S,P,!1,null,"c9bcf1bc",null)),E=I.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.采集商品"),width:"600px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)},open:function(e){return t.open()}}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("div",{staticClass:"d-flex mg-b-15"},[a("span",{staticClass:"mg-r-15"},[t._v(t._s(t.$t("category.商品类目")))]),a("el-cascader",{ref:"cascaderHandle",staticClass:" mg-r-15",attrs:{options:t.data.categroyArr,props:{expandTrigger:"hover",checkStrictly:!0},placeholder:t.$t("goods.商品分类"),size:"mini",filterable:"",clearable:"","show-all-levels":!1},on:{change:t.changeCategory},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.data;return a("span",{},[t._v(t._s(s.label))])}}]),model:{value:t.categroyPath,callback:function(e){t.categroyPath=e},expression:"categroyPath"}})],1),a("div",{staticClass:"mg-b-15"},[a("el-input",{attrs:{placeholder:t.$t("goods.请填写在线商品链接"),type:"textarea",resize:"none",autosize:{minRows:5,maxRows:10},size:"small"},on:{change:function(e){return t.addUrls()}},model:{value:t.urls,callback:function(e){t.urls=e},expression:"urls"}})],1),a("div",{},[t._v(" "+t._s(t.$t("goods.目前支持速卖通和亚马逊的商品采集"))+" ")])]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),a("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:function(e){return t.submitCollect()}}},[t._v(t._s(t.$t("goods.提交")))])],1)],1)},T=[],V=(a("ac1f"),a("5319"),a("1276"),a("4de4"),{props:["data"],data:function(){return{categroyPath:[],urls:""}},methods:{open:function(){this.categroyPath=[],this.urls=""},preText:function(t){return t.replace(/\r\n/g,"|||").replace(/\n/g,"|||").replace(/\s/g,"")},addUrls:function(){console.log(this.preText(this.urls))},changeCategory:function(){this.$refs.cascaderHandle.dropDownVisible=!1},submitCollect:function(){var t=this,e=this.preText(this.urls)?this.preText(this.urls).split("|||"):[];this.categroyPath?this.urls?(this.$set(this.data,"loading",!0),this.$apiCall("api.VendorShop.importProductByUrl",{urlList:e.filter((function(t){return t})),categoryId:this.categroyPath[this.categroyPath.length-1]},(function(e){t.$set(t.data,"loading",!1),9999==e.ErrorCode?t.$emit("collectSuccess"):t.$message({message:e.Message,type:"error"})}))):this.$message({message:this.$t("goods.请填写在线商品链接"),type:"error"}):this.$message({message:this.$t("goods.请先选择商品分类"),type:"error"})}}}),A=V,O=(a("ad38"),Object(c["a"])(A,N,T,!1,null,"03f07647",null)),U=O.exports,B={data:function(){return{dialogVisibleCustomers:{isShow:!1,items:[],Pagination:{},pproductId:""},dialogVipUp:!1,loading:!1,pageKey:(new Date).valueOf(),activeName:"",pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))?Number(localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))):10,items:[],total:0,totalPage:0,productTypeArr:this.$dict.productTypeArr,filterData:{name:"",nameIpt:"",categoryId:"",categroyPath:[],costFrom:"",costTo:"",costFromIpt:void 0,costToIpt:void 0,productType:"",spu:"",sku:""},defaultFilterData:"{}",dialogExportData:{isShow:!1,loading:!1,step:0,method:"selected",process:{status:"",totalNum:1,execNum:0,uploadUrl:""}},exportBtn:{isShow:!1,process:{status:"",statusObj:{1:{type:"success",txt:this.$t("goods.请下载")},2:{type:"danger",txt:this.$t("goods.失败")},3:{type:"warning",txt:this.$t("goods.请稍候")}}}},exportTime:0,defaultDialogExportData:"{}",dialogImportData:{loding:!1,isShow:!1,file:null,filePath:""},defaultDialogImportData:"{}",dialogSelectCategoryData:{isShow:!1,loading:!1,selected:[],ids:[]},defaultDialogSelectCategory:"{}",collectGoodsData:{isShow:!1,loading:!1,categroyArr:[]},defaultCollectGoodsData:"{}"}},components:{DialogExport:p,DialogImport:y,dialogVisibleCus:_,DialogSelectCategory:E,DialogCollect:U},computed:{selectCategroyArr:function(){var t=JSON.parse(JSON.stringify(this.$store.state.categroyArr));return t.forEach((function(t){t["children"]=t.list,t["value"]=t.id,t["label"]=t.name,t.children&&t.children.length&&t.children.forEach((function(t){t["children"]=t.list,t["value"]=t.id,t["label"]=t.name,t.children&&t.children.length&&t.children.forEach((function(t){t["value"]=t.id,t["label"]=t.name}))}))})),t}},watch:{$route:"gotoPage"},mounted:function(){this.$route.params.vip&&(this.dialogVipUp=!0),this.defaultDialogExportData=JSON.stringify(this.dialogExportData),this.defaultDialogImportData=JSON.stringify(this.dialogImportData),this.defaultFilterData=JSON.stringify(this.filterData),this.defaultDialogSelectCategory=JSON.stringify(this.dialogSelectCategoryData),this.defaultCollectGoodsData=JSON.stringify(this.collectGoodsData),this.activeName=this.$route.name,this.getCategroy(),this.getItems(),this.exportProcess()},methods:{collectGoods:function(){this.collectGoodsData.isShow=!0,this.collectGoodsData.categroyArr=this.selectCategroyArr},collectSuccess:function(){this.collectGoodsData.isShow=!1,this.$message({message:this.$t("goods.采集成功"),type:"success"}),this.toPage(1)},openVisiableCus:function(t){var e=this;this.$apiCall("api.VendorShop.getVisibleCustomers",{productId:t,page:1,rowsPerPage:10},(function(a){9999==a.ErrorCode?a.Data.Results.length&&(e.dialogVisibleCustomers.isShow=!0,e.dialogVisibleCustomers.items=a.Data.Results,e.dialogVisibleCustomers.Pagination=a.Data.Pagination,e.dialogVisibleCustomers.pproductId=t):e.$message({message:a.Message,type:"error"})}))},openChangeCategory:function(t){this.dialogSelectCategoryData=JSON.parse(this.defaultDialogSelectCategory),this.dialogSelectCategoryData.ids=t,this.dialogSelectCategoryData.isShow=!0},goToUP:function(){this.$router.push({name:"pricingUp"})},breakDown:function(){var t=this;clearInterval(this.exportTime),this.exportTime=0,this.exportBtn.process.status="",this.dialogExportData.isShow=!1,this.$apiCall("api.VendorShop.finishedExportProduct",{},(function(e){9999!=e.ErrorCode&&t.$message({message:t.$t("goods.中止导出失败"),type:"error"})}))},resetExport:function(){this.exportBtn.process.status="",this.$apiCall("api.VendorShop.finishedExportProduct",{},(function(t){})),this.openDialogExport()},exportProcess:function(){var t=this;this.$apiCall("api.VendorShop.exportProductProcess",{},(function(e){if(t.exportBtn.isShow=!0,9999==e.ErrorCode){var a=e.Data.Results;a&&3==a.status||(clearInterval(t.exportTime),t.exportTime=0),1==a.status&&(t.exportBtn.process.status=1,t.dialogExportData.step=2,t.dialogExportData.process.status=1,t.dialogExportData.process.uploadUrl=a.uploadUrl),2==a.status&&(t.exportBtn.process.status=2,t.dialogExportData.step=2,t.dialogExportData.process.status=2),3==a.status&&(t.exportBtn.process.status=3,t.dialogExportData.step=1,t.dialogExportData.process.status=3,t.dialogExportData.process.totalNum=a.totalNum,t.dialogExportData.process.execNum=a.execNum),a||(t.exportBtn.process.status="")}}))},runExport:function(t){var e=this;this.dialogExportData.loading=!0,t.page=1,this.$apiCall("api.VendorShop.searchExcelProducts",t,(function(t){})),this.dialogExportData.step=1,this.exportTime=setInterval((function(){e.exportProcess()}),1e3)},openDialogExport:function(){this.exportBtn.process.status||(this.dialogExportData=JSON.parse(this.defaultDialogExportData)),this.dialogExportData.isShow=!0},uploadSuccess:function(t){var e=this;setTimeout((function(){e.dialogImportData.isShow=!1,"error"==t?e.$message({message:t?e.$t("goods.导入失败，下载查看错误文件"):e.$t("goods.导入成功"),type:t?"error":"success"}):e.toPage(1)}),1e3)},openDialogImport:function(){this.dialogImportData=JSON.parse(this.defaultDialogImportData),this.dialogImportData.isShow=!0},filterGetItem:function(){this.filterData.name=this.filterData.nameIpt,this.filterData.categoryId=this.filterData.categroyPath[this.filterData.categroyPath.length-1],this.filterData.costFromIpt&&this.filterData.costToIpt&&this.filterData.costFromIpt>this.filterData.costToIpt&&(this.filterData.costToIpt=void 0),this.filterData.costFrom=this.filterData.costFromIpt,this.filterData.costTo=this.filterData.costToIpt,this.toPage(1)},clearFilter:function(t){switch(t){case"categoryId":this.filterData.categroyPath=[],this.filterData.categoryId="";break;case"name":this.filterData.nameIpt=this.filterData.name="";break;case"cost":this.filterData.costFromIpt=this.filterData.costToIpt=void 0,this.filterData.costFrom=this.filterData.costTo="";break;case"productType":this.filterData.productType="";break;case"sku":this.filterData.sku="";break;case"spu":this.filterData.spu="";break;default:this.filterData=JSON.parse(this.defaultFilterData)}"none"!=t&&this.toPage(1)},getItems:function(t){var e=this;this.loading=!0,this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterData.name,categoryId:this.filterData.categoryId,status:"GoodsMgrAll"==this.$route.name?"":"GoodsMgrOn"==this.$route.name?"1":"2",costFrom:this.filterData.costFrom,costTo:this.filterData.costTo,productType:this.filterData.productType,stockSku:this.filterData.sku,sku:this.filterData.spu},(function(a){e.loading=!1,9999==a.ErrorCode&&(e.$refs.subPage.checkboxArr=[],e.items=a.Data.Results.map((function(t){return t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t})),e.total=Number(a.Data.Pagination.totalCount),e.totalPage=Number(a.Data.Pagination.totalPage),t||(e.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0))}))},getCategroy:function(){var t=this;this.$store.state.categroyArr.length||this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},(function(e){9999==e.ErrorCode&&t.$store.commit("setCategroyArr",e.Data.Results)}))},delSelected:function(t){var e=this;this.loading=!0,this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"delete",productIds:t},(function(t){9999==t.ErrorCode?e.$refs.subPage.checkboxArr=[]:20210801==t.ErrorCode?e.dialogVipUp=!0:e.$message({message:t.Message,type:"error"}),e.getItems()}))},changeStatusAll:function(t,e){var a=this;this.loading=!0,this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"change",productIds:t,status:e?"1":"2"},(function(t){a.loading=!1,9999==t.ErrorCode?(a.$refs.subPage.checkboxArr=[],setTimeout((function(){a.$root.$children[0].getVipDetail()}),1e3),a.getItems()):20210801==t.ErrorCode?a.dialogVipUp=!0:a.$message({message:t.Message,type:"error"})}))},changeStatus:function(t){var e=this;this.loading=!0;var a="1"==t.status?"2":"1";this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"change",productIds:[t.id],status:a},(function(s){e.loading=!1,9999==s.ErrorCode?(t.status=a,setTimeout((function(){e.$root.$children[0].getVipDetail()}),1e3)):20210801==s.ErrorCode?e.dialogVipUp=!0:e.$message({message:s.Message,type:"error"}),t.statusIpt="1"==t.status}))},handleClick:function(t){t.name==this.$route.name?this.pageKey=(new Date).valueOf():(this.clearFilter("none"),this.$refs.subPage.checkboxArr=[],this.$router.push({name:t.name}))},goto:function(t){t&&this.$router.push({name:t})},gotoPage:function(){var t=this;this.page=this.$route.query.page?this.$route.query.page:1,this.$nextTick((function(){t.getItems()}))},toPage:function(t){t!=this.$route.query.page?this.$router.push({query:{page:t}}):this.getItems()},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("".concat(this.$route.name,"RowsPerPage"),t),this.getItems()}}},F=B,G=(a("17cb"),Object(c["a"])(F,s,o,!1,null,null,null));e["default"]=G.exports}}]);