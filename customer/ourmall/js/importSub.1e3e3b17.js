(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["importSub"],{"593b":function(t,e,s){"use strict";s("fd59")},bf38:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["1"==t.tab.id?[s("el-alert",{staticStyle:{"margin-bottom":"10px"},attrs:{title:t.$t("You can import and manage your AliExpress / Amazon products here before publishing them to your Shopify store. You can publish a product to different stores and add multiple tags to each products."),type:"info","show-icon":""}}),s("div",{staticClass:"import-ipt-box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.importUrl,expression:"importUrl"}],attrs:{type:"text",placeholder:t.$t("Import Aliexpress")},domProps:{value:t.importUrl},on:{input:function(e){e.target.composing||(t.importUrl=e.target.value)}}}),s("el-button",{attrs:{type:"primary",loading:t.loadingImport},on:{click:t.importPorduct}},[t._v(t._s(t.$t("Import Product")))])],1)]:t._e(),s("div",{ref:"pageFilter",staticClass:"page-filter"},["3"==t.tab.id||"4"==t.tab.id?s("div",{staticClass:"filter-row"},[s("el-form",{attrs:{inline:!0,size:"mini"}},[s("el-form-item",[s("el-input",{attrs:{placeholder:t.$t("Product Name")},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.setFilter(e)}},model:{value:t.filtersParams.nameIpt,callback:function(e){t.$set(t.filtersParams,"nameIpt",e)},expression:"filtersParams.nameIpt"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.setFilter},slot:"append"})],1)],1),s("el-form-item",[s("el-cascader",{attrs:{placeholder:t.$t("All Stores"),options:t.shopOptArr,props:t.filterAccountProps,"show-all-levels":!1,clearable:!0},on:{change:t.setFilter},model:{value:t.filtersParams.accountIdIpt,callback:function(e){t.$set(t.filtersParams,"accountIdIpt",e)},expression:"filtersParams.accountIdIpt"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:t.setFilter}},[t._v(t._s(t.$t("Filter")))]),s("el-button",{attrs:{type:"danger"},on:{click:t.clearFilter}},[t._v(t._s(t.$t("Clear")))])],1)],1)],1):t._e(),"1"==t.tab.id||"4"==t.tab.id?s("div",{staticClass:"push-row"},[s("div",{staticClass:"left"},[s("el-checkbox",{staticStyle:{"margin-right":"15px"},attrs:{value:t.AllChecked},on:{change:function(e){return t.changeAllItems(e)}}},[t._v(t._s(t.$t("All"))+" ")]),"1"==t.tab.id?[s("el-button",{attrs:{type:"primary",size:"mini",loading:t.pushLoading,id:"importPush"},on:{click:function(e){return t.batItems("push")}}},[s("span",{attrs:{id:"importPushInner"}},[t._v(t._s(t.$t("Push")))])]),s("el-button",{attrs:{type:"success",size:"mini",loading:t.exportLoading},on:{click:function(e){return t.batItems("export")}}},[t._v(t._s(t.$t("Export")))]),s("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"danger",size:"mini",loading:t.delLoading},on:{click:function(e){return t.batItems("del")}}},[t._v(t._s(t.$t("Delete")))]),s("el-dropdown",{ref:"tagMgt",staticStyle:{top:"-1px"},attrs:{trigger:"click"}},[s("el-button",{attrs:{size:"mini"}},[t._v(" "+t._s(t.$t("Add Tags"))+" "),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("div",{staticClass:"add-tags-wrap"},[s("div",{staticClass:"header"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.openTagMgt}},[t._v("+ "+t._s(t.$t("Tag management")))])],1),s("div",{staticClass:"check-wrap"},t._l(t.tags,(function(e){return s("el-checkbox",{key:e.id,model:{value:e.checked,callback:function(s){t.$set(e,"checked",s)},expression:"tag.checked"}},[t._v(t._s(e.name))])})),1),s("div",{staticClass:"footer"},[s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:t.removeCheckedTags}},[t._v(t._s(t.$t("Clear")))]),s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.batItems("addTags")}}},[t._v(t._s(t.$t("Confirm")))])],1)])])],1)]:"4"==t.tab.id?[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.batItems("importList")}}},[t._v(t._s(t.$t("Push")))])]:t._e()],2),s("div",{staticClass:"right"},[s("el-button",{attrs:{size:"small",icon:"el-icon-setting"},on:{click:t.openPushSetting}},[t._v(t._s(t.$t("Push Setting")))])],1)]):t._e(),"2"==t.tab.id&&(t.doneCnt||t.allCnt)&&t.items.length?s("div",{staticClass:"progress-wrap"},[s("span",{staticClass:"title"},[t._v(t._s(t.$t("Upload Progress:")))]),s("div",{staticClass:"progress-box"},[s("el-progress",{attrs:{"stroke-width":22,percentage:parseInt(this.doneCnt/this.allCnt*100)}})],1)]):t._e()]),s("div",[s("el-table",{ref:"importListTable",staticStyle:{width:"100%"},attrs:{data:t.items,stripe:""}},["2"==t.tab.id?s("el-table-column",{attrs:{label:t.$t("Status"),align:"center",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",["2"==e.row.status?s("i",{staticClass:"el-icon-loading",staticStyle:{"font-size":"18px"}}):t._e(),"3"==e.row.status?s("i",{staticClass:"el-icon-success tx-success",staticStyle:{"font-size":"18px"}}):t._e(),"4"==e.row.status?s("i",{staticClass:"el-icon-error tx-danger",staticStyle:{"font-size":"18px"}}):t._e()])]}}],null,!1,3962223520)}):t._e(),"1"==t.tab.id||"4"==t.tab.id?s("el-table-column",{attrs:{align:"center",width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-checkbox",{attrs:{disabled:"1"!=e.row.status&&"1"==t.tab.id},model:{value:e.row.checked,callback:function(s){t.$set(e.row,"checked",s)},expression:"scope.row.checked"}})]}}],null,!1,2200968333)}):t._e(),s("el-table-column",{attrs:{label:t.$t("Images"),align:"center",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"img-wrap"},["1"!=e.row.status&&"1"==t.tab.id?s("div",{staticClass:"mask"},[t._v(t._s(t.$t("Sold Out")))]):t._e(),s("el-image",{staticStyle:{width:"70px",height:"70px",border:"1px solid #DCDFE6"},attrs:{fit:"cover",src:e.row.mainImg,"preview-src-list":[e.row.mainImg]}},[s("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[s("i",{staticClass:"el-icon-picture-outline"})])])],1)]}}])}),s("el-table-column",{attrs:{label:t.$t("Product Name")},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:" tx-ellipsis2"},[s("span",[t._v(t._s(e.row.name))])])]}}])}),"1"!=t.tab.id?s("el-table-column",{attrs:{label:t.$t("Store Name")},scopedSlots:t._u([{key:"default",fn:function(e){return e.row.shop?[t._v(" "+t._s(e.row.shop.shopName)+" ")]:void 0}}],null,!0)}):t._e(),s("el-table-column",{attrs:{label:t.$t("Price"),align:"center"}},[s("el-table-column",{attrs:{label:t.$t("Supply unit price"),width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v(" "+t._s(t.showPrice(e.row))+" ")])]}}])}),s("el-table-column",{attrs:{label:t.$t("Your price"),width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v(" "+t._s(e.row.yourPrice)+" ")])]}}])})],1),"4"==t.tab.id?s("el-table-column",{attrs:{label:t.$t("Fail reason")},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.extra?s("div",{staticClass:" tx-danger"},[t._v(" "+t._s(e.row.extra.message)+" ")]):s("div",[t._v("---")])]}}],null,!1,2350062661)}):t._e(),"2"!=t.tab.id?s("el-table-column",{attrs:{label:t.$t("Action"),width:"1"==t.tab.id?300:200},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==t.tab.id?s("div",[s("el-button",{attrs:{type:"primary",size:"small",disabled:"1"!=e.row.status},on:{click:function(s){return t.singPush(e.row)}}},[t._v(t._s(t.$t("Push")))]),s("el-button",{attrs:{type:"success",size:"small",disabled:"1"!=e.row.status},on:{click:function(s){return t.editProduct(e.row)}}},[t._v(t._s(t.$t("Edit")))]),s("el-button",{attrs:{type:"danger",size:"small",disabled:"1"!=e.row.status},on:{click:function(s){return t.delItem([e.row.id])}}},[t._v(t._s(t.$t("Delete")))])],1):t._e(),"3"==t.tab.id?s("div",[s("el-link",{staticClass:" mg-r-15",attrs:{type:"primary",href:e.row.productUrl,target:"_blank"}},[t._v(t._s(t.$t("Open in Web")))]),s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(s){return t.delItem2([e.row.id])}}},[t._v(t._s(t.$t("Delete")))])],1):t._e(),"4"==t.tab.id?s("div",[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){return t.gotoImportList([e.row.id])}}},[t._v(t._s(t.$t("Push")))])],1):t._e()]}}],null,!1,942503488)}):t._e()],1)],1)],2)},r=[],a=(s("99af"),s("a9e3"),s("b680"),s("159b"),{props:["tab","loadingImport","pushLoading","exportLoading","delLoading","items","AllChecked","tags","allCnt","doneCnt","filtersParams","filterAccountProps","shopOptArr"],data:function(){return{importUrl:""}},methods:{gotoImportList:function(t){this.$emit("gotoImportList",t)},delItem2:function(t){this.$emit("delItem2",t)},clearFilter:function(){this.$emit("clearFilter")},setFilter:function(){this.$emit("setFilter")},openPushSetting:function(){this.$emit("openPushSetting")},delItem:function(t){this.$emit("delItem",t)},importPorduct:function(){this.$emit("importPorduct",this.importUrl),this.importUrl=""},changeAllItems:function(t){this.$emit("changeAllItems",t)},batItems:function(t){this.$emit("batItems",t),"addTags"==t&&this.$refs["tagMgt"].hide()},openTagMgt:function(){this.$emit("openTagMgt")},removeCheckedTags:function(){this.$emit("removeCheckedTags")},showPrice:function(t){var e="---",s=0,i=0;return t.stocks.some((function(t){if(t.costPrice)return s=i=Number(t.costPrice),!0})),t.stocks.forEach((function(t){t.costPrice&&s>Number(t.costPrice)&&(s=Number(t.costPrice)),t.costPrice&&i<Number(t.costPrice)&&(i=Number(t.costPrice))})),e=s==i?s.toFixed(2):"".concat(s," - ").concat(i),"".concat(e)},singPush:function(t){this.$emit("singPush",t)},editProduct:function(t){this.$emit("editProduct",t)}}}),o=a,n=(s("593b"),s("2877")),l=Object(n["a"])(o,i,r,!1,null,"dfc5618c",null);e["default"]=l.exports},fd59:function(t,e,s){}}]);
//# sourceMappingURL=importSub.1e3e3b17.js.map