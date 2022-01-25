<template>
  <div
    class="contentpanel"
    v-loading.fullscreen="loading"
    v-if="!$store.state.userInfo.canUseWallet"
  >
    <div class="pagetitle" ref="pageHeader">
      <div class="left d-flex">
        <div class="title mg-r-20">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <h2>设置收款方式</h2>
        </div>
        <div class="mg-t-10"></div>
      </div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24">
            <div class="open-wrap">
              <div class="title-flex">
                <h2>支付服务提供商</h2>
                <router-link to="/billList" v-if="$store.state.userInfo.source != 2">账单详情</router-link>
              </div>
              <el-divider></el-divider>
              <h3>您的商店通过以下提供商接受付款：</h3>
              <div class="type">PayPal Express Checkout</div>
              <el-row>
                <el-col :span="12" :offset="2">
                  <el-card>
                    <div class="title">
                      <div class="icon1">
                        <i class="iconfont icon-paypal-text"></i>
                      </div>
                      <div style="display: flex; align-items: center">
                        <div
                          class="icon2"
                          :style="{
                            background: payBind.bg,
                          }"
                        ></div>
                        <div>
                          {{ payBind.text }}
                        </div>
                      </div>
                    </div>
                    <template v-if="$store.state.userInfo.isPayBind == 2">
                      <p class="msg">第三方提供商</p>
                      <p class="msg">通过PayPal接收外币付款</p>
                    </template>
                    <template v-if="$store.state.userInfo.isPayBind == 1">
                      <div class="flex">
                        <div>快速结账</div>
                        <div>
                          首笔销售后，PayPal 将通过 {{ paypal.username }}
                          向您发送电子邮件，说明如何设置 PayPal
                          商家帐户以及如何提现您的资金。
                        </div>
                      </div>
                      <div class="flex">
                        <div>关联账户</div>
                        <div>{{ paypal.username }}</div>
                      </div>
                      <div style="padding-top: 30px; font-weight: 600">
                        信用卡、手续费由Paypal收取
                      </div>
                    </template>
                    <div class="tx-right">
                      <el-button type="primary" @click="open">{{
                        payBind.btn
                      }}</el-button>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 激活模态框 -->
    <el-dialog
      title="Binding PayPal payment method"
      :visible.sync="bindPayParams.isShow"
      width="30%"
    >
      <el-divider></el-divider>
      <el-form
        label-width="100px"
        :model="bindPayParams"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="Account：" prop="username">
          <el-input
            style="width: calc(100% - 40px)"
            v-model="bindPayParams.username"
          />
        </el-form-item>
        <el-form-item label="Password：" prop="password">
          <el-input
            style="width: calc(100% - 40px)"
            type="password"
            v-model="bindPayParams.password"
          />
        </el-form-item>
        <el-form-item label="signature：" prop="signature">
          <el-input
            style="width: calc(100% - 40px)"
            v-model="bindPayParams.signature"
          />
        </el-form-item>
        <el-alert
          style="margin-bottom: 20px;"
          type="info"
        >
          <div slot="title">
            <div class="paypal-tips">
              <div class="left">
                <i class="el-icon-s-opportunity"></i>
              </div>
              <div class="right">
                <h3>Tips</h3>
                <p>Log in to your PayPal account -> Account Settings -> API access -> NVP/SOAP API intergration (Classic), get the account information you need </p>
              </div>
            </div>
          </div>
        </el-alert>
        <el-form-item>
          <el-button
            style="margin-right: 80px"
            @click="bindPayParams.isShow = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            :loading="bindPayParams.loading"
            @click="submitForm('ruleForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 停用模态框 -->
    <el-dialog
      title="停用PayPal收款方式"
      :visible.sync="closePayParams.isShow"
      width="30%"
    >
      <el-divider></el-divider>
      <div class="dialog-body">
        <p>
          停用此收款方式，客户无法进行线上paypal支付， 您确认停用此收款方式？
        </p>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePayParams.isShow = false">取消</el-button>
        <el-button
          type="primary"
          :loading="closePayParams.loading"
          @click="closePayPal"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      paypal: {},
      bindPayParams: {
        isShow: false,
        loading: false,
        username: "",
        password: "",
        signature: "",
      },
      bindPayParamsDefault: "{}",
      rules: {
        username: {
          required: true,
          message: "请输入PayPal账户",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "请输入PayPal密码",
          trigger: "blur",
        },
        signature: {
          required: true,
          message: "请输入加密字符串",
          trigger: "blur",
        },
      },
      closePayParams: {
        isShow: false,
        loading: false,
      },
      closePayParamsDefault: "{}",
    };
  },
  computed: {
    payBind() {
      let obj = {};
      if (this.$store.state.userInfo.isPayBind == 1) {
        obj = {
          bg: "rgba(0, 168, 84, 1)",
          text: "已激活",
          btn: "停用PayPal",
          tips: "停用成功",
        };
      } else {
        obj = {
          bg: "rgba(240, 65, 42, 1)",
          text: "未激活",
          btn: "激活PayPal",
          tips: "激活成功",
        };
      }
      return obj;
    },
  },
  mounted() {
    this.bindPayParamsDefault = JSON.stringify(this.bindPayParams);
    this.closePayParamsDefault = JSON.stringify(this.closePayParams);
    this.getPayPal();
  },
  methods: {
    /**
     * 获取绑定的PayPal账户
     */
    getPayPal() {
      this.loading = true;
      this.$apiCall("api.User.bindAccountPayment", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.paypal = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    /**
     * 打开相对应的模态框
     */
    open() {
      if (this.$store.state.userInfo.isPayBind == 1) {
        this.closePayParams = JSON.parse(this.closePayParamsDefault);
        this.closePayParams.isShow = true;
      } else {
        if (JSON.stringify(this.paypal) != "{}" && this.paypal) {
          this.closePayPal();
        } else {
          this.bindPayParams = JSON.parse(this.bindPayParamsDefault);
          this.bindPayParams.isShow = true;
        }
      }
    },
    /**
     * 激活
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bindPayParams.loading = true;
          this.$apiCall(
            "api.AccountPayment.vendorBindAccountPayment",
            {
              username: this.bindPayParams.username,
              password: this.bindPayParams.password,
              signature: this.bindPayParams.signature,
              accountType: 3,
            },
            (r) => {
              this.bindPayParams.loading = false;
              if (r.ErrorCode == "9999") {
                this.$message({
                  message: "绑定成功",
                  type: "success",
                });
                this.getUser();
                this.getPayPal();
                this.bindPayParams.isShow = false;
              } else {
                this.$message({
                  message: r.Message,
                  type: "error",
                });
              }
            }
          );
        }
      });
    },
    /**
     * 修改收款方式绑定的状态
     */
    closePayPal() {
      this.closePayParams.loading = true;
      this.$apiCall("api.AccountPayment.changeIsPayBind", {}, (r) => {
        this.closePayParams.loading = false;
        if (r.ErrorCode == "9999") {
          this.$message({ message: this.payBind.tips, type: "success" });
          this.getUser();
          this.closePayParams.isShow = false;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    /**
     * 获取个人信息
     */
    getUser() {
      this.$apiCall("api.User.checkLoginStatus", {}, (r) => {
        localStorage.setItem("apiUserToken", r.Data.Results.apiUserToken);
        localStorage.setItem("apiUserId", r.Data.Results.id);
        localStorage.setItem("userInfo", JSON.stringify(r.Data.Results));
        if (localStorage.getItem("userInfo")) {
          this.$store.commit(
            "setUserInfo",
            JSON.parse(localStorage.getItem("userInfo"))
          );
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.title-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paypal-tips{
  display: flex;
  align-items: center;
  .left{
    margin-right: 15px;
    i{
      font-size: 36px;
    }
  }
  .right{
    h3{
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 16px;
    }
    p{
      color: #606266;
    }
  }
}
.open-wrap {
  padding: 25px;
  h2 {
    font-size: 16px;
  }
  h3 {
    margin-bottom: 10px;
    color: $--color-info;
  }
  .type {
    margin: 0 240px 50px;
  }
  .title {
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    .icon1 {
      padding: 4px 2px;
      color: rgba(215, 215, 215, 1);
      background: rgba(51, 51, 51, 1);
    }
    .icon2 {
      margin-right: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(240, 65, 42, 1);
    }
  }
  .msg {
    margin-bottom: 25px;
    font-weight: 600;
  }
  .flex {
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    > div:nth-child(1) {
      font-weight: 600;
    }
    > div:nth-child(2) {
      width: 80%;
    }
  }
}
.dialog-body {
  padding: 15px 20px;
  p {
    margin-bottom: 30px;
  }
}
</style>