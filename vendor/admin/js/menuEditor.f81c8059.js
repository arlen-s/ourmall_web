(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["menuEditor"],{"0592":function(t,e,a){},"069c":function(t,e,a){t.exports=a.p+"img/noData.46b81b49.png"},2067:function(t,e,a){"use strict";a("9f87")},2626:function(t,e,a){"use strict";var i=a("d066"),s=a("9bf2"),o=a("b622"),r=a("83ab"),l=o("species");t.exports=function(t){var e=i(t),a=s.f;r&&e&&!e[l]&&a(e,l,{configurable:!0,get:function(){return this}})}},"2c3e":function(t,e,a){var i=a("83ab"),s=a("9f7f").MISSED_STICKY,o=a("c6b6"),r=a("edd0"),l=a("69f3").get,n=RegExp.prototype,c=TypeError;i&&s&&r(n,"sticky",{configurable:!0,get:function(){if(this!==n){if("RegExp"===o(this))return!!l(this).sticky;throw c("Incompatible receiver, RegExp required")}}})},"2d6f":function(t,e,a){"use strict";a("92af")},"4d63":function(t,e,a){var i=a("83ab"),s=a("da84"),o=a("e330"),r=a("94ca"),l=a("7156"),n=a("9112"),c=a("241c").f,u=a("3a9b"),d=a("44e7"),g=a("577e"),m=a("90d8"),p=a("9f7f"),f=a("aeb0"),h=a("cb2d"),v=a("d039"),y=a("1a2d"),S=a("69f3").enforce,b=a("2626"),C=a("b622"),$=a("fce3"),_=a("107c"),D=C("match"),w=s.RegExp,x=w.prototype,k=s.SyntaxError,I=o(x.exec),P=o("".charAt),N=o("".replace),E=o("".indexOf),O=o("".slice),R=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,J=/a/g,U=/a/g,L=new w(J)!==J,z=p.MISSED_STICKY,q=p.UNSUPPORTED_Y,M=i&&(!L||z||$||_||v((function(){return U[D]=!1,w(J)!=J||w(U)==U||"/a/i"!=w(J,"i")}))),T=function(t){for(var e,a=t.length,i=0,s="",o=!1;i<=a;i++)e=P(t,i),"\\"!==e?o||"."!==e?("["===e?o=!0:"]"===e&&(o=!1),s+=e):s+="[\\s\\S]":s+=e+P(t,++i);return s},A=function(t){for(var e,a=t.length,i=0,s="",o=[],r={},l=!1,n=!1,c=0,u="";i<=a;i++){if(e=P(t,i),"\\"===e)e+=P(t,++i);else if("]"===e)l=!1;else if(!l)switch(!0){case"["===e:l=!0;break;case"("===e:I(R,O(t,i+1))&&(i+=2,n=!0),s+=e,c++;continue;case">"===e&&n:if(""===u||y(r,u))throw new k("Invalid capture group name");r[u]=!0,o[o.length]=[u,c],n=!1,u="";continue}n?u+=e:s+=e}return[s,o]};if(r("RegExp",M)){for(var F=function(t,e){var a,i,s,o,r,c,p=u(x,this),f=d(t),h=void 0===e,v=[],y=t;if(!p&&f&&h&&t.constructor===F)return t;if((f||u(x,t))&&(t=t.source,h&&(e=m(y))),t=void 0===t?"":g(t),e=void 0===e?"":g(e),y=t,$&&"dotAll"in J&&(i=!!e&&E(e,"s")>-1,i&&(e=N(e,/s/g,""))),a=e,z&&"sticky"in J&&(s=!!e&&E(e,"y")>-1,s&&q&&(e=N(e,/y/g,""))),_&&(o=A(t),t=o[0],v=o[1]),r=l(w(t,e),p?this:x,F),(i||s||v.length)&&(c=S(r),i&&(c.dotAll=!0,c.raw=F(T(t),a)),s&&(c.sticky=!0),v.length&&(c.groups=v)),t!==y)try{n(r,"source",""===y?"(?:)":y)}catch(b){}return r},G=c(w),V=0;G.length>V;)f(F,w,G[V++]);x.constructor=F,F.prototype=x,h(s,"RegExp",F,{constructor:!0})}b("RegExp")},"598f":function(t,e,a){},"788b":function(t,e,a){"use strict";a("0592")},"7ad4":function(t,e,a){"use strict";a("e478")},"88a7":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"select-product"},[i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.data.loading,expression:"data.loading"}],attrs:{visible:t.data.isShow,title:t.$t("storeSetting.选择商品"),width:"600px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)},close:t.closeDialog}},[i("el-divider"),i("div",[i("el-form",{staticStyle:{"margin-bottom":"10px !important"},attrs:{inline:!0,size:"mini"}},[t.up?t._e():i("el-form-item",[i("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:t.$t("storeSetting.请选择")},on:{change:function(e){return t.filterGetItem("status")}},model:{value:t.filterData.status,callback:function(e){t.$set(t.filterData,"status",e)},expression:"filterData.status"}},[i("el-option",{attrs:{label:t.$t("storeSetting.全部"),value:""}}),i("el-option",{attrs:{label:t.$t("storeSetting.上架"),value:"1"}}),i("el-option",{attrs:{label:t.$t("storeSetting.下架"),value:"2"}})],1)],1),i("el-form-item",[i("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:t.$t("goods.商品名称")},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.name,callback:function(e){t.$set(t.filterData,"name",e)},expression:"filterData.name"}})],1),i("el-form-item",{staticStyle:{"margin-bottom":"0"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.filterGetItem()}}},[t._v(t._s(t.$t("myinvoice.filter")))]),i("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("goods.重置")))])],1)],1)],1),i("el-divider"),i("div",{staticClass:"action"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.goToGoods}},[t._v(t._s(t.$t("storeSetting.管理商品")))]),i("div",{staticClass:"refresh",on:{click:t.getItems}},[i("i",{staticClass:"el-icon-refresh-right"}),i("span",{staticClass:"mg-l-5"},[t._v(t._s(t.$t("storeSetting.刷新")))])])],1),i("el-divider"),t.data.item&&t.data.item.length&&null==t.data.variableId?i("el-table",{ref:"productTable",attrs:{data:t.data.item,stripe:"",height:"300px"}},[i("el-table-column",{attrs:{label:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.statusIpt?i("el-radio",{staticClass:"none-label",attrs:{label:e.row.id},model:{value:t.productData,callback:function(e){t.productData=e},expression:"productData"}},[t._v(t._s(""))]):t._e()]}}],null,!1,768795816)}),i("el-table-column",{attrs:{label:t.$t("goods.商品图片"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("el-image",{staticStyle:{width:"60px",height:"60px",border:"1px solid #ddd","background-color":"#fff"},attrs:{src:t.row.imgUrl,fit:"contain","scroll-container":".main-scroll .el-scrollbar__wrap","preview-src-list":t.row.imgUrlArr}},[i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"})])])]}}],null,!1,2968517507)}),i("el-table-column",{attrs:{label:t.$t("goods.商品名称")},scopedSlots:t._u([{key:"default",fn:function(e){return[i("p",{staticClass:"tx-ellipsis3",staticStyle:{"line-height":"22px"}},[t._v(t._s(e.row.name))])]}}],null,!1,2941362605)}),i("el-table-column",{attrs:{label:t.$t("storeSetting.状态"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.statusIpt?i("el-tag",[t._v(t._s(t.$t("storeSetting.上架")))]):i("el-tag",{attrs:{type:"success"}},[t._v(t._s(t.$t("storeSetting.下架")))])]}}],null,!1,73026675)})],1):t.data.item&&t.data.item.length&&t.data.variableId?i("div",[i("el-table",{staticClass:"no-hover",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.data.item,height:"300px"}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"","show-header":!1,data:e.row.stocks}},[i("el-table-column",{attrs:{label:t.$t("orders.select"),width:"55"},scopedSlots:t._u([{key:"default",fn:function(a){return[i("el-radio",{attrs:{label:a.row.sku},on:{change:function(i){return t.changeHandler(a.row.sku,e.row)}},model:{value:t.tableRadio,callback:function(e){t.tableRadio=e},expression:"tableRadio"}},[i("i")])]}}],null,!0)}),i("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"d-flex"},[i("el-image",{staticStyle:{width:"60px",height:"60px"},attrs:{src:e.row.propertyImage,fit:"cover"}}),i("div",{staticClass:"mg-l-20"},[i("p",[t._v(t._s(e.row.name))]),i("p",[t._v("SKU: "+t._s(e.row.sku))])])],1)]}}],null,!0)})],1)]}}])}),i("el-table-column",{attrs:{label:t.$t("orders.productinfo")},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"d-flex"},[i("img",{attrs:{src:e.row.imgUrl,width:"60",height:"60"}}),i("div",{staticClass:"mg-l-20"},[i("p",[t._v(t._s(e.row.name))]),i("p",[t._v("SPU: "+t._s(e.row.sku))])])])]}}])})],1)],1):i("div",{staticClass:"no-data"},[i("img",{attrs:{src:a("069c")}}),i("div",[t._v(t._s(t.$t("storeSetting.暂无数据"))+"，"),i("span",{on:{click:t.goToGoods}},[t._v(t._s(t.$t("storeSetting.去添加商品")))])])]),i("div",{ref:"tableFooter",staticStyle:{margin:"10px 0 20px"}},[t.data.item&&t.data.item.length?i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{small:"","current-page":Number(t.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":t.pageSize,"pager-count":Number(5),"page-size":t.rowsPerPage,total:Number(t.total)},on:{"current-change":t.toPage,"size-change":t.changePageSize}})],1)])],1):t._e()],1),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeDialog}},[t._v(t._s(t.$t("storeSetting.取消")))]),i("el-button",{attrs:{type:"primary",disabled:t.data.variableId?!t.tableRadio:!t.productData},on:{click:t.AddGoods}},[t._v(t._s(t.$t("storeSetting.添加")))])],1)],1)],1)},s=[],o=a("5530"),r=(a("a9e3"),a("b0c0"),a("e9c4"),a("d81d"),a("d3b7"),a("159b"),{props:["data","up"],data:function(){return{host:location.host,productItem:{},productData:"",filterData:{name:"",status:""},tableRadio:"",defaultFilterData:"{}",pageSize:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))?Number(localStorage.getItem("".concat(this.$route.name,"RowsPerPage"))):10,total:0,totalPage:0,loading:!1}},mounted:function(){this.up&&(this.filterData.status=1),this.getItems(),this.defaultFilterData=JSON.stringify(this.filterData)},watch:{$route:"gotoPage","data.menuData":{deep:!0,handler:function(){this.data.menuData.urlData&&(this.productData=this.data.menuData.urlData.id)}}},methods:{getItems:function(){var t=this;this.loading=!0,this.$apiCall("api.VendorShop.vendorFindProducts",{page:this.page,rowsPerPage:this.rowsPerPage,name:this.filterData.name,status:this.filterData.status},(function(e){t.tableRadio="",t.loading=!1,9999==e.ErrorCode?(t.data.item=e.Data.Results.products.map((function(t){return t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t})),t.total=Number(e.Data.Pagination.totalCount),t.totalPage=Number(e.Data.Pagination.totalPage),t.$refs.productTable&&(t.$refs.productTable.bodyWrapper.scrollTop=0)):t.$message({message:e.Message,type:"error"})}))},changeHandler:function(t,e){this.productItem=e,console.log(this.tableRadio,"vcvsdf"),console.log(e)},filterGetItem:function(){this.page=1,this.productData="",this.getItems()},clearFilter:function(t){switch(t){case"name":this.filterData.name="";break;default:this.filterData=JSON.parse(this.defaultFilterData)}"none"!=t&&this.toPage(1)},AddGoods:function(){var t=this;this.productItem?(this.data.item.forEach((function(e){e.id==t.productData&&(t.productItem=e)})),"menuEditor"==this.$route.name?this.$emit("selectedProduct",this.productItem):"quotationGoods"==this.$route.name?(this.$parent.form.id=this.productItem.id,this.$parent.form.imgUrl=this.productItem.imgUrl,this.$parent.form.cost=this.productItem.cost,this.$parent.form.vendorSku=this.tableRadio,this.$parent.form=Object(o["a"])({},this.$parent.form)):(this.$parent.setting.name=this.productItem.name,this.$parent.setting.cost=this.productItem.cost,this.$parent.setting.imgUrl=this.productItem.imgUrl,this.$parent.setting.id=this.productItem.id,this.$parent.setting=Object(o["a"])({},this.$parent.setting)),this.closeDialog()):this.$message({message:"请选择一件商品",type:"error"})},goToGoods:function(){this.$router.push("/goods-mgr/all")},gotoPage:function(){var t=this;this.page=this.$route.query.page?this.$route.query.page:1,this.$nextTick((function(){t.getItems()}))},toPage:function(t){t!=this.$route.query.page?this.$router.push({query:{page:t,cid:this.$route.query.cid,id:this.$route.query.id}}):this.getItems()},changePageSize:function(t){this.rowsPerPage=t,localStorage.setItem("".concat(this.$route.name,"RowsPerPage"),t),this.getItems()},closeDialog:function(){this.page=1,"quotationGoods"==this.$route.name?this.$router.push({query:{id:this.$route.query.id,variableId:this.data.variableId}}):this.$router.push({query:{cid:this.$route.query.cid,variableId:this.data.variableId}}),this.data.item={},this.productData="",this.productItem={},this.tableRadio="",this.filterData=JSON.parse(this.defaultFilterData),this.data.isShow=!1}},components:{}}),l=r,n=(a("788b"),a("2877")),c=Object(n["a"])(l,i,s,!1,null,"d1b27e04",null);e["a"]=c.exports},"92af":function(t,e,a){},9774:function(t,e,a){},"9e4f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel edit-menu-page"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.pageLoading,expression:"pageLoading"}],staticClass:"pagebody"},[a("el-card",{staticStyle:{"margin-bottom":"80px"}},[a("h2",{staticClass:"edit-title"},[t._v(t._s(t.$t("menuSetting.编辑")))]),a("el-row",{attrs:{gutter:15}},[a("el-col",{staticClass:"edit-row",attrs:{span:24}},[a("span",{staticClass:"tx-danger"},[t._v("*")]),a("span",{staticClass:"m-label"},[t._v(t._s(t.$t("menuSetting.菜单名称:")))]),a("el-input",{staticStyle:{width:"600px"},attrs:{maxlength:"50","show-word-limit":""},model:{value:t.editItem.name,callback:function(e){t.$set(t.editItem,"name",e)},expression:"editItem.name"}})],1)],1),a("el-divider"),a("el-row",{attrs:{gutter:15}},[t.hasMenuNum?[a("el-col",{staticClass:"setting-msg",attrs:{span:24}},[t._v(t._s(t.$t("menuSetting.菜单目录结构"))+" "),a("span",[t._v(t._s(t.$t("menuSetting.目录名称会展示在店铺网页上。 (改变顺序可拖拽，建议重下往上拖拽)")))])]),a("el-col",{staticClass:"tree-wrap",attrs:{span:24}},[a("el-tree",{ref:"menuTree",attrs:{data:t.editItem.menu,"node-key":"id",draggable:"","default-expand-all":"","expand-on-click-node":!1,"allow-drop":t.allowDrop},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.node,s=e.data;return a("div",{staticClass:"tree-node"},["bottom"!=s.id?a("div",[a("div",{staticClass:"left"},[a("i",{staticClass:"iconfont",class:s.children&&s.children.length?"icon-sub-nav":"icon-nav"}),a("div",{staticClass:"name",style:{marginRight:"25px"}},[a("el-input",{staticStyle:{width:"200px"},on:{blur:t.eventIpt,focus:t.eventIpt},model:{value:s.label,callback:function(e){t.$set(s,"label",e)},expression:"data.label"}})],1),a("div",{staticClass:"mg-r-15"},[a("el-select",{attrs:{placeholder:t.$t("menuSetting.链接页面")},on:{change:function(e){return t.changeRouter(s)}},model:{value:s.value,callback:function(e){t.$set(s,"value",e)},expression:"data.value"}},t._l(t.$dict.storeMenuArr,(function(e){return a("el-option",{key:e.value,attrs:{label:t.$t(e.label),value:e.value}})})),1)],1),"productDetails"==s.value?a("div",[s.urlData?[a("div",{staticClass:"product-box"},[a("el-image",{staticStyle:{width:"36px",height:"36px",border:"1px #DCDFE6 solid"},attrs:{src:s.urlData.imgUrl,fit:"contain"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])]),a("p",{staticClass:"name tx-ellipsis1"},[t._v(" "+t._s(s.urlData.name)+" ")]),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openSelect(s)}}},[t._v(t._s(t.$t("menuSetting.更改商品")))])],1)]:a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openSelect(s)}}},[t._v(t._s(t.$t("menuSetting.选择商品")))])],2):t._e(),"category"==s.value?a("div",[s.urlData?[a("div",{staticClass:"product-box"},[a("el-image",{staticStyle:{width:"36px",height:"36px",border:"1px #DCDFE6 solid"},attrs:{src:s.urlData.themeUrl,fit:"contain"}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])]),a("p",{staticClass:"name tx-ellipsis1"},[t._v(" "+t._s(s.urlData.name)+" ")]),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openSelectCategory(s)}}},[t._v(t._s(t.$t("menuSetting.更改分类")))])],1)]:a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openSelectCategory(s)}}},[t._v(t._s(t.$t("menuSetting.选择分类")))])],2):t._e(),"customPage"==s.value?a("div",[s.urlData?[a("div",{staticClass:"product-box"},[a("p",{staticClass:"name tx-ellipsis1"},[t._v(" "+t._s(s.urlData.title)+" ")]),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openSelectCustomPage(s)}}},[t._v(t._s(t.$t("menuSetting.更改自定义页面")))])],1)]:a("div",{staticClass:"d-flex"},[a("el-link",{staticClass:"mg-r-15",attrs:{type:"primary"},on:{click:function(e){return t.openSelectCustomPage(s)}}},[t._v(t._s(t.$t("menuSetting.选择自定义页面")))])],1)],2):t._e(),"9998"==s.value?a("div",{staticClass:"c-url"},[s.url?[a("a",{staticClass:"tx-ellipsis1",staticStyle:{"margin-right":"15px","max-width":"280px"},attrs:{href:s.url,target:"_blank"}},[t._v(t._s(s.url))]),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openCustomUrl(s)}}},[t._v(t._s(t.$t("menuSetting.更改")))])]:t._e(),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.openCustomUrl(s)}}},[t._v(t._s(t.$t("menuSetting.添加链接")))])],2):t._e()]),a("div",{staticClass:"right"},[s.level<3?a("el-link",{staticStyle:{"margin-right":"25px"},attrs:{type:"primary"},on:{click:function(e){return t.addNewNav(s)}}},[1==s.level?a("span",[t._v(t._s(t.$t("menuSetting.添加二级目录")))]):t._e(),2==s.level?a("span",[t._v(t._s(t.$t("menuSetting.添加三级目录")))]):t._e()]):t._e(),a("el-link",{attrs:{type:"danger"},on:{click:function(e){return t.removeNav(i,s)}}},[t._v(t._s(t.$t("menuSetting.删除")))])],1)]):t._e()])}}],null,!1,1330538048)})],1)]:a("el-col",{attrs:{span:24}},[a("div",{staticClass:"none-menu"},[a("div",{staticClass:"none"}),a("p",[t._v(t._s(t.$t("menuSetting.您还没有添加任何目录")))]),a("div",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addNewNav()}}},[t._v(t._s(t.$t("menuSetting.添加菜单目录")))])],1)])])],2),t.hasMenuNum?a("el-divider",{staticClass:"mg-t--13"}):t._e(),t.hasMenuNum?a("el-row",{attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-link",{attrs:{icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.addNewNav()}}},[t._v(t._s(t.$t("menuSetting.添加菜单目录")))])],1)],1):t._e()],1),t.hasMenuNum?a("div",{staticClass:"action-box"},[a("el-card",[a("div",{staticClass:"action-content"},[a("el-link",{attrs:{type:"danger",disabled:t.editItem.id<3||!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.delMenu}},[t._v(t._s(t.$t("menuSetting.删除菜单")))]),a("el-button",{attrs:{type:"primary",size:"medium",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:t.save}},[t._v(t._s(t.$t("menuSetting.保存")))])],1)])],1):t._e()],1),a("DialogCustomUrl",{attrs:{data:t.dialogCustomUrlData}}),a("selectProduct",{attrs:{data:t.dialogProductList},on:{selectedProduct:t.selectedProduct}}),a("DialogSelectCategory",{ref:"dialogSelectCategory",attrs:{data:t.dialogSelectCategoryData},on:{selectedCategory:t.selectedCategory}}),a("DialogSelectCustomPage",{attrs:{data:t.dialogSelectCustomPageData},on:{selectCustomPage:t.selectCustomPage}})],1)},s=[],o=(a("d3b7"),a("159b"),a("e9c4"),a("b0c0"),a("a434"),a("c740"),a("d81d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,title:"自定义链接","close-on-click-modal":!1,width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[a("el-form",{attrs:{"label-position":"top","label-width":"120px"}},[a("el-form-item",{attrs:{label:"链接地址"}},[a("el-input",{nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.save.apply(null,arguments)}},model:{value:t.data.ipt,callback:function(e){t.$set(t.data,"ipt",e)},expression:"data.ipt"}})],1)],1),t.data.msg?a("div",{staticClass:"error"},[t._v(t._s(t.data.msg))]):t._e()],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goods.取消")))]),a("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("确定")])],1)],1)}),r=[],l=(a("4d63"),a("c607"),a("ac1f"),a("2c3e"),a("25f0"),a("00b4"),{props:["data"],methods:{save:function(){if(this.data.msg="",this.data.ipt){var t=new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i");t.test(this.data.ipt)?(this.$set(this.data.item,"url",this.data.ipt),this.data.isShow=!1):this.data.msg="Url格式错误.请填写完整。 （例：https://www.myourmall.com）"}else this.data.msg="Url不能为空"}}}),n=l,c=(a("2067"),a("2877")),u=Object(c["a"])(n,o,r,!1,null,"c39408b8",null),d=u.exports,g=a("88a7"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.$t("storeSetting.商品分类"),width:"300px",visible:t.data.addCategoryVisible},on:{"update:visible":function(e){return t.$set(t.data,"addCategoryVisible",e)}}},[a("div",{staticClass:"dialog-area"},[a("div",{staticClass:"search"},[a("el-input",{attrs:{size:"mini","suffix-icon":"el-icon-search"},on:{input:t.searchCategory},model:{value:t.data.keyword,callback:function(e){t.$set(t.data,"keyword",e)},expression:"data.keyword"}})],1),a("el-scrollbar",[t.data.displayItems.length>0?a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.data.cLoading,expression:"data.cLoading"}],staticClass:"item-area"},[t._l(t.data.displayItems,(function(e,i){return[-1==t.data.selectedIds.indexOf(e.id)?a("div",{key:i},[a("div",{staticClass:"item-list"},[a("div",{staticClass:"left"},[a("el-image",{staticClass:"image",attrs:{fit:"contain",src:e.themeUrl}},[a("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[a("i",{staticClass:"el-icon-picture-outline"})])]),a("div",{staticClass:"name"},[t._v(t._s(e.name))])],1),a("div",[a("el-radio",{attrs:{label:e},model:{value:t.data.selectedItems,callback:function(e){t.$set(t.data,"selectedItems",e)},expression:"data.selectedItems"}},[a("div",{staticStyle:{display:"none"}},[t._v("1")])])],1)]),a("el-divider")],1):t._e()]})),t.data.selectedIds.length==t.data.displayItems.length?a("div",{staticClass:"no-category"},[t._v(" "+t._s(t.$t("storeSetting.暂无更多类目"))+" ")]):t._e(),a("div",{staticStyle:{height:"20px"}})],2):t._e()]),0==t.data.displayItems.length?a("div",{staticClass:"no-category"},[t._v(" "+t._s(t.$t("storeSetting.暂无类目"))+" "),a("router-link",{attrs:{to:"/category-mgr"}},[t._v(t._s(t.$t("storeSetting.前去添加")))])],1):t._e(),a("div",{staticClass:"control"},[a("router-link",{staticClass:"mg-r-20",attrs:{to:"/category-mgr"}},[t._v(t._s(t.$t("storeSetting.管理商品类目")))]),a("i",{staticClass:"refresh mg-r-20 el-icon-refresh",on:{click:t.getCategory}}),a("el-button",{attrs:{size:"small",type:"primary",disabled:!t.data.selectedItems},on:{click:t.addCategoryHandle}},[t._v(t._s(t.$t("storeSetting.添加")))])],1)],1)])},p=[],f={props:["data"],methods:{addCategoryHandle:function(){this.$emit("selectedCategory",this.data.selectedItems)},searchCategory:function(t){var e=[];this.data.items.forEach((function(a){a.name.indexOf(t)>-1&&e.push(a)})),this.data.displayItems=e},getCategory:function(){var t=this;this.data.cLoading=!0,this.$apiCall("api.ProductCategory.findByUser",{level:1},(function(e){setTimeout((function(){t.data.cLoading=!1}),500),9999==e.ErrorCode&&(t.data.items=e.Data.Results,t.data.displayItems=e.Data.Results,t.data.selectedItems&&t.data.displayItems.forEach((function(e){e.id==t.data.selectedItems.id&&(t.data.selectedItems=e)})))}))}}},h=f,v=(a("f428"),Object(c["a"])(h,m,p,!1,null,"01a4efc6",null)),y=v.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"自定义页面",width:"400px",visible:t.data.isShow},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"d-body"},[t.$store.state.configJson.customPage&&t.$store.state.configJson.customPage.length?a("p",{staticClass:"title d-flex"},[a("span",{staticClass:"mg-r-20"},[t._v("选择自定义页面")]),a("el-link",{attrs:{type:"primary"},on:{click:function(e){return t.$router.push({name:"storePage"})}}},[t._v("管理自定义页面")])],1):t._e(),t.$store.state.configJson.customPage&&t.$store.state.configJson.customPage.length?a("ul",{staticClass:"c-page-li"},t._l(t.$store.state.configJson.customPage,(function(e){return a("li",{key:e.id,staticClass:"tx-ellipsis1"},[a("el-radio",{attrs:{label:e},model:{value:t.data.selected,callback:function(e){t.$set(t.data,"selected",e)},expression:"data.selected"}},[t._v(t._s(e.title))])],1)})),0):a("div",{staticClass:"none-data"},[a("span",{staticClass:"mg-r-20"},[t._v("没有数据")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.$router.push({name:"storePage"})}}},[t._v("管理自定义页面")])],1)]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.data.isShow=!1}}},[t._v(t._s(t.$t("goodsEdit.取消")))]),a("el-button",{attrs:{size:"small",type:"primary",disabled:!t.data.selected},on:{click:t.selectCustomPage}},[t._v(t._s(t.$t("goodsEdit.确定")))])],1)],1)},b=[],C={props:["data"],methods:{selectCustomPage:function(){this.$emit("selectCustomPage",this.data.selected)}}},_=C,D=(a("2d6f"),Object(c["a"])(_,S,b,!1,null,"29b28e93",null)),w=D.exports,x={data:function(){return{isSave:!1,pageLoading:!1,editItem:{id:"",name:"",menu:[]},dialogCustomUrlData:{isShow:!1,ipt:"",error:!1,msg:"",item:{url:""}},defaultDialogCustomUrlData:"{}",dialogProductList:{loading:!1,isShow:!1,item:null,menuData:null},defaultDialogProductList:"{}",dialogSelectCategoryData:{addCategoryVisible:!1,keyword:"",displayItems:[],cLoading:!1,selectedIds:[],selectedItems:null,items:[],menuData:null},defaultDialogSelectCategoryData:"{}",dialogSelectCustomPageData:{isShow:!1,items:[],selected:null,menuData:null},defaultDialogSelectCustomPageData:"{}"}},components:{DialogCustomUrl:d,selectProduct:g["a"],DialogSelectCategory:y,DialogSelectCustomPage:w},computed:{hasMenuNum:function(){var t=0;return this.editItem.menu.forEach((function(e){"bottom"!=e.id&&t++})),t}},mounted:function(){this.defaultDialogCustomUrlData=JSON.stringify(this.dialogCustomUrlData),this.defaultDialogProductList=JSON.stringify(this.dialogProductList),this.defaultDialogSelectCategoryData=JSON.stringify(this.dialogSelectCategoryData),this.defaultDialogSelectCustomPageData=JSON.stringify(this.dialogSelectCustomPageData),this.getConfig()},beforeRouteLeave:function(t,e,a){if("menuEditor"!=t.name)if(this.isSave)a();else{var i=confirm(this.$t("goodsEdit.当前页面还未保存，确定要离开吗?"));i?a():a(!1)}else a()},methods:{save:function(){var t=this;if(this.editItem.name){if(this.editItem.menu.length){var e="";if(this.editItem.menu.some((function(t){if("bottom"!=t.id)return t.label||(e="菜单名必须填写;"),t.children.some((function(t){return t.label||(e="菜单名必须填写;"),t.children.some((function(t){return t.label||(e="菜单名必须填写;"),e})),e})),e})),e)return void this.$message({message:e,type:"error"})}var a=JSON.parse(JSON.stringify(this.editItem));a.menu.forEach((function(t,e){"bottom"==t.id&&a.menu.splice(e,1)}));var i=JSON.parse(JSON.stringify(this.$store.state.configJson));i.menu.findIndex((function(t){return t.id==a.id}))>-1&&i.menu.splice(i.menu.findIndex((function(t){return t.id==a.id})),1),i.menu.unshift(a),i.menu.map((function(t,e){"2"==t.id&&i.menu.unshift(i.menu.splice(e,1)[0])})),i.menu.map((function(t,e){"1"==t.id&&i.menu.unshift(i.menu.splice(e,1)[0])})),this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(i)},(function(e){9999==e.ErrorCode?(t.isSave=!0,t.$elementMessage(t.$t("storeSetting.保存成功"),"success"),t.$router.push({name:"menuSetting"})):t.$message({message:e.Message,type:"error"})}))}else this.$message({message:"请输入菜单名称",type:"error"})},delMenu:function(){var t=this;this.$confirm(this.$t("menuSetting.是否要删除菜单"),"",{confirmButtonText:this.$t("products.删除"),cancelButtonText:this.$t("products.取消"),confirmButtonClass:"el-button--danger"}).then((function(){t.$store.commit("delMenu",t.editItem.id),t.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(t.$store.state.configJson)},(function(e){9999==e.ErrorCode?(t.isSave=!0,t.$elementMessage(t.$t("shop.删除成功"),"success"),t.$router.push({name:"menuSetting"})):t.$message({message:e.Message,type:"error"})}))}))},selectCustomPage:function(t){this.dialogSelectCustomPageData.menuData.urlData=t,this.dialogSelectCustomPageData.isShow=!1},openSelectCustomPage:function(t){this.dialogSelectCustomPageData=JSON.parse(this.defaultDialogSelectCustomPageData),this.dialogSelectCustomPageData.menuData=t,this.dialogSelectCustomPageData.isShow=!0},selectedCategory:function(t){this.dialogSelectCategoryData.menuData.urlData=t,this.dialogSelectCategoryData.addCategoryVisible=!1},openSelectCategory:function(t){this.dialogSelectCategoryData=JSON.parse(this.defaultDialogSelectCategoryData),this.dialogSelectCategoryData.menuData=t,t.urlData&&(this.dialogSelectCategoryData.selectedItems=t.urlData),this.dialogSelectCategoryData.addCategoryVisible=!0,this.$refs.dialogSelectCategory.getCategory()},openCustomUrl:function(t){this.dialogCustomUrlData=JSON.parse(this.defaultDialogCustomUrlData),this.dialogCustomUrlData.item=t,this.dialogCustomUrlData.ipt=t.url,this.dialogCustomUrlData.isShow=!0},removeNav:function(t,e){var a=t.parent,i=a.data.children||a.data,s=i.findIndex((function(t){return t.id===e.id}));i.splice(s,1)},addNewNav:function(t){var e=JSON.parse(JSON.stringify(this.$store.state.navDefault));t?(e.id=(new Date).getTime(),e.level=t.level+1,t.children.push(e)):(this.editItem.menu.splice(this.editItem.menu.findIndex((function(t){return"bottom"==t.id})),1),e.id=(new Date).getTime(),e.level=1,this.editItem.menu.push(e),this.editItem.menu.push({id:"bottom"}))},changeRouter:function(t){this.urlSync(t),"9998"==t.value&&this.openCustomUrl(t),"productDetails"==t.value&&this.openSelect(t),"category"==t.value&&this.openSelectCategory(t),"customPage"==t.value&&this.openSelectCustomPage(t)},urlSync:function(t){this.$dict.storeMenuArr.forEach((function(e){e.value==t.value&&(t.url=e.url)})),t.urlData=null},allowDrop:function(t,e,a){return t.level===e.level&&1==e.level?"prev"===a||"text"===a:t.level===e.level},openSelect:function(t){this.dialogProductList=JSON.parse(this.defaultDialogProductList),this.dialogProductList.menuData=t,this.getItems(),this.dialogProductList.isShow=!0},getItems:function(){var t=this;this.dialogProductList.loading=!0,this.$apiCall("api.VendorShop.vendorFindProducts",{page:1,rowsPerPage:10},(function(e){t.dialogProductList.loading=!1,9999==e.ErrorCode?t.dialogProductList.item=e.Data.Results.products.map((function(t){return t.imgUrlArr=JSON.parse(t.imgUrlJson),t.statusIpt="1"==t.status,t})):t.$message({message:e.Message,type:"error"})}))},selectedProduct:function(t){this.dialogProductList.menuData.urlData=t},getConfig:function(){var t=this;this.pageLoading=!0,this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){t.pageLoading=!1,9999==e.ErrorCode&&0!==e.Data.Results.length&&(t.$store.commit("getShopConfig",e.Data.Results),e.Data.Results.menu&&e.Data.Results.menu.length||t.$store.commit("getDefaultMenu"),t.$route.query.id?(t.$store.state.configJson.menu.forEach((function(e){e.id==t.$route.query.id&&(t.editItem=JSON.parse(JSON.stringify(e)))})),t.editItem.id||(t.editItem.id=t.$route.query.id),t.editItem.menu.push({id:"bottom"})):(t.$message({message:"error",type:"error"}),t.isSave=!0,t.$router.push({name:"menuSetting"})))}))},eventIpt:function(t){"focus"==t.type&&$(".el-tree-node").removeAttr("draggable"),"blur"==t.type&&$(".el-tree-node").attr("draggable","true")}}},k=x,I=(a("ca02"),a("7ad4"),Object(c["a"])(k,i,s,!1,null,"d25c4d52",null));e["default"]=I.exports},"9f87":function(t,e,a){},aeb0:function(t,e,a){var i=a("9bf2").f;t.exports=function(t,e,a){a in t||i(t,a,{configurable:!0,get:function(){return e[a]},set:function(t){e[a]=t}})}},c607:function(t,e,a){var i=a("83ab"),s=a("fce3"),o=a("c6b6"),r=a("edd0"),l=a("69f3").get,n=RegExp.prototype,c=TypeError;i&&s&&r(n,"dotAll",{configurable:!0,get:function(){if(this!==n){if("RegExp"===o(this))return!!l(this).dotAll;throw c("Incompatible receiver, RegExp required")}}})},ca02:function(t,e,a){"use strict";a("598f")},e478:function(t,e,a){},edd0:function(t,e,a){var i=a("13d2"),s=a("9bf2");t.exports=function(t,e,a){return a.get&&i(a.get,e,{getter:!0}),a.set&&i(a.set,e,{setter:!0}),s.f(t,e,a)}},f428:function(t,e,a){"use strict";a("9774")}}]);