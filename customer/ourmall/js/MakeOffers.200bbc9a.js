(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MakeOffers"],{3420:function(t,e,a){"use strict";a("8245")},8245:function(t,e,a){},d9cc:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel orders-page"},[a("div",{ref:"pageHeader",staticClass:"header-diy"},[a("el-alert",{staticClass:"quo-art",attrs:{title:"Notice",type:"success","show-icon":"",closable:!1}},[[a("p",[t._v(t._s(t.$t("You can find the recent quotations and check offers.")))])]],2)],1),a("div",{staticClass:"pagebody"},[a("el-card",[a("el-row",[a("el-col",{ref:"pageTabs",attrs:{span:24}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("Waiting for vendors respond"),name:"WaitingForVendorsRespond"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Waiting for vendors respond"))+" "),t.waitNum?a("span",[t._v("("+t._s(t.waitNum)+")")]):t._e()])]),a("el-tab-pane",{attrs:{label:t.$t("Vendors responding quotations"),name:"VendorsRespondingOffers"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Vendors responding quotations"))+" "),t.responsingNum?a("span",[t._v("("+t._s(t.responsingNum)+")")]):t._e()])]),a("el-tab-pane",{attrs:{label:t.$t("Archived quotations"),name:"ArchivedOffers"}})],1)],1),a("el-col",{attrs:{span:24}},[a("router-view",{key:t.pageKey,ref:"subPage",attrs:{fulfillArr:t.fulfillArr,dateArr:t.dateArr,sortArr:t.sortArr,paymentArr:t.paymentArr,storeList:t.storeList,options:t.options},on:{getNum:t.getNum}})],1)],1)],1)],1)])},i=[],r=(a("4de4"),a("d81d"),a("b0c0"),a("159b"),{data:function(){return{cascaderValue:"",options:[{id:1,label:"Shopify",children:[]},{id:2,label:"Woocommerce",children:[]},{id:3,label:"Lazada",children:[]},{id:4,label:"Shopee",children:[]}],visible:!1,pageKey:(new Date).valueOf(),activeName:"",fulfillArr:{fulfilled:{text:this.$t("Fulfilled"),type:"info",r:3},unfulfilled:{text:this.$t("Unfulfilled"),type:"warning",r:1},partial:{text:this.$t("Partially Fulfilled"),type:"danger",r:2},refunded:{text:this.$t("Refunded"),type:"info",r:3}},dateArr:{1:this.$t("Today"),2:this.$t("Last 7 days"),3:this.$t("Last 30 days"),4:this.$t("Last 90 days"),5:this.$t("Last 12 months"),6:this.$t("Custom")},sortArr:{1:this.$t("Order number (ascending)"),2:this.$t("Order number (descending)"),3:this.$t("Date (oldest first)"),4:this.$t("Date (newest first)")},paymentArr:{paid:{text:"Paid",type:"info",r:3},partially_refunded:{text:this.$t("Partially refunded"),type:"danger",r:2},refunded:{text:this.$t("Refunded"),type:"info",r:3}},storeList:[],readyNum:0,responsingNum:0,waitNum:0}},components:{},watch:{$route:function(){this.activeName=this.$route.name,this.getNum()}},mounted:function(){this.activeName=this.$route.name,this.getNum(),this.getStore()},methods:{quotation:function(){this.visible=!0},getNum:function(){var t=this;this.$apiCall("api.OfferList.getNumbers",{},(function(e){if(9999==e.ErrorCode){var a=e.Data.Results;t.readyNum=a.readyNum,t.responsingNum=a.responsingNum,t.waitNum=a.waitNum}}))},getStore:function(){var t=this;this.$apiCall("api.Invoice.findStores",{authStatus:1},(function(e){9999==e.ErrorCode?(t.storeList=[],e.Data.Results.forEach((function(e){t.storeList.push({shopifyAccountId:e.id,store:e.shopName})})),t.options.map((function(t){e.Data.Results.filter((function(e){e.platform==t.id&&t.children.push({label:e.shopName,value:e.id})}))}))):t.$message({message:e.Message,type:"error"})}))},handleClick:function(t){t.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:t.name})}}}),n=r,o=(a("3420"),a("2877")),l=Object(o["a"])(n,s,i,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=MakeOffers.200bbc9a.js.map