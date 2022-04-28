(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Main"],{1499:function(e,t,a){"use strict";a("489c")},"489c":function(e,t,a){},"4c5a":function(e,t,a){},"610e":function(e,t,a){"use strict";a("4c5a")},"691e":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentpanel orders-page"},[a("div",{ref:"pageHeader",staticClass:"header-diy"},[a("div",{staticClass:"pagetitle"},[e._m(0),a("div",{staticClass:"right"},[/AllOrders|WaitingForAllocated|WaitingForSourcing/.test(e.$route.name)?["WaitingForSourcing"!=e.$route.name?a("el-button",{attrs:{type:"primary",size:"medium",icon:"fa fa-download"},on:{click:e.openExportDialog}},[e._v(" Export ")]):e._e(),e.updateTime&&e.updateTime>e.now?[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"The update process has started, it will take a while to finish.",placement:"bottom"}},[a("el-button",{staticStyle:{color:"#FFFFFF","background-color":"#aeb5e2","border-color":"#aeb5e2"},attrs:{type:"primary",size:"medium",icon:"el-icon-refresh"}},[e._v(" Update Order ")])],1)]:[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Use this button to update your Order List if missing orders.The process may take a while to finish.",placement:"bottom"}},[a("el-button",{attrs:{icon:"el-icon-refresh",disabled:!!(e.updateTime&&e.updateTime>e.now),type:"primary",size:"medium",loading:e.updateOrderLoading},on:{click:e.updateOrder}},[e._v(" Update Order ")])],1)]]:e._e()],2)]),e.pendingPay?a("el-alert",{staticClass:"order-alert",attrs:{title:"Notice",type:"warning","show-icon":"",closable:!1}},[[a("p",[e._v("You have "),a("a",{staticClass:"mian-alert-a",on:{click:e.handlePendingPay}},[e._v(" "+e._s(e.pendingPay)+" purchase orders ")]),e._v(" NEED to finish payment")])]],2):e._e()],1),a("div",{staticClass:"pagebody headTab"},[a("el-card",[a("el-row",[a("el-col",{ref:"pageTabs",attrs:{span:24}},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"All orders",name:"AllOrders"}}),a("el-tab-pane",{attrs:{label:"Waiting for allocated",name:"WaitingForAllocated"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Waiting for allocated "),e.allocateCnt?a("span",{staticClass:" tx-warning"},[e._v("("+e._s(e.allocateCnt)+")")]):e._e()])]),a("el-tab-pane",{attrs:{label:"Waiting for sourcing",name:"WaitingForSourcing"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Waiting for sourcing "),e.sourcingCnt?a("span",{staticClass:" tx-warning"},[e._v("("+e._s(e.sourcingCnt)+")")]):e._e()])]),a("el-tab-pane",{attrs:{label:"Orders processing",name:"OrderProcessing"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Orders processing "),e.processingCnt?a("span",{staticClass:" tx-success"},[e._v("("+e._s(e.processingCnt)+")")]):e._e()])]),a("el-tab-pane",{attrs:{label:"Delivered",name:"Delivered"}}),a("el-tab-pane",{attrs:{label:"Abnormal order",name:"AbnormalOrder"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Abnormal order "),e.abnormalCnt?a("span",{staticClass:" tx-danger"},[e._v("("+e._s(e.abnormalCnt)+")")]):e._e()])])],1)],1),a("div",{staticClass:"btn-hide-group"},["WaitingForAllocated"==e.$route.name?a("el-button",{attrs:{type:"primary quoteOrder",size:"small"},on:{click:e.makeAnOffer}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Please select at least one order and quote for your order",placement:"top"}},[a("i",{staticClass:"el-icon-info"})]),e._v(" Quote for Orders ")],1):e._e(),a("el-button",{attrs:{type:"primary quoteProduct",size:"small"},on:{click:function(t){return e.quotation()}}},[e._v(" Quote for Product ")]),a("el-button",{attrs:{type:"primary recent",size:"small"},on:{click:e.openRecent}},[e._v(" Recent Quotations ")])],1),a("div",{staticClass:"btn-hide-dropdown recent"},["WaitingForAllocated"==e.$route.name?a("el-dropdown",{attrs:{"split-button":"",type:"primary",size:"medium"},on:{click:e.makeAnOffer,command:e.handleCommand}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Please select at least one order and quote for your order",placement:"top"}},[a("i",{staticClass:"el-icon-info"})]),e._v(" Quote for Orders "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"quoteForProduct"}},[e._v("Quote for Product")]),a("el-dropdown-item",{attrs:{command:"recentQuotations"}},[e._v("Recent Quotations")])],1)],1):a("el-dropdown",{attrs:{"split-button":"",type:"primary",size:"medium"},on:{click:function(t){return e.quotation()},command:e.handleCommand}},[e._v(" Quote for Product "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"recentQuotations"}},[e._v("Recent Quotations")])],1)],1)],1),a("el-col",{attrs:{span:24}},[a("router-view",{key:e.pageKey,ref:"subPage",attrs:{fulfillArr:e.fulfillArr,dateArr:e.dateArr},on:{getTableHeight:e.getTableHeight,getNum:e.getNum}})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"Export orders",visible:e.exportDialog.isShow,width:"620px","close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.exportDialog,"isShow",t)}}},[a("el-divider"),a("div",{staticStyle:{padding:"20px"}},[a("p",{staticClass:"mg-b-10"},[e._v("Export to "+e._s(e.$store.state.userInfo.email))]),a("el-radio-group",{staticStyle:{display:"flex","flex-direction":"column","padding-left":"15px"},model:{value:e.exportDialog.status,callback:function(t){e.$set(e.exportDialog,"status",t)},expression:"exportDialog.status"}},[a("el-radio",{attrs:{label:"1"}},[e._v("All orders")]),a("el-radio",{attrs:{label:"3",disabled:!Number(e.exportDialog.totalCount)}},[e._v(e._s(e.exportDialog.totalCount)+" orders matching your search")])],1)],1),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.exportDialog.isShow=!1}}},[e._v("Cancel")]),a("el-button",{attrs:{size:"small",type:"primary",disabled:!e.exportDialog.status,loading:e.exportDialog.loading},on:{click:e.exportOrders}},[e._v("Export orders")])],1)],1),a("el-dialog",{attrs:{title:"How to process your orders?",visible:e.dialogHowToShopify.isShow,width:"800px","close-on-click-modal":!1},on:{"update:visible":function(t){return e.$set(e.dialogHowToShopify,"isShow",t)}}},[a("el-divider"),a("div",{staticStyle:{padding:"20px"}},[a("p",{staticClass:"table-wrap",staticStyle:{"margin-bottom":"15px"}},[e._v(" You have "),a("span",{staticClass:" mg-r-15 tx-danger"},[e._v(e._s(e.allocateCnt))]),a("span",{staticClass:"el-tag el-tag--info el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg3"}),e._v(" Paid ")]),e._v(" + "),a("span",[a("span",{staticClass:"el-tag el-tag--warning el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg1"}),e._v(" Unfulfilled ")])]),e._v(" / "),a("span",[a("span",{staticClass:"shopfiy-status el-tag el-tag--danger el-tag--small el-tag--light"},[a("span",{staticClass:"-EFlq bg2"}),e._v(" Partially Fulfilled ")])]),e._v(" orders can be process, what do you want to do now? ")]),a("div",{staticClass:"how-to-process-btn-wrap"},[a("div",{on:{click:function(t){return e.goto("ReadyForMakeOffer")}}},[a("i",{staticClass:"icon iconfont icon-offer"}),a("div",[e._v(" Need new quotation for my orders "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Over 30000+ vendors waiting for offer you price",placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{on:{click:function(t){return e.goto("WaitingForAllocated")}}},[a("i",{staticClass:"icon iconfont icon-shunt"}),a("div",[e._v(" Allocate my exist vendors "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"If you already have cooperative vendors, you can allocate orders to them",placement:"top"}},[a("i",{staticClass:"el-icon-question"})])],1)]),a("div",{on:{click:function(t){return e.goto("WaitingForAllocated")}}},[a("i",{staticClass:"icon iconfont icon-check"}),a("div",[e._v(" Just check my orders ")])])])])],1),a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"In order to keep you informed of the update of the order, we suggest you verify the email",visible:e.verifyEmail,"show-close":!1,width:"760px"},on:{"update:visible":function(t){e.verifyEmail=t}}},[a("ul",{staticClass:"verify"},[a("li",{staticStyle:{display:"flex","align-items":"center"}},[0==e.changeStart?a("label",{staticStyle:{width:"80px","font-weight":"700"}},[e._v("Email:")]):e._e(),0==e.changeStart?a("span",{staticStyle:{"margin-top":"-4px"}},[e._v(" "+e._s(e.form.email)+" "),a("el-link",{staticClass:"mg-l-10",staticStyle:{"margin-bottom":"3px"},attrs:{type:"primary",disabled:!e.canChange},on:{click:e.changeOpen}},[e.form.email?a("span",[e._v("Change")]):a("span",[e._v("Add")])])],1):a("el-input",{attrs:{placeholder:"Email","auto-complete":"off",disabled:e.time>0},model:{value:e.userEmail,callback:function(t){e.userEmail=t},expression:"userEmail"}})],1),e.failTx?a("li",{staticClass:"tx-danger"},[e._v(e._s(e.failTx))]):e._e(),a("li",[a("vue-simple-verify",{ref:"verify",attrs:{width:380,tips:"Hold down the slider and drag to the right",successTips:"Validation passed"},on:{success:e.successVerify}})],1),a("li",{staticStyle:{display:"flex"}},[a("el-input",{staticStyle:{flex:"1",width:"250px"},attrs:{placeholder:"Captcha"},model:{value:e.authcode,callback:function(t){e.authcode=t},expression:"authcode"}}),e.sendMsgDisabled?e._e():a("el-link",{staticClass:"mg-l-10",attrs:{underline:!1,type:"primary",disabled:!e.canSendAuthCode},on:{click:e.sendAuthCode}},[e._v("Get captcha")]),e.sendMsgDisabled?a("el-link",{staticClass:"mg-l-10",attrs:{underline:!1,type:"primary",disabled:!e.canSendAuthCode},on:{click:e.sendAuthCode}},[e._v(" try again in "+e._s(e.time)+" seconds ")]):e._e()],1)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveEmail}},[e._v("Confirm")]),a("el-button",{on:{click:function(t){e.verifyEmail=!1}}},[e._v("Discard")])],1)]),a("Quotation",{attrs:{visible:e.visible},on:{"update:visible":function(t){e.visible=t}}})],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-shopify"}),a("h2",[e._v("Orders")])])])}],o=(a("b0c0"),a("a9e3"),a("ea9d")),r={data:function(){return{visible:!1,form:{email:""},tdShow:!1,canChange:!0,verifyEmail:!1,changeStart:!1,sendMsgDisabled:!1,canSaveEdit:!1,canSendAuthCode:!1,canSendAuthCodeAgain:!1,time:0,userEmail:"",authcode:"",failTx:"",pageKey:(new Date).valueOf(),pendingPay:0,activeName:"",reSizeTime:0,allocateCnt:0,sourcingCnt:0,processingCnt:0,abnormalCnt:0,fulfillArr:{fulfilled:{text:"Fulfilled",type:"info",r:3},unfulfilled:{text:"Unfulfilled",type:"warning",r:1},partial:{text:"Partially Fulfilled",type:"danger",r:2},refunded:{text:"Refunded",type:"info",r:3}},dateArr:{1:"Today",2:"Last 7 days",3:"Last 30 days",4:"Last 90 days",5:"Last 12 months",6:"Custom"},updateOrderLoading:!1,cnow:0,now:Date.parse(new Date)/1e3-this.$store.state.userInfo.timeDiff,updateTime:localStorage.getItem("c_orders-updateTime")?Number(localStorage.getItem("c_orders-updateTime")):0,exportDialog:{isShow:!1,loading:!1,status:"",selectData:[],totalCount:0},exportDialogDefault:"{}",dialogHowToShopify:{isShow:!1}}},components:{Quotation:o["a"]},mounted:function(){var e=this;this.showPopup(),this.exportDialogDefault=JSON.stringify(this.exportDialog),this.activeName=this.$route.name,this.cnow=setInterval((function(){e.now=Date.parse(new Date)/1e3-e.$store.state.userInfo.timeDiff}),1e3),this.getNum(void 0,"first")},watch:{$route:function(){this.activeName=this.$route.name,this.getNum()}},methods:{handleCommand:function(e){switch(e){case"quoteForProduct":this.quotation();break;case"recentQuotations":this.openRecent();break}},makeAnOffer:function(){this.$refs.subPage.makeAnOffer()},quotation:function(){this.$Burying({object:"14001"}),this.visible=!0},openRecent:function(){this.$router.push("/make-offers")},showPopup:function(){var e=document.cookie;if(-1==e.indexOf("tdShow=1")){var t=new Date;t.setHours(t.getHours()+24),document.cookie="tdShow=1;expires="+t.toGMTString(),this.$nextTick((function(){"2"==JSON.parse(localStorage.getItem("c_ourMallUserInfo")).verifyEmail&&this.verifyEmailOpen(),this.tdShow=!0}))}else this.$nextTick((function(){this.tdShow=!1}))},saveEmail:function(){var e=this;this.$apiCall("api.User.checkEmailToken",{email:1==this.changeStart?this.userEmail:this.form.email,token:this.authcode},(function(t){if("9999"==t.ErrorCode){var a=JSON.parse(JSON.stringify(e.$store.state.userInfo));a.email=1==e.changeStart?e.userEmail:e.form.email,localStorage.setItem("c_ourMallUserInfo",JSON.stringify(a)),e.$elementMessage("User Email modified successfully","success"),e.verifyEmail=!1}else e.$elementMessage(t.Message,"error")}))},changeOpen:function(){this.changeStart=!0,this.form.email=""},isCEmail:function(e){return!!e&&/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e)},successVerify:function(){this.userEmail&&this.isCEmail(this.userEmail)||this.form.email&&this.isCEmail(this.form.email)?(this.canSendAuthCode=!0,this.econfirmSuccess=!0,this.canChange=!1,this.failTx="",this.sendAuthCode()):(this.$refs.verify.reset(),this.canSendAuthCode=!1,this.econfirmSuccess=!1,this.failTx="Please fill in the correct Email address")},sendAuthCode:function(){var e=this;this.$showLoading();var t=this;t.sendMsgDisabled=!0,t.canSendAuthCode=!1,t.canSendAuthCodeAgain=!0,this.$apiCall("api.User.checkEmail",{email:1==t.changeStart?t.userEmail:t.form.email},(function(a){if(e.$hideLoading(),"9999"==a.ErrorCode){e.$message({type:"success",message:"The captcha was sent successfully"}),t.time=60;var i=window.setInterval((function(){t.time--<=0&&(t.time=0,t.sendMsgDisabled=!1,t.canSendAuthCode=!0,t.canSendAuthCodeAgain=!1,window.clearInterval(i))}),1e3)}else e.$message({message:a.Message,type:"error"}),t.sendMsgDisabled=!1,t.canSendAuthCode=!0,t.canSendAuthCodeAgain=!1}))},verifyEmailOpen:function(){var e=JSON.parse(localStorage.getItem("c_ourMallUserInfo")).email;this.form.email=e,this.verifyEmail=!0},goto:function(e){this.$router.push({name:e}),this.dialogHowToShopify.isShow=!1},handlePendingPay:function(){"OrderProcessing"===this.$route.name&&(this.$refs.subPage.filterParams.status=2,this.$refs.subPage.getItem()),this.$router.push({path:"/Orders-processing",query:{status:2}})},exportOrders:function(){var e=this,t={email:this.$store.state.userInfo.email};if("AllOrders"==this.activeName){t.isAll=1;var a=this.$refs.subPage.filterParams;3==this.exportDialog.status&&(t.accountIds=a.shopifyStore,t.timeFilter=a.timeFilter>=6?"":a.timeFilter,t.dateFrom=a.dateFrom,t.dateTo=a.dateTo,t.fulfillmentStatus=a.fulfillStatus,t.sort=a.sortBy,t.keywords=a.codeName,t.financialStatus=a.financial_status)}if("WaitingForAllocated"==this.activeName){t.waitDispatch=1;var i=this.$refs.subPage.filterParams;3==this.exportDialog.status&&(t.accountIds=i.shopifyStore,t.timeFilter=i.timeFilter>=6?"":i.timeFilter,t.dateFrom=i.dateFrom,t.dateTo=i.dateTo,t.fulfillmentStatus=i.fulfillStatus,t.sort=i.sortBy,t.keywords=i.codeName)}this.exportDialog.loading=!0,this.$apiCall("api.Invoice.exportShopifyOrders",t,(function(t){e.exportDialog.loading=!1,9999==t.ErrorCode?(e.exportDialog.isShow=!1,e.$message({offset:200,duration:0,dangerouslyUseHTMLString:!0,showClose:!0,message:"<strong>Your Orders are exporting</strong><br/>Your export will be delivered by email to: ".concat(e.$store.state.userInfo.email,". <br/>Depending on how many Orders you’re exporting, this could take some time."),type:"success"})):e.$elementMessage(t.Message,"error")}))},openExportDialog:function(){this.exportDialog=JSON.parse(this.exportDialogDefault),this.exportDialog.isShow=!0,this.exportDialog.loading=!1,"AllOrders"!=this.activeName&&"WaitingForAllocated"!=this.activeName||(this.exportDialog.totalCount=this.$refs.subPage.totalCount)},updateOrder:function(){var e=this;this.updateOrderLoading=!0,this.$apiCall("api.ShopifyAccount.getOrderByHand",{},(function(t){e.updateOrderLoading=!1,"9999"==t.ErrorCode?(e.updateTime=t.Data.Results,localStorage.setItem("c_orders-updateTime",t.Data.Results),e.$elementMessage("Update Order Success","success")):e.$elementMessage(t.Message,"error")}))},getNum:function(e,t){var a=this;this.$apiCall("api.Invoice.getOrderCnt",{},(function(i){if("9999"==i.ErrorCode){var s=i.Data.Results,o=setInterval((function(){(!e||(new Date).valueOf()>e+1500)&&(clearInterval(o),a.allocateCnt=Number(s.allocateCnt),a.sourcingCnt=Number(s.sourcingCnt))}),100);a.processingCnt=Number(s.processingCnt),a.abnormalCnt=Number(s.abnormalCnt),"first"==t&&setTimeout((function(){a.allocateCnt&&!Number(a.$store.state.userInfo.vendorCnt)&&(a.dialogHowToShopify.isShow=!0)}),200)}else a.$elementMessage(i.Message,"error")})),this.$apiCall("api.Invoice.findByCustomer",{status:2},(function(e){if("9999"==e.ErrorCode){var t=e.Data.Results;a.pendingPay=t.length}else a.$elementMessage(e.Message,"error")}))},getTableHeight:function(e){var t=this;clearTimeout(this.reSizeTime),this.reSizeTime=setTimeout((function(){var a=t.$root.$children[0].$refs.mainScroll.wrap.offsetHeight-(t.$refs.pageHeader.offsetHeight+t.$refs.pageTabs.$el.offsetHeight+e.$refs.tablefilter.offsetHeight+e.$refs.tableFooter.offsetHeight)-120;"WaitingForAllocated"==t.activeName&&(a+=-10),e.tableHeight=a>200?a:200}),500)},handleClick:function(e){e.name==this.$route.name?this.pageKey=(new Date).valueOf():this.$router.push({name:e.name})}}},l=r,n=(a("1499"),a("bf81"),a("2877")),c=Object(n["a"])(l,i,s,!1,null,"7bebdb80",null);t["default"]=c.exports},b4fa:function(e,t,a){},bf81:function(e,t,a){"use strict";a("b4fa")},ea9d:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"Request a quotation for products",visible:e.openCardDialog},on:{"update:visible":function(t){e.openCardDialog=t},close:e.closeDialog}},[a("el-divider"),e.imgView?a("div",{staticClass:"proQuotation"},[a("div",{staticClass:"quotationTit"},[e._v("products for quotation")]),a("div",{staticStyle:{display:"flex"}},[a("div",{staticClass:"imgList"},e._l(e.imgList,(function(e){return a("img",{key:e,staticClass:"upload imgItem",attrs:{src:e}})})),0),a("div",{staticClass:"upload",on:{click:e.openForm}},[a("i",{staticClass:"el-icon-plus"})])])]):e._e(),e.isForm?a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"formRole"},[a("div",{staticClass:"quotationTit"},[e._v("Product information")]),a("el-form",{attrs:{model:e.form,"label-position":"left","label-width":"150px"}},[a("el-form-item",{attrs:{label:"Product images:",required:""}},[a("div",{staticClass:"upload",on:{click:e.uploadOpen}},[e.form.imgUrl?a("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.form.imgUrl,fit:"cover"}}):a("i",{staticClass:"el-icon-plus"})],1)]),a("el-form-item",{attrs:{label:"Details:",required:""}},[a("el-input",{attrs:{placeholder:"Product name / URL / description or anything you can tell us"},model:{value:e.form.details,callback:function(t){e.$set(e.form,"details",t)},expression:"form.details"}})],1),a("el-form-item",{attrs:{label:"Expected price (US$):"}},[a("el-input-number",{attrs:{controls:!1},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),a("el-form-item",{attrs:{label:"Remarks:"}},[a("el-input",{attrs:{placeholder:"Leave your message that you want to tell "+e.$root.$children[0].pName.a+" Vendors"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),a("el-button",{staticClass:"save",attrs:{type:"primary"},on:{click:e.saveQuotation}},[e._v("Save")])],1):e._e(),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("Submit Request")]),a("el-button",{on:{click:e.closeQuotation}},[e._v("Discard")])],1)],1),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"imgFile",accept:".jpg,.png,.gif"},on:{change:function(t){return e.Base64(t)}}})],1)},s=[],o=(a("ac1f"),a("466d"),a("1276"),{props:{visible:{type:Boolean,default:!1}},data:function(){return{form:{imgUrl:"",details:"",price:void 0,remark:""},imgView:!1,outerVisible:!1,innerVisible:!1,isForm:!0,loading:!1,dialogVisible:!1,imgList:[],detailsList:[],priceList:[],remarkList:[]}},computed:{openCardDialog:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}}},mounted:function(){},methods:{openForm:function(){var e=this;this.isForm=!0,this.loading=!0,setTimeout((function(){e.loading=!1}),800)},uploadOpen:function(){document.getElementById("imgFile").click()},Base64:function(e){var t=this;if(e.target.value){var a=new FileReader,i=new Image,s="";a.onload=function(e){i.src=e.target.result;var t=e.target.result.match(/data:image\/(.*);base64,.*/);s=t[1]},i.onload=function(a){base64Image({file:e.target,callback:function(e){var a=e.split("base64,").pop();t.uploadImgBase64(a,s)}})},a.readAsDataURL(e.target.files[0])}},uploadImgBase64:function(e,t){var a=this;this.loading=!0,this.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:e,ext:t},(function(e){a.loading=!1,9999==e.ErrorCode?a.form.imgUrl=e.Data.Results.imgUrl:a.$message.error(e.Message)}))},saveQuotation:function(){return""==this.form.imgUrl?(this.$message.error("Please select a picture !"),!1):""==this.form.details?(this.$message.error("Please fill in the details !"),!1):(this.imgView=!0,this.isForm=!1,this.imgList.push(this.form.imgUrl),this.detailsList.push(this.form.details),this.priceList.push(this.form.price),this.remarkList.push(this.form.remark),void(this.form={imgUrl:"",details:"",price:void 0,remark:""}))},closeQuotation:function(){this.openCardDialog=!1,this.form={imgUrl:"",details:"",price:void 0,remark:""},this.imgList=[],this.detailsList=[],this.priceList=[],this.remarkList=[],this.isForm=!0,this.imgView=!1},closeDialog:function(){this.closeQuotation()},submit:function(){for(var e=this,t=[],a=0;a<this.imgList.length;a++)t.push({detail:this.detailsList[a],imgUrl:this.imgList[a],expectPrice:this.priceList[a],remarks:this.remarkList[a]});this.$apiCall("api.OfferList.genOfferProduct",{products:t},(function(t){9999==t.ErrorCode?(e.$message.success("Submit Success !"),e.closeQuotation(),e.$router.push("/Waiting-for-vendors-respond")):e.$message.error(t.Message)}))}},components:{}}),r=o,l=(a("610e"),a("2877")),n=Object(l["a"])(r,i,s,!1,null,"6167711f",null);t["a"]=n.exports}}]);
//# sourceMappingURL=Main.bd1c2143.js.map