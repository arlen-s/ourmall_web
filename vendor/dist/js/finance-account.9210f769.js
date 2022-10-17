(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["finance-account"],{"2d30":function(t,a,i){"use strict";i("94d6")},"94d6":function(t,a,i){},f11e:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:t.loading,expression:"loading",modifiers:{fullscreen:!0}}],attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[t.$store.state.userInfo.walletOpen?[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{span:2}},[i("div",{staticStyle:{height:"5px"}})]),i("el-col",{attrs:{span:4}},[i("el-card",{staticClass:"amount-card"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"总余额",placement:"top-start"}},[i("i",{staticClass:"el-icon-question"})]),i("div",{staticClass:"center-i"},[i("i",{staticClass:"el-icon-s-finance"})]),i("div",{staticClass:"info"},[i("p",{staticClass:"type"},[t._v("钱包余额($)")]),i("div",{staticClass:"amount"},[t._v(t._s(t.balance))])])],1)],1),i("el-col",{attrs:{span:4}},[i("el-card",{staticClass:"amount-card"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"可提现余额=总额-提现中的金额-冻结金额",placement:"top-start"}},[i("i",{staticClass:"el-icon-question"})]),i("div",{staticClass:"center-i"},[i("i",{staticClass:"iconfont icon-withdraw"})]),i("div",{staticClass:"info"},[i("p",{staticClass:"type"},[t._v("可提现金额($)")]),i("div",{staticClass:"amount"},[t._v(t._s(t.withdrawAmount))])])],1)],1),i("el-col",{staticClass:"mg-b-20",attrs:{span:4}},[i("el-card",{staticClass:"amount-card"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"供应商申请提现中的金额",placement:"top-start"}},[i("i",{staticClass:"el-icon-question"})]),i("div",{staticClass:"center-i"},[i("i",{staticClass:"iconfont icon-withdrawaing"})]),i("div",{staticClass:"info"},[i("p",{staticClass:"type"},[t._v("提现中金额($)")]),i("div",{staticClass:"amount"},[t._v(t._s(t.withdrawing))])])],1)],1),i("el-col",{attrs:{span:4}},[i("el-card",{staticClass:"amount-card"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"供应商已提现的金额总和",placement:"top-start"}},[i("i",{staticClass:"el-icon-question"})]),i("div",{staticClass:"center-i"},[i("i",{staticClass:"el-icon-circle-check"})]),i("div",{staticClass:"info"},[i("p",{staticClass:"type"},[t._v("已提现金额($)")]),i("div",{staticClass:"amount"},[t._v(t._s(t.withdraw))])])],1)],1),i("el-col",{attrs:{span:4}},[i("el-card",{staticClass:"amount-card"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"包含订单金额冻结期内金额及平台冻结金额",placement:"top-start"}},[i("i",{staticClass:"el-icon-question"})]),i("div",{staticClass:"center-i"},[i("i",{staticClass:"iconfont icon-freeze"})]),i("div",{staticClass:"info"},[i("p",{staticClass:"type"},[t._v("冻结金额($)")]),i("div",{staticClass:"amount"},[t._v(t._s(t.frozen))])])],1)],1)],1),i("el-row",[i("el-col",{staticClass:"action-wrap",attrs:{span:24}},[i("el-button",{attrs:{type:"primary"},on:{click:t.openWithdraw}},[t._v("提现")])],1)],1)]:[i("div",{staticClass:"open-wrap"},[i("h2",[t._v("设置收款方式")]),i("h3",[t._v("支持在线支付：")]),i("el-row",{attrs:{gutter:15}},[i("el-col",{attrs:{span:8}},[i("el-card",[i("p",{staticClass:"msg"},[t._v("当您激活在线支付， 客户付款时会由OurMall进行代收， 付款金额会在您的钱包显示， 支持您进行提现。")]),i("div",{staticClass:"tx-right"},[i("el-button",{attrs:{type:"primary"},on:{click:t.openWallet}},[t._v("激活")])],1)])],1)],1)],1)],i("el-dialog",{staticClass:"dialog-withdraw",attrs:{title:"提现",visible:t.dialogWithdraw.isShow,width:"40%"},on:{"update:visible":function(a){return t.$set(t.dialogWithdraw,"isShow",a)}}},[i("el-divider"),1==t.dialogWithdraw.status?i("div",{staticClass:"dialog-body"},[i("div",{staticStyle:{padding:"15px 0","font-size":"16px"}},[t._v(" 每月"),i("b",{staticClass:"tx-danger"},[t._v("1")]),t._v("日、 "),i("b",{staticClass:"tx-danger"},[t._v("15")]),t._v("日可以提现 ")]),i("div",{staticClass:"content"},[i("el-form",{attrs:{"label-width":"120px"}},[i("h3",[t._v("提现方式")]),i("div",{staticClass:"d-flex mg-b-20"},[i("el-radio",{staticClass:"d-flex",staticStyle:{display:"flex"},attrs:{label:"2"},model:{value:t.dialogWithdraw.accountType,callback:function(a){t.$set(t.dialogWithdraw,"accountType",a)},expression:"dialogWithdraw.accountType"}},[i("span",{staticClass:"pay-logo alipay",class:{active:2==t.dialogWithdraw.accountType}})]),i("el-radio",{staticClass:"d-flex",staticStyle:{display:"flex"},attrs:{label:"1"},model:{value:t.dialogWithdraw.accountType,callback:function(a){t.$set(t.dialogWithdraw,"accountType",a)},expression:"dialogWithdraw.accountType"}},[i("span",{staticClass:"pay-logo paypal",class:{active:1==t.dialogWithdraw.accountType}})])],1),i("el-form-item",{staticClass:"mg-b-10",attrs:{label:"提现金额($)",required:""}},[i("el-input-number",{attrs:{min:50,max:t.withdrawAmount,precision:2,controls:!1},model:{value:t.dialogWithdraw.amount,callback:function(a){t.$set(t.dialogWithdraw,"amount",a)},expression:"dialogWithdraw.amount"}})],1),i("div",{staticClass:"mg-b-10 tx-warning"},[t._v(" 可提现金额： $"+t._s(t.withdrawAmount)+" (折合人民币约 ￥"+t._s(t.withdrawAmountCNY)+") ")]),i("div",{staticClass:"mg-b-20 tx-danger"},[t._v(" *最小提现额度为： $50， 最大为可提现金额 ")]),i("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"收款人",required:""}},[i("el-col",{attrs:{span:12}},[i("el-input",{model:{value:t.dialogWithdraw.name,callback:function(a){t.$set(t.dialogWithdraw,"name",a)},expression:"dialogWithdraw.name"}})],1)],1),i("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"收款账号",required:""}},[i("el-col",{attrs:{span:12}},[i("el-input",{model:{value:t.dialogWithdraw.account,callback:function(a){t.$set(t.dialogWithdraw,"account",a)},expression:"dialogWithdraw.account"}})],1)],1),i("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"验证方式",required:""}},[i("el-col",{attrs:{span:24}},[i("el-select",{staticClass:"mg-r-15",staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},model:{value:t.dialogWithdraw.tokenType,callback:function(a){t.$set(t.dialogWithdraw,"tokenType",a)},expression:"dialogWithdraw.tokenType"}},[i("el-option",{key:1,attrs:{label:"邮箱",value:1}},[t._v("邮箱")]),i("el-option",{key:2,attrs:{label:"手机",value:2}},[t._v("手机")])],1),i("b",{staticClass:"mg-r-20"},[t._v(t._s(t.mobile))]),i("el-button",{attrs:{type:"primary",disabled:!(t.mobile&&!t.sec),loading:t.dialogWithdraw.tokenLoading},on:{click:t.getSendToken}},[t.sec?i("span",[t._v("("+t._s(t.sec)+")秒后可重新获取验证码")]):i("span",[t._v("获取验证码")])])],1)],1),i("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"验证码",required:""}},[i("el-col",{staticClass:"mg-r-15",attrs:{span:10}},[i("el-input",{attrs:{width:"200"},model:{value:t.dialogWithdraw.token,callback:function(a){t.$set(t.dialogWithdraw,"token",a)},expression:"dialogWithdraw.token"}})],1)],1)],1)],1)]):t._e(),2==t.dialogWithdraw.status?i("div",{staticClass:"dialog-body success"},[i("div",{staticClass:"success-text"},[i("i",{staticClass:"el-icon-success"}),t._v("提交申请成功，请等待OurMall进行审核。")]),i("div",{staticClass:"account-info"},[i("h3",[t._v("收款账号")]),i("p",[t._v("提现方式："),i("span",[t._v(t._s(1==t.dialogWithdraw.accountType?"PayPal":"AliPay"))])]),i("p",[t._v("收款人："),i("span",[t._v(t._s(t.dialogWithdraw.name))])]),i("p",[t._v("收款账号："),i("span",[t._v(t._s(t.dialogWithdraw.account))])]),i("p",[t._v("金额($)："),i("span",[t._v(t._s(t.dialogWithdraw.amount))])])])]):t._e(),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[1==t.dialogWithdraw.status?i("el-button",{attrs:{loading:t.sendWithdrawalLoading,type:"primary"},on:{click:t.sendWithdrawal}},[t._v("确认")]):i("el-button",{on:{click:t.withdrawClose}},[t._v("关闭")])],1)],1),i("el-dialog",{staticClass:"dialog-open-wallet",attrs:{title:"您确定激活线上支付方式？",visible:t.dialogOpenWallet.isShow,width:"30%"},on:{"update:visible":function(a){return t.$set(t.dialogOpenWallet,"isShow",a)}}},[i("el-divider"),i("div",{staticClass:"dialog-body"},[i("p",[t._v("客户可以通过线上支付方式直接进行支付，划入您的OurMall钱包。")])]),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(a){t.dialogOpenWallet.isShow=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary",loading:t.dialogOpenWallet.loading},on:{click:t.sendOpenWallet}},[t._v("确定")])],1)],1)],2)},s=[],l=(i("e9c4"),i("b0c0"),i("a9e3"),{data:function(){return{loading:!1,dialogWithdraw:{isShow:!1,status:1,accountType:"2",amount:void 0,tokenType:1,account:"",name:"",tokenLoading:!1,token:""},dialogWithdrawDefault:"{}",balance:"0.00",withdrawAmount:"0.00",withdrawing:"0.00",withdraw:"0.00",frozen:"0.00",withdrawAmountCNY:"0.00",sec:0,time:0,sendWithdrawalLoading:!1,dialogOpenWallet:{isShow:!1,loading:!1}}},mounted:function(){this.dialogWithdrawDefault=JSON.stringify(this.dialogWithdraw),this.getSummary()},computed:{mobile:function(){var t=1==this.dialogWithdraw.tokenType?this.$store.state.userInfo.email:this.$store.state.userInfo.mobile;return t||""}},methods:{sendOpenWallet:function(){var t=this;this.dialogOpenWallet.loading=!0,this.$apiCall("api.User.openWallet",{},(function(a){"9999"==a.ErrorCode?(t.$message({message:"激活钱包成功",type:"success"}),setTimeout((function(){location.reload()}),1500)):t.$message({message:a.Message,type:"error"})}))},openWallet:function(){this.dialogOpenWallet.isShow=!0},withdrawClose:function(){this.getSummary(),this.dialogWithdraw.isShow=!1},sendWithdrawal:function(){var t=this;if(this.dialogWithdraw.amount)if(this.dialogWithdraw.name)if(this.dialogWithdraw.account)if(this.mobile)if(this.dialogWithdraw.token){this.sendWithdrawalLoading=!0;var a={account:this.dialogWithdraw.account,accountType:this.dialogWithdraw.accountType,name:this.dialogWithdraw.name,amount:this.dialogWithdraw.amount,token:this.dialogWithdraw.token,mobile:this.mobile};this.$apiCall("api.AccountPayment.withdrawal",a,(function(a){t.sendWithdrawalLoading=!1,"9999"==a.ErrorCode?(t.dialogWithdraw.status=2,t.getSummary()):t.$message({message:a.Message,type:"error"})}))}else this.$message({message:"请输入验证码",type:"error"});else this.$message({message:"请选择有效验证方式",type:"error"});else this.$message({message:"请输入收款账号",type:"error"});else this.$message({message:"请输入收款人",type:"error"});else this.$message({message:"请输入提现金额",type:"error"})},getSendToken:function(){var t=this;this.dialogWithdraw.tokenLoading=!0,this.$apiCall("api.AccountPayment.sendToken",{mobile:this.mobile},(function(a){t.dialogWithdraw.tokenLoading=!1,"9999"==a.ErrorCode?(t.$message({message:"验证码已发送到 ".concat(t.mobile),type:"success"}),t.sec=60,t.time=setInterval((function(){t.sec>0?t.sec--:(clearInterval(t.time),t.sec=0)}),1e3)):t.$message({message:a.Message,type:"error"})}))},openWithdraw:function(){this.dialogWithdraw=JSON.parse(this.dialogWithdrawDefault),this.time=0,this.sec=0,this.dialogWithdraw.isShow=!0},getSummary:function(){var t=this;this.$store.state.userInfo.walletOpen&&(this.loading=!0,this.$apiCall("api.AccountPayment.getSummary",{},(function(a){if(t.loading=!1,"9999"==a.ErrorCode){var i=a.Data.Results;t.balance=Number(i.balance)||"0.00",t.withdrawAmount=Number(i.withdrawAmount)||"0.00",t.withdrawing=Number(i.withdrawing)||"0.00",t.withdraw=Number(i.withdraw)||"0.00",t.frozen=Number(i.frozen)||"0.00",t.withdrawAmountCNY=Number(i.withdrawAmountCNY)||"0.00"}else t.$message({message:a.Message,type:"error"})})))}}}),o=l,n=(i("2d30"),i("2877")),r=Object(n["a"])(o,e,s,!1,null,"28a9b2be",null);a["default"]=r.exports}}]);