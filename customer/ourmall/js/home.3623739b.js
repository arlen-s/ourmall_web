(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"0473":function(t,s,a){"use strict";a("789b")},"0b7e":function(t,s,a){},"3c8f":function(t,s,a){"use strict";a("c2c3")},"48cf":function(t,s,a){},"4e69":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("el-dialog",{attrs:{"close-on-click-modal":!1,width:"600px",visible:t.data.isShow},on:{"update:visible":function(s){return t.$set(t.data,"isShow",s)}}},[a("div",{staticClass:"d-title",attrs:{slot:"title"},slot:"title"},[a("h3",[t._v("Welocome to "),a("span",[t._v(t._s(t.$root.$children[0].pName.b)+" App")])]),a("h4",[t._v("Create your "+t._s(t.$root.$children[0].pName.a)+" account here")])]),a("div",{staticClass:"body-wrap"},[a("form",{attrs:{id:"homeSignup",name:"signup"}},[a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{placeholder:"Please fill in your Email as your Username"},model:{value:t.data.email,callback:function(s){t.$set(t.data,"email",s)},expression:"data.email"}})],1),a("div",{staticClass:"ipt-box"},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start",content:"The password must contain letters, and numbers, Minimum 8 characters"}},[a("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please set your password"},model:{value:t.data.password,callback:function(s){t.$set(t.data,"password",s)},expression:"data.password"}})],1)],1),a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please confirm your password"},model:{value:t.data.rePassword,callback:function(s){t.$set(t.data,"rePassword",s)},expression:"data.rePassword"}})],1),a("div",{staticClass:"submit-box"},[a("el-button",{staticStyle:{"margin-right":"15px"},attrs:{loading:t.data.loading,type:"primary",disabled:t.data.isReadonly&&!t.sec},on:{click:t.register}},[t._v(" Create "+t._s(t.$root.$children[0].pName.a)+" Account ")]),a("span",{staticClass:" mg-r-5"},[t._v(t._s(t.$t("Already have an account?")))]),a("el-link",{attrs:{type:"primary"},on:{click:t.openSingIn}},[t._v(t._s(t.$t("Sign in")))])],1)]),a("el-divider",[a("span",[t._v(t._s(t.$t("or Sign in with")))])]),a("OtherLogin",{attrs:{platformArr:t.platformArr},on:{selectLogin:t.selectLogin}})],1)])],1)},i=[],o=(a("4d63"),a("ac1f"),a("25f0"),a("9b96")),r={props:["data","platformArr","sec"],data:function(){return{emailLoading:!1}},components:{OtherLogin:o["a"]},watch:{"data.isShow":function(){var t=this;this.data.isShow&&(setTimeout((function(){t.data.isReadonly=!1}),500),this.$refs.verify&&this.$refs.verify.reset())}},methods:{register:function(){this.$emit("register")},sendToken:function(){var t=this;this.emailLoading=!0,this.$Burying({object:"2002"}),this.$apiCall("api.User.sendToken",{mobile:this.data.email,lang:"EN"},(function(s){t.emailLoading=!1,9999==s.ErrorCode?(t.data.isReadonly=!1,t.$emit("resetSEC","signup")):(t.$refs.verify.reset(),t.$message({message:s.Message,type:"error"}))}))},verifySuccess:function(){this.data.email&&this.checkEmail()?this.sendToken():(this.$refs.verify.reset(),this.$message({message:"Please enter a valid Email.",type:"error"}))},openSingIn:function(){this.$emit("openSingIn")},checkEmail:function(){var t=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");return""!==this.data.email&&!!t.test(this.data.email)},selectLogin:function(t){this.$emit("selectLogin",t)}}},l=r,n=(a("3c8f"),a("2877")),c=Object(n["a"])(l,e,i,!1,null,"12edbfa9",null);s["a"]=c.exports},"634c":function(t,s,a){},"66a4":function(t,s,a){"use strict";a("e816")},"6aba":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("el-dialog",{attrs:{"close-on-click-modal":!1,title:"Sign In",width:"600px",visible:t.data.isShow},on:{"update:visible":function(s){return t.$set(t.data,"isShow",s)}}},[a("div",{staticClass:"body-wrap"},[a("div",{staticClass:" d-flex mg-b-15"},[t._v(" "+t._s(t.$t("No Account? "))+" "),a("el-link",{staticClass:" mg-l-10",attrs:{type:"primary"},on:{click:t.openSingUp}},[t._v(t._s(t.$t("Sign up here")))])],1),a("div",[a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{placeholder:"Email"},model:{value:t.data.email,callback:function(s){t.$set(t.data,"email",s)},expression:"data.email"}})],1),a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{placeholder:"Password","show-password":""},model:{value:t.data.password,callback:function(s){t.$set(t.data,"password",s)},expression:"data.password"}})],1),a("div",{staticClass:"submit-box"},[a("el-button",{staticStyle:{padding:"12px 40px"},attrs:{loading:t.data.loading,type:"primary"},on:{click:t.signIn}},[t._v(t._s(t.$t("Sign in")))]),a("el-link",{on:{click:t.forgotPS}},[t._v(t._s(t.$t("Forgot your password?")))])],1),a("el-divider",[a("span",[t._v(t._s(t.$t("or Sign in with")))])]),a("OtherLogin",{attrs:{platformArr:t.platformArr},on:{selectLogin:t.selectLogin}})],1)])])],1)},i=[],o=a("9b96"),r={props:["data","platformArr"],components:{OtherLogin:o["a"]},methods:{signIn:function(){this.$emit("signIn")},openSingUp:function(){this.$emit("openSingUp")},forgotPS:function(){this.$emit("forgotPS")},selectLogin:function(t){this.$emit("selectLogin",t)}}},l=r,n=(a("0473"),a("2877")),c=Object(n["a"])(l,e,i,!1,null,"7e4f3f34",null);s["a"]=c.exports},"789b":function(t,s,a){},9483:function(t,s,a){"use strict";a("48cf")},"9b96":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"other-login-box"},t._l(t.platformArr,(function(s,e){return a("div",{key:e,staticClass:"th-login-box"},["woo"!=e?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Sign in with "+s.name,placement:"top"}},[a("a",{class:[e,{disabled:!s.enabled}],attrs:{href:"javascript:;"},on:{click:function(s){return t.selectLogin(e)}}},[a("i"),t._v(" "+t._s(s.name)+" "),s.enabled?t._e():a("div",{staticClass:"cs"},[t._v(" Coming soon ")])])]):t._e()],1)})),0)},i=[],o={props:["platformArr"],methods:{selectLogin:function(t){var s="";switch(t){case"lazada":s="1008";break;case"shopify":s="1007";break;default:break}this.$Burying({object:s}),this.platformArr[t].enabled&&("shopify"==t?this.$router.push({name:"login",query:{platform:"shopify"}}):this.$emit("selectLogin",t))}}},r=o,l=(a("db08"),a("2877")),n=Object(l["a"])(r,e,i,!1,null,"6ebb6f9b",null);s["a"]=n.exports},a4d4:function(t,s,a){"use strict";a("634c")},a8a6:function(t,s,a){"use strict";a("0b7e")},bb51:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home-page"},[a("div",{staticClass:"home-header"},[a("h1"),a("ul",{staticClass:"home-nav"},[a("li",[a("router-link",{attrs:{to:{path:"/home"}}},[t._v(t._s(t.$t("Home")))])],1),a("li",[a("router-link",{attrs:{to:{path:"/products-market"}}},[t._v(t._s(t.$t("Products Market")))])],1),a("li",[a("router-link",{attrs:{to:{path:"/Waiting-for-allocated"}}},[t._v(t._s(t.$t("Request for Quote")))])],1),a("li",[a("a",{staticClass:"d-flex",on:{click:t.gotoMyImport}},[a("div",{staticClass:"import-but",attrs:{rel:"nofollow"}},[a("i",{staticClass:"el-icon-tickets",staticStyle:{"font-size":"24px","margin-right":"10px"}}),t.$store.state.userInfo?a("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),a("div",{staticClass:"btn-text",attrs:{rel:"nofollow"}},[t._v(" "+t._s(t.$t("Wait for import"))+" ")])])]),t.$store.state.userInfo?a("li",[a("el-dropdown",{on:{command:t.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[t._v(" My "+t._s(t.$root.$children[0].pName.a)+" "),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[a("i",{staticClass:"fa fa-tachometer",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("Dashboard"))+" ")]),a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"profile"}},[a("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("My Profile"))+" ")]),"/my"==t.$root.$children[0].baseUrl?[a("el-dropdown-item",{staticClass:"align-items-end-flex",staticStyle:{width:"150px"},attrs:{command:"wallet"}},[a("i",{staticClass:"mg-r-15 iconfont icon-qianbao",staticStyle:{"font-size":"14px"},attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("My Wallet"))+" ")])]:t._e(),a("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[a("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("Logout"))+" ")])],2)],1)],1):a("li",[a("a",{attrs:{href:"javascript:;"},on:{click:t.login}},[t._v(t._s(t.$t("LOGIN")))])])])]),a("div",{staticClass:"home-header2",class:{active:t.header2Visible}},[a("div",{staticClass:"content"},[a("h1"),a("ul",{staticClass:"home-nav"},[a("li",[a("router-link",{attrs:{to:{path:"/home"}}},[t._v(t._s(t.$t("Home")))])],1),a("li",[a("router-link",{attrs:{to:{path:"/products-market"}}},[t._v(t._s(t.$t("Products Market")))])],1),a("li",[a("router-link",{attrs:{to:{path:"/Waiting-for-allocated"}}},[t._v(t._s(t.$t("Request for Quote")))])],1),a("li",[a("a",{staticClass:"d-flex",on:{click:t.gotoMyImport}},[a("div",{staticClass:"import-but",attrs:{rel:"nofollow"}},[a("i",{staticClass:"el-icon-tickets",staticStyle:{"font-size":"24px","margin-right":"10px"}}),t.$store.state.userInfo?a("i",{staticClass:"badge"},[t._v(t._s(this.$root.$children[0].importNum>99?"99+":this.$root.$children[0].importNum))]):t._e()]),a("div",{staticClass:"btn-text",attrs:{rel:"nofollow"}},[t._v(" "+t._s(t.$t("Wait for import"))+" ")])])]),t.$store.state.userInfo?a("li",[a("el-dropdown",{on:{command:t.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[t._v(" My "+t._s(t.$root.$children[0].pName.a)+" "),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"dashboard"}},[a("i",{staticClass:"fa fa-tachometer",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("Dashboard"))+" ")]),a("el-dropdown-item",{staticClass:"align-items-endd-flex",staticStyle:{width:"150px"},attrs:{command:"profile"}},[a("i",{staticClass:"mg-r-15 fa fa-user-o",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("My Profile"))+" ")]),"/my"==t.$root.$children[0].baseUrl?[a("el-dropdown-item",{staticClass:"align-items-end-flex",staticStyle:{width:"150px"},attrs:{command:"wallet"}},[a("i",{staticClass:"mg-r-15 iconfont icon-qianbao",staticStyle:{"font-size":"14px"},attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("My Wallet"))+" ")])]:t._e(),a("el-dropdown-item",{staticClass:"d-flex",staticStyle:{width:"150px"},attrs:{command:"exit"}},[a("i",{staticClass:"mg-r-15 fa fa-sign-out",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("Logout"))+" ")])],2)],1)],1):a("li",[a("a",{attrs:{href:"javascript:;"},on:{click:t.login}},[t._v(t._s(t.$t("LOGIN")))])])])])]),a("div",{staticClass:"home-main"},[a("div",{staticClass:"card1"},[a("div",{staticClass:"content"},[a("div",{staticClass:"left"},[a("p",{staticClass:"row1"},[t._v(" "+t._s(t.$t("Allocate Orders for vendors"))),a("br"),t._v(" "+t._s(t.$t("and Automate"))+" "),a("br"),t._v(t._s(t.$t("your entire dropshipping process"))+" ")]),a("p",{staticClass:"row2"},[t._v(" "+t._s(t.$t("With just one click, you can easily allocate your stores orders to your vendors and the entire shipping process will be automatically completed."))+" ")]),a("LoginDropdown",{attrs:{loading:t.loading,platformArr:t.platformArr,activePlatform:t.activePlatform,shopUrl:t.shopUrl},on:{selectPlatform:t.selectPlatform,gotoLogin:t.gotoLogin}})],1),t._m(0)])]),a("div",{staticClass:"card2"},[a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v(t._s(t.$t("How does it work?")))]),a("ul",{staticClass:"step-li"},[a("li",[a("div",{staticClass:"img"}),a("div",{staticClass:"text"},[t._v("1. "+t._s(t.$t("Connect to your store")))])]),a("li",[a("div",{staticClass:"img"}),a("div",{staticClass:"text"},[t._v("2. "+t._s(t.$t("Allocate orders to your vendors")))])]),a("li",[a("div",{staticClass:"img"}),a("div",{staticClass:"text"},[t._v("3. "+t._s(t.$t("The vendor arranges the delivery")))])]),a("li",[a("div",{staticClass:"img"}),a("div",{staticClass:"text"},[t._v(" 4. "+t._s(t.$t("Automatic fulfillment of your orders by"))+" "+t._s(t.$root.$children[0].pName.a)+" ")])])])])]),a("div",{staticClass:"card3"},[a("div",{staticClass:"content"},[a("div",{staticClass:"text"},[a("div",{staticClass:"r1"},[t._v(" "+t._s(t.$t("See what our"))+" "),a("br"),t._v(" "+t._s(t.$t("customers talk about us."))+" ")]),a("div",{staticClass:"r2"},[t._v(" "+t._s(t.$t("More than 10,000+ customers around the world rely on us!"))+" ")])]),a("div",{staticClass:"img"})])]),a("div",{staticClass:"card4"},[a("div",{staticClass:"content"},[a("div",{staticClass:"img"}),a("div",{staticClass:"ipt"},[a("LoginDropdown",{attrs:{loading:t.loading,platformArr:t.platformArr,activePlatform:t.activePlatform,shopUrl:t.shopUrl},on:{selectPlatform:t.selectPlatform,gotoLogin:t.gotoLogin}})],1)])])]),a("Footer"),a("DialogSignin",{attrs:{data:t.dialogSignin,platformArr:t.platformArr},on:{openSingUp:t.openSingUp,signIn:t.signIn,forgotPS:t.openForgotPS,selectLogin:t.selectLogin}}),a("DialogSignUp",{ref:"dialogSingUp",attrs:{data:t.dialogSignup,platformArr:t.platformArr,sec:t.emailCountDownSec.signup},on:{resetSEC:t.resetSEC,openSingIn:t.openSingIn,register:t.register,selectLogin:t.selectLogin}}),a("DialogForgotPsd",{ref:"dialogForgotPsd",attrs:{data:t.dialogForgotPsd,sec:t.emailCountDownSec.forgot},on:{resetSEC:t.resetSEC,saveNewPSD:t.saveNewPSD}}),a("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"right"},[e("div",{staticClass:"home-image"},[e("img",{attrs:{src:a("e5c4")}})])])}],o=a("ade3"),r=a("1419"),l=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home-reg"},[a("div",{staticClass:"row3"},[a("el-dropdown",{staticClass:"select-p",on:{command:t.selectPlatform}},[a("div",{staticClass:"el-dropdown-link d-flex"},[a("i",{staticClass:"p-icon mg-r-5",class:t.activePlatform}),a("span",{staticClass:" mg-r-5"},[t._v(t._s(t.platformArr[t.activePlatform].name))]),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.platformArr,(function(s,e){return a("el-dropdown-item",{key:e,attrs:{command:e}},[a("div",{staticClass:" d-flex"},[a("i",{staticClass:"p-icon",class:e}),t._v(" "+t._s(s.name)+" ")])])})),1)],1),"shopify"==t.activePlatform?[a("input",{directives:[{name:"model",rawName:"v-model",value:t.shopUrlTxt,expression:"shopUrlTxt"}],attrs:{type:"text",placeholder:t.$t("Store name")},domProps:{value:t.shopUrlTxt},on:{keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.gotoLogin(s)},input:function(s){s.target.composing||(t.shopUrlTxt=s.target.value)}}}),a("span",[t._v(".myshopify.com")])]:t._e(),t.platformArr[t.activePlatform].enabled?a("el-button",{staticClass:"login-btn",attrs:{loading:t.loading},on:{click:t.gotoLogin}},[t._v("Connect to "+t._s(t.$root.$children[0].pName.a))]):a("el-button",{attrs:{disabled:!0}},[t._v("Coming soon ")])],2)])},n=[],c={props:["loading","platformArr","activePlatform","shopUrl"],data:function(){return{shopUrlTxt:""}},mounted:function(){this.shopUrlTxt=this.shopUrl},watch:{shopUrl:function(){this.shopUrlTxt=this.shopUrl}},methods:{selectPlatform:function(t){this.loading||this.$emit("selectPlatform",t)},gotoLogin:function(){this.platformArr[this.activePlatform].enabled&&this.$emit("gotoLogin",this.shopUrlTxt)}}},d=c,g=(a("66a4"),a("2877")),m=Object(g["a"])(d,l,n,!1,null,"1de298c8",null),p=m.exports,u=a("6aba"),h=a("4e69"),f=a("beba"),v=a("c8cc"),w={data:function(){var t;return t={header2Visible:!1,loading:!1,time:0,shopUrl:"",platformArr:this.$dict.platformArr,activePlatform:"shopify",dialogSignin:{isShow:!1,loading:!1,email:"",password:""},dialogSigninDefault:"{}",dialogSignup:{isShow:!1,loading:!1,email:"",captcha:"",password:"",rePassword:"",isReadonly:!0},dialogSignupDefault:"{}",emailCountDownSec:{signup:0,forgot:0},emailCountDownTime:{signup:0,forgot:0},dialogForgotPsd:{isShow:!1,loading:!1,email:"",captcha:"",password:"",rePassword:"",isReadonly:!0},dialogForgotPsdDefault:"{}",forgotPsdCountDownSec:0,forgetPsdCountDownTime:0},Object(o["a"])(t,"time",0),Object(o["a"])(t,"win",null),Object(o["a"])(t,"c_apiShopId",JSON.parse(localStorage.getItem("c_apiShopId"))),t},components:{DialogSignin:u["a"],DialogSignUp:h["a"],DialogForgotPsd:f["a"],LoginDropdown:p,Footer:v["a"]},mounted:function(){var t=this;"signup"==this.$route.query.action&&setTimeout((function(){t.login()}),2e3),this.dialogSigninDefault=JSON.stringify(this.dialogSignin),this.dialogSignupDefault=JSON.stringify(this.dialogSignup),this.dialogForgotPsdDefault=JSON.stringify(this.dialogForgotPsd),this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin(),this.header2Visible=$(window).scrollTop()>70,$(window).scroll((function(){t.header2Visible=$(window).scrollTop()>70})),"woo"==this.$route.params.login&&this.openSingIn()},created:function(){Object(r["a"])("invitationCode")&&localStorage.setItem("invitationCode",Object(r["a"])("invitationCode"))},methods:{gotoMyImport:function(){this.$store.state.userInfo?window.location.href="/my/import-list":(this.$Burying({object:"1001",objectUrl:"/my/import-list"}),this.$router.push({path:"/login"}))},saveNewPSD:function(){var t=this;if(this.dialogForgotPsd.email)if(this.dialogForgotPsd.captcha)if(this.dialogForgotPsd.password)if(this.dialogForgotPsd.password==this.dialogForgotPsd.rePassword){var s=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;s.test(this.dialogForgotPsd.password)?(this.dialogForgotPsd.loading=!0,this.$apiCall("api.User.resetPassword",{mobile:this.dialogForgotPsd.email,token:this.dialogForgotPsd.captcha,newPassword:this.dialogForgotPsd.password,repeatNewPassword:this.dialogForgotPsd.rePassword},(function(s){t.dialogForgotPsd.loading=!1,9999==s.ErrorCode?(t.$message({message:t.$t("Password reset successful"),type:"success"}),t.openSingIn(t.dialogForgotPsd.email,t.dialogForgotPsd.password)):t.$message({message:s.Message,type:"error"})}))):this.$message({message:this.$("The password must contain letters, and numbers, Minimum 8 characters"),type:"error"})}else this.$message({message:this.$t("The new password and confirm password must be the same"),type:"error"});else this.$message({message:this.$t("New password must be filled in"),type:"error"});else this.$message({message:this.$t("CAPTCHA must be filled in"),type:"error"});else this.$message({message:this.$t("Email must be filled in"),type:"error"})},openForgotPS:function(){this.dialogSignin.isShow=!1,this.dialogForgotPsd=JSON.parse(this.dialogForgotPsdDefault),this.dialogForgotPsd.isShow=!0},signIn:function(){var t=this;this.dialogSignin.email?this.dialogSignin.password?(this.$Burying({object:"1002"}),this.dialogSignin.loading=!0,this.$apiCall("api.User.login",{username:this.dialogSignin.email,password:this.dialogSignin.password,type:1,lang:"EN"},(function(s){t.dialogSignin.loading=!1,9999==s.ErrorCode?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserToken",s.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",s.Data.Results.id),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(s.Data.Results)),t.$store.commit("setUserInfo",s.Data.Results),t.$Burying({object:"1005"}),localStorage.getItem("c_wantVisitPath")?t.$router.push({path:localStorage.getItem("c_wantVisitPath")}):t.$router.push({name:"dashboard"}),t.dialogSignin.isShow=!1):(t.$message({message:s.Message,type:"error"}),t.$Burying({object:"1006"}))}))):this.$message({message:this.$t("Password must be filled in"),type:"error"}):this.$message({message:this.$t("Email must be filled in"),type:"error"})},register:function(){var t=this;if(this.dialogSignup.email)if(this.dialogSignup.password)if(this.dialogSignup.password==this.dialogSignup.rePassword){var s=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;s.test(this.dialogSignup.password)?(this.dialogSignup.loading=!0,this.$Burying({object:"2001"}),this.$apiCall("api.User.register",{username:this.dialogSignup.email,password:this.dialogSignup.password,notCheckCode:!0,type:1,lang:"EN"},(function(s){t.dialogSignup.loading=!1,"9999"==s.ErrorCode?(t.openSingIn(t.dialogSignup.email,t.dialogSignup.password),t.$Burying({object:"2004"})):(t.$message({message:s.Message,type:"error"}),t.$Burying({object:"2005"}))}))):this.$message({message:this.$t("The password must contain letters, and numbers, Minimum 8 characters"),type:"error"})}else this.$message({message:this.$t("The password and confirm password must be the same"),type:"error"});else this.$message({message:this.$t("Password must be filled in"),type:"error"});else this.$message({message:this.$t("Email must be filled in"),type:"error"})},resetSEC:function(t){this.emailCountDownSec[t]=60,this.emailCountDown(t)},emailCountDown:function(t){var s=this;clearInterval(this.emailCountDownTime[t]),this.emailCountDownTime[t]=setInterval((function(){s.emailCountDownSec[t]--,s.emailCountDownSec[t]<1&&(clearInterval(s.emailCountDownTime[t]),"signup"==t?s.$refs.dialogSingUp.$refs.verify.reset():"forgot"==t&&s.$refs.dialogForgotPsd.$refs.verify.reset())}),1e3)},openSingUp:function(){this.$Burying({object:"1003"}),this.dialogSignin.isShow=!1;var t="";this.emailCountDownSec.signup&&(t=this.dialogSignup.email),this.dialogSignup=JSON.parse(this.dialogSignupDefault),this.dialogSignup.email=t,this.dialogSignup.isShow=!0},openSingIn:function(t,s){this.$Burying({object:"1001"}),this.dialogSignup.isShow=!1,this.dialogForgotPsd.isShow=!1,this.dialogSignin=JSON.parse(this.dialogSigninDefault),this.dialogSignin.isShow=!0,t&&(this.dialogSignin.email=t),s&&(this.dialogSignin.password=s)},selectPlatform:function(t){this.activePlatform=t},handleCommand:function(t){switch(t){case"exit":localStorage.removeItem("c_wantVisitPath"),this.$Logout("/");break;case"profile":this.$router.push({name:"profile"});break;case"dashboard":if(121173==this.c_apiShopId){var s=JSON.parse(localStorage.getItem("isValidationCW"));if(!s)return void(this.isValidationCWDialog=!0)}this.$router.push({name:"dashboard"});break;case"wallet":if("/my"!=this.baseUrl)return;this.$router.push({name:"wallet"})}},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.openSingIn()},selectLogin:function(t){this.activePlatform=t,this.gotoLogin()},gotoLogin:function(t){switch(this.activePlatform){case"shopify":this.shopUrl=t,localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl,platform:this.activePlatform}}):this.loginPlatform(this.activePlatform,this.shopUrl);break;case"lazada":localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,platform:this.activePlatform}}):this.loginPlatform(this.activePlatform);break;case"shopee":break;case"woo":localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,platform:this.activePlatform}}):this.login();break}},loginPlatform:function(t,s){var a=this;if("shopify"==t){if(!s)return this.$elementMessage(this.$t("Please enter Shopify store name"),"error"),!1;this.win=window.open("/blank.html","Shopify"),this.loading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:s,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(t){"9999"==t.ErrorCode?(a.win.location=t.Data.Results,a.time=setInterval((function(){a.getLoginStatus()}),2e3)):a.$elementMessage(t.Message,"error")}))}else{var e;this.win=window.open("/blank.html","platformLogin"),this.loading=!0,"lazada"==t&&(e=3),this.$apiCall("api.ShopifyAccount.addOtherAccount",{platform:e,ati:this.$getCookie("_ati"),ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(t){"9999"==t.ErrorCode?(a.win.location=t.Data.Results.url,a.time=setInterval((function(){a.getLoginStatus(t.Data.Results.state)}),2e3)):a.$elementMessage(t.Message,"error")}))}},getLoginStatus:function(t){var s=this;this.win.closed&&(this.loading=!1,clearInterval(this.time));var a={};"shopify"==this.activePlatform&&(a.shopUrl=this.shopUrl),"lazada"==this.activePlatform&&(a.state=t),this.$apiCall("api.ShopifyAccount.getShopAuthStatus",a,(function(t){"9999"==t.ErrorCode?t.Data.Results.status&&(clearInterval(s.time),1==t.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",t.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",t.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(t.Data.Results.userInfo)),s.$store.commit("setUserInfo",t.Data.Results.userInfo),localStorage.getItem("c_wantVisitPath")?s.$router.push({path:localStorage.getItem("c_wantVisitPath")}):s.$router.push({name:"dashboard"}),sessionStorage.getItem("c_ourmallInviteCode")?s.$apiCall("api.User.checkInvite",{inviteCode:sessionStorage.getItem("c_ourmallInviteCode")},(function(t){s.win.close()})):s.win.close()):(s.loading=!1,s.$message({type:"error",duration:0,message:t.Data.Results.errorMessage,showClose:!0}),s.win.close())):(clearInterval(s.time),s.$elementMessage(t.Message,"error"))}))}}},S=w,C=(a("a4d4"),Object(g["a"])(S,e,i,!1,null,"fb9c1446",null));s["default"]=C.exports},beba:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("el-dialog",{attrs:{"close-on-click-modal":!1,width:"600px",visible:t.data.isShow,title:"Change password"},on:{"update:visible":function(s){return t.$set(t.data,"isShow",s)}}},[a("div",{staticClass:"body-wrap"},[a("form",{attrs:{id:"homeForgotPSD",name:"forgotPSD"}},[a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{placeholder:"Please fill in your Email as your Username"},model:{value:t.data.email,callback:function(s){t.$set(t.data,"email",s)},expression:"data.email"}})],1),a("vue-simple-verify",{ref:"verify",staticStyle:{"margin-bottom":"15px"},attrs:{width:560,movedColor:"#67C23A",tips:"Slide to get your CAPTCHA",successTips:t.emailLoading?"Loading...":"Validation passed. try again in "+t.sec+" seconds"},on:{success:t.verifySuccess}}),a("div",{staticClass:"ipt-box d-flex"},[a("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,name:"captcha",placeholder:"Please fill in the CAPTCHA you received"},model:{value:t.data.captcha,callback:function(s){t.$set(t.data,"captcha",s)},expression:"data.captcha"}})],1),a("div",{staticClass:"ipt-box"},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start",content:"The password must contain letters, and numbers, Minimum 8 characters"}},[a("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please set your new password"},model:{value:t.data.password,callback:function(s){t.$set(t.data,"password",s)},expression:"data.password"}})],1)],1),a("div",{staticClass:"ipt-box"},[a("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please confirm your new password"},model:{value:t.data.rePassword,callback:function(s){t.$set(t.data,"rePassword",s)},expression:"data.rePassword"}})],1)],1)]),a("el-divider"),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(s){t.data.isShow=!1}}},[t._v(t._s(t.$t("Discard")))]),a("el-button",{attrs:{loading:t.data.loading,disabled:t.data.isReadonly&&!t.sec,type:"primary"},on:{click:t.saveNewPSD}},[t._v(t._s(t.$t("Confirm")))])],1)],1)},i=[],o=(a("4d63"),a("ac1f"),a("25f0"),{props:["data","sec"],data:function(){return{emailLoading:!1}},watch:{"data.isShow":function(){var t=this;this.data.isShow&&setTimeout((function(){t.data.isReadonly=!1}),500)}},methods:{saveNewPSD:function(){this.$emit("saveNewPSD")},sendToken:function(){var t=this;this.emailLoading=!0,this.$apiCall("api.User.sendToken",{mobile:this.data.email,reset:!0,lang:"EN"},(function(s){t.emailLoading=!1,9999==s.ErrorCode?(t.data.isReadonly=!1,t.$emit("resetSEC","forgot")):(t.$refs.verify.reset(),t.$message({message:s.Message,type:"error"}))}))},verifySuccess:function(){this.data.email&&this.checkEmail()?this.sendToken():(this.$refs.verify.reset(),this.$message({message:"Please enter a valid Email.",type:"error"}))},checkEmail:function(){var t=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");return""!==this.data.email&&!!t.test(this.data.email)}}}),r=o,l=(a("a8a6"),a("2877")),n=Object(l["a"])(r,e,i,!1,null,"67496430",null);s["a"]=n.exports},bf92:function(t,s,a){},c2c3:function(t,s,a){},c8cc:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home-footer"},[a("div",{staticClass:"content"},[a("div",{staticClass:"left"},[a("p",{staticClass:"r1"},[t._v("Make dropshipping easy with "+t._s(t.$root.$children[0].pName.a)+".")]),a("p",{staticClass:"r2"},[t._v(" Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed. ")]),t._m(0)]),a("div",{staticClass:"right"},[a("ul",[a("li",{staticStyle:{"margin-right":"70px"}},[a("div",{staticClass:"t"},[t._v("Company")]),a("div",{staticClass:"m"},[a("router-link",{attrs:{to:{name:"privacy"}}},[t._v("Privacy policy")]),a("router-link",{attrs:{to:{name:"terms"}}},[t._v("Terms of use")]),a("router-link",{attrs:{to:{name:"contact"}}},[t._v("Contact Us")])],1)]),a("li",{staticStyle:{margin:"0"}},[a("div",{staticClass:"t"},[t._v("Getting Started")]),a("div",{staticClass:"m"},[a("router-link",{attrs:{to:{path:"/article/How-to-install-OurMall-Dropshipping-App?",query:{id:3}}}},[t._v("How to install "+t._s(t.$root.$children[0].pName.a)+"?")]),a("router-link",{attrs:{to:{path:"/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?",query:{id:5}}}},[t._v("How to allocate my orders?")]),a("router-link",{attrs:{to:{path:"/article/How-to-auto-fulfill-orders?",query:{id:6}}}},[t._v("How to auto fulfill orders?")]),a("router-link",{attrs:{to:{path:"/article/Connect-several-Shopify-stores-in-one-OurMall-account",query:{id:7}}}},[t._v("Connect several Shopify stores")])],1)])])])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"footer-logo"},[a("div",{staticClass:"copyright"},[t._v(" © 2023, Powered by OurMall ")])])}],o=(a("9483"),a("2877")),r={},l=Object(o["a"])(r,e,i,!1,null,"29ea576c",null);s["a"]=l.exports},db08:function(t,s,a){"use strict";a("bf92")},e5c4:function(t,s,a){t.exports=a.p+"img/home-image.7e1411ad.png"},e816:function(t,s,a){}}]);
//# sourceMappingURL=home.3623739b.js.map