<template>
  <div class="home-page">
	<template v-if="code && code.header && code.header.length > 0">
		<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
	</template>
	<div style="position: relative;height: 130px;">
		   <DHeader  :data="setting && setting.header || ''" :headerMenu="headerMenu"/>
	</div>
  <div class="contentpanel import-home">
	 <importList :fromPage="'home'"></importList>
  </div>
  <!-- <Footer /> -->
   <DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
   <template v-if="code && code.footer && code.footer.length > 0">
   	<div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
   </template>
    <DialogSignin :data="dialogSignin" :platformArr="platformArr"
      @openSingUp="openSingUp"
      @signIn="signIn"
      @forgotPS="openForgotPS"
      @selectLogin="selectLogin"
    />
    <DialogSignUp ref="dialogSingUp"
      :data="dialogSignup" :platformArr="platformArr"
      :sec="emailCountDownSec.signup"
      @resetSEC="resetSEC"
      @openSingIn="openSingIn"
      @register="register"
      @selectLogin="selectLogin"
    />
    <DialogForgotPsd ref="dialogForgotPsd" 
      :data="dialogForgotPsd"
      :sec="emailCountDownSec.forgot"
      @resetSEC="resetSEC"
      @saveNewPSD="saveNewPSD"
    />
    <el-backtop
      class="goto-top"
      :right="32"
      :bottom="120"
    >
    </el-backtop>
  </div>
</template>

<script>
import DialogSignin from "./../../components/Home/DialogSignIn" //signIn 弹框登录
import DialogSignUp from "./../../components/Home/DialogSignUp" //sigup 注册
import DialogForgotPsd from "./../../components/Home/DialogForgotPsd" //忘记密码
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
import importList from '@/views/importList/Main'
export default {
  props: {},
  data() {
    return {
      setting: null,
      code: {
        header: [],
        footer: []
      },
      headerMenu: [],
      loginLoading:false,
      loading: false,
      time: 0,
      shopUrl: "",
      platformArr: this.$dict.platformArr,
      activePlatform: 'shopify',
      dialogSignin:{
        isShow: false,
        loading: false,
        email: '',
        password: '',
      },
      dialogSigninDefault: '{}',
      dialogSignup: {
        isShow: false,
        loading: false,
        email: '',
        captcha: '',
        password: '',
        rePassword: '',
        isReadonly: true,
      },
      dialogSignupDefault: '{}',
      emailCountDownSec:  {
        signup: 0,
        forgot: 0,
      },
      emailCountDownTime: {
        signup: 0,
        forgot: 0,
      },
      dialogForgotPsd: {
        isShow: false,
        loading: false,
        email: '',
        captcha: '',
        password: '',
        rePassword: '',
        isReadonly: true,
      },
      dialogForgotPsdDefault: '{}',
      forgotPsdCountDownSec: 0,
      forgetPsdCountDownTime: 0,
      win: null,
      input: "",
      select: null,
      titName: "",
      name: "",
      status: 0,
      page: 1,
      isRun: false,
    };
  },
  components:{
    DialogSignin,
    DialogSignUp,
    DialogForgotPsd,
    DHeader,
    DFooter,
	importList,
  },
  watch: {
    'setting.header.activeMenu': {
      handler() {
        this.getMenu()
      },
      deep: true
    },
  },
  beforeDestroy(){
    clearInterval(this.time);
  },   
  created() {
  	this.setting = localStorage.getItem("c_shopConfigJson") ? JSON.parse(localStorage.getItem("c_shopConfigJson")) : null;
  	if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) return;
  	this.setting.customCode.forEach((item) => {
  		if (item.pages.includes('商品刊登页')) {
  			if (item.position == '底部') {
  				this.code.footer.push(item.desc)
  			}
  			if (item.position == '顶部') {
  				this.code.header.push(item.desc)
  			}
  		}
  	})
  },
  mounted() {
    this.dialogSigninDefault = JSON.stringify(this.dialogSignin);
    this.dialogSignupDefault = JSON.stringify(this.dialogSignup);
    this.dialogForgotPsdDefault = JSON.stringify(this.dialogForgotPsd);
    if(this.$route.hash && this.$route.hash.indexOf('utm_source') > -1 && !this.$store.state.userInfo){
    }
    if(this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
		}else{
			this.$root.$children[0].checkLogin();
		}
  },
  methods: {
    getMenu(){
      if(this.setting.header.activeMenu){ //有启用头部菜单
        this.setting.menu.forEach((item) => {
          if (item.id == this.setting.header.activeMenu) {
            this.headerMenu = item
          }
        })
      }
    },
    saveNewPSD(){
      //保存新密码
      if(!this.dialogForgotPsd.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogForgotPsd.captcha){
        this.$message({ message: 'CAPTCHA must be filled in', type: "error" });
        return;
      }
      if(!this.dialogForgotPsd.password){
        this.$message({ message: 'New password must be filled in', type: "error" });
        return;
      }
      if(this.dialogForgotPsd.password != this.dialogForgotPsd.rePassword){
        this.$message({ message: 'The new password and confirm password must be the same', type: "error" });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if(!pwdRegex.test(this.dialogForgotPsd.password)){
        this.$message({ message: 'The password must contain letters, and numbers, Minimum 8 characters', type: "error" });
        return;
      }
      this.dialogForgotPsd.loading = true;
      this.$apiCall( "api.User.resetPassword",{
        mobile: this.dialogForgotPsd.email,
        token : this.dialogForgotPsd.captcha,
        newPassword: this.dialogForgotPsd.password,
        repeatNewPassword: this.dialogForgotPsd.rePassword,
      }, r => {
        this.dialogForgotPsd.loading = false;
        if(r.ErrorCode == 9999){
          this.$message({ message: 'Password reset successful', type: "success" });
          this.openSingIn(this.dialogForgotPsd.email, this.dialogForgotPsd.password)
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })

    },
    openForgotPS(){
      //打开忘记密码
      this.dialogSignin.isShow = false;
      this.dialogForgotPsd = JSON.parse(this.dialogForgotPsdDefault)
      this.dialogForgotPsd.isShow = true;
    },
    signIn(){
      //登录
      if(!this.dialogSignin.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignin.password){
        this.$message({ message: 'Password must be filled in', type: "error" });
        return;
      }
      this.$Burying({
        object: '1002',
      })
      this.dialogSignin.loading = true;
      this.$apiCall("api.User.login", {
        username: this.dialogSignin.email,
        password: this.dialogSignin.password,
        type: 1,
        lang: "EN",
      }, r => {
        this.dialogSignin.loading = false;
        if (r.ErrorCode == 9999) {
          if(!localStorage.getItem("c_ourMallFirstLogin")){
            localStorage.setItem("c_ourMallFirstLogin",1);
          }else{
            localStorage.setItem("c_ourMallFirstLogin",2);
          }
          localStorage.setItem( "apiUserToken",r.Data.Results.apiUserToken);
          localStorage.setItem("c_apiUserId", r.Data.Results.id);
          localStorage.setItem("c_ourMallUserInfo",JSON.stringify(r.Data.Results));
          this.$store.commit("setUserInfo", r.Data.Results);
          this.$Burying({
            object: '1005',
          })
          if(localStorage.getItem('c_wantVisitPath')){
            this.$router.push({ path: localStorage.getItem('c_wantVisitPath') });
          }else{
            this.$router.push({ name: "dashboard" });
          }
          this.dialogSignin.isShow = false;
        }else{
          this.$message({ message: r.Message, type: "error" });
          this.$Burying({
            object: '1006',
          })
        }
      })
    },
    register(){
      //注册
      if(!this.dialogSignup.email){
        this.$message({ message: 'Email must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignup.captcha){
        this.$message({ message: 'CAPTCHA must be filled in', type: "error" });
        return;
      }
      if(!this.dialogSignup.password){
        this.$message({ message: 'Password must be filled in', type: "error" });
        return;
      }
      if(this.dialogSignup.password != this.dialogSignup.rePassword){
        this.$message({ message: 'The password and confirm password must be the same', type: "error" });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if(!pwdRegex.test(this.dialogSignup.password)){
        this.$message({ message: 'The password must contain letters, and numbers, Minimum 8 characters', type: "error" });
        return;
      }

      //注册
      this.$Burying({
        object: '2001'
      })
      this.dialogSignup.loading = true;
      this.$apiCall('api.User.register', {
        username: this.dialogSignup.email,
        password: this.dialogSignup.password,
        code: this.dialogSignup.captcha,
        type: 1,
        lang: "EN",
        }, r => {
          this.dialogSignup.loading = false;
          if(r.ErrorCode == '9999'){
            this.openSingIn(this.dialogSignup.email, this.dialogSignup.password)
            this.$Burying({
              object: '2004'
            })
          }else{
            this.$message({ message: r.Message, type: "error" });
            this.$Burying({
              object: '2005'
            })
          }
        })
    },
    resetSEC(type){ //验证码开始计时
      this.emailCountDownSec[type] = 60;
      this.emailCountDown(type);
    },
    emailCountDown(type){ //验证码定时器
      clearInterval(this.emailCountDownTime[type])
      this.emailCountDownTime[type] = setInterval(
        () => {
          this.emailCountDownSec[type] --
          if(this.emailCountDownSec[type] < 1){
            clearInterval(this.emailCountDownTime[type])
            if(type == 'signup'){
              this.$refs.dialogSingUp.$refs.verify.reset();
            }else if(type == 'forgot'){
              this.$refs.dialogForgotPsd.$refs.verify.reset();
            }  
          }
        },1000) 
    },
    openSingUp(){ //打开注册
      this.$Burying({
        object: '1003'
      })
      this.dialogSignin.isShow = false;
      let username = ''
      if(this.emailCountDownSec.signup){
        username = this.dialogSignup.email
      }
      this.dialogSignup = JSON.parse(this.dialogSignupDefault)
      this.dialogSignup.email = username;
      this.dialogSignup.isShow = true;
    },
    openSingIn(user, psd){ //打开登录
      this.$Burying({
        object: '1001'
      })
    this.dialogSignup.isShow = false;
    this.dialogForgotPsd.isShow = false;
    this.dialogSignin = JSON.parse(this.dialogSigninDefault);
    this.dialogSignin.isShow = true;
    if(user)
      this.dialogSignin.email = user;
    if(psd)
      this.dialogSignin.password = psd;  
    },
     getLoginStatus() {
      this.$apiCall(
        "api.ShopifyAccount.getShopAuthStatus",
        {
          shopUrl: this.shopUrl
        },
        r => {
          if (r.ErrorCode == "9999") {
            if (r.Data.Results.status) {
              clearInterval(this.time);
              if (r.Data.Results.status == 1) {
              	if(!localStorage.getItem("c_ourMallFirstLogin")){
				      		localStorage.setItem("c_ourMallFirstLogin",1);
				      	}else{
				      		localStorage.setItem("c_ourMallFirstLogin",2);
				      	}
                localStorage.setItem("c_apiUserId", r.Data.Results.userInfo.id);
                localStorage.setItem("c_apiUserToken",
                  r.Data.Results.userInfo.apiUserToken
                );
                localStorage.setItem("c_ourMallUserInfo",
                  JSON.stringify(r.Data.Results.userInfo)
                );
                this.$store.commit("setUserInfo", r.Data.Results.userInfo);
                this.$router.push({name: 'findProducts', query:this.$route.query})
                
                this.win.close();
              } else {
                this.loginLoading = false;
                this.$elementMessage(r.Data.Results.errorMessage, "error");
                setTimeout(()=>{
                  window.location.reload();
                },1000)
                this.win.close();
              }
            }
          } else {
            clearInterval(this.time);
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    closeLogin(){
    this.shopUrl ='';
    this.loginLoading = false;
    },
    goLogin() {
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      this.win = window.open("/blank.html", "Shopify");
      this.loginLoading = true;
      this.$apiCall(
        "api.ShopifyAccount.addShopifyAccount",
        {
          shopUrl: this.shopUrl,
          getAuth: 1,
          ivc:localStorage.getItem('c_ivc') ? localStorage.getItem('c_ivc') : '',
          utmSource:localStorage.getItem('c_utm'),
        },
        r => {
          if (r.ErrorCode == "9999") {
            this.win.location = r.Data.Results;
            this.time = setInterval(() => {
              this.getLoginStatus();
            }, 2000);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    login() {
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.openSingIn();
      }
    },
    selectLogin(p){
      this.activePlatform = p;
      this.gotoLogin();
    },
    gotoLogin() {
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({
          name: "stores",
          params: { add: true, val: this.shopUrl },
        });
      } else {
        this.$router.push({ name: "login", params: { shopUrl: this.shopUrl } });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  max-width: 1920px;
  width: 100%;
  background-color: #fff;
}

</style>
<style>
.home-page .el-form-item__error {
	white-space: nowrap;
}
</style>
<style scoped lang="scss">
.importBut{
  width: 206px;
  height: 40px;
  border-radius: 2px;
}
.pagetitle{
  justify-content: flex-start;
  ::v-deep .el-input__inner {
    border-radius: 0 !important;
  }
  ::v-deep .el-input__inner:last-child {
    background-image: url('./../../../public/images/productShop/search.png') !important;
    background-repeat: no-repeat;
    background-position: 20px center;
    background-color: #fff;
    background-size: 20px 20px;
    padding-left: 50px;
  }
}

.search-product{
  margin: 10px auto 0;
  width: 1420px;
  padding: 15px 0;
  .publish{
    width: 655px;
    margin: 0 auto;
    .search-btn {
      margin: 0 auto;
      text-align: center;
    }
  }
}
.import-home{
	margin: 0 auto 0;
	width: 100%;
	padding: 15px 0;
}
.ball {
  position: fixed;
  z-index: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #f56c6c;
  transition: ease-in-out 0.5s;
}
.more-dropdown {
  height: 30vh;
  overflow-y: auto;
}
ul,
li {
  list-style: none;
  margin-bottom: 0 !important;
}
h1 {
  margin: 40px 0 20px;
  font-size: 20px;
  font-weight: bold;
}

.el-select {
  width: 180px;
}
.el-select .el-input {
  width: 180px;
}
.input-with-select{
   min-width: 550px;
   flex:1;
  .el-input-group__prepend {
    background-color: #ccc;
  }
 
} 

.head_tit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.more{
  font-size: 18px; 
  font-weight: 500;
  padding: 40px 0 20px;
  color: #525FB0;
  cursor: pointer;
}

</style>
<style lang="scss" scoped>
.search-but{
    width: 208px;
    height: 40px;
    background: linear-gradient(213deg, #6995F1 0%, #525FB0 100%);
    border-radius: 0px 4px 4px 0px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-weight: 700;
    cursor: pointer;
}
.login-page {
  position: relative;
  height: 100%;
  .login-box {
    
    h2{
      margin: 0 auto 5px;
      width: 286px;
      color: #fff;
      font-size: 18px;
    }
    h1 {
      margin: 0 auto 15px;
      width: 282px;
      height: 50px;
      background-image: url("./../../../public/images/logo2.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .box {
      margin: 0 auto;
      border-radius: 6px;
      padding: 20px;
      width: 460px;
      background-color: #fff;
      p {
        margin-bottom: 15px;
        text-align: center;
        color: #909399;
        font-size: 18px;
      }
      input {
        margin-right: 10px;
        outline: none;
        border: none;
        border-bottom: 1px #e4e7ed solid;
        width: 250px;
        height: 32px;
        text-align: center;
        font-size: 18px;
      }
      input + span {
        color: #909399;
        font-size: 18px;
      }
      button {
        width: 100%;
        height: 46px;
        background-color: #e94b26;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        font-size: 22px;
      }
    }
    .bottom {
      color: #fff;
      a {
        margin-left: 5px;
        color: #fff;
        text-decoration: underline;
      }
      a:hover {
        text-decoration: none;
      }
    }
  }
}
.el-backtop{
  right: 32px !important;
  transform: none;
}
</style>
