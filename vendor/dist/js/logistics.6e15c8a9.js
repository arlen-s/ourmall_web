(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["logistics"],{"19c0":function(t,i,e){t.exports=e.p+"img/none-logistics.bbdcb2c3.webp"},"2a98":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"contentpanel logistics-page"},[s("div",{ref:"pageHeader",staticClass:"pagetitle"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[s("i",{staticClass:"el-icon-guide"}),s("h2",[t._v(t._s(t.$t("logistics.运费设置")))])])]),s("div",{staticClass:"right"},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){return t.setPostageAmount()}}},[t._v(t._s(t.$t("logistics.免邮规则设置")))]),s("el-button",{attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite),type:"primary",size:"small"},on:{click:function(i){return t.goto("settingsLogistics")}}},[t._v(t._s(t.$t("logistics.添加区域方案")))])],1)]),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[s("el-card",[t.items.length?s("div",{staticClass:"table-wrap"},[s("el-table",{ref:"AreaShippingTable",staticStyle:{width:"100%"},attrs:{data:t.items,stripe:""}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("el-table",{attrs:{data:i.row.shippings,border:""}},[s("el-table-column",{attrs:{label:t.$t("logistics.方案名称"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("span",{staticClass:"tx-ellipsis1"},[t._v(t._s(i.row.name))])]}}],null,!0)}),s("el-table-column",{attrs:{label:t.$t("logistics.运费"),width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("TableFreight",{attrs:{item:t.row}})]}}],null,!0)}),s("el-table-column",{attrs:{label:t.$t("logistics.时效天数")},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v(" "+t._s(i.row.agingDaysBegin)+" - "+t._s(i.row.agingDaysEnd)+" "+t._s(t.$t("logistics.天"))+" ")]}}],null,!0)}),s("el-table-column",{attrs:{label:t.$t("logistics.商品属性")},scopedSlots:t._u([{key:"default",fn:function(i){return t._l(i.row.productType,(function(i,e){return s("div",{key:e},[t._v(" "+t._s(t.$dict.productType[i]?t.$t(t.$dict.productType[i].text):"")+" ")])}))}}],null,!0)}),s("el-table-column",{attrs:{label:t.$t("logistics.计算规则"),width:"250"},scopedSlots:t._u([{key:"default",fn:function(t){return[s("TableWeight",{attrs:{item:t.row}})]}}],null,!0)})],1)]}}],null,!1,2969296439)}),s("el-table-column",{attrs:{label:t.$t("logistics.方案名称")},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v(" "+t._s(i.row.name)+" ")]}}],null,!1,2507105690)}),s("el-table-column",{attrs:{label:t.$t("logistics.国家地区")},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v(" "+t._s(t.$t("logistics.包含"))+" "+t._s(t.showCountryName(i.row.countrys[0]))),i.row.countrys.length>1?s("span",[t._v(" "+t._s(t.$t("logistics.等")))]):t._e(),t._v(" "),s("b",[t._v(t._s(i.row.countrys.length))]),t._v(" "+t._s(t.$t("logistics.个国家"))+" ")]}}],null,!1,1764586825)}),s("el-table-column",{attrs:{label:t.$t("logistics.操作"),width:"300"},scopedSlots:t._u([{key:"default",fn:function(i){return[s("el-link",{staticClass:"mg-r-15",attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite),type:"primary"},on:{click:function(e){return t.editAreaShipping(i.row)}}},[t._v(t._s(t.$t("logistics.编辑方案")))]),s("el-link",{attrs:{disabled:!t.$isRole(t.$route.meta.roleWrite),type:"danger"},on:{click:function(e){return t.delAreaShipping(i.row,i.$index)}}},[t._v(t._s(t.$t("logistics.删除")))])]}}],null,!1,3262264462)})],1)],1):s("div",{staticClass:"none-list"},[s("img",{staticStyle:{"margin-bottom":"40px",width:"360px",height:"232px"},attrs:{src:e("19c0")}}),s("p",{staticStyle:{"margin-bottom":"15px","font-weight":"bold","font-size":"16px"}},[t._v(t._s(t.$t("logistics.请设置你的物流方案")))]),s("p",{staticStyle:{"margin-bottom":"50px",color:"#909399"}},[t._v(t._s(t.$t("logistics.开始设置并完善你的运费方案，以便顾客轻松选择最合适的运费方案，获得更好的购物体验。")))]),s("el-button",{attrs:{type:"primary"},on:{click:function(i){return t.goto("settingsLogistics")}}},[t._v(t._s(t.$t("logistics.添加区域方案")))])],1)])],1),s("el-dialog",{attrs:{title:t.$t("logistics.免邮规则"),visible:t.dialogVisibleAmount,width:"30%","before-close":t.closeDialogA},on:{"update:visible":function(i){t.dialogVisibleAmount=i},open:t.openAut}},[s("el-row",[s("el-col",{staticStyle:{padding:"0 20px"}},[s("p",[t._v(t._s(t.$t("logistics.当订单商品总价大于等于（包含）"))),s("el-input",{staticStyle:{width:"70px"},attrs:{placeholder:"0.00"},on:{input:function(i){return t.limitInput(i)}},model:{value:t.amounts,callback:function(i){t.amounts=i},expression:"amounts"}}),t._v(t._s(t.$t("logistics.免邮")))],1),s("p",{staticClass:"tips-trip"},[t._v(t._s(t.$t("logistics.温馨提示：订单总金额计算仅为购物车商品总售价")))])])],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.closeDialogA}},[t._v(t._s(t.$t("logistics.取消")))]),s("el-button",{attrs:{type:"primary"},on:{click:t.saveAmount}},[t._v(t._s(t.$t("logistics.确定")))])],1)],1)],1)},n=[],o=(e("d3b7"),e("159b"),e("b64b"),e("99af"),e("ac1f"),e("466d"),e("5319"),e("a434"),e("d81d"),e("c895")),l=e("b879"),a=e("3d50"),r={data:function(){return{loading:!1,amounts:"",dialogVisibleAmount:!1,items:[]}},components:{TableFreight:l["a"],TableWeight:a["a"]},mounted:function(){this.getAreaShipping()},methods:{showCountryName:function(t){var i="";return Object.keys(o).forEach((function(e){Object.keys(o[e]).forEach((function(s){s==t&&(i="".concat(o[e][s].nameCN," (").concat(o[e][s].nameEN,")"))}))})),i},openAut:function(){this.getFee()},limitInput:function(t){this.amounts=(""+t).replace(/[^\d^\.]+/g,"").replace(/^0+(\d)/,"$1").replace(/^\./,"0.").match(/^\d*(\.?\d{0,2})/g)[0]||""},editAreaShipping:function(t){this.$router.push({name:"settingsLogistics",query:{id:t.id}})},closeDialogA:function(){this.dialogVisibleAmount=!1,this.amounts=""},getFee:function(){var t=this;this.$apiCall("api.AreaShipping.getShippingConfig",{},(function(i){"9999"==i.ErrorCode&&(t.amounts=null==i.Data.Results.orderPriceFreeShipping?0:i.Data.Results.orderPriceFreeShipping)}))},saveAmount:function(){var t=this;this.$apiCall("api.AreaShipping.changeShippingConfig",{orderPriceFreeShipping:this.amounts},(function(i){"9999"==i.ErrorCode?(t.$message.success("success"),t.dialogVisibleAmount=!1,t.amounts=""):t.$message.success(i.msg)}))},setPostageAmount:function(){this.dialogVisibleAmount=!0},delAreaShipping:function(t,i){var e=this;this.$confirm(this.$t("logistics.是否确定删除该区域方案？"),{type:"warning",confirmButtonText:this.$t("logistics.删除"),cancelButtonText:this.$t("logistics.取消"),confirmButtonClass:"el-button--danger"}).then((function(){e.loading=!0,e.$apiCall("api.AreaShipping.delete",{id:t.id},(function(t){e.loading=!1,"9999"==t.ErrorCode?e.items.splice(i,1):e.$elementMessage(t.Message,"error")}))})).catch((function(){}))},getAreaShipping:function(){var t=this;this.loading=!0,this.$apiCall("api.AreaShipping.findByVendor",{},(function(i){t.loading=!1,"9999"==i.ErrorCode?i.Data.Results&&i.Data.Results.length&&(t.items=i.Data.Results.map((function(t){return t}))):t.$elementMessage(i.Message,"error")}))},goto:function(t){this.$router.push({name:t})}}},c=r,u=(e("9f73"),e("2877")),g=Object(u["a"])(c,s,n,!1,null,"90d6bdbc",null);i["default"]=g.exports},"9f73":function(t,i,e){"use strict";e("df13")},df13:function(t,i,e){}}]);