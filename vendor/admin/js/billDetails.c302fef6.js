(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["billDetails"],{"060a":function(t,a,i){t.exports=i.p+"img/alipay.a10c0d49.png"},"0cac":function(t,a,i){"use strict";i.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"contentpanel transaction-page"},[s("div",{ref:"pageHeader",staticClass:"pagetitle"},[s("div",{staticClass:"left"},[s("div",{staticClass:"title"},[s("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.goto()}}},[t._v(t._s(t.$t("bill.返回到购买套餐")))]),s("span",{staticStyle:{margin:"0 20px"}},[t._v("/")]),s("h2",[t._v(t._s(t.$t("bill.账单详情")))])],1)]),s("div",{staticClass:"right"})]),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[s("el-row",{staticClass:"mg-b-20",attrs:{gutter:15}},[s("el-col",{attrs:{span:24}},[s("el-card",[s("p",[t._v(t._s(t.$t("bill.订单信息")))]),s("el-divider"),s("div",{staticClass:"info"},[s("div",{staticClass:"tit"},[t._v(t._s(t.$t("bill.订单编号：")))]),s("div",{staticClass:"txt"},[t._v(t._s(t.data.payCode))])]),s("div",{staticClass:"info"},[s("div",{staticClass:"tit"},[t._v(t._s(t.$t("bill.购买内容：")))]),s("div",{staticClass:"txt"},[t._v(t._s(t.data.tradeName))])]),s("div",{staticClass:"info"},[s("div",{staticClass:"tit"},[t._v(t._s(t.$t("bill.支付方式：")))]),s("div",{staticClass:"txt"},[s("img",{attrs:{src:i("060a")}})])]),s("div",{staticClass:"amount"},[s("div",{staticClass:"tit"},[t._v(t._s(t.$t("bill.订单金额")))]),s("div",{staticClass:"num"},[t._v("¥"+t._s(t.data.amount))])])],1),s("el-card",{staticClass:"mg-t-30"},[s("div",{staticClass:"qrcode"},[s("iframe",{attrs:{width:"150",height:"150",frameborder:"0",scrolling:"auto",srcdoc:t.data.payurl}})]),s("div",{staticClass:"tips"},[s("div",{staticClass:"icon"},[s("i",{staticClass:"iconfont icon-scan"})]),s("div",{staticClass:"txt"},[t._v(t._s(t.$t("bill.打开手机支付宝扫一扫继续付款")))])])])],1)],1)],1)])},e=[],l=(i("ac1f"),i("00b4"),i("5319"),{data:function(){return{loading:!1,data:{},interval:null}},mounted:function(){this.getDetail()},methods:{goto:function(){this.$route.query.serviceType?this.$router.push({path:"/pricingUp",query:{serviceType:this.$route.query.serviceType}}):this.$router.push({path:"/pricingUp"})},getDetail:function(){var t=this,a=/^sandbox/;this.$route.query.vipType?(this.loading=!0,this.$apiCall("api.Admin.payVip",{vipType:this.$route.query.vipType},(function(i){if(t.loading=!1,"9999"==i.ErrorCode){if(t.data=i.Data.Results,a.test(window.location.host)){var s=t.$router.resolve({name:"Alipay",query:{htmlData:i.Data.Results.payurl}}),e=s.href;window.open(e,"_blank")}t.checkPayStatus()}}))):(this.loading=!0,this.$apiCall("api.Admin.payService",{serviceType:this.$route.query.serviceType,number:this.$route.query.number},(function(i){if(t.loading=!1,"9999"==i.ErrorCode){if(t.data=i.Data.Results,a.test(window.location.host)){var s=t.$router.resolve({name:"Alipay",query:{htmlData:i.Data.Results.payurl}}),e=s.href;window.open(e,"_blank")}t.checkPayStatus()}})))},checkPayStatus:function(){var t=this;this.interval=setInterval((function(){t.$apiCall("api.Admin.checkPayStatus",{code:t.data.payCode},(function(a){"9999"==a.ErrorCode&&2==a.Data.Results&&(clearInterval(t.interval),t.interval=null,t.$elementMessage(t.$t("bill.支付成功，3秒后自动跳到首页"),"success"),setTimeout((function(){t.$root.$children[0].getVipDetail(),t.$router.replace("/dashboard")}),3e3))}))}),2e3)}},beforeDestroy:function(){clearInterval(this.interval),this.interval=null}}),r=l,n=(i("0fe6"),i("2877")),o=Object(n["a"])(r,s,e,!1,null,"94ba739a",null);a["default"]=o.exports},"0fe6":function(t,a,i){"use strict";i("dacf")},dacf:function(t,a,i){}}]);