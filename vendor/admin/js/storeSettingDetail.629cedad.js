(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeSettingDetail"],{1296:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"setting-page"},[s("el-scrollbar",{staticClass:"left"},[s("div",{staticClass:"content"},[1==t.type?s("h1",[t._v("商品详情")]):2==t.type?s("a",{staticClass:"back",attrs:{href:"javascript:;"},on:{click:function(e){t.type=1}}},[s("h1",[s("i",{staticClass:"el-icon-arrow-left"}),t._v(" 商品详情 ")])]):t._e(),1==t.type?[s("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){return t.routerChange("header")}}},[s("div",{staticClass:"content-box"},[s("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),s("i",{staticClass:"fa fa-header logo",attrs:{"aria-hidden":"true"}}),s("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页头")))])])]),s("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){t.type=2}}},[s("div",{staticClass:"content-box"},[s("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),s("i",{staticClass:"fa fa-product-hunt logo",attrs:{"aria-hidden":"true"}}),s("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.商品详情页")))])])]),s("div",{staticClass:"modal-content list-component mg-b-20",on:{click:function(e){return t.routerChange("footer")}}},[s("div",{staticClass:"content-box"},[s("i",{staticClass:"iconfont icon-draggable",staticStyle:{opacity:"0"}}),s("i",{staticClass:"iconfont icon-footer logo",attrs:{"aria-hidden":"true"}}),s("div",{staticClass:"title"},[t._v(t._s(t.$t("storeSetting.页脚")))])])])]:2==t.type?[s("el-card",{staticClass:"mg-b-20"},[s("div",{staticClass:"title"},[t._v("商品图样式")]),s("div",[s("el-select",{model:{value:t.detailPage.imgSize,callback:function(e){t.$set(t.detailPage,"imgSize",e)},expression:"detailPage.imgSize"}},t._l(t.options,(function(e){return s("el-option",{key:e.value,attrs:{label:t.$t(e.label),value:e.value}})})),1)],1)]),s("el-card",[s("div",{staticClass:"tags-ipt-wrap"},[s("div",{staticClass:"title"},[t._v("详情页标签文案 "),t.detailPage.tags&&t.detailPage.tags.length>5?s("span",{staticClass:"sub"},[t._v("(最多6个)")]):t._e()]),s("div",{staticClass:"ipt-wrap"},[s("vue-tags-input",{attrs:{tags:t.detailPage.tags},on:{"tags-changed":t.tagsChange},model:{value:t.tagIpt,callback:function(e){t.tagIpt=e},expression:"tagIpt"}}),s("el-link",{attrs:{type:"primary",underline:!1},on:{click:function(e){t.isShowExample=!t.isShowExample}}},[s("i",{staticClass:"el-icon-plus"})])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowExample,expression:"isShowExample"}],staticClass:"example-wrap"},[s("ul",t._l(t.exampleList,(function(e){return s("li",{key:e},[s("el-link",{on:{click:function(s){return t.addTag(e)}}},[t._v(t._s(e))])],1)})),0)])])])]:t._e()],2)]),s("el-scrollbar",{ref:"rightBox",staticClass:"right"},[s("div",{staticClass:"content"},[s("demoHeader",{attrs:{data:t.$store.state.configJson.header,headerMenu:t.$store.state.configJson.menu}}),s("demoDetail",{attrs:{data:t.detailPage}}),s("demoFooter",{attrs:{setting:t.$store.state.configJson.footer}})],1)]),s("div",{staticClass:"action"},[s("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.save}},[t._v(t._s(t.$t("storeSetting.完成")))])],1)],1)},i=[],n=s("2909"),r=(s("d3b7"),s("159b"),s("e9c4"),s("fb6a"),s("d81d"),s("6062"),s("3ca3"),s("ddb0"),s("13d5"),s("826e")),o=s("db46"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail-demo-wrap",style:{paddingTop:t.$store.state.configJson.header.logoWidth+"px"}},[s("div",{staticClass:"pagetitle"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/store-setting/detail"}}},[t._v("Products Market")]),s("el-breadcrumb-item",[t._v("Clothing, Shoes&Accessories")]),s("el-breadcrumb-item",[t._v("Athletic Shoes")])],1)],1),s("el-card",{staticClass:"product-box"},[s("div",{staticClass:"detailBox"},[s("div",{staticClass:"img-view"},[s("div",{staticClass:"show-img"},[s("i",{staticClass:"el-icon-picture"})]),s("div",{staticClass:"list-wrap"},[s("a",{attrs:{href:"javascript:;"}},[s("i",{staticClass:"el-icon-arrow-left"})]),s("ul",t._l(3,(function(t){return s("li",{key:t},[s("div",{staticClass:"show-img-sub"},[s("i",{staticClass:"el-icon-picture"})])])})),0),s("a",{attrs:{href:"javascript:;"}},[s("i",{staticClass:"el-icon-arrow-right"})])])]),s("div",{staticClass:"pro-detail"},[s("div",{staticClass:"name"},[t._v("Product name")]),s("div",{staticClass:"price"},[t._v(" $ 88.00")]),s("div",{staticClass:"select-wrap"}),s("div",{staticClass:"attr"},[s("span",{staticClass:"title"},[t._v("SKU:")]),s("span",{staticClass:"val"},[t._v("sku111111")])]),s("div",{staticClass:"attr"},[s("span",{staticClass:"title"},[t._v("Weight:")]),s("span",{staticClass:"val"},[t._v("55 g")])]),s("ul",{staticClass:"tags"},t._l(t.data.tags,(function(e){return s("li",{key:e.text},[s("span",{staticClass:"tx-danger"},[t._v("*")]),s("span",{staticClass:"text"},[t._v(t._s(e.text))])])})),0),s("div",{staticClass:"action"},[s("el-button",{attrs:{type:"primary"}},[t._v("Add to List")])],1),"Tile"==t.data.imgSize?s("div",{staticClass:"inner-description"},[s("p",[t._v("Product Description content")])]):t._e()])]),"Thumbnail"==t.data.imgSize?s("div",{staticClass:"descript"},[s("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"Description",name:"first"}},[s("div",{staticClass:"detail-desc"},[s("p",[t._v("Product Description content")])])])],1)],1):t._e()])],1)},c=[],u={props:["data"],data:function(){return{activeName:"first"}}},d=u,g=(s("895d"),s("2877")),f=Object(g["a"])(d,l,c,!1,null,"752e645a",null),p=f.exports,h=s("c7a0"),v=s.n(h),m={data:function(){return{loading:!1,type:1,isSave:!1,options:[{label:"storeSetting.平铺",value:"Tile"},{label:"storeSetting.缩略图",value:"Thumbnail"}],tagIpt:"",detailPage:{imgSize:"Thumbnail",tags:[]},isShowExample:!1,exampleList:["Trade safety","Quality Assurance","Convenience","Popular","Best Seller","Acclaimed","Shopify sells goods","Best-selling item","preferential","Most purchases","Infinite repo","Most profitable"]}},components:{demoHeader:r["a"],demoFooter:o["a"],demoDetail:p,VueTagsInput:v.a},mounted:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){9999==e.ErrorCode&&0!==e.Data.Results.length&&(e.Data.Results.header.activeMenu&&e.Data.Results.menu.forEach((function(s){s.id==e.Data.Results.header.activeMenu&&(t.headerMenu=s)})),e.Data.Results.detailPage&&(t.detailPage=JSON.parse(JSON.stringify(e.Data.Results.detailPage))),t.$store.commit("getShopConfig",e.Data.Results))}))},beforeRouteLeave:function(t,e,s){if(this.isSave)s();else{var a=confirm(this.$t("logistics.当前页面还未保存，确定要离开吗?"));a?s():s(!1)}},methods:{save:function(){var t=this;this.isSave=!0,this.$store.commit("setDetailPage",this.detailPage),this.loading=!0,this.$apiCall("api.VendorShop.setShopConfig",{configJson:JSON.stringify(this.$store.state.configJson)},(function(e){t.loading=!1,9999==e.ErrorCode?t.$elementMessage(t.$t("storeSetting.保存成功"),"success"):t.$message({message:e.Message,type:"error"})}))},tagsChange:function(t){t=t.slice(0,6),this.detailPage.tags=t.map((function(t){return t}))},addTag:function(t){if(this.isShowExample=!1,!(this.detailPage.tags&&this.detailPage.tags.length>5)){this.detailPage.tags&&this.detailPage.tags.length||(this.detailPage.tags=[]),console.log(this.detailPage.tags),this.detailPage.tags.push({text:t,tiClasses:["ti-valid"]}),this.detailPage.tags=Object(n["a"])(new Set(this.detailPage.tags));var e={};this.detailPage.tags=this.detailPage.tags.reduce((function(t,s){return!e[s.text]&&(e[s.text]=t.push(s)),t}),[])}},routerChange:function(t,e){var s={};switch(s.cid=e?e.cid:(new Date).getTime(),t){case"header":this.$router.push({path:"/store-setting/header"});break;case"footer":this.$router.push({path:"/store-setting/footer"});break;case"richText":this.$router.push({path:"/store-setting/richEditor",query:s});break;case"slider":this.$router.push({path:"/store-setting/slider",query:s});break;case"singleImg":this.$router.push({path:"/store-setting/singleImg",query:s});break;case"singleProduct":this.$router.push({path:"/store-setting/productOne",query:s});break;case"hotProduct":this.$router.push({path:"/store-setting/productList",query:s});break;case"productCategory":this.$router.push({path:"/store-setting/productCategory",query:s});break;default:break}}}},b=m,y=(s("f247"),Object(g["a"])(b,a,i,!1,null,"1c029f88",null));e["default"]=y.exports},"13d5":function(t,e,s){"use strict";var a=s("23e7"),i=s("d58f").left,n=s("a640"),r=s("2d00"),o=s("605d"),l=!o&&r>79&&r<83,c=l||!n("reduce");a({target:"Array",proto:!0,forced:c},{reduce:function(t){var e=arguments.length;return i(this,t,e,e>1?arguments[1]:void 0)}})},"19aa":function(t,e,s){"use strict";var a=s("3a9b"),i=TypeError;t.exports=function(t,e){if(a(e,t))return t;throw new i("Incorrect invocation")}},"1c59":function(t,e,s){"use strict";var a=s("6d61"),i=s("6566");a("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},2266:function(t,e,s){"use strict";var a=s("0366"),i=s("c65b"),n=s("825a"),r=s("0d51"),o=s("e95a"),l=s("07fa"),c=s("3a9b"),u=s("9a1f"),d=s("35a1"),g=s("2a62"),f=TypeError,p=function(t,e){this.stopped=t,this.result=e},h=p.prototype;t.exports=function(t,e,s){var v,m,b,y,C,w,x,A=s&&s.that,S=!(!s||!s.AS_ENTRIES),_=!(!s||!s.IS_RECORD),k=!(!s||!s.IS_ITERATOR),E=!(!s||!s.INTERRUPTED),I=a(e,A),M=function(t){return v&&g(v,"normal",t),new p(!0,t)},U=function(t){return S?(n(t),E?I(t[0],t[1],M):I(t[0],t[1])):E?I(t,M):I(t)};if(_)v=t.iterator;else if(k)v=t;else{if(m=d(t),!m)throw new f(r(t)+" is not iterable");if(o(m)){for(b=0,y=l(t);y>b;b++)if(C=U(t[b]),C&&c(h,C))return C;return new p(!1)}v=u(t,m)}w=_?t.next:v.next;while(!(x=i(w,v)).done){try{C=U(x.value)}catch(z){g(v,"throw",z)}if("object"==typeof C&&C&&c(h,C))return C}return new p(!1)}},2626:function(t,e,s){"use strict";var a=s("d066"),i=s("edd0"),n=s("b622"),r=s("83ab"),o=n("species");t.exports=function(t){var e=a(t);r&&e&&!e[o]&&i(e,o,{configurable:!0,get:function(){return this}})}},"44f5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg=="},"4fad":function(t,e,s){"use strict";var a=s("d039"),i=s("861d"),n=s("c6b6"),r=s("d86b"),o=Object.isExtensible,l=a((function(){o(1)}));t.exports=l||r?function(t){return!!i(t)&&((!r||"ArrayBuffer"!==n(t))&&(!o||o(t)))}:o},"5d73":function(t,e,s){"use strict";s("66da")},"605d":function(t,e,s){"use strict";var a=s("da84"),i=s("c6b6");t.exports="process"===i(a.process)},6062:function(t,e,s){"use strict";s("1c59")},6566:function(t,e,s){"use strict";var a=s("7c73"),i=s("edd0"),n=s("6964"),r=s("0366"),o=s("19aa"),l=s("7234"),c=s("2266"),u=s("c6d2"),d=s("4754"),g=s("2626"),f=s("83ab"),p=s("f183").fastKey,h=s("69f3"),v=h.set,m=h.getterFor;t.exports={getConstructor:function(t,e,s,u){var d=t((function(t,i){o(t,g),v(t,{type:e,index:a(null),first:void 0,last:void 0,size:0}),f||(t.size=0),l(i)||c(i,t[u],{that:t,AS_ENTRIES:s})})),g=d.prototype,h=m(e),b=function(t,e,s){var a,i,n=h(t),r=y(t,e);return r?r.value=s:(n.last=r={index:i=p(e,!0),key:e,value:s,previous:a=n.last,next:void 0,removed:!1},n.first||(n.first=r),a&&(a.next=r),f?n.size++:t.size++,"F"!==i&&(n.index[i]=r)),t},y=function(t,e){var s,a=h(t),i=p(e);if("F"!==i)return a.index[i];for(s=a.first;s;s=s.next)if(s.key===e)return s};return n(g,{clear:function(){var t=this,e=h(t),s=e.index,a=e.first;while(a)a.removed=!0,a.previous&&(a.previous=a.previous.next=void 0),delete s[a.index],a=a.next;e.first=e.last=void 0,f?e.size=0:t.size=0},delete:function(t){var e=this,s=h(e),a=y(e,t);if(a){var i=a.next,n=a.previous;delete s.index[a.index],a.removed=!0,n&&(n.next=i),i&&(i.previous=n),s.first===a&&(s.first=i),s.last===a&&(s.last=n),f?s.size--:e.size--}return!!a},forEach:function(t){var e,s=h(this),a=r(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:s.first){a(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!y(this,t)}}),n(g,s?{get:function(t){var e=y(this,t);return e&&e.value},set:function(t,e){return b(this,0===t?0:t,e)}}:{add:function(t){return b(this,t=0===t?0:t,t)}}),f&&i(g,"size",{configurable:!0,get:function(){return h(this).size}}),d},setStrong:function(t,e,s){var a=e+" Iterator",i=m(e),n=m(a);u(t,e,(function(t,e){v(this,{type:a,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=n(this),e=t.kind,s=t.last;while(s&&s.removed)s=s.previous;return t.target&&(t.last=s=s?s.next:t.state.first)?d("keys"===e?s.key:"values"===e?s.value:[s.key,s.value],!1):(t.target=void 0,d(void 0,!0))}),s?"entries":"values",!s,!0),g(e)}}},"66da":function(t,e,s){},6964:function(t,e,s){"use strict";var a=s("cb2d");t.exports=function(t,e,s){for(var i in e)a(t,i,e[i],s);return t}},"6d61":function(t,e,s){"use strict";var a=s("23e7"),i=s("da84"),n=s("e330"),r=s("94ca"),o=s("cb2d"),l=s("f183"),c=s("2266"),u=s("19aa"),d=s("1626"),g=s("7234"),f=s("861d"),p=s("d039"),h=s("1c7e"),v=s("d44e"),m=s("7156");t.exports=function(t,e,s){var b=-1!==t.indexOf("Map"),y=-1!==t.indexOf("Weak"),C=b?"set":"add",w=i[t],x=w&&w.prototype,A=w,S={},_=function(t){var e=n(x[t]);o(x,t,"add"===t?function(t){return e(this,0===t?0:t),this}:"delete"===t?function(t){return!(y&&!f(t))&&e(this,0===t?0:t)}:"get"===t?function(t){return y&&!f(t)?void 0:e(this,0===t?0:t)}:"has"===t?function(t){return!(y&&!f(t))&&e(this,0===t?0:t)}:function(t,s){return e(this,0===t?0:t,s),this})},k=r(t,!d(w)||!(y||x.forEach&&!p((function(){(new w).entries().next()}))));if(k)A=s.getConstructor(e,t,b,C),l.enable();else if(r(t,!0)){var E=new A,I=E[C](y?{}:-0,1)!==E,M=p((function(){E.has(1)})),U=h((function(t){new w(t)})),z=!y&&p((function(){var t=new w,e=5;while(e--)t[C](e,e);return!t.has(-0)}));U||(A=e((function(t,e){u(t,x);var s=m(new w,t,A);return g(e)||c(e,s[C],{that:s,AS_ENTRIES:b}),s})),A.prototype=x,x.constructor=A),(M||z)&&(_("delete"),_("has"),b&&_("get")),(z||I)&&_(C),y&&x.clear&&delete x.clear}return S[t]=A,a({global:!0,constructor:!0,forced:A!==w},S),v(A,t),y||s.setStrong(A,t,b),A}},"826e":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-header-wrap",style:{backgroundColor:t.data.isTransparent?"transparent":t.data.backgroundColor}},[s("div",{staticClass:"page-header"},[s("div",{staticClass:"left-box"},[t.data.logo?s("h1",{style:{backgroundImage:"url("+(t.data.logo?t.data.logo:t.defaultLogo)+")",width:t.data.logoWidth?t.data.logoWidth+"px":"60px",height:t.data.logoWidth?t.data.logoWidth+"px":"60px"}}):this.$store.state.userInfo.shop.name?s("h1",{staticClass:"logo-name tx-ellipsis1"},[t._v(t._s(this.$store.state.userInfo.shop.name))]):t._e()]),t.data.isVisibleSearch?s("div",{staticClass:"search-box"},[s("el-input",{staticClass:"search-input",staticStyle:{width:"70%"},attrs:{placeholder:"Recommended hot search","prefix-icon":"el-icon-search"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}},[s("el-link",{attrs:{slot:"suffix",underline:!1,type:"info"},on:{click:function(e){t.showInput=!1}},slot:"suffix"},[s("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"16px"}})])],1)],1):t._e(),s("div",{staticClass:"right"},[s("ul",[s("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[s("i",{staticClass:"el-icon-user-solid"})]),s("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[s("i",{staticClass:"iconfont icon-nav",staticStyle:{"font-size":"26px"}})])])])]),s("el-row",{staticClass:"banner-box",attrs:{type:"flex",justify:"center"}},t._l(t.headerMenu.menu,(function(e){return s("el-col",{key:e.timestamp,staticClass:"dropmenu",attrs:{span:4}},[e.id?s("div",{key:e.id,staticClass:"dropmenu"},[s("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),e.children&&e.children.length>0?s("ul",{staticClass:"drop-sec"},t._l(e.children,(function(e){return s("li",{key:e.id,staticClass:"sec-item"},[s("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),s("ul",{staticClass:"drop-third"},t._l(e.children,(function(e){return s("li",{key:e.id,style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[t._v(t._s(e.label))])})),0)])})),0):t._e()]):t._e()])})),1)],1)},i=[],n=s("44f5"),r=s.n(n),o={props:["data","headerMenu"],data:function(){return{defaultLogo:r.a,searchInput:""}},created:function(){}},l=o,c=(s("5d73"),s("2877")),u=Object(c["a"])(l,a,i,!1,null,"6da6cf22",null);e["a"]=u.exports},"895d":function(t,e,s){"use strict";s("c91f")},"948c":function(t,e,s){"use strict";s("9c68")},"9c68":function(t,e,s){},af85:function(t,e,s){},bb2f:function(t,e,s){"use strict";var a=s("d039");t.exports=!a((function(){return Object.isExtensible(Object.preventExtensions({}))}))},c91f:function(t,e,s){},d58f:function(t,e,s){"use strict";var a=s("59ed"),i=s("7b0b"),n=s("44ad"),r=s("07fa"),o=TypeError,l=function(t){return function(e,s,l,c){a(s);var u=i(e),d=n(u),g=r(u),f=t?g-1:0,p=t?-1:1;if(l<2)while(1){if(f in d){c=d[f],f+=p;break}if(f+=p,t?f<0:g<=f)throw new o("Reduce of empty array with no initial value")}for(;t?f>=0:g>f;f+=p)f in d&&(c=s(c,d[f],f,u));return c}};t.exports={left:l(!1),right:l(!0)}},d86b:function(t,e,s){"use strict";var a=s("d039");t.exports=a((function(){if("function"==typeof ArrayBuffer){var t=new ArrayBuffer(8);Object.isExtensible(t)&&Object.defineProperty(t,"a",{value:8})}}))},db46:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():s("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&"scribe"==t.setting.content[0].type?s("div",{staticClass:"submit-email"},[s("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[s("div",{staticClass:"row-1"},[s("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"row-2"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed||t.setting.contentConfig.navigateUsed?s("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[s("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1200px"}},[t._l(t.setting.content,(function(e,a){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=a?s("div",{key:a,staticClass:"c-3"},[s("div",{staticClass:"text"},[s("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"btn"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?s("div",{key:a,staticClass:"c-1 company"},[s("h2",{staticClass:"logo"},[t.setting.companyLogo?s("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():s("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==",alt:""}})]),s("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),s("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?s("div",{key:a,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),s("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?s("div",{key:a,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(t.menu,(function(e,a){return s("dd",{key:a},[s("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?s("div",{key:a,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[s("dl",[s("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),s("dd",[s("div",{staticClass:"d-flex"},[e.facebook?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?s("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?s("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?s("div",{staticClass:"bottom-row-copyright"},[t._v(" © 2023 Supplier store name Powered by OurMall. ")]):t._e()])},i=[],n=(s("d3b7"),s("159b"),{props:["setting"],data:function(){return{email:"",menu:[]}},watch:{"setting.selectMenu":{handler:function(){var t=this;this.$store.state.configJson.menu.forEach((function(e){e.id==t.setting.selectMenu&&(t.menu=e.menu)}))},deep:!0}},mounted:function(){},methods:{submitSubscribe:function(){}}}),r=n,o=(s("948c"),s("2877")),l=Object(o["a"])(r,a,i,!1,null,"06f60feb",null);e["a"]=l.exports},f183:function(t,e,s){"use strict";var a=s("23e7"),i=s("e330"),n=s("d012"),r=s("861d"),o=s("1a2d"),l=s("9bf2").f,c=s("241c"),u=s("057f"),d=s("4fad"),g=s("90e3"),f=s("bb2f"),p=!1,h=g("meta"),v=0,m=function(t){l(t,h,{value:{objectID:"O"+v++,weakData:{}}})},b=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,h)){if(!d(t))return"F";if(!e)return"E";m(t)}return t[h].objectID},y=function(t,e){if(!o(t,h)){if(!d(t))return!0;if(!e)return!1;m(t)}return t[h].weakData},C=function(t){return f&&p&&d(t)&&!o(t,h)&&m(t),t},w=function(){x.enable=function(){},p=!0;var t=c.f,e=i([].splice),s={};s[h]=1,t(s).length&&(c.f=function(s){for(var a=t(s),i=0,n=a.length;i<n;i++)if(a[i]===h){e(a,i,1);break}return a},a({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:u.f}))},x=t.exports={enable:w,fastKey:b,getWeakData:y,onFreeze:C};n[h]=!0},f247:function(t,e,s){"use strict";s("af85")}}]);