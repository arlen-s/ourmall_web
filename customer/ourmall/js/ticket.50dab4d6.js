(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ticket"],{"8fc2":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentpanel ticket-page"},[a("div",{ref:"pageHeader",staticClass:"pagetitle"},[t._m(0),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:t.openAddComment}},[t._v("Create a ticket")])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"pagebody"},[a("el-row",{staticClass:" mg-b-20",attrs:{gutter:15}},[a("el-col",{attrs:{span:24}},[a("el-card",{staticClass:"chat-card"},[a("div",{ref:"chatCard",staticClass:"chat-box"},[a("div",{staticClass:"left"},[a("div",{staticClass:"t-list"},[t.items.length?t._e():a("div",{staticStyle:{"text-align":"center",color:"#909399"}},[t._v("no data")]),a("el-scrollbar",{ref:"leftScroll",staticStyle:{height:"100%"}},[a("div",t._l(t.items,(function(e){return a("div",{key:e.id,staticClass:"t-card",class:{active:t.msgId==e.id},on:{click:function(a){return a.stopPropagation(),t.viewDetail(e,a)}}},[2==e.userRead?a("div",{staticClass:"user-read"}):t._e(),a("div",{staticClass:"row1 tx-ellipsis1"},[t._v(t._s(e.contents))]),a("div",{staticClass:"row2 tx-ellipsis1"},[t._v(t._s(e.shopName))]),a("div",{staticClass:"img-list"},t._l(e.attach,(function(t){return a("el-image",{key:t,staticStyle:{width:"40px",height:"40px"},attrs:{src:t,"preview-src-list":e.attach}})})),1),a("div",{staticClass:"row3"},[a("div"),a("div",{staticClass:"time"},[t._v(t._s(t.moment.unix(e.timeLastUpdate).format("ll [at] LTS")))])])])})),0)])],1)]),t.items.length?a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.msgLoading,expression:"msgLoading"}],staticClass:"right"},[t.activeItem?a("div",{staticClass:"header"},[t.activeItem.contents?a("div",{staticClass:"row-1"},[a("span",{staticClass:"title"},[t._v("Request:")]),a("span",{staticClass:"text"},[t._v(t._s(t.activeItem.contents))])]):t._e(),t.activeItem.shopName?a("div",{staticClass:"row-1"},[a("span",{staticClass:"title"},[t._v("Store name:")]),a("span",{staticClass:" text"},[t._v(t._s(t.activeItem.shopName))])]):t._e(),t.activeItem.attach&&t.activeItem.attach.length?a("div",{staticClass:"row-1"},[a("span",{staticClass:"title"},[t._v("Attach:")]),a("div",{staticClass:" text"},t._l(t.activeItem.attach,(function(e){return a("el-image",{key:e,staticStyle:{width:"40px",height:"40px"},attrs:{src:e,"preview-src-list":t.activeItem.attach}})})),1)]):t._e()]):t._e(),a("div",{staticClass:"chat-list-box",attrs:{id:"chatListBox"}},[a("div",{staticClass:"chat-list"},[t.msgList.length?t._e():a("div",{staticClass:"no-msg"},[t._v(" No Message ")]),t._l(t.msgList,(function(e){return a("div",{key:e.id,staticClass:"chat",class:{my:1==e.type}},[a("div",{staticClass:"chat-content"},[2==e.type?a("div",{staticClass:"user"}):t._e(),1==e.type?a("div",{staticClass:"user"},[t.$store.state.userInfo.name?a("i",{staticStyle:{"font-size":"16px","font-style":"normal"}},[t._v(" "+t._s(t.$store.state.userInfo.name.substr(0,1))+" ")]):a("i",{staticClass:" el-icon-user-solid"})]):t._e(),e.contents?a("div",{staticClass:"arrow"}):t._e(),e.contents?a("div",{staticClass:"text",domProps:{innerHTML:t._s(t.testHtpp(e))}}):t._e()]),a("div",{staticClass:"img-list",class:{pr35:!e.contents}},t._l(e.attach,(function(t){return a("el-image",{key:t,staticStyle:{width:"40px",height:"40px"},attrs:{src:t,fit:"contain","preview-src-list":e.attach}})})),1),a("div",{staticClass:"time",class:{pr35:!e.contents}},[t._v(t._s(t.moment.unix(e.timeCreated).format("ll [at] LTS")))])])}))],2)]),a("div",{staticClass:"chat-bottom"},[a("div",{staticClass:"row1"},[t.bottomUploadLoading?a("a",{staticClass:"upload-img",attrs:{href:"javascript:;"}},[a("i",{staticClass:"el-icon-loading"})]):a("a",{staticClass:"upload-img",attrs:{href:"javascript:;"},on:{click:t.openBottomUpload}},[a("i",{staticClass:"el-icon-picture-outline"})]),a("div",{staticClass:"send-message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.messageText,expression:"messageText"}],attrs:{type:"text",placeholder:"Message"},domProps:{value:t.messageText},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addMsg(e)},input:function(e){e.target.composing||(t.messageText=e.target.value)}}})]),a("div",[a("el-button",{attrs:{type:"primary",loading:t.sendMsgLoading},on:{click:t.addMsg}},[t._v("Send")])],1)]),a("div",{staticClass:"row2"},t._l(t.msgImg,(function(e,s){return a("div",{key:e,staticClass:"img-wrap"},[a("el-image",{staticStyle:{width:"40px",height:"40px"},attrs:{src:e,fit:"contain"}}),a("div",{staticClass:"mask"},[a("div",{staticClass:"img-del"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.removeImg(s,t.msgImg)}}},[a("i",{staticClass:"el-icon-delete"})])])])],1)})),0)])]):t._e()])])],1)],1)],1),a("el-dialog",{attrs:{title:"",visible:t.DialogEditComment.visible,width:"760px"},on:{"update:visible":function(e){return t.$set(t.DialogEditComment,"visible",e)},closed:function(e){return t.$refs.uploadFile.clearFiles()}}},[a("div",[a("el-form",{ref:"CommentForm"},[a("el-form-item",{attrs:{label:"Tell us more about your request"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.DialogEditComment.contents,callback:function(e){t.$set(t.DialogEditComment,"contents",e)},expression:"DialogEditComment.contents"}})],1),a("el-row",{staticClass:"d-flex align-items-center mg-b-10",attrs:{gutter:15}},[a("el-col",{staticStyle:{"min-width":"155px"},attrs:{span:5}},[a("span",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[t._v("Attach image file")])]),a("el-upload",{ref:"uploadFile",staticClass:"upload-file",attrs:{"on-change":t.handleChange,"before-remove":t.handleRemove,action:"","auto-upload":!1,accept:"image/gif,image/jpeg,image/jpg,image/png"}},[a("el-button",{ref:"uploadBtn",attrs:{size:"small",type:"primary",loading:t.DialogEditComment.uploadLoading}},[t._v("Browse")])],1)],1),a("el-form-item",{attrs:{label:"What is your Shopify store name?"}},[a("el-input",{model:{value:t.DialogEditComment.shopName,callback:function(e){t.$set(t.DialogEditComment,"shopName",e)},expression:"DialogEditComment.shopName"}})],1)],1)],1),a("div",{staticClass:"dialog-footer d-flex justify-content-end",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:" mg-r-15"},[a("el-button",{attrs:{size:"small",type:"primary",loading:t.DialogEditComment.loading},on:{click:t.saveComment}},[t._v("Send your request")])],1),a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.DialogEditComment.visible=!1}}},[t._v("Cancel")])],1)])]),a("input",{staticStyle:{display:"none"},attrs:{id:"bottomUploadImg",type:"file",accept:"image/gif,image/jpeg,image/jpg,image/png"},on:{change:function(e){return t.bottomUploadimg(e)}}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"left"},[a("div",{staticClass:"title"},[a("i",{staticClass:" iconfont icon-support"}),a("h2",[t._v("My support")])])])}],o=(a("a434"),a("b0c0"),a("a9e3"),a("ac1f"),a("5319"),a("159b"),{data:function(){return{tableHeight:400,loading:!1,pageSizes:[20,50,100],page:this.$route.query.page?Number(this.$route.query.page):1,rowsPerPage:localStorage.getItem("c_myTicketPage")?Number(localStorage.getItem("c_myTicketPage")):20,total:0,totalPage:0,items:[],DialogEditComment:{loading:!1,uploadLoading:!1,visible:!1,contents:"",shopName:"",attach:[],commentId:"",item:null},DialogEditCommentDefault:"{}",msgLoading:!1,msgId:"",msgList:[],messageText:"",bottomUpload:"",msgImg:[],sendMsgLoading:!1,bottomUploadLoading:!1}},computed:{activeItem:function(){var t=this,e=null;return this.msgId&&this.items.some((function(a){if(a.id==t.msgId)return e=a,!0})),e}},mounted:function(){var t=this;this.setChatCardHeight(),this.DialogEditCommentDefault=JSON.stringify(this.DialogEditComment),this.getItem(!0),window.onresize=function(){t.setChatCardHeight()};var e=this.$refs.leftScroll.wrap;e.onscroll=function(){e.scrollTop+e.offsetHeight+200>e.scrollHeight&&t.totalPage>t.page&&(t.page++,t.getItem())}},beforeDestroy:function(){this.$refs.leftScroll.wrap.onscroll=function(){},window.onresize=function(){}},methods:{testHtpp:function(t){if(t.contents){var e=t.contents,a=/(https?.*?)(?=http|$|<|>|\s|,)/gi;return e=1==t.type?e.replace(a,"<a href='$1$2' target='_blank' style='color:#fff;'>$1$2</a>"):e.replace(a,"<a href='$1$2' target='_blank' style='color:#303133;'>$1$2</a>"),e}},removeImg:function(t,e){e.splice(t,1)},bottomUploadimg:function(t){var e=this;this.bottomUploadLoading=!0,this.$apiCall("api.Comment.uploadAttach",{"@file":t.target.files[0]},(function(t){e.bottomUploadLoading=!1,"9999"==t.ErrorCode?e.msgImg.push(t.Data.Results.url):e.$elementMessage(t.Message,"error")}))},openBottomUpload:function(){document.getElementById("bottomUploadImg").click()},addMsg:function(){var t=this;this.messageText||this.msgImg.length?(this.sendMsgLoading=!0,this.$Burying({object:"11001"}),this.$apiCall("api.Comment.addByUser",{commentId:this.msgId,contents:this.messageText,attach:this.msgImg},(function(e){t.sendMsgLoading=!1,"9999"==e.ErrorCode?(t.messageText="",t.msgImg=[],t.getItem(!0),t.viewDetail(t.activeItem),t.$refs.leftScroll.wrap.scrollTop=0):t.$elementMessage(e.Message,"error")}))):this.$elementMessage("The message cannot be empty","error")},setChatCardHeight:function(){this.$refs.chatCard.style.height=document.body.clientHeight-190+"px"},handleRemove:function(t,e){var a=this;e.forEach((function(e,s){e.name==t.name&&a.DialogEditComment.attach.splice(s,1)}))},handleChange:function(t){var e=this;this.DialogEditComment.loading=!0,this.DialogEditComment.uploadLoading=!0,this.$apiCall("api.Comment.uploadAttach",{"@file":t.raw},(function(t){e.DialogEditComment.loading=!1,e.DialogEditComment.uploadLoading=!1,"9999"==t.ErrorCode?e.DialogEditComment.attach.push(t.Data.Results.url):e.$elementMessage(t.Message,"error")}))},viewDetail:function(t,e){var a=this;e&&"img"==e.target.localName||(this.msgLoading=!0,this.$apiCall("api.Comment.getDetailByUser",{commentId:t.id},(function(e){if(a.msgLoading=!1,"9999"==e.ErrorCode){a.$root.$children[0].getMsgNum(),a.$set(t,"userRead","1"),a.msgList=[],e.Data.Results.forEach((function(t){t.attach=JSON.parse(t.attach),a.msgList.unshift(t)})),a.msgId=t.id;var s=document.getElementById("chatListBox");s&&setTimeout((function(){s.scroll(0,s.scrollHeight)}),500)}else a.$elementMessage(e.Message,"error")})))},openAddComment:function(){this.$refs.uploadFile&&this.$refs.uploadFile.clearFiles(),this.DialogEditComment=JSON.parse(this.DialogEditCommentDefault),this.DialogEditComment.visible=!0},saveComment:function(){var t=this;if(!this.DialogEditComment.contents)return this.$message({message:"The question must not be empty",type:"error"}),!1;this.DialogEditComment.loading=!0,this.$apiCall("api.Comment.addByUser",{commentId:this.DialogEditComment.commentId,contents:this.DialogEditComment.contents,shopName:this.DialogEditComment.shopName,attach:this.DialogEditComment.attach},(function(e){t.DialogEditComment.loading=!1,9999==e.ErrorCode?(t.DialogEditComment.visible=!1,t.$message({message:"Save Success",type:"success"}),t.getItem(!0)):t.$message({message:e.Message,type:"error"})}))},getItem:function(t){var e=this;this.loading=!0,t&&(this.page=1),this.$apiCall("api.Comment.findByUser",{page:this.page,rowsPerPage:this.rowsPerPage},(function(a){e.loading=!1,"9999"==a.ErrorCode?(t&&(e.items=[]),a.Data.Results.forEach((function(t){t.attach=JSON.parse(t.attach),e.items.push(t)})),e.total=Number(a.Data.Pagination.totalCount),e.totalPage=Number(a.Data.Pagination.totalPage),e.activeItem||1!=e.page||e.viewDetail(e.items[0])):(e.$elementMessage(a.Message,"error"),"1002"!=a.ErrorCode&&"1003"!=a.ErrorCode||e.$userFailure())}))}}}),n=o,l=(a("e970"),a("cf86"),a("2877")),r=Object(l["a"])(n,s,i,!1,null,"96314240",null);e["default"]=r.exports},"94d5":function(t,e,a){},cf86:function(t,e,a){"use strict";a("f47f")},e970:function(t,e,a){"use strict";a("94d5")},f47f:function(t,e,a){}}]);
//# sourceMappingURL=ticket.50dab4d6.js.map