(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchGoods"],{"069c":function(t,e,a){t.exports=a.p+"img/noData.46b81b49.png"},"06fe":function(t,e,a){"use strict";a("9eca")},"09a7":function(t,e,a){"use strict";var s=a("7e70"),i=a("434b").map,r=a("2574"),o=r("map");s({target:"Array",proto:!0,forced:!o},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"0c71":function(t,e,a){},2195:function(t,e,a){"use strict";a("7c4e")},"280b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel goods-mgr-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-xunjia"}),a("h2",[t._v(t._s(t.$t("app.搜品管理")))])])]),a("div",{staticClass:"right"},[t.$store.state.userInfo.subUserId?t._e():a("div",["SGAssign"==t.$route.name&&t.isOpenAssign||"SGQuotation"==t.$route.name&&!t.isOpenAssign?[t.isOpenAssign?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.changeAssign("close")}}},[t._v(t._s(t.$t("quotation.关闭分配")))]):a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.changeAssign("open")}}},[t._v(t._s(t.$t("quotation.开启分配")))])]:t._e()],2)])]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-card",[a("el-row",[a("el-col",{attrs:{span:24}},[a("Sub",{key:t.pageKey,ref:"subPage",attrs:{loading:t.loading,items:t.items,filterData:t.filterData},on:{filterGetItem:t.filterGetItem,clearFilter:t.clearFilter,assign:t.assign}}),a("div",{ref:"tableFooter"},[t.items.length?a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[a("div",{staticStyle:{position:"relative",top:"10px"}},[a("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1)],1)],1),a("el-dialog",{attrs:{visible:t.assignDialog,width:"500px"},on:{"update:visible":function(e){t.assignDialog=e}}},[a("div",{staticClass:"tx-center dialog-content",staticStyle:{padding:"20px"}},[t._v(" "+t._s(t.isOpenAssign?t.$t("quotation.是否确定关闭分配功能？确定后搜品请求直接在待报价状态"):t.$t("quotation.是否确定开启分配功能？确定后搜品请求需求分配后才能操作"))+" ")]),a("div",{staticClass:"dialog-footer d-flex justify-content-center",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.assignDialog=!1}}},[t._v(t._s(t.$t("quotation.取消")))]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.closeAssign()}}},[t._v(t._s(t.$t("quotation.确定")))])],1)]),a("el-dialog",{attrs:{visible:t.selectAssignDialog,width:"500px"},on:{"update:visible":function(e){t.selectAssignDialog=e},close:t.closeSelectAssign}},[a("div",{staticClass:"tx-center dialog-content",staticStyle:{padding:"20px"}},[a("el-form",[a("el-form-item",{attrs:{label:t.$t("quotation.请选择角色")}},[a("el-select",{staticStyle:{width:"320px"},attrs:{filterable:""},on:{change:t.staffChange},model:{value:t.form.roleId,callback:function(e){t.$set(t.form,"roleId",e)},expression:"form.roleId"}},t._l(t.roleList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),a("el-form-item",{attrs:{label:t.$t("quotation.请选择人员")}},[a("el-select",{staticStyle:{width:"320px"},attrs:{disabled:!t.isSetect,filterable:""},model:{value:t.form.staff,callback:function(e){t.$set(t.form,"staff",e)},expression:"form.staff"}},t._l(t.staffList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.closeSelectAssign}},[t._v(t._s(t.$t("quotation.取消")))]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.assignStaff()}}},[t._v(t._s(t.$t("quotation.分配")))])],1)])],1)},i=[],r=(a("f203"),a("1baf"),a("5ad0"),a("09a7"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goods-list-page"},[a("div",{ref:"tablefilter"},[a("div",{ref:"pageFilter",staticClass:"page-filter",staticStyle:{"border-bottom":"none"}},[t.filterData?a("el-form",{attrs:{inline:!0,size:"mini"}},[a("el-form-item",[a("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:t.$t("goods.商品名称")},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.name,callback:function(e){t.$set(t.filterData,"name",e)},expression:"filterData.name"}})],1),a("el-form-item",["SGQuotation"==t.$route.name?a("el-select",{attrs:{filterable:"",remote:"","remote-method":t.remoteMethodCustom,loading:t.selectLoading,placeholder:t.$t("quotation.分配人"),clearable:""},on:{change:function(e){return t.filterGetItem()},clear:function(e){return t.clearFilter("subUserId")}},model:{value:t.filterData.subUserId,callback:function(e){t.$set(t.filterData,"subUserId",e)},expression:"filterData.subUserId"}},t._l(t.selectArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1):t._e()],1),a("el-form-item",["SGQuotation"!=t.$route.name&&"SGAssign"!=t.$route.name?a("el-select",{attrs:{filterable:"",remote:"","remote-method":t.remoteMethodCustom,loading:t.selectLoading,placeholder:t.$t("quotation.报价人"),clearable:""},on:{change:function(e){return t.filterGetItem()},clear:function(e){return t.clearFilter("subUserIdCompleted")}},model:{value:t.filterData.subUserIdCompleted,callback:function(e){t.$set(t.filterData,"subUserIdCompleted",e)},expression:"filterData.subUserIdCompleted"}},t._l(t.selectArr,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1):t._e()],1),a("el-form-item",["SGSearch"==t.$route.name?a("el-select",{attrs:{placeholder:t.$t("quotation.状态"),clearable:""},on:{change:function(e){return t.filterGetItem()},clear:function(e){return t.clearFilter("status")}},model:{value:t.filterData.type,callback:function(e){t.$set(t.filterData,"type",e)},expression:"filterData.type"}},[a("el-option",{attrs:{label:t.$t("quotation.待处理"),value:"1"}}),a("el-option",{attrs:{label:t.$t("quotation.已完成"),value:"2"}})],1):t._e()],1),a("el-form-item",{attrs:{label:t.$t("quotation.日期")}},[a("el-date-picker",{key:"date2",attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"","start-placeholder":"Start","end-placeholder":"End"},on:{clear:function(e){return t.clearFilter("date")},change:t.dateChange},model:{value:t.filterData.date,callback:function(e){t.$set(t.filterData,"date",e)},expression:"filterData.date"}})],1),a("el-form-item",{staticStyle:{"margin-bottom":"0"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.filterGetItem()}}},[t._v(t._s(t.$t("myinvoice.filter")))]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("goods.重置")))])],1)],1):t._e()],1)]),a("div",{staticClass:"table-wrap",staticStyle:{"border-top":"1px #ebeef5 solid","padding-top":"5px"}},[t.items.length&&"SGAssign"==t.$route.name?a("div",{staticClass:"table-action"},[a("div",{staticClass:" mg-r-15"},[a("el-checkbox",{on:{change:t.changeAllCheckbox},model:{value:t.isAllCheck,callback:function(e){t.isAllCheck=e},expression:"isAllCheck"}},[a("span",{staticStyle:{color:"#606266","font-size":"12px"}},[t._v(t._s(t.$t("goods.全选/全不选"))+" ("+t._s(t.checkboxArr.length)+")")])])],1),a("div",[a("el-button",{attrs:{type:"primary",size:"mini",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.assignAll()}}},[t._v(t._s(t.$t("quotation.批量分配")))])],1)]):t._e(),t.items.length||t.loading?a("el-table",{key:"gridTable"+t.$route.name,ref:"gridTable"+t.$route.name,attrs:{data:t.items,stripe:""}},[t.items.length&&"SGAssign"==t.$route.name?a("el-table-column",{attrs:{label:"",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-checkbox",{staticClass:"none-label",attrs:{label:e.row.id},model:{value:t.checkboxArr,callback:function(e){t.checkboxArr=e},expression:"checkboxArr"}})]}}],null,!1,2613777098)}):t._e(),a("el-table-column",{attrs:{label:t.$t("goods.商品名称"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.name?a("p",{staticClass:" tx-ellipsis3",staticStyle:{"line-height":"22px"}},[t._v(" "+t._s(e.row.name)+" ")]):a("p",[t._v("---")])]}}],null,!1,3508056684)}),a("el-table-column",{attrs:{label:t.$t("goods.商品图片")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.imgUrlArr?a("el-image",{staticStyle:{width:"80px",height:"80px",border:"1px solid #ddd","background-color":"#fff"},attrs:{src:e.row.imgUrlArr[0],fit:"contain","scroll-container":".main-scroll .el-scrollbar__wrap","preview-src-list":e.row.imgUrlArr,lazy:""}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})]),t._v("+ ")]):t._e()]}}],null,!1,3222068885)}),"SGAssign"==t.$route.name||"SGQuotation"==t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.商品链接"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.url?a("p",{staticClass:" tx-ellipsis3",staticStyle:{"line-height":"22px"}},[a("a",{attrs:{href:e.row.url,target:"_blank"}},[t._v(t._s(e.row.url))])]):a("p",[t._v("---")])]}}],null,!1,4188564470)}):t._e(),a("el-table-column",{attrs:{label:t.$t("quotation.客户邮箱")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.username?a("span",[t._v(t._s(e.row.username))]):a("span",[t._v("---")])]}}],null,!1,1477976252)}),a("el-table-column",{attrs:{label:t.$t("quotation.预期价格")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b",[t._v("$"+t._s(e.row.minPrice)+"-"+t._s(e.row.maxPrice))])]}}],null,!1,2283629017)}),"SGFinish"==t.$route.name||"SGSearch"==t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.回复价格")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.vendorProduct?a("div",[e.row.vendorProduct.cost?a("b",[t._v("$"+t._s(e.row.vendorProduct.cost))]):a("span",[t._v("---")])]):a("div",[t._v(t._s(t.$t("quotation.暂无数据展示")))])]}}],null,!1,2222934269)}):t._e(),"SGNone"==t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.失败原因")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark))])]}}],null,!1,186672324)}):t._e(),"SGQuotation"==t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.分配人")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.subUserName?a("span",[t._v(t._s(e.row.subUserName))]):a("span",[t._v("---")])]}}],null,!1,3025709884)}):t._e(),"SGQuotation"!=t.$route.name&&"SGAssign"!=t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.报价人")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.subUserNameCompleted?a("span",[t._v(t._s(e.row.subUserNameCompleted))]):a("span",[t._v("---")])]}}],null,!1,1048716892)}):t._e(),a("el-table-column",{attrs:{label:t.$t("quotation.创建日期")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$moment(1e3*e.row.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")]}}],null,!1,908369978)}),"SGSearch"!=t.$route.name?a("el-table-column",{attrs:{label:t.$t("goods.操作"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return["SGQuotation"==t.$route.name||"SGAssign"==t.$route.name?a("el-link",{staticClass:"mg-r-15",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(a){return t.quotation(e.row)}}},[t._v(t._s(t.$t("quotation.报价")))]):t._e(),"SGAssign"==t.$route.name?a("el-link",{staticClass:"mg-r-15",attrs:{type:"primary",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(a){return t.assign(e.row)}}},[t._v(t._s(t.$t("quotation.分配")))]):t._e(),a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.openDetail(e.row)}}},[t._v(t._s(t.$t("quotation.详情")))])]}}],null,!1,3248845272)}):t._e(),"SGSearch"==t.$route.name?a("el-table-column",{attrs:{label:t.$t("quotation.状态"),width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==t.$store.state.userInfo.offerProductDistribute?[1==e.row.status?a("span",[t._v(t._s(t.$t("quotation.待报价")))]):t._e(),2==e.row.status?a("span",[t._v(t._s(t.$t("quotation.已完成")))]):t._e(),9==e.row.status?a("span",[t._v(t._s(t.$t("quotation.无法搜品")))]):t._e()]:[1!=e.row.status||e.row.subUserId&&0!=e.row.subUserId?t._e():a("span",[t._v(t._s(t.$t("quotation.待分配")))]),1==e.row.status&&e.row.subUserId&&0!=e.row.subUserId?a("span",[t._v(t._s(t.$t("quotation.待报价")))]):t._e(),2==e.row.status?a("span",[t._v(t._s(t.$t("quotation.已完成")))]):t._e(),9==e.row.status?a("span",[t._v(t._s(t.$t("quotation.无法搜品")))]):t._e()]]}}],null,!1,290386706)}):t._e()],1):a("div",{staticClass:"noProduct"},[a("div",[t._v(t._s(t.$t("quotation.暂无数据展示")))])])],1),a("dialogDetail",{attrs:{data:t.dialogDetail}})],1)}),o=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.data?a("el-dialog",{attrs:{visible:t.data.isShow,width:"700px",title:t.$t("quotation.详情")},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticStyle:{height:"500px",overflow:"auto"}},[a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.基础信息")))]),a("el-form",{ref:"baseForm",attrs:{"label-position":"left"}},[a("el-form-item",{staticClass:"img-box",attrs:{label:t.$t("quotation.图片："),"label-width":"150px"}},[t.data.data.imgUrlJson?a("div",{staticClass:"d-flex",staticStyle:{"flex-wrap":"wrap"}},t._l(t.data.data.imgUrlJson,(function(t){return a("div",{key:t,staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t,"z-index":9999,fit:"cover"}})],1)})),0):t._e()]),a("el-form-item",{attrs:{label:t.$t("quotation.商品名称")+":","label-width":"150px"}},[t.data.data.name?a("span",[t._v(t._s(t.data.data.name))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.价格")+":","label-width":"150px"}},[t.data.data.minPrice&&t.data.data.maxPrice?a("span",[t._v("$"+t._s(t.data.data.minPrice)+"-"+t._s(t.data.data.maxPrice))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.商品链接")+":","label-width":"150px"}},[t.data.data.url?a("span",[t._v(t._s(t.data.data.url))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.描述")+":","label-width":"150px"}},[t.data.data.description?a("span",[t._v(t._s(t.data.data.description))]):a("span",[t._v("---")])]),"SGAssign"!=t.$route.name?a("el-form-item",{attrs:{label:t.$t("quotation.分配人")+":","label-width":"150px"}},[t.data.data.subUserName?a("span",[t._v(t._s(t.data.data.subUserName))]):a("span",[t._v("---")])]):t._e()],1)],1),"SGFinish"==t.$route.name||"SGNone"==t.$route.name?a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.回复信息")))]),"SGFinish"==t.$route.name?[t.data.data.vendorProduct?a("el-form",{ref:"productForm",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{"label-width":"150px",label:t.$t("quotation.回复价格")+":"}},[t.data.data.vendorProduct.cost?a("span",[t._v("$"+t._s(t.data.data.vendorProduct.cost))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{"label-width":"150px",label:t.$t("quotation.回复时间")+":"}},[t._v(" "+t._s(t.$moment(1e3*t.data.data.timeUpdate).format("YYYY-MM-DD HH:mm:ss"))+" ")]),a("el-form-item",{attrs:{"label-width":"150px",label:t.$t("quotation.备注")+":"}},[t.data.data.remark?a("span",[t._v(t._s(t.data.data.remark))]):a("span",[t._v("---")])])],1):t._e()]:[a("el-form",{ref:"productForm",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{"label-width":"150px",label:t.$t("quotation.失败原因")+":"}},[t.data.data.remark?a("span",[t._v(t._s(t.data.data.remark))]):a("span",[t._v("---")])])],1)]],2):t._e()]),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("quotation.关闭")))])],1)],1):t._e()],1)},n=[],u={props:["data"],data:function(){return{}},methods:{},components:{}},c=u,d=(a("80c4"),a("cba8")),m=Object(d["a"])(c,l,n,!1,null,"041875cc",null),f=m.exports,p={props:["loading","items","categroyArr","filterData"],data:function(){return{selectLoading:!1,selectArr:[],isAllCheck:!1,checkboxArr:[],productTypeArr:this.$dict.productTypeArr,productItem:{},dialogDetail:{isShow:!1,data:{}}}},components:{dialogDetail:f},watch:{checkboxArr:function(){this.isAllCheck=this.items.length&&this.items.length==this.checkboxArr.length}},methods:{quotation:function(t){this.$router.push({name:"quotationGoods",query:{id:t.id,waitDistribute:this.waitDistribute}})},changeAllCheckbox:function(t){this.checkboxArr=t?this.items.map((function(t){return t.id})):[]},remoteMethodCustom:function(t){var e=this;this.selectArr=[],t&&(this.selectLoading=!0,this.$apiCall("api.SubUser.findByUser",{nameLike:t},(function(t){e.selectLoading=!1,9999==t.ErrorCode?(e.selectArr=t.Data.Results,"SGQuotation"!=e.$route.name&&e.selectArr.push({name:e.$store.state.userInfo.name,id:"0"})):e.$message({message:t.Message,type:"error"})})))},assign:function(t){"All"==t?this.$emit("assign",this.checkboxArr):(this.selectArr=[],this.selectArr.push(t.id),this.$emit("assign",this.selectArr))},openDetail:function(t){this.dialogDetail.data=this.productItem=t,this.dialogDetail.isShow=!0},assignAll:function(){this.assign("All")},dateChange:function(){this.filterData.date.length>1&&(this.filterData.dateFrom=this.$moment(this.filterData.date[0]).format("YYYY-MM-DD"),this.filterData.dateTo=this.$moment(this.filterData.date[1]).format("YYYY-MM-DD"),this.filterGetItem())},filterGetItem:function(){this.$emit("filterGetItem")},clearFilter:function(t){this.selectArr=[],this.$emit("clearFilter",t)}}},g=p,h=(a("2195"),a("bb8a0"),Object(d["a"])(g,r,o,!1,null,"facb2a66",null)),b=h.exports,$={data:function(){return{distributedNum:0,waitDistributeNum:0,offerProductDistribute:2,form:{staff:"",idList:[]},roleList:[],staffList:[],isSetect:!1,status:"",statusIn:"",waitDistribute:"",assignDialog:!1,selectAssignDialog:!1,isOpenAssign:!1,loading:!1,pageKey:(new Date).valueOf(),activeName:"",pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))?Number(localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))):10,items:[],total:0,totalPage:0,productTypeArr:this.$dict.productTypeArr,filterData:{name:"",nameIpt:"",date:[],dateFrom:"",dateTo:"",subUserId:"",subUserIdCompleted:"",type:""},defaultFilterData:"{}"}},components:{Sub:b},computed:{},watch:{$route:"gotoPage"},mounted:function(){this.defaultFilterData=JSON.stringify(this.filterData),this.$store.state.userInfo.offerProductDistribute&&1==this.$store.state.userInfo.offerProductDistribute?this.isOpenAssign=!0:this.isOpenAssign=!1,this.activeName=this.$route.name,this.changeStatus(),this.getRole(),this.getNum()},methods:{getNum:function(){var t=this;this.$apiCall("api.OfferProduct.getVendorAllOfferProductCnt",{waitDistribute:this.isOpenAssign?"1":"2"},(function(e){9999==e.ErrorCode?(t.waitDistributeNum=e.Data.Results.waitDistributeNum?e.Data.Results.waitDistributeNum:0,t.distributedNum=e.Data.Results.distributedNum?e.Data.Results.distributedNum:0):t.$message({message:e.Message,type:"error"})}))},assignStaff:function(){var t=this;this.$apiCall("api.OfferProduct.distributeSubUser",{idList:this.form.idList,subUserId:this.form.staff},(function(e){9999==e.ErrorCode?(t.closeSelectAssign(),t.getItems(),t.getNum(),t.$message({message:t.$t("shop.分配成功"),type:"success"})):t.$message({message:e.Message,type:"error"})}))},closeSelectAssign:function(){this.selectAssignDialog=!1,this.form={roleId:"",staff:"",idList:[]},this.isSetect=!1},staffChange:function(){var t=this;this.form.staff="",this.isSetect=!0,this.$apiCall("api.SubUser.findByUser",{page:this.page,rowsPerPage:this.rowsPerPage,roleId:this.form.roleId},(function(e){9999==e.ErrorCode?t.staffList=e.Data.Results:t.$message({message:e.Message,type:"error"})}))},getRole:function(){var t=this;this.$apiCall("api.UserRole.findByUser",{},(function(e){9999==e.ErrorCode?t.roleList=e.Data.Results:t.$message({message:e.Message,type:"error"})}))},assign:function(t){this.form.idList=t,this.selectAssignDialog=!0},changeStatus:function(){switch(this.$route.name){case"SGAssign":this.status=1,this.waitDistribute=1;break;case"SGQuotation":this.status=1,this.waitDistribute=2;break;case"SGFinish":this.status=2,this.waitDistribute="";break;case"SGNone":this.status=9,this.waitDistribute="";break;case"SGSearch":this.status="",this.waitDistribute="";break}this.getItems()},changeAssign:function(t){this.offerProductDistribute="open"==t?1:2,this.assignDialog=!0},closeAssign:function(){var t=this;this.$apiCall("api.OfferProduct.changeUserDistributed",{offerProductDistribute:this.offerProductDistribute},(function(e){9999==e.ErrorCode?(t.assignDialog=!1,t.isOpenAssign=!t.isOpenAssign,t.$store.state.userInfo.offerProductDistribute=t.offerProductDistribute,2==t.offerProductDistribute&&t.$router.push({name:"SGQuotation"}),t.getNum(),t.$message({message:1==t.offerProductDistribute?t.$t("quotation.开启成功"):t.$t("quotation.关闭成功"),type:"success"})):t.$message({message:e.Message,type:"error"})}))},getItems:function(t){var e=this;this.loading=!0;var a={subUserIdCompleted:this.filterData.subUserIdCompleted,statusIn:this.statusIn,status:this.status,waitDistribute:this.waitDistribute,nameLike:this.filterData.name,subUserId:this.filterData.subUserId,timeCreatedFrom:this.filterData.dateFrom,timeCreatedTo:this.filterData.dateTo,page:this.page,rowsPerPage:this.rowsPerPage};"SGSearch"==this.$route.name&&(a.isManageList=1),this.$apiCall("api.OfferProduct.findByVendor",a,(function(a){e.loading=!1,9999==a.ErrorCode?(e.items=a.Data.Results.map((function(t){return t.imgUrlArr=t.imgUrlJson,t.vendorProduct&&(t.vendorProduct.imgUrlArr=JSON.parse(t.vendorProduct.imgUrlJson)),t})),e.total=Number(a.Data.Pagination.totalCount),e.totalPage=Number(a.Data.Pagination.totalPage),t||(e.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0)):e.$message({message:a.Message,type:"error"})}))},handleClick:function(t){t.name==this.$route.name?this.pageKey=(new Date).valueOf():(this.clearFilter("none"),this.$refs.subPage.checkboxArr=[],this.$router.push({name:t.name}))},filterGetItem:function(){1==this.filterData.type?(this.statusIn="",this.status=this.filterData.type):2==this.filterData.type&&(this.status="",this.statusIn="2,9"),this.page=1,this.getItems()},clearFilter:function(t){switch(t){case"name":this.filterData.nameIpt=this.filterData.name="";break;case"date":this.filterData.date=[],this.filterData.dateFrom=this.filterData.dateTo="";break;case"subUserId":this.filterData.subUserId="";break;case"subUserIdCompleted":this.filterData.subUserIdCompleted="";break;case"status":this.filterData.type=this.status="",this.statusIn="";break;default:"SGSearch"==this.$route.name&&(this.status=""),this.statusIn="",this.filterData=JSON.parse(this.defaultFilterData)}"none"!=t&&this.toPage(1)},gotoPage:function(){var t=this;this.page=this.$route.query.page?this.$route.query.page:1,this.$route.name!=this.activeName?(this.clearFilter(),this.$refs["subPage"].selectArr=[],this.activeName=this.$route.name,this.$nextTick((function(){t.changeStatus()}))):this.$nextTick((function(){t.getItems()}))},toPage:function(t){t!=this.$route.query.page?this.$router.push({query:{page:t}}):this.getItems()},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("".concat(this.$route.name,"RowsPerPage"),t),this.getItems()}}},v=$,_=(a("ddc4"),Object(d["a"])(v,s,i,!1,null,null,null));e["default"]=_.exports},"7c4e":function(t,e,a){},"80c4":function(t,e,a){"use strict";a("84ec")},"84ec":function(t,e,a){},"88a7":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"select-product"},[s("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.data.loading,expression:"data.loading"}],attrs:{visible:t.data.isShow,title:t.$t("storeSetting.选择商品"),width:"600px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)},close:t.closeDialog}},[s("el-divider"),s("div",[s("el-form",{staticStyle:{"margin-bottom":"10px !important"},attrs:{inline:!0,size:"mini"}},[t.up?t._e():s("el-form-item",[s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:t.$t("storeSetting.请选择")},on:{change:function(e){return t.filterGetItem("status")}},model:{value:t.filterData.status,callback:function(e){t.$set(t.filterData,"status",e)},expression:"filterData.status"}},[s("el-option",{attrs:{label:t.$t("storeSetting.全部"),value:""}}),s("el-option",{attrs:{label:t.$t("storeSetting.上架"),value:"1"}}),s("el-option",{attrs:{label:t.$t("storeSetting.下架"),value:"2"}})],1)],1),s("el-form-item",[s("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:t.$t("goods.商品名称")},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.name,callback:function(e){t.$set(t.filterData,"name",e)},expression:"filterData.name"}})],1),s("el-form-item",{staticStyle:{"margin-bottom":"0"}},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.filterGetItem()}}},[t._v(t._s(t.$t("myinvoice.filter")))]),s("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("goods.重置")))])],1)],1)],1),s("el-divider"),s("div",{staticClass:"action"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.goToGoods}},[t._v(t._s(t.$t("storeSetting.管理商品")))]),s("div",{staticClass:"refresh",on:{click:t.getItems}},[s("i",{staticClass:"el-icon-refresh-right"}),s("span",{staticClass:"mg-l-5"},[t._v(t._s(t.$t("storeSetting.刷新")))])])],1),s("el-divider"),t.data.item&&t.data.item.length?s("el-table",{ref:"productTable",attrs:{data:t.data.item,stripe:"",height:"300px"}},[s("el-table-column",{attrs:{label:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.statusIpt?s("el-radio",{staticClass:"none-label",attrs:{label:e.row.id},model:{value:t.productData,callback:function(e){t.productData=e},expression:"productData"}},[t._v(t._s(""))]):t._e()]}}],null,!1,768795816)}),s("el-table-column",{attrs:{label:t.$t("goods.商品图片"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("el-image",{staticStyle:{width:"60px",height:"60px",border:"1px solid #ddd","background-color":"#fff"},attrs:{src:t.row.imgUrl,fit:"contain","scroll-container":".main-scroll .el-scrollbar__wrap","preview-src-list":t.row.imgUrlArr}},[s("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline"})])])]}}],null,!1,2968517507)}),s("el-table-column",{attrs:{label:t.$t("goods.商品名称")},scopedSlots:t._u([{key:"default",fn:function(e){return[s("p",{staticClass:" tx-ellipsis3",staticStyle:{"line-height":"22px"}},[t._v(t._s(e.row.name))])]}}],null,!1,3350555405)}),s("el-table-column",{attrs:{label:t.$t("storeSetting.状态"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.statusIpt?s("el-tag",[t._v(t._s(t.$t("storeSetting.上架")))]):s("el-tag",{attrs:{type:"success"}},[t._v(t._s(t.$t("storeSetting.下架")))])]}}],null,!1,73026675)})],1):s("div",{staticClass:"no-data"},[s("img",{attrs:{src:a("069c")}}),s("div",[t._v(t._s(t.$t("storeSetting.暂无数据"))+"，"),s("span",{on:{click:t.goToGoods}},[t._v(t._s(t.$t("storeSetting.去添加商品")))])])]),s("div",{ref:"tableFooter",staticStyle:{margin:"10px 0 20px"}},[t.data.item&&t.data.item.length?s("el-row",{attrs:{gutter:20}},[s("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[s("div",[s("el-pagination",{attrs:{small:"","current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"pager-count":Number(5),"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1),s("el-divider"),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.closeDialog}},[t._v(t._s(t.$t("storeSetting.取消")))]),s("el-button",{attrs:{type:"primary",disabled:!t.productData},on:{click:t.AddGoods}},[t._v(t._s(t.$t("storeSetting.添加")))])],1)],1)],1)},i=[],r=a("2791"),o=(a("f203"),a("1baf"),a("5ad0"),a("09a7"),a("e456"),a("af46"),{props:["data","up"],data:function(){return{host:location.host,productItem:{},productData:"",filterData:{name:"",status:""},defaultFilterData:"{}",pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))?Number(localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))):10,total:0,totalPage:0,loading:!1}},mounted:function(){this.up&&(this.filterData.status=1),this.getItems(),this.defaultFilterData=JSON.stringify(this.filterData)},watch:{$route:"gotoPage","data.menuData":{deep:!0,handler:function(){this.data.menuData.urlData&&(this.productData=this.data.menuData.urlData.id)}}},methods:{getItems:function(){var t=this;this.loading=!0,this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterData.name,status:this.filterData.status},(function(e){t.loading=!1,9999==e.ErrorCode?(t.data.item=e.Data.Results.map((function(t){return t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t})),t.total=Number(e.Data.Pagination.totalCount),t.totalPage=Number(e.Data.Pagination.totalPage),t.$refs.productTable&&(t.$refs.productTable.bodyWrapper.scrollTop=0)):t.$message({message:e.Message,type:"error"})}))},filterGetItem:function(){this.page=1,this.productData="",this.getItems()},clearFilter:function(t){switch(t){case"name":this.filterData.name="";break;default:this.filterData=JSON.parse(this.defaultFilterData)}"none"!=t&&this.toPage(1)},AddGoods:function(){var t=this;this.productItem?(this.data.item.forEach((function(e){e.id==t.productData&&(t.productItem=e)})),"menuEditor"==this.$route.name?this.$emit("selectedProduct",this.productItem):"quotationGoods"==this.$route.name?(this.$parent.form.id=this.productItem.id,this.$parent.form.imgUrl=this.productItem.imgUrl,this.$parent.form.cost=this.productItem.cost,this.$parent.form=Object(r["a"])({},this.$parent.form)):(this.$parent.setting.name=this.productItem.name,this.$parent.setting.cost=this.productItem.cost,this.$parent.setting.imgUrl=this.productItem.imgUrl,this.$parent.setting.id=this.productItem.id,this.$parent.setting=Object(r["a"])({},this.$parent.setting)),this.closeDialog()):this.$message({message:"请选择一件商品",type:"error"})},goToGoods:function(){this.$router.push("/goods-mgr/all")},gotoPage:function(){var t=this;this.page=this.$route.query.page?this.$route.query.page:1,this.$nextTick((function(){t.getItems()}))},toPage:function(t){t!=this.$route.query.page?this.$router.push({query:{page:t,cid:this.$route.query.cid,id:this.$route.query.id}}):this.getItems()},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("".concat(this.$route.name,"RowsPerPage"),t),this.getItems()},closeDialog:function(){this.page=1,"quotationGoods"==this.$route.name?this.$router.push({query:{id:this.$route.query.id}}):this.$router.push({query:{cid:this.$route.query.cid}}),this.data.item={},this.productData="",this.productItem={},this.filterData=JSON.parse(this.defaultFilterData),this.data.isShow=!1}},components:{}}),l=o,n=(a("06fe"),a("cba8")),u=Object(n["a"])(l,s,i,!1,null,"3abd6944",null);e["a"]=u.exports},"9eca":function(t,e,a){},bb8a0:function(t,e,a){"use strict";a("dd73")},bdbc:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel transaction-page"},[a("el-link",{staticClass:"mg-r-20 mg-b-20",attrs:{icon:"el-icon-back",underline:!1},on:{click:t.returnTo}},[t._v(t._s(t.$t("quotation.报价")))]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.基础信息")))]),a("el-form",{ref:"baseForm",staticClass:"mg-t-20",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:t.$t("quotation.图片"),"label-width":"150px"}},[t.item.imgUrlJson?a("div",{staticClass:"d-flex",staticStyle:{"flex-wrap":"wrap"}},t._l(t.item.imgUrlJson,(function(t){return a("div",{key:t,staticClass:"upload"},[a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t,"z-index":9999,fit:"cover"}})],1)})),0):t._e()]),a("el-form-item",{attrs:{label:t.$t("quotation.商品名称"),"label-width":"150px"}},[t.item.name?a("span",[t._v(t._s(t.item.name))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.价格"),"label-width":"150px"}},[t.item.minPrice&&t.item.maxPrice?a("span",[t._v("$"+t._s(t.item.minPrice)+"-"+t._s(t.item.maxPrice))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.商品链接"),"label-width":"150px"}},[t.item.url?a("span",[t._v(t._s(t.item.url))]):a("span",[t._v("---")])]),a("el-form-item",{attrs:{label:t.$t("quotation.描述"),"label-width":"150px"}},[t.item.description?a("span",[t._v(t._s(t.item.description))]):a("span",[t._v("---")])])],1)],1)]),a("el-card",{staticClass:"mg-t-20"},[a("div",{staticClass:"addprobox"},[a("b",[t._v(t._s(t.$t("quotation.回复")))]),a("el-form",{ref:"replyForm",staticClass:"mg-t-20",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{"label-width":"100px"}},[a("el-radio",{attrs:{label:"1"},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(t._s(t.$t("quotation.有商品")))]),a("el-radio",{attrs:{label:"2"},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(t._s(t.$t("quotation.无商品")))]),a("el-radio",{attrs:{label:"3"},model:{value:t.form.radio,callback:function(e){t.$set(t.form,"radio",e)},expression:"form.radio"}},[t._v(t._s(t.$t("quotation.无法报价")))])],1),"1"==t.form.radio?[a("el-form-item",{attrs:{label:t.$t("quotation.添加商品"),"label-width":"150px",required:""}},[a("div",{staticClass:"d-flex"},[a("el-link",{attrs:{type:"primary"},on:{click:t.openSelect}},[t._v(t._s(t.$t("quotation.选择商品")))])],1)]),a("el-form-item",{attrs:{label:t.$t("quotation.商品图片"),"label-width":"150px",required:""}},[a("div",{staticClass:"upload"},[t.form.imgUrl?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.form.imgUrl,fit:"cover"}}):a("i",{staticClass:"el-icon-plus"})],1)]),a("el-form-item",{attrs:{label:t.$t("quotation.回复价格"),"label-width":"150px",required:""}},[a("el-input-number",{staticStyle:{width:"120px"},attrs:{disabled:"",min:0,controls:!1,precision:2},model:{value:t.form.cost,callback:function(e){t.$set(t.form,"cost",e)},expression:"form.cost"}})],1),a("el-form-item",{attrs:{label:t.$t("quotation.备注"),"label-width":"150px"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:"",placeholder:t.$t("quotation.请输入备注信息")},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)]:"2"==t.form.radio?[a("el-form-item",{attrs:{label:t.$t("quotation.新增商品"),"label-width":"100px"}},[a("el-link",{attrs:{type:"primary"},on:{click:t.goProduct}},[t._v("去上架")])],1)]:[a("el-form-item",{attrs:{label:t.$t("quotation.原因"),"label-width":"100px"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:"",placeholder:t.$t("quotation.请输入原因")},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],a("el-form-item",[a("el-divider"),a("div",{staticClass:"mg-t-20"},[a("el-button",{on:{click:t.returnTo}},[t._v(t._s(t.$t("quotation.取消")))]),a("el-button",{attrs:{type:"primary",disabled:"2"==t.form.radio},on:{click:t.quote}},[t._v(t._s(t.$t("quotation.确定")))])],1)],1)],2)],1)])],1)],1)],1),a("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:20}}),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(e){return t.Base64(e)}}}),a("selectProduct",{attrs:{data:t.dialogProductList,up:"up"}})],1)},i=[],r=(a("09a7"),a("e456"),a("af46"),a("cf33"),a("d183"),a("8f10"),a("88a7")),o={data:function(){return{dialogProductList:{isShow:!1,item:null},loading:!1,item:{},form:{id:"",radio:"1",imgUrl:"",cost:void 0,remark:""}}},components:{selectProduct:r["a"]},mounted:function(){this.getItems()},methods:{goProduct:function(){this.$router.push({name:"GoodsMgrAll"})},returnTo:function(){this.$router.push("/search-goods-quotation")},getProduct:function(){var t=this;this.$apiCall("api.VendorShop.vendorFindProducts",{status:1,page:1,rowsPerPage:10},(function(e){9999==e.ErrorCode?t.dialogProductList.item=e.Data.Results.map((function(t){return t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t})):t.$message({message:e.Message,type:"error"})}))},openSelect:function(){this.getProduct(),this.dialogProductList.isShow=!0},getItems:function(){var t=this;this.loading=!0,this.$apiCall("api.OfferProduct.findByVendor",{status:1,waitDistribute:this.$route.query.waitDistribute},(function(e){if(t.loading=!1,9999==e.ErrorCode){var a=[];a=e.Data.Results,a.forEach((function(e){e.id==t.$route.query.id&&(t.item=e)}))}else t.$message({message:e.Message,type:"error"})}))},uploadOpen:function(){document.getElementById("imgFile").click()},Base64:function(t){var e=this;if(t.target.value){if(t.target.files[0].size/1024/1024>1)return void this.$message({message:this.$t("shop.上传文件不能大于1MB"),type:"error"});var a=new FileReader,s=new Image,i="";a.onload=function(t){s.src=t.target.result;var a=t.target.result.match(/data:image\/(.*);base64,.*/);i=a[1],e.uploadImgBase64(t.target.result.split(",").pop(),i)},a.readAsDataURL(t.target.files[0])}},uploadImgBase64:function(t,e){var a=this;this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:t,ext:e},(function(t){a.loading=!1,9999==t.ErrorCode?a.form.imgUrl=t.Data.Results.imgUrl:a.$message.error(t.Message)}))},quote:function(){var t=this;"2"!=this.form.radio?this.form.id||"3"==this.form.radio?(this.loading=!0,this.$apiCall("api.OfferProduct.saveDetail",{id:this.$route.query.id,status:"3"==this.form.radio?"9":"2",productId:this.form.id,remark:this.form.remark},(function(e){t.loading=!1,9999==e.ErrorCode?(t.$message.success(t.$t("shop.报价成功")),t.returnTo()):t.$message.error(e.Message)}))):this.$message.error(this.$t("shop.请完善回复信息")):this.$message.error(this.$t("shop.请先去上架商品"))}}},l=o,n=(a("c43a"),a("cba8")),u=Object(n["a"])(l,s,i,!1,null,"223c79bf",null);e["default"]=u.exports},c43a:function(t,e,a){"use strict";a("f618")},dd73:function(t,e,a){},ddc4:function(t,e,a){"use strict";a("0c71")},f618:function(t,e,a){}}]);