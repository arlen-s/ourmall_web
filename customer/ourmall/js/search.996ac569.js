(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["search"],{"03d5":function(t,e,s){},"26e7":function(t,e,s){"use strict";s("03d5")},"43e4":function(t,e,s){"use strict";s("7d26")},"4e22":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home-page"},[t.code&&t.code.header&&t.code.header.length>0?t._l(t.code.header,(function(e,i){return s("div",{key:i,domProps:{innerHTML:t._s(e)}})})):t._e(),s("div",{staticStyle:{position:"relative"}},[s("DHeader",{attrs:{data:t.setting&&t.setting.header||"",headerMenu:t.headerMenu}})],1),s("div",{staticClass:"contentpanel search-product",style:{paddingTop:t.$store.state.configJson.sort.length&&"slider"!=t.$store.state.configJson.sort[0].type||!t.$store.state.configJson.header.isTransparent?t.$store.state.configJson.header.logoWidth+"px":"120px"}},[s("div",{staticClass:"breadcrum"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("Home")]),s("el-breadcrumb-item",[t._v("Search Products")])],1),s("el-link",{staticClass:"history",attrs:{type:"primary"},on:{click:t.goHistory}},[t._v("History")])],1),s("div",{staticClass:"publish"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.publishForm,rules:t.publishRules,"label-width":"140px"}},[s("el-form-item",{attrs:{label:"Picture:",prop:"imgUrl"}},[s("el-input",{staticStyle:{display:"none"},model:{value:t.publishForm.imgUrl,callback:function(e){t.$set(t.publishForm,"imgUrl",e)},expression:"publishForm.imgUrl"}}),s("el-upload",{ref:"upload",attrs:{action:"",limit:5,"list-type":"picture-card","before-upload":t.onBeforeUpload,"http-request":t.Upload,"on-remove":t.handleRemove}},[s("i",{staticClass:"el-icon-plus"})]),s("div",[t._v("You can only upload 5 pictures")])],1),s("el-form-item",{attrs:{label:"Product Title:",prop:"title"}},[s("el-input",{attrs:{size:"small"},on:{focus:t.loginOrNot},model:{value:t.publishForm.title,callback:function(e){t.$set(t.publishForm,"title",e)},expression:"publishForm.title"}})],1),s("el-row",[s("el-col",{attrs:{span:6}},[s("el-form-item",{attrs:{label:"Price Range:",prop:"priceFrom"}},[s("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},on:{focus:t.loginOrNot},model:{value:t.publishForm.priceFrom,callback:function(e){t.$set(t.publishForm,"priceFrom",e)},expression:"publishForm.priceFrom"}})],1)],1),s("el-col",{attrs:{span:17}},[s("el-form-item",{attrs:{label:"——",prop:"priceTo"}},[s("el-input",{staticStyle:{width:"100px"},attrs:{type:"number",size:"small"},on:{focus:t.loginOrNot},model:{value:t.publishForm.priceTo,callback:function(e){t.$set(t.publishForm,"priceTo",e)},expression:"publishForm.priceTo"}}),s("span",{staticStyle:{color:"#ccc"}},[t._v(" $ *Price units default to US dollars ")])],1)],1)],1),s("el-form-item",{attrs:{label:"Product Links:"}},[s("el-input",{attrs:{size:"small"},on:{focus:t.loginOrNot},model:{value:t.publishForm.link,callback:function(e){t.$set(t.publishForm,"link",e)},expression:"publishForm.link"}})],1),s("el-form-item",{attrs:{label:"Product Description:"}},[s("el-input",{attrs:{type:"textarea",size:"small",rows:4},on:{focus:t.loginOrNot},model:{value:t.publishForm.description,callback:function(e){t.$set(t.publishForm,"description",e)},expression:"publishForm.description"}})],1)],1),s("div",{staticClass:"search-btn"},[s("el-button",{attrs:{type:"primary"},on:{click:t.publish}},[t._v("Publish")])],1)],1)]),s("DFooter",{attrs:{setting:t.$store.state.configJson&&t.$store.state.configJson.footer||""}}),t.code&&t.code.footer&&t.code.footer.length>0?t._l(t.code.footer,(function(e,i){return s("div",{key:i,domProps:{innerHTML:t._s(e)}})})):t._e(),s("DialogSignin",{attrs:{data:t.dialogSignin,platformArr:t.platformArr},on:{openSingUp:t.openSingUp,signIn:t.signIn,forgotPS:t.openForgotPS,selectLogin:t.selectLogin}}),s("DialogSignUp",{ref:"dialogSingUp",attrs:{data:t.dialogSignup,platformArr:t.platformArr,sec:t.emailCountDownSec.signup},on:{resetSEC:t.resetSEC,openSingIn:t.openSingIn,register:t.register,selectLogin:t.selectLogin}}),s("DialogForgotPsd",{ref:"dialogForgotPsd",attrs:{data:t.dialogForgotPsd,sec:t.emailCountDownSec.forgot},on:{resetSEC:t.resetSEC,saveNewPSD:t.saveNewPSD}}),s("el-backtop",{staticClass:"goto-top",attrs:{right:32,bottom:120}})],2)},o=[],a=(s("a4d3"),s("e01a"),s("caad"),s("a434"),s("d3b7"),s("ac1f"),s("2532"),s("466d"),s("1276"),s("9911"),s("159b"),s("5530")),r=s("ade3"),n=s("6aba"),l=s("4e69"),c=s("beba"),d=s("8214"),u=s("d8f7"),g={props:{},data:function(){var t,e=function(t,e,s){if(!e)return s(new Error("Please enter price"));s()};return t={setting:null,code:{header:[],footer:[]},headerMenu:[],loginLoading:!1,loading:!1,time:0,shopUrl:"",platformArr:this.$dict.platformArr,activePlatform:"shopify",dialogSignin:{isShow:!1,loading:!1,email:"",password:""},dialogSigninDefault:"{}",dialogSignup:{isShow:!1,loading:!1,email:"",captcha:"",password:"",rePassword:"",isReadonly:!0},dialogSignupDefault:"{}",emailCountDownSec:{signup:0,forgot:0},emailCountDownTime:{signup:0,forgot:0},dialogForgotPsd:{isShow:!1,loading:!1,email:"",captcha:"",password:"",rePassword:"",isReadonly:!0},dialogForgotPsdDefault:"{}",forgotPsdCountDownSec:0,forgetPsdCountDownTime:0,win:null,input:"",select:null,titName:"",name:"",status:0,page:1,isRun:!1,commodityType:null,publishForm:{imgUrl:"",title:"",priceFrom:"",priceTo:"",link:"",description:""},publishRules:{imgUrl:[{required:!0,message:"Please upload pictures"}],title:[{required:!0,message:"Please enter title"}],priceFrom:[{required:!0,message:"Please enter price",trigger:"blur"}],priceTo:[{validator:e,trigger:"blur"}]}},Object(r["a"])(t,"loading",!1),Object(r["a"])(t,"base64",""),Object(r["a"])(t,"ext",""),Object(r["a"])(t,"file",null),Object(r["a"])(t,"fileList",[]),Object(r["a"])(t,"index",0),t},components:{DialogSignin:n["a"],DialogSignUp:l["a"],DialogForgotPsd:c["a"],DHeader:d["a"],DFooter:u["a"]},beforeDestroy:function(){clearInterval(this.time)},created:function(){},mounted:function(){this.getItem(),this.dialogSigninDefault=JSON.stringify(this.dialogSignin),this.dialogSignupDefault=JSON.stringify(this.dialogSignup),this.dialogForgotPsdDefault=JSON.stringify(this.dialogForgotPsd),this.$route.hash&&this.$route.hash.indexOf("utm_source")>-1&&this.$store.state.userInfo,this.$root.$children[0].getParentUrl()&&this.$root.$children[0].getParentUrl().indexOf("vendor")>=0||this.$root.$children[0].checkLogin()},methods:{getItem:function(){var t=this;this.$apiCall("api.VendorShop.getShopConfig",{},(function(e){t.loading=!1,9999==e.ErrorCode?0!==e.Data.Results.length?(e.Data.Results.header.activeMenu&&e.Data.Results.menu.forEach((function(s){s.id==e.Data.Results.header.activeMenu&&(t.headerMenu=s)})),t.$store.commit("getStoreComponent",e.Data.Results),t.setting=e.Data.Results,t.setting&&t.setting.customCode&&t.setting.customCode.length&&t.setting.customCode.forEach((function(e){e.pages.includes("商品列表页")&&("底部"==e.position&&t.code.footer.push(e.desc),"顶部"==e.position&&t.code.header.push(e.desc))})),localStorage.setItem("c_shopConfigJson",JSON.stringify(e.Data.Results))):t.setting=JSON.parse(JSON.stringify(t.$store.state.configJson)):t.$message({message:e.Message,type:"error"})}))},goHistory:function(){this.$router.push({path:"/search-select"})},loginOrNot:function(){this.$store.state.userInfo||this.openSingIn()},publish:function(){var t=this,e=!1;if(this.$refs["ruleForm"].validate((function(t){t&&(e=!0)})),e){var s=[];this.fileList.forEach((function(t){s.push(t.imgUrl)}));var i={url:this.publishForm.link,name:this.publishForm.title,minPrice:this.publishForm.priceFrom,maxPrice:this.publishForm.priceTo,description:this.publishForm.description,imgUrlJson:s};this.$apiCall("api.OfferProduct.addByCustomer",Object(a["a"])({},i),(function(e){9999==e.ErrorCode&&(t.publishForm={title:"",priceFrom:"",priceTo:"",link:"",description:"",imgUrl:""},t.$refs.upload.clearFiles(),t.$refs["ruleForm"].resetFields(),t.fileList=[],t.$message({message:"publish Success!",type:"success"}),t.$router.push({path:"/search-reply"}))}))}},handleRemove:function(t){var e=this;this.fileList.forEach((function(s,i){s.index==t.uid&&e.fileList.splice(i,1)})),0==this.fileList.length&&(this.publishForm.imgUrl="")},onBeforeUpload:function(t){this.file=t,this.index=t.uid},Upload:function(){var t=this,e=this.file,s=function(t){return new Promise((function(e,s){var i=new FileReader;i.readAsDataURL(t),i.onload=function(t){e(this.result)}}))};s(e).then((function(e){var s=e,i=s.match(/data:image\/(.*);base64,.*/);t.ext=i[1],t.base64=s.split("base64,").pop(),t.$apiCall("api.User.uploadImgBase64",{imgUrlBase64:t.base64,ext:t.ext},(function(e){9999==e.ErrorCode&&(t.fileList.push({index:t.index,imgUrl:e.Data.Results.imgUrl}),t.publishForm.imgUrl=e.Data.Results.imgUrl,t.index++)}))}))},saveNewPSD:function(){var t=this;if(this.dialogForgotPsd.email)if(this.dialogForgotPsd.captcha)if(this.dialogForgotPsd.password)if(this.dialogForgotPsd.password==this.dialogForgotPsd.rePassword){var e=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;e.test(this.dialogForgotPsd.password)?(this.dialogForgotPsd.loading=!0,this.$apiCall("api.User.resetPassword",{mobile:this.dialogForgotPsd.email,token:this.dialogForgotPsd.captcha,newPassword:this.dialogForgotPsd.password,repeatNewPassword:this.dialogForgotPsd.rePassword},(function(e){t.dialogForgotPsd.loading=!1,9999==e.ErrorCode?(t.$message({message:"Password reset successful",type:"success"}),t.openSingIn(t.dialogForgotPsd.email,t.dialogForgotPsd.password)):t.$message({message:e.Message,type:"error"})}))):this.$message({message:"The password must contain letters, and numbers, Minimum 8 characters",type:"error"})}else this.$message({message:"The new password and confirm password must be the same",type:"error"});else this.$message({message:"New password must be filled in",type:"error"});else this.$message({message:"CAPTCHA must be filled in",type:"error"});else this.$message({message:"Email must be filled in",type:"error"})},openForgotPS:function(){this.dialogSignin.isShow=!1,this.dialogForgotPsd=JSON.parse(this.dialogForgotPsdDefault),this.dialogForgotPsd.isShow=!0},signIn:function(){var t=this;this.dialogSignin.email?this.dialogSignin.password?(this.$Burying({object:"1002"}),this.dialogSignin.loading=!0,this.$apiCall("api.User.login",{username:this.dialogSignin.email,password:this.dialogSignin.password,type:1,lang:"EN"},(function(e){t.dialogSignin.loading=!1,9999==e.ErrorCode?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("apiUserToken",e.Data.Results.apiUserToken),localStorage.setItem("c_apiUserId",e.Data.Results.id),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results)),t.$store.commit("setUserInfo",e.Data.Results),t.$Burying({object:"1005"}),localStorage.getItem("c_wantVisitPath")?t.$router.push({path:localStorage.getItem("c_wantVisitPath")}):t.$router.push({name:"dashboard"}),t.dialogSignin.isShow=!1):(t.$message({message:e.Message,type:"error"}),t.$Burying({object:"1006"}))}))):this.$message({message:"Password must be filled in",type:"error"}):this.$message({message:"Email must be filled in",type:"error"})},register:function(){var t=this;if(this.dialogSignup.email)if(this.dialogSignup.captcha)if(this.dialogSignup.password)if(this.dialogSignup.password==this.dialogSignup.rePassword){var e=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;e.test(this.dialogSignup.password)?(this.$Burying({object:"2001"}),this.dialogSignup.loading=!0,this.$apiCall("api.User.register",{username:this.dialogSignup.email,password:this.dialogSignup.password,code:this.dialogSignup.captcha,type:1,lang:"EN"},(function(e){t.dialogSignup.loading=!1,"9999"==e.ErrorCode?(t.openSingIn(t.dialogSignup.email,t.dialogSignup.password),t.$Burying({object:"2004"})):(t.$message({message:e.Message,type:"error"}),t.$Burying({object:"2005"}))}))):this.$message({message:"The password must contain letters, and numbers, Minimum 8 characters",type:"error"})}else this.$message({message:"The password and confirm password must be the same",type:"error"});else this.$message({message:"Password must be filled in",type:"error"});else this.$message({message:"CAPTCHA must be filled in",type:"error"});else this.$message({message:"Email must be filled in",type:"error"})},resetSEC:function(t){this.emailCountDownSec[t]=60,this.emailCountDown(t)},emailCountDown:function(t){var e=this;clearInterval(this.emailCountDownTime[t]),this.emailCountDownTime[t]=setInterval((function(){e.emailCountDownSec[t]--,e.emailCountDownSec[t]<1&&(clearInterval(e.emailCountDownTime[t]),"signup"==t?e.$refs.dialogSingUp.$refs.verify.reset():"forgot"==t&&e.$refs.dialogForgotPsd.$refs.verify.reset())}),1e3)},openSingUp:function(){this.$Burying({object:"1003"}),this.dialogSignin.isShow=!1;var t="";this.emailCountDownSec.signup&&(t=this.dialogSignup.email),this.dialogSignup=JSON.parse(this.dialogSignupDefault),this.dialogSignup.email=t,this.dialogSignup.isShow=!0},openSingIn:function(t,e){this.$Burying({object:"1001"}),this.dialogSignup.isShow=!1,this.dialogForgotPsd.isShow=!1,this.dialogSignin=JSON.parse(this.dialogSigninDefault),this.dialogSignin.isShow=!0,t&&(this.dialogSignin.email=t),e&&(this.dialogSignin.password=e)},getLoginStatus:function(){var t=this;this.$apiCall("api.ShopifyAccount.getShopAuthStatus",{shopUrl:this.shopUrl},(function(e){"9999"==e.ErrorCode?e.Data.Results.status&&(clearInterval(t.time),1==e.Data.Results.status?(localStorage.getItem("c_ourMallFirstLogin")?localStorage.setItem("c_ourMallFirstLogin",2):localStorage.setItem("c_ourMallFirstLogin",1),localStorage.setItem("c_apiUserId",e.Data.Results.userInfo.id),localStorage.setItem("c_apiUserToken",e.Data.Results.userInfo.apiUserToken),localStorage.setItem("c_ourMallUserInfo",JSON.stringify(e.Data.Results.userInfo)),t.$store.commit("setUserInfo",e.Data.Results.userInfo),t.$router.push({name:"findProducts",query:t.$route.query}),t.win.close()):(t.loginLoading=!1,t.$elementMessage(e.Data.Results.errorMessage,"error"),setTimeout((function(){window.location.reload()}),1e3),t.win.close())):(clearInterval(t.time),t.$elementMessage(e.Message,"error"))}))},closeLogin:function(){this.shopUrl="",this.loginLoading=!1},goLogin:function(){var t=this;if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;this.win=window.open("/blank.html","Shopify"),this.loginLoading=!0,this.$apiCall("api.ShopifyAccount.addShopifyAccount",{shopUrl:this.shopUrl,getAuth:1,ivc:localStorage.getItem("c_ivc")?localStorage.getItem("c_ivc"):"",utmSource:localStorage.getItem("c_utm")},(function(e){"9999"==e.ErrorCode?(t.win.location=e.Data.Results,t.time=setInterval((function(){t.getLoginStatus()}),2e3)):t.$elementMessage(e.Message,"error")}))},login:function(){localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"dashboard"}):this.openSingIn()},selectLogin:function(t){this.activePlatform=t,this.gotoLogin()},gotoLogin:function(){if(!this.shopUrl)return this.$elementMessage("Please enter Shopify store name","error"),!1;localStorage.getItem("c_ourMallUserInfo")?this.$router.push({name:"stores",params:{add:!0,val:this.shopUrl}}):this.$router.push({name:"login",params:{shopUrl:this.shopUrl}})}}},p=g,m=(s("7556"),s("26e7"),s("ee2b"),s("cd94"),s("2877")),h=Object(m["a"])(p,i,o,!1,null,"3ca79fc8",null);e["default"]=h.exports},"4e69":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{attrs:{"close-on-click-modal":!1,width:"600px",visible:t.data.isShow},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[s("div",{staticClass:"d-title",attrs:{slot:"title"},slot:"title"},[s("h3",[t._v("Welocome to "),s("span",[t._v(t._s(t.$root.$children[0].pName.b)+" App")])]),s("h4",[t._v("Create your "+t._s(t.$root.$children[0].pName.a)+" account here")])]),s("div",{staticClass:"body-wrap"},[s("form",{attrs:{id:"homeSignup",name:"signup"}},[s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{placeholder:"Please fill in your Email as your Username"},model:{value:t.data.email,callback:function(e){t.$set(t.data,"email",e)},expression:"data.email"}})],1),s("div",{staticClass:"ipt-box"},[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start",content:"The password must contain letters, and numbers, Minimum 8 characters"}},[s("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please set your password"},model:{value:t.data.password,callback:function(e){t.$set(t.data,"password",e)},expression:"data.password"}})],1)],1),s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please confirm your password"},model:{value:t.data.rePassword,callback:function(e){t.$set(t.data,"rePassword",e)},expression:"data.rePassword"}})],1),s("div",{staticClass:"submit-box"},[s("el-button",{staticStyle:{"margin-right":"15px"},attrs:{loading:t.data.loading,type:"primary",disabled:t.data.isReadonly&&!t.sec},on:{click:t.register}},[t._v(" Create "+t._s(t.$root.$children[0].pName.a)+" Account ")]),s("span",{staticClass:" mg-r-5"},[t._v("Already have an account?")]),s("el-link",{attrs:{type:"primary"},on:{click:t.openSingIn}},[t._v("Sign in")])],1)]),s("el-divider",[s("span",[t._v("or Sign in with")])]),s("OtherLogin",{attrs:{platformArr:t.platformArr},on:{selectLogin:t.selectLogin}})],1)])],1)},o=[],a=(s("4d63"),s("ac1f"),s("25f0"),s("9b96")),r={props:["data","platformArr","sec"],data:function(){return{emailLoading:!1}},components:{OtherLogin:a["a"]},watch:{"data.isShow":function(){var t=this;this.data.isShow&&(setTimeout((function(){t.data.isReadonly=!1}),500),this.$refs.verify&&this.$refs.verify.reset())}},methods:{register:function(){this.$emit("register")},sendToken:function(){var t=this;this.emailLoading=!0,this.$Burying({object:"2002"}),this.$apiCall("api.User.sendToken",{mobile:this.data.email,lang:"EN"},(function(e){t.emailLoading=!1,9999==e.ErrorCode?(t.data.isReadonly=!1,t.$emit("resetSEC","signup")):(t.$refs.verify.reset(),t.$message({message:e.Message,type:"error"}))}))},verifySuccess:function(){this.data.email&&this.checkEmail()?this.sendToken():(this.$refs.verify.reset(),this.$message({message:"Please enter a valid Email.",type:"error"}))},openSingIn:function(){this.$emit("openSingIn")},checkEmail:function(){var t=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");return""!==this.data.email&&!!t.test(this.data.email)},selectLogin:function(t){this.$emit("selectLogin",t)}}},n=r,l=(s("5efd"),s("2877")),c=Object(l["a"])(n,i,o,!1,null,"31007c14",null);e["a"]=c.exports},"5efd":function(t,e,s){"use strict";s("de52")},"6aba":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{attrs:{"close-on-click-modal":!1,title:"Sign In",width:"600px",visible:t.data.isShow},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[s("div",{staticClass:"body-wrap"},[s("div",{staticClass:" d-flex mg-b-15"},[t._v(" No Account? "),s("el-link",{staticClass:" mg-l-10",attrs:{type:"primary"},on:{click:t.openSingUp}},[t._v("Sign up here")])],1),s("div",[s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{placeholder:"Email"},model:{value:t.data.email,callback:function(e){t.$set(t.data,"email",e)},expression:"data.email"}})],1),s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{placeholder:"Password","show-password":""},model:{value:t.data.password,callback:function(e){t.$set(t.data,"password",e)},expression:"data.password"}})],1),s("div",{staticClass:"submit-box"},[s("el-button",{staticStyle:{padding:"12px 40px"},attrs:{loading:t.data.loading,type:"primary"},on:{click:t.signIn}},[t._v("Sign in")]),s("el-link",{on:{click:t.forgotPS}},[t._v("Forgot your password?")])],1),s("el-divider",[s("span",[t._v("or Sign in with")])]),s("OtherLogin",{attrs:{platformArr:t.platformArr},on:{selectLogin:t.selectLogin}})],1)])])],1)},o=[],a=s("9b96"),r={props:["data","platformArr"],components:{OtherLogin:a["a"]},methods:{signIn:function(){this.$emit("signIn")},openSingUp:function(){this.$emit("openSingUp")},forgotPS:function(){this.$emit("forgotPS")},selectLogin:function(t){this.$emit("selectLogin",t)}}},n=r,l=(s("a830"),s("2877")),c=Object(l["a"])(n,i,o,!1,null,"64a730c1",null);e["a"]=c.exports},7556:function(t,e,s){"use strict";s("a497")},7771:function(t,e,s){},"7d26":function(t,e,s){},"857a":function(t,e,s){var i=s("1d80"),o=/"/g;t.exports=function(t,e,s,a){var r=String(i(t)),n="<"+e;return""!==s&&(n+=" "+s+'="'+String(a).replace(o,"&quot;")+'"'),n+">"+r+"</"+e+">"}},9911:function(t,e,s){"use strict";var i=s("23e7"),o=s("857a"),a=s("af03");i({target:"String",proto:!0,forced:a("link")},{link:function(t){return o(this,"a","href",t)}})},"9b96":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"other-login-box"},t._l(t.platformArr,(function(e,i){return s("div",{key:i,staticClass:"th-login-box"},["woo"!=i?s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Sign in with "+e.name,placement:"top"}},[s("a",{class:[i,{disabled:!e.enabled}],attrs:{href:"javascript:;"},on:{click:function(e){return t.selectLogin(i)}}},[s("i"),t._v(" "+t._s(e.name)+" "),e.enabled?t._e():s("div",{staticClass:"cs"},[t._v(" Coming soon ")])])]):t._e()],1)})),0)},o=[],a={props:["platformArr"],methods:{selectLogin:function(t){var e="";switch(t){case"lazada":e="1008";break;case"shopify":e="1007";break;default:break}this.$Burying({object:e}),this.platformArr[t].enabled&&("shopify"==t?this.$router.push({name:"login",query:{platform:"shopify"}}):this.$emit("selectLogin",t))}}},r=a,n=(s("db08"),s("2877")),l=Object(n["a"])(r,i,o,!1,null,"6ebb6f9b",null);e["a"]=l.exports},a497:function(t,e,s){},a830:function(t,e,s){"use strict";s("7771")},ac4b:function(t,e,s){},af03:function(t,e,s){var i=s("d039");t.exports=function(t){return i((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},b4d5:function(t,e,s){},beba:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{"close-on-click-modal":!1,width:"600px",visible:t.data.isShow,title:"Change password"},on:{"update:visible":function(e){return t.$set(t.data,"isShow",e)}}},[s("div",{staticClass:"body-wrap"},[s("form",{attrs:{id:"homeForgotPSD",name:"forgotPSD"}},[s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{placeholder:"Please fill in your Email as your Username"},model:{value:t.data.email,callback:function(e){t.$set(t.data,"email",e)},expression:"data.email"}})],1),s("vue-simple-verify",{ref:"verify",staticStyle:{"margin-bottom":"15px"},attrs:{width:560,movedColor:"#67C23A",tips:"Slide to get your CAPTCHA",successTips:t.emailLoading?"Loading...":"Validation passed. try again in "+t.sec+" seconds"},on:{success:t.verifySuccess}}),s("div",{staticClass:"ipt-box d-flex"},[s("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,name:"captcha",placeholder:"Please fill in the CAPTCHA you received"},model:{value:t.data.captcha,callback:function(e){t.$set(t.data,"captcha",e)},expression:"data.captcha"}})],1),s("div",{staticClass:"ipt-box"},[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start",content:"The password must contain letters, and numbers, Minimum 8 characters"}},[s("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please set your new password"},model:{value:t.data.password,callback:function(e){t.$set(t.data,"password",e)},expression:"data.password"}})],1)],1),s("div",{staticClass:"ipt-box"},[s("el-input",{attrs:{disabled:t.data.isReadonly&&!t.sec,"show-password":"",placeholder:"Please confirm your new password"},model:{value:t.data.rePassword,callback:function(e){t.$set(t.data,"rePassword",e)},expression:"data.rePassword"}})],1)],1)]),s("el-divider"),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.data.isShow=!1}}},[t._v("Discard")]),s("el-button",{attrs:{loading:t.data.loading,disabled:t.data.isReadonly&&!t.sec,type:"primary"},on:{click:t.saveNewPSD}},[t._v("Confirm")])],1)],1)},o=[],a=(s("4d63"),s("ac1f"),s("25f0"),{props:["data","sec"],data:function(){return{emailLoading:!1}},watch:{"data.isShow":function(){var t=this;this.data.isShow&&setTimeout((function(){t.data.isReadonly=!1}),500)}},methods:{saveNewPSD:function(){this.$emit("saveNewPSD")},sendToken:function(){var t=this;this.emailLoading=!0,this.$apiCall("api.User.sendToken",{mobile:this.data.email,reset:!0,lang:"EN"},(function(e){t.emailLoading=!1,9999==e.ErrorCode?(t.data.isReadonly=!1,t.$emit("resetSEC","forgot")):(t.$refs.verify.reset(),t.$message({message:e.Message,type:"error"}))}))},verifySuccess:function(){this.data.email&&this.checkEmail()?this.sendToken():(this.$refs.verify.reset(),this.$message({message:"Please enter a valid Email.",type:"error"}))},checkEmail:function(){var t=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");return""!==this.data.email&&!!t.test(this.data.email)}}}),r=a,n=(s("43e4"),s("2877")),l=Object(n["a"])(r,i,o,!1,null,"28040e48",null);e["a"]=l.exports},cd94:function(t,e,s){"use strict";s("f9a4")},d8f7:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():i("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&t.setting.content.length&&"scribe"==t.setting.content[0].type?i("div",{staticClass:"submit-email"},[i("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[i("div",{staticClass:"row-1"},[i("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),i("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),i("div",{staticClass:"row-2"},[i("div",{staticClass:"l-ipt"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),i("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[i("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed?i("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[i("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1420px"}},[t._l(t.setting.content,(function(e,o){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=o?i("div",{key:o,staticClass:"c-3"},[i("div",{staticClass:"text"},[i("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),i("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),i("div",{staticClass:"btn"},[i("div",{staticClass:"l-ipt"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),i("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[i("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?i("div",{key:o,staticClass:"c-1"},[i("h2",{staticClass:"logo"},[t.setting.companyLogo?i("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():i("img",{attrs:{src:s("dd13"),alt:""}})]),i("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),i("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?i("div",{key:o,staticClass:"c-2"},[i("dl",[e.title?i("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),i("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?i("div",{key:o,staticClass:"c-2"},[i("dl",[e.title?i("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(e.menu,(function(e,s){return i("dd",{key:s},["9999"==e.link.value?i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(" "+t._s(e.name)+" ")]):"9998"==e.link.value?i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(s){return t.gotoUrl(e.url)}}},[t._v(" "+t._s(e.name)+" ")]):i("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"},on:{click:function(s){return t.goto(e.link.url)}}},[t._v(" "+t._s(e.name)+" ")])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?i("div",{key:o,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[i("dl",[i("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),i("dd",[i("div",{staticClass:"d-flex"},[e.facebook?i("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?i("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?i("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?i("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[i("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?i("div",{staticClass:"bottom-row-copyright"},[t._v(" © 2021 Supplier store name Powered by OurMall. ")]):t._e()])},o=[],a={props:["setting"],data:function(){return{email:""}},mounted:function(){},methods:{gotoUrl:function(t){this.$store.state.userInfo?window.location.href=t:"home"!=t&&"products-market"!=t?-1!=t.indexOf("http")?window.location.href=t:this.openDialogLogin():window.location.href=t},goto:function(t){this.$store.state.userInfo?this.$router.push({name:t}):"home"!=t&&"productsMarketHome"!=t?this.openDialogLogin():this.$router.push({name:t})},openDialogLogin:function(){this.$root.$children[0].openDialogLogin()},openRegister:function(){this.$root.$children[0].openDialogRegister()},submitSubscribe:function(){var t=this;this.email&&(this.$showLoading(),this.$apiCall("api.Market.subscribe",{email:this.email},(function(e){9999==e.ErrorCode?(t.email="",t.$message.success("Email Submitted Successfully !")):t.$message.error(e.Message),t.$hideLoading()})))}}},r=a,n=(s("e122"),s("2877")),l=Object(n["a"])(r,i,o,!1,null,"65e6c0f8",null);e["a"]=l.exports},db08:function(t,e,s){"use strict";s("b4d5")},dd13:function(t,e,s){t.exports=s.p+"img/logoNew.994d0ff0.png"},de52:function(t,e,s){},e122:function(t,e,s){"use strict";s("ac4b")},eb7c:function(t,e,s){},ee2b:function(t,e,s){"use strict";s("eb7c")},f9a4:function(t,e,s){}}]);
//# sourceMappingURL=search.996ac569.js.map