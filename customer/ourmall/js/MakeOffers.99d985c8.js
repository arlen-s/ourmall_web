(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MakeOffers"],{3420:function(e,t,a){"use strict";a("9855")},9855:function(e,t,a){},d9cc:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel orders-page"},[a("div",{ref:"pageHeader",staticClass:"header-diy"},[a("el-alert",{staticClass:"quo-art",attrs:{title:"Notice",type:"success","show-icon":"",closable:!1}},[[a("p",[e._v("You can find the recent quotations and check offers.")])]],2)],1),a("div",{staticClass:"pagebody"},[a("el-card",[a("el-row",[a("el-col",{ref:"pageTabs",attrs:{span:24}},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"Waiting for vendors respond",name:"WaitingForVendorsRespond"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Waiting for vendors respond "),e.waitNum?a("span",[e._v("("+e._s(e.waitNum)+")")]):e._e()])]),a("el-tab-pane",{attrs:{label:"Vendors responding quotations",name:"VendorsRespondingOffers"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Vendors responding quotations "),e.responsingNum?a("span",[e._v("("+e._s(e.responsingNum)+")")]):e._e()])]),a("el-tab-pane",{attrs:{label:"Archived quotations",name:"ArchivedOffers"}})],1)],1),a("el-col",{attrs:{span:24}},[a("router-view",{key:e.pageKey,ref:"subPage",attrs:{fulfillArr:e.fulfillArr,dateArr:e.dateArr,sortArr:e.sortArr,paymentArr:e.paymentArr,storeList:e.storeList,options:e.options},on:{getNum:e.getNum}})],1)],1)],1)],1)])},r=[],n=(a("4de4"),a("d81d"),a("b0c0"),a("159b"),{data:function(){return{cascaderValue:"",options:[{id:1,label:"Shopify",children:[]},{id:2,label:"Woocommerce",children:[]},{id:3,label:"Lazada",children:[]},{id:4,label:"Shopee",children:[]}],visible:!1,pageKey:(new Date).valueOf(),activeName:"",fulfillArr:{fulfilled:{text:"Fulfilled",type:"info",r:3},unfulfilled:{text:"Unfulfilled",type:"warning",r:1},partial:{text:"Partially Fulfilled",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}},dateArr:{1:"Today",2:"Last 7 days",3:"Last 30 days",4:"Last 90 days",5:"Last 12 months",6:"Custom"},sortArr:{1:"Order number (ascending)",2:"Order number (descending)",3:"Date (oldest first)",4:"Date (newest first)"},paymentArr:{paid:{text:"Paid",type:"info",r:3},partially_refunded:{text:"Partially refunded",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}},storeList:[],readyNum:0,responsingNum:0,waitNum:0}},components:{},watch:{$route:function(){this.activeName=this.$route.name,this.getNum()}},mounted:function(){this.activeName=this.$route.name,this.getNum(),this.getStore()},methods:{quotation:function(){this.visible=!0},getNum:function(){var e=this;this.$apiCall("api.OfferList.getNumbers",{},(function(t){if(9999==t.ErrorCode){var a=t.Data.Results;e.readyNum=a.readyNum,e.responsingNum=a.responsingNum,e.waitNum=a.waitNum}}))},getStore:function(){var e=this;this.$apiCall("api.Invoice.findStores",{authStatus:1},(function(t){9999==t.ErrorCode?(e.storeList=[],t.Data.Results.forEach((function(t){e.storeList.push({shopifyAccountId:t.id,store:t.shopName})})),e.options.map((function(e){t.Data.Results.filter((function(t){t.platform==e.id&&e.children.push({label:t.shopName,value:t.id})}))}))):e.$message({message:t.Message,type:"error"})}))},handleClick:function(e){e.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:e.name})}}}),i=n,o=(a("3420"),a("2877")),l=Object(o["a"])(i,s,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=MakeOffers.99d985c8.js.map