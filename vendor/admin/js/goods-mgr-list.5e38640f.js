(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods-mgr-list"],{"49c1":function(t,e,o){"use strict";o("e168")},"7e7e":function(t,e,o){"use strict";o.r(e);var l=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"goods-list-page"},[o("div",{ref:"tablefilter"},[o("div",{ref:"pageFilter",staticClass:"page-filter",staticStyle:{"border-bottom":"none"}},[o("el-form",{attrs:{inline:!0,size:"mini"}},[o("el-form-item",[o("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:t.$t("goods.商品名称")},on:{clear:function(e){return t.clearFilter("name")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.nameIpt,callback:function(e){t.$set(t.filterData,"nameIpt",e)},expression:"filterData.nameIpt"}})],1),o("el-form-item",[o("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:"sku"},on:{clear:function(e){return t.clearFilter("sku")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.sku,callback:function(e){t.$set(t.filterData,"sku",e)},expression:"filterData.sku"}})],1),o("el-form-item",[o("el-input",{staticStyle:{width:"160px"},attrs:{clearable:"",size:"mini",placeholder:"spu"},on:{clear:function(e){return t.clearFilter("spu")}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterGetItem()}},model:{value:t.filterData.spu,callback:function(e){t.$set(t.filterData,"spu",e)},expression:"filterData.spu"}})],1),o("el-cascader",{ref:"cascaderHandle",staticClass:"mg-r-15",attrs:{options:t.categroyArr,props:{expandTrigger:"hover",checkStrictly:!0},placeholder:t.$t("goods.商品分类"),size:"mini",filterable:"",clearable:"","show-all-levels":!1},on:{change:t.changeCategory},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.data;return o("span",{on:{click:t.clickNode}},[t._v(t._s(l.label))])}}]),model:{value:t.filterData.categroyPath,callback:function(e){t.$set(t.filterData,"categroyPath",e)},expression:"filterData.categroyPath"}}),o("el-form-item",{staticStyle:{"padding-left":"0"},attrs:{label:t.$t("goods.商品金额：")}},[o("el-input-number",{staticStyle:{width:"80px"},attrs:{min:0,precision:2,controls:!1,placeholder:t.$t("goods.最小")},model:{value:t.filterData.costFromIpt,callback:function(e){t.$set(t.filterData,"costFromIpt",e)},expression:"filterData.costFromIpt"}})],1),o("span",{staticClass:"mg-r-10"},[t._v("-")]),o("el-form-item",{staticStyle:{"margin-right":"20px"}},[o("el-input-number",{staticStyle:{width:"80px"},attrs:{min:0,precision:2,controls:!1,placeholder:t.$t("goods.最大")},model:{value:t.filterData.costToIpt,callback:function(e){t.$set(t.filterData,"costToIpt",e)},expression:"filterData.costToIpt"}})],1),o("el-form-item",{staticStyle:{"margin-right":"25px"}},[o("el-select",{attrs:{placeholder:t.$t("goods.请选择 - 商品类型")},on:{change:function(e){return t.filterGetItem("productType")}},model:{value:t.filterData.productType,callback:function(e){t.$set(t.filterData,"productType",e)},expression:"filterData.productType"}},t._l(t.productTypeArr,(function(e){return o("el-option",{key:e.value,attrs:{label:t.$t(e.label),value:e.value}})})),1)],1),o("el-form-item",{staticStyle:{"margin-bottom":"0"}},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.filterGetItem()}}},[t._v(t._s(t.$t("myinvoice.filter")))]),o("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.clearFilter()}}},[t._v(t._s(t.$t("goods.重置")))])],1)],1)],1),o("div",{staticClass:"mg-b-10"},[t.filterData.name?o("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(e){return t.clearFilter("name")}}},[t._v(t._s(t.$t("goods.商品名称："))),o("b",{staticStyle:{color:"#5c6ac4"}},[t._v(t._s(t.filterData.name))])]):t._e(),t.filterData.categoryId?o("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(e){return t.clearFilter("categoryId")}}},[t._v(t._s(t.$t("goods.商品分类："))),o("b",{staticStyle:{color:"#5c6ac4"}},[t._v(t._s(t.showCategroyText(t.filterData.categoryId)))])]):t._e(),t.filterData.costFrom||t.filterData.costTo?o("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(e){return t.clearFilter("cost")}}},[t._v(t._s(t.$t("goods.商品金额："))),o("b",{staticStyle:{color:"#5c6ac4"}},[t._v(t._s(t.filterData.costFrom?Number(t.filterData.costFrom).toFixed(2):"min")+" - "+t._s(t.filterData.costTo?Number(t.filterData.costTo).toFixed(2):"max"))])]):t._e(),t.filterData.productType?o("el-tag",{staticClass:"mg-r-5",attrs:{size:"small",type:"info",closable:""},on:{close:function(e){return t.clearFilter("productType")}}},[t._v(" "+t._s(t.$t("goods.商品类型: "))),o("b",{staticStyle:{color:"#5c6ac4"}},[t._v(t._s(t.showProductType(t.filterData.productType)))])]):t._e()],1)]),o("div",{staticClass:"table-wrap",staticStyle:{"border-top":"1px #ebeef5 solid","padding-top":"5px"}},[t.items.length?o("div",{staticClass:"table-action"},[o("div",{staticClass:"mg-r-15"},[o("el-checkbox",{on:{change:t.changeAllCheckbox},model:{value:t.isAllCheck,callback:function(e){t.isAllCheck=e},expression:"isAllCheck"}},[o("span",{staticStyle:{color:"#606266","font-size":"12px"}},[t._v(t._s(t.$t("goods.全选/全不选"))+" ("+t._s(t.checkboxArr.length)+")")])])],1),o("div",[o("el-button",{attrs:{type:"primary",size:"mini",disabled:!t.$isRole(t.$route.meta.roleWrite)||!t.checkboxArr.length},on:{click:function(e){return t.confirmShelvesAll(!0)}}},[t._v(t._s(t.$t("goods.批量上架")))]),o("el-button",{attrs:{type:"info",plain:"",size:"mini",disabled:!t.$isRole(t.$route.meta.roleWrite)||!t.checkboxArr.length},on:{click:function(e){return t.confirmShelvesAll(!1)}}},[t._v(t._s(t.$t("goods.批量下架")))]),o("el-button",{attrs:{type:"danger",size:"mini",disabled:!t.$isRole(t.$route.meta.roleWrite)||!t.checkboxArr.length},on:{click:t.delSelected}},[t._v(t._s(t.$t("goods.删除")))]),o("el-button",{attrs:{type:"primary",size:"mini",disabled:!t.$isRole(t.$route.meta.roleWrite)||!t.checkboxArr.length},on:{click:t.openChangeCategory}},[t._v(" "+t._s(t.$t("goods.批量修改类目"))+" ")])],1)]):t._e(),t.items.length||t.loading?o("el-table",{ref:"gridTable",attrs:{data:t.items,stripe:""}},[o("el-table-column",{attrs:{label:"",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-checkbox",{staticClass:"none-label",attrs:{label:e.row.id},model:{value:t.checkboxArr,callback:function(e){t.checkboxArr=e},expression:"checkboxArr"}})]}}],null,!1,2613777098)}),o("el-table-column",{attrs:{label:t.$t("goods.操作"),width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-link",{staticStyle:{"font-size":"12px"},attrs:{type:"primary"},on:{click:function(o){return t.gotoEdit(e.row.id)}}},[t._v(t._s(t.$t("goods.编辑")))]),"1"==e.row.status?[o("br"),o("el-link",{staticStyle:{"font-size":"12px"},attrs:{type:"primary",href:"//"+(t.host.indexOf("sandbox")>-1?"sandboxshop":"shop")+e.row.shopId+".myourmall.com/item/"+e.row.id+"/"+e.row.name+".html",target:"_blank"}},[t._v(" "+t._s(t.$t("goods.预览"))+" ")])]:t._e(),o("br"),o("el-link",{staticStyle:{"font-size":"12px"},attrs:{type:"primary"},on:{click:function(o){return t.lookLog(e.row.id)}}},[t._v(t._s(t.$t("goods.日志")))])]}}],null,!1,182205052)}),o("el-table-column",{attrs:{label:t.$t("goods.商品图片"),width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[o("el-image",{staticStyle:{width:"80px",height:"80px",border:"1px solid #ddd","background-color":"#fff"},attrs:{src:t.row.imgUrl,fit:"contain","scroll-container":".main-scroll .el-scrollbar__wrap","preview-src-list":t.row.imgUrlArr,lazy:""}},[o("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[o("i",{staticClass:"el-icon-picture-outline"})])])]}}],null,!1,2165552219)}),o("el-table-column",{attrs:{label:t.$t("goods.商品名称")},scopedSlots:t._u([{key:"default",fn:function(e){return[o("p",{staticClass:"tx-ellipsis3",staticStyle:{"line-height":"22px"}},[t._v(t._s(e.row.name))])]}}],null,!1,2941362605)}),o("el-table-column",{attrs:{label:t.$t("goods.可见范围")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.isAllVisible?o("div",[t._v(t._s(t.$t("goods.全部可见")))]):o("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(o){return t.openVisiableCus(e.row.id)}}},[t._v(t._s(t.$t("goods.指定客户可见")))])]}}],null,!1,2487963515)}),o("el-table-column",{attrs:{label:t.$t("goods.创建时间")+"/ "+t.$t("修改时间"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("p",[t._v(t._s(e.row.timeCreated))]),o("p",[t._v(t._s(e.row.timeLastGet))])]}}],null,!1,499139432)}),o("el-table-column",{attrs:{label:t.$t("goods.是否上架"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{change:function(o){return t.confirmShelves(e.row)}},model:{value:e.row.statusIpt,callback:function(o){t.$set(e.row,"statusIpt",o)},expression:"scope.row.statusIpt"}})]}}],null,!1,1059800648)})],1):o("div",["GoodsMgrAll"!=t.$route.name||t.filterData.categoryId||t.filterData.name||t.filterData.costFrom||t.filterData.costTo||t.filterData.productType?o("div",{staticClass:"none-goods"},[o("p",{staticStyle:{color:"#909399"}},[t._v(t._s(t.$t("goods.暂无商品")))])]):o("div",{staticClass:"none-goods"},[o("div",{staticClass:"i"}),o("p",{staticClass:"p1"},[t._v(t._s(t.$t("goods.新建并上架你的商品")))]),o("p",{staticClass:"p2"},[t._v(t._s(t.$t("goods.新建并上架你的第一件商品，上架完你的优质商品后，用户才可以在你的网站上进行购物。")))]),o("div",{staticClass:"action"},[o("el-button",{attrs:{type:"primary",size:"small",disabled:!t.$isRole(t.$route.meta.roleWrite)},on:{click:function(e){return t.goto("AddGoods")}}},[t._v(t._s(t.$t("goods.新建商品")))])],1)])])],1),o("el-dialog",{attrs:{title:t.$t("goods.商品日志"),width:"35%",visible:t.dialogVisibleLog},on:{"update:visible":function(e){t.dialogVisibleLog=e}}},[o("el-card",{staticClass:"box-card"},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableLogData,border:""}},[o("el-table-column",{attrs:{prop:"userName",label:t.$t("goods.操作者"),width:"180"}}),o("el-table-column",{attrs:{prop:"content",label:t.$t("goods.操作描述")}}),o("el-table-column",{attrs:{prop:"timeCreated",label:t.$t("goods.操作时间")}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisibleLog=!1}}},[t._v(t._s(t.$t("goods.确定")))])],1)],1)],1)},i=[],r=(o("d3b7"),o("159b"),o("d81d"),{props:["loading","items","categroyArr","filterData"],data:function(){return{host:location.host,isAllCheck:!1,checkboxArr:[],productTypeArr:this.$dict.productTypeArr,vendorId:localStorage.getItem("vendorId"),showLog:!1,dialogVisibleLog:!1,tableLogData:[]}},watch:{checkboxArr:function(){this.isAllCheck=this.items.length&&this.items.length==this.checkboxArr.length}},methods:{openVisiableCus:function(t){this.$emit("openVisiableCus",t)},openChangeCategory:function(){this.$emit("openChangeCategory",this.checkboxArr)},showProductType:function(t){var e="";return this.$dict.productTypeArr.forEach((function(o){o.value==t&&(e=o.label)})),this.$t(e)},lookLog:function(t){var e=this;this.dialogVisibleLog=!0,this.$apiCall("api.ProductLog.finds",{productId:t},(function(t){9999==t.ErrorCode&&(e.tableLogData=t.Data.Results)}))},gotoEdit:function(t){146428!=this.vendorId||144875!=this.vendorId||144843!=this.vendorId||143779!=this.vendorId||143654!=this.vendorId||140694!=this.vendorId||74!=this.vendorId?this.$router.push({name:"AddGoods2",query:{id:t}}):this.$router.push({name:"AddGoods",query:{id:t}})},filterGetItem:function(){this.$emit("filterGetItem")},clearFilter:function(t){this.$emit("clearFilter",t)},delSelected:function(){var t=this;this.checkboxArr.length?this.$confirm(this.$t("goods.确定要删除选中的{len}个商品吗？",{len:this.checkboxArr.length}),{confirmButtonText:this.$t("goods.删除"),cancelButtonText:this.$t("goods.取消"),confirmButtonClass:"el-button--danger",type:"warning"}).then((function(){t.$emit("delSelected",t.checkboxArr)})).catch():this.$message({message:this.$t("goods.请先选择一个要操作的商品"),type:"error"})},confirmShelvesAll:function(t){var e=this;this.checkboxArr.length?this.$confirm(this.$t("goods.确定要{s1}选中的商品吗？ 选中的商品将{s2}展示在您的网站上。",{s1:t?this.$t("goods.上架"):this.$t("goods.下架"),s2:t?"":this.$t("goods.不再")}),{confirmButtonText:this.$t("goods.确定"),cancelButtonText:this.$t("goods.取消"),type:"warning"}).then((function(){e.$emit("changeStatusAll",e.checkboxArr,t)})).catch():this.$message({message:this.$t("goods.请先选择一个要操作的商品"),type:"error"})},confirmShelves:function(t){var e=this;this.$confirm(this.$t("goods.已{s1}的商品将{s2}展示在您的网站上?, 是否{s1}",{s1:t.statusIpt?this.$t("goods.上架"):this.$t("goods.下架"),s2:t.statusIpt?"":this.$t("goods.不再")}),{confirmButtonText:this.$t("goods.确定"),cancelButtonText:this.$t("goods.取消"),type:"warning"}).then((function(){e.$emit("changeStatus",t)})).catch((function(){t.statusIpt=!t.statusIpt}))},changeAllCheckbox:function(t){this.checkboxArr=t?this.items.map((function(t){return t.id})):[]},showCategroyText:function(t){if(t){var e="";return this.categroyArr.forEach((function(o){o.id==t&&(e=o.label),o.children&&o.children.length&&o.children.forEach((function(o){o.id==t&&(e=o.label),o.children&&o.children.length&&o.children.forEach((function(o){o.id==t&&(e=o.label)}))}))})),e||"???"}return"--"},clickNode:function(t){t.target.parentElement.parentElement.firstElementChild.click()},changeCategory:function(){this.$refs.cascaderHandle.dropDownVisible=!1,this.filterData.categroyPath.length?this.filterGetItem():this.clearFilter("categoryId")},goto:function(t){this.$emit("goto",t)}}}),s=r,a=(o("8945"),o("49c1"),o("2877")),n=Object(a["a"])(s,l,i,!1,null,"6f053865",null);e["default"]=n.exports},8945:function(t,e,o){"use strict";o("efc2")},d81d:function(t,e,o){"use strict";var l=o("23e7"),i=o("b727").map,r=o("1dde"),s=r("map");l({target:"Array",proto:!0,forced:!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e168:function(t,e,o){},efc2:function(t,e,o){}}]);