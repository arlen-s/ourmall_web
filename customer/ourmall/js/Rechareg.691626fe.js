(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Rechareg"],{"0257":function(t,e,a){},3748:function(t,e,a){"use strict";a("39e1")},"39e1":function(t,e,a){},9538:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.data.loading,expression:"data.loading"}],attrs:{"close-on-press-escape":!1,"close-on-click-modal":!1,title:"Check Out",visible:t.data.isShow,width:"500px"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)},opened:t.opened}},[a("el-divider"),a("div",{staticClass:"card-msg"},[a("el-alert",{attrs:{title:"Pay securely using your credit card.",type:"info",closable:!1}})],1),a("form",{attrs:{id:"payment-form",method:"POST",action:"https://merchant.com/charge-card"}},[a("div",{staticClass:"one-liner"},[a("div",{staticClass:"card-label"},[a("div",[a("div",[t._v("Card Number "),a("span",[t._v("*")])])]),a("div",{staticClass:"right"},[a("div",{staticClass:" mg-r-5"},[t._v("Expiration"),a("span",[t._v("*")])]),a("div",[t._v("CVV"),a("span",[t._v("*")])])])]),a("div",{staticClass:"card-frame"}),a("div",{staticClass:"pay-btn-wrap"},[a("div",{staticClass:"secure"}),a("button",{attrs:{id:"pay-button",disabled:""}},[t._v(" PAY ")])])]),a("p",{staticClass:"success-payment-message"})])],1)],1)},i=[],o={props:["data"],data:function(){return{}},mounted:function(){},methods:{opened:function(){this.getCheckoutKey()},getCheckoutKey:function(){var t=this;this.data.loading=!0,this.$apiCall("api.User.getCheckoutKey",{},(function(e){t.data.loading=!1,"9999"==e.ErrorCode?(t.data.token=e.Data.Results,t.$nextTick((function(){var e=document.getElementById("pay-button"),a=document.getElementById("payment-form");Frames.init(t.data.token),Frames.addEventHandler(Frames.Events.CARD_VALIDATION_CHANGED,(function(t){console.log("CARD_VALIDATION_CHANGED: %o",t),e.disabled=!Frames.isCardValid()})),Frames.addEventHandler(Frames.Events.CARD_TOKENIZED,(function(e){t.$emit("payCheckOut",e.token),Frames.removeEventHandler(Frames.Events.CARD_TOKENIZED,(function(t){})),console.log(e.token)})),a.addEventListener("submit",(function(t){t.preventDefault(),Frames.submitCard()}))}))):t.$elementMessage(e.Message,"error")}))}}},c=o,n=(a("a94d"),a("2877")),l=Object(n["a"])(c,s,i,!1,null,"37771618",null);e["a"]=l.exports},9651:function(t,e,a){"use strict";a("b27e")},a15b:function(t,e,a){"use strict";var s=a("23e7"),i=a("44ad"),o=a("fc6a"),c=a("a640"),n=[].join,l=i!=Object,r=c("join",",");s({target:"Array",proto:!0,forced:l||!r},{join:function(t){return n.call(o(this),void 0===t?",":t)}})},a94d:function(t,e,a){"use strict";a("0257")},b1de:function(t,e,a){},b27e:function(t,e,a){},cd4c:function(t,e,a){"use strict";a("b1de")},d218:function(t,e,a){},f269:function(t,e,a){"use strict";a("d218")},fae6:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"contentpanel recharge-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[t._m(0),a("div",{staticClass:"right"},[a("el-link",{attrs:{type:"primary"},on:{click:t.gotoPayRecord}},[t._v("Payment Record")])],1)]),a("div",{staticClass:"pagebody mg-b-20"},[a("el-card",[a("div",{staticClass:"pay-title"},[t._v("Choose your payment method")]),a("SelectPayMethod",{staticStyle:{"margin-bottom":"50px"},attrs:{payMethodAcitve:t.payMethodAcitve},on:{selectPay:t.selectPay}}),3==t.payMethodAcitve?a("div",{staticClass:" free",on:{click:t.tawk}}):[a("div",{staticClass:"pay-title"},[t._v("Choose your recharge package")]),a("ChooseRechargePackage",{staticStyle:{"margin-bottom":"35px"},attrs:{items:t.packages,vipType:t.vipType},on:{choose:t.choosePackage}}),a("div",{staticClass:"bottom-action"},[a("div",{staticClass:"checkBox",staticStyle:{"margin-bottom":"15px"}},[a("el-checkbox",{model:{value:t.check1,callback:function(e){t.check1=e},expression:"check1"}}),t._v(" I agree the "),a("el-link",{on:{click:function(e){return t.gotoHelp("terms")}}},[t._v("Terms of use")]),t._v(" and "),a("el-link",{on:{click:function(e){return t.gotoHelp("refund")}}},[t._v("Refund Policy")])],1),a("el-button",{attrs:{disabled:0==t.check1||0==t.check2,loading:t.payLoading,type:"primary"},on:{click:t.payNow}},[t._v("Pay NOW")])],1)]],2)],1),a("DialogPayStatusAlert",{attrs:{data:t.dialogPayAlert},on:{closePayPage:t.closePayPage}}),t.isShowMask?a("div",{staticClass:"mask",on:{click:function(e){t.isShowMask=!1}}}):t._e(),a("checkout",{attrs:{data:t.dialogCheckOut},on:{payCheckOut:t.payCheckOut}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"fa fa-usd",attrs:{"aria-hidden":"true"}}),a("h2",[t._v("Package")])])])}],o=(a("d81d"),a("b64b"),a("159b"),a("5530")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"select-pay-method"},[a("a",{staticClass:"pay",class:{active:3==t.payMethodAcitve},attrs:{href:"javascript:;"},on:{click:function(e){return t.selectPay(3)}}},[a("i",{staticClass:"el-icon-success"})]),a("a",{staticClass:"pay paypay",class:{active:1==t.payMethodAcitve},attrs:{href:"javascript:;"},on:{click:function(e){return t.selectPay(1)}}},[a("i",{staticClass:"el-icon-success"})]),a("a",{staticClass:"pay credit-card",class:{active:4==t.payMethodAcitve},attrs:{href:"javascript:;"},on:{click:function(e){return t.selectPay(4)}}},[a("i",{staticClass:"el-icon-success"})])])},n=[],l={props:["payMethodAcitve"],methods:{selectPay:function(t){this.$emit("selectPay",t)}}},r=l,d=(a("f269"),a("2877")),u=Object(d["a"])(r,c,n,!1,null,"1b39a0ef",null),p=u.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"pay-package"},t._l(t.items,(function(e){return a("li",{key:e.id,class:{active:e.id==t.vipType},on:{click:function(a){return t.choose(e)}}},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.id==t.vipType,expression:"item.id == vipType"}],staticClass:"el-icon-success"}),a("div",{staticClass:"num"},[t._v(t._s(t._f("toThousands")(e.count)))]),a("div",{staticClass:"unit"},[t._v("Orders")]),a("div",{staticClass:"price"},[t._v(" US$ "),a("span",[t._v(t._s(t._f("toThousands")(e.price)))])]),a("div",{staticClass:"msg"},[e.first?a("div",[t._v(" Extra +"),a("b",[t._v(t._s(e.rewards))]),t._v(" orders for first recharge ")]):a("div",[t._v(" US$ "),a("b",[t._v(t._s(e.per))]),t._v(" per order ")])])])})),0)},v=[],g=(a("a15b"),a("d3b7"),a("ac1f"),a("25f0"),a("1276"),{props:["items","vipType"],filters:{toThousands:function(t){var e=[],a=0;t=(t||0).toString().split("");for(var s=t.length-1;s>=0;s--)a++,e.unshift(t[s]),a%3||0==s||e.unshift(",");return e.join("")}},methods:{choose:function(t){this.$emit("choose",t.id)}}}),y=g,f=(a("9651"),Object(d["a"])(y,h,v,!1,null,"4e086b83",null)),m=f.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.data.isShow,width:"600px","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,title:"Pay Package"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[a("el-divider"),a("div",{staticClass:"body-wrap"},[t.data.payItem?a("el-card",{staticClass:"pay-card"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("span",{staticClass:"title"},[t._v("Amount")]),a("span",{staticClass:"val success"},[t._v("US$ "+t._s(t.data.payItem.price))])]),a("el-col",{attrs:{span:12}},[a("span",{staticClass:" title"},[t._v("Orders")]),a("span",{staticClass:" val"},[t._v(t._s(t.data.payItem.count))])])],1)],1):t._e(),1==t.data.status?a("el-row",{staticClass:"pay-loading",attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"loading"},[a("i",{staticClass:"el-icon-loading"})]),a("div",{staticClass:"tx t1"},[t._v(" Payment Processing ")]),a("div",{staticClass:"tx t2"},[t._v(" Please leave window open ")])])],1):t._e(),1!=t.data.status?a("el-row",{staticClass:"pay-status",attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"status-icon"},[2==t.data.status?a("i",{staticClass:"el-icon-success"}):t._e(),3==t.data.status?a("i",{staticClass:"el-icon-error"}):t._e()]),2==t.data.status?[a("div",{staticClass:" tx t1"},[t._v(" Charge Submitted ")]),a("div",{staticClass:" tx t2"},[t._v(" Your payment has been successfully scheduled for processing. You will receive a confirmation email within 5 business days once the payment has been processed. ")])]:t._e(),3==t.data.status?[a("div",{staticClass:" tx t3"},[t._v(" "+t._s(t.data.errorMsg)+" ")])]:t._e()],2)],1):t._e()],1),a("div",{staticClass:"footer"},[a("i",{staticClass:"el-icon-lock"}),t._v(" Secure Payment "),1!=t.data.status?a("el-button",{staticClass:"btn-done",attrs:{loading:t.doneLoading,type:"primary",size:"small"},on:{click:t.resetPage}},[t._v("Done")]):t._e()],1)],1)},k=[],_={props:["data"],data:function(){return{doneLoading:!1}},methods:{resetPage:function(){this.doneLoading=!0,this.$emit("closePayPage"),this.$apiCall("api.User.checkLoginStatus",{},(function(t){localStorage.setItem("c_apiUserToken",t.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",t.Data.Results.id),localStorage.setItem("c_userInfo",JSON.stringify(t.Data.Results)),location.reload()}))}}},P=_,b=(a("cd4c"),Object(d["a"])(P,C,k,!1,null,"48a85b25",null)),w=b.exports,S=a("9538"),$={data:function(){return{check1:!0,check2:!0,loading:!1,payLoading:!1,packages:[],vipType:"",newWin:null,payTime:0,dialogPayAlert:{isShow:!1,errorMsg:"",payItem:null,status:1},payMethodAcitve:1,isShowMask:!1,dialogCheckOut:{isShow:!1,loading:!1,packages:null,token:""},dialogCheckOutDefault:"{}"}},components:{SelectPayMethod:p,ChooseRechargePackage:m,DialogPayStatusAlert:w,checkout:S["a"]},mounted:function(){this.dialogCheckOutDefault=JSON.stringify(this.dialogCheckOut),this.check1=this.check2=!0,this.getPackage(),this.$store.state.userInfo&&(this.payMethodAcitve="0"==this.$store.state.userInfo.timeLastPaid?3:1)},beforeDestroy:function(){},watch:{"$store.state.userInfo":function(){this.payMethodAcitve="0"==this.$store.state.userInfo.timeLastPaid?3:1}},methods:{payCheckOut:function(t){var e=this;this.dialogCheckOut.loading=!0,this.newWin=window.open(("/my"==this.$root.$children[0].baseUrl?"/my":"")+"/blank.html","pay"),this.dialogPayAlert.isShow=!0,this.packages.forEach((function(t){t.id==e.vipType&&(e.dialogPayAlert.payItem=t)})),this.$apiCall("api.User.goToPayByCustomer",{vipType:this.vipType,paymentType:2,token:t},(function(t){e.dialogCheckOut.loading=!1,"9999"==t.ErrorCode&&t.Data.Results?(e.newWin.location=t.Data.Results,e.payTime=setInterval((function(){e.getPayStatus()}),2e3)):(e.dialogPayAlert.isShow=!1,e.dialogCheckOut.isShow=!1,e.$elementMessage("9999"==t.ErrorCode?"fail":t.Message,"error"),e.newWin.close())}))},openDialogCheckOut:function(){var t=this;this.dialogCheckOut=JSON.parse(this.dialogCheckOutDefault),this.dialogCheckOut.isShow=!0,this.packages.forEach((function(e){e.id==t.vipType&&(t.dialogCheckOut.packages=Object(o["a"])({},e))}))},gotoHelp:function(t){var e=this.$router.resolve({name:t});window.open(e.href,"_blank"),this.check1=this.check2=!0},gotoPayRecord:function(){this.$router.push({name:"payList"})},tawk:function(){this.$root.$children[0].$refs["chatBtn"].openChatWin()},selectPay:function(t){this.payMethodAcitve=t},getPayStatus:function(){var t=this;this.$apiCall("api.User.getPayStatusByCustomer",{},(function(e){if("9999"==e.ErrorCode){var a=e.Data.Results.status;1!=a&&clearInterval(t.payTime),2==a?(t.dialogPayAlert.status=2,t.closePayPage(),t.$apiCall("api.User.checkLoginStatus",{},(function(t){localStorage.setItem("c_apiUserToken",t.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",t.Data.Results.id),localStorage.setItem("c_userInfo",JSON.stringify(t.Data.Results))}))):3==a&&(t.dialogPayAlert.status=3,t.dialogPayAlert.msg=e.Data.Results.message,t.$elementMessage(e.Data.Results.message,"error"),t.closePayPage())}else t.dialogPayAlert.msg=e.Message,t.$elementMessage(e.Message,"error"),clearInterval(t.payTime)}))},payNow:function(){var t=this;4!=this.payMethodAcitve?(this.newWin=window.open(("/my"==this.$root.$children[0].baseUrl?"/my":"")+"/blank.html","pay"),this.dialogPayAlert.isShow=!0,this.packages.forEach((function(e){e.id==t.vipType&&(t.dialogPayAlert.payItem=e)})),this.payLoading=!0,this.$apiCall("api.User.goToPayByCustomer",{vipType:this.vipType,paymentType:this.payMethodAcitve},(function(e){t.payLoading=!1,"9999"==e.ErrorCode?(t.newWin.location=e.Data.Results,t.payTime=setInterval((function(){t.getPayStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))):this.openDialogCheckOut()},choosePackage:function(t){this.vipType=t},getPackage:function(){var t=this;this.loading=!0,this.$apiCall("api.User.getCustomerVip",{},(function(e){if(t.loading=!1,"9999"==e.ErrorCode){var a=e.Data.Results;t.packages=Object.keys(a.vip).map((function(t){return a.vip[t].id=t,a.vip[t]})),t.vipType=t.packages[0].id}else t.$elementMessage(e.Message,"error")}))},closePayPage:function(){this.newWin.close(),clearInterval(this.payTime)}}},T=$,A=(a("3748"),Object(d["a"])(T,s,i,!1,null,"9f5ea480",null));e["default"]=A.exports}}]);