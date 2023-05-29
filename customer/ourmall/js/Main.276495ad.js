(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Main"],{1490:function(t,e,a){},1499:function(t,e,a){"use strict";a("489c")},"489c":function(t,e,a){},"4c5a":function(t,e,a){},"610e":function(t,e,a){"use strict";a("4c5a")},"64e9":function(t,e,a){"use strict";a("1490")},"691e":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel orders-page"},[a("div",{ref:"pageHeader",staticClass:"header-diy"},[a("div",{staticClass:"pagetitle"},[t._m(0),a("div",{staticClass:"right"},[/AllOrders|WaitingForAllocated|WaitingForSourcing/.test(t.$route.name)?["WaitingForSourcing"!=t.$route.name?a("el-button",{attrs:{type:"primary",size:"medium",icon:"fa fa-download"},on:{click:t.openExportDialog}},[t._v(" "+t._s(t.$t("Export"))+" ")]):t._e(),t.updateTime&&t.updateTime>t.now?[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"The update process has started, it will take a while to finish.",placement:"bottom"}},[a("el-button",{staticStyle:{color:"#FFFFFF","background-color":"#aeb5e2","border-color":"#aeb5e2"},attrs:{type:"primary",size:"medium",icon:"el-icon-refresh"}},[t._v(" "+t._s(t.$t("Update Order"))+" ")])],1)]:[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Use this button to update your Order List if missing orders.The process may take a while to finish.",placement:"bottom"}},[a("el-button",{attrs:{icon:"el-icon-refresh",disabled:!!(t.updateTime&&t.updateTime>t.now),type:"primary",size:"medium",loading:t.updateOrderLoading},on:{click:t.updateOrder}},[t._v(" "+t._s(t.$t("Update Order"))+" ")])],1)]]:t._e()],2)]),t.pendingPay?a("el-alert",{staticClass:"order-alert",attrs:{title:"Notice",type:"warning","show-icon":"",closable:!1}},[[a("p",[t._v(t._s(t.$t("You have"))+" "),a("a",{staticClass:"mian-alert-a",on:{click:t.handlePendingPay}},[t._v(" "+t._s(t.pendingPay)+" "+t._s(t.$t("purchase orders"))+" ")]),t._v(" "+t._s(t.$t("NEED to finish payment")))])]],2):t._e()],1),a("div",{staticClass:"pagebody headTab"},[a("el-card",[a("el-row",[a("el-col",{ref:"pageTabs",attrs:{span:24}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("All orders"),name:"AllOrders"}}),a("el-tab-pane",{attrs:{label:t.$t("Waiting for allocated"),name:"WaitingForAllocated"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Waiting for allocated"))+" "),t.allocateCnt?a("span",{staticClass:" tx-warning"},[t._v("("+t._s(t.allocateCnt)+")")]):t._e()])]),a("el-tab-pane",{attrs:{label:"Waiting for sourcing",name:"WaitingForSourcing"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Waiting for sourcing"))+" "),t.sourcingCnt?a("span",{staticClass:" tx-warning"},[t._v("("+t._s(t.sourcingCnt)+")")]):t._e()])]),a("el-tab-pane",{attrs:{label:"Orders processing",name:"OrderProcessing"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Orders processing"))+" "),t.processingCnt?a("span",{staticClass:" tx-success"},[t._v("("+t._s(t.processingCnt)+")")]):t._e()])]),a("el-tab-pane",{attrs:{label:"Delivered",name:"Delivered"}}),a("el-tab-pane",{attrs:{label:"Abnormal order",name:"AbnormalOrder"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(" "+t._s(t.$t("Abnormal order"))+" "),t.abnormalCnt?a("span",{staticClass:" tx-danger"},[t._v("("+t._s(t.abnormalCnt)+")")]):t._e()])])],1)],1),a("div",{staticClass:"btn-hide-group"},["WaitingForAllocated"==t.$route.name?a("el-button",{attrs:{type:"primary quoteOrder",size:"small"},on:{click:t.makeAnOffer}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Please select at least one order and quote for your order",placement:"top"}},[a("i",{staticClass:"el-icon-info"})]),t._v(" "+t._s(t.$t("Quote for Orders"))+" ")],1):t._e(),a("el-button",{attrs:{type:"primary quoteProduct",size:"small"},on:{click:function(e){return t.quotation()}}},[t._v(" "+t._s(t.$t("Quote for Product"))+" ")]),a("el-button",{attrs:{type:"primary recent",size:"small"},on:{click:t.openRecent}},[t._v(" "+t._s(t.$t("Recent Quotations"))+" ")])],1),a("div",{staticClass:"btn-hide-dropdown recent"},["WaitingForAllocated"==t.$route.name?a("el-dropdown",{attrs:{"split-button":"",type:"primary",size:"medium"},on:{click:t.makeAnOffer,command:t.handleCommand}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Please select at least one order and quote for your order",placement:"top"}},[a("i",{staticClass:"el-icon-info"})]),t._v(" "+t._s(t.$t("Quote for Orders"))+" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"quoteForProduct"}},[t._v(t._s(t.$t("Quote for Product")))]),a("el-dropdown-item",{attrs:{command:"recentQuotations"}},[t._v(t._s(t.$t("Recent Quotations")))])],1)],1):a("el-dropdown",{attrs:{"split-button":"",type:"primary",size:"medium"},on:{click:function(e){return t.quotation()},command:t.handleCommand}},[t._v(" "+t._s(t.$t("Quote for Product"))+" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"recentQuotations"}},[t._v(t._s(t.$t("Recent Quotations")))])],1)],1)],1),a("el-col",{attrs:{span:24}},[a("router-view",{key:t.pageKey,ref:"subPage",attrs:{fulfillArr:t.fulfillArr,dateArr:t.dateArr},on:{getTableHeight:t.getTableHeight,getNum:t.getNum}})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"Export orders",visible:t.exportDialog.isShow,width:"620px","close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.exportDialog,"isShow",e)}}},[a("el-divider"),a("div",{staticStyle:{padding:"20px"}},[a("p",{staticClass:"mg-b-10"},[t._v(t._s(t.$t("Export to"))+" "+t._s(t.$store.state.userInfo.email))]),a("el-radio-group",{staticStyle:{display:"flex","flex-direction":"column","padding-left":"15px"},model:{value:t.exportDialog.status,callback:function(e){t.$set(t.exportDialog,"status",e)},expression:"exportDialog.status"}},[a("el-radio",{attrs:{label:"1"}},[t._v(t._s(t.$t("All orders")))]),a("el-radio",{attrs:{label:"3",disabled:!Number(t.exportDialog.totalCount)}},[t._v(t._s(t.exportDialog.totalCount)+" "+t._s(t.$t("orders matching your search")))])],1)],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.exportDialog.isShow=!1}}},[t._v(t._s(t.$t("Cancel")))]),a("el-button",{attrs:{size:"small",type:"primary",disabled:!t.exportDialog.status,loading:t.exportDialog.loading},on:{click:t.exportOrders}},[t._v(t._s(t.$t("Export orders")))])],1)],1),a("el-dialog",{attrs:{title:"How to process your orders?",visible:t.dialogHowToShopify.isShow,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.dialogHowToShopify,"isShow",e)}}},[a("el-divider"),a("div",{staticStyle:{padding:"20px"}},[a("p",{staticClass:"table-wrap",staticStyle:{"margin-bottom":"15px"}},[t._v(" You have "),a("span",{staticClass:" mg-r-15 tx-danger"},[t._v(t._s(t.allocateCnt))]),a("span",{staticClass:"el-tag el-tag--info el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg3"}),t._v(" Paid ")]),t._v(" + "),a("span",[a("span",{staticClass:"el-tag el-tag--warning el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg1"}),t._v(" Unfulfilled ")])]),t._v(" / "),a("span",[a("span",{staticClass:"shopfiy-status el-tag el-tag--danger el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg2"}),t._v(" Partially Fulfilled ")])]),t._v(" orders can be process, what do you want to do now? ")]),a("div",{staticClass:"how-to-process-btn-wrap"},[a("div",{on:{click:function(e){return t.goto("ReadyForMakeOffer")}}},[a("i",{staticClass:"icon iconfont icon-offer"}),a("div",[t._v(" Need new quotation for my orders "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Over 30000+ vendors waiting for offer you price",placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{on:{click:function(e){return t.goto("WaitingForAllocated")}}},[a("i",{staticClass:"icon iconfont icon-shunt"}),a("div",[t._v(" Allocate my exist vendors "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"If you already have cooperative vendors, you can allocate orders to them",placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{on:{click:function(e){return t.goto("WaitingForAllocated")}}},[a("i",{staticClass:"icon iconfont icon-check"}),a("div",[t._v(" Just check my orders ")])])])])],1),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"In order to keep you informed of the update of the order, we suggest you verify the email",visible:t.verifyEmail,"show-close":!1,width:"760px"},on:{"update:visible":function(e){t.verifyEmail=e}}},[a("ul",{staticClass:"verify"},[a("li",{staticStyle:{display:"flex","align-items":"center"}},[0==t.changeStart?a("label",{staticStyle:{width:"80px","font-weight":"700"}},[t._v("Email:")]):t._e(),0==t.changeStart?a("span",{staticStyle:{"margin-top":"-4px"}},[t._v(" "+t._s(t.form.email)+" "),a("el-link",{staticClass:"mg-l-10",staticStyle:{"margin-bottom":"3px"},attrs:{type:"primary",disabled:!t.canChange},on:{click:t.changeOpen}},[t.form.email?a("span",[t._v(t._s(t.$t("Change")))]):a("span",[t._v(t._s(t.$t("Add")))])])],1):a("el-input",{attrs:{placeholder:"Email","auto-complete":"off",disabled:t.time>0},model:{value:t.userEmail,callback:function(e){t.userEmail=e},expression:"userEmail"}})],1),t.failTx?a("li",{staticClass:"tx-danger"},[t._v(t._s(t.failTx))]):t._e(),a("li",[a("vue-simple-verify",{ref:"verify",attrs:{width:380,tips:"Hold down the slider and drag to the right",successTips:"Validation passed"},on:{success:t.successVerify}})],1),a("li",{staticStyle:{display:"flex"}},[a("el-input",{staticStyle:{flex:"1",width:"250px"},attrs:{placeholder:"Captcha"},model:{value:t.authcode,callback:function(e){t.authcode=e},expression:"authcode"}}),t.sendMsgDisabled?t._e():a("el-link",{staticClass:"mg-l-10",attrs:{underline:!1,type:"primary",disabled:!t.canSendAuthCode},on:{click:t.sendAuthCode}},[t._v(t._s(t.$t("Get captcha")))]),t.sendMsgDisabled?a("el-link",{staticClass:"mg-l-10",attrs:{underline:!1,type:"primary",disabled:!t.canSendAuthCode},on:{click:t.sendAuthCode}},[t._v(" "+t._s(t.$t("try again in"))+" "+t._s(t.time)+" "+t._s(t.$t("seconds"))+" ")]):t._e()],1)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveEmail}},[t._v(t._s(t.$t("Confirm")))]),a("el-button",{on:{click:function(e){t.verifyEmail=!1}}},[t._v(t._s(t.$t("Discard")))])],1)]),a("Quotation",{attrs:{visible:t.visible},on:{"update:visible":function(e){t.visible=e}}})],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-shopify"}),a("h2",[t._v("Orders")])])])}],o=(a("99af"),a("b0c0"),a("a9e3"),a("ea9d")),r={data:function(){return{visible:!1,form:{email:""},tdShow:!1,canChange:!0,verifyEmail:!1,changeStart:!1,sendMsgDisabled:!1,canSaveEdit:!1,canSendAuthCode:!1,canSendAuthCodeAgain:!1,time:0,userEmail:"",authcode:"",failTx:"",pageKey:(new Date).valueOf(),pendingPay:0,activeName:"",reSizeTime:0,allocateCnt:0,sourcingCnt:0,processingCnt:0,abnormalCnt:0,fulfillArr:{fulfilled:{text:"Fulfilled",type:"info",r:3},unfulfilled:{text:"Unfulfilled",type:"warning",r:1},partial:{text:"Partially Fulfilled",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}},dateArr:{1:"Today",2:"Last 7 days",3:"Last 30 days",4:"Last 90 days",5:"Last 12 months",6:"Custom"},updateOrderLoading:!1,cnow:0,now:Date.parse(new Date)/1e3-this.$store.state.userInfo.timeDiff,updateTime:localStorage.getItem("c_orders-updateTime")?Number(localStorage.getItem("c_orders-updateTime")):0,exportDialog:{isShow:!1,loading:!1,status:"",selectData:[],totalCount:0},exportDialogDefault:"{}",dialogHowToShopify:{isShow:!1}}},components:{Quotation:o["a"]},mounted:function(){var t=this;this.showPopup(),this.exportDialogDefault=JSON.stringify(this.exportDialog),this.activeName=this.$route.name,this.cnow=setInterval((function(){t.now=Date.parse(new Date)/1e3-t.$store.state.userInfo.timeDiff}),1e3),this.getNum(void 0,"first")},watch:{$route:function(){this.activeName=this.$route.name,this.getNum()}},methods:{handleCommand:function(t){switch(t){case"quoteForProduct":this.quotation();break;case"recentQuotations":this.openRecent();break}},makeAnOffer:function(){this.$refs.subPage.makeAnOffer()},quotation:function(){this.$Burying({object:"14001"}),this.visible=!0},openRecent:function(){this.$router.push("/make-offers")},showPopup:function(){var t=document.cookie;if(-1==t.indexOf("tdShow=1")){var e=new Date;e.setHours(e.getHours()+24),document.cookie="tdShow=1;expires="+e.toGMTString(),this.$nextTick((function(){"2"==JSON.parse(localStorage.getItem("c_ourMallUserInfo")).verifyEmail&&this.verifyEmailOpen(),this.tdShow=!0}))}else this.$nextTick((function(){this.tdShow=!1}))},saveEmail:function(){var t=this;this.$apiCall("api.User.checkEmailToken",{email:1==this.changeStart?this.userEmail:this.form.email,token:this.authcode},(function(e){if("9999"==e.ErrorCode){var a=JSON.parse(JSON.stringify(t.$store.state.userInfo));a.email=1==t.changeStart?t.userEmail:t.form.email,localStorage.setItem("c_ourMallUserInfo",JSON.stringify(a)),t.$elementMessage("User Email modified successfully","success"),t.verifyEmail=!1}else t.$elementMessage(e.Message,"error")}))},changeOpen:function(){this.changeStart=!0,this.form.email=""},isCEmail:function(t){return!!t&&/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(t)},successVerify:function(){this.userEmail&&this.isCEmail(this.userEmail)||this.form.email&&this.isCEmail(this.form.email)?(this.canSendAuthCode=!0,this.econfirmSuccess=!0,this.canChange=!1,this.failTx="",this.sendAuthCode()):(this.$refs.verify.reset(),this.canSendAuthCode=!1,this.econfirmSuccess=!1,this.failTx=this.$t("Please fill in the correct Email address"))},sendAuthCode:function(){var t=this;this.$showLoading();var e=this;e.sendMsgDisabled=!0,e.canSendAuthCode=!1,e.canSendAuthCodeAgain=!0,this.$apiCall("api.User.checkEmail",{email:1==e.changeStart?e.userEmail:e.form.email},(function(a){if(t.$hideLoading(),"9999"==a.ErrorCode){t.$message({type:"success",message:t.$t("The captcha was sent successfully")}),e.time=60;var i=window.setInterval((function(){e.time--<=0&&(e.time=0,e.sendMsgDisabled=!1,e.canSendAuthCode=!0,e.canSendAuthCodeAgain=!1,window.clearInterval(i))}),1e3)}else t.$message({message:a.Message,type:"error"}),e.sendMsgDisabled=!1,e.canSendAuthCode=!0,e.canSendAuthCodeAgain=!1}))},verifyEmailOpen:function(){var t=JSON.parse(localStorage.getItem("c_ourMallUserInfo")).email;this.form.email=t,this.verifyEmail=!0},goto:function(t){this.$router.push({name:t}),this.dialogHowToShopify.isShow=!1},handlePendingPay:function(){"OrderProcessing"===this.$route.name&&(this.$refs.subPage.filterParams.status=2,this.$refs.subPage.getItem()),this.$router.push({path:"/Orders-processing",query:{status:2}})},exportOrders:function(){var t=this,e={email:this.$store.state.userInfo.email};if("AllOrders"==this.activeName){e.isAll=1;var a=this.$refs.subPage.filterParams;3==this.exportDialog.status&&(e.accountIds=a.shopifyStore,e.timeFilter=a.timeFilter>=6?"":a.timeFilter,e.dateFrom=a.dateFrom,e.dateTo=a.dateTo,e.fulfillmentStatus=a.fulfillStatus,e.sort=a.sortBy,e.keywords=a.codeName,e.financialStatus=a.financial_status)}if("WaitingForAllocated"==this.activeName){e.waitDispatch=1;var i=this.$refs.subPage.filterParams;3==this.exportDialog.status&&(e.accountIds=i.shopifyStore,e.timeFilter=i.timeFilter>=6?"":i.timeFilter,e.dateFrom=i.dateFrom,e.dateTo=i.dateTo,e.fulfillmentStatus=i.fulfillStatus,e.sort=i.sortBy,e.keywords=i.codeName)}this.exportDialog.loading=!0,this.$apiCall("api.Invoice.exportShopifyOrders",e,(function(e){t.exportDialog.loading=!1,9999==e.ErrorCode?(t.exportDialog.isShow=!1,t.$message({offset:200,duration:0,dangerouslyUseHTMLString:!0,showClose:!0,message:"<strong>".concat($t("Your Orders are exporting</strong><br/>Your export will be delivered by email to"),": ").concat(t.$store.state.userInfo.email,". ").concat($t("<br/>Depending on how many Orders you’re exporting, this could take some time"),"."),type:"success"})):t.$elementMessage(e.Message,"error")}))},openExportDialog:function(){this.exportDialog=JSON.parse(this.exportDialogDefault),this.exportDialog.isShow=!0,this.exportDialog.loading=!1,"AllOrders"!=this.activeName&&"WaitingForAllocated"!=this.activeName||(this.exportDialog.totalCount=this.$refs.subPage.totalCount)},updateOrder:function(){var t=this;this.updateOrderLoading=!0,this.$apiCall("api.ShopifyAccount.getOrderByHand",{},(function(e){t.updateOrderLoading=!1,"9999"==e.ErrorCode?(t.updateTime=e.Data.Results,localStorage.setItem("c_orders-updateTime",e.Data.Results),t.$elementMessage("Update Order Success","success")):t.$elementMessage(e.Message,"error")}))},getNum:function(t,e){var a=this;this.$apiCall("api.Invoice.getOrderCnt",{},(function(i){if("9999"==i.ErrorCode){var s=i.Data.Results,o=setInterval((function(){(!t||(new Date).valueOf()>t+1500)&&(clearInterval(o),a.allocateCnt=Number(s.allocateCnt),a.sourcingCnt=Number(s.sourcingCnt))}),100);a.processingCnt=Number(s.processingCnt),a.abnormalCnt=Number(s.abnormalCnt),"first"==e&&setTimeout((function(){a.allocateCnt&&!Number(a.$store.state.userInfo.vendorCnt)&&(a.dialogHowToShopify.isShow=!0)}),200)}else a.$elementMessage(i.Message,"error")})),this.$apiCall("api.Invoice.findByCustomer",{status:2},(function(t){if("9999"==t.ErrorCode){var e=t.Data.Results;a.pendingPay=e.length}else a.$elementMessage(t.Message,"error")}))},getTableHeight:function(t){var e=this;clearTimeout(this.reSizeTime),this.reSizeTime=setTimeout((function(){var a=e.$root.$children[0].$refs.mainScroll.wrap.offsetHeight-(e.$refs.pageHeader.offsetHeight+e.$refs.pageTabs.$el.offsetHeight+t.$refs.tablefilter.offsetHeight+t.$refs.tableFooter.offsetHeight)-120;"WaitingForAllocated"==e.activeName&&(a+=-10),t.tableHeight=a>200?a:200}),500)},handleClick:function(t){t.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:t.name})}}},l=r,n=(a("1499"),a("64e9"),a("2877")),c=Object(n["a"])(l,i,s,!1,null,"508dab68",null);e["default"]=c.exports},ea9d:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"Request a quotation for products",visible:t.openCardDialog},on:{"update:visible":function(e){t.openCardDialog=e},close:t.closeDialog}},[a("el-divider"),t.imgView?a("div",{staticClass:"proQuotation"},[a("div",{staticClass:"quotationTit"},[t._v("products for quotation")]),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"imgList"},t._l(t.imgList,(function(t){return a("img",{key:t,staticClass:"upload imgItem",attrs:{src:t}})})),0),a("div",{staticClass:"upload",on:{click:t.openForm}},[a("i",{staticClass:"el-icon-plus"})])])]):t._e(),t.isForm?a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"formRole"},[a("div",{staticClass:"quotationTit"},[t._v("Product information")]),a("el-form",{attrs:{model:t.form,"label-position":"left","label-width":"150px"}},[a("el-form-item",{attrs:{label:"Product images:",required:""}},[a("div",{staticClass:"upload",on:{click:t.uploadOpen}},[t.form.imgUrl?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.form.imgUrl,fit:"cover"}}):a("i",{staticClass:"el-icon-plus"})],1)]),a("el-form-item",{attrs:{label:"Details:",required:""}},[a("el-input",{attrs:{placeholder:"Product name / URL / description or anything you can tell us"},model:{value:t.form.details,callback:function(e){t.$set(t.form,"details",e)},expression:"form.details"}})],1),a("el-form-item",{attrs:{label:"Expected price (US$):"}},[a("el-input-number",{attrs:{controls:!1},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}})],1),a("el-form-item",{attrs:{label:"Remarks:"}},[a("el-input",{attrs:{placeholder:"Leave your message that you want to tell "+t.$root.$children[0].pName.a+" Vendors"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),a("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:t.saveQuotation}},[t._v("Save")])],1):t._e(),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("Submit Request")]),a("el-button",{on:{click:t.closeQuotation}},[t._v("Discard")])],1)],1),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(e){return t.Base64(e)}}})],1)},s=[],o=(a("ac1f"),a("466d"),a("1276"),{props:{visible:{type:Boolean,default:!1}},data:function(){return{form:{imgUrl:"",details:"",price:void 0,remark:""},imgView:!1,outerVisible:!1,innerVisible:!1,isForm:!0,loading:!1,dialogVisible:!1,imgList:[],detailsList:[],priceList:[],remarkList:[]}},computed:{openCardDialog:{get:function(){return this.visible},set:function(t){this.$emit("update:visible",t)}}},mounted:function(){},methods:{openForm:function(){var t=this;this.isForm=!0,this.loading=!0,setTimeout((function(){t.loading=!1}),800)},uploadOpen:function(){document.getElementById("imgFile").click()},Base64:function(t){var e=this;if(t.target.value){var a=new FileReader,i=new Image,s="";a.onload=function(t){i.src=t.target.result;var e=t.target.result.match(/data:image\/(.*);base64,.*/);s=e[1]},i.onload=function(a){base64Image({file:t.target,callback:function(t){var a=t.split("base64,").pop();e.uploadImgBase64(a,s)}})},a.readAsDataURL(t.target.files[0])}},uploadImgBase64:function(t,e){var a=this;this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:t,ext:e},(function(t){a.loading=!1,9999==t.ErrorCode?a.form.imgUrl=t.Data.Results.imgUrl:a.$message.error(t.Message)}))},saveQuotation:function(){return""==this.form.imgUrl?(this.$message.error("Please select a picture !"),!1):""==this.form.details?(this.$message.error("Please fill in the details !"),!1):(this.imgView=!0,this.isForm=!1,this.imgList.push(this.form.imgUrl),this.detailsList.push(this.form.details),this.priceList.push(this.form.price),this.remarkList.push(this.form.remark),void(this.form={imgUrl:"",details:"",price:void 0,remark:""}))},closeQuotation:function(){this.openCardDialog=!1,this.form={imgUrl:"",details:"",price:void 0,remark:""},this.imgList=[],this.detailsList=[],this.priceList=[],this.remarkList=[],this.isForm=!0,this.imgView=!1},closeDialog:function(){this.closeQuotation()},submit:function(){for(var t=this,e=[],a=0;a<this.imgList.length;a++)e.push({detail:this.detailsList[a],imgUrl:this.imgList[a],expectPrice:this.priceList[a],remarks:this.remarkList[a]});this.$apiCall("api.OfferList.genOfferProduct",{products:e},(function(e){9999==e.ErrorCode?(t.$message.success("Submit Success !"),t.closeQuotation(),t.$router.push("/Waiting-for-vendors-respond")):t.$message.error(e.Message)}))}},components:{}}),r=o,l=(a("610e"),a("2877")),n=Object(l["a"])(r,i,s,!1,null,"6167711f",null);e["a"]=n.exports}}]);
//# sourceMappingURL=Main.276495ad.js.map