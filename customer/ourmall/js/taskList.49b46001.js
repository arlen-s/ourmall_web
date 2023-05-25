(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["taskList"],{"09d9":function(t,e,s){"use strict";s("f0f2")},"35a9":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"contentpanel listHistory"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody mg-b-20"},[s("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[s("el-col",{attrs:{span:24}},[s("el-card",[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:24}},[s("div",{staticClass:"d-flex justify-content-between headView"},[t.task&&t.task.doneCnt!=t.task.allCnt?s("div",{staticClass:"d-flex"},[s("span",{staticClass:"mg-r-10"},[t._v(t._s(t.$t("Upload Progress"))+":")]),t.task.doneCnt/t.task.allCnt*100>=0&&t.task.doneCnt/t.task.allCnt*100<=100?s("el-progress",{staticStyle:{width:"500px"},attrs:{"stroke-width":18,percentage:parseInt(t.task.doneCnt/t.task.allCnt*100)}}):s("el-progress",{staticStyle:{width:"500px"},attrs:{"stroke-width":18,percentage:0}})],1):s("div"),s("div",{staticClass:"d-flex"},[s("el-checkbox",{attrs:{value:t.AllChecked},on:{change:function(e){return t.allSelect(e)}}},[t._v(t._s(t.$t("All")))]),s("el-button",{staticClass:"del",attrs:{type:"primary"},on:{click:function(e){return t.delItems()}}},[t._v(t._s(t.$t("Delete")))])],1)]),s("el-row",{ref:"gridTable",attrs:{gutter:10}},[t.items.length?t._e():s("el-col",{attrs:{span:24}},[s("p",{staticStyle:{"margin-top":"25px","font-size":"16px",color:"#909399","text-align":"center"}},[t._v(" "+t._s(t.$t("no product"))+" ")])]),t._l(t.items,(function(e){return s("el-col",{key:e.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[s("div",{staticClass:"product-box"},[s("div",{staticClass:"status"},[s("span",[t._v(t._s(t._f("listStatus")(e.status)))]),s("el-checkbox",{attrs:{checked:e.ischeck},model:{value:e.ischeck,callback:function(s){t.$set(e,"ischeck",s)},expression:"item.ischeck"}})],1),s("div",{staticClass:"img-wrap"},[s("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{fit:"cover",src:e.product.mainImg,"preview-src-list":[e.product.mainImg]}})],1),s("div",{staticClass:"info"},[s("p",{staticClass:"name tx-ellipsis2"},[s("span",{attrs:{color:"#303133"}},[t._v(t._s(e.product.name))])]),s("div",{staticClass:"price tx-ellipsis1"},[t._v(" "+t._s(t.$t("Cost price"))+": "),s("span",[s("span",{staticStyle:{"font-size":"13px"}},[t._v(t._s(e.stocks[0].currency?e.stocks[0].currency:"USD"))]),t._v(" "+t._s(t.showPrice(e))+" ")])]),s("div",{staticClass:"push-warp"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(s){return t.delItems(e)}}},[t._v(t._s(t.$t("Delete Task")))])],1)])])])}))],2)],1)],1)],1),t.items.length?s("el-row",{staticStyle:{"margin-top":"20px"},attrs:{gutter:20}},[s("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[s("div",{staticStyle:{"margin-bottom":"30px"}},[s("el-pagination",{attrs:{"current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSizes,"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1)],1)],1)])},r=[],o=(s("99af"),s("a9e3"),s("b680"),s("159b"),{data:function(){return{timer:null,taskList:[],task:{},loading:!1,allChecked:!1,items:[],ids:[],pageSizes:[12,24,48],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_importPerPage")?Number(localStorage.getItem("c_importPerPage")):12,total:0,totalPage:0}},watch:{$route:"gotoPage"},computed:{AllChecked:function(){var t=!0;return this.items.length?this.items.forEach((function(e){e.ischeck||(t=!1)})):t=!1,t}},filters:{listStatus:function(t){switch(t){case"1":return"Waiting";case"2":return"Processing";case"3":return"Succeeded";default:return"Failed"}}},mounted:function(){var t=this;this.getImportTask(),this.timer=setInterval((function(){t.task.allCnt==t.task.doneCnt?(clearInterval(t.timer),t.timer=null):t.getImportTask()}),1e3),this.getImportTaskDetail()},beforeDestroy:function(){clearInterval(this.timer),this.timer=null},methods:{getImportTask:function(){var t=this;this.$apiCall("api.Product.findsImportTask",{},(function(e){9999==e.ErrorCode&&(t.taskList=e.Data.Results,t.taskList.forEach((function(e){e.id==t.$route.query.id&&(t.task=e)})),t.getImportTaskDetail(a))}))},toPage:function(t){t!=this.$route.query.page?this.$router.push({query:{page:t}}):this.getImportTaskDetail()},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("c_importPerPage",t),this.getImportTaskDetail()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getImportTaskDetail()},allSelect:function(t){var e=this;this.items.forEach((function(s){e.$set(s,"ischeck",t)}))},delItems:function(t){var e=this;if(t?this.ids.push(t.id):this.items.forEach((function(t){1==t.ischeck&&e.ids.push(t.id)})),0==this.ids.length)return this.$elementMessage("Select the task","error"),!1;this.$confirm("Do you want to delete this task?","Tips",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then((function(){e.$apiCall("api.Product.delImportTaskDetail",{ids:e.ids},(function(t){9999==t.ErrorCode?(e.ids=[],e.allChecked=!1,e.getImportTaskDetail(),e.$elementMessage("Delete Completed","success")):e.$elementMessage(t.Message,"error")}))})).catch((function(){return e.ids=[],!1}))},showPrice:function(t){var e=0,s=0;return t.stocks.some((function(t){if(t.costPrice)return e=s=Number(t.costPrice),!0})),t.stocks.forEach((function(t){t.costPrice&&e>Number(t.costPrice)&&(e=Number(t.costPrice)),t.costPrice&&s<Number(t.costPrice)&&(s=Number(t.costPrice))})),e==s?e.toFixed(2):"".concat(e," - ").concat(s)},getImportTaskDetail:function(t){var e=this;t||(this.loading=!0),this.$apiCall("api.Product.findsImportTaskDetail",{taskId:this.$route.query.id,page:this.page,rowsPerPage:this.rowsPerPage},(function(s){e.loading=!1,9999==s.ErrorCode?t?e.$set(e.items,"status",s.Data.Results.status):(e.items=s.Data.Results,e.$set(e.items,"ischeck",!1),e.total=Number(s.Data.Pagination.totalCount),e.totalPage=Number(s.Data.Pagination.totalPage),e.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0):e.$elementMessage(s.Message,"error")}))}},components:{}}),n=o,c=(s("09d9"),s("2877")),l=Object(c["a"])(n,i,r,!1,null,"0eebfdd8",null);e["default"]=l.exports},f0f2:function(t,e,s){}}]);
//# sourceMappingURL=taskList.49b46001.js.map