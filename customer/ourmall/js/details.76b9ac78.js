(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["details"],{"0df66":function(t,e,i){},"37d4":function(t,e,i){"use strict";i.r(e);var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"searchDetail"}},[i("div",{staticClass:"detail-bread",on:{click:t.goBack}},[i("i",{staticClass:"el-icon-arrow-left"}),i("span",[t._v("Details")])]),i("el-card",[i("div",{staticClass:"publishDetail"},[i("h1",{staticClass:"detail-title"},[t._v("Base Information")]),i("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"140px"}},[t.publishDetail.imgUrlJson?i("el-form-item",{attrs:{label:"Picture:",prop:"picture"}},t._l(t.publishDetail.imgUrlJson,(function(e,l){return i("el-image",{key:l,staticClass:"detail-img",attrs:{"z-index":2010,fit:"contain","preview-src-list":t.publishDetail.imgUrlJson,src:e}},[i("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[i("i",{staticClass:"el-icon-picture-outline"})])])})),1):t._e(),i("el-form-item",{attrs:{label:"Product Title:",prop:"title"}},[t._v(" "+t._s(t.publishDetail.name)+" ")]),i("el-form-item",{attrs:{label:"Price:",prop:"priceFrom"}},[t._v(" $ "+t._s(t.publishDetail.minPrice)+" - "+t._s(t.publishDetail.maxPrice)+" ")]),i("el-form-item",{attrs:{label:"Product Link:"}},[i("a",{attrs:{href:t.publishDetail.url,target:"_blank"}},[t._v(t._s(t.publishDetail.url))])]),i("el-form-item",{attrs:{label:"Description:"}},[t._v(" "+t._s(t.publishDetail.description)+" ")])],1)],1)]),1!=t.publishDetail.status?i("el-card",{staticClass:"mg-t-20"},[i("div",{staticClass:"publishDetail"},[i("h1",{staticClass:"detail-title"},[t._v("Platform Reply")]),"9"==t.publishDetail.status?i("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"140px"}},[i("el-form-item",{attrs:{label:"Fail Reason:"}},[t._v(" "+t._s(t.publishDetail.remark)+" ")])],1):t._e(),t.publishDetail.vendorProduct?i("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"140px"}},["9"==t.publishDetail.status?i("el-form-item",{attrs:{label:"Fail Reason:"}},[t._v(" $ "+t._s(t.publishDetail.remark)+" ")]):t._e(),i("el-form-item",{attrs:{label:"Price:"}},[t._v(" $ "+t._s(t.publishDetail.vendorProduct.cost)+" ")]),i("el-form-item",{attrs:{label:"Product Link:",prop:"title"}},[i("a",{attrs:{target:"_blank",href:t.host+"/item/"+t.publishDetail.vendorProduct.id+"/"+t.publishDetail.vendorProduct.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html"}},[t._v(t._s(t.host+"/item/"+t.publishDetail.vendorProduct.id+"/"+t.publishDetail.vendorProduct.name.replace(/\s+/g,"-").replace(/[^\w]/g,"_")+".html"))])]),i("el-form-item",{attrs:{label:"Product Description:",prop:"priceFrom"}},[t._v(" "+t._s(t.publishDetail.remark||"--")+" ")])],1):t._e()],1)]):t._e()],1)},a=[],s={data:function(){return{host:window.location.origin,publishDetail:{}}},mounted:function(){this.getDetail()},methods:{goBack:function(){this.$router.go(-1)},getDetail:function(){var t=this;this.$apiCall("api.OfferProduct.getDetail",{id:this.$route.query.id},(function(e){9999==e.ErrorCode&&(t.publishDetail=e.Data.Results)}))}}},r=s,o=(i("41ca"),i("811c"),i("2877")),c=Object(o["a"])(r,l,a,!1,null,"57ebb5f6",null);e["default"]=c.exports},"41ca":function(t,e,i){"use strict";i("0df66")},"6ea8":function(t,e,i){},"811c":function(t,e,i){"use strict";i("6ea8")}}]);