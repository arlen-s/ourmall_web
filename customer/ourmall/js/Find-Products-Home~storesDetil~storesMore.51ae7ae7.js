(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Find-Products-Home~storesDetil~storesMore"],{"0b01":function(t,e,o){},3032:function(t,e,o){"use strict";o("841d")},"6afc":function(t,e,o){},"841d":function(t,e,o){},"9e91":function(t,e,o){"use strict";o("0b01")},b39c:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-header"},[o("router-link",{attrs:{to:"/"}},[o("h1",{style:{backgroundImage:"url("+t.$store.state.shopInfo.logo+")"}})]),o("div",{staticClass:"right"},[o("ul",[o("li",[o("router-link",{class:{active:"home"==t.$route.name},attrs:{to:"/"}},[t._v("Home")])],1),o("li",[o("router-link",{attrs:{to:"/products-market"}},[t._v("Find Products")])],1),t.$store.state.userInfo?[o("li",{staticClass:"import-link"},[o("router-link",{attrs:{to:"/import-list"}},[o("i",[this.$root.$children[0].importNum?o("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),t._v(" My Import List ")])],1),o("li",[o("el-dropdown",{on:{command:t.handleCommand}},[o("span",{staticClass:"el-dropdown-link"},[o("i",{staticClass:"user-i"}),o("span",{staticClass:"name tx-ellipsis1"},[t._v(t._s(t.$store.state.userInfo.name))]),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[o("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" My Profile ")]),o("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[o("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" Logout ")])],1)],1)],1)]:[o("li",[o("a",{attrs:{href:"javascript:;"},on:{click:t.openDialogLogin}},[t._v("Login")])]),o("li",{staticClass:"reg"},[o("a",{attrs:{href:"javascript:;"},on:{click:t.openRegister}},[t._v("Register")])])]],2)])],1)},i=[],a={data:function(){return{c_apiShopId:JSON.parse(localStorage.getItem("c_apiShopId"))}},methods:{handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var e=JSON.parse(localStorage.getItem("isValidationCW"));if(!e)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break}},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()}}},n=a,r=(o("ecc6"),o("2877")),l=Object(r["a"])(n,s,i,!1,null,"ace027c8",null);e["a"]=l.exports},c942:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home-footer"},[o("div",{staticClass:"content"},[o("div",{staticClass:"left"},[o("p",{staticClass:"r1 title"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),o("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")])]),"shopify"==t.$route.name?o("div",{staticClass:"right"},[o("ul",[o("li",{staticStyle:{"margin-right":"70px"}},[o("div",{staticClass:"t title"},[t._v("Company")]),o("div",{staticClass:"m"},[o("span",[t._v("Privacy policy")]),o("span",[t._v("Terms of use")]),o("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),o("li",{staticStyle:{margin:"0"}},[o("div",{staticClass:"t title"},[t._v("Getting Started")]),o("div",{staticClass:"m"},[o("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),o("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),o("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),o("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])]):t._e()]),t._m(0)])},i=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"footLogo"},[o("div",{staticClass:"d-flex"},[o("span",{staticStyle:{"margin-top":"14px"}},[t._v(" © 2021, Powered by OurMall ")])])])}],a=(o("3032"),o("2877")),n={},r=Object(a["a"])(n,s,i,!1,null,"11c9dfc3",null);e["a"]=r.exports},d8f7:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():s("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&t.setting.content.length&&"scribe"==t.setting.content[0].type?s("div",{staticClass:"submit-email"},[s("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[s("div",{staticClass:"row-1"},[s("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"row-2"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed?s("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[s("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1420px"}},[t._l(t.setting.content,(function(e,i){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=i?s("div",{key:i,staticClass:"c-3"},[s("div",{staticClass:"text"},[s("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"btn"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?s("div",{key:i,staticClass:"c-1"},[s("h2",{staticClass:"logo"},[t.setting.companyLogo?s("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():s("img",{attrs:{src:o("dd13"),alt:""}})]),s("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),s("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?s("div",{key:i,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),s("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?s("div",{key:i,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(e.menu,(function(e,o){return s("dd",{key:o},["9999"==e.link.value?s("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(" "+t._s(e.name)+" ")]):"9998"==e.link.value?s("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(o){return t.gotoUrl(e.url)}}},[t._v(" "+t._s(e.name)+" ")]):s("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(o){return t.goto(e.link.url)}}},[t._v(" "+t._s(e.name)+" ")])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?s("div",{key:i,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[s("dl",[s("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),s("dd",[s("div",{staticClass:"d-flex"},[e.facebook?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?s("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?s("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?s("div",{staticClass:"bottom-row-copyright"},[s("span",[t._v("© 2021 Supplier store name Powered by OurMall.")]),t._v(" | "),s("span",{staticClass:"ban"},[s("a",{attrs:{href:"https://beian.miit.gov.cn",target:"_blank"}},[t._v(t._s(t.$store.state.referenceNumber||""))])])]):t._e()])},i=[],a={props:["setting"],data:function(){return{email:"",number:sessionStorage.getItem("filingNumber")}},mounted:function(){},methods:{gotoUrl:function(t){this.$store.state.userInfo?window.location.href=t:"home"!=t&&"products-market"!=t?-1!=t.indexOf("http")?window.location.href=t:this.openDialogLogin():window.location.href=t},goto:function(t){this.$store.state.userInfo?this.$router.push({name:t}):"home"!=t&&"productsMarketHome"!=t?this.openDialogLogin():this.$router.push({name:t})},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()},submitSubscribe:function(){var t=this;this.email&&(this.$showLoading(),this.$apiCall("api.Market.subscribe",{email:this.email},(function(e){9999==e.ErrorCode?(t.email="",t.$message.success("Email Submitted Successfully !")):t.$message.error(e.Message),t.$hideLoading()})))}}},n=a,r=(o("9e91"),o("2877")),l=Object(r["a"])(n,s,i,!1,null,"9c83e93c",null);e["a"]=l.exports},dd13:function(t,e,o){t.exports=o.p+"img/logoNew.994d0ff0.png"},ecc6:function(t,e,o){"use strict";o("6afc")}}]);
//# sourceMappingURL=Find-Products-Home~storesDetil~storesMore.51ae7ae7.js.map