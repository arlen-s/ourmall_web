<template>
  <div class="page-invite-reg">
    <div class="header">
      <div class="content">
        <h1></h1>
      </div>
    </div>
    <div class="body">
      <div class="content" v-loading="pageLoading">
        <p class="row1">{{ $t('invite.你好') }} {{vendorName}},</p>
        <div
          class="row2 content-zw"
          v-html="$t('invite.正文', { customerName, customerId })"
        />
        <p class="row3">{{ $t('invite.服务商名称') }}</p>
        <p class=" row4">{{ $t('invite.支持团队') }}</p>
        <div class="reg">
          <div class="reg-box">
            <div class="row5">
              <div class="s-logo"></div>

            </div>
            <div class="row6">
              <el-button @click="login" type="primary">{{ $t('invite.登陆') }}</el-button>
              <el-link @click="registered" type="primary">{{ $t('invite.注册') }}</el-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div>&copy; 2015-2021 OurMall Dropshipping APP</div>
      <!-- <div>
        <router-link :to="{name: 'terms'}" target="_blank">Terms of Service</router-link>
        <router-link :to="{name: 'privacy'}" target="_blank">Privacy Policy</router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  data() {
    return {
      pageLoading: false,
      customerName: '',
      customerId: '',
      contents: '',
      vendorName: '',
      relationshipId: '',
    }
  },
  mounted() {
    this.iniData()
  },
  methods: {
    registered() {
      this.$router.push({
        path: '/signup',
        query: {
          rid: this.relationshipId
        }
      });
    },
    login() {
      this.$router.push({
        path: '/',
        query: {
          rid: this.relationshipId
        }
      });
    },
    iniData() {
      const rid = this.$route.query.rid || ''
      this.pageLoading = true
      this.$apiCall(
        "api.User.checkInviteCode",
        {
          inviteCode: rid
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.customerName = r.Data.Results.customerName
            this.contents = r.Data.Results.contents
            this.vendorName = r.Data.Results.vendorName
            this.relationshipId = r.Data.Results.relationshipId
            this.customerId = r.Data.Results.customerId
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.pageLoading = false
        });
    }
  },
}
</script>
<style lang="scss" scoped>
.page-invite-reg {
  position: relative;
  height: 100%;
  min-height: 500px;
  background-color: #5c6ac4;
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
      max-width: 550px;
      width: 100%;
      .row5 {
        margin: 0 auto 5px;
        font-weight: bold;
        font-size: 18px;
        .s-logo {
          margin: 0 auto 10px;
          width: 80px;
          height: 28px;
          //background-image: url("./../../public/images/shopify-logo.png");
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .row6 {
        display: flex;
        justify-content: space-around;
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
@media screen and (min-width: 768px) {
  .body .content{
    max-width: 980px
  }
  .page-footer{
    max-width: 980px;
  }
}
.content-zw {
  line-height: 2;
}
</style>
