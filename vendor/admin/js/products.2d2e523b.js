(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["products"],{"717b":function(t,e,s){"use strict";s("d5cd")},d5cd:function(t,e,s){},e6dc:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contentpanel my-invoice-page"},[s("div",{ref:"pageHeader",staticClass:"pagetitle"},[s("div",{staticClass:"left d-flex align-items-center"},[s("div",{staticClass:"title",staticStyle:{"margin-right":"20px"}},[s("i",{staticClass:"el-icon-shopping-bag-1"}),s("h2",[t._v(t._s(t.$t("products.未合作商品报价")))])])]),s("div",{staticClass:"right"})]),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[s("el-card",{staticClass:"mg-b-15"},[s("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[s("el-col",{staticStyle:{position:"relative","z-index":"1"},attrs:{span:24}},[s("div",{ref:"pageFilter",staticClass:"page-filter"},[s("div",{staticClass:"d-flex"},[s("div",{staticClass:"d-flex mg-r-20"},[s("el-checkbox",{staticStyle:{"margin-bottom":"18px","margin-right":"10px"},attrs:{size:"mini"},on:{change:t.allChange},model:{value:t.allCheckedData,callback:function(e){t.allCheckedData=e},expression:"allCheckedData"}},[t._v(" "+t._s(t.$t("products.全选"))),t.isSelectItems?s("span",{staticStyle:{color:"#909399","font-size":"12px"}},[t._v("("+t._s(t.isSelectItems)+")")]):t._e()]),s("el-button",{staticStyle:{"margin-bottom":"18px"},attrs:{type:"primary",size:"mini",disabled:!t.isSelectItems},on:{click:function(e){return t.setOfferedBat()}}},[t._v(t._s(t.$t("products.批量报价")))]),s("el-button",{staticStyle:{"margin-bottom":"18px"},attrs:{type:"danger",size:"mini",disabled:!t.isSelectItems},on:{click:function(e){return t.deleteBat()}}},[t._v(t._s(t.$t("products.批量删除")))])],1),s("el-form",{attrs:{inline:!0,size:"mini"}},[s("el-form-item",{staticClass:"mg-r-5",attrs:{label:""}},[s("el-select",{attrs:{filterable:"",remote:"","remote-method":t.remoteMethodCustom,loading:t.selectLoading,placeholder:t.$t("products.请输入客户名")},on:{change:t.filterGetItem},model:{value:t.filterParams.relationshipId,callback:function(e){t.$set(t.filterParams,"relationshipId",e)},expression:"filterParams.relationshipId"}},t._l(t.selectArr,(function(t){return s("el-option",{key:t.id,attrs:{label:t.customerName,value:t.id}})})),1)],1),s("el-form-item",{staticClass:"mg-r-5",attrs:{label:""}},[s("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:t.$t("products.商品名称")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem("name")}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),s("el-form-item",{staticClass:"mg-r-5",attrs:{label:""}},[s("el-input",{staticStyle:{width:"180px"},attrs:{placeholder:t.$t("products.我的SKU")},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem("sku")}},model:{value:t.sku,callback:function(e){t.sku=e},expression:"sku"}})],1),s("el-form-item",{staticClass:"mg-r-5",attrs:{label:""}},[s("el-select",{attrs:{placeholder:t.$t("products.选择状态")},on:{change:t.filterGetItem},model:{value:t.filterParams.status,callback:function(e){t.$set(t.filterParams,"status",e)},expression:"filterParams.status"}},[s("el-option",{attrs:{label:t.$t("products.全部状态"),value:""}}),t._l(t.statusArr,(function(t,e){return s("el-option",{key:e,attrs:{label:t.text,value:e}})}))],2)],1),s("el-form-item",[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.filterGetItem("all")}}},[t._v(t._s(t.$t("products.筛选")))]),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("products.清除")))])],1)],1)],1),s("el-row",{staticStyle:{"margin-top":"-5px","margin-bottom":"5px"}},[s("el-col",{attrs:{span:24}},[t.filterParams.relationshipId?s("el-tag",{staticClass:"mg-r-10",attrs:{size:"mini",closable:""},on:{close:function(e){return t.clearFilter("relationshipId")}}},[s("span",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("products.客户名称"))+"：")]),t._v(" "+t._s(t.getRelationshipName(t.filterParams.relationshipId))+" ")]):t._e(),t.filterParams.name?s("el-tag",{staticClass:"mg-r-10",attrs:{size:"mini",closable:""},on:{close:function(e){return t.clearFilter("name")}}},[s("span",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("products.商品名称"))+"：")]),t._v(" "+t._s(t.filterParams.name)+" ")]):t._e(),t.filterParams.sku?s("el-tag",{staticClass:"mg-r-10",attrs:{size:"mini",closable:""},on:{close:function(e){return t.clearFilter("sku")}}},[s("span",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("products.我的SKU"))+"：")]),t._v(" "+t._s(t.filterParams.sku)+" ")]):t._e(),t.filterParams.status?s("el-tag",{staticClass:"mg-r-10",attrs:{size:"mini",closable:""},on:{close:function(e){return t.clearFilter("status")}}},[s("span",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("products.状态"))+"：")]),s("span",{style:{color:t.statusArr[t.filterParams.status].color}},[t._v(t._s(t.statusArr[t.filterParams.status].text))])]):t._e()],1)],1)],1)]),s("el-row",{ref:"gridTable",staticStyle:{"padding-top":"15px",position:"relative","z-index":"0"},attrs:{gutter:10}},[t.items.length?t._e():s("el-col",{attrs:{span:24}},[s("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[t._v(t._s(t.$t("products.没有商品")))])]),t._l(t.items,(function(e){return s("el-col",{key:e.id,staticClass:"mg-b-20",attrs:{sm:12,md:8,lg:6,xl:4}},[s("div",{staticClass:"product-box"},[s("div",{staticStyle:{position:"relative","padding-bottom":"100%","margin-bottom":"15px"}},[s("div",{staticClass:"check-bg"},[s("el-checkbox",{model:{value:e.checked,callback:function(s){t.$set(e,"checked",s)},expression:"item.checked"}})],1),s("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%",border:"1px #DCDFE6 solid"},attrs:{fit:"contain",src:e.imgUrl}},[s("div",{staticClass:"image-slot",staticStyle:{position:"relative"},attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline",staticStyle:{position:"absolute",top:"50%",left:"50%",color:"#909399",transform:"translate(-20%, -20%)","font-size":"36px"}})])])],1),s("div",{staticClass:"info"},[s("div",{staticClass:"name tx-ellipsis1",attrs:{title:e.name}},[t._v(t._s(e.name))]),s("div",{staticClass:"info-item"},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("products.客户名称"))+"：")]),s("span",[t._v(t._s(e.customerName))])]),s("div",{staticClass:"info-item"},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("products.近7/30天销量"))+"：")]),s("span",[t._v(t._s(e.saleCnt7)+" / "+t._s(e.saleCnt30))])]),e.editMode?s("div",{staticClass:"info-item",staticStyle:{"margin-bottom":"0"}},[s("el-input",{staticStyle:{"margin-right":"5px",width:"120px"},attrs:{placeholder:"SKU",size:"mini"},model:{value:e.editSku,callback:function(s){t.$set(e,"editSku",s)},expression:"item.editSku"}}),s("el-button-group",[s("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-check",loading:e.editLoading},on:{click:function(s){return t.saveEditSku(e)}}}),s("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-close"},on:{click:function(s){return t.canelEditSku(e)}}})],1)],1):s("div",{staticClass:"info-item",staticStyle:{"margin-bottom":"9px"}},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("products.我的SKU编号"))+"：")]),s("span",{staticClass:"d-flex",staticStyle:{"padding-right":"5px"},attrs:{title:e.sku}},[s("span",{staticClass:"tx-ellipsis1 mg-r-5",staticStyle:{"max-width":"95px"}},[t._v(t._s(e.sku||"---"))]),s("div",{staticClass:"d-flex"},[s("a",{staticClass:"mg-r-5",attrs:{href:"javascript:;",title:t.$t("products.编辑")},on:{click:function(s){return t.editSku(e)}}},[s("i",{staticClass:"el-icon-edit"})]),e.sku?s("a",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.sku,expression:"item.sku",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],attrs:{href:"javascript:;",title:t.$t("products.复制")}},[s("i",{staticClass:"el-icon-document-copy"})]):t._e()])])]),s("div",{staticClass:"info-item"},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("products.我的供货价"))+"：")]),s("span",[t._v(t._s(e.price?"$ "+e.price:"---"))])]),s("div",{staticClass:"info-item"},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("products.合作状态"))+"：")]),s("span",{style:{color:t.statusArr[e.status].color}},[t._v(t._s(t.statusArr[e.status].text))])])]),s("div",{staticClass:"action"},[s("el-button",{attrs:{disabled:"1"!=e.status,size:"mini",type:"primary"},on:{click:function(s){return t.setOfferedSingle(e)}}},[t._v(t._s(t.$t("products.我要报价")))]),s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(s){return t.deleteSingle(e)}}},[t._v(t._s(t.$t("products.删除")))])],1)])])}))],2)],1)],1),s("el-row",{ref:"pageFooter",attrs:{gutter:20}},[s("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[s("div",[s("el-pagination",{attrs:{"current-page":t.page,background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1)],1),s("el-dialog",{attrs:{width:"1000",title:1==t.dialogOffered.type?t.$t("products.批量报价"):t.$t("products.商品报价"),visible:t.dialogOffered.isShow},on:{"update:visible":function(e){return t.$set(t.dialogOffered,"isShow",e)}}},[s("div",{staticStyle:{padding:"0 20px"}},[s("el-table",{attrs:{data:t.dialogOffered.items,height:1==t.dialogOffered.type?460:"",stripe:""}},[s("el-table-column",{attrs:{label:t.$t("products.商品信息")},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"table-pro"},[s("el-image",{staticStyle:{"margin-right":"15px","min-width":"80px",width:"80px",height:"80px",border:"1px #DCDFE6 solid"},attrs:{fit:"contain",src:e.row.imgUrl}},[s("div",{staticClass:"image-slot",staticStyle:{position:"relative"},attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline",staticStyle:{position:"absolute",top:"50%",left:"50%",color:"#909399",transform:"translate(-14%, -20%)","font-size":"32px"}})])]),s("div",{staticClass:"tx-ellipsis2",staticStyle:{"max-width":"250px"},attrs:{title:e.row.name}},[t._v(t._s(e.row.name))])],1)]}}])}),s("el-table-column",{attrs:{label:t.$t("products.近7/30天销量")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.saleCnt7)+" / "+t._s(e.row.saleCnt30)+" ")]}}])}),s("el-table-column",{attrs:{label:t.$t("products.我的SKU编号")},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.status?s("el-input",{attrs:{placeholder:"SKU",size:"mini"},model:{value:e.row.sku,callback:function(s){t.$set(e.row,"sku",s)},expression:"scope.row.sku"}}):s("span",{staticClass:"text-th"},[t._v(t._s(e.row.sku))])]}}])}),s("el-table-column",{attrs:{label:t.$t("products.我的供货价(US $)")},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.status?s("el-input-number",{attrs:{min:0,controls:!1,size:"mini"},model:{value:e.row.price,callback:function(s){t.$set(e.row,"price",s)},expression:"scope.row.price"}}):s("span",{staticClass:"text-th"},[t._v(t._s(e.row.price))])]}}])})],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.saveOffered}},[t._v(t._s(t.$t("products.提交报价")))]),s("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogOffered.isShow=!1}}},[t._v(t._s(t.$t("products.关闭")))])],1)]),s("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}})],1)},a=[],r=(s("a9e3"),s("d3b7"),s("159b"),s("e9c4"),s("25f0"),s("b0c0"),{data:function(){return{loading:!1,tableHeight:400,page:this.$route.query.page?Number(this.$route.query.page):1,pageSizes:[12,24,48,96],rowsPerPage:localStorage.getItem("productsRowsPerPage")?Number(localStorage.getItem("productsRowsPerPage")):12,items:[],total:0,totalPage:0,name:"",sku:"",filterParams:{relationshipId:"",name:"",status:"",sku:""},filterParamsDefault:"{}",selectArr:[],selectLoading:!1,statusArr:{1:{text:this.$t("products.尚未合作"),color:"#F56C6C"},2:{text:this.$t("products.我已报价"),color:"#E6A23C"},3:{text:this.$t("products.客户已确认"),color:"#67C23A"}},dialogOffered:{isShow:!1,loading:!1,items:[],type:1},dialogOfferedDefault:"{}",allCheckedData:!1}},computed:{allChecked:function(){var t=0;return this.items.forEach((function(e){e.checked&&t++})),!(!t||t!=this.items.length)},isSelectItems:function(){var t=0;return this.items.forEach((function(e){e.checked&&t++})),t}},watch:{allChecked:function(){this.allCheckedData=this.allChecked},$route:"gotoPage"},mounted:function(){var t=this;this.$route.params.id?(this.filterParams.idName=this.$route.params.customerName?this.$route.params.customerName:"",this.filterParams.relationshipId=this.$route.params.id?this.$route.params.id:"",this.selectArr=[{id:this.$route.params.id,customerName:this.$route.params.customerName}],this.filterParams.status=1,this.getItem(),this.filterParams.status="",this.filterParams.idName="",this.filterParams.relationshipId=""):this.$nextTick((function(){t.getItem()})),this.filterParamsDefault=JSON.stringify(this.filterParams),this.dialogOfferedDefault=JSON.stringify(this.dialogOffered),null!=this.$route.query.filterParams&&(this.filterParams.status=this.$route.query.filterParams.toString()),window.onresize=function(){}},beforeDestroy:function(){window.onresize=function(){}},methods:{onCopy:function(){this.$elementMessage(this.$t("successfullyToClipboard"),"success")},onError:function(){this.$elementMessage(this.$t("failedToClipboard"),"error")},allChange:function(){var t=this;this.items.forEach((function(e){t.$set(e,"checked",t.allCheckedData)}))},canelEditSku:function(t){this.$set(t,"editMode",!1)},saveEditSku:function(t){var e=this;this.$set(t,"editLoading",!0),this.$apiCall("api.OfferItems.changeSku",{id:t.id,sku:t.editSku},(function(s){e.$set(t,"editLoading",!1),e.$set(t,"editMode",!1),9999==s.ErrorCode?(e.$message({message:e.$t("products.SKU修改成功"),type:"success",offset:60}),e.getItem(!0)):e.$message({message:s.Message,type:"error",offset:60})}))},editSku:function(t){this.$set(t,"editMode",!0),this.$set(t,"editSku",t.sku),this.$set(t,"editLoading",!1)},deleteItem:function(t){var e=this;this.loading=!0,this.$apiCall("api.OfferItems.delete",{items:t},(function(t){9999==t.ErrorCode?(e.$message({message:e.$t("products.商品删除成功"),type:"success",offset:60}),e.getItem(!0)):e.$message({message:t.Message,type:"error",offset:60})}))},deleteSingle:function(t){var e=this;this.$confirm(this.$t("products.是否要删除这个商品?"),this.$t("products.删除"),{confirmButtonText:this.$t("products.删除"),cancelButtonText:this.$t("products.取消"),type:"error"}).then((function(){e.deleteItem([{id:t.id}])}))},deleteBat:function(){var t=this;if(this.isSelectItems){var e=[];this.items.forEach((function(t){t.checked&&e.push({id:t.id})})),this.$confirm(this.$t("products.是否要删除选中的 {num} 个商品?",{num:e.length}),this.$t("products.删除"),{confirmButtonText:this.$t("products.删除"),cancelButtonText:this.$t("products.取消"),type:"error"}).then((function(){t.deleteItem(e)}))}else this.$message({message:this.$t("products.请先选择商品"),type:"error",offset:60})},saveOffered:function(){var t=this,e=0;if(this.dialogOffered.items.forEach((function(t){1==t.status&&e++})),e){this.dialogOffered.loading=!0;var s=[],i=0;this.dialogOffered.items.forEach((function(t){"1"==t.status&&(s.push({id:t.id,sku:t.sku,price:t.price}),t.sku&&t.price||i++)})),i?this.$message({message:this.$t("products.SKU编号和供货价必须填写。供货价不能为零"),type:"error",offset:60}):this.$apiCall("api.OfferItems.setOffered",{items:s},(function(e){t.dialogOffered.loading=!1,9999==e.ErrorCode?(t.getItem(!0),t.dialogOffered.isShow=!1,t.$message({message:t.$t("products.报价成功"),type:"success",offset:60})):t.$message({message:e.Message,type:"error",offset:60})}))}else this.$message({message:this.$t("products.没有尚未报价的商品"),type:"error",offset:60})},setOfferedSingle:function(t){this.dialogOffered=JSON.parse(this.dialogOfferedDefault),this.dialogOffered.type=2,this.dialogOffered.isShow=!0,this.dialogOffered.items.push(JSON.parse(JSON.stringify(t)))},setOfferedBat:function(){var t=this;this.isSelectItems?(this.dialogOffered=JSON.parse(this.dialogOfferedDefault),this.dialogOffered.isShow=!0,this.items.forEach((function(e){e.checked&&t.dialogOffered.items.push(JSON.parse(JSON.stringify(e)))}))):this.$message({message:this.$t("products.请先选择商品"),type:"error",offset:60})},getRelationshipName:function(t){var e="";return this.selectArr.forEach((function(s){s.id==t&&(e=s.customerName)})),e},clearFilter:function(t){t||(this.selectArr=[],this.name="",this.sku="",this.filterParams=JSON.parse(this.filterParamsDefault)),"relationshipId"==t&&(this.selectArr=[],this.filterParams.relationshipId=""),"name"==t&&(this.name="",this.filterParams.name=""),"sku"==t&&(this.sku="",this.filterParams.sku=""),"status"==t&&(this.filterParams.status=""),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},filterGetItem:function(t){"name"==t&&(this.filterParams.name=this.name),"sku"==t&&(this.filterParams.sku=this.sku),"all"==t&&(this.filterParams.name=this.name,this.filterParams.sku=this.sku),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},getItem:function(t){var e=this;this.loading=!0;var s={page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterParams.name,relationshipId:this.filterParams.relationshipId,status:this.filterParams.status,sku:this.filterParams.sku};this.$apiCall("api.OfferItems.findByVendor",s,(function(s){e.loading=!1,9999==s.ErrorCode?(e.items=[],s.Data.Results.forEach((function(t){t.checked=!1,t.editMode=!1,t.editLoading=!1,t.editSku="",e.items.push(t)})),e.total=Number(s.Data.Pagination.totalCount),e.totalPage=Number(s.Data.Pagination.totalPage),e.$nextTick((function(){})),t||(e.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0)):e.$message({message:s.Message,type:"error"})}))},toPage:function(t){t!=this.$route.query.page&&this.$router.push({query:{page:t}})},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("productsRowsPerPage",t),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()},remoteMethodCustom:function(t){var e=this;this.selectArr=[],t&&(this.selectLoading=!0,this.$apiCall("api.Relationship.findByVendor",{name:t},(function(t){e.selectLoading=!1,9999==t.ErrorCode?e.selectArr=t.Data.Results:e.$message({message:t.Message,type:"error"})})))}}}),o=r,l=(s("717b"),s("2877")),n=Object(l["a"])(o,i,a,!1,null,"fd85d944",null);e["default"]=n.exports}}]);