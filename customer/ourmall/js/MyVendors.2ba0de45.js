(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MyVendors"],{"0e6e":function(e,t,i){},"30a6":function(e,t,i){e.exports=i.p+"img/Invite1.91215003.jpg"},"6c77":function(e,t,i){"use strict";i("0e6e")},b430:function(e,t,i){},b4fb:function(e,t,i){"use strict";i("b430")},d17b:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"orders-page"},[i("div",{staticClass:"pagebody mg-b-20"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:24}},[i("div",{ref:"tablefilter",staticClass:"page-filter"},[i("el-form",{attrs:{inline:!0,size:"mini"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:e.$root.$children[0].pName.a+" ID"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.vendorId,callback:function(t){e.$set(e.filterParams,"vendorId",t)},expression:"filterParams.vendorId"}})],1),i("el-form-item",[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"Vendor name / contact / shop name etc."},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.filterGetItem(t)}},model:{value:e.filterParams.vendorLike,callback:function(t){e.$set(e.filterParams,"vendorLike",t)},expression:"filterParams.vendorLike"}})],1),i("el-form-item",[i("el-autocomplete",{staticStyle:{width:"300px"},attrs:{"fetch-suggestions":e.getProductSelectList,placeholder:"My sourcing products","trigger-on-focus":!1},on:{select:e.selectClick},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.item;return[i("div",{staticClass:"name",staticStyle:{width:"100%"}},[e._v(e._s(a.name))])]}}]),model:{value:e.filterParams.productName,callback:function(t){e.$set(e.filterParams,"productName",t)},expression:"filterParams.productName"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.filterGetItem}},[e._v(e._s(e.$t("Filter")))]),i("el-button",{attrs:{type:""},on:{click:e.clearFilter}},[e._v(e._s(e.$t("Clear")))])],1)],1)],1)])],1),i("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{data:e.items,stripe:"","row-key":"id"}},[i("el-table-column",{attrs:{label:"Vendor information","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("div",{staticStyle:{color:"#909399"}},[e._v(" OM ID: "),a.vendorId?i("span",{staticStyle:{color:"#303133"}},[e._v(" "+e._s(a.vendorId))]):i("span",{staticStyle:{color:"#303133"}},[e._v(" --- "),i("span",{staticStyle:{color:"#909399"}},[e._v("("+e._s(e.$t("NOT Joined"))+")")])])]),i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("Vender Name"))+": "),i("span",{staticStyle:{color:"#303133"}},[e._v(e._s(a.vendorName||"---"))]),a.vendorRemark?i("span",{staticClass:"mg-l-5 vendorRemark"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.vendorRemark,placement:"top"}},[i("i",{staticClass:"el-icon-info"})])],1):e._e()]),i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("AliExpress Shop Name"))+": "),a.shopName?i("span",{staticStyle:{color:"#303133"}},[i("a",{staticStyle:{color:"#5c6ac4"},attrs:{href:a.shopUrl,target:"_blank",title:a.shopUrl}},[e._v(e._s(a.shopName))])]):i("span",{staticStyle:{color:"#909399"}},[e._v("---")])])]}}])}),i("el-table-column",{attrs:{label:"Vendor Contact","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"customer-info-box"},[t.row.vendorEmail?i("div",[i("span",{staticStyle:{color:"#606266"}},[i("i",{staticClass:"iconfont icon-email"})]),i("a",{attrs:{href:"mailto:"+t.row.vendorEmail,target:"_blank"}},[e._v(e._s(t.row.vendorEmail))])]):e._e(),t.row.vendorWeChat?i("div",[i("span",{staticStyle:{color:"#55a947"}},[i("i",{staticClass:"iconfont icon-wechat"})]),e._v(" "+e._s(t.row.vendorWeChat)+" ")]):e._e(),t.row.vendorSkype?i("div",[i("span",{staticStyle:{color:"#00b0f6"}},[i("i",{staticClass:"iconfont icon-skype"})]),i("a",{attrs:{href:"skype:"+t.row.vendorSkype+"?chat",target:"_blank"}},[e._v(" "+e._s(t.row.vendorSkype)+" ")])]):e._e(),t.row.vendorLine?i("div",[i("span",{staticStyle:{color:"#00c300"}},[i("i",{staticClass:"iconfont icon-line"})]),e._v(" "+e._s(t.row.vendorLine)+" ")]):e._e(),t.row.vendorQQ?i("div",[i("span",{staticStyle:{color:"#1e6fff"}},[i("i",{staticClass:"iconfont icon-qq"})]),i("a",{attrs:{href:"tencent://message/?uin="+t.row.vendorQQ+"&Site=5yoho&Menu=yes"}},[e._v(" "+e._s(t.row.vendorQQ)+" ")])]):e._e(),t.row.vendorWangwang?i("div",[i("span",{staticStyle:{color:"#009fff"}},[i("i",{staticClass:"iconfont icon-wangwang"})]),i("a",{attrs:{href:"http://amos.alicdn.com/msg.aw?v=2&uid="+t.row.vendorWangwang+"&site=cnalichn&s=11&charset=UTF-8",target:"_blank"}},[e._v(" "+e._s(t.row.vendorWangwang)+" ")])]):e._e(),t.row.vendorWhatsapp?i("div",[i("span",{staticStyle:{color:"#109d58"}},[i("i",{staticClass:"iconfont icon-whatsapp"})]),i("a",{attrs:{href:"https://wa.me/"+t.row.vendorWhatsapp,target:"_blank"}},[e._v(" "+e._s(t.row.vendorWhatsapp)+" ")])]):e._e()])]}}])}),i("el-table-column",{attrs:{label:"Bonus Balance（$）","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[2!=t.row.bonusStatus?i("div",[i("div",[e._v(e._s(t.row.bonus))]),i("div",[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.openBonusDetail(t.row.id)}}},[e._v(" "+e._s(e.$t("View Detail"))+" ")])],1)]):i("span",{staticStyle:{color:"#909399"}},[e._v("---")])]}}])}),i("el-table-column",{attrs:{label:"Sales statistics","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("Product allocated"))+": "),i("span",{staticStyle:{color:"#303133"}},[i("el-link",{staticStyle:{"font-size":"12px"},attrs:{type:"primary"},on:{click:function(i){return e.gotoProduct(t.row.id)}}},[e._v(e._s(t.row.allocatedNum))])],1)]),i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("Purchase amount"))+": "),i("span",{staticStyle:{color:"#303133"}},[i("el-link",{staticClass:"purchase-amount",attrs:{type:"primary"},on:{click:function(i){return e.goPurchase(t.row.id,t.row.vendorName)}}},[e._v("US$ "+e._s(t.row.totalAmount))])],1)])]}}])}),i("el-table-column",{attrs:{label:"Date","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("Created at"))+": "),i("span",{staticStyle:{color:"#303133"}},[e._v(e._s(t.row.timeCreated?e.moment(t.row.timeCreated).format("ll"):"---"))])]),i("div",{staticStyle:{color:"#909399"}},[e._v(" "+e._s(e.$t("Latest cooperation at"))+": "),i("span",{staticStyle:{color:"#303133"}},[e._v(e._s(t.row.timeCooperated?e.moment(t.row.timeCooperated).format("ll"):"---"))])])]}}])}),i("el-table-column",{attrs:{label:"Action",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",[i("el-link",{staticClass:"mg-r-20",attrs:{type:"primary"},on:{click:function(i){return e.newEditVendor(t.row)}}},[e._v(e._s(e.$t("Edit")))]),t.row.canDelete?i("el-link",{attrs:{type:"danger"},on:{click:function(i){return e.delVendor(t.row)}}},[e._v(e._s(e.$t("Delete")))]):e._e()],1),i("div",[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.gotoInvoice(t.row)}}},[e._v(e._s(e.$t("Sourcing Now")))]),t.row.vendorId?e._e():i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.openInviteDialog(t.row.id)}}},[e._v(e._s(e.$t("Invite Vendor")))])],1)]}}])})],1)],1),e.items.length?i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",{ref:"tableFooter"},[i("el-pagination",{attrs:{"current-page":Number(e.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.pageSizes,"page-size":e.rowsPerPage,total:Number(e.total)},on:{"current-change":e.toPage,"size-change":e.changePageSize}})],1)])],1):e._e(),i("el-dialog",{attrs:{title:"Add Vendor",visible:e.newAddVendorDialog.visible,width:"600px","before-close":e.handleClosenewAddVendor}},[i("div",{staticStyle:{margin:"20px"}},[i("span",{staticClass:"mg-r-5"},[e._v(" "+e._s(e.$t("How to add"))+":")]),i("el-radio-group",{staticClass:"add-vendor",on:{change:e.addVendoorChange},model:{value:e.newAddVendorDialog.radio,callback:function(t){e.$set(e.newAddVendorDialog,"radio",t)},expression:"newAddVendorDialog.radio"}},[i("el-radio",{attrs:{label:1}},[e._v(e._s(e.$t("By Vendor Name")))]),i("el-radio",{attrs:{label:2}},[e._v(e._s(e.$t("By AliExpress Url")))]),i("el-radio",{attrs:{label:3}},[e._v("By "+e._s(e.$root.$children[0].pName.a)+" ID")])],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:1===e.newAddVendorDialog.radio,expression:"newAddVendorDialog.radio === 1"}],staticStyle:{margin:"20px"}},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("span",{staticStyle:{flex:"0 0 20%"}},[e._v(e._s(e.$t("Vendor's Name"))+": ")]),i("el-input",{staticStyle:{flex:"0 0 50%"},attrs:{size:"small",placeholder:"Please enter your vendor's name"},model:{value:e.newAddVendorDialog.name,callback:function(t){e.$set(e.newAddVendorDialog,"name",t)},expression:"newAddVendorDialog.name"}})],1)]),i("div",{directives:[{name:"show",rawName:"v-show",value:2===e.newAddVendorDialog.radio,expression:"newAddVendorDialog.radio === 2"}],staticStyle:{margin:"0 20px"}},[i("p",{staticClass:"mg-b-10",staticStyle:{color:"#333"}},[e._v(" "+e._s(e.$t("Vendor's AliExpress shop or product URL"))+" "),i("el-tooltip",{attrs:{effect:"dark",placement:"bottom"}},[i("div",{attrs:{slot:"content"},slot:"content"},[i("div",[e._v(e._s(e.$t("How to get the vendor's AliExpress shop / product URL?")))]),i("div",[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.inviteImage1,fit:"contain","preview-src-list":[e.inviteImage1,e.inviteImage2]}}),i("el-image",{staticStyle:{width:"100px",height:"100px","margin-left":"20px"},attrs:{src:e.inviteImage2,fit:"scale-down","preview-src-list":[e.inviteImage2,e.inviteImage1]}})],1)]),i("i",{staticClass:"el-icon-question",staticStyle:{color:"#5c6ac4"}})])],1),i("el-input",{attrs:{placeholder:"Vendor's AliExpress shop / product URL"},model:{value:e.newAddVendorDialog.content,callback:function(t){e.$set(e.newAddVendorDialog,"content",t)},expression:"newAddVendorDialog.content"}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:3===e.newAddVendorDialog.radio,expression:"newAddVendorDialog.radio === 3"}],staticStyle:{margin:"20px"}},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("span",{staticStyle:{flex:"0 0 26%"}},[e._v("Vendor's "+e._s(e.$root.$children[0].pName.a)+" ID: ")]),i("el-input",{staticStyle:{flex:"0 0 50%"},attrs:{size:"small",placeholder:"Vendor's "+e.$root.$children[0].pName.a+" ID"},model:{value:e.newAddVendorDialog.ourmallId,callback:function(t){e.$set(e.newAddVendorDialog,"ourmallId",t)},expression:"newAddVendorDialog.ourmallId"}})],1)]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",loading:e.newAddVendorDialog.btnNextLoading},on:{click:e.getShopUrl}},[e._v("Next")])],1)]),i("el-dialog",{attrs:{title:"Edit Vendor",visible:e.newEditDialog.visible,width:"600px","before-close":e.handleCloseNewEditDialog}},[i("div",[i("el-form",{staticClass:"new-edit-from",attrs:{"label-position":"left","label-width":"130px"}},[i("el-form-item",{attrs:{label:e.$root.$children[0].pName.a+" ID："}},[i("div",[e._v(e._s(this.newEditDialog.vendorId||"--- (NOT Joined)"))])]),i("el-form-item",{attrs:{label:"Vendor name："}},[i("el-input",{attrs:{placeholder:"Vendor name",size:"mini"},model:{value:e.newEditDialog.name,callback:function(t){e.$set(e.newEditDialog,"name",t)},expression:"newEditDialog.name"}})],1),i("el-form-item",{attrs:{label:"AilExpress shop："}},[i("div",{staticClass:"newEditurl"},[i("el-input",{attrs:{placeholder:"Vendor's AliExpress shop / product URL",size:"mini"},model:{value:e.newEditDialog.shopUrl,callback:function(t){e.$set(e.newEditDialog,"shopUrl",t)},expression:"newEditDialog.shopUrl"}})],1)])],1),i("div",{staticClass:"contact-wrapper"},[i("div",{staticClass:"mg-b-10 contact",staticStyle:{cursor:"pointer"},on:{click:function(t){e.newEditDialog.isUnfold=!e.newEditDialog.isUnfold}}},[e._v(" "+e._s(e.$t("CONTACT"))+"："),i("i",{class:e.newEditDialog.isUnfold?"el-icon-caret-top":"el-icon-caret-bottom"})]),i("el-collapse-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:e.newEditDialog.isUnfold,expression:"newEditDialog.isUnfold"}]},[i("el-row",{staticClass:"contact-list",attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) Email",size:"small"},model:{value:e.newEditDialog.email,callback:function(t){e.$set(e.newEditDialog,"email",t)},expression:"newEditDialog.email"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) WeChat",size:"small"},model:{value:e.newEditDialog.weChat,callback:function(t){e.$set(e.newEditDialog,"weChat",t)},expression:"newEditDialog.weChat"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) Skype",size:"small"},model:{value:e.newEditDialog.skype,callback:function(t){e.$set(e.newEditDialog,"skype",t)},expression:"newEditDialog.skype"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) Line",size:"small"},model:{value:e.newEditDialog.line,callback:function(t){e.$set(e.newEditDialog,"line",t)},expression:"newEditDialog.line"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) QQ",size:"small"},model:{value:e.newEditDialog.QQ,callback:function(t){e.$set(e.newEditDialog,"QQ",t)},expression:"newEditDialog.QQ"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) Ail WangWang",size:"small"},model:{value:e.newEditDialog.wangwang,callback:function(t){e.$set(e.newEditDialog,"wangwang",t)},expression:"newEditDialog.wangwang"}})],1),i("el-col",{attrs:{span:12}},[i("el-input",{attrs:{placeholder:"(Optional) WhatsApp",size:"small"},model:{value:e.newEditDialog.whatsapp,callback:function(t){e.$set(e.newEditDialog,"whatsapp",t)},expression:"newEditDialog.whatsapp"}})],1)],1),i("div",[i("el-input",{attrs:{placeholder:"(Optional) Remark",size:"small"},model:{value:e.newEditDialog.remark,callback:function(t){e.$set(e.newEditDialog,"remark",t)},expression:"newEditDialog.remark"}})],1)],1)])],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.newEditDialog.visible=!1}}},[e._v(e._s(e.$t("Close")))]),i("el-button",{attrs:{type:"primary",loading:e.newEditDialog.loading},on:{click:e.newSaveVendor}},[e._v(e._s(e.$t("Save")))])],1)]),i("el-dialog",{attrs:{title:"Invite Vendor",visible:e.inviteDialog.visible,width:"600px","before-close":e.closeInviteDialog}},[i("el-form",{staticStyle:{"margin-bottom":"0"},attrs:{"label-position":"left"}},[i("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"Invite Link: "}},[i("span",[i("a",{staticStyle:{color:"#409eff"},attrs:{href:e.inviteDialog.inviteCode,target:"_blank"}},[e._v(e._s(this.inviteDialog.inviteCode)+" ")]),i("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.inviteDialog.inviteCode,expression:"inviteDialog.inviteCode",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],attrs:{size:"mini",type:"success"}},[e._v(e._s(e.$t("Copy Link")))])],1)])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.inviteDialog.visible=!1}}},[e._v(e._s(e.$t("Close")))])],1)],1),i("el-dialog",{attrs:{title:"Bonus Detail",visible:e.BonusVisible,"before-close":e.closeBonusVisible,width:"60%"}},[i("div",{staticClass:"mg-l-20 mg-b-20 mg-r-20",attrs:{loading:e.Bonusloading}},[i("div",{staticClass:"tableBox"},[i("el-table",{ref:"gridTable",staticStyle:{width:"100%"},attrs:{height:"400",data:e.BonusList,stripe:""}},[i("el-table-column",{attrs:{label:"Type"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(1==t.row.symbol?"Recharge":"Expenditure"))])]}}])}),i("el-table-column",{attrs:{label:"Transaction Flow Line",prop:"code"}}),i("el-table-column",{attrs:{label:"Recharge Time"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e.moment.unix(t.row.timeCreated).format("YYYY-MM-DD HH:mm:ss"))+" ")])]}}])}),i("el-table-column",{attrs:{label:"Amount（$）",prop:"amount"}}),i("el-table-column",{attrs:{label:"Remarks"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.remark))]),t.row.remark?e._e():i("span",[e._v("---")])]}}])})],1)],1),e.items.length?i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"d-flex justify-content-center",attrs:{span:24}},[i("div",{staticStyle:{"margin-top":"15px"}},[i("el-pagination",{attrs:{"current-page":Number(e.BonusDialog.page),background:!0,layout:"sizes, total, prev, pager, next, jumper","page-sizes":e.BonusDialog.pageSizes,"page-size":e.BonusDialog.rowsPerPage,total:Number(e.BonusDialog.total)},on:{"current-change":e.toBonusVisiblePage,"size-change":e.changeBonusVisiblePageSize}})],1)])],1):e._e()],1),i("el-divider"),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.BonusVisible=!1}}},[e._v(e._s(e.$t("Close")))])],1)],1),i("el-backtop",{staticClass:"goto-top",attrs:{target:".main-scroll  .el-scrollbar__wrap",right:20,bottom:120}})],1)},o=[],n=(i("99af"),i("b0c0"),i("a9e3"),i("ac1f"),i("1276"),{data:function(){return{Bonusloading:!1,BonusList:[],BonusVisible:!1,inviteImage1:i("30a6"),inviteImage2:i("f80b"),inviteDialog:{visible:!1,inviteContents:"",inviteCode:""},BonusDialog:{id:"",page:1,pageSizes:[10,20,50,100],rowsPerPage:10,items:[],total:0,totalPage:0},newEditDialog:{isUnfold:!0,visible:!1,loading:!1,name:"",shopUrl:"",remark:"",email:"",id:"",weChat:"",skype:"",line:"",QQ:"",wangwang:"",whatsapp:"",vendorId:null},newAddVendorDialog:{visible:!1,content:"",btnNextLoading:!0,radio:1,ourmallId:"",name:""},loading:!1,tableHeight:400,reSizeTime:0,pageSizes:[10,20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_myVendorPerPage")?Number(localStorage.getItem("c_myVendorPerPage")):10,items:[],total:0,totalPage:0,filterParams:{vendorId:"",vendorLike:"",isRegister:"",productId:"",productName:""},filterParamsDefault:"{}",addVendorDialog:{isShow:!1,loading:!1,labelW:"120px",name:"",remark:"",email:"",id:"",weChat:"",skype:"",line:"",QQ:"",wangwang:"",whatsapp:""},addVendorDialogDefault:"{}"}},components:{},watch:{$route:"gotoPage"},computed:{},mounted:function(){this.addVendorDialogDefault=JSON.stringify(this.addVendorDialog),this.filterParamsDefault=JSON.stringify(this.filterParams),this.getItem()},beforeDestroy:function(){},methods:{changeBonusVisiblePageSize:function(e){this.BonusDialog.rowsPerPage=e,this.getBonus()},toBonusVisiblePage:function(e){this.BonusDialog.page=e,this.getBonus()},closeBonusVisible:function(){this.BonusDialog={id:"",page:1,pageSizes:[10,20,50,100],rowsPerPage:10,items:[],total:0,totalPage:0},this.BonusVisible=!1,this.BonusList=[]},openBonusDetail:function(e){this.BonusDialog.id=e,this.getBonus(),this.BonusVisible=!0},getBonus:function(){var e=this;this.Bonusloading=!0,this.$apiCall("api.Relationship.bonusList",{relationshipId:this.BonusDialog.id,page:this.BonusDialog.page,rowsPerPage:this.BonusDialog.rowsPerPage},(function(t){e.Bonusloading=!1,9999==t.ErrorCode?(e.BonusList=t.Data.Results,e.BonusDialog.total=Number(t.Data.Pagination.totalCount),e.BonusDialog.totalPage=Number(t.Data.Pagination.totalPage),$(".el-table__body-wrapper").eq(1).scrollTop(0)):e.$message({message:t.Message,type:"error"})}))},gotoProduct:function(e){this.$router.push({name:"allocatedProducts",params:{vendorId:e}})},addVendoorChange:function(){this.newAddVendorDialog.ourmallId="",this.newAddVendorDialog.content=""},selectClick:function(e){var t=e.shopifyId,i=e.name;this.filterParams.productId=t,this.filterParams.productName=i,this.filterGetItem()},getProductSelectList:function(e,t){var i=this;""!==e&&this.$apiCall("api.Product.findByUser",{name:e},(function(e){9999==e.ErrorCode?t(e.Data.Results):(i.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||i.$userFailure())}))},goPurchase:function(e,t){this.$router.push({path:"/Orders-processing",query:{rid:e,name:t}})},onCopy:function(){this.$elementMessage("Copy success","success")},onError:function(){this.$elementMessage("Copy failed","error")},closeInviteDialog:function(){this.inviteDialog.visible=!1},openInviteDialog:function(e){var t=this;this.$showLoading(),this.inviteDialog.inviteCode="",this.inviteDialog.visible=!0,this.$apiCall("api.Relationship.getInviteContents",{relationshipId:e},(function(e){if(9999==e.ErrorCode){var i=window.location.hostname.split(".");window.location.host.toLowerCase().indexOf("sandbox")>=0?t.inviteDialog.inviteCode="http://sandboxvendor.".concat(/^(\w+\.)+[a-zA-Z]+$/.test(window.location.hostname)?i[i.length-2]:"ourmall",".com/#/invite?rid=").concat(e.Data.Results.inviteCode):t.inviteDialog.inviteCode="https://vendor.".concat(/^(\w+\.)+[a-zA-Z]+$/.test(window.location.hostname)?i[i.length-2]:"ourmall",".com/#/invite?rid=").concat(e.Data.Results.inviteCode)}else t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure();t.$hideLoading()}))},handleCloseNewEditDialog:function(){this.newEditDialog.visible=!1},handleClosenewAddVendor:function(){this.newAddVendorDialog.visible=!1},gotoInvoice:function(e){this.$router.push({name:"WaitingForSourcing",params:{id:e.id,name:e.vendorName}})},delVendor:function(e){var t=this;this.$confirm(this.$t("Are you sure you want to delete it?"),"",{confirmButtonText:"Delete",cancelButtonText:"Discard",type:"error"}).then((function(){t.$apiCall("api.Relationship.deleteByCustomer",{relationshipId:e.id},(function(e){9999==e.ErrorCode?(t.$message({message:"Success",type:"success"}),t.getItem(!0),t.$emit("getNum")):(t.$elementMessage(e.Message,"error"),"1002"!=e.ErrorCode&&"1003"!=e.ErrorCode||t.$userFailure())}))})).catch((function(){}))},newEditVendor:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.newEditDialog.isUnfold=t,this.newEditDialog.shopUrl=e.shopUrl,this.newEditDialog.name=e.vendorName,this.newEditDialog.id=e.id,this.newEditDialog.vendorId=e.vendorId,this.newEditDialog.shopName=e.shopName,this.newEditDialog.email=e.vendorEmail,this.newEditDialog.remark=e.vendorRemark,this.newEditDialog.weChat=e.vendorWeChat,this.newEditDialog.skype=e.vendorSkype,this.newEditDialog.line=e.vendorLine,this.newEditDialog.QQ=e.vendorQQ,this.newEditDialog.wangwang=e.vendorWangwang,this.newEditDialog.whatsapp=e.vendorWhatsapp,this.newEditDialog.loading=!1,this.newEditDialog.visible=!0},newSaveVendor:function(){var e=this;if(this.newEditDialog.name){this.newEditDialog.loading=!0;var t="api.Relationship.addByCustomer",i={name:this.newEditDialog.name,email:this.newEditDialog.email,remark:this.newEditDialog.remark,weChat:this.newEditDialog.weChat,skype:this.newEditDialog.skype,line:this.newEditDialog.line,QQ:this.newEditDialog.QQ,wangwang:this.newEditDialog.wangwang,whatsapp:this.newEditDialog.whatsapp,shopUrl:this.newEditDialog.shopUrl};this.newEditDialog.id&&(i.relationshipId=this.newEditDialog.id,t="api.Relationship.changeByCustomer"),this.$apiCall(t,i,(function(t){e.addVendorDialog.loading=!1,9999==t.ErrorCode?(e.newEditDialog.visible=!1,e.$elementMessage(e.newEditDialog.id?e.$t("customer successfully edited"):e.$t("customer successfully added"),"success"),e.getItem(!0)):(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure()),e.newEditDialog.loading=!1}))}else this.$elementMessage(this.$t("Customer name required"),"error")},openAddVendor:function(){this.newAddVendorDialog.content="",this.newAddVendorDialog.vendorId="",this.newAddVendorDialog.radio=1,this.newAddVendorDialog.btnNextLoading=!1,this.newAddVendorDialog.name="",this.newAddVendorDialog.visible=!0},getShopUrl:function(){var e=this,t={};1===this.newAddVendorDialog.radio?t.name=this.newAddVendorDialog.name:2===this.newAddVendorDialog.radio?t.url=this.newAddVendorDialog.content:t.ourmallId=this.newAddVendorDialog.ourmallId,this.newAddVendorDialog.btnNextLoading=!0,this.$apiCall("api.Relationship.addUrlByCustomer",t,(function(t){9999==t.ErrorCode?(e.newAddVendorDialog.visible=!1,e.newEditVendor({shopUrl:t.Data.Results.shopUrl,id:t.Data.Results.id,vendorName:t.Data.Results.vendorName,shopName:t.Data.Results.shopName,vendorId:t.Data.Results.vendorId},!1),e.getItem(!0),e.$emit("getNum")):(e.$elementMessage(t.Message,"error"),"1002"!=t.ErrorCode&&"1003"!=t.ErrorCode||e.$userFailure()),e.newAddVendorDialog.btnNextLoading=!1}))},addVendorSaveSuccess:function(){this.getItem(!0)},clearFilter:function(){this.filterParams=JSON.parse(this.filterParamsDefault),1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},filterGetItem:function(){1==this.$route.query.page?this.getItem():this.$router.push({query:{page:1}})},getItem:function(e){var t=this;this.$showLoading(),this.$apiCall("api.Relationship.findByCustomer",{page:this.page,rowsPerPage:this.rowsPerPage,vendorId:this.filterParams.vendorId,vendorLike:this.filterParams.vendorLike,isRegister:this.filterParams.isRegister,shopifyProductId:this.filterParams.productId},(function(i){"9999"==i.ErrorCode?(t.items=i.Data.Results,t.total=Number(i.Data.Pagination.totalCount),t.totalPage=Number(i.Data.Pagination.totalPage),e||(t.$root.$children[0].$refs.mainScroll.wrap.scrollTop=0)):(t.$elementMessage(i.Message,"error"),"1002"!=i.ErrorCode&&"1003"!=i.ErrorCode||t.$userFailure()),t.$hideLoading()}))},toPage:function(e){e!=this.$route.query.page&&this.$router.push({query:{page:e}})},changePageSize:function(e){this.rowsPerPage=e,localStorage.setItem("c_myVendorPerPage",e),this.getItem()},gotoPage:function(){this.page=this.$route.query.page?this.$route.query.page:1,this.getItem()}}}),s=n,l=(i("6c77"),i("b4fb"),i("2877")),r=Object(l["a"])(s,a,o,!1,null,"59c03dc0",null);t["default"]=r.exports},f80b:function(e,t,i){e.exports=i.p+"img/Invite2.ca223b3f.jpg"}}]);
//# sourceMappingURL=MyVendors.2ba0de45.js.map