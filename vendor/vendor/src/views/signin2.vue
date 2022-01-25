<template>
  <div class="signup-page">
    <div class="home-header">
      <div class="content">
        <h1></h1>
      </div>
    </div>
    <div class="home-main">
      <div class="home-main-content">
        <homeAlert />
        <el-card class="box-card signup-box">
          <div
            v-if="$store.state.userInfo"
            slot="header"
            style="line-height: 26px;font-size: 16px; color:#909399 "
          >
            {{$t('signin.welcome')}}<span style=" color:#606266;">{{$store.state.userInfo.name}}</span>
          </div>

          <div v-if="$store.state.userInfo">
            <el-button
              type="primary"
              size="mini"
              style="margin-right: 15px;"
              @click="goto('dashboard')" 
            >{{$t('signin.enter')}}</el-button>
            <a href="javascript:void(0)" style="color:#606266;" @click="logout">{{$t('signin.exit')}}</a>
          </div>
          <el-tabs
            v-else
            type="card"
            v-model="tabAction"
            @tab-click="handleTab"
          >
            <el-tab-pane :label="$t('signin.sign')" name="login">
              <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                :label-width="loginStatus.labelWidth"
              >
                <el-form-item prop="userName">
                  <el-input
                    v-model="loginForm.userName"
                    :disabled="loginStatus.loading"
                    clearable
                    :placeholder="$t('signin.mobile')"
                    @keyup.enter.native="focusPassword"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    ref="iptPassword"
                    v-model="loginForm.password"
                    :disabled="loginStatus.loading"
                    show-password
                    :placeholder="$t('signin.pass')"
                    @keyup.enter.native="login"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="isSubUser">
                  <span>是否为子账号：</span>
                  <el-switch
                    v-model="loginForm.isSubUser"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                
                <div v-if="loginStatus.error" class="error">
                  {{loginStatus.error}}
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <el-form-item style="margin-bottom: 0">
                    <el-button
                      type="primary"
                      :loading="loginStatus.loading"
                      @click="login"
                      style=" margin-right: 15px"
                    >{{$t('signin.sign')}}</el-button>
                  </el-form-item>
                  <el-link
                    class="d-inline"
                    style="font-size: 12px;"
                    @click="openRePasswordDialog"
                  >{{$t('signin.忘记密码')}}</el-link>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="$t('signin.免费注册')" name="registered">
              <el-form
                ref="regForm"
                :model="regForm"
                :rules="regRules"
                :label-width="regStatus.labelWidth"
              >
                <el-form-item prop="userName">
                  <el-input
                    v-model="regForm.userName"
                    :disabled="regStatus.loading"
                    clearable
                    :placeholder="$t('signin.mobile')"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    auto-complete="new-password"
                    v-model="regForm.password"
                    :disabled="regStatus.loading"
                    show-password
                    :placeholder="$t('signin.pass')"
                  ></el-input>
                </el-form-item>

                <div style="margin-top: 20px;margin-bottom: 20px;">
                  <vue-simple-verify
                    ref="verify"
                    @success="success"
                    :width="328"
                    :tips="$t('signin.getCaptcha')"
                    :successTips="`${regStatus.loading ? 'Loading...' : $t('signin.重新获取验证码', { second: regStatus.mobileSeconds })}`"
                    movedColor="#5c6ac4"
                  />
                </div>

                <el-form-item prop="token">
                  <el-input
                    v-model="regForm.token"
                    :disabled="regStatus.loading"
                    :placeholder="$t('signin.captcha')"
                  ></el-input>
                </el-form-item>
                <div
                  v-if="regStatus.error"
                  class="error"
                >
                  {{regStatus.error}}
                </div>
                <div v-if="regStatus.success" class="success">{{regStatus.success}}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <p class=" d-flex align-items-center diy-wrapper">
                    <el-checkbox
                      v-model="regStatus.isAgree"
                      style="margin: 0;font-size: 12px"
                    >{{$t('signin.agree')}} </el-checkbox>
                    <el-link
                      class=" mg-l-5"
                      type="primary"
                      @click="openUserAgreement"
                    >{{$t('signin.agreement')}}</el-link>
                  </p>
                </div>
                <div class="d-flex" style="flex-direction: column; align-items: end;margin-top: 10px;">
                  <el-form-item style="margin-bottom: 0">
                    <el-button
                      type="primary"
                      :loading="regStatus.loading"
                      style=" margin-right: 15px"
                      @click="registers"
                    >{{$t('signin.complete')}}</el-button>
                  </el-form-item>
                </div>
                <div class=" text-right">
                  <el-link
                    class="d-inline"
                    @click="toSignin()"
                    style="font-size: 12px;"
                  >{{$t('signin.signin')}}</el-link>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <UserAgreementDialog ref="userAgreementDialog" />
      <RetrievePasswordDialog ref="retrievePassword" />
      <Footer />
    </div>
  </div>
</template>

<script>
import homeAlert from './../components/homeAlert'
import Footer from './../components/footer'
import UserAgreementDialog from "@/components/userAgreementDialog";
import RetrievePasswordDialog from "@/components/RetrievePasswordDialog";

export default {
  data() {
    return {
      tabAction: 'login',
      loginForm: {
        userName: "",
        password: "",
        isSubUser:false,
      },
      loginRules: {
        userName: [
          { required: true, message: this.$t('signin.username'), trigger: "blur" }
        ],
        password: [{ required: true, message: this.$t('signin.passwordMust'), trigger: "blur" }]
      },
      loginStatus: {
        labelWidth: "0px",
        error: "",
        errorT: 0,
        loading: false,
      },
      regForm: {
        userName: "",
        password: "",
        rePassword: "",
        token: "",
      },
      regRules: {
        userName: [
          { required: true, message: this.$t('signin.enterMobile'), trigger: "blur" },
        ],
        password: [
          { required: true, message: this.$t('signin.enterPass'), trigger: "blur" },
          { min: 6, message: this.$t('signin.passBits'), trigger: "blur" },
          {
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
            message: this.$t("signin.passBits"),
            trigger: "blur",
          },
        ],
        token: [{ required: true, message: this.$t('signin.enterCaptcha'), trigger: "blur" }],
      },
      regStatus: {
        showReSend: true,
        mobileSeconds: 60, // 倒计时
        confirmSuccess: false, // 是否通过滑动验证
        isAgree: true, // 是否同意用户协议
        labelWidth: "0px",
        loading: false,
        error: "",
        errorT: 0,
        success: "",
        successT: 0,
        dialogUserAgreementVisible: false, // 用户协议窗口
      }
    };
  },
  components: {
    RetrievePasswordDialog,
    homeAlert,
    Footer,
    UserAgreementDialog,
  },
  computed: {
    lang() {
      let l = "CN"
      if(navigator.appName == 'Netscape'){
        l = navigator.language
      }else{
        l = navigator.browserLanguage
      }

      if(l.indexOf('zh') > -1){
        return "CN"
      }else{
        return "EN"
      }
    }
  },
  mounted () {
    this.$Burying({
      object: '1001'
    })
  },
  methods: {
    logout(){
      localStorage.removeItem('wantVisitPathSu');
      this.$userFailure();
    },
    openRePasswordDialog() {
      this.$refs.retrievePassword.openDialog()
    },
    handleTab() {
      this.$refs.loginForm.resetFields()
      this.$refs.regForm.resetFields()
    },
    success() {
      this.regStatus.confirmSuccess = true
      this.$Burying({
        object: '2002'
      })
      this.sendToken()
    },
    openUserAgreement() {
      this.$refs.userAgreementDialog.open()
    },
    goto(name) {
      this.$router.push({ name});
    },
    handleLogin(Results) {
      localStorage.setItem(
        "apiUserToken",
        Results.apiUserToken
      );
      localStorage.setItem("apiUserId", Results.id);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(Results)
      );
      this.$store.commit("setUserInfo", Results);
      this.$root.$children[0].getCnt();
      
      //登录后跳转页面
      if(localStorage.getItem('wantVisitPathSu')){
          // this.$router.go(-1);
        this.$router.push({ path: localStorage.getItem('wantVisitPathSu')});
      }else{
        this.$router.push({ name: "dashboard" });
      }
    },
    login() {
      const rid = this.$route.query.rid || ''
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginStatus.error = '';
          this.loginStatus.loading = true;
          this.$Burying({
            object: '1002'
          })
          this.$apiCall(
            "api.User.login",
            {
              isSubUser:this.loginForm.isSubUser, //是否子账号
              username: this.loginForm.userName,
              password: this.loginForm.password,
              type: 2,
              relationshipId: rid,
            },
            r => {
              if (r.ErrorCode == 9999) {
                this.$Burying({
                  object: '1005'
                })
                this.handleLogin(r.Data.Results)
              } else {
                this.$Burying({
                  object: '1006'
                })
                this.loginStatus.loading = false;
                clearInterval(this.loginStatus.errorT)
                this.loginStatus.error = r.Message;
                this.loginStatus.errorT = setInterval(()=>{
                  this.loginStatus.error = '';
                }, 5000)
              }
            }
          );
        }
      });
    },
    registers() {
      const rid = this.$route.query.rid || ''
      if (!this.regStatus.isAgree) {
        clearInterval(this.regStatus.errorT);
        this.regStatus.error = this.$t('signin.read');
        this.regStatus.errorT = setInterval(() => {
          this.regStatus.error = "";
        }, 5000);
        return;
      }
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.regStatus.error = "";
          this.regStatus.loading = true;
          this.$Burying({
            object: '2001'
          })
          this.$apiCall(
            "api.User.register",
            {
              username: this.regForm.userName,
              password: this.regForm.password,
              code: this.regForm.token,
              type: 2,
              ivc: this.$route.query.ivc,
              relationshipId: rid,
              isLogin: true,
              lang: this.lang
            },
            (r) => {
              this.regStatus.loading = false;
              if (r.ErrorCode == 9999) {
                this.$Burying({
                  object: '2004'
                })
                this.handleLogin(r.Data.Results)
                // clearInterval(this.successT);
                // this.regStatus.success = this.$t('signin.successful');
                // this.regStatus.successT = setInterval(() => {
                //   this.regStatus.success = "";
                // }, 5000);
                // this.$message({ message: this.$t("signin.successful"), type: "success" });
                // this.tabAction = "login"
              } else {
                this.$Burying({
                  object: '2005'
                })
                clearInterval(this.regStatus.errorT);
                this.regStatus.error = r.Message;
                this.regStatus.errorT = setInterval(() => {
                  this.regStatus.error = "";
                }, 5000);
                this.$message({ message: r.Message, type: "error" });
              }
            }
          );
        }
      });
    },
    sendToken() { // 获取验证码
      if (!this.regForm.userName) {
        clearInterval(this.regStatus.errorT);
        this.regStatus.error = this.$t('signin.correctNum');
        this.regStatus.errorT = setInterval(() => {
          this.regStatus.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      if (!this.regStatus.confirmSuccess) {
        clearInterval(this.regStatus.errorT);
        this.regStatus.error = this.$t('signin.slideBar');
        this.regStatus.errorT = setInterval(() => {
          this.regStatus.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      this.regStatus.loading = true;
      this.$apiCall(
        "api.User.sendToken",
        { mobile: this.regForm.userName, lang: this.lang },
        (r) => {
          this.regStatus.loading = false;
          if (r.ErrorCode == 9999) {
            this.regStatus.mobileSeconds = 60;
            this.regStatus.showReSend = false;
            let t = setInterval(() => {
              if (this.regStatus.mobileSeconds <= 1) {
                this.dragReset();
                this.regStatus.showReSend = true;
                clearInterval(t);
              }
              this.regStatus.mobileSeconds--;
            }, 1000);
          } else {
            this.dragReset();
            clearInterval(this.regStatus.errorT);
            this.regStatus.error = r.Message;
            this.regStatus.errorT = setInterval(() => {
              this.regStatus.error = "";
            }, 5000);
          }
        }
      );
    },
    dragReset() {
      this.regStatus.confirmSuccess = false
      this.$refs.verify.reset()
    },
    focusPassword(){
      this.$refs.iptPassword.$refs.input.focus();
    },
    toSignin() {
      this.tabAction = 'login'
    }
  }
};
</script>
<style>
.diy-wrapper .el-checkbox__label, .diy-wrapper .el-link--inner {
  font-size: 12px!important;
}

.home-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
}
.home-header .content {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 1280px;
  height: 90px;
}
.home-header .content h1 {
  width: 250px;
  height: 32px;
  background-image: url("./../../public/images/logo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.home-main {
  margin: 0 auto;
  max-width: 1980px;
  min-width: 1280px;
  min-height: 500px;
  padding-top: 90px;
  height: 100%;
  background-position: 0 90px;
  background-image: url("./../../public/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
</style>
<style  scoped>
.home-main-content{
  margin: 0 auto;
  width: 1280px;
  height: 100%;
  position: relative;
}
.signup-page {
  position: relative;
  height: 100%;
  min-height: 750px;
}
.signup-box {
  position: absolute;
  top: 120px;
  right: 10px;
  width: 370px;
}
.error{
  position: relative;
  top: -10px;
  color:#F56C6C;
  font-size: 12px;
}
</style>
