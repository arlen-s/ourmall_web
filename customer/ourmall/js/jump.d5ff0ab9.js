(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jump"],{"0e0b":function(t,e,s){"use strict";s("b0dd")},ad65:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"page-loading modal-loading"},[s("div",{staticClass:"scm-loader"},[s("div",{staticClass:"dot"},[s("div",{staticClass:"first"})]),s("div",{staticClass:"dot"}),s("div",{staticClass:"dot"}),s("div",{staticClass:"dot"})]),s("div",[t._v("Loading ...")])])])}],i={data:function(){return{time:0}},mounted:function(){var t=this;this.$route.query.shopUrl?this.time=setInterval((function(){t.getLoginStatus(t.$route.query.shopUrl)}),2e3):this.$router.push({path:"/login"})},beforeDestroy:function(){clearInterval(this.time)},methods:{getLoginStatus:function(t){var e=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:t},(function(t){"9999"==t.ErrorCode?(clearInterval(e.time),t.Data.Results.status&&1==t.Data.Results.status?(localStorage.setItem("c_apiUserId",t.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",t.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(t.Data.Results.userInfo)),e.$store.commit("setUserInfo",t.Data.Results.userInfo),e.$router.push({name:"dashboard"})):(e.$elementMessage(t.Message,"error"),setTimeout((function(){window.location.href="/"}),3e3))):(e.$elementMessage(t.Message,"error"),setTimeout((function(){window.location.href="/"}),3e3))}))}}},n=i,r=(s("0e0b"),s("2877")),u=Object(r["a"])(n,a,o,!1,null,"10cbaddf",null);e["default"]=u.exports},b0dd:function(t,e,s){}}]);