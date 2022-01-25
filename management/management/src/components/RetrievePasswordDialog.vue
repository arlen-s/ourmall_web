<template>
  <el-dialog
    :title="$t('signin.重置登录密码')"
    :visible.sync="dialogVisible"
    width="370px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="wrapper">
      <el-form
        ref="refFrom"
        :model="formValue"
        :rules="rules"
        :label-width="labelWidth"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="formValue.userName"
            :disabled="loading"
            clearable
            :placeholder="$t('signin.mobile')"
            @keyup.enter.native="focusPassword"
          ></el-input>
        </el-form-item>
        <div style="margin-top: 20px;margin-bottom: 20px;">
          <vue-simple-verify
            ref="verify"
            @success="success"
            :width="328"
            :tips="$t('signin.getCaptcha')"
            :successTips="`${loading ? 'Loading...' : $t('signin.重新获取验证码', { second: mobileSeconds })}`"
            movedColor="#5c6ac4"
          />
        </div>
        <el-form-item prop="token">
          <el-input
            v-model="formValue.token"
            :disabled="loading"
            :placeholder="$t('signin.captcha')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="iptPassword"
            v-model="formValue.password"
            :disabled="loading"
            show-password
            :placeholder="$t('signin.请输入新密码')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            v-model="formValue.rePassword"
            :disabled="loading"
            show-password
            :placeholder="$t('signin.请重新输入新密码')"
          ></el-input>
        </el-form-item>
        <div v-if="error" class="error">
          {{error}}
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleReset">{{$t('signin.修改登录密码')}}</el-button>
      <el-button @click="handleClose">{{$t('signin.关闭')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'RetrievePasswordDialog',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('signin.请再次输入密码')));
      } else if (value !== this.formValue.password) {
        callback(new Error(this.$t('signin.两次输入密码不一致')));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      labelWidth: "0px",
      loading: false,
      formValue: {
        username: '',
        token: '',
        password: "",
        rePassword: "",
      },
      showReSend: true,
      mobileSeconds: 60, // 倒计时
      confirmSuccess: false, // 是否通过滑动验证
      error: null,
      errorT: 0,
      rules: {
        userName: [
          { required: true, message: this.$t('signin.enterMobile'), trigger: "blur" },
        ],
        token: [{ required: true, message: this.$t('signin.enterCaptcha'), trigger: "blur" }],
        password: [
          { required: true, message: this.$t('signin.请输入新密码'), trigger: "blur" },
          { min: 6, message: this.$t('signin.passBits'), trigger: "blur" },
        ],
        rePassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
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
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.$refs.refFrom.resetFields()
      this.dialogVisible = false
    },
   success () {
      this.confirmSuccess = true
      this.sendToken()
    },
    dragReset() {
      this.confirmSuccess = false
      this.$refs.verify.reset()
    },
    focusPassword(){
      this.$refs.iptPassword.$refs.input.focus();
    },
    handleReset() {
      this.$refs.refFrom.validate((valid) => {
        if (valid) {
          this.error = "";
          this.loading = true;
          this.$apiCall(
            "api.User.resetPassword",
            {
              mobile: this.formValue.userName,
              password: this.formValue.password,
              token : this.formValue.token,
              newPassword: this.formValue.password,
              repeatNewPassword: this.formValue.rePassword,
            },
            (r) => {
              this.loading = false;
              if (r.ErrorCode == 9999) {
                this.$message({ message: this.$t("signin.密码重置成功"), type: "success" });
                this.handleClose()
                // clearInterval(this.successT);
                // this.regStatus.success = this.$t('signin.successful');
                // this.regStatus.successT = setInterval(() => {
                //   this.regStatus.success = "";
                // }, 5000);
                // this.$message({ message: this.$t("signin.successful"), type: "success" });
                // this.tabAction = "login"
              } else {
                clearInterval(this.errorT);
                this.error = r.Message;
                this.errorT = setInterval(() => {
                  this.error = "";
                }, 5000);
                // this.$message({ message: r.Message, type: "error" });
              }
            }
          );
        }
      });
    },
    sendToken() { // 获取验证码
      if (!this.formValue.userName) {
        clearInterval(this.errorT);
        this.error = this.$t('signin.correctNum');
        this.errorT = setInterval(() => {
          this.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      if (!this.confirmSuccess) {
        clearInterval(this.errorT);
        this.error = this.$t('signin.slideBar');
        this.errorT = setInterval(() => {
          this.error = "";
        }, 5000);
        this.dragReset();
        return;
      }
      this.loading = true;
      this.$apiCall(
        "api.User.sendToken",
        {
          mobile: this.formValue.userName,
          reset: true,
          lang: this.lang
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.mobileSeconds = 60;
            this.showReSend = false;
            let t = setInterval(() => {
              if (this.mobileSeconds <= 1) {
                this.dragReset();
                this.showReSend = true;
                clearInterval(t);
              }
              this.mobileSeconds--;
            }, 1000);
          } else {
            this.dragReset();
            clearInterval(this.errorT);
            this.error = r.Message;
            this.errorT = setInterval(() => {
              this.error = "";
            }, 5000);
          }
        }
      );
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.error{
  position: relative;
  top: -10px;
  color:#F56C6C;
  font-size: 12px;
}
</style>
