<template>
  <div class="contentpanel profile-page">
    <div class="pagetitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/dashboard'}">Dashboard</el-breadcrumb-item>
        <el-breadcrumb-item>My Profile</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-loading="loading" class="pagebody">
      <el-row :gutter="20" class="mg-b-20">
        <el-form ref="form" :model="form" label-width="150px">
          <el-col :span="24">
            <el-card class="mg-b-25">
              <div slot="header" class="clearfix">
                <span class="header-title-text">GENERAL INFORMATION</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="Full Name" required>
                    <el-input v-model="form.name" placeholder="Full Name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <el-card class="mg-b-25">
              <div slot="header" class="clearfix">
                <span class="header-title-text">CONTACT</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Country">
                    <el-select
                      v-model="form.country"
                      filterable
                      placeholder="Country"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="opt in countryArr"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Address">
                    <el-input v-model="form.address" placeholder="Address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Location">
                    <el-input v-model="form.location" placeholder="Location"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Phone">
                    <!-- <el-input
                      v-model="form.phone"
                      placeholder="Phone"
                    ></el-input>-->
                    {{form.phone}}
                    <el-link
                      type="primary"
                      class="mg-l-10"
                      style="margin-bottom:3px"
                      @click="changeUserPhone"
                    >
                      <span v-if="form.phone">Change</span>
                      <span v-else>Add</span>
                    </el-link>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Email">
                    <!-- <el-input
                      v-model="form.email"
                      placeholder="Email"
                    ></el-input>-->
                    {{form.email}}
                    <el-link
                      type="primary"
                      class="mg-l-10"
                      style="margin-bottom:3px"
                      @click="changeUserEmail"
                    >
                      <span v-if="form.email">Change</span>
                      <span v-else>Add</span>
                    </el-link>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <el-card class="mg-b-25">
              <div slot="header" class="clearfix">
                <span class="header-title-text">SOCIAL</span>
                <!-- <el-tooltip v-if="process.env.VUE_APP_BASEURL == '/my' && !isGift" class="item" effect="dark" :content="tip" placement="right-start">
                   <span class="mg-l-10" style="display:inline-block">
                    <a href="/activity">
                      <i class="iconfont icon-gift" style="font-size:26px"></i>
                      </a>
                   </span>
                </el-tooltip>-->
              </div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="WeChat">
                    <div slot="label">
                      <i class="label-i iconfont icon-wechat"></i>
                    </div>
                    <el-input v-model="form.weChat" placeholder="WeChat"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="skype">
                    <div slot="label">
                      <i class="label-i iconfont icon-skype"></i>
                    </div>
                    <el-input v-model="form.skype" placeholder="Skype"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Line">
                    <div slot="label">
                      <i class="label-i iconfont icon-line"></i>
                    </div>
                    <el-input v-model="form.line" placeholder="Line"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="QQ">
                    <div slot="label">
                      <i class="label-i iconfont icon-qq"></i>
                    </div>
                    <el-input v-model="form.QQ" placeholder="QQ"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="WangWang">
                    <div slot="label">
                      <i class="label-i iconfont icon-wangwang"></i>
                    </div>
                    <el-input v-model="form.wangwang" placeholder="WangWang"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Whatsapp">
                    <div slot="label">
                      <i class="label-i iconfont icon-whatsapp"></i>
                    </div>
                    <el-input v-model="form.whatsapp" placeholder="Whatsapp"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <!-- 新加信息邮箱验证 -->
            <el-card class="mg-b-25">
              <div slot="header" class="clearfix">
                <span class="header-title-text">Notification Settings</span>
              </div>
              <div class="el-row" style="margin-left: -10px; margin-right: -10px;">
                <div
                  class="el-col el-col-12 d-flex"
                  style="margin:0 145px;flex-direction: column;align-items: flex-start;"
                >
                  <div class="d-flex" style="margin-bottom:36px">
                    <div style="color: #606266;">I want to receive notfications by:</div>
                    <div style="margin:5px 30px 0">
                      <el-checkbox disabled v-model="checked1">Email</el-checkbox>
                      <el-checkbox v-model="checkedPhone">Mobile phone</el-checkbox>
                    </div>
                  </div>
                  <div style="margin-bottom:36px">
                    <p>
                      <el-checkbox disabled v-model="checked1">Allow system notifhcations</el-checkbox>
                    </p>
                    <p>
                      <el-checkbox
                        v-model="checked2"
                      >Allow Customer Services from {{$root.$children[0].pName.a}} staffs</el-checkbox>
                    </p>
                    <p>
                      <el-checkbox v-model="checked3">Allow Dropshipping News</el-checkbox>
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="bottom-action">
      <el-button v-if="!loading" @click="reset">Reset All</el-button>
      <el-button :loading="loading" type="primary" @click="save">Save Changes</el-button>
    </div>
    <el-dialog
      :title="isPhone == true ? 'Modify User Phone' : 'Modify User Email'"
      :visible.sync="changeUserEmailShow"
      width="600px"
      @close="resetPhone"
      :close-on-click-modal="false"
    >
      <el-row :gutter="30">
        <el-col :span="24">
          <el-form>
            <el-form-item :label="isPhone==false? 'Email':'Phone'" label-width="80px">
              <div class="phoneCountry">
                <template v-if="isPhone == true">
                  <VueCountryIntl v-model="form.phoneCountry" onlyValue placeholder="Country"></VueCountryIntl>
                </template>
                <el-input
                  :placeholder="isPhone==false? 'Email':'Phone'"
                  v-model="userEmail"
                  auto-complete="off"
                  :disabled="time>0"
                ></el-input>
              </div>

              <span v-if="failTx" class="tx-danger">{{failTx}}</span>
            </el-form-item>
            <el-form-item label="Verify" label-width="80px">
              <vue-simple-verify
                ref="verify"
                @success="successFunction"
                :width="480"
                tips="Hold down the slider and drag to the right"
                successTips="Validation passed"
              />
            </el-form-item>
            <el-form-item label="Captcha" label-width="80px">
              <div class="d-flex">
                <el-input
                  style="width: 268px;"
                  placeholder="Please enter the captcha you received"
                  v-model="authcode"
                  auto-complete="off"
                ></el-input>

                <el-link
                  class="mg-l-10"
                  :underline="false"
                  v-if="!sendMsgDisabled"
                  type="primary"
                  :disabled="!canSendAuthCode"
                  @click="sendAuthCode"
                >Get captcha</el-link>
                <el-link
                  class="mg-l-10"
                  :underline="false"
                  v-if="sendMsgDisabled"
                  type="primary"
                  :disabled="!canSendAuthCode"
                  @click="sendAuthCode"
                >try again in {{time}} seconds</el-link>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="!authcode" type="primary" @click="saveChange">Save</el-button>
        <el-button @click="closeChange">Discard</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import countryArr from "./../components/country.json"
export default {
  data () {
    return {
      customUrl: process.env.VUE_APP_BASEURL,
      checkList: [],
      authcode: "",
      sendMsgDisabled: false,
      canSaveEdit: false,
      canSendAuthCode: false,
      canSendAuthCodeAgain: false,
      econfirmSuccess: false,              /*验证成功判断*/
      time: 0,
      failTx: "",
      isPhone: false,
      checkedPhone: false,
      checked: true,
      checked1: true,
      checked2: false,
      checked3: false,
      loading: false,
      changeUserEmailShow: false,
      countryArr: [],
      userEmail: "",
      form: {
        name: "",
        country: "",
        address: "",
        location: "",
        phone: "",
        email: "",
        weChat: "",
        skype: "",
        line: "",
        QQ: "",
        wangwang: "",
        whatsapp: "",
        receivePhone: '',
        allowService: '',
        allowNews: '',
        phoneCountry: '',
      },
      formDefault: "{}",
      tip: '',
      isGift: false,
    }
  },
  mounted () {
    this.$Burying({
      object: '10001'
    })
    this.formDefault = JSON.stringify(this.form)
    //格式化国家
    Object.keys(countryArr).forEach((key) => {
      Object.keys(countryArr[key]).forEach((key2) => {
        this.countryArr.push({
          label: countryArr[key][key2].nameEN,
          value: countryArr[key][key2].code2,
        })
      })
    })
    let t = setInterval(() => {
      if (this.$store.state.userInfo) {
        clearInterval(t)
        this.form.name = this.$store.state.userInfo.name
        this.form.weChat = this.$store.state.userInfo.weChat
        this.form.skype = this.$store.state.userInfo.skype
        this.form.whatsapp = this.$store.state.userInfo.whatsapp
        this.form.wangwang = this.$store.state.userInfo.wangwang
        this.form.QQ = this.$store.state.userInfo.QQ
        this.form.line = this.$store.state.userInfo.line
        this.form.country = this.$store.state.userInfo.country
        this.form.location = this.$store.state.userInfo.location
        this.form.address = this.$store.state.userInfo.address
        this.form.phone = this.$store.state.userInfo.mobile
        this.form.email = this.$store.state.userInfo.email
        this.checkedPhone = this.$store.state.userInfo.receivePhone == 1 ? true : false
        this.checked2 = this.$store.state.userInfo.allowService == 1 ? true : false
        this.checked3 = this.$store.state.userInfo.allowNews == 1 ? true : false
        if (!this.form.whatsapp && !this.form.skype) {
          this.tip = "Complete your Skype or WhatsApp details to get rewards"
        } else {
          this.tip = "You have completed the Skype or WhatsApp, you can receive a free gift package."
        }
        if (this.$store.state.userInfo.getSkypeWhatsappFree == true) {
          this.isGift = true
        }
      }
    }, 500)
  },
  methods: {
    changeUserPhone () {
      this.isPhone = true
      this.changeUserEmail()
    },
    // 获取验证码
    sendAuthCode () {
      this.$showLoading()
      let vm = this
      vm.sendMsgDisabled = true
      vm.canSendAuthCode = false
      vm.canSendAuthCodeAgain = true

      if (this.isPhone == false) {
        // 邮箱验证码
        this.$apiCall("api.User.checkEmail", {
          email: vm.userEmail
        }, r => {
          this.$hideLoading()
          if (r.ErrorCode == '9999') {
            this.$elementMessage('The captcha was sent successfully', "success")
            vm.time = 60
            let interval = window.setInterval(function () {
              if ((vm.time--) <= 0) {
                vm.time = 0
                vm.sendMsgDisabled = false
                vm.canSendAuthCode = true
                vm.canSendAuthCodeAgain = false
                window.clearInterval(interval) //停止
              }
            }, 1000)
          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
            vm.sendMsgDisabled = false
            vm.canSendAuthCode = true
            vm.canSendAuthCodeAgain = false
          }
        })
      } else {
        // 手机验证码
        this.$apiCall("api.User.checkMobile", {
          mobile: vm.userEmail,
          nationcode: vm.form.phoneCountry
        }, r => {
          this.$hideLoading()
          if (r.ErrorCode == '9999') {
            this.$elementMessage('The captcha was sent successfully', "success")
            vm.time = 60
            let interval = window.setInterval(function () {
              if ((vm.time--) <= 0) {
                vm.time = 0
                vm.sendMsgDisabled = false
                vm.canSendAuthCode = true
                vm.canSendAuthCodeAgain = false
                window.clearInterval(interval) //停止
              }
            }, 1000)
          } else {
            this.$message({
              message: r.Message,
              type: "error"
            })
            vm.sendMsgDisabled = false
            vm.canSendAuthCode = true
            vm.canSendAuthCodeAgain = false
          }
        })
      }

    },

    changeUserEmail () {
      this.changeUserEmailShow = true
      if (this.isPhone == true && this.form.country) {
        setTimeout(() => {
          this.form.phoneCountry = $(`li[data-iso="${this.form.country.toLowerCase()}"] > .vue-country-areaCode`).text()
        }, 100)
      }
      this.userEmail = ""
      this.authcode = ""
      this.canSendAuthCode = false
      this.econfirmSuccess = false
      this.failTx = ""
      this.time = 0
    },
    isCEmail (email) {
      if (this.isPhone == false) {
        return email ? /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) : false
      } else {
        return email ? /^\d{6,16}$/.test(email) : false
      }
    },
    successFunction () {
      if (this.userEmail && this.isCEmail(this.userEmail)) {
        if (this.isPhone == true && this.form.phoneCountry == '') {
          this.canSendAuthCode = false
          this.econfirmSuccess = false
          this.$refs.verify.reset()
          this.failTx = 'Please select a Country'
        } else {
          this.canSendAuthCode = true
          this.econfirmSuccess = true
          this.failTx = ""
          this.sendAuthCode()
        }
      } else {
        this.canSendAuthCode = false
        this.$refs.verify.reset()
        this.econfirmSuccess = false
        this.failTx = this.isPhone == false ? 'Please fill in the correct Email address' : 'Please fill in the correct Mobile phone'
      }
    },
    save () {
      if (!this.form.name) {
        this.$elementMessage("Full Name required", "error")
        return
      }
      this.$Burying({
        object: '10003'
      })
      this.loading = true
      this.form.receivePhone = this.checkedPhone == true ? 1 : 2
      this.form.allowService = this.checked2 == true ? 1 : 2
      this.form.allowNews = this.checked3 == true ? 1 : 2
      let params = this.form
      this.$apiCall("api.User.changeByUser", params, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo))
          userInfo.name = this.form.name
          userInfo.weChat = this.form.weChat
          userInfo.skype = this.form.skype
          userInfo.whatsapp = this.form.whatsapp
          userInfo.wangwang = this.form.wangwang
          userInfo.QQ = this.form.QQ
          userInfo.line = this.form.line
          userInfo.country = this.form.country
          userInfo.location = this.form.location
          userInfo.address = this.form.address
          userInfo.phone = this.form.mobile
          userInfo.email = this.form.email
          userInfo.receivePhone = this.form.receivePhone
          userInfo.allowService = this.form.allowService
          userInfo.allowNews = this.form.allowNews
          localStorage.setItem("c_ourMallUserInfo", JSON.stringify(userInfo))
          this.$elementMessage("Successfully saved", "success")
        } else {
          this.$elementMessage(r.Message, "error")
        }
      })

    },
    reset () {
      location.reload()
    },
    resetPhone () {
      this.$refs.verify.reset()
      this.changeUserEmailShow = false
      this.sendMsgDisabled = false,
        this.canSaveEdit = false,
        this.canSendAuthCode = false,
        this.canSendAuthCodeAgain = false,
        this.isPhone = false
      this.form.phoneCountry = ''
      this.userEmail = ''
      this.authcode = ''
      this.failTx = ''
    },
    closeChange () {
      this.changeUserEmailShow = false
      this.isPhone = false
      this.form.phoneCountry = ''
    },
    saveChange () {
      if (this.isPhone == false) {
        this.$apiCall("api.User.checkEmailToken", {
          email: this.userEmail,
          token: this.authcode
        }, r => {
          if (r.ErrorCode == '9999') {
            let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo))
            userInfo.email = this.form.email = this.userEmail
            localStorage.setItem("c_ourMallUserInfo", JSON.stringify(userInfo))
            this.$elementMessage('User Email modified successfully', "success")
            this.changeUserEmailShow = false
          } else {
            this.$elementMessage(r.Message, "error")
          }
        })
      } else {
        this.$apiCall("api.User.checkMobileToken", {
          mobile: this.userEmail,
          nationcode: this.form.phoneCountry,
          token: this.authcode
        }, r => {
          if (r.ErrorCode == '9999') {
            let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo))
            userInfo.mobile = this.form.phone = this.userEmail
            localStorage.setItem("c_ourMallUserInfo", JSON.stringify(userInfo))
            this.$elementMessage('User Phone modified successfully', "success")
            this.changeUserEmailShow = false
          } else {
            this.$elementMessage(r.Message, "error")
          }
        })
      }

    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.pagebody {
  margin-bottom: 20px;
}
.header-title-text {
  font-weight: bold;
  font-size: 16px;
}
.label-i {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  // background-color: #f2f6fc;
  color: #5c6ac4;
  font-size: 22px;
}
// .bottom-action {
//   position: fixed;
//   bottom: 15px;
//   left: 270px;
//   right: 30px;
//   background-color: rgba(48, 49, 51, 0.9);
//   padding: 15px;
//   border-radius: 8px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
// .admin-page-max .bottom-action {
//   left: 30px;
// }
</style>
<style lang="scss" scoped>
.chat-mask {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2004;
  background-color: rgba(33, 33, 33, 0.4);
}

#modalVerChange {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.7);
  .top {
    width: 100%;
    height: 3px;
    background-color: #5c6ac4;
    transition: all 1s;
  }
  .modal-content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    .modal-body {
      display: flex;
      align-items: center;
      .left {
        padding: 0 20px 0 15px;
        i {
          color: #5c6ac4;
          font-size: 56px;
        }
      }
      .right {
        h3 {
          margin-bottom: 15px;
          color: #303133;
          font-size: 14px;
        }
        p {
          margin-bottom: 10px;
          color: #606266;
          font-size: 14px;
        }
      }
    }
  }
}
.dialog-content {
  margin: 20px;
  font-size: 16px;
  font-weight: bold;
}
.support-msg-num {
  position: absolute;
  top: -1px;
  right: -10px;
  width: 6px;
  height: 6px;
  line-height: 6px;
  text-align: center;
  background-color: rgb(245, 108, 108);
  border-radius: 50%;
  font-size: 12px;
}
.msg-num:before {
  position: absolute;
  background: rgb(245, 108, 108);
  width: 8px;
  height: 8px;
  top: -1px;
  left: -1px;
  content: "";
  display: block;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
  animation: wave-animate 2s infinite ease-out;
}
.msg-num:after {
  position: absolute;
  background: rgb(245, 108, 108);
  width: 8px;
  height: 8px;
  top: -1px;
  left: -1px;
  content: "";
  display: block;
  border-radius: 50%;
  -webkit-backface-visibility: hidden;
  opacity: 0;
  animation: wave-animate 2s 1s infinite ease-out;
}
@keyframes wave-animate {
  0% {
    transform: scale(0);
    opacity: 1;
    transform-origin: center;
  }
  100% {
    transform: scale(3);
    opacity: 0;
    transform-origin: center;
  }
}
.annbox {
  width: 100%;
  height: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.countDown {
  width: 90%;
  margin: 0 auto;
  background: #ccc;
  text-align: center;
  text-align: 18px;
  font-size: 16px;
}
#app ::v-deep.el-alert__content {
  width: 100%;
  .el-alert__title {
    display: block;
    width: 100%;
  }
}
.annContent {
  width: 100%;
  p {
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
}
.phoneCountry {
  display: flex;
}
.phoneCountry ::v-deep .country-intl-label {
  padding: 0 15px;
  top: -3px;
  left: 0;
  height: 38px;
}
.phoneCountry ::v-deep .vue-country-list {
  padding: 0px;
  list-style: none;
}
.phoneCountry ::v-deep .vue-country-item {
  padding: 0 15px;
}
.phoneCountry ::v-deep .vue-country-list-wrap {
  width: 480px;
}
.phoneCountry ::v-deep .country-intl-input {
  padding: 10px 0px 10px 10px;
  height: 38px;
}
.phoneCountry ::v-deep .vue-country-intl {
  width: 140px;
  margin-right: -5px;
}
.phoneCountry ::v-deep .country-intl-input-wrap {
  overflow: hidden;
}
.phoneCountry ::v-deep .iti-flag {
  margin-right: 0px;
}
.phoneCountry ::v-deep .el-input__inner {
  border-radius: 0;
}
</style>