(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["err404"],{"0197":function(e,t,o){},cc86:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{class:{gd:"/my"==e.$root.$children[0].baseUrl}},[e.code&&e.code.header&&e.code.header.length>0?e._l(e.code.header,(function(t,n){return o("div",{key:n,domProps:{innerHTML:e._s(t)}})})):e._e(),e._m(0),o("div",{staticClass:"c-404"}),o("div",{staticClass:"text"},[e._v(" The page you are looking for can't be found. ")]),o("div",{staticClass:"action"},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.gohome()}}},[e._v("("+e._s(e.sec)+") BACK TO HOMEPAGE")])],1),e.code&&e.code.footer&&e.code.footer.length>0?e._l(e.code.footer,(function(t,n){return o("div",{key:n,domProps:{innerHTML:e._s(t)}})})):e._e()],2)},c=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"h-404"},[o("h1")])}],s=(o("caad"),o("2532"),o("159b"),{data:function(){return{sec:10,setting:null,code:{header:[],footer:[]}}},created:function(){var e=this;this.setting=localStorage.getItem("c_shopConfigJson")?JSON.parse(localStorage.getItem("c_shopConfigJson")):null,this.setting&&this.setting.customCode&&this.setting.customCode.length&&this.setting.customCode.forEach((function(t){t.pages.includes("404页面")&&("底部"==t.position&&e.code.footer.push(t.desc),"顶部"==t.position&&e.code.header.push(t.desc))}))},mounted:function(){var e=this,t=setInterval((function(){e.sec--,e.sec<1&&(clearInterval(t),e.gohome())}),1e3);this.$Burying({object:"12002"})},methods:{gohome:function(){window.location.href="/"}}}),i=s,r=(o("efc7"),o("2877")),a=Object(r["a"])(i,n,c,!1,null,"78645875",null);t["default"]=a.exports},efc7:function(e,t,o){"use strict";o("0197")}}]);
//# sourceMappingURL=err404.5431627b.js.map