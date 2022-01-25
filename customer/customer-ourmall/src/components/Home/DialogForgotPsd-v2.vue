<template>
  <el-dialog
    :close-on-click-modal="false"
    width="500px"
    :visible.sync="data.isShow"
    title="Change password"
    class="dialog-forgot"
    @opened="opened"
  >
    <div class="body-wrap">
      <el-form ref="forgotForm" label-position="top" label-width="120px" :rules="rules" :model="data.form">
        <el-form-item label="E-Mail" prop="mobile">
          <el-input v-model="data.form.mobile" placeholder="Please fill in your Email as your Username" :readonly="readonly"></el-input>
        </el-form-item>
        <vue-simple-verify
          ref="verify"
          :width="462"
          movedColor="#67C23A"
          tips="Slide to get your CAPTCHA"
          :successTips="emailLoading ? 'Loading...' : `Validation passed. try again in ${sec} seconds`"
          style="margin-bottom: 15px;"
          @success="verifySuccess"
        />
        <el-form-item label="Captcha" prop="token">
          <el-input v-model="data.form.token" placeholder="Please fill in the CAPTCHA you received" :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="New password" prop="newPassword">
          <el-input v-model="data.form.newPassword" show-password placeholder="Please set your new password"  :readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="Password confirm" prop="repeatNewPassword">
          <el-input v-model="data.form.repeatNewPassword" show-password placeholder="Please confirm your new password"  :readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="data.isShow = false">Discard</el-button>
      <el-button :loading="data.loading"  type="primary"  @click="saveNewPSD">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data", "sec"],
  data(){
    let checkPassword = (rule, value, callback) => {
      if(!/^(?=.*[A-Za-z])(?=.*\d)[^]{8,32}$/.test(value)){
        callback(new Error('The password must contain letters, and numbers, Minimum 8 characters'))
      }else{
        callback();
      }
    }
    let checkRePassord = (rule, value, callback) => {
      if(value != this.data.form.newPassword){
        callback(new Error('The password and confirm password must be the same'))
      }else{
        callback();
      }
    }
    return {
      readonly: true,
      rules:{
        mobile: [
          {required: true, message: 'Email must be filled in', trigger: 'blur'},
        ],
        token: [
          {required: true, message: 'CAPTCHA must be filled in', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: 'Password must be filled in', trigger: 'blur'},
          {validator: checkPassword, trigger: 'blur'},
        ],
        repeatNewPassword: [
          {required: true, message: 'Confirm password must be filled in', trigger: 'blur'},
          {validator: checkRePassord, trigger: 'blur'},
        ]
      },
      emailLoading: false,
    }
  },
  computed: {
    isEmail(){
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if(!this.data.form.mobile){ //输入不能为空
        return false;
      }else if(!reg.test(this.data.form.mobile)){ //正则验证不通过，格式不对
        return false;
      }else{
        return true;
      }
    }
  },
  methods: {
    saveNewPSD(){
      this.data.loading = true;
      this.$refs['forgotForm'].validate((valid) => {
        if(valid){ //验证成功
          let params = {
            mobile: this.data.form.mobile,
            token: this.data.form.token,
            newPassword: this.data.form.newPassword,
            repeatNewPassword: this.data.form.repeatNewPassword,
          }
          console.log(params)
          this.$emit('saveNewPSD', params)
        }else{
          this.data.loading = false;
          return false;
        }
      })
    },
    sendToken(){
      this.emailLoading = true;
      this.$apiCall('api.User.sendToken', {
        mobile: this.data.form.mobile,
        reset: true,
        lang: "EN",
        }, r => {
        this.emailLoading = false;
        if (r.ErrorCode == 9999) {
          this.$emit('resetSEC', 'forgot')
        }else{
          this.$refs.verify.reset();
          this.$message({message:  r.Message, type: "error"});
        }
      })
    },
    verifySuccess(){
      if(this.isEmail){
        this.sendToken();
      }else{
        this.$refs.verify.reset();
        this.$message({message:'Please enter a valid Email.', type: "error"});
      }
    },
    opened(){
      this.$nextTick(()=>{
        this.readonly = false;
        this.$refs['forgotForm'].clearValidate(); //清除验证
      })
    }
  }
}
</script>

<style lang="scss">
.dialog-forgot{
  .el-form--label-top{
    margin: 0 20px;
    .el-form-item{
      margin-bottom: 15px;
      .el-form-item__label{
        margin-bottom: 0;
        padding-bottom: 0;
      } 
      .el-form-item__content{
        .el-form-item__error{
          margin-bottom: 0 !important;
        }
      }
    }
  }
}
</style>