(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods-mgr"],{"00ee":function(t,e,a){"use strict";var s=a("b622"),o=s("toStringTag"),r={};r[o]="z",t.exports="[object z]"===String(r)},"0ab3":function(t,e,a){},"0d97":function(t,e,a){},"16db":function(t,e,a){"use strict";a("cbaa")},"191e":function(t,e,a){"use strict";a("0d97")},"271a":function(t,e,a){"use strict";var s=a("cb2d"),o=a("e330"),r=a("577e"),i=a("d6d6"),l=URLSearchParams,n=l.prototype,d=o(n.getAll),c=o(n.has),p=new l("a=1");!p.has("a",2)&&p.has("a",void 0)||s(n,"has",(function(t){var e=arguments.length,a=e<2?void 0:arguments[1];if(e&&void 0===a)return c(this,t);var s=d(this,t);i(e,1);var o=r(a),l=0;while(l<s.length)if(s[l++]===o)return!0;return!1}),{enumerable:!0,unsafe:!0})},3455:function(t,e,a){"use strict";a("b4bc")},"3cd6":function(t,e,a){},5494:function(t,e,a){"use strict";var s=a("83ab"),o=a("e330"),r=a("edd0"),i=URLSearchParams.prototype,l=o(i.forEach);s&&!("size"in i)&&r(i,"size",{get:function(){var t=0;return l(this,(function(){t++})),t},configurable:!0,enumerable:!0})},"577e":function(t,e,a){"use strict";var s=a("f5df"),o=String;t.exports=function(t){if("Symbol"===s(t))throw new TypeError("Cannot convert a Symbol value to a string");return o(t)}},"883e":function(t,e,a){},"88a7f":function(t,e,a){"use strict";var s=a("cb2d"),o=a("e330"),r=a("577e"),i=a("d6d6"),l=URLSearchParams,n=l.prototype,d=o(n.append),c=o(n["delete"]),p=o(n.forEach),g=o([].push),u=new l("a=1&a=2&b=3");u["delete"]("a",1),u["delete"]("b",void 0),u+""!=="a=2"&&s(n,"delete",(function(t){var e=arguments.length,a=e<2?void 0:arguments[1];if(e&&void 0===a)return c(this,t);var s=[];p(this,(function(t,e){g(s,{key:e,value:t})})),i(e,1);var o,l=r(t),n=r(a),u=0,h=0,m=!1,f=s.length;while(u<f)o=s[u++],m||o.key===l?(m=!0,c(this,o.key)):h++;while(h<f)o=s[h++],o.key===l&&o.value===n||d(this,o.key,o.value)}),{enumerable:!0,unsafe:!0})},"916d":function(t,e,a){},b48d:function(t,e,a){"use strict";a("916d")},b4bc:function(t,e,a){},bce6:function(t,e,a){"use strict";a("0ab3")},cbaa:function(t,e,a){},cf4e:function(t,e,a){"use strict";a("3cd6")},d6d6:function(t,e,a){"use strict";var s=TypeError;t.exports=function(t,e){if(t<e)throw new s("Not enough arguments");return t}},ea8f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{},[e("el-col",{attrs:{span:24}},[e("router-view",{key:t.pageKey,ref:"subPage"})],1)],1)},o=[],r={components:{},data(){return{pageKey:(new Date).valueOf()}},computed:{},watch:{},methods:{},created(){},mounted(){},beforeCreate(){},beforeMount(){},beforeUpdate(){},updated(){},beforeDestroy(){},destroyed(){},activated(){}},i=r,l=a("2877"),n=Object(l["a"])(i,s,o,!1,null,"6b1080fb",null);e["default"]=n.exports},f23e:function(t,e,a){"use strict";a("883e")},f5df:function(t,e,a){"use strict";var s=a("00ee"),o=a("1626"),r=a("c6b6"),i=a("b622"),l=i("toStringTag"),n=Object,d="Arguments"===r(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(a){}};t.exports=s?r:function(t){var e,a,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(a=c(e=n(t),l))?a:d?r(e):"Object"===(s=r(e))&&o(e.callee)?"Arguments":s}},f694:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"contentpanel goods-mgr-page"},[e("div",{ref:"pageHeader",staticClass:"pagetitle"},[e("div",{staticClass:"left"},[e("div",{staticClass:"title"},[e("i",{staticClass:"el-icon-s-goods"}),e("h2",[t._v(t._s(t.$t("goods.商品管理")))])])]),e("div",{staticClass:"right"},["148982"!=t.vendorId&&"146428"!=t.vendorId&&"144875"!=t.vendorId&&"144843"!=t.vendorId&&"143779"!=t.vendorId&&143654!=t.vendorId&&"74"!=t.vendorId?e("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",size:"small"},on:{click:t.handleVat}},[t._v(" "+t._s(t.$t("goods.vat税设置")))]):t._e(),t.exportBtn.isShow?e("el-badge",{staticClass:"export-btn",attrs:{hidden:!t.exportBtn.process.status,type:t.exportBtn.process.status?t.exportBtn.process.statusObj[t.exportBtn.process.status].type:"info",value:t.exportBtn.process.status?t.exportBtn.process.statusObj[t.exportBtn.process.status].txt:""}},[e("el-link",{staticClass:"mg-r-15",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.openDialogExport}},[t._v(t._s(t.$t("goods.导出产品")))])],1):t._e(),"148982"!=t.vendorId&&"146428"!=t.vendorId&&"144875"!=t.vendorId&&"144843"!=t.vendorId&&"143779"!=t.vendorId&&143654!=t.vendorId&&"74"!=t.vendorId?e("el-link",{staticClass:"mg-r-30",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.openDialogImport}},[t._v(t._s(t.$t("goods.导入产品")))]):t._e(),e("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.goto("AddGoods")}}},[t._v(t._s(t.$t("goods.新增产品")))]),e("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.collectGoods()}}},[t._v(t._s(t.$t("goods.采集商品")))])],1)]),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[e("el-card",[e("el-row",[e("el-col",{ref:"pageTabs",attrs:{span:24}},[t.$root.$children[0].vipNowDetail&&t.$root.$children[0].vipNowDetail.productCnt?e("div",{staticStyle:{position:"absolute",right:"0"}},[t._v(t._s(t.$t("package.当前版本支持上架商品数为：{num1}个SPU，目前剩余{num2}个",{num1:t.$root.$children[0].vipNowDetail.productCnt,num2:t.$root.$children[0].vipNowDetail.nowProductCnt})))]):t._e(),e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:t.$t("goods.全部"),name:"GoodsMgrAll"}}),e("el-tab-pane",{attrs:{label:t.$t("goods.已上架"),name:"GoodsMgrOn"}},[e("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("goods.已上架"))+" "),e("el-badge",{staticClass:"item",attrs:{value:t.onSale,type:"primary"}})],1)]),e("el-tab-pane",{attrs:{label:t.$t("goods.已下架"),name:"GoodsMgrOff"}},[e("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("goods.已下架"))+" "),e("el-badge",{staticClass:"item",attrs:{value:t.offSale,type:"warning"}})],1)])],1)],1),e("el-col",{attrs:{span:24}},[e("router-view",{key:t.pageKey,ref:"subPage",attrs:{loading:t.loading,items:t.items,categroyArr:t.selectCategroyArr,filterData:t.filterData},on:{goto:t.goto,changeStatus:t.changeStatus,changeStatusAll:t.changeStatusAll,delSelected:t.delSelected,filterGetItem:t.filterGetItem,clearFilter:t.clearFilter,openChangeCategory:t.openChangeCategory,openVisiableCus:t.openVisiableCus}}),e("div",{ref:"tableFooter"},[t.items.length?e("el-row",{attrs:{gutter:20}},[e("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[e("div",{staticStyle:{position:"relative",top:"10px"}},[e("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1)],1)],1),e("el-dialog",{attrs:{title:t.$t("goods.vat税设置"),visible:t.showVatDialog,width:"40%"},on:{"update:visible":function(e){t.showVatDialog=e}}},[e("span",{staticClass:"fnn"},[e("i",[t._v(t._s(t.$t("是否开启vat税")))]),t._v(" "),e("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"rgb(237 237 237)"},model:{value:t.vatFlag,callback:function(e){t.vatFlag=e},expression:"vatFlag"}})],1),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.addCountry()}}},[t._v(t._s(t.$t("添加国家")))]),e("p",{staticClass:"error-tips"},[e("i",{staticClass:"el-icon-info"}),t._v(" "+t._s(t.$t("注：国家/国家二字码/vat税必填")))]),t.vatFlag?e("div",{staticStyle:{padding:"10px"}},[e("el-form",{ref:"formRef",attrs:{model:t.formData,rules:t.formData.rules}},[e("el-table",{staticClass:"catTable",staticStyle:{width:"95%","margin-left":"2.5%"},attrs:{data:t.formData.vatData,border:""}},[e("el-table-column",{attrs:{prop:"name",label:t.$t("goods.国家"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form-item",{attrs:{prop:"vatData."+a.$index+".name",rules:t.formData.rules.name}},[e("el-input",{model:{value:a.row.name,callback:function(e){t.$set(a.row,"name",e)},expression:"scope.row.name"}})],1)]}}],null,!1,739688290)}),e("el-table-column",{attrs:{prop:"code",label:t.$t("goods.国家二字码"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form-item",{attrs:{prop:"vatData."+a.$index+".name",rules:t.formData.rules.code}},[e("el-input",{model:{value:a.row.code,callback:function(e){t.$set(a.row,"code",e)},expression:"scope.row.code"}})],1)]}}],null,!1,839013858)}),e("el-table-column",{attrs:{prop:"type",label:t.$t("orders.类型"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form-item",{attrs:{prop:"vatData."+a.$index+".name",rules:t.formData.rules.type}},[e("el-select",{attrs:{placeholder:t.$t("orders.请选择类型")},model:{value:a.row.type,callback:function(e){t.$set(a.row,"type",e)},expression:"scope.row.type"}},[e("el-option",{attrs:{label:t.$t("orders.只计算商品价格"),value:1}}),e("el-option",{attrs:{label:t.$t("orders.计算商品价格和运费"),value:2}})],1)],1)]}}],null,!1,3238379111)}),e("el-table-column",{attrs:{prop:"vat",label:t.$t("goods.vat税")+"(%)",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-form-item",{attrs:{prop:"vatData."+a.$index+".name",rules:t.formData.rules.value}},[e("el-input",{attrs:{type:"number"},model:{value:a.row.value,callback:function(e){t.$set(a.row,"value",e)},expression:"scope.row.value"}})],1)]}}],null,!1,1217900243)}),e("el-table-column",{attrs:{label:t.$t("操作"),width:"70",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-link",{attrs:{type:"danger"},on:{click:function(e){return t.deleteVat(a.$index,t.vatData)}}},[t._v(t._s(t.$t("删除")))])]}}],null,!1,1302297420)})],1)],1)],1):t._e(),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.saveVat("formRef")}}},[t._v(t._s(t.$t("goods.确定")))])],1)],1),e("DialogExport",{attrs:{data:t.dialogExportData,filterData:t.filterData,exportTime:t.exportTime},on:{runExport:t.runExport,resetExport:t.resetExport,breakDown:t.breakDown}}),e("DialogImport",{attrs:{data:t.dialogImportData},on:{uploadSuccess:t.uploadSuccess}}),e("dialogVisibleCus",{attrs:{keyData:t.dialogVisibleCustomers}}),t.$root.$children[0].vipNowDetail&&t.$root.$children[0].vipNowDetail.productCnt?[e("el-dialog",{attrs:{visible:t.dialogVipUp,width:"400px"},on:{close:function(e){t.dialogVipUp=!1}}},[e("el-divider"),e("div",{staticStyle:{padding:"20px","font-size":"18px","line-height":"36px"}},[t._v(t._s(t.$t("goods.您当前的商品上架数量已达"))+t._s(t.$root.$children[0].vipNowDetail.productCnt)+" "+t._s(t.$t("goods.个，是否进行套餐升级？")))]),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.dialogVipUp=!1}}},[t._v(" "+t._s(t.$t("shop.取消"))+" ")])],1)],1)]:t._e(),e("DialogSelectCategory",{attrs:{data:t.dialogSelectCategoryData,categroyArr:t.selectCategroyArr}}),e("DialogCollect",{attrs:{data:t.collectGoodsData},on:{collectSuccess:t.collectSuccess}})],2)},o=[],r=(a("14d9"),function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.导出商品"),width:"400px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[e("el-divider"),t.data.step?t._e():e("div",{staticClass:"d-body"},[e("h2",[t._v(t._s(t.$t("goods.导出范围")))]),e("el-radio-group",{model:{value:t.data.method,callback:function(e){t.$set(t.data,"method",e)},expression:"data.method"}},[e("el-radio",{attrs:{label:"selected"}},[t._v(t._s(t.$t("goods.所选商品")))]),e("el-radio",{attrs:{label:"search"}},[t._v(t._s(t.$t("goods.当前筛选搜索的商品")))]),e("el-radio",{attrs:{label:"all"}},[t._v(t._s(t.$t("goods.所有商品")))])],1)],1),1==t.data.step?e("div",{staticClass:"progress-body"},[e("p",[t._v(t._s(t.$t("goods.关闭本弹窗不影响文件生成，文件生成后将通知您")))]),e("div",{staticClass:"progress-wrap"},[e("el-progress",{attrs:{type:"circle",percentage:parseInt(t.data.process.execNum/t.data.process.totalNum*100),width:80,color:"#535fb0"}})],1)]):t._e(),2==t.data.step?e("div",{staticClass:"success-body"},[1==t.data.process.status?[e("div",{staticClass:"progress-wrap"},[e("el-progress",{attrs:{type:"circle",percentage:100,width:80,"show-text":!1,color:"#67C23A"}}),e("i",{staticClass:"el-icon-check"})],1),e("p",{staticClass:"mg-b-10"},[t._v(t._s(t.$t("goods.文件已生成")))]),e("p",{staticClass:"mg-b-10"},[t._v("下载："),e("el-link",{attrs:{type:"primary",href:t.data.process.uploadUrl,target:"_blank"}},[t._v(t._s(t.data.process.uploadUrl))])],1),e("p",{staticStyle:{color:"#909399","font-size":"12px"}},[t._v(t._s(t.$t("goods.下载文件只保存12小时")))])]:t._e(),2==t.data.process.status?[e("div",{staticClass:"progress-wrap"},[e("el-progress",{attrs:{type:"circle",percentage:100,width:80,"show-text":!1,color:"#f56c6c"}}),e("i",{staticClass:"el-icon-close",staticStyle:{color:"#f56c6c"}})],1),e("p",{staticClass:"mg-b-10",staticStyle:{color:"#f56c6c"}},[t._v(t._s(t.$t("goods.文件生成失败，请重试")))])]:t._e()],2):t._e(),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.exportTime?[e("el-button",{on:{click:t.breakDown}},[t._v(t._s(t.$t("goods.中止")))]),e("el-button",{attrs:{type:"primary"},on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.收起")))])]:[e("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),t.data.step?t._e():e("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:t.exportProducts}},[t._v(t._s(t.$t("goods.确定")))]),2==t.data.step?e("el-button",{attrs:{type:"primary"},on:{click:t.reset}},[t._v(t._s(t.$t("goods.新建导出")))]):t._e()]],2)],1)}),i=[],l={props:["data","filterData","exportTime"],methods:{exportProducts(){switch(this.data.method){case"selected":if(this.$parent.$refs.subPage&&this.$parent.$refs.subPage.checkboxArr.length){let t={method:"selected",productIds:this.$parent.$refs.subPage.checkboxArr};this.runExport(t)}else this.$message({message:this.$t("goods.请选择一个商品"),type:"error"});break;case"search":let t={method:"search",name:this.filterData.name,categoryId:this.filterData.categoryId,status:"GoodsMgrAll"==this.$route.name?"":"GoodsMgrOn"==this.$route.name?"1":"2",costFrom:this.filterData.costFrom,costTo:this.filterData.costTo};this.runExport(t);break;case"all":let e={method:"all"};this.runExport(e);break}},runExport(t){this.$emit("runExport",t)},reset(){this.$emit("resetExport")},breakDown(){this.$emit("breakDown")}}},n=l,d=(a("bce6"),a("2877")),c=Object(d["a"])(n,r,i,!1,null,"ca8e1054",null),p=c.exports,g=function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.导入商品"),width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[e("el-divider"),e("div",{staticClass:"d-body"},[t.data.filePath?e("div",{staticClass:"path"},[e("p",{staticClass:"mg-b-20 tx-ellipsis3"},[t._v(t._s(t.data.filePath))]),e("div",{staticClass:"tx-center"},[e("el-link",{attrs:{type:"danger"},on:{click:t.clearFile}},[e("i",{staticClass:"el-icon-delete"})])],1)]):e("a",{staticClass:"i-btn",attrs:{href:"javascript:;"},on:{click:t.openUpload}},[e("i",{staticClass:"el-icon-upload"}),e("p",[t._v(t._s(t.$t("goods.选择文件")))])]),e("div",{staticClass:"right"},[e("p",{staticClass:"t1"},[e("span",[t._v(t._s(t.$t("goods.点击下载")))]),t._v(" "),e("el-link",{attrs:{type:"primary",target:"_blank"},on:{click:function(e){return t.downLoadExcel()}}},[t._v(t._s(t.$t("goods.商品导入模板")))])],1),e("p",{staticClass:"t2"},[t._v(" "+t._s(t.$t("goods.请按规范填写表格，仅支持xlsx格式文件"))+" ")]),e("p",{staticClass:"t2",domProps:{innerHTML:t._s(t.$t("goods.上传的文件不能超过 2M，只处理前 <b>99</b> 条数据。"))}})])]),e("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"uploadXls",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},on:{change:function(e){return t.fileUpload(e)}}}),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),e("el-button",{attrs:{type:"primary",loading:t.data.loading,disabled:!t.data.file},on:{click:t.apiUpload}},[t._v(t._s(t.$t("goods.提交")))])],1)],1)},u=[],h=(a("c73d"),a("88a7f"),a("271a"),a("5494"),{props:["data"],methods:{clearFile(){this.data.file=null,this.data.filePath="",document.getElementById("uploadXls").value=""},fileUpload(t){this.data.file=t.target.files[0],this.data.filePath=t.target.value,t.target.value=""},downLoadExcel(){let t="/file/importGood.xlsx",e=document.createElement("a");e.href=t,e.download="good.xlsx",e.style.display="none",document.body.appendChild(e),setTimeout(()=>{e.click(),document.removeChild(e),setTimeout(()=>{self.URL.revokeObjectURL(e.href)},200)},66)},apiUpload(){this.data.file.size>2097152?this.$message({message:this.$t("goods.文件不能大于10MB"),type:"error"}):this.data.file?(this.$set(this.data,"loading",!0),0==$("#ifilePro").length&&$("body").append('<iframe id="ifilePro" style="display:none"></iframe>'),this.$apiCall("api.VendorShop.deliverImportProduct",{"@file":this.data.file},t=>{this.$set(this.data,"loading",!1),9999==t.ErrorCode?t.Data.Results.file?(this.$emit("uploadSuccess","error"),document.getElementById("ifilePro").src=t.Data.Results.file):this.$emit("uploadSuccess"):this.$message({message:t.Message,type:"error"})})):this.$message({message:this.$t("goods.请上传文件"),type:"error"})},openUpload(){document.getElementById("uploadXls").click()}}}),m=h,f=(a("16db"),Object(d["a"])(m,g,u,!1,null,"43547e78",null)),v=f.exports,y=function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{title:t.$t("goods.指定客户可见"),visible:t.keyData.isShow,width:"600px","close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){return t.$set(t.keyData,"isShow",e)},open:t.open}},[e("el-divider"),e("div",{staticClass:"d-body"},[e("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.keyData.items}},[e("el-table-column",{attrs:{label:t.$t("goods.客户邮箱")},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[t._v(t._s(a.row.customer&&a.row.customer.email||"---"))])]}}])}),e("el-table-column",{attrs:{label:t.$t("goods.指定可见时间"),width:"250"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[t._v(t._s(t.$moment.unix(a.row.timeCreated).format("YYYY-MM-DD HH:mm:ss")))])]}}])})],1)],1),e("div",{staticClass:"d-flex",staticStyle:{"justify-content":"center",margin:"20px"}},[e("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"total, prev, pager, next",total:Number(t.total)},on:{"current-change":t.toPage}})],1),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"small"},on:{click:function(e){t.keyData.isShow=!1}}},[t._v(" "+t._s(t.$t("goods.关闭"))+" ")])],1)],1)},b=[],D={props:["keyData"],data(){return{page:1,rowsPerPage:10,total:0,totalPage:0,items:[]}},methods:{open(){this.page=1,this.tableRadio="",this.total=Number(this.keyData.Pagination.totalCount),this.totalPage=Number(this.keyData.Pagination.totalPage),this.items=this.keyData.items},toPage(t){this.page=t,this.$showLoading(),this.$apiCall("api.VendorShop.getVisibleCustomers",{page:this.page,rowsPerPage:10,productId:this.keyData.pproductId},t=>{"9999"==t.ErrorCode?(this.total=Number(t.Data.Pagination.totalCount),this.totalPage=Number(t.Data.Pagination.totalPage),this.items=t.Data.Results,$(".el-dialog__body").scrollTop(0)):this.$elementMessage(t.Message,"error"),this.$hideLoading()})}}},C=D,x=(a("cf4e"),Object(d["a"])(C,y,b,!1,null,"525479ad",null)),_=x.exports,S=function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.修改商品类目"),"close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[e("el-divider"),e("div",{staticClass:"d-body"},[e("div",{staticClass:"d-flex"},[e("span",[t._v(t._s(t.$t("goods.将所选商品类目修改为："))+" ")]),e("el-cascader",{ref:"cascaderHandle",attrs:{size:"small",props:{expandTrigger:"hover",checkStrictly:!0},options:t.categroyArr,placeholder:t.$t("goods.商品分类")},on:{change:t.changeCategory},scopedSlots:t._u([{key:"default",fn:function({data:a}){return e("span",{on:{click:t.clickNode}},[t._v(t._s(a.label))])}}]),model:{value:t.data.selected,callback:function(e){t.$set(t.data,"selected",e)},expression:"data.selected"}})],1)]),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),e("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:t.save}},[t._v(t._s(t.$t("goods.保存")))])],1)],1)},w=[],k={props:["data","categroyArr"],computed:{categoryId(){let t="";return this.data.selected.length&&(t=this.data.selected[this.data.selected.length-1]),t}},methods:{save(){if(!this.categoryId)return void this.$message({message:this.$t("goods.请先选择商品分类"),type:"error"});this.data.loading=!0;let t={ids:this.data.ids,categoryId:this.categoryId};this.$apiCall("api.VendorShop.batchModifyVendorProduct",t,t=>{this.data.loading=!1,9999==t.ErrorCode?(this.$message({message:this.$t("goods.修改成功"),type:"success"}),this.data.isShow=!1,this.$parent.getItems()):this.$message({message:t.Message,type:"error"})})},changeCategory(){this.$refs.cascaderHandle.dropDownVisible=!1},clickNode(t){t.target.parentElement.parentElement.firstElementChild.click()}}},P=k,I=(a("3455"),Object(d["a"])(P,S,w,!1,null,"c9bcf1bc",null)),E=I.exports,V=function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{visible:t.data.isShow,title:t.$t("goods.采集商品"),width:"600px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)},open:function(e){return t.open()}}},[e("el-divider"),e("div",{staticClass:"d-body"},[e("div",{staticClass:"d-flex mg-b-15"},[e("span",{staticClass:"mg-r-15"},[t._v(t._s(t.$t("category.商品类目")))]),e("el-cascader",{ref:"cascaderHandle",staticClass:"mg-r-15",attrs:{options:t.data.categroyArr,props:{expandTrigger:"hover",checkStrictly:!0},placeholder:t.$t("goods.商品分类"),size:"mini",filterable:"",clearable:"","show-all-levels":!1},on:{change:t.changeCategory},scopedSlots:t._u([{key:"default",fn:function({data:a}){return e("span",{},[t._v(t._s(a.label))])}}]),model:{value:t.categroyPath,callback:function(e){t.categroyPath=e},expression:"categroyPath"}})],1),e("div",{staticClass:"mg-b-15"},[e("el-input",{attrs:{placeholder:t.$t("goods.请填写在线商品链接"),type:"textarea",resize:"none",autosize:{minRows:5,maxRows:10},size:"small"},on:{change:function(e){return t.addUrls()}},model:{value:t.urls,callback:function(e){t.urls=e},expression:"urls"}})],1),e("div",{},[t._v(" "+t._s(t.$t("goods.目前支持亚马逊的商品采集"))+" ")])]),e("el-divider"),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),e("el-button",{attrs:{type:"primary",loading:t.data.loading},on:{click:function(e){return t.submitCollect()}}},[t._v(t._s(t.$t("goods.提交")))])],1)],1)},T=[],N={props:["data"],data(){return{categroyPath:[],urls:""}},methods:{open(){this.categroyPath=[],this.urls=""},preText(t){return t.replace(/\r\n/g,"|||").replace(/\n/g,"|||").replace(/\s/g,"")},addUrls(){console.log(this.preText(this.urls))},changeCategory(){this.$refs.cascaderHandle.dropDownVisible=!1},submitCollect(){let t=this.preText(this.urls)?this.preText(this.urls).split("|||"):[];this.categroyPath?this.urls?(this.$set(this.data,"loading",!0),this.$apiCall("api.VendorShop.importProductByUrl",{urlList:t.filter(t=>t),categoryId:this.categroyPath[this.categroyPath.length-1]},t=>{this.$set(this.data,"loading",!1),9999==t.ErrorCode?this.$emit("collectSuccess"):this.$message({message:t.Message,type:"error"})})):this.$message({message:this.$t("goods.请填写在线商品链接"),type:"error"}):this.$message({message:this.$t("goods.请先选择商品分类"),type:"error"})}}},A=N,U=(a("f23e"),Object(d["a"])(A,V,T,!1,null,"457741a0",null)),O=U.exports,R={data(){return{dialogVisibleCustomers:{isShow:!1,items:[],Pagination:{},pproductId:""},onSale:0,offSale:0,formData:{rules:{name:{required:!0,message:this.$t("goods.请输入国家"),tirgger:["blur","change"]},code:{required:!0,message:this.$t("goods.请输入国家code"),tirgger:["blur","change"]},type:{required:!0,message:this.$t("orders.请选择类型"),tirgger:["change"]},value:{required:!0,message:this.$t("goods.请输入vat税"),tirgger:["blur","change"]}},vatData:[]},showVatDialog:!1,vatFlag:!1,vendorId:localStorage.getItem("vendorId"),dialogVipUp:!1,loading:!1,pageKey:(new Date).valueOf(),activeName:"",pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem(this.$route.name+"RowsPerPage")?Number(localStorage.getItem(this.$route.name+"RowsPerPage")):10,items:[],total:0,totalPage:0,productTypeArr:this.$dict.productTypeArr,filterData:{name:"",nameIpt:"",categoryId:"",categroyPath:[],costFrom:"",costTo:"",costFromIpt:void 0,costToIpt:void 0,productType:"",spu:"",sku:""},defaultFilterData:"{}",dialogExportData:{isShow:!1,loading:!1,step:0,method:"selected",process:{status:"",totalNum:1,execNum:0,uploadUrl:""}},exportBtn:{isShow:!1,process:{status:"",statusObj:{1:{type:"success",txt:this.$t("goods.请下载")},2:{type:"danger",txt:this.$t("goods.失败")},3:{type:"warning",txt:this.$t("goods.请稍候")}}}},exportTime:0,defaultDialogExportData:"{}",dialogImportData:{loding:!1,isShow:!1,file:null,filePath:""},defaultDialogImportData:"{}",dialogSelectCategoryData:{isShow:!1,loading:!1,selected:[],ids:[]},defaultDialogSelectCategory:"{}",collectGoodsData:{isShow:!1,loading:!1,categroyArr:[]},defaultCollectGoodsData:"{}",vatData:[{name:"德国",value:"",code:"DE"}]}},components:{DialogExport:p,DialogImport:v,dialogVisibleCus:_,DialogSelectCategory:E,DialogCollect:O},computed:{selectCategroyArr(){let t=JSON.parse(JSON.stringify(this.$store.state.categroyArr));return t.forEach(t=>{t["children"]=t.list,t["value"]=t.id,t["label"]=t.name,t.children&&t.children.length&&t.children.forEach(t=>{t["children"]=t.list,t["value"]=t.id,t["label"]=t.name,t.children&&t.children.length&&t.children.forEach(t=>{t["value"]=t.id,t["label"]=t.name})})}),t}},watch:{$route:"gotoPage"},mounted(){this.$route.params.vip&&(this.dialogVipUp=!0),this.defaultDialogExportData=JSON.stringify(this.dialogExportData),this.defaultDialogImportData=JSON.stringify(this.dialogImportData),this.defaultFilterData=JSON.stringify(this.filterData),this.defaultDialogSelectCategory=JSON.stringify(this.dialogSelectCategoryData),this.defaultCollectGoodsData=JSON.stringify(this.collectGoodsData),this.activeName=this.$route.name,this.getCategroy(),this.getItems(),this.exportProcess()},methods:{collectGoods(){this.collectGoodsData.isShow=!0,this.collectGoodsData.categroyArr=this.selectCategroyArr},handleVat(){this.showVatDialog=!0,this.$apiCall("api.Product.getVatConfig",{},t=>{if(9999==t.ErrorCode){console.log(t,"r.Data.Results");let e=t.Data.Results.vatList;this.formData.vatData=e.map(t=>(t.type?t.type=Number(t.type):t.type=1,t)),this.vatFlag=1==t.Data.Results.vatState}else this.$message({message:t.Message,type:"error"})})},addCountry(){this.formData.vatData.push({name:"",code:"",value:""})},saveVat(t){let e={vatState:1==this.vatFlag?"1":"2",vatList:this.formData.vatData};this.$refs[t].validate(t=>{if(!t)return this.$message.error(this.$t("goods.请检查是否填完信息")),!1;this.$apiCall("api.Product.setVatConfig",e,t=>{9999==t.ErrorCode?(this.$message.success(t.Message),this.formData.vatData=[],this.showVatDialog=!1):this.$message({message:t.Message,type:"error"})})})},deleteVat(t,e){this.formData.vatData.splice(t,1)},collectSuccess(){this.collectGoodsData.isShow=!1,this.$message({message:this.$t("goods.采集成功"),type:"success"}),this.toPage(1)},openVisiableCus(t){this.$apiCall("api.VendorShop.getVisibleCustomers",{productId:t,page:1,rowsPerPage:10},e=>{9999==e.ErrorCode?e.Data.Results.length&&(this.dialogVisibleCustomers.isShow=!0,this.dialogVisibleCustomers.items=e.Data.Results,this.dialogVisibleCustomers.Pagination=e.Data.Pagination,this.dialogVisibleCustomers.pproductId=t):this.$message({message:e.Message,type:"error"})})},openChangeCategory(t){this.dialogSelectCategoryData=JSON.parse(this.defaultDialogSelectCategory),this.dialogSelectCategoryData.ids=t,this.dialogSelectCategoryData.isShow=!0},goToUP(){this.$router.push({name:"pricingUp"})},breakDown(){clearInterval(this.exportTime),this.exportTime=0,this.exportBtn.process.status="",this.dialogExportData.isShow=!1,this.$apiCall("api.VendorShop.finishedExportProduct",{},t=>{9999!=t.ErrorCode&&this.$message({message:this.$t("goods.中止导出失败"),type:"error"})})},resetExport(){this.exportBtn.process.status="",this.$apiCall("api.VendorShop.finishedExportProduct",{},t=>{}),this.openDialogExport()},exportProcess(){this.$apiCall("api.VendorShop.exportProductProcess",{},t=>{if(this.exportBtn.isShow=!0,9999==t.ErrorCode){let e=t.Data.Results;e&&3==e.status||(clearInterval(this.exportTime),this.exportTime=0),1==e.status&&(this.exportBtn.process.status=1,this.dialogExportData.step=2,this.dialogExportData.process.status=1,this.dialogExportData.process.uploadUrl=e.uploadUrl),2==e.status&&(this.exportBtn.process.status=2,this.dialogExportData.step=2,this.dialogExportData.process.status=2),3==e.status&&(this.exportBtn.process.status=3,this.dialogExportData.step=1,this.dialogExportData.process.status=3,this.dialogExportData.process.totalNum=e.totalNum,this.dialogExportData.process.execNum=e.execNum),e||(this.exportBtn.process.status="")}})},runExport(t){this.dialogExportData.loading=!0,t.page=1,this.$apiCall("api.VendorShop.searchExcelProducts",t,t=>{}),this.dialogExportData.step=1,this.exportTime=setInterval(()=>{this.exportProcess()},1e3)},openDialogExport(){this.exportBtn.process.status||(this.dialogExportData=JSON.parse(this.defaultDialogExportData)),this.dialogExportData.isShow=!0},uploadSuccess(t){setTimeout(()=>{this.dialogImportData.isShow=!1,"error"==t?this.$message({message:t?this.$t("goods.导入失败，下载查看错误文件"):this.$t("goods.导入成功"),type:t?"error":"success"}):this.toPage(1)},1e3)},openDialogImport(){this.dialogImportData=JSON.parse(this.defaultDialogImportData),this.dialogImportData.isShow=!0},filterGetItem(){this.filterData.name=this.filterData.nameIpt,this.filterData.categoryId=this.filterData.categroyPath[this.filterData.categroyPath.length-1],this.filterData.costFromIpt&&this.filterData.costToIpt&&this.filterData.costFromIpt>this.filterData.costToIpt&&(this.filterData.costToIpt=void 0),this.filterData.costFrom=this.filterData.costFromIpt,this.filterData.costTo=this.filterData.costToIpt,this.toPage(1)},clearFilter(t){switch(t){case"categoryId":this.filterData.categroyPath=[],this.filterData.categoryId="";break;case"name":this.filterData.nameIpt=this.filterData.name="";break;case"cost":this.filterData.costFromIpt=this.filterData.costToIpt=void 0,this.filterData.costFrom=this.filterData.costTo="";break;case"productType":this.filterData.productType="";break;case"sku":this.filterData.sku="";break;case"spu":this.filterData.spu="";break;default:this.filterData=JSON.parse(this.defaultFilterData)}"none"!=t&&this.toPage(1)},getItems(t){this.loading=!0,this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterData.name,categoryId:this.filterData.categoryId,status:"GoodsMgrAll"==this.$route.name?"":"GoodsMgrOn"==this.$route.name?"1":"2",costFrom:this.filterData.costFrom,costTo:this.filterData.costTo,productType:this.filterData.productType,stockSku:this.filterData.sku,spu:this.filterData.spu},e=>{this.loading=!1,9999==e.ErrorCode&&(this.onSale=e.Data.Results.onSale,this.offSale=e.Data.Results.offSale,this.$refs.subPage.checkboxArr=[],this.items=e.Data.Results.products.map(t=>(t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t)),this.total=Number(e.Data.Pagination.totalCount),this.totalPage=Number(e.Data.Pagination.totalPage),t||(this.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0))})},getCategroy(){this.$store.state.categroyArr.length||this.$apiCall("api.ProductCategory.findByVendorRelateCategory",{},t=>{9999==t.ErrorCode&&this.$store.commit("setCategroyArr",t.Data.Results)})},delSelected(t){this.loading=!0,this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"delete",productIds:t},t=>{9999==t.ErrorCode?this.$refs.subPage.checkboxArr=[]:20210801==t.ErrorCode?this.dialogVipUp=!0:this.$message({message:t.Message,type:"error"}),this.getItems()})},changeStatusAll(t,e){this.loading=!0,this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"change",productIds:t,status:e?"1":"2"},t=>{this.loading=!1,9999==t.ErrorCode?(this.$refs.subPage.checkboxArr=[],setTimeout(()=>{this.$root.$children[0].getVipDetail()},1e3),this.getItems()):20210801==t.ErrorCode?this.dialogVipUp=!0:this.$message({message:t.Message,type:"error"})})},changeStatus(t){this.loading=!0;let e="1"==t.status?"2":"1";this.$apiCall("api.VendorShop.vendorChangeProducts",{type:"change",productIds:[t.id],status:e},a=>{this.loading=!1,9999==a.ErrorCode?(t.status=e,setTimeout(()=>{this.$root.$children[0].getVipDetail()},1e3)):20210801==a.ErrorCode?this.dialogVipUp=!0:this.$message({message:a.Message,type:"error"}),t.statusIpt="1"==t.status})},handleClick(t){t.name==this.$route.name?this.pageKey=(new Date).valueOf():(this.clearFilter("none"),this.$refs.subPage.checkboxArr=[],this.$router.push({name:t.name}))},goto(t){let e=localStorage.getItem("vendorId");if(148982!=e&&146428!=e&&144875!=e&&144843!=e&&143779!=e&&143654!=e&&74!=e){let t="AddGoods2";this.$router.push({name:t})}else this.$router.push({name:t})},gotoPage(){this.page=this.$route.query.page?this.$route.query.page:1,this.$nextTick(()=>{this.getItems()})},toPage(t){t!=this.$route.query.page?this.$router.push({query:{page:t}}):this.getItems()},changePageSize(t){this.rowsPerPage=t,localStorage.setItem(this.$route.name+"RowsPerPage",t),this.getItems()}}},F=R,M=(a("191e"),a("b48d"),Object(d["a"])(F,s,o,!1,null,null,null));e["default"]=M.exports}}]);