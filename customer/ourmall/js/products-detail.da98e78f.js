(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["products-detail"],{"06c5":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));i("a630"),i("fb6a"),i("b0c0"),i("d3b7"),i("25f0"),i("3ca3");var s=i("6b75");function r(t,e){if(t){if("string"===typeof t)return Object(s["a"])(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Object(s["a"])(t,e):void 0}}},2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return _}));var s=i("6b75");function r(t){if(Array.isArray(t))return Object(s["a"])(t)}i("a4d3"),i("e01a"),i("d28b"),i("a630"),i("d3b7"),i("3ca3"),i("ddb0");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var a=i("06c5");function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _(t){return r(t)||o(t)||Object(a["a"])(t)||n()}},"2d4d":function(t,e,i){"use strict";i("dd42")},"4c5a":function(t,e,i){},"4df4":function(t,e,i){"use strict";var s=i("0366"),r=i("7b0b"),o=i("9bdd"),a=i("e95a"),n=i("50c4"),_=i("8418"),l=i("35a1");t.exports=function(t){var e,i,c,u,d,p,m=r(t),f="function"==typeof this?this:Array,v=arguments.length,h=v>1?arguments[1]:void 0,g=void 0!==h,b=l(m),y=0;if(g&&(h=s(h,v>2?arguments[2]:void 0,2)),void 0==b||f==Array&&a(b))for(e=n(m.length),i=new f(e);e>y;y++)p=g?h(m[y],y):m[y],_(i,y,p);else for(u=b.call(m),d=u.next,i=new f;!(c=d.call(u)).done;y++)p=g?o(u,h,[c.value,y],!0):c.value,_(i,y,p);return i.length=y,i}},6062:function(t,e,i){"use strict";var s=i("6d61"),r=i("6566");t.exports=s("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},"610e":function(t,e,i){"use strict";i("4c5a")},6566:function(t,e,i){"use strict";var s=i("9bf2").f,r=i("7c73"),o=i("e2cc"),a=i("0366"),n=i("19aa"),_=i("2266"),l=i("7dd0"),c=i("2626"),u=i("83ab"),d=i("f183").fastKey,p=i("69f3"),m=p.set,f=p.getterFor;t.exports={getConstructor:function(t,e,i,l){var c=t((function(t,s){n(t,c,e),m(t,{type:e,index:r(null),first:void 0,last:void 0,size:0}),u||(t.size=0),void 0!=s&&_(s,t[l],{that:t,AS_ENTRIES:i})})),p=f(e),v=function(t,e,i){var s,r,o=p(t),a=h(t,e);return a?a.value=i:(o.last=a={index:r=d(e,!0),key:e,value:i,previous:s=o.last,next:void 0,removed:!1},o.first||(o.first=a),s&&(s.next=a),u?o.size++:t.size++,"F"!==r&&(o.index[r]=a)),t},h=function(t,e){var i,s=p(t),r=d(e);if("F"!==r)return s.index[r];for(i=s.first;i;i=i.next)if(i.key==e)return i};return o(c.prototype,{clear:function(){var t=this,e=p(t),i=e.index,s=e.first;while(s)s.removed=!0,s.previous&&(s.previous=s.previous.next=void 0),delete i[s.index],s=s.next;e.first=e.last=void 0,u?e.size=0:t.size=0},delete:function(t){var e=this,i=p(e),s=h(e,t);if(s){var r=s.next,o=s.previous;delete i.index[s.index],s.removed=!0,o&&(o.next=r),r&&(r.previous=o),i.first==s&&(i.first=r),i.last==s&&(i.last=o),u?i.size--:e.size--}return!!s},forEach:function(t){var e,i=p(this),s=a(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:i.first){s(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!h(this,t)}}),o(c.prototype,i?{get:function(t){var e=h(this,t);return e&&e.value},set:function(t,e){return v(this,0===t?0:t,e)}}:{add:function(t){return v(this,t=0===t?0:t,t)}}),u&&s(c.prototype,"size",{get:function(){return p(this).size}}),c},setStrong:function(t,e,i){var s=e+" Iterator",r=f(e),o=f(s);l(t,e,(function(t,e){m(this,{type:s,target:t,state:r(t),kind:e,last:void 0})}),(function(){var t=o(this),e=t.kind,i=t.last;while(i&&i.removed)i=i.previous;return t.target&&(t.last=i=i?i.next:t.state.first)?"keys"==e?{value:i.key,done:!1}:"values"==e?{value:i.value,done:!1}:{value:[i.key,i.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),i?"entries":"values",!i,!0),c(e)}}},"6b75":function(t,e,i){"use strict";function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=new Array(e);i<e;i++)s[i]=t[i];return s}i.d(e,"a",(function(){return s}))},"6d61":function(t,e,i){"use strict";var s=i("23e7"),r=i("da84"),o=i("94ca"),a=i("6eeb"),n=i("f183"),_=i("2266"),l=i("19aa"),c=i("861d"),u=i("d039"),d=i("1c7e"),p=i("d44e"),m=i("7156");t.exports=function(t,e,i){var f=-1!==t.indexOf("Map"),v=-1!==t.indexOf("Weak"),h=f?"set":"add",g=r[t],b=g&&g.prototype,y=g,E={},C=function(t){var e=b[t];a(b,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(v&&!c(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return v&&!c(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(v&&!c(t))&&e.call(this,0===t?0:t)}:function(t,i){return e.call(this,0===t?0:t,i),this})},w=o(t,"function"!=typeof g||!(v||b.forEach&&!u((function(){(new g).entries().next()}))));if(w)y=i.getConstructor(e,t,f,h),n.REQUIRED=!0;else if(o(t,!0)){var D=new y,P=D[h](v?{}:-0,1)!=D,O=u((function(){D.has(1)})),k=d((function(t){new g(t)})),M=!v&&u((function(){var t=new g,e=5;while(e--)t[h](e,e);return!t.has(-0)}));k||(y=e((function(e,i){l(e,y,t);var s=m(new g,e,y);return void 0!=i&&_(i,s[h],{that:s,AS_ENTRIES:f}),s})),y.prototype=b,b.constructor=y),(O||M)&&(C("delete"),C("has"),f&&C("get")),(M||P)&&C(h),v&&b.clear&&delete b.clear}return E[t]=y,s({global:!0,forced:y!=g},E),p(y,t),v||i.setStrong(y,t,f),y}},"9bdd":function(t,e,i){var s=i("825a"),r=i("2a62");t.exports=function(t,e,i,o){try{return o?e(s(i)[0],i[1]):e(i)}catch(a){throw r(t),a}}},a630:function(t,e,i){var s=i("23e7"),r=i("4df4"),o=i("1c7e"),a=!o((function(t){Array.from(t)}));s({target:"Array",stat:!0,forced:a},{from:r})},bb2f:function(t,e,i){var s=i("d039");t.exports=!s((function(){return Object.isExtensible(Object.preventExtensions({}))}))},dd3c:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("a4d3"),core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("e01a"),core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("4de4"),core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("b0c0"),core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_set_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("6062"),core_js_modules_es_set_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_set_js__WEBPACK_IMPORTED_MODULE_7__),core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("3ca3"),core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("1276"),core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_9__),core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("159b"),core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_10__),core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("ddb0"),core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_11__),C_newCode_ourmall_customer_customer_ourmall_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("2909"),_components_productQuotation__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("ea9d");__webpack_exports__["a"]={props:{},data:function(){return{radio:"",shopMethod:[{time:"15-30 days",name:"EUB"},{time:"15-20 days",name:"CNE"},{time:"15-20 days",name:"YunExpress"},{time:"15-20 days",name:"4PX"}],activeName:"first",web:"",loading:!1,isFound:!0,proId:null,isAdd:null,name:"",moreName:"",imgUrl:"",imgList:[],type1:[],type2:[],typeImg:[],items:[],nowPro:{},price:"",typeTwoData:"",isActive:0,isActiveCate:-1,isChange:-1,products:{},shoppingDialog:!1,visible:!1,propValue:"",ball:{x:window.innerWidth/2,y:window.innerHeight/2,opacity:0}}},watch:{$route:"gotoPage"},filters:{typeOne:function(t){return t?t.split("||")[0]:""},typeTwo:function(t){return t?t.split("||")[1]:""}},mounted:function(){this.proId=this.$route.query.id,this.name=this.$route.query.name,this.getDetail(),this.getRecommend()},methods:{quotation:function(){this.visible=!0},gotoPage:function(){Object.assign(this.$data,this.$options.data()),this.proId=this.$route.query.id,this.name=this.$route.query.name,this.getDetail(),this.getRecommend()},getRecommend:function(){var t=this;this.$apiCall("api.VendorShop.findProducts",{id:this.proId,rowsPerPage:12,page:1},(function(e){t.items=e.Data.Results,t.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0}))},filterType:function(t,e){var i=this;this.isChange=e,this.typeTwoData=t,""!=this.propValue&&this.products.stocks.forEach((function(t){t.propertyValue=="".concat(i.propValue,"||").concat(i.typeTwoData)&&(i.nowPro=t,i.price=i.nowPro.price)}))},returnMore:function(){var t=this.products.categorys.length-1;this.$router.push({name:"more",query:{id:this.products.categorys[t].id}})},getDetail:function getDetail(){var _this3=this;this.loading=!0,this.$apiCall("api.VendorShop.productDetail",{id:this.proId},(function(r){if(_this3.loading=!1,9999==r.ErrorCode){_this3.isFound=!0,_this3.imgUrl=r.Data.Results.imgUrl,_this3.price=r.Data.Results.cost,_this3.imgList=eval(r.Data.Results.imgUrlJson),_this3.products=r.Data.Results,_this3.isAdd=r.Data.Results.hasImport,_this3.web=r.Data.Results.description.web;var num=r.Data.Results.categorys.length-1;_this3.moreName=r.Data.Results.categorys[num].name,r.Data.Results.stocks.forEach((function(t){_this3.type1.push(t.propertyValue.split("||")[0]),_this3.type2.push(t.propertyValue.split("||")[1])})),_this3.type1=Object(C_newCode_ourmall_customer_customer_ourmall_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_12__["a"])(new Set(_this3.type1)),_this3.type2=Object(C_newCode_ourmall_customer_customer_ourmall_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_12__["a"])(new Set(_this3.type2));var arr=[];_this3.type1.forEach((function(t){arr.push(r.Data.Results.stocks.filter((function(e){return e.propertyValue.split("||")[0]==t})))})),arr.forEach((function(t){_this3.typeImg.push(t[0].propertyImage)}))}else _this3.isFound=!1}))},change:function(t){this.isActive=t,this.imgUrl=this.imgList[t]},changeCate:function(t){var e=this;this.isActiveCate=t,this.isActive=-1,this.propValue=this.type1[t],this.imgUrl=this.typeImg[t],""!=this.typeTwoData&&this.products.stocks.forEach((function(t){t.propertyValue=="".concat(e.propValue,"||").concat(e.typeTwoData)&&(e.nowPro=t,e.price=e.nowPro.price)}))},import_Recommend:function(t,e){var i=this;this.$apiCall("api.Product.addFromVendorShopProduct",{id:t.id},(function(s){if(9999==s.ErrorCode){t.hasImport=1,t.imports++,i.$message.success("Import Success !"),i.ball.x=e.clientX,i.ball.y=e.clientY,setTimeout((function(){i.ball.opacity=1}),500);var r=function(t){var e=t.offsetTop,i=t.offsetLeft,s=t.offsetParent;while(null!==s)e+=s.offsetTop,i+=s.offsetLeft,s=s.offsetParent;return{left:i,top:e}},o=r(document.querySelector("[data-name='Import List']"));setTimeout((function(){i.ball.x=o.left+65,i.ball.y=o.top+15}),1e3),setTimeout((function(){i.ball.opacity=0}),1500)}else i.$message.error(s.Message)}))},goHome:function(){this.$router.push("/find-products")},goToDetail:function(t){this.$router.push({name:"productDetail",query:{id:t.id,name:t.name,isAdd:t.hasImport}})},import_pro:function(t){var e=this;this.$apiCall("api.Product.addFromVendorShopProduct",{id:this.products.id},(function(i){if(9999==i.ErrorCode){e.products.imports++,e.isAdd=1,e.$message.success("Import Success !"),e.ball.x=t.clientX,e.ball.y=t.clientY,setTimeout((function(){e.ball.opacity=1}),500);var s=function(t){var e=t.offsetTop,i=t.offsetLeft,s=t.offsetParent;while(null!==s)e+=s.offsetTop,i+=s.offsetLeft,s=s.offsetParent;return{left:i,top:e}},r=s(document.querySelector("[data-name='Import List']"));setTimeout((function(){e.ball.x=r.left+65,e.ball.y=r.top+15}),1e3),setTimeout((function(){e.ball.opacity=0}),1500)}else e.$message.error(i.Message)}))}},components:{Quotation:_components_productQuotation__WEBPACK_IMPORTED_MODULE_13__["a"]}}},dd42:function(t,e,i){},ea9d:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{title:"Request a quotation for products",visible:t.openCardDialog},on:{"update:visible":function(e){t.openCardDialog=e},close:t.closeDialog}},[i("el-divider"),t.imgView?i("div",{staticClass:"proQuotation"},[i("div",{staticClass:"quotationTit"},[t._v("products for quotation")]),i("div",{staticStyle:{display:"flex"}},[i("div",{staticClass:"imgList"},t._l(t.imgList,(function(t){return i("img",{key:t,staticClass:"upload imgItem",attrs:{src:t}})})),0),i("div",{staticClass:"upload",on:{click:t.openForm}},[i("i",{staticClass:"el-icon-plus"})])])]):t._e(),t.isForm?i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"formRole"},[i("div",{staticClass:"quotationTit"},[t._v("Product information")]),i("el-form",{attrs:{model:t.form,"label-position":"left","label-width":"150px"}},[i("el-form-item",{attrs:{label:"Product images:",required:""}},[i("div",{staticClass:"upload",on:{click:t.uploadOpen}},[t.form.imgUrl?i("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.form.imgUrl,fit:"cover"}}):i("i",{staticClass:"el-icon-plus"})],1)]),i("el-form-item",{attrs:{label:"Details:",required:""}},[i("el-input",{attrs:{placeholder:"Product name / URL / description or anything you can tell us"},model:{value:t.form.details,callback:function(e){t.$set(t.form,"details",e)},expression:"form.details"}})],1),i("el-form-item",{attrs:{label:"Expected price (US$):"}},[i("el-input-number",{attrs:{controls:!1},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),i("el-form-item",{attrs:{label:"Remarks:"}},[i("el-input",{attrs:{placeholder:"Leave your message that you want to tell "+t.$root.$children[0].pName.a+" Vendors"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),i("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.saveQuotation}},[t._v("Save")])],1):t._e(),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("Submit Request")]),i("el-button",{on:{click:t.closeQuotation}},[t._v("Discard")])],1)],1),i("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(e){return t.Base64(e)}}})],1)},r=[],o=(i("ac1f"),i("466d"),i("1276"),{props:{visible:{type:Boolean,default:!1}},data:function(){return{form:{imgUrl:"",details:"",price:void 0,remark:""},imgView:!1,outerVisible:!1,innerVisible:!1,isForm:!0,loading:!1,dialogVisible:!1,imgList:[],detailsList:[],priceList:[],remarkList:[]}},computed:{openCardDialog:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},mounted:function(){},methods:{openForm:function(){var t=this;this.isForm=!0,this.loading=!0,setTimeout((function(){t.loading=!1}),800)},uploadOpen:function(){document.getElementById("imgFile").click()},Base64:function(t){var e=this;if(t.target.value){var i=new FileReader,s=new Image,r="";i.onload=function(t){s.src=t.target.result;var e=t.target.result.match(/data:image\/(.*);base64,.*/);r=e[1]},s.onload=function(i){base64Image({file:t.target,callback:function(t){var i=t.split("base64,").pop();e.uploadImgBase64(i,r)}})},i.readAsDataURL(t.target.files[0])}},uploadImgBase64:function(t,e){var i=this;this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:t,ext:e},(function(t){i.loading=!1,9999==t.ErrorCode?i.form.imgUrl=t.Data.Results.imgUrl:i.$message.error(t.Message)}))},saveQuotation:function(){return""==this.form.imgUrl?(this.$message.error("Please select a picture !"),!1):""==this.form.details?(this.$message.error("Please fill in the details !"),!1):(this.imgView=!0,this.isForm=!1,this.imgList.push(this.form.imgUrl),this.detailsList.push(this.form.details),this.priceList.push(this.form.price),this.remarkList.push(this.form.remark),void(this.form={imgUrl:"",details:"",price:void 0,remark:""}))},closeQuotation:function(){this.openCardDialog=!1,this.form={imgUrl:"",details:"",price:void 0,remark:""},this.imgList=[],this.detailsList=[],this.priceList=[],this.remarkList=[],this.isForm=!0,this.imgView=!1},closeDialog:function(){this.closeQuotation()},submit:function(){for(var t=this,e=[],i=0;i<this.imgList.length;i++)e.push({detail:this.detailsList[i],imgUrl:this.imgList[i],expectPrice:this.priceList[i],remarks:this.remarkList[i]});this.$apiCall("api.OfferList.genOfferProduct",{products:e},(function(e){9999==e.ErrorCode?(t.$message.success("Submit Success !"),t.closeQuotation(),t.$router.push("/Waiting-for-vendors-respond")):t.$message.error(e.Message)}))}},components:{}}),a=o,n=(i("610e"),i("2877")),_=Object(n["a"])(a,s,r,!1,null,"6167711f",null);e["a"]=_.exports},f183:function(t,e,i){var s=i("d012"),r=i("861d"),o=i("5135"),a=i("9bf2").f,n=i("90e3"),_=i("bb2f"),l=n("meta"),c=0,u=Object.isExtensible||function(){return!0},d=function(t){a(t,l,{value:{objectID:"O"+ ++c,weakData:{}}})},p=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,l)){if(!u(t))return"F";if(!e)return"E";d(t)}return t[l].objectID},m=function(t,e){if(!o(t,l)){if(!u(t))return!0;if(!e)return!1;d(t)}return t[l].weakData},f=function(t){return _&&v.REQUIRED&&u(t)&&!o(t,l)&&d(t),t},v=t.exports={REQUIRED:!1,fastKey:p,getWeakData:m,onFreeze:f};s[l]=!0},fb36:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"detail"},[i("div",{staticClass:"contentpanel box"},[i("div",{ref:"pageHeader",staticClass:"pagetitle"},[i("div",{staticClass:"left"},[i("div",{staticClass:"title"},[i("i",{staticClass:"el-icon-s-goods"}),i("h2",[t._v(t._s(t.$root.$children[0].pName.a)+" "+t._s(t.$t("Products Market")))])])]),i("div",{staticClass:"right"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.quotation()}}},[i("i",{staticClass:"el-icon-plus"}),t._v(" "+t._s(t.$t("Request Quotation"))+" ")])],1)]),i("div",{staticClass:"pagetitle"},[i("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[i("el-breadcrumb-item",{attrs:{to:{path:"/find-products"}}},[t._v(" "+t._s(t.$root.$children[0].pName.a)+" "+t._s(t.$t("Products Market"))+" ")]),i("el-breadcrumb-item",[i("span",{staticClass:"moreName",on:{click:t.returnMore}},[t._v(" "+t._s(t.moreName)+" ")])])],1)],1),1==t.isFound?i("el-card",[i("div",{staticClass:"detailBox"},[i("div",{staticClass:"img_view"},[i("div",{staticClass:"show_img"},[i("div",{staticClass:"magnifier",on:{click:function(e){return t.clickImg(t.imgUrl)}}},[i("vue-photo-zoom-pro",{attrs:{url:t.imgUrl,scale:3,width:200,mask:!1}})],1)]),i("ul",{staticClass:"img_view_list"},t._l(t.imgList,(function(e,s){return i("li",{key:s,class:{active:t.isActive==s},on:{mouseover:function(e){return t.change(s)}}},[i("div",{staticClass:"images-view-item"},[i("img",{attrs:{src:e,alt:""}})])])})),0)]),i("div",{staticClass:"pro_detail"},[i("div",{staticClass:"pro_name_w"},[t._v(t._s(t.products.name))]),i("div",{staticClass:"imports"}),i("el-divider"),i("b",{staticClass:"proCost"},[t._v(" US $"+t._s(t.price)+" ")]),i("el-divider"),t.products.propertyName?i("div",[t._v(t._s(t._f("typeOne")(t.products.propertyName))+": "),i("span",{staticStyle:{color:"rgb(144, 147, 153)"}},[t._v(t._s(t.propValue))])]):t._e(),i("ul",{staticClass:"img_view_list"},t._l(t.typeImg,(function(e,s){return i("li",{key:s,class:{active:t.isActiveCate==s}},[""==e?i("div",{class:{active:t.isActiveCate==s,but:!0},on:{click:function(e){return t.changeCate(s)}}},[""==t.type1[0]?i("span",[t._v("Default")]):i("span",[t._v(t._s(t.type1[s]))])]):i("div",[""==t.type1[0]?i("div",{staticClass:"images-view-item",on:{click:function(e){return t.changeCate(s)}}},[i("img",{attrs:{src:e}})]):i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.type1[s],placement:"bottom"}},[i("div",{staticClass:"images-view-item",on:{click:function(e){return t.changeCate(s)}}},[i("img",{attrs:{src:e}})])])],1)])})),0),t.products.propertyName&&-1!=t.products.propertyName.indexOf("||")?i("div",[t._v(t._s(t._f("typeTwo")(t.products.propertyName))+": "),i("span",{staticStyle:{color:"rgb(144, 147, 153)"}},[t._v(t._s(t.typeTwoData))])]):t._e(),t.type2[0]?i("div",{staticClass:"img_view_list"},t._l(t.type2,(function(e,s){return i("div",{key:s,staticStyle:{"margin-right":"11px","margin-bottom":"10px"}},[i("div",{class:{active:t.isChange==s,but:!0},on:{click:function(i){return t.filterType(e,s)}}},[t._v(t._s(e))])])})),0):t._e(),i("el-divider"),i("div",{staticStyle:{"margin-bottom":"20px"}},[t._v(t._s(t.$t("Delivery: Varies for items shipped from an international location"))+" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Shipping Method",placement:"top"}},[i("i",{staticClass:"el-icon-info",staticStyle:{"font-size":"12px",width:"12px",cursor:"pointer"},on:{click:function(e){t.shoppingDialog=!0}}})])],1),i("el-dropdown",[i("el-button",{attrs:{type:"primary"}},[t._v(" "+t._s(t.$t("Add to Import List"))),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==t.isAdd},nativeOn:{click:function(e){return t.import_pro(t.item,e)}}},[t._v(t._s(t.$t("Add to Import List")))]),i("el-dropdown-item",{nativeOn:{click:function(e){return t.goToDetail(t.item)}}},[t._v(t._s(t.$t("Add to Cart")))])],1)],1)],1)]),i("div",{staticClass:"descript"},[i("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"Description",name:"first"}},[i("div",{staticClass:"detail-desc",domProps:{innerHTML:t._s(t.web)}})])],1)],1)]):i("el-card",[i("div",{staticClass:"notFound"},[i("div",{staticClass:"back"}),i("div",{staticClass:"text"},[t._v(t._s(t.$t("This product has been removed from the shelves")))]),i("div",{staticClass:"goHome"},[i("el-button",{attrs:{type:"primary"},on:{click:t.goHome}},[t._v(t._s(t.$t("Return"))+" ")])],1)])]),0!=t.items.length?i("el-card",{staticStyle:{"margin-top":"20px"}},[i("div",{staticClass:"recommend"},[i("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"Recommended Products",name:"first"}},[i("div",{staticClass:"list"},t._l(t.items,(function(e){return i("el-col",{key:e.id,staticStyle:{"margin-bottom":"20px"},attrs:{sm:12,md:8,lg:6,xl:4}},[i("div",{staticClass:"pro_box"},[i("div",{staticClass:"pro_img"},[i("div",{staticClass:"img-wrap"},[i("el-image",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{fit:"cover",src:e.imgUrl},on:{click:function(i){return t.goToDetail(e)}}})],1)]),i("div",{staticClass:"pro_name",on:{click:function(i){return t.goToDetail(e)}}},[i("a",[t._v(t._s(e.name))])]),i("div",{staticClass:"price"},[i("span",{staticClass:"pro_cost"},[t._v("US $"+t._s(e.cost))])]),i("div",{staticClass:"imports_"}),i("div",{staticStyle:{display:"flex",width:"100%","justify-content":"center","margin-top":"15px"}},[i("el-dropdown",[i("el-button",{attrs:{type:"primary"}},[t._v(" "+t._s(t.$t("Add to Import List"))),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticClass:"importBut",attrs:{disabled:1==e.hasImport},nativeOn:{click:function(i){return t.import_pro(e,i)}}},[t._v(t._s(t.$t("Add to Import List")))]),i("el-dropdown-item",{nativeOn:{click:function(i){return t.goToDetail(e)}}},[t._v(t._s(t.$t("Add to Cart")))])],1)],1)],1)])])})),1)])],1)],1)]):t._e()],1),i("div"),i("el-dialog",{attrs:{title:"Shipping Method",visible:t.shoppingDialog,width:"40%"},on:{"update:visible":function(e){t.shoppingDialog=e}}},[i("el-divider"),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.shopMethod,"highlight-current-row":""}},[i("el-table-column",{attrs:{label:"",width:"80"}}),i("el-table-column",{attrs:{property:"time",label:"Estimated Delivery",width:"200"}}),i("el-table-column",{attrs:{property:"track",label:"Tracking",width:"150"}},[i("i",{staticClass:"el-icon-check"})]),i("el-table-column",{attrs:{property:"name",label:"Carrier"}})],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.shoppingDialog=!1}}},[t._v(t._s(t.$t("Close")))])],1)],1),i("div",{staticClass:"ball",style:{top:t.ball.y+"px",left:t.ball.x+"px",opacity:t.ball.opacity}}),i("Quotation",{attrs:{visible:t.visible},on:{"update:visible":function(e){t.visible=e}}}),i("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},r=[],o=i("dd3c"),a=o["a"],n=(i("2d4d"),i("2877")),_=Object(n["a"])(a,s,r,!1,null,"5a6f221e",null);e["default"]=_.exports},fb6a:function(t,e,i){"use strict";var s=i("23e7"),r=i("861d"),o=i("e8b5"),a=i("23cb"),n=i("50c4"),_=i("fc6a"),l=i("8418"),c=i("b622"),u=i("1dde"),d=u("slice"),p=c("species"),m=[].slice,f=Math.max;s({target:"Array",proto:!0,forced:!d},{slice:function(t,e){var i,s,c,u=_(this),d=n(u.length),v=a(t,d),h=a(void 0===e?d:e,d);if(o(u)&&(i=u.constructor,"function"!=typeof i||i!==Array&&!o(i.prototype)?r(i)&&(i=i[p],null===i&&(i=void 0)):i=void 0,i===Array||void 0===i))return m.call(u,v,h);for(s=new(void 0===i?Array:i)(f(h-v,0)),c=0;v<h;v++,c++)v in u&&l(s,c,u[v]);return s.length=c,s}})}}]);
//# sourceMappingURL=products-detail.da98e78f.js.map