(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-109f97e6"],{"2d68":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"contentpanel p-d-page"},[e("div",{staticClass:"top-breadcrumb"},[e("i",{staticClass:"el-icon-arrow-left"}),t._v(" "),e("a",{attrs:{href:"javascript:;"},on:{click:function(s){return t.$router.go(-1)}}},[t._v("Back")])]),e("div",{ref:"pageHeader",staticClass:"pagetitle"},[t._m(0),e("div",{staticClass:"right"})]),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody",staticStyle:{"min-height":"200px"}},[t.item?e("div",{staticClass:"detail-box"},[e("div",{staticClass:"header-box"},[e("span",{staticClass:" mg-r-20"},[t._v(t._s(t.moment.unix(t.item.timeCreated).format("ll [at] LTS")))]),e("span",{staticClass:" mg-r-20",staticStyle:{color:"#909399"}},[t._v("(Sub Order NO: "),e("b",{staticStyle:{color:"#F56C6C"}},[t._v(t._s(t.item.code))]),t._v(")")]),e("span",{staticClass:"mg-r-20",staticStyle:{color:"#909399"}},[t._v("Status: "),e("span",{class:t.$dict.PurchaseStatus[t.item.status].color},[t._v(t._s(t.$dict.PurchaseStatus[t.item.status].text))])])]),e("div",{staticClass:"table-box"},[e("el-row",{staticClass:"table-header",attrs:{gutter:10}},[e("el-col",{attrs:{span:8}},[t._v("Product Information")]),e("el-col",{attrs:{span:2}},[t._v("Unit Price")]),e("el-col",{staticStyle:{"justify-content":"center"},attrs:{span:2}},[t._v("Quantity")]),e("el-col",{attrs:{span:2}},[t._v("Sub Total")]),e("el-col",{attrs:{span:4}},[t._v("Grand Total")]),e("el-col",{attrs:{span:6}},[t._v("Address")])],1),t._l(t.item.items,(function(s,a){return e("el-row",{key:s.id,staticClass:"table-body",attrs:{gutter:10}},[e("el-col",{staticClass:" td",attrs:{span:8}},[e("div",{staticClass:"product-info"},[148982!=t.vendorId&&146428!=t.vendorId&&144875!=t.vendorId&&144843!=t.vendorId&&143779!=t.vendorId&&143654!=t.vendorId&&74!=t.vendorId?e("a",{attrs:{href:"/item/"+s.product.id+"/"+s.product.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html",target:"_blank"}},[e("el-image",{staticClass:"product-img",attrs:{fit:"cover",src:s.product.imgUrl,lazy:""}},[e("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[e("i",{staticClass:"el-icon-picture-outline"})])])],1):e("a",{attrs:{href:"/itemOld/"+s.product.id+"/"+s.product.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html",target:"_blank"}},[e("el-image",{staticClass:"product-img",attrs:{fit:"cover",src:s.product.imgUrl,lazy:""}},[e("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[e("i",{staticClass:"el-icon-picture-outline"})])])],1),e("div",{staticClass:"right"},[148982!=t.vendorId&&146428!=t.vendorId&&144875!=t.vendorId&&144843!=t.vendorId&&143779!=t.vendorId&&143654!=t.vendorId&&74!=t.vendorId?e("a",{staticClass:"name tx-ellipsis2",attrs:{href:"/item/"+s.product.id+"/"+s.product.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html",target:"_blank"}},[t._v(" "+t._s(s.product.name)+" ")]):e("a",{staticClass:"name tx-ellipsis2",attrs:{href:"/itemOld/"+s.product.id+"/"+s.product.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html",target:"_blank"}},[t._v(" "+t._s(s.product.name)+" ")]),e("div",[t._v(t._s(t.formatAttr(s.stock.propertyValue)))]),e("div",{staticClass:"sku",staticStyle:{color:"#909399"}},[t._v(" SKU "),e("span",{staticStyle:{color:"#303133"}},[t._v(t._s(s.product.sku))])]),"5"==t.item.status||"6"==t.item.status?e("div",{staticStyle:{color:"#909399"}},[t._v(" Tracking Number: "),e("span",{staticStyle:{color:"#303133"}},[t._v(t._s(s.trackNumber||"---"))]),t._v(" "),e("span",{staticStyle:{color:"#303133"}},[t._v("("+t._s(s.trackCompany||"---")+")")])]):t._e()])])]),e("el-col",{staticClass:"td price",attrs:{span:2}},[t._v(" $ "+t._s(Number(s.price).toFixed(2))+" "),e("i",{staticClass:"el-icon-close"})]),e("el-col",{staticClass:" td",staticStyle:{"justify-content":"center"},attrs:{span:2}},[t._v(t._s(s.oQuantity))]),e("el-col",{staticClass:" td",attrs:{span:2}},[t._v("$ "+t._s((Number(s.price)*Number(s.oQuantity)).toFixed(2)))]),e("el-col",{staticClass:"g-t td",class:{last:a+1==t.item.items.length},attrs:{span:4}},[a?t._e():[e("div",{staticClass:"t-a"},[t._v(" Total Amount: "),e("span",[t._v("$ "+t._s(Number(t.item.totalAmount).toFixed(2)))])]),e("div",[t._v("Weight: "),e("span",[t._v("0.14kg")])]),e("div",[t._v("Products Cost: "),e("span",[t._v("$ "+t._s(Number(t.item.itemAmount).toFixed(2)))])]),e("div",[t._v("Shipping: "),e("span",[t._v("$ "+t._s(Number(t.item.shippingAmount).toFixed(2)))])])]],2),e("el-col",{staticClass:" td add",class:{last:a+1==t.item.items.length},attrs:{span:6}},[a?t._e():[e("div",[t._v(t._s(t.item.shippingObj.name))]),e("div",[t._v(t._s(t.item.shippingObj.address1))]),e("div",[t._v(t._s(t.item.shippingObj.street))]),e("div",[t._v(t._s(t.item.shippingObj.city))]),e("div",[t._v(t._s(t.item.shippingObj.province))]),e("div",[t._v(t._s(t.item.shippingObj.country)+"("+t._s(t.item.shippingObj.country_code)+")")]),e("div",[t._v(t._s(t.item.shippingObj.trackCompany))])]],2)],1)}))],2)]):t._e()])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"left"},[e("div",{staticClass:"title"},[e("i",{staticClass:"el-icon-receiving"}),e("h2",[t._v("Order Details")])])])}],r=(e("4de4"),e("a15b"),e("ac1f"),e("1276"),e("498a"),e("5530")),o={data:function(){return{loading:!1,item:null,vendorId:localStorage.getItem("vendorId")}},mounted:function(){this.$route.query.code&&this.getOrder(this.$route.query.code)},methods:{getOrder:function(t){var s=this;this.loading=!0,this.$apiCall("api.PurchaseOrder.findByCustomer",{code:t},(function(t){s.loading=!1,9999==t.ErrorCode?(s.item=Object(r["a"])({},t.Data.Results[0]),s.item.shippingObj=JSON.parse(s.item.shippingJson)):s.$message({message:t.Message,type:"error"})}))},formatAttr:function(t){t=t.split("||"),t=t.filter((function(t){return t&&t.trim()}));var s=t.join(",");return s}}},c=o,n=(e("7295"),e("2877")),l=Object(n["a"])(c,a,i,!1,null,"d315f994",null);s["default"]=l.exports},"498a":function(t,s,e){"use strict";var a=e("23e7"),i=e("58a8").trim,r=e("c8d2");a({target:"String",proto:!0,forced:r("trim")},{trim:function(){return i(this)}})},7295:function(t,s,e){"use strict";e("b1ae")},a15b:function(t,s,e){"use strict";var a=e("23e7"),i=e("44ad"),r=e("fc6a"),o=e("a640"),c=[].join,n=i!=Object,l=o("join",",");a({target:"Array",proto:!0,forced:n||!l},{join:function(t){return c.call(r(this),void 0===t?",":t)}})},b1ae:function(t,s,e){},c8d2:function(t,s,e){var a=e("d039"),i=e("5899"),r="​᠎";t.exports=function(t){return a((function(){return!!i[t]()||r[t]()!=r||i[t].name!==t}))}}}]);
//# sourceMappingURL=chunk-109f97e6.ac2d0b93.js.map