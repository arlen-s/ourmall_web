(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["importSub"],{1773:function(t,e,i){},"1f2c":function(t,e,i){"use strict";i("1773")},bf38:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",["1"==t.tab.id?[i("el-alert",{staticStyle:{"margin-bottom":"10px"},attrs:{title:"You can import and manage your AliExpress / Amazon products here before publishing them to your Shopify store. You can publish a product to different stores and add multiple tags to each products.",type:"info","show-icon":""}}),i("div",{staticClass:"import-ipt-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.importUrl,expression:"importUrl"}],attrs:{type:"text",placeholder:'Import Aliexpress / Amazon product URL here and click "Import Product"'},domProps:{value:t.importUrl},on:{input:function(e){e.target.composing||(t.importUrl=e.target.value)}}}),i("el-button",{attrs:{type:"primary",loading:t.loadingImport},on:{click:t.importPorduct}},[t._v("Import Product")])],1)]:t._e(),i("div",{ref:"pageFilter",staticClass:"page-filter"},["3"==t.tab.id||"4"==t.tab.id?i("div",{staticClass:"filter-row"},[i("el-form",{attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"Product Name"},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.setFilter(e)}},model:{value:t.filtersParams.nameIpt,callback:function(e){t.$set(t.filtersParams,"nameIpt",e)},expression:"filtersParams.nameIpt"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.setFilter},slot:"append"})],1)],1),i("el-form-item",[i("el-cascader",{attrs:{placeholder:"All Stores",options:t.shopOptArr,props:t.filterAccountProps,"show-all-levels":!1,clearable:!0},on:{change:t.setFilter},model:{value:t.filtersParams.accountIdIpt,callback:function(e){t.$set(t.filtersParams,"accountIdIpt",e)},expression:"filtersParams.accountIdIpt"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.setFilter}},[t._v("Filter")]),i("el-button",{attrs:{type:"danger"},on:{click:t.clearFilter}},[t._v("Clear")])],1)],1)],1):t._e(),"1"==t.tab.id||"4"==t.tab.id?i("div",{staticClass:"push-row"},[i("div",{staticClass:"left"},[i("el-checkbox",{staticStyle:{"margin-right":"15px"},attrs:{value:t.AllChecked},on:{change:function(e){return t.changeAllItems(e)}}},[t._v("All ")]),"1"==t.tab.id?[i("el-button",{attrs:{type:"primary",size:"mini",loading:t.pushLoading,id:"importPush"},on:{click:function(e){return t.batItems("push")}}},[i("span",{attrs:{id:"importPushInner"}},[t._v("Push")])]),i("el-button",{attrs:{type:"success",size:"mini",loading:t.exportLoading},on:{click:function(e){return t.batItems("export")}}},[t._v("Export")]),i("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"danger",size:"mini",loading:t.delLoading},on:{click:function(e){return t.batItems("del")}}},[t._v("Delete")]),i("el-dropdown",{ref:"tagMgt",staticStyle:{top:"-1px"},attrs:{trigger:"click"}},[i("el-button",{attrs:{size:"mini"}},[t._v(" Add Tags "),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("div",{staticClass:"add-tags-wrap"},[i("div",{staticClass:"header"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.openTagMgt}},[t._v("+ Tag management")])],1),i("div",{staticClass:"check-wrap"},t._l(t.tags,(function(e){return i("el-checkbox",{key:e.id,model:{value:e.checked,callback:function(i){t.$set(e,"checked",i)},expression:"tag.checked"}},[t._v(t._s(e.name))])})),1),i("div",{staticClass:"footer"},[i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.removeCheckedTags}},[t._v("Clear")]),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.batItems("addTags")}}},[t._v("Confirm")])],1)])])],1)]:"4"==t.tab.id?[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.batItems("importList")}}},[t._v("Push")])]:t._e()],2),i("div",{staticClass:"right"},[i("el-button",{attrs:{size:"small",icon:"el-icon-setting"},on:{click:t.openPushSetting}},[t._v("Push Setting")])],1)]):t._e(),"2"==t.tab.id&&(t.doneCnt||t.allCnt)&&t.items.length?i("div",{staticClass:"progress-wrap"},[i("span",{staticClass:"title"},[t._v("Upload Progress:")]),i("div",{staticClass:"progress-box"},[i("el-progress",{attrs:{"stroke-width":22,percentage:parseInt(this.doneCnt/this.allCnt*100)}})],1)]):t._e()]),i("div",[i("el-table",{ref:"importListTable",staticStyle:{width:"100%"},attrs:{data:t.items,stripe:""}},["2"==t.tab.id?i("el-table-column",{attrs:{label:"Status",align:"center",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",["2"==e.row.status?i("i",{staticClass:"el-icon-loading",staticStyle:{"font-size":"18px"}}):t._e(),"3"==e.row.status?i("i",{staticClass:"el-icon-success tx-success",staticStyle:{"font-size":"18px"}}):t._e(),"4"==e.row.status?i("i",{staticClass:"el-icon-error tx-danger",staticStyle:{"font-size":"18px"}}):t._e()])]}}],null,!1,3962223520)}):t._e(),"1"==t.tab.id||"4"==t.tab.id?i("el-table-column",{attrs:{align:"center",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-checkbox",{attrs:{disabled:"1"!=e.row.status&&"1"==t.tab.id},model:{value:e.row.checked,callback:function(i){t.$set(e.row,"checked",i)},expression:"scope.row.checked"}})]}}],null,!1,2200968333)}):t._e(),i("el-table-column",{attrs:{label:"Images",align:"center",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"img-wrap"},["1"!=e.row.status&&"1"==t.tab.id?i("div",{staticClass:"mask"},[t._v("Sold Out")]):t._e(),i("el-image",{staticStyle:{width:"70px",height:"70px",border:"1px solid #DCDFE6"},attrs:{fit:"cover",src:e.row.mainImg,"preview-src-list":[e.row.mainImg]}},[i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"})])])],1)]}}])}),i("el-table-column",{attrs:{label:"Product Name"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:" tx-ellipsis2"},[i("span",[t._v(t._s(e.row.name))])])]}}])}),"1"!=t.tab.id?i("el-table-column",{attrs:{label:"Store Name"},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.shop?[t._v(" "+t._s(e.row.shop.shopName)+" ")]:void 0}}],null,!0)}):t._e(),i("el-table-column",{attrs:{label:"Price",align:"center"}},[i("el-table-column",{attrs:{label:"Supply unit price",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(" "+t._s(t.showPrice(e.row))+" ")])]}}])}),i("el-table-column",{attrs:{label:"Your price",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(" "+t._s(e.row.yourPrice)+" ")])]}}])})],1),"4"==t.tab.id?i("el-table-column",{attrs:{label:"Fail reason"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.extra?i("div",{staticClass:" tx-danger"},[t._v(" "+t._s(e.row.extra.message)+" ")]):i("div",[t._v("---")])]}}],null,!1,2350062661)}):t._e(),"2"!=t.tab.id?i("el-table-column",{attrs:{label:"Action",width:"1"==t.tab.id?250:200},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==t.tab.id?i("div",[i("el-button",{attrs:{type:"primary",size:"small",disabled:"1"!=e.row.status},on:{click:function(i){return t.singPush(e.row)}}},[t._v("Push")]),i("el-button",{attrs:{type:"success",size:"small",disabled:"1"!=e.row.status},on:{click:function(i){return t.editProduct(e.row)}}},[t._v("Edit")]),i("el-button",{attrs:{type:"danger",size:"small",disabled:"1"!=e.row.status},on:{click:function(i){return t.delItem([e.row.id])}}},[t._v("Delete")])],1):t._e(),"3"==t.tab.id?i("div",[i("el-link",{staticClass:" mg-r-15",attrs:{type:"primary",href:e.row.productUrl,target:"_blank"}},[t._v("Open in Web")]),i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(i){return t.delItem2([e.row.id])}}},[t._v("Delete")])],1):t._e(),"4"==t.tab.id?i("div",[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){return t.gotoImportList([e.row.id])}}},[t._v("Push")])],1):t._e()]}}],null,!1,817257696)}):t._e()],1)],1)],2)},r=[],a=(i("99af"),i("a9e3"),i("b680"),i("159b"),{props:["tab","loadingImport","pushLoading","exportLoading","delLoading","items","AllChecked","tags","allCnt","doneCnt","filtersParams","filterAccountProps","shopOptArr"],data:function(){return{importUrl:""}},methods:{gotoImportList:function(t){this.$emit("gotoImportList",t)},delItem2:function(t){this.$emit("delItem2",t)},clearFilter:function(){this.$emit("clearFilter")},setFilter:function(){this.$emit("setFilter")},openPushSetting:function(){this.$emit("openPushSetting")},delItem:function(t){this.$emit("delItem",t)},importPorduct:function(){this.$emit("importPorduct",this.importUrl),this.importUrl=""},changeAllItems:function(t){this.$emit("changeAllItems",t)},batItems:function(t){this.$emit("batItems",t),"addTags"==t&&this.$refs["tagMgt"].hide()},openTagMgt:function(){this.$emit("openTagMgt")},removeCheckedTags:function(){this.$emit("removeCheckedTags")},showPrice:function(t){var e="---",i=0,s=0;return t.stocks.some((function(t){if(t.costPrice)return i=s=Number(t.costPrice),!0})),t.stocks.forEach((function(t){t.costPrice&&i>Number(t.costPrice)&&(i=Number(t.costPrice)),t.costPrice&&s<Number(t.costPrice)&&(s=Number(t.costPrice))})),e=i==s?i.toFixed(2):"".concat(i," - ").concat(s),"".concat(t.stocks.length?t.stocks[0].currency:""," ").concat(e)},singPush:function(t){this.$emit("singPush",t)},editProduct:function(t){this.$emit("editProduct",t)}}}),o=a,n=(i("1f2c"),i("2877")),l=Object(n["a"])(o,s,r,!1,null,"856558c4",null);e["default"]=l.exports}}]);
//# sourceMappingURL=importSub.ce8b8061.js.map