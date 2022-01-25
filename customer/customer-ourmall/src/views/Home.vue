<template>
  <div class="home-page">
    <div class="home-header">
      <h1></h1>
      <ul class="home-nav">
        <li>
          <router-link :to="{ path: '/home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/products-market' }"
            >Products Market</router-link
          >
        </li>
        <li>
          <router-link :to="{ path: '/Waiting-for-allocated' }"
            >Request for Quote</router-link
          >
        </li>
        <li>
            <a class="d-flex" @click="gotoMyImport">
              <div rel="nofollow" class="import-but">
                <i class="el-icon-tickets" style="font-size: 24px;margin-right:10px"></i>
                <i v-if="$store.state.userInfo" class="badge" >{{this.$root.$children[0].importNum > 99 ? '99+' : this.$root.$children[0].importNum}}</i>
              </div>
              <div class="btn-text" rel="nofollow">
                Wait for import
              </div>
            </a>
          </li>
        <li v-if="$store.state.userInfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              My {{ $root.$children[0].pName.a }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="align-items-endd-flex"
                style="width: 150px"
                command="dashboard"
              >
                <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
              </el-dropdown-item>
              <el-dropdown-item
                class="align-items-endd-flex"
                style="width: 150px"
                command="profile"
              >
                <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> My
                Profile
              </el-dropdown-item>
              <template v-if="$root.$children[0].baseUrl == '/my'">
                <!-- 钱包导航 -->
                <el-dropdown-item
                  class="align-items-end-flex"
                  style="width: 150px"
                  command="wallet"
                >
                  <i
                    class="mg-r-15 iconfont icon-qianbao"
                    style="font-size: 14px"
                    aria-hidden="true"
                  ></i>
                  My Wallet
                </el-dropdown-item>
              </template>
              <el-dropdown-item
                class="d-flex"
                style="width: 150px"
                command="exit"
              >
                <i class="mg-r-15 fa fa-sign-out" aria-hidden="true"></i> Logout
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li v-else>
          <!--<router-link to="/login">LOGIN</router-link>-->
          <a href="javascript:;" @click="login">LOGIN</a>
        </li>
      </ul>
    </div>
    <div class="home-header2" :class="{ active: header2Visible }">
      <div class="content">
        <h1></h1>
        <ul class="home-nav">
          <li>
            <router-link :to="{ path: '/home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/products-market' }"
              >Products Market</router-link
            >
          </li>
          <li>
            <router-link :to="{ path: '/Waiting-for-allocated' }"
              >Request for Quote</router-link
            >
          </li>
          <li>
            <a class="d-flex" @click="gotoMyImport">
              <div rel="nofollow" class="import-but">
                <i class="el-icon-tickets" style="font-size: 24px;margin-right:10px"></i>
                <i v-if="$store.state.userInfo" class="badge" >{{this.$root.$children[0].importNum > 99 ? '99+' : this.$root.$children[0].importNum}}</i>
              </div>
              <div class="btn-text" rel="nofollow">
                Wait for import
              </div>
            </a>
          </li>
          <li v-if="$store.state.userInfo">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                My {{ $root.$children[0].pName.a }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  class="align-items-endd-flex"
                  style="width: 150px"
                  command="dashboard"
                >
                  <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
                </el-dropdown-item>
                <el-dropdown-item
                  class="align-items-endd-flex"
                  style="width: 150px"
                  command="profile"
                >
                  <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> My
                  Profile
                </el-dropdown-item>
                <template v-if="$root.$children[0].baseUrl == '/my'">
                  <!-- 钱包导航 -->
                  <el-dropdown-item
                    class="align-items-end-flex"
                    style="width: 150px"
                    command="wallet"
                  >
                    <i
                      class="mg-r-15 iconfont icon-qianbao"
                      style="font-size: 14px"
                      aria-hidden="true"
                    ></i>
                    My Wallet
                  </el-dropdown-item>
                </template>
                <el-dropdown-item
                  class="d-flex"
                  style="width: 150px"
                  command="exit"
                >
                  <i class="mg-r-15 fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li v-else>
            <!--<router-link to="/login">LOGIN</router-link>-->
            <a href="javascript:;" @click="login">LOGIN</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-main">
      <div class="card1">
        <div class="content">
          <div class="left">
            <p class="row1">
              Allocate Orders for vendors<br />
              and Automate <br />your entire dropshipping process
            </p>
            <p class="row2">
              With just one click, you can easily allocate your stores orders to
              your vendors and the entire shipping process will be automatically
              completed.
            </p>
            <LoginDropdown
              :loading="loading"
              :platformArr="platformArr"
              :activePlatform="activePlatform"
              :shopUrl="shopUrl"
              @selectPlatform="selectPlatform"
              @gotoLogin="gotoLogin"
            />
          </div>
          <div class="right">
            <div class="home-image">
              <img src="./../../public/images/home/home-image.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="card2">
        <div class="content">
          <div class="title">How does it work?</div>
          <ul class="step-li">
            <li>
              <div class="img"></div>
              <div class="text">1. Connect to your store</div>
            </li>
            <li>
              <div class="img"></div>
              <div class="text">2. Allocate orders to your vendors</div>
            </li>
            <li>
              <div class="img"></div>
              <div class="text">3. The vendor arranges the delivery</div>
            </li>
            <li>
              <div class="img"></div>
              <div class="text">
                4. Automatic fulfillment of your orders by
                {{ $root.$children[0].pName.a }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card3">
        <div class="content">
          <div class="text">
            <div class="r1">
              See what our <br />
              customers talk about us.
            </div>
            <div class="r2">
              More than 10,000+ customers around the world rely on us!
            </div>
          </div>
          <div class="img"></div>
        </div>
      </div>
      <div class="card4">
        <div class="content">
          <div class="img"></div>
          <div class="ipt">
            <LoginDropdown
              :loading="loading"
              :platformArr="platformArr"
              :activePlatform="activePlatform"
              :shopUrl="shopUrl"
              @selectPlatform="selectPlatform"
              @gotoLogin="gotoLogin"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <DialogSignin
      :data="dialogSignin"
      :platformArr="platformArr"
      @openSingUp="openSingUp"
      @signIn="signIn"
      @forgotPS="openForgotPS"
      @selectLogin="selectLogin"
    />
    <DialogSignUp
      ref="dialogSingUp"
      :data="dialogSignup"
      :platformArr="platformArr"
      :sec="emailCountDownSec.signup"
      @resetSEC="resetSEC"
      @openSingIn="openSingIn"
      @register="register"
      @selectLogin="selectLogin"
    />
    <DialogForgotPsd
      ref="dialogForgotPsd"
      :data="dialogForgotPsd"
      :sec="emailCountDownSec.forgot"
      @resetSEC="resetSEC"
      @saveNewPSD="saveNewPSD"
    />
    <el-backtop class="goto-top" :right="32" :bottom="120"> </el-backtop>
  </div>
</template>

<script>
import LoginDropdown from "./../components/Home/loginDropdown";
import DialogSignin from "./../components/Home/DialogSignIn"; //signIn 弹框登录
import DialogSignUp from "./../components/Home/DialogSignUp"; //sigup 注册
import DialogForgotPsd from "./../components/Home/DialogForgotPsd"; //忘记密码
import Footer from "./../components/PageFooter";
export default {
  data() {
    return {
      header2Visible: false,
      loading: false,
      time: 0,
      shopUrl: "",
      platformArr: this.$dict.platformArr,
      activePlatform: "shopify",
      dialogSignin: {
        isShow: false,
        loading: false,
        email: "",
        password: "",
      },
      dialogSigninDefault: "{}",
      dialogSignup: {
        isShow: false,
        loading: false,
        email: "",
        captcha: "",
        password: "",
        rePassword: "",
        isReadonly: true,
      },
      dialogSignupDefault: "{}",
      emailCountDownSec: {
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
        email: "",
        captcha: "",
        password: "",
        rePassword: "",
        isReadonly: true,
      },
      dialogForgotPsdDefault: "{}",
      forgotPsdCountDownSec: 0,
      forgetPsdCountDownTime: 0,
      time: 0,
      win: null,
    };
  },
  components: {
    DialogSignin,
    DialogSignUp,
    DialogForgotPsd,
    LoginDropdown,
    Footer,
  },
  mounted() {
    if (this.$route.query.action == "signup") {
      setTimeout(() => {
        this.login();
      }, 2000);
    }
    this.dialogSigninDefault = JSON.stringify(this.dialogSignin);
    this.dialogSignupDefault = JSON.stringify(this.dialogSignup);
    this.dialogForgotPsdDefault = JSON.stringify(this.dialogForgotPsd);
    if (
      this.$root.$children[0].getParentUrl() &&
      this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0
    ) {
    } else {
      this.$root.$children[0].checkLogin();
    }
    this.header2Visible = $(window).scrollTop() > 70;
    $(window).scroll(() => {
      this.header2Visible = $(window).scrollTop() > 70;
    });
    if (this.$route.params.login == "woo") {
      this.openSingIn();
    }
  },
  methods: {
    gotoMyImport(){
      if(this.$store.state.userInfo){
        window.location.href = '/my/import-list'
      }else{
        this.$Burying({
          object: '1001',
          objectUrl: '/my/import-list'
        })
        this.$router.push({path: '/login'})
      }
    },
    saveNewPSD() {
      //保存新密码
      if (!this.dialogForgotPsd.email) {
        this.$message({ message: "Email must be filled in", type: "error" });
        return;
      }
      if (!this.dialogForgotPsd.captcha) {
        this.$message({ message: "CAPTCHA must be filled in", type: "error" });
        return;
      }
      if (!this.dialogForgotPsd.password) {
        this.$message({
          message: "New password must be filled in",
          type: "error",
        });
        return;
      }
      if (this.dialogForgotPsd.password != this.dialogForgotPsd.rePassword) {
        this.$message({
          message: "The new password and confirm password must be the same",
          type: "error",
        });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if (!pwdRegex.test(this.dialogForgotPsd.password)) {
        this.$message({
          message:
            "The password must contain letters, and numbers, Minimum 8 characters",
          type: "error",
        });
        return;
      }
      this.dialogForgotPsd.loading = true;
      this.$apiCall(
        "api.User.resetPassword",
        {
          mobile: this.dialogForgotPsd.email,
          token: this.dialogForgotPsd.captcha,
          newPassword: this.dialogForgotPsd.password,
          repeatNewPassword: this.dialogForgotPsd.rePassword,
        },
        (r) => {
          this.dialogForgotPsd.loading = false;
          if (r.ErrorCode == 9999) {
            this.$message({
              message: "Password reset successful",
              type: "success",
            });
            this.openSingIn(
              this.dialogForgotPsd.email,
              this.dialogForgotPsd.password
            );
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    openForgotPS() {
      //打开忘记密码
      this.dialogSignin.isShow = false;
      this.dialogForgotPsd = JSON.parse(this.dialogForgotPsdDefault);
      this.dialogForgotPsd.isShow = true;
    },
    signIn() {
      //登录
      if (!this.dialogSignin.email) {
        this.$message({ message: "Email must be filled in", type: "error" });
        return;
      }
      if (!this.dialogSignin.password) {
        this.$message({ message: "Password must be filled in", type: "error" });
        return;
      }
      this.$Burying({
        object: "1002",
      });
      this.dialogSignin.loading = true;
      this.$apiCall(
        "api.User.login",
        {
          username: this.dialogSignin.email,
          password: this.dialogSignin.password,
          type: 1,
          lang: "EN",
        },
        (r) => {
          this.dialogSignin.loading = false;
          if (r.ErrorCode == 9999) {
            if (!localStorage.getItem("c_ourMallFirstLogin")) {
              localStorage.setItem("c_ourMallFirstLogin", 1);
            } else {
              localStorage.setItem("c_ourMallFirstLogin", 2);
            }
            localStorage.setItem("c_apiUserToken", r.Data.Results.apiUserToken);
            localStorage.setItem("c_apiUserId", r.Data.Results.id);
            localStorage.setItem("c_ourMallUserInfo",
              JSON.stringify(r.Data.Results)
            );
            this.$store.commit("setUserInfo", r.Data.Results);
            this.$Burying({
              object: "1005",
            });
            if (localStorage.getItem("c_wantVisitPath")) {
              this.$router.push({
                path: localStorage.getItem("c_wantVisitPath"),
              });
            } else {
              this.$router.push({ name: "dashboard" });
            }
            this.dialogSignin.isShow = false;
          } else {
            this.$message({ message: r.Message, type: "error" });
            this.$Burying({
              object: "1006",
            });
          }
        }
      );
    },
    register() {
      //注册
      if (!this.dialogSignup.email) {
        this.$message({ message: "Email must be filled in", type: "error" });
        return;
      }
      // if (!this.dialogSignup.captcha) {
      //   this.$message({ message: "CAPTCHA must be filled in", type: "error" });
      //   return;
      // }
      if (!this.dialogSignup.password) {
        this.$message({ message: "Password must be filled in", type: "error" });
        return;
      }
      if (this.dialogSignup.password != this.dialogSignup.rePassword) {
        this.$message({
          message: "The password and confirm password must be the same",
          type: "error",
        });
        return;
      }
      let pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/;
      if (!pwdRegex.test(this.dialogSignup.password)) {
        this.$message({
          message:
            "The password must contain letters, and numbers, Minimum 8 characters",
          type: "error",
        });
        return;
      }

      //注册
      this.dialogSignup.loading = true;
      this.$Burying({
        object: "2001",
      });
      this.$apiCall(
        "api.User.register",
        {
          username: this.dialogSignup.email,
          password: this.dialogSignup.password,
          // code: this.dialogSignup.captcha,
          notCheckCode: true,
          type: 1,
          lang: "EN",
        },
        (r) => {
          this.dialogSignup.loading = false;
          if (r.ErrorCode == "9999") {
            this.openSingIn(
              this.dialogSignup.email,
              this.dialogSignup.password
            );
            this.$Burying({
              object: "2004",
            });
          } else {
            this.$message({ message: r.Message, type: "error" });
            this.$Burying({
              object: "2005",
            });
          }
        }
      );
    },
    resetSEC(type) {
      //验证码开始计时
      this.emailCountDownSec[type] = 60;
      this.emailCountDown(type);
    },
    emailCountDown(type) {
      //验证码定时器
      clearInterval(this.emailCountDownTime[type]);
      this.emailCountDownTime[type] = setInterval(() => {
        this.emailCountDownSec[type]--;
        if (this.emailCountDownSec[type] < 1) {
          clearInterval(this.emailCountDownTime[type]);
          if (type == "signup") {
            this.$refs.dialogSingUp.$refs.verify.reset();
          } else if (type == "forgot") {
            this.$refs.dialogForgotPsd.$refs.verify.reset();
          }
        }
      }, 1000);
    },
    openSingUp() {
      //打开注册
      this.$Burying({
        object: "1003",
      });
      this.dialogSignin.isShow = false;
      let username = "";
      if (this.emailCountDownSec.signup) {
        username = this.dialogSignup.email;
      }
      this.dialogSignup = JSON.parse(this.dialogSignupDefault);
      this.dialogSignup.email = username;
      this.dialogSignup.isShow = true;
    },
    openSingIn(user, psd) {
      //打开登录
      this.$Burying({
        object: "1001",
      });
      this.dialogSignup.isShow = false;
      this.dialogForgotPsd.isShow = false;
      this.dialogSignin = JSON.parse(this.dialogSigninDefault);
      this.dialogSignin.isShow = true;
      if (user) this.dialogSignin.email = user;
      if (psd) this.dialogSignin.password = psd;
    },
    selectPlatform(p) {
      this.activePlatform = p;
    },
    handleCommand(command) {
      switch (command) {
        case "exit":
          localStorage.removeItem("c_wantVisitPath");
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({ name: "profile" });
          break;
        case "dashboard":
          this.$router.push({ name: "dashboard" });
          break;
        case "wallet":
          if (this.baseUrl != "/my") return;
          this.$router.push({ name: "wallet" });
      }
    },
    login() {
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.openSingIn();
      }
    },
    selectLogin(p) {
      this.activePlatform = p;
      this.gotoLogin();
    },
    gotoLogin(url) {
      switch (this.activePlatform) {
        case "shopify":
          this.shopUrl = url;
          if (localStorage.getItem("c_ourMallUserInfo")) {
            this.$router.push({
              name: "stores",
              params: {
                add: true,
                val: this.shopUrl,
                platform: this.activePlatform,
              },
            });
          } else {
            this.loginPlatform(this.activePlatform, this.shopUrl);
          }
          break;
        case "lazada":
          if (localStorage.getItem("c_ourMallUserInfo")) {
            this.$router.push({
              name: "stores",
              params: { add: true, platform: this.activePlatform },
            });
          } else {
            this.loginPlatform(this.activePlatform);
          }
          break;
        case "shopee":
          break;
        case "woo":
          if (localStorage.getItem("c_ourMallUserInfo")) {
            this.$router.push({
              name: "stores",
              params: { add: true, platform: this.activePlatform },
            });
          } else {
            this.login();
          }
          break;
      }
    },
    loginPlatform(activePlatform, shopUrl) {
      if (activePlatform == "shopify") {
        if (!shopUrl) {
          this.$elementMessage("Please enter Shopify store name", "error");
          return false;
        }
        this.win = window.open("/blank.html", "Shopify");
        this.loading = true;
        this.$apiCall(
          "api.ShopifyAccount.addShopifyAccount",
          {
            shopUrl,
            getAuth: 1,
            ivc: localStorage.getItem("c_ivc") ? localStorage.getItem("c_ivc") : "",
            utmSource: localStorage.getItem("c_utm"),
          },
          (r) => {
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
      } else {
        //其他平台
        let platform;
        this.win = window.open("/blank.html", "platformLogin");
        this.loading = true;
        //lazade
        if (activePlatform == "lazada") {
          platform = 3;
        }
        //shopee

        //登录
        this.$apiCall(
          "api.ShopifyAccount.addOtherAccount",
          {
            platform,
            ati: this.$getCookie("_ati"),
            ivc: localStorage.getItem("c_ivc") ? localStorage.getItem("c_ivc") : "",
            utmSource: localStorage.getItem("c_utm"),
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              this.win.location = r.Data.Results.url;
              this.time = setInterval(() => {
                this.getLoginStatus(r.Data.Results.state);
              }, 2000);
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      }
    },
    getLoginStatus(state) {
      if (this.win.closed) {
        this.loading = false;
        clearInterval(this.time);
      }
      let params = {};
      if (this.activePlatform == "shopify") {
        params.shopUrl = this.shopUrl;
      }
      if (this.activePlatform == "lazada") {
        params.state = state;
      }
      this.$apiCall("api.ShopifyAccount.getShopAuthStatus", params, (r) => {
        if (r.ErrorCode == "9999") {
          if (r.Data.Results.status) {
            clearInterval(this.time);
            if (r.Data.Results.status == 1) {
              if (!localStorage.getItem("c_ourMallFirstLogin")) {
                localStorage.setItem("c_ourMallFirstLogin", 1);
              } else {
                localStorage.setItem("c_ourMallFirstLogin", 2);
              }
              localStorage.setItem("c_apiUserId", r.Data.Results.userInfo.id);
              localStorage.setItem("c_apiUserToken",
                r.Data.Results.userInfo.apiUserToken
              );
              localStorage.setItem("c_ourMallUserInfo",
                JSON.stringify(r.Data.Results.userInfo)
              );
              this.$store.commit("setUserInfo", r.Data.Results.userInfo);
              if (localStorage.getItem("c_wantVisitPath")) {
                this.$router.push({
                  path: localStorage.getItem("c_wantVisitPath"),
                });
              } else {
                this.$router.push({ name: "dashboard" });
              }
              if (sessionStorage.getItem("c_ourmallInviteCode")) {
                this.$apiCall(
                  "api.User.checkInvite",
                  { inviteCode: sessionStorage.getItem("c_ourmallInviteCode") },
                  (r) => {
                    this.win.close();
                  }
                );
              } else {
                this.win.close();
              }
            } else {
              this.loading = false;
              this.$message({
                type: "error",
                duration: 0,
                message: r.Data.Results.errorMessage,
                showClose: true,
              });
              // setTimeout(()=>{
              //   window.location.reload();
              // },1000)
              this.win.close();
            }
          }
        } else {
          clearInterval(this.time);
          this.$elementMessage(r.Message, "error");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  min-width: 1300px;
  height: 100%;
  background-image: url("./../../public/images/home/home-header.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 290px;
  .home-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 1300px;
    padding: 15px;
    transition: all 1s;
    h1 {
      width: 282px;
      height: 50px;
      background-image: url("./../../public/images/logo2.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .home-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-content: center;
      li {
        margin: 0 20px;
        a,
        .el-dropdown-link {
          color: #fff;
          font-weight: bold;
          font-size: 16px;
        }
        a:hover {
          color: #c0c4cc;
          text-decoration: none;
        }
      }
    }
  }
  .home-main {
    .card1 {
      background-image: url("./../../public/images/home/home-main-bg.png");
      background-repeat: no-repeat;
      background-position: center bottom;
      padding-bottom: 50px;
      .content {
        display: flex;
        justify-content: space-between;
        margin: 120px auto 0;
        padding-bottom: 30px;
        width: 1300px;
        .left {
          width: 750px;
          .row1 {
            margin-bottom: 20px;
            line-height: 60px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-weight: bold;
            font-size: 48px;
            color: #568dca;
          }
          .row2 {
            margin-bottom: 40px;
            line-height: 26px;
            font-size: 16px;
          }
        }
        .right {
          .home-image {
            img {
              width: 390px;
            }
          }
        }
      }
    }
    .card2 {
      background-color: #d2eaf9;
      .content {
        margin: 0 auto;
        padding-bottom: 70px;
        width: 1300px;
        .title {
          margin-bottom: 60px;
          text-align: center;
          font-weight: bold;
          font-size: 36px;
        }
        .step-li {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          li {
            width: 360px;
            background-image: url("./../../public/images/home/arrow-right.png");
            background-repeat: no-repeat;
            background-position: 246px 78px;
            .img {
              margin-bottom: 15px;
              width: 220px;
              height: 220px;
              background-color: #fff;
              border-radius: 50%;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            }
            .text {
              width: 220px;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
            }
          }
          li:nth-child(1) {
            .img {
              background-image: url("./../../public/images/home/step1.png");
            }
          }
          li:nth-child(2) {
            .img {
              background-image: url("./../../public/images/home/step2.png");
            }
          }
          li:nth-child(3) {
            .img {
              background-image: url("./../../public/images/home/step3.png");
            }
          }
          li:last-child {
            width: 220px;
            .img {
              background-image: url("./../../public/images/home/step4.png");
            }
          }
        }
      }
    }
    .card3 {
      background: #fff;
      .content {
        margin: 0 auto;
        display: flex;
        align-items: center;
        width: 960px;
        padding: 60px 0;
        .text {
          flex: 1;
          .r1 {
            margin-bottom: 15px;
            line-height: 42px;
            color: #606266;
            font-weight: bold;
            font-size: 32px;
          }
          .r2 {
            color: #909399;
          }
        }
        .img {
          width: 410px;
          height: 380px;
          background-image: url("./../../public/images/home/card3-img.png");
          background-position: center;
          background-size: contain;
        }
      }
    }
    .card4 {
      background-color: $--color-primary;
      padding: 15px 0;
      .content {
        margin: 0 auto;
        width: 1230px;
        display: flex;
        align-items: center;
        .img {
          margin-right: 100px;
          width: 480px;
          height: 350px;
          background-image: url("./../../public/images/home/card4-img.png");
        }
        .ipt {
          flex: 1;
          .row4 {
            color: #fff;
            a {
              color: #fff;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

.home-header2 {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px #dcdfe6 solid;
  overflow: hidden;
  opacity: 0;
  height: 0;
  transition: all 0.5s;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 1300px;
    height: 70px;
    h1 {
      width: 282px;
      height: 50px;
      background-image: url("./../../public/images/logo.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .home-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-content: center;
      li {
        margin: 0 20px;
        a {
          color: #525fb0;
          font-weight: bold;
          font-size: 16px;
        }
        a:hover {
          color: #c0c4cc;
          text-decoration: none;
        }
      }
    }
  }
}
.home-header2.active {
  height: 70px;
  opacity: 1;
}
.el-dropdown-link {
  font-weight: bold;
  font-size: 16px;
}
.el-backtop {
  right: 32px !important;
  transform: none;
}
.import-but{
  position: relative;
  .badge{
    position: absolute;
    top: -6px;
    right: 0;
    padding: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #FF5656;
    font-style: normal;
  }
}


</style>