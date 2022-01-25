<template>
  <div id="app" class="admin-page" :class="{ 'admin-page-max': pageMax }">
    <template
      v-if="
        /^(signin|home)$/.test(
          $route.name
        )
      "
      ><router-view></router-view
    ></template>
    <template v-else-if="$route.name">
      <div class="admin-header">
        <div class="d-flex">
          <div class="changeSize" style="font-size:20px;margin-left:240px">
          <a href="javascript:;" @click="changeSize">
            <i v-if="pageMax" class="el-icon-s-unfold"></i>
            <i v-else class="el-icon-s-fold"></i>
          </a>
        </div>
      </div>
        <div class="right">
          <el-avatar
          v-if="!$store.state.userInfo.logo"
          atar
          class="mg-r-15"
          icon="el-icon-user-solid"
          size="small"
        ></el-avatar>
        <el-avatar
          v-else
          atar
          class="mg-r-15"
          :src="$store.state.userInfo.logo"
          size="small"
        ></el-avatar>
          <!--<el-link type="primary">testcom</el-link>-->
          <el-dropdown @command="handleCommand" style="margin-right: 15px">
            <span class="el-dropdown-link">
              {{ $store.state.userInfo.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="password" style="min-width: 100px">
                <i class="fa fa-lock" aria-hidden="true"></i>
                <!-- {{ $t("app.modifyPassword") }} -->
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="exit" style="min-width: 100px">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                {{ $t("app.exit") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-dropdown trigger="click" @command="langCommand">
            <span class="el-dropdown-link d-flex">
              <span style="margin-right: 5px">{{
                $i18n.messages[this.$i18n.locale].name
              }}</span>
              <i class="iconfont icon-lan"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh" style="min-width: 80px">
                <span :class="{ 'text-primary': this.$i18n.locale == 'zh' }"
                  >中文</span
                >
              </el-dropdown-item>
              <el-dropdown-item command="en" style="min-width: 80px">
                <span :class="{ 'text-primary': this.$i18n.locale == 'en' }"
                  >English</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
      </div>
      <div class="admin-main">
        <div class="admin-left-side">
          <div class="logoBox">
            <h1></h1>
          </div>
          <el-row class="tac h-100">
            <el-col :span="24" class="h-100">
              <el-scrollbar style="height: 100%">
                <div class="menu-box" style="background-color: #525FB0">
                  <!-- 
                    text-color="#fff"
                     -->
                  <el-menu
                    class="main-menu"
                    router
                    :default-active="$route.meta.urlActive"
                    background-color="#525FB0"
                    :default-openeds="openeds"
                    @select="menuSelect"
                  >
                    <template v-for="nav in navMenu">
                      <el-menu-item
                        v-if="$isRole(nav.role)  && !nav.subItem"
                        :key="nav.id" 
                        :index="nav.path"
                        :disabled="!nav.enabled"
                        :data-name="nav.text"
                      >
                        <template slot="title">
                          <div style="width:30px;text-align:left; display: inline-block;">
                            <i :class="nav.icon"></i>
                          </div>
                          <span>{{ nav.text }}</span>
                        </template>
                      </el-menu-item>
                      <el-submenu
                        v-if="nav.subItem && hasSubRole(nav.subItem)"
                        :key="nav.id + 'b'"
                        :index="nav.id + 'b'"
                        :disabled="!nav.enabled"
                      >
                        <template slot="title">
                          <div style="width:30px;text-align:left; display: inline-block;">
                            <i :class="nav.icon"></i>
                          </div>
                          <span>{{ nav.text }}</span>
                        </template>
                        <el-menu-item-group>
                          <template v-for="sub in nav.subItem">
                            <el-menu-item
                              v-if="$isRole(sub.role)"
                              :key="sub.name"
                              :index="sub.path"
                              :disabled="!sub.enabled"
                              :data-name="sub.name"
                            >
                              {{ sub.name }}
                            </el-menu-item>
                          </template>
                        </el-menu-item-group>
                      </el-submenu>
                    </template>
                  </el-menu>
                </div>
              </el-scrollbar>
            </el-col>
          </el-row>
        </div>
        <div class="admin-content">
          <el-scrollbar
            style="height: 100%"
            ref="mainScroll"
            class="main-scroll"
          >
            <router-view :key="dateKey"></router-view>
          </el-scrollbar>
        </div>
      </div>
       <el-dialog
        title="个人信息"
        :visible.sync="dialogChangePsw.isShow"
        width="500px"
      >
      <el-row :gutter="30">
          <el-col :span="24">
            <el-form label-width="100px">
              <el-form-item 
                label="账号:"
              >
                <span>{{$store.state.userInfo.username}}</span>
                <span>
                  <el-link
                  type="primary"
                  class="mg-l-10"
                  :underline="false"
                  @click="dialogChangePsw.isShow2 = true"
                  >修改密码</el-link>
                </span>
              </el-form-item>
              <el-form-item
                label="头像:"
              >
              <div class="d-flex">
                <div class="upload" @click="uploadOpen">
                    <i class="el-icon-plus" v-if="!logoImage"></i>
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="logoImage"
                        :fit="'cover'"
                        v-else
                    ></el-image>
                </div>
                <el-link
                  type="primary"
                  class="mg-l-10"
                  :underline="false"
                  v-if="logoImage"
                  @click="uploadOpen"
                  >修改</el-link>
              </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- 修改密码 -->
      <el-dialog
        append-to-body
        :title="$t('app.modifyPassword')"
        :visible.sync="dialogChangePsw.isShow2"
        width="500px"
      >
        <el-row :gutter="30">
          <el-col :span="24">
            <el-form>
              <el-form-item
                :label="$t('app.originalPassword')"
                :label-width="dialogChangePsw.LW"
                required
              >
                <el-input
                  :placeholder="$t('app.originalPassword')"
                  v-model="dialogChangePsw.oldPassword"
                  auto-complete="off"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('app.newPassword')"
                :label-width="dialogChangePsw.LW"
                required
              >
                <el-input
                  :placeholder="$t('app.newPassword')"
                  v-model="dialogChangePsw.newPassword"
                  auto-complete="off"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('app.repeatNewPassword')"
                :label-width="dialogChangePsw.LW"
                required
              >
                <el-input
                  :placeholder="$t('app.repeatNewPassword')"
                  v-model="dialogChangePsw.repeatNewPassword"
                  auto-complete="off"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="changePswSave"
            :loading="dialogChangePsw.loading"
            >{{ $t("app.save") }}</el-button
          >
          <el-button @click="dialogChangePsw.isShow2 = false">{{
            $t("app.discard")
          }}</el-button>
        </div>
      </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="saveUser"
            >确认修改</el-button
          >
          <el-button @click="dialogChangePsw.isShow = false">{{
            $t("app.discard")
          }}</el-button>
        </div>
       </el-dialog>
      
    </template>
    <div id="modalVerChange">
      <div class="modal-content">
        <div class="top" :style="{ width: `${verChangeTime * 10}%` }"></div>
        <div class="modal-body">
          <div class="left">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </div>
          <div class="right">
            <h3>{{ $t("app.dear") }} {{ $store.state.userInfo.name }}</h3>
            <p>
              {{ $t("app.ourAppHas_") }}
            </p>
            <div>
              <el-button type="primary" size="small" @click="resetPage()">{{
                $t("app.iSeeRefresh_")
              }}</el-button>
            </div>
          </div>
        </div>
      </div>
      Show
    </div>
    <el-dialog
      :title="$t('app._bindYourEmail')"
      :visible.sync="DialogAlertEmail.isShow"
      width="460px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <p style="padding: 0 20px">{{ $t("app._pleaseBindYourEmail") }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emailAlertconfirm(2)">{{
          $t("app.RemindMeLater")
        }}</el-button>
        <el-button type="primary" @click="emailAlertconfirm(1)">{{
          $t("app.bindNow")
        }}</el-button>
      </div>
    </el-dialog>
    <input
      @change="Base64($event)"
      type="file"
      id="imgFile"
      accept=".jpg,.png,.gif"
      style="display: none"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      VondersData:{},
      logoImage:'',
      baseTimeStamp: new Date().getTime(),
      countDown: 0,
      getAnnouncementNum: 0,
      titColor: "",
      pageMax: false,
      dateKey: new Date().valueOf(),
      navMenu: [
        // {
        //   id: 1,
        //   text: "首页",
        //   icon: "el-icon-s-home",
        //   path: "/dashboard",
        //   role: "MenuDashboard",
        //   enabled: true,
        // },
        // {
        //   id: 3,
        //   text: "客户管理",
        //   icon: "el-icon-s-custom",
        //   path: "/customerMg",
        //   enabled: true,
        //   role: 'customerView',
        // },
        {
          id: 6,
          text: '客户管理',
          icon: "el-icon-user",
          path: '/staff',
          enabled: true,
          subItem: [
            {
              name: '未注册客户',
              path: '/unregistered',
              enabled: true,
              role: "",
            },
            {
              name: '免费客户',
              path: '/customerFree',
              enabled: true,
              role: "",
            },
            {
              name: '付费客户',
              path: '/customerPay',
              enabled: true,
              role: "",
            },
            {
              name: '全部客户',
              path: '/customerAll',
              enabled: true,
              role: "",
            }
          ]
        },
        {
          id: 4,
          text: "财务管理",
          icon: "el-icon-s-finance",
          path: "/financeMg",
          enabled: true,
          role: 'financeView'
        },
        {
          id: 5,
          text: "套餐管理",
          icon: "el-icon-s-claim",
          path: "/comboMg",
          enabled: true,
          role: 'vipView',
        },
        {
          id: 5,
          text: '员工管理',
          icon: "el-icon-user",
          path: '/staff',
          enabled: true,
          subItem: [
            {
              name: '员工管理',
              path: '/staff',
              enabled: true,
              role: "staffView",
            },
            {
              name: '角色管理',
              path: '/role',
              enabled: true,
              role: "privilegeView",
            }
          ]
        },
      ],
      openeds: ["1"],
      dialogChangePsw: {
        isShow: false,
        isShow2: false,
        loading: false,
        LW: "120px",
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      },
      dialogChangePswDefault: "{}",
      reCount: 0,
      verChangeTime: 10,
      changeUserEmailShow: false,
      userEmail: "",
      ebeginClientX: 0 /*距离屏幕左端距离*/,
      emouseMoveStata: false /*触发拖动状态  判断*/,
      emaxwidth: 440 /*拖动最大宽度，依据滑块宽度算出来的*/,
      econfirmWords: this.$t("app._dragToHTheRight") /*滑块文字*/,
      econfirmSuccess: false /*验证成功判断*/,
      canSaveEdit: false,
      time: 0, // 发送验证码倒计时
      sendMsgDisabled: false,
      failTx: "",
      DialogAlertEmail: {
        isShow: false,
      },
      newChatNum: 0,
      dialogSetShopNameData: {
        isShow: false,
        ipt: '',

      },
      defaultDialogSetShopNameData: '{}',
    };
  },
  mounted() {
    document.title =
      (this.$route.meta.title) + "- OurMall Dropshipping App";
    this.defaultDialogSetShopNameData = JSON.stringify(this.dialogSetShopNameData)
    this.dialogChangePswDefault = JSON.stringify(this.dialogChangePsw);

    if (localStorage.getItem("userInfo")) {
      this.$store.commit(
        "setUserInfo",
        JSON.parse(localStorage.getItem("userInfo"))
      );
    }
  },
  watch: {
    $route() {
      document.title =
        this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
      if (this.$route.meta.checkLogin && this.$route.name != "Invoice") {
        localStorage.removeItem("wantVisitPathSu");
        if (this.$route.meta.checkLogin) {
          localStorage.setItem("wantVisitPathSu", this.$route.meta.urlActive);
        }
      }
      if (this.$route.path == "/Drop" || this.$route.path == "/DropD" || !this.$route.meta.checkLogin) {
        return false;
      } else {
        this.routerCheckLogin();
      }
    },
  },
  methods: {
    hasSubRole(sub){
      if(sub && sub.length){
        let s = false;
        sub.forEach(e => {
          if(this.$isRole(e.role)){
            s = true;
          }
        }); 
        return s;
      }else{
        return true;
      }
    },
    saveUser(){
        this.$apiCall(
        "api.User.changeByUser",
        {
          logo: this.logoImage,
        },r=>{
          if (r.ErrorCode == "9999") {
            let userInfo = JSON.parse(
              JSON.stringify(this.$store.state.userInfo)
            );
            userInfo.logo = this.logoImage;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.$store.commit("setUserInfo", userInfo);
            this.$elementMessage(
              this.$t("app.userInformationSuccessfully"),
              "success"
            );
            this.dialogChangePsw.isShow = false;
          } else {
            this.$elementMessage(r.Message, "error");
          }
        })
    },
    uploadOpen() {
      document.getElementById("imgFile").click();
    },
    Base64(el) {
      if (el.target.value) {
        let reader = new FileReader(),
          img = new Image(),
          ext = "";
        reader.onload = (e) => {
          img.src = e.target.result;
          let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
          ext = extArr[1];
        };
        img.onload = (e) => {
          base64Image({
            file: el.target,
            callback: (rst) => {
              let base64 = rst.split("base64,").pop();
              this.uploadImgBase64(base64, ext);
            },
          })
        };
        reader.readAsDataURL(el.target.files[0]);
      }
    },
    uploadImgBase64(base64, ext) {
      this.loading = true;
      this.$apiCall(
        "api.User.uploadImgBase64",
        { imgUrlBase64: base64, ext },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.logoImage = r.Data.Results.imgUrl;
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    routerCheckLogin() {
      this.$apiCall("api.Admin.checkLoginStatus", {}, (r) => {
        if (r.ErrorCode == "9999") {
          //r.Data.Results.canUseWallet = r.Data.Results.walletOpen = 1; //测试打开钱包
          localStorage.setItem("apiUserToken", r.Data.Results.apiUserToken);
          localStorage.setItem("apiUserId", r.Data.Results.id);
          localStorage.setItem("userInfo", JSON.stringify(r.Data.Results));
          if (localStorage.getItem("userInfo")) {
            this.$store.commit(
              "setUserInfo",
              JSON.parse(localStorage.getItem("userInfo"))
            );
          }
        }
      });
    },
    langCommand(command) {
      if (command != this.$i18n.locale) {
        this.$i18n.locale = command;
        localStorage.setItem("ourmallVendorLang", command);
        document.title =
          this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
      }
    },
    emailAlertconfirm(type) {
      localStorage.setItem(
        "lastOpenAlertEmail",
        parseInt(new Date().getTime() / 1000)
      );
      this.DialogAlertEmail.isShow = false;
      if (type == 1) {
        //确认
        this.changeUserEmail();
      }
    },
    mousedownFn(e) {
      this.emouseMoveStata = true;
      this.ebeginClientX = e.clientX;
    }, //按下滑块函数
    isCEmail(email) {
      return email
        ? /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
        : false;
    },
    resetPage() {
      location.reload();
    },
    onCopy() {
      this.$elementMessage(this.$t("successfullyToClipboard"), "success");
    },
    onError() {
      this.$elementMessage(this.$t("failedToClipboard"), "error");
    },
    changePswSave() {
      //保存修改密码
      if (!this.dialogChangePsw.oldPassword) {
        this.$elementMessage(this.$t("app.theOriginalEntered"), "error");
        return;
      }
      if (!this.dialogChangePsw.newPassword) {
        this.$elementMessage(this.$t("app.theNewPasswordEntered"), "error");
        return;
      }
      if (!this.dialogChangePsw.repeatNewPassword) {
        this.$elementMessage(this.$t("app.pleaseEnterAgain"), "error");
        return;
      }
      this.dialogChangePsw.loading = true;
      this.$apiCall(
        "api.User.changePassword",
        {
          oldPassword: this.dialogChangePsw.oldPassword,
          newPassword: this.dialogChangePsw.newPassword,
          repeatNewPassword: this.dialogChangePsw.repeatNewPassword,
        },
        (r) => {
          this.dialogChangePsw.loading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage(
              this.$t("app.passwordChangedSuccessfully"),
              "success"
            );
            this.dialogChangePsw.isShow2 = false;
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    changeSize() {
      this.pageMax = !this.pageMax;
    },
    menuSelect(key) {
      if (key == this.$route.path) this.dateKey = new Date().valueOf();
    },
    handleCommand(command) {
      switch (command) {
        case "password":
          this.logoImage = this.$store.state.userInfo.logo;
          this.dialogChangePsw = JSON.parse(this.dialogChangePswDefault);
          this.dialogChangePsw.isShow = true;
          break;
        case "exit":
          localStorage.removeItem("wantVisitPathSu");
          this.$userFailure();
          break;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 0;
  height: 100%;
}
.admin-left-side .el-menu-item.is-active {
  background-color: #5c6ac4 !important;
}
.admin-left-side .el-menu-item:hover {
  color: #7d88d0 !important;
}
.admin-left-side .el-menu-item:hover i {
  color: #7d88d0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #5c6ac4;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.main-menu.el-menu .is-opened.el-submenu {
  height: auto;
}
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
.drag {
  position: relative;
  background-color: #e8e8e8;
  width: 100%;
  height: 34px;
  margin-left: 0;
  margin-top: 0;
  line-height: 34px;
  text-align: center;
}

.handler {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 34px;
  border: 1px solid #ccc;
  cursor: move;
}

.handler_bg {
  background: #fff url(/images/double-right.png) center no-repeat;
  background-size: 50%;
}

.handler_ok_bg {
  background: #fff url(/images/check-circle-fill.png) center no-repeat;
  background-size: 50%;
}

.drag_bg {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}

.drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
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
    background-color: $--color-primary;
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
          color: $--color-primary;
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
#app /deep/.el-alert__content {
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
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  cursor: pointer;
  line-height: 120px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 30px;
    color: #ccc;
  }
}
</style>
