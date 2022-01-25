<template>
  <div class="page-invite-reg">
    <div class="header">
      <div class="content">
        <h1></h1>
      </div>
    </div>
    <div class="body">
      <div v-loading="pageLoading" class="content">
        <p class="row1">Hello {{customerName}},</p>
        <p class=" row2">
          {{words}}
        </p>
        <p class="row3">Yours,</p>
        <p class=" row4">{{vendorName}}</p>
        <div class="reg">
          <div class="reg-box">
            <div class="row5">
              <div class="s-logo"></div>

            </div>
            <div class="row6">
              <div>
                <span class="http">http://</span>
                <input
                  type="text"
                  placeholder="Your Shopify store name"
                  @input="storeInput($event.target.value)"
                  v-model="shopUrl"
                >
                <span class="domain">.myshopify.com</span>
              </div>

              <el-button
                :loading="loading"
                @click="login"
              >
                {{loading ? 'Please Wait' : 'Connect'}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div>&copy; 2021, Powered by {{$root.$children[0].pName.b}} APP</div>
      <!-- <div>
        <router-link :to="{name: 'terms'}" target="_blank">Terms of Service</router-link>
        <router-link :to="{name: 'privacy'}" target="_blank">Privacy Policy</router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pageLoading: true,
      loading: false,
      shopUrl: "",
      customerName: "",
      words:"",
      vendorName: "",
    }
  },
  created() {
    $("body").addClass("primary-bg");
    $("#viewport").attr("content", "width=device-width,initial-scale=1.0");
  },
  beforeDestroy() {
    $("body").removeClass("primary-bg");
    $("#viewport").attr(
      "content",
      "width=device-width, user-scalable=yes, initial-scale=0.3, maximum-scale=1.0, minimum-scale=0.3"
    );
  },
  mounted(){
    this.getWords()
  },
  methods: {
    getWords(){
      this.pageLoading = true;
      this.$apiCall("api.Relationship.getRelationshipByRid", {
        rid: decodeURIComponent(this.$route.query.rid)
      }, r => {
        this.pageLoading = false;
        if (r.ErrorCode == "9999") {
         this.customerName = r.Data.Results.customerName;
         this.words = r.Data.Results.words;
         this.vendorName = r.Data.Results.vendorName;
        }else{
          this.$elementMessage(r.Data.Results.errorMessage, "error");
        }
      });
    },
    getLoginStatus() {
      this.$apiCall(
        "api.ShopifyAccount.getShopAuthStatus",
        {
          shopUrl: this.shopUrl
        },
        r => {
          if (r.ErrorCode == "9999") {
            localStorage.setItem('c_inviteShopUrl', this.shopUrl)
            if (r.Data.Results.status) {
              clearInterval(this.time);
              if (r.Data.Results.status == 1) {
                localStorage.setItem("c_apiUserId", r.Data.Results.userInfo.id);
                localStorage.setItem("c_apiUserToken",
                  r.Data.Results.userInfo.apiUserToken
                );
                localStorage.setItem("c_ourMallUserInfo",
                  JSON.stringify(r.Data.Results.userInfo)
                );
                this.$store.commit("setUserInfo", r.Data.Results.userInfo);
                this.$router.push({ name: "dashboard" });
                this.win.close();
              } else {
                this.loading = false;
                this.$elementMessage(r.Data.Results.errorMessage, "error");
                this.win.close();
                setTimeout(()=>{
                  window.location.reload();
                },1000)
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
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      this.win = window.open((process.env.VUE_APP_BASEURL == '/' ? '':  process.env.VUE_APP_BASEURL) + "/blank.html", "Shopify");
      this.loading = true;
      this.$apiCall(
        "api.ShopifyAccount.addShopifyAccount",
        {
          shopUrl: this.shopUrl,
          getAuth: 1,
          rid: this.$route.query.rid,
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
    }
  }
};
</script>
<style lang="scss">
.primary-bg {
  background-color: $--color-primary;
}
</style>
<style lang="scss" scoped>
.page-invite-reg {
  position: relative;
  height: 100%;
  min-height: 500px;
}
.header {
  margin-bottom: 40px;
  background-color: #fff;
  border-bottom: 1px #dcdfe6 solid;
  .content {
    margin: 0 auto;
    max-width: 1300px;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    h1 {
      width: 250px;
      height: 30px;
      background-image: url("./../../public/images/logo.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
.body {
  margin-bottom: 10px;
  .content {
    margin: 0 auto;
    max-width: 600px;
    width: 90%;
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    .reg-box {
      margin: 0 auto;
      max-width: 500px;
      width: 100%;
      .row5 {
        margin: 0 auto 5px;
        font-weight: bold;
        font-size: 18px;
        .s-logo {
          margin: 0 auto 10px;
          width: 80px;
          height: 28px;
          background-image: url("./../../public/images/shopify-logo.png");
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .row6 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .http{
          display: none;
        }
        input {
          width: 190px;
          height: 36px;
          padding: 0 15px;
          outline: none;
          border: 1px #e4e7ed solid;
          border-radius: 4px 0 0 4px;
          font-size: 16px;
        }
        div {
          display: flex;
          margin-bottom: 5px;
        }
        span {
          padding: 0 5px;
          border: 1px #e4e7ed solid;
          border-left: none;
          border-radius: 0 4px 4px 0;
          background: #f5f7fa;
          line-height: 34px;
          color: #909399;
          font-size: 14px;
        }
        button {
          background-color: #e94b26;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
        }
        button:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
.row1 {
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 18px;
}
.row2 {
  margin-bottom: 30px;
  line-height: 26px;
  font-size: 16px;
}
.row3 {
  font-size: 14px;
  font-weight: bold;
}
.row4 {
  margin-bottom: 20px;
  font-size: 14px;
}

.page-footer {
  margin: 0 auto;
  padding: 0 15px;
  max-width: 600px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  color: #c0c4cc;
  a {
    margin-right: 15px;
    color: #fff;
  }
}
@media screen and (min-width: 640px) {
  .body .content .reg-box .row6 input {
    width: 300px;
  }
}
@media screen and (min-width: 768px) {
  .body .content{
    max-width: 980px
  }
  .body .content .reg-box .row6 .http{
    display: inline-block;
    border-left: 1px #e4e7ed solid;
    border-right: none;
    border-radius: 4px 0 0 4px;
  }
  .body .content .reg-box .row6 input {
    border-radius: 0;
    margin: 0;
  }
  .body .content .reg-box .row6 span {
    border: 1px #e4e7ed solid;
    line-height: 34px;
    border-left: none;
  }
  .body .content .reg-box .row6 div {
    margin-bottom: 20px;
  }
  .body .content .reg-box .row6 button {
    height: 38px;
    border-radius: 4px;
    position: relative;
    line-height: 14px;
  }
  .page-footer{
    max-width: 980px;
  }
}
</style>