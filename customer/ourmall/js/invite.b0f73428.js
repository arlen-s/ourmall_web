(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["invite"],{"1f08":function(t,e,s){},"4b10":function(t,e,s){"use strict";s("ed8c")},"86f5":function(t,e,s){"use strict";s("1f08")},da63:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-invite-reg"},[t._m(0),s("div",{staticClass:"body"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.pageLoading,expression:"pageLoading"}],staticClass:"content"},[s("p",{staticClass:"row1"},[t._v("Hello "+t._s(t.customerName)+",")]),s("p",{staticClass:" row2"},[t._v(" "+t._s(t.words)+" ")]),s("p",{staticClass:"row3"},[t._v("Yours,")]),s("p",{staticClass:" row4"},[t._v(t._s(t.vendorName))]),s("div",{staticClass:"reg"},[s("div",{staticClass:"reg-box"},[t._m(1),s("div",{staticClass:"row6"},[s("div",[s("span",{staticClass:"http"},[t._v("http://")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrl,expression:"shopUrl"}],attrs:{type:"text",placeholder:"Your Shopify store name"},domProps:{value:t.shopUrl},on:{input:[function(e){e.target.composing||(t.shopUrl=e.target.value)},function(e){return t.storeInput(e.target.value)}]}}),s("span",{staticClass:"domain"},[t._v(".myshopify.com")])]),s("el-button",{attrs:{loading:t.loading},on:{click:t.login}},[t._v(" "+t._s(t.loading?"Please Wait":"Connect")+" ")])],1)])])])]),s("div",{staticClass:"page-footer"},[s("div",[t._v("© 2021, Powered by "+t._s(t.$root.$children[0].pName.b)+" APP")])])])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"content"},[s("h1")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row5"},[s("div",{staticClass:"s-logo"})])}],i=(s("4d63"),s("ac1f"),s("25f0"),{data:function(){return{pageLoading:!0,loading:!1,shopUrl:"",customerName:"",words:"",vendorName:""}},created:function(){$("body").addClass("primary-bg"),$("#viewport").attr("content","width=device-width,initial-scale=1.0")},beforeDestroy:function(){$("body").removeClass("primary-bg"),$("#viewport").attr("content","width=device-width, user-scalable=yes, initial-scale=0.3, maximum-scale=1.0, minimum-scale=0.3")},mounted:function(){this.getWords()},methods:{getWords:function(){var t=this;this.pageLoading=!0,this.$apiCall("api.Relationship.getRelationshipByRid",{rid:decodeURIComponent(this.$route.query.rid)},(function(e){t.pageLoading=!1,"9999"==e.ErrorCode?(t.customerName=e.Data.Results.customerName,t.words=e.Data.Results.words,t.vendorName=e.Data.Results.vendorName):t.$elementMessage(e.Data.Results.errorMessage,"error")}))},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?(localStorage.setItem("c_inviteShopUrl",t.shopUrl),e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"dashboard"}),t.win.close()):(t.loading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),t.win.close(),setTimeout((function(){window.location.reload()}),1e3)))):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},login:function(){var t=this;if(!this.shopUrl)return this.$elementMessage(this.$t("Please enter Shopify store name"),"error"),!1;this.win=window.open("/blank.html","Shopify"),this.loading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,rid:this.$route.query.rid,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},storeInput:function(t){for(var e=new RegExp("[A-Za-z0-9-_]+"),s=t.length,a="",o=0;o<s;o++)e.test(t[o])&&(a+=t[o]);this.shopUrl=a}}}),r=i,n=(s("86f5"),s("4b10"),s("2877")),l=Object(n["a"])(r,a,o,!1,null,"3ba6656d",null);e["default"]=l.exports},ed8c:function(t,e,s){}}]);
//# sourceMappingURL=invite.b0f73428.js.map