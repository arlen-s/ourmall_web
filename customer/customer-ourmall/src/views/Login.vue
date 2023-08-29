<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Log in to your</h2>
      <a href="/">
        <h1 :class="{go: $root.$children[0].baseUrl == '/my' }"></h1>
      </a>
      <div class="box mg-b-5">
        <p>{{$t('Please enter your store name to connect the dashboard page:')}}</p>
        <div class=" d-flex mg-b-30" style="justify-content: center;">
          <el-dropdown class="select-p" @command="selectPlatform">
            <div class="el-dropdown-link d-flex">
              <i class="p-icon mg-r-5" :class="activePlatform"></i> 
              <span v-if="activePlatform" class=" mg-r-5">{{platformArr[activePlatform].name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(platform, k) in platformArr" :key="k"
                :command="k"
              >
                <div class=" d-flex">
                  <i class="p-icon" :class="k"></i>
                  {{platform.name}}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <template v-if="activePlatform == 'shopify'">
            <span style="color: #909399; font-size: 16px;">https://</span>
            <input
              type="text"
              :placeholder="$t('Shopify store name')"
              @input="storeInput($event.target.value)"
              v-model="shopUrl"
              @keyup.enter="login"
            >
            <span>.myshopify.com</span>
          </template>
        </div>
        <div>
          <el-button
            v-if="platformArr[activePlatform].enabled"
            class="login-btn"
            id="loginSubmit"
            :loading="loading"
            @click="login"
          >{{loading ? 'Please Wait' : 'LOGIN'}}</el-button>
          <el-button v-else
            class="login-btn"
            :disabled="true"
          >Coming soon</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      time: 0,
      win: null,
      shopUrl: "",
      activePlatform: "shopify",
      platformArr: this.$dict.platformArr,
    };
  },
  beforeDestroy(){
    clearInterval(this.time);
  },   
  mounted() {
    this.activePlatform = this.$route.query.platform ? this.$route.query.platform : 'shopify';
    if (this.$route.query.shopUrl) {
      this.shopUrl = this.$route.query.shopUrl;
      setTimeout(() => {
        // this.login();
      }, 1000);
    }
    if(this.$route.query.platform == 'lazada'){
      setTimeout(() => {
        // this.login();
      }, 1000);
    }
    if(this.$route.query.invitecode){
      sessionStorage.setItem('c_ourmallInviteCode', this.$route.query.invitecode)
    }
  },
  methods: {
    selectPlatform(p){
      this.activePlatform = p;
    },
    storeInput(val) {
      let codeReg = new RegExp("[A-Za-z0-9-_]+"), //正则 英文+数字；
        len = val.length,
        str = "";
      for (var i = 0; i < len; i++) {
        if (codeReg.test(val[i])) {
          str += val[i];
        }
      }
      this.shopUrl = str;
    },
    getLoginStatus(state) {
      let params = {};
      if(this.activePlatform == 'shopify'){
        params.shopUrl = this.shopUrl;
      }
      if(this.activePlatform == 'lazada'){
        params.state = state
      }
      this.$apiCall(
        "api.ShopifyAccount.getShopAuthStatus", params,
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
                
                //新首页登录监听
                localStorage.setItem('c_otherLoginSuccess', new Date().getTime());

                if(localStorage.getItem('c_wantVisitPath')){
									this.$router.push({ path: localStorage.getItem('c_wantVisitPath')});
                }else{
                	this.$router.push({ name: "dashboard" });
                }
                if(sessionStorage.getItem('c_ourmallInviteCode')){
                  this.$apiCall('api.User.checkInvite', {inviteCode: sessionStorage.getItem('c_ourmallInviteCode')}, r => {
                    this.win.close();
                  })
                }else{
                  this.win.close();
                }
                if(window.name == 'login'){
                  if(window.opener){
                    window.close();
                  }else{
                    window.location.href = '/'
                  }
                  
                }
              } else {
                this.loading = false;
                this.$message({
                  type: "error",
                  duration: 0,
                  message:r.Data.Results.errorMessage,
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
        }
      );
    },
    login() {
      if(this.activePlatform == 'woo'){
        this.$router.push({name: 'home', params: {login: 'woo'}})
        return;
      }
      if(this.activePlatform == 'shopify'){
        if (!this.shopUrl) {
          this.$elementMessage("Please enter Shopify store name", "error");
          return false;
        }
        this.win = window.open((process.env.VUE_APP_BASEURL == '/' ? '':  process.env.VUE_APP_BASEURL) + "/blank.html", "Shopify");
        this.loading = true;
        this.$apiCall(
          "api.ShopifyAccount.addShopifyAccount",
          {
            apiUserId: '0',
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
      }else{
        //其他平台
        let platform;
        this.win = window.open("/blank.html", "platformLogin");
        this.loading = true;
        //lazade
        if(this.activePlatform == 'lazada'){
          platform = 3;
        }
        //shopee
        //登录
        this.$apiCall("api.ShopifyAccount.addOtherAccount", {
          apiUserId: "0",
          platform,
          ati: this.$getCookie('_ati'),
          ivc:localStorage.getItem('c_ivc') ? localStorage.getItem('c_ivc') : '',
          utmSource:localStorage.getItem('c_utm'),
        }, r => {
          if (r.ErrorCode == "9999") {
            this.win.location = r.Data.Results.url;
            this.time = setInterval(() => {
              this.getLoginStatus(r.Data.Results.state);
            }, 2000);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        })
      }
      
    },
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #525fb0;
  .login-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
      background-image: url("./../../public/images/logo2.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    h1.go{
      background-image: url("./../../public/images/logon2.png");
      height: 76px;
    }
    .box {
      margin-bottom: 5px;
      border-radius: 6px;
      padding: 20px;
      width: 550px;
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
        width: 190px;
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
      button.is-disabled{
        color: #909399;
        background: #f4f4f5;
        border: 1px #d3d4d6 solid;
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
.select-p, .el-dropdown-menu{
  .el-dropdown-link{
    padding-right:5px;
    height: 32px;
    > span{
      font-weight: bold;
      font-size: 16px;
    }
  }
  .p-icon{
    width: 25px;
    height: 25px;
    background-image: url('./../../public/images/home/platform-icon.png');
    background-size: 100%;
  }
  .p-icon.lazada{
    background-position: 0 75px;
  }
  .p-icon.shopee{
    background-position: 0 50px;
  }
  .p-icon.woo{
    background-position: 0 25px;
  }
}
</style>