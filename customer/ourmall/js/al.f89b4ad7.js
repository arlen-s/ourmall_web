(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["al"],{"7fd7":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e._self._c;return t("div")},r=[],s=(o("149f"),{data(){return{}},components:{},mounted(){localStorage.removeItem("c_apiUserToken"),localStorage.removeItem("c_apiUserId"),localStorage.removeItem("c_ourMallUserInfo"),document.title=this.$route.meta.title,this.$showLoading(),this.$apiCall("api.User.checkDemoLogin",{demoLoginKey:this.$route.query.demoLoginKey},e=>{this.$hideLoading(),9999==e.ErrorCode?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserToken",e.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",e.Data.Results.id),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results)),this.$store.commit("setUserInfo",e.Data.Results),this.$router.push({name:"dashboard"})):(this.$hideLoading(),this.$elementMessage(e.Message,"error"))})},methods:{}}),l=s,i=o("e607"),n=Object(i["a"])(l,a,r,!1,null,null,null);t["default"]=n.exports},8062:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e._self._c;return t("div")},r=[],s=(o("149f"),{data(){return{}},components:{},mounted(){localStorage.removeItem("c_apiUserToken"),localStorage.removeItem("c_apiUserId"),localStorage.removeItem("c_ourMallUserInfo"),document.title=this.$route.meta.title,this.$showLoading(),this.$apiCall("api.User.adminLogin",{id:this.$route.query.id,t:this.$route.query.t,code:this.$route.query.code},e=>{this.$hideLoading(),9999==e.ErrorCode?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserToken",e.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",e.Data.Results.id),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results)),this.$store.commit("setUserInfo",e.Data.Results),this.$router.push({name:"dashboard"})):(this.$hideLoading(),this.$elementMessage(e.Message,"error"))})},methods:{}}),l=s,i=o("e607"),n=Object(i["a"])(l,a,r,!1,null,null,null);t["default"]=n.exports}}]);
//# sourceMappingURL=al.f89b4ad7.js.map