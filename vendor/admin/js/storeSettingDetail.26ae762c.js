(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSettingDetail"],{"0fc5":function(t,e,a){},1296:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"setting-page"},[a("el-scrollbar",{staticClass:"left"},[a("div",{staticClass:"content"},[1==t.type?a("h1",[t._v("商品详情")]):2==t.type?a("a",{staticClass:"back",attrs:{href:"javascript:;"},on:{click:function(e){t.type=1}}},[a("h1",[a("i",{staticClass:"el-icon-arrow-left"}),t._v(" 商品详情 ")])]):t._e(),1==t.type?[a("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){return t.routerChange("header")}}},[a("div",{staticClass:"content-box"},[a("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),a("i",{staticClass:"fa fa-header logo",attrs:{"aria-hidden":"true"}}),a("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页头")))])])]),a("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){t.type=2}}},[a("div",{staticClass:"content-box"},[a("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),a("i",{staticClass:"fa fa-product-hunt logo",attrs:{"aria-hidden":"true"}}),a("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.商品详情页")))])])]),a("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){return t.routerChange("footer")}}},[a("div",{staticClass:"content-box"},[a("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),a("i",{staticClass:"iconfont icon-footer logo",attrs:{"aria-hidden":"true"}}),a("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页脚")))])])])]:2==t.type?[a("el-card",{staticClass:" mg-b-20"},[a("div",{staticClass:"title"},[t._v("商品图样式")]),a("div",[a("el-select",{model:{value:t.detailPage.imgSize,callback:function(e){t.$set(t.detailPage,"imgSize",e)},expression:"detailPage.imgSize"}},t._l(t.options,(function(e){return a("el-option",{key:e.value,attrs:{label:t.$t(e.label),value:e.value}})})),1)],1)]),a("el-card",[a("div",{staticClass:"tags-ipt-wrap"},[a("div",{staticClass:"title"},[t._v("详情页标签文案 "),t.detailPage.tags&&t.detailPage.tags.length>5?a("span",{staticClass:"sub"},[t._v("(最多6个)")]):t._e()]),a("div",{staticClass:"ipt-wrap"},[a("vue-tags-input",{attrs:{tags:t.detailPage.tags},on:{"tags-changed":t.tagsChange},model:{value:t.tagIpt,callback:function(e){t.tagIpt=e},expression:"tagIpt"}}),a("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(e){t.isShowExample=!t.isShowExample}}},[a("i",{staticClass:"el-icon-plus"})])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowExample,expression:"isShowExample"}],staticClass:"example-wrap"},[a("ul",t._l(t.exampleList,(function(e){return a("li",{key:e},[a("el-link",{on:{click:function(a){return t.addTag(e)}}},[t._v(t._s(e))])],1)})),0)])])])]:t._e()],2)]),a("el-scrollbar",{ref:"rightBox",staticClass:"right"},[a("div",{staticClass:"content"},[a("demoHeader",{attrs:{data:t.$store.state.configJson.header,headerMenu:t.$store.state.configJson.menu}}),a("demoDetail",{attrs:{data:t.detailPage}}),a("demoFooter",{attrs:{setting:t.$store.state.configJson.footer}})],1)]),a("div",{staticClass:"action"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.save}},[t._v(t._s(t.$t("storeSetting.完成")))])],1)],1)},i=[],n=a("3c7d"),o=(a("2c45"),a("1fbe"),a("390f"),a("ca52"),a("1248"),a("3da3"),a("b0a9"),a("2ee7"),a("826e")),r=a("db46"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail-demo-wrap",style:{paddingTop:t.$store.state.configJson.header.logoWidth+"px"}},[a("div",{staticClass:"pagetitle"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/store-setting/detail"}}},[t._v("Products Market")]),a("el-breadcrumb-item",[t._v("Clothing, Shoes&Accessories")]),a("el-breadcrumb-item",[t._v("Athletic Shoes")])],1)],1),a("el-card",{staticClass:"product-box"},[a("div",{staticClass:"detailBox"},[a("div",{staticClass:"img-view"},[a("div",{staticClass:"show-img"},[a("i",{staticClass:"el-icon-picture"})]),a("div",{staticClass:"list-wrap"},[a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"el-icon-arrow-left"})]),a("ul",t._l(3,(function(t){return a("li",{key:t},[a("div",{staticClass:"show-img-sub"},[a("i",{staticClass:"el-icon-picture"})])])})),0),a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"el-icon-arrow-right"})])])]),a("div",{staticClass:"pro-detail"},[a("div",{staticClass:"name"},[t._v("Product name")]),a("div",{staticClass:"price"},[t._v(" $ 88.00")]),a("div",{staticClass:"select-wrap"}),a("div",{staticClass:"attr"},[a("span",{staticClass:"title"},[t._v("SKU:")]),a("span",{staticClass:"val"},[t._v("sku111111")])]),a("div",{staticClass:"attr"},[a("span",{staticClass:"title"},[t._v("Weight:")]),a("span",{staticClass:"val"},[t._v("55 g")])]),a("ul",{staticClass:"tags"},t._l(t.data.tags,(function(e){return a("li",{key:e.text},[a("span",{staticClass:" tx-danger"},[t._v("*")]),a("span",{staticClass:"text"},[t._v(t._s(e.text))])])})),0),a("div",{staticClass:"action"},[a("el-button",{attrs:{type:"primary"}},[t._v("Add to List")])],1),"Tile"==t.data.imgSize?a("div",{staticClass:"inner-description"},[a("p",[t._v("Product Description content")])]):t._e()])]),"Thumbnail"==t.data.imgSize?a("div",{staticClass:"descript"},[a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"Description",name:"first"}},[a("div",{staticClass:"detail-desc"},[a("p",[t._v("Product Description content")])])])],1)],1):t._e()])],1)},c=[],u={props:["data"],data:function(){return{activeName:"first"}}},d=u,g=(a("99c1"),a("cba8")),f=Object(g["a"])(d,l,c,!1,null,"9c3ea24c",null),p=f.exports,v=a("59a4"),h=a.n(v),m={data:function(){return{loading:!1,type:1,isSave:!1,options:[{label:"storeSetting.平铺",value:"Tile"},{label:"storeSetting.缩略图",value:"Thumbnail"}],tagIpt:"",detailPage:{imgSize:"Thumbnail",tags:[]},isShowExample:!1,exampleList:["Trade safety","Quality Assurance","Convenience","Popular","Best Seller","Acclaimed","Shopify sells goods","Best-selling item","preferential","Most purchases","Infinite repo","Most profitable"]}},components:{demoHeader:o["a"],demoFooter:r["a"],demoDetail:p,VueTagsInput:h.a},mounted:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){9999==e.ErrorCode&&0!==e.Data.Results.length&&(e.Data.Results.header.activeMenu&&e.Data.Results.menu.forEach((function(a){a.id==e.Data.Results.header.activeMenu&&(t.headerMenu=a)})),e.Data.Results.detailPage&&(t.detailPage=JSON.parse(JSON.stringify(e.Data.Results.detailPage))),t.$store.commit("getShopConfig",e.Data.Results))}))},beforeRouteLeave:function(t,e,a){if(this.isSave)a();else{var s=confirm(this.$t("logistics.当前页面还未保存，确定要离开吗?"));s?a():a(!1)}},methods:{save:function(){var t=this;this.isSave=!0,this.$store.commit("setDetailPage",this.detailPage),this.loading=!0,this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){t.loading=!1,9999==e.ErrorCode?t.$elementMessage(t.$t("storeSetting.保存成功"),"success"):t.$message({message:e.Message,type:"error"})}))},tagsChange:function(t){t=t.slice(0,6),this.detailPage.tags=t.map((function(t){return t}))},addTag:function(t){if(this.isShowExample=!1,!(this.detailPage.tags&&this.detailPage.tags.length>5)){this.detailPage.tags&&this.detailPage.tags.length||(this.detailPage.tags=[]),console.log(this.detailPage.tags),this.detailPage.tags.push({text:t,tiClasses:["ti-valid"]}),this.detailPage.tags=Object(n["a"])(new Set(this.detailPage.tags));var e={};this.detailPage.tags=this.detailPage.tags.reduce((function(t,a){return!e[a.text]&&(e[a.text]=t.push(a)),t}),[])}},routerChange:function(t,e){var a={};switch(a.cid=e?e.cid:(new Date).getTime(),t){case"header":this.$router.push({path:"/store-setting/header"});break;case"footer":this.$router.push({path:"/store-setting/footer"});break;case"richText":this.$router.push({path:"/store-setting/richEditor",query:a});break;case"slider":this.$router.push({path:"/store-setting/slider",query:a});break;case"singleImg":this.$router.push({path:"/store-setting/singleImg",query:a});break;case"singleProduct":this.$router.push({path:"/store-setting/productOne",query:a});break;case"hotProduct":this.$router.push({path:"/store-setting/productList",query:a});break;case"productCategory":this.$router.push({path:"/store-setting/productCategory",query:a});break;default:break}}}},b=m,y=(a("8ae2"),Object(g["a"])(b,s,i,!1,null,"6b14d5da",null));e["default"]=y.exports},"261b":function(t,e,a){"use strict";var s=a("9277"),i=a("72ae"),n=a("b2e7"),o=a("ccb6"),r=a("fc96"),l=a("cb1f"),c=a("bfa4"),u=a("1883"),d=a("8037"),g=a("be72"),f=a("73d2"),p=a("c050"),v=a("8fa6"),h=a("9e41");t.exports=function(t,e,a){var m=-1!==t.indexOf("Map"),b=-1!==t.indexOf("Weak"),y=m?"set":"add",C=i[t],w=C&&C.prototype,x=C,A={},_=function(t){var e=n(w[t]);r(w,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(b&&!g(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return b&&!g(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(b&&!g(t))&&e(this,0===t?0:t)}:function(t,a){return e(this,0===t?0:t,a),this})},S=o(t,!d(C)||!(b||w.forEach&&!f((function(){(new C).entries().next()}))));if(S)x=a.getConstructor(e,t,m,y),l.enable();else if(o(t,!0)){var k=new x,E=k[y](b?{}:-0,1)!=k,I=f((function(){k.has(1)})),M=p((function(t){new C(t)})),U=!b&&f((function(){var t=new C,e=5;while(e--)t[y](e,e);return!t.has(-0)}));M||(x=e((function(t,e){u(t,w);var a=h(new C,t,x);return void 0!=e&&c(e,a[y],{that:a,AS_ENTRIES:m}),a})),x.prototype=w,w.constructor=x),(I||U)&&(_("delete"),_("has"),m&&_("get")),(U||E)&&_(y),b&&w.clear&&delete w.clear}return A[t]=x,s({global:!0,forced:x!=C},A),v(x,t),b||a.setStrong(x,t,m),x}},"2e39":function(t,e,a){var s=a("73d2"),i=a("be72"),n=a("7928"),o=a("95b3"),r=Object.isExtensible,l=s((function(){r(1)}));t.exports=l||o?function(t){return!!i(t)&&((!o||"ArrayBuffer"!=n(t))&&(!r||r(t)))}:r},"3da3":function(t,e,a){"use strict";var s=a("261b"),i=a("d14c");s("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},"44f5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg=="},"4a26":function(t,e,a){"use strict";a("7081")},6777:function(t,e,a){},7081:function(t,e,a){},"826e":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header-wrap",style:{backgroundColor:t.data.isTransparent?"transparent":t.data.backgroundColor}},[a("div",{staticClass:"page-header"},[t.data.logo?a("h1",{style:{backgroundImage:"url("+(t.data.logo?t.data.logo:t.defaultLogo)+")",width:t.data.logoWidth?t.data.logoWidth+"px":"60px",height:t.data.logoWidth?t.data.logoWidth+"px":"60px"}}):this.$store.state.userInfo.shop.name?a("h1",{staticClass:"logo-name tx-ellipsis1"},[t._v(t._s(this.$store.state.userInfo.shop.name))]):t._e(),a("div",{staticClass:"right"},[a("ul",[t._l(t.headerMenu.menu,(function(e){return[e.id?a("li",{key:e.id,staticClass:"dropmenu"},[a("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),e.children&&e.children.length>0?a("ul",{staticClass:"drop-sec"},t._l(e.children,(function(e){return a("li",{key:e.id,staticClass:"sec-item"},[a("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),a("ul",{staticClass:"drop-third"},t._l(e.children,(function(e){return a("li",{key:e.id,style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[t._v(t._s(e.label))])})),0)])})),0):t._e()]):t._e()]})),t.data.isVisibleSearch?a("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[a("i",{staticClass:"el-icon-search"})]):t._e(),a("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[a("i",{staticClass:"iconfont icon-nav",staticStyle:{"font-size":"26px"}})]),a("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[a("i",{staticClass:"el-icon-user-solid"})])],2)])])])},i=[],n=a("44f5"),o=a.n(n),r={props:["data","headerMenu"],data:function(){return{defaultLogo:o.a}},created:function(){}},l=r,c=(a("b2a4"),a("cba8")),u=Object(c["a"])(l,s,i,!1,null,"1468dece",null);e["a"]=u.exports},"8ae2":function(t,e,a){"use strict";a("0fc5")},9185:function(t,e,a){var s=a("73d2");t.exports=!s((function(){return Object.isExtensible(Object.preventExtensions({}))}))},"95b3":function(t,e,a){var s=a("73d2");t.exports=s((function(){if("function"==typeof ArrayBuffer){var t=new ArrayBuffer(8);Object.isExtensible(t)&&Object.defineProperty(t,"a",{value:8})}}))},"99c1":function(t,e,a){"use strict";a("b599")},b2a4:function(t,e,a){"use strict";a("6777")},b599:function(t,e,a){},cb1f:function(t,e,a){var s=a("9277"),i=a("b2e7"),n=a("5c2d"),o=a("be72"),r=a("9056"),l=a("a9c9").f,c=a("d2a3"),u=a("a8a1"),d=a("2e39"),g=a("9619"),f=a("9185"),p=!1,v=g("meta"),h=0,m=function(t){l(t,v,{value:{objectID:"O"+h++,weakData:{}}})},b=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!r(t,v)){if(!d(t))return"F";if(!e)return"E";m(t)}return t[v].objectID},y=function(t,e){if(!r(t,v)){if(!d(t))return!0;if(!e)return!1;m(t)}return t[v].weakData},C=function(t){return f&&p&&d(t)&&!r(t,v)&&m(t),t},w=function(){x.enable=function(){},p=!0;var t=c.f,e=i([].splice),a={};a[v]=1,t(a).length&&(c.f=function(a){for(var s=t(a),i=0,n=s.length;i<n;i++)if(s[i]===v){e(s,i,1);break}return s},s({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:u.f}))},x=t.exports={enable:w,fastKey:b,getWeakData:y,onFreeze:C};n[v]=!0},d14c:function(t,e,a){"use strict";var s=a("a9c9").f,i=a("2d97"),n=a("18f3"),o=a("7041"),r=a("1883"),l=a("bfa4"),c=a("fec0"),u=a("5b38"),d=a("7adc"),g=a("cb1f").fastKey,f=a("2719"),p=f.set,v=f.getterFor;t.exports={getConstructor:function(t,e,a,c){var u=t((function(t,s){r(t,f),p(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=s&&l(s,t[c],{that:t,AS_ENTRIES:a})})),f=u.prototype,h=v(e),m=function(t,e,a){var s,i,n=h(t),o=b(t,e);return o?o.value=a:(n.last=o={index:i=g(e,!0),key:e,value:a,previous:s=n.last,next:void 0,removed:!1},n.first||(n.first=o),s&&(s.next=o),d?n.size++:t.size++,"F"!==i&&(n.index[i]=o)),t},b=function(t,e){var a,s=h(t),i=g(e);if("F"!==i)return s.index[i];for(a=s.first;a;a=a.next)if(a.key==e)return a};return n(f,{clear:function(){var t=this,e=h(t),a=e.index,s=e.first;while(s)s.removed=!0,s.previous&&(s.previous=s.previous.next=void 0),delete a[s.index],s=s.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,a=h(e),s=b(e,t);if(s){var i=s.next,n=s.previous;delete a.index[s.index],s.removed=!0,n&&(n.next=i),i&&(i.previous=n),a.first==s&&(a.first=i),a.last==s&&(a.last=n),d?a.size--:e.size--}return!!s},forEach:function(t){var e,a=h(this),s=o(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:a.first){s(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!b(this,t)}}),n(f,a?{get:function(t){var e=b(this,t);return e&&e.value},set:function(t,e){return m(this,0===t?0:t,e)}}:{add:function(t){return m(this,t=0===t?0:t,t)}}),d&&s(f,"size",{get:function(){return h(this).size}}),u},setStrong:function(t,e,a){var s=e+" Iterator",i=v(e),n=v(s);c(t,e,(function(t,e){p(this,{type:s,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=n(this),e=t.kind,a=t.last;while(a&&a.removed)a=a.previous;return t.target&&(t.last=a=a?a.next:t.state.first)?"keys"==e?{value:a.key,done:!1}:"values"==e?{value:a.value,done:!1}:{value:[a.key,a.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),a?"entries":"values",!a,!0),u(e)}}},db46:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():a("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&"scribe"==t.setting.content[0].type?a("div",{staticClass:"submit-email"},[a("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[a("div",{staticClass:"row-1"},[a("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),a("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),a("div",{staticClass:"row-2"},[a("div",{staticClass:"l-ipt"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),a("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[a("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed||t.setting.contentConfig.navigateUsed?a("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[a("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1200px"}},[t._l(t.setting.content,(function(e,s){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=s?a("div",{key:s,staticClass:"c-3"},[a("div",{staticClass:"text"},[a("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),a("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),a("div",{staticClass:"btn"},[a("div",{staticClass:"l-ipt"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),a("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[a("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?a("div",{key:s,staticClass:"c-1 company"},[a("h2",{staticClass:"logo"},[t.setting.companyLogo?a("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():a("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==",alt:""}})]),a("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),a("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?a("div",{key:s,staticClass:"c-2"},[a("dl",[e.title?a("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),a("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?a("div",{key:s,staticClass:"c-2"},[a("dl",[e.title?a("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(t.menu,(function(e,s){return a("dd",{key:s},[a("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?a("div",{key:s,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[a("dl",[a("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),a("dd",[a("div",{staticClass:"d-flex"},[e.facebook?a("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[a("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?a("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[a("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?a("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[a("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?a("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[a("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?a("div",{staticClass:"bottom-row-copyright"},[t._v(" © 2021 Supplier store name Powered by OurMall. ")]):t._e()])},i=[],n=(a("2c45"),a("1fbe"),{props:["setting"],data:function(){return{email:"",menu:[]}},watch:{"setting.selectMenu":{handler:function(){var t=this;this.$store.state.configJson.menu.forEach((function(e){e.id==t.setting.selectMenu&&(t.menu=e.menu)}))},deep:!0}},mounted:function(){},methods:{submitSubscribe:function(){}}}),o=n,r=(a("4a26"),a("cba8")),l=Object(r["a"])(o,s,i,!1,null,"3709982d",null);e["a"]=l.exports}}]);